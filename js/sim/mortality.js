// Смертность: периодные таблицы по году и полу, откалиброванные под ОПЖ Росстата,
// младенческая смертность — по отдельной таблице. Индивидуальные множители — от здоровья, болезней, привычек, региона.
RL.Mortality = (function () {
  var D = function () { return RL.DATA.demography; };
  var U = RL.util;
  var tables = {}; // key year|sex -> qx[0..110]

  function groupIndex(a) { return a === 0 ? 0 : a < 5 ? 1 : Math.min(19, 1 + Math.floor(a / 5)); }
  function baseQ(sex, a) {
    var g = D().baseQx2019[sex];
    if (a <= 89) return g[groupIndex(a)];
    // 90+: рост ~11% в год возраста
    return Math.min(0.6, g[19] * Math.pow(1.11, a - 92));
  }
  function lifeExp(q) {
    var l = 1, e = 0;
    for (var a = 0; a < q.length; a++) { e += l * (1 - q[a] / 2); l *= 1 - q[a]; }
    return e;
  }
  function leTarget(state, y, sex) {
    var t = D().lifeExpectancy, i = sex === 'm' ? 0 : 1;
    if (t[y]) return t[y][i];
    if (y < 1985) return t[1985][i];
    var v = t[2025][i];
    for (var k = 2026; k <= y; k++) v += state.world.future[k] ? state.world.future[k].leShift : 0.15;
    return Math.min(i === 0 ? 80 : 87, v);
  }
  function infant(y) {
    var v = U.interpYear(D().infantMortality, Math.min(y, 2025));
    if (y > 2025) v = Math.max(2.5, v - 0.05 * (y - 2025));
    return v / 1000;
  }

  function build(state, y, sex) {
    var k = y + '|' + sex + '|' + (y > 2025 ? state.seed : 0);
    if (tables[k]) return tables[k];
    var inf = infant(y), inf2019 = infant(2019);
    var q0 = inf * (sex === 'm' ? 1.09 : 0.9);
    var childScale = Math.pow(inf / inf2019, 0.8);
    var target = leTarget(state, y, sex);
    function make(mult) {
      var q = [];
      for (var a = 0; a <= 110; a++) {
        var b = baseQ(sex, a);
        if (a === 0) q.push(q0);
        else if (a < 15) q.push(Math.min(0.9, b * childScale));
        else {
          var w = a < 65 ? 1 : a < 80 ? 0.7 : 0.4;
          q.push(Math.min(0.95, b * Math.pow(mult, w)));
        }
      }
      q[110] = 1;
      return q;
    }
    var lo = 0.2, hi = 6, q;
    for (var i = 0; i < 40; i++) {
      var mid = (lo + hi) / 2;
      q = make(mid);
      if (lifeExp(q) > target) lo = mid; else hi = mid;
    }
    tables[k] = make((lo + hi) / 2);
    return tables[k];
  }

  function qx(state, y, sex, age) {
    return build(state, y, sex)[Math.min(110, Math.max(0, Math.floor(age)))];
  }

  // Ожидаемая оставшаяся продолжительность жизни по периодной таблице года y.
  function remainingLE(state, y, sex, age) {
    var q = build(state, y, sex), l = 1, e = 0;
    for (var a = Math.floor(age); a < q.length; a++) { e += l * (1 - q[a] / 2); l *= 1 - q[a]; }
    return e;
  }

  // Множитель от здоровья: health 80 -> 1, 50 -> ~8.5. Ограничен.
  function healthMult(health) { return U.clamp(Math.exp((80 - health) / 14), 0.6, 40); }

  function causeTable(age, sex) {
    var c = D().deathCauses;
    if (age < 1) return c.infant;
    if (age < 15) return c.child;
    if (age < 70) return sex === 'm' ? c.adult_m : c.adult_f;
    return c.old;
  }
  // группа причин по Росстату → конкретная причина (инфаркт, ДТП, рак лёгкого…)
  function sampleCause(rng, age, sex) {
    // подробная таблица P(причина | смерть, пол, возраст) из пакета данных, иначе — группа Росстата и её расшифровка
    var T = RL.DATA.deathCauseTable;
    if (T && T[sex]) { var row = T[sex][Math.min(110, Math.max(0, Math.floor(age)))]; if (row && Object.keys(row).length) return rng.weightedKey(row); }
    return detailCause(rng, rng.weightedKey(causeTable(age, sex)), age, sex);
  }
  function detailCause(rng, g, age, sex) {
    var T = RL.DATA.deathCauseDetail && RL.DATA.deathCauseDetail[g];
    if (!T) return g;
    if (T === 'cancer') {
      if (age < 18 || !RL.DATA.cancerSites) return rng.pick(['Лейкоз', 'Опухоль головного мозга', 'Нейробластома', 'Лимфома']);
      return rng.weightedKey(RL.DATA.cancerSites[sex]);
    }
    if (g === 'Прочие причины' && age < 15) return rng.weightedKey({'Сепсис': 0.4, 'Болезни крови': 0.2, 'Осложнения после операции': 0.2, 'Анафилактический шок': 0.2});
    var t = {};
    Object.keys(T).forEach(function (k) {
      var w = T[k];
      if (age < 30 && /Хроническая ишемическая|Атеросклероз|Старость|Альцгеймер|деменция|Сердечная недостаточность|Сахарный диабет|ХОБЛ/.test(k)) w *= 0.05;
      if (age >= 70 && /ДТП|Убийство|на производстве/.test(k)) w *= 0.3;
      if (age < 35 && /Инфаркт|Инсульт|Тромбоэмболия лёгочной|аневризмы/.test(k)) w *= 0.15;
      t[k] = w;
    });
    return rng.weightedKey(t);
  }

  return {qx: qx, remainingLE: remainingLE, healthMult: healthMult, sampleCause: sampleCause, detailCause: detailCause,
    lifeExpAt: function (state, y, sex) { return lifeExp(build(state, y, sex)); }, leTarget: leTarget};
})();
