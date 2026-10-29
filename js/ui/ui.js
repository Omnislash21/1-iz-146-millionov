// Минималистичный интерфейс: текст, кнопки, прогресс-бары. Вся логика — в js/sim.
(function () {
  var S = RL.S, W = RL.World;
  var $ = function (id) { return document.getElementById(id); };
  var state = null, timer = null, running = false, rendered = 0, lastHist = 0;
  var SPEEDS = [1, 2, 4, 8, 16, 64]; // дней в секунду: x1 — год за 6 минут, x16 — за 23 секунды, x64 — за 6 секунд
  var LS_SAVES = 'rl_saves_v1', LS_AUTO = 'rl_autosave_v1', LS_ACH = 'rl_ach_v1';

  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]; }); }
  function ls(get, key, val) {
    try { if (get) return JSON.parse(localStorage.getItem(key) || 'null'); localStorage.setItem(key, JSON.stringify(val)); } catch (e) { return null; }
  }
  function show(id) { ['setup', 'game', 'report'].forEach(function (x) { $(x).classList.toggle('hidden', x !== id); }); if (id === 'setup') document.title = '1 из 146 миллионов'; window.scrollTo(0, 0); }

  // ---------- старт ----------
  // случайные имя и фамилия: имена — из того же набора, что у персонажей игры, фамилии — частые русские (м./ж. формы)
  var SURN = ['Иванов', 'Смирнов', 'Кузнецов', 'Попов', 'Васильев', 'Петров', 'Соколов', 'Михайлов', 'Новиков', 'Фёдоров', 'Морозов', 'Волков', 'Алексеев', 'Лебедев',
    'Семёнов', 'Егоров', 'Павлов', 'Козлов', 'Степанов', 'Николаев', 'Орлов', 'Андреев', 'Макаров', 'Никитин', 'Захаров', 'Зайцев', 'Соловьёв', 'Борисов', 'Яковлев',
    'Григорьев', 'Романов', 'Воробьёв', 'Сергеев', 'Кузьмин', 'Фролов', 'Александров', 'Дмитриев', 'Королёв', 'Гусев', 'Киселёв', 'Ильин', 'Максимов', 'Поляков',
    'Сорокин', 'Виноградов', 'Ковалёв', 'Белов', 'Медведев', 'Антонов', 'Тарасов', 'Жуков', 'Баранов', 'Филиппов', 'Комаров', 'Давыдов', 'Беляев', 'Герасимов',
    'Богданов', 'Осипов', 'Сидоров', 'Матвеев', 'Титов', 'Марков', 'Миронов', 'Крылов', 'Куликов', 'Карпов', 'Власов', 'Мельников', 'Денисов', 'Гаврилов',
    'Тихонов', 'Казаков', 'Афанасьев', 'Данилов', 'Савельев', 'Тимофеев', 'Фомин', 'Чернов', 'Абрамов', 'Мартынов', 'Ефимов', 'Федотов', 'Щербаков', 'Назаров',
    'Калинин', 'Исаев', 'Чернышёв', 'Быков', 'Маслов', 'Родионов', 'Коновалов', 'Лазарев', 'Воронин', 'Климов', 'Филатов', 'Пономарёв', 'Голубев', 'Кудрявцев',
    'Прохоров', 'Наумов', 'Потапов', 'Журавлёв', 'Овчинников', 'Трофимов', 'Леонов', 'Соболев', 'Ермаков', 'Колесников', 'Гончаров', 'Емельянов', 'Никифоров',
    'Грачёв', 'Котов', 'Гришин', 'Ефремов', 'Архипов', 'Громов', 'Кириллов', 'Малышев', 'Панов', 'Моисеев', 'Румянцев', 'Акимов', 'Кондратьев', 'Бирюков',
    'Горбунов', 'Анисимов', 'Ерёмин', 'Тихомиров', 'Галкин', 'Лукьянов', 'Михеев', 'Скворцов', 'Юдин', 'Белоусов', 'Нестеров', 'Симонов', 'Прокофьев',
    'Харитонов', 'Князев', 'Цветков', 'Левин', 'Митрофанов', 'Воронов', 'Аксёнов', 'Софронов', 'Мальцев', 'Логинов', 'Горшков', 'Савин', 'Краснов', 'Майоров',
    'Демидов', 'Елисеев', 'Рыбаков', 'Сафонов', 'Плотников', 'Демин', 'Хохлов', 'Фадеев', 'Молчанов', 'Игнатов', 'Литвинов', 'Ершов', 'Ушаков', 'Дементьев',
    'Рябов', 'Мухин', 'Калашников', 'Леонтьев', 'Лобанов', 'Кузин', 'Корнилов', 'Евдокимов', 'Бородин', 'Платонов', 'Некрасов', 'Балашов', 'Бобров', 'Жданов',
    'Блинов', 'Игнатьев', 'Коротков', 'Муравьёв', 'Крюков', 'Беляков', 'Богомолов', 'Дроздов', 'Лавров', 'Зуев', 'Петухов', 'Ларин', 'Никулин', 'Серов', 'Терентьев',
    'Зотов', 'Устинов', 'Фокин', 'Самойлов', 'Константинов', 'Сахаров', 'Шишкин', 'Самсонов', 'Черкасов', 'Чистяков', 'Носов', 'Спиридонов', 'Карасёв', 'Авдеев',
    'Воронцов', 'Зверев', 'Владимиров', 'Селезнёв', 'Нечаев', 'Кудряшов', 'Седов', 'Фирсов', 'Андрианов', 'Панин', 'Головин', 'Терехов', 'Ульянов', 'Шестаков',
    'Агеев', 'Никонов', 'Селиверстов', 'Баженов', 'Гордеев', 'Кожевников', 'Пахомов', 'Зимин', 'Костин', 'Широков', 'Филимонов', 'Ларионов', 'Овсянников',
    'Сазонов', 'Суворов', 'Нефёдов', 'Корнилов', 'Любимов', 'Львов', 'Горбачёв', 'Копылов', 'Лукин', 'Токарев', 'Кулешов', 'Шилов', 'Большаков', 'Панкратов',
    'Родин', 'Шаповалов', 'Покровский', 'Бочаров', 'Никольский', 'Маркин', 'Горелов', 'Агафонов', 'Березин', 'Ермолаев', 'Зубков', 'Куприянов', 'Трифонов',
    'Масленников', 'Круглов', 'Третьяков', 'Колосов', 'Рожков', 'Артамонов', 'Шмелёв', 'Лаптев', 'Лапшин', 'Фёдоров', 'Зыков', 'Гаврилов'];
  function femSurname(n) { return /(ов|ев|ёв|ин|ын)$/.test(n) ? n + 'а' : /ский$/.test(n) ? n.replace(/ский$/, 'ская') : n; }
  $('btnRandName').onclick = function () {
    var sex = document.querySelector('input[name=sex]:checked').value, names = RL.DATA.names.slavic[sex];
    $('fName').value = names[Math.floor(Math.random() * names.length)];
    var ln = SURN[Math.floor(Math.random() * SURN.length)];
    $('lName').value = sex === 'f' ? femSurname(ln) : ln;
  };
  $('birthForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var y = Math.max(1985, Math.min(2035, +$('bYear').value || 2003));
    var seed = $('seed').value ? (+$('seed').value >>> 0) : undefined;
    var input = {sex: document.querySelector('input[name=sex]:checked').value, firstName: $('fName').value.trim() || 'Безымянный',
      lastName: $('lName').value.trim() || 'Иванов', birthYear: y};
    roulette(RL.Game.create(input, seed));
  });
  document.querySelectorAll('input[name=sex]').forEach(function (r) {
    r.addEventListener('change', function () {
      if (r.value === 'f' && $('fName').value === 'Алексей') { $('fName').value = 'Анна'; $('lName').value = 'Смирнова'; }
      if (r.value === 'm' && $('fName').value === 'Анна') { $('fName').value = 'Алексей'; $('lName').value = 'Смирнов'; }
    });
  });
  $('importFile').addEventListener('change', function (e) {
    var f = e.target.files[0]; if (!f) return;
    var rd = new FileReader();
    rd.onload = function () {
      try { var s = JSON.parse(rd.result); if (!s.person || !s.family) throw new Error('не похоже на сохранение'); load(s); }
      catch (err) { alert('Не удалось загрузить: ' + err.message); }
    };
    rd.readAsText(f);
  });

  // ---------- достижения ----------
  function remember(ids, s, quiet) {
    var all = ls(true, LS_ACH) || {};
    ids.forEach(function (id) {
      var r = all[id] || {n: 0}; r.n++;
      if (!r.first) r.first = {who: s.person.firstName + ' ' + s.person.lastName, y: s.date.year};
      all[id] = r;
      if (!quiet) toast(id, s);
    });
    ls(false, LS_ACH, all);
  }
  function pumpAch() {
    var s = state; if (!s || !s.achNew || !s.achNew.length) return;
    var ids = s.achNew.splice(0);
    remember(ids, s, false);
    $('achN').textContent = Object.keys(s.ach || {}).length;
  }
  function toast(id, s) {
    var d = RL.Achievements.byId[id]; if (!d) return;
    var box = $('toasts');
    while (box.children.length >= 3) box.removeChild(box.firstChild);
    var el = document.createElement('div');
    el.className = 'toast' + (d.dark ? ' dark' : '');
    el.innerHTML = '<i>' + d.icon + '</i><div><small>' + (d.dark ? 'Отметка в судьбе' : 'Новое достижение') + '</small><b>' + esc(RL.Achievements.text(s, d.name)) + '</b><span>' + esc(d.desc) + '</span></div>';
    box.appendChild(el);
    setTimeout(function () { el.classList.add('out'); setTimeout(function () { el.remove(); }, 500); }, 5200);
  }
  var achWasRunning = false;
  $('btnAch').onclick = function () {
    if (!state || state.pending) return;
    achWasRunning = running; play(false);
    var got = RL.Achievements.list(state), total = RL.Achievements.total;
    var h = '<h2>Достижения этой жизни</h2><p class="small muted">Получено ' + got.length + ' из ' + total + '. Остальные скрыты — что нужно сделать, узнаешь, только когда получишь.</p><div class="ach-list">';
    h += got.length ? got.map(function (a) { return '<div class="ach-item' + (a.dark ? ' dark' : '') + '"><i>' + a.icon + '</i><div><b>' + esc(a.name) + '</b><span>' + esc(a.desc) + '</span><small>' + a.age + ' ' + RL.Game.years(a.age) + ', ' + a.y + '</small></div></div>'; }).join('')
      : '<p class="muted">Пока ничего. Живи — и что-нибудь да случится.</p>';
    h += '</div><div class="ach-hidden">' + new Array(Math.max(0, total - got.length) + 1).join('<span>?</span>') + '</div>';
    h += '<div class="controls" style="margin-top:12px;justify-content:flex-end"><button id="achClose" class="primary">Закрыть</button></div>';
    $('modalBox').innerHTML = h; $('modal').classList.remove('hidden');
    $('achClose').onclick = function () { hideModal(); if (achWasRunning) play(true); };
  };
  function renderAchLobby() {
    if (!RL.Achievements || !$('achLobby')) return;
    var all = ls(true, LS_ACH) || {}, D = RL.Achievements.all, n = D.filter(function (d) { return all[d.id]; }).length;
    $('achTotal').textContent = D.length;
    $('achHead').textContent = 'Достижения: ' + n + ' из ' + D.length;
    var fake = {person: {sex: 'm'}};
    $('achLobby').innerHTML = D.map(function (d) {
      var r = all[d.id];
      if (!r) return '<span class="ach-tile locked" title="Скрытое достижение">?</span>';
      return '<span class="ach-tile' + (d.dark ? ' dark' : '') + '" title="' + esc(d.name.replace(/\[([^|\]]*)\|[^\]]*\]/g, '$1') + ' — ' + d.desc + ' Получено раз: ' + r.n + '. Впервые: ' + r.first.who + ', ' + r.first.y) + '">' + d.icon + '</span>';
    }).join('');
  }

  function renderSaves() {
    renderAchLobby();
    var saves = ls(true, LS_SAVES) || {}, auto = ls(true, LS_AUTO), html = '';
    if (auto) html += '<div class="m"><button data-auto="1">Продолжить автосохранение</button> ' + esc(auto.person.firstName + ' ' + auto.person.lastName) + ', ' + RL.Game.dateStr(auto) + '</div>';
    Object.keys(saves).sort().reverse().forEach(function (k) {
      var s = saves[k];
      html += '<div class="m"><button data-load="' + k + '">Загрузить</button> <button data-del="' + k + '">✕</button> ' + esc(s.person.firstName + ' ' + s.person.lastName) +
        ' — ' + RL.Game.dateStr(s) + (s.over ? ' (завершено)' : '') + '</div>';
    });
    $('saves').innerHTML = html || '—';
  }
  $('saves').addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    var saves = ls(true, LS_SAVES) || {};
    if (b.dataset.auto) load(ls(true, LS_AUTO));
    if (b.dataset.load) load(saves[b.dataset.load]);
    if (b.dataset.del) { delete saves[b.dataset.del]; ls(false, LS_SAVES, saves); renderSaves(); }
  });

  function load(s) { RL.World.resetCache(); start(s); }
  function start(s) {
    state = s; famKey = ''; rendered = 0;
    // старое сохранение без достижений: засчитываем уже заслуженные молча
    if (!s.ach && RL.Achievements) { RL.Achievements.check(s); remember(s.achNew || [], s, true); s.achNew = []; } lastHist = s.history.length; prevStats = null; lastYear = null; $('bars').innerHTML = '';
    $('log').innerHTML = '';
    if (s.settings.daily === undefined) { s.settings.daily = true; s.settings.speed = Math.max(4, s.settings.speed || 4); }
    if (!s.date.day) s.date.day = 1;
    $('auto').checked = !!s.settings.auto;
    if (s.settings.minorAuto === undefined) s.settings.minorAuto = true;
    $('minorAuto').checked = s.settings.minorAuto;
    renderSpeeds();
    show('game');
    render();
    if (s.over) { showReport(); return; }
    play(true);
  }

  // ---------- цикл ----------
  function delay() { return state.settings.daily ? 1000 / state.settings.speed : state.settings.secondsPerYear * 1000 / 12 / state.settings.speed; }
  function autoMinor() { return state.settings.minorAuto !== false && RL.Game.isMinor(state); }
  function play(on) {
    running = on; $('btnPlay').textContent = on ? '⏸' : '▶'; $('btnPlay').classList.toggle('playing', on);
    clearTimeout(timer);
    if (on) timer = setTimeout(tick, delay());
  }
  function tick() {
    if (!running || !state) return;
    advanceOnce();
    if (running) timer = setTimeout(tick, delay());
  }
  function advanceOnce() {
    if (state.over) { play(false); showReport(); return; }
    if (state.pending) {
      if (state.settings.auto || autoMinor()) { RL.Game.autoResolve(state); render(); return; }
      play(false); showModal(); return;
    }
    if (state.settings.daily) RL.Game.stepDay(state); else RL.Game.step(state);
    if (state.history.length !== lastHist) { lastHist = state.history.length; ls(false, LS_AUTO, state); }
    render();
    while (state.pending && !state.settings.auto && autoMinor()) RL.Game.autoResolve(state);
    if (state.pending && !state.settings.auto) { render(); play(false); showModal(); }
    if (state.over) { play(false); ls(false, LS_AUTO, state); farewell(); }
  }

  $('btnPlay').onclick = function () { if (state.pending && !state.settings.auto) { showModal(); return; } play(!running); };
  $('btnStep').onclick = function () {
    if (!state) return;
    play(false);
    // до конца месяца — разом
    var m = state.date.month, guard = 0;
    do { advanceOnce(); } while (!state.over && !state.pending && state.date.month === m && guard++ < 40);
  };
  $('minorAuto').onchange = function () { state.settings.minorAuto = this.checked; };
  $('btnFocus').onclick = function () { if (!state || state.over) return; if (RL.Game.requestFocus(state)) { play(false); showModal(); } };
  $('auto').onchange = function () { state.settings.auto = this.checked; if (this.checked && state.pending) { hideModal(); RL.Game.autoResolve(state); render(); play(true); } };
  $('btnSave').onclick = function () {
    var saves = ls(true, LS_SAVES) || {};
    var key = new Date().toISOString().slice(0, 19);
    saves[key] = state; ls(false, LS_SAVES, saves);
    $('btnSave').textContent = 'Сохранено'; setTimeout(function () { $('btnSave').textContent = 'Сохранить'; }, 1200);
  };
  $('btnExport').onclick = function () { download(state.person.lastName + '_' + state.person.firstName + '_' + state.birth.year + '.json', state); };
  $('btnNew').onclick = function () { if (!state.over && !confirm('Начать новую жизнь? Текущая останется в автосохранении.')) return; play(false); hideModal(); renderSaves(); show('setup'); };

  function renderSpeeds() {
    $('speeds').innerHTML = SPEEDS.map(function (x) { return '<button data-sp="' + x + '" class="' + (state.settings.speed === x ? 'on' : '') + '">x' + x + '</button>'; }).join('');
  }
  $('speeds').onclick = function (e) {
    var b = e.target.closest('button'); if (!b) return;
    state.settings.speed = +b.dataset.sp; renderSpeeds(); if (running) play(true);
  };

  function download(name, obj) {
    var blob = new Blob([JSON.stringify(obj, null, 1)], {type: 'application/json'});
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }

  // ---------- отрисовка ----------
  function render() {
    var s = state, p = s.person, r = S.region(s);
    var age = p.alive ? S.age(s) : p.deathAge;
    $('hName').textContent = p.lastName + ' ' + p.firstName + ' ' + p.patronymic;
    renderPassport(s, age);
    document.title = (p.alive ? '' : '✝ ') + p.firstName + ', ' + Math.floor(age) + ' · ' + s.date.year + ' — 1 из 146 млн';
    var L = RL.Young.loc(s);
    $('hInfo').textContent = Math.floor(age) + ' ' + RL.Game.years(Math.floor(age)) + ', ' + RL.Game.dayStr(s) + '. ' + L.city + ', ' + L.region.name + (p.loc ? '. Семья — ' + p.city : '');
    renderBars(p);
    var season = [0, 1, 11].indexOf(s.date.month) >= 0 ? 'winter' : s.date.month <= 4 ? 'spring' : s.date.month <= 7 ? 'summer' : 'autumn';
    if (document.body.dataset.season !== season) document.body.dataset.season = season;
    if (lastYear !== s.date.year) { lastYear = s.date.year; $('hInfo').classList.remove('flip'); void $('hInfo').offsetWidth; $('hInfo').classList.add('flip'); }
    // лог: новые записи сверху
    var frag = '', fresh = s.log.length - rendered < 25;
    for (; rendered < s.log.length; rendered++) {
      var l = s.log[rendered];
      var body = l.type === 'birthday' ? '<span class="txt">' + esc(l.text.replace(/\.$/, '')) + ' · ' + l.y + '</span>' : esc(l.text);
      frag = '<div class="e ' + l.type + (fresh ? ' new' : '') + '"><span class="d">' + (l.d ? l.d + ' ' : '') + RL.Game.MONTHS_N[l.m].slice(0, 3) + ' ' + l.y + ', ' + l.age + ' ' + RL.Game.years(l.age) + '</span>' + body + '</div>' + frag;
    }
    if (frag) $('log').insertAdjacentHTML('afterbegin', frag);
    pumpAch(); renderLeisure(); renderFamily(); renderBudget(); renderHealth(); renderEdu(); renderTraits(); renderTies();
  }

  var prevStats = null, lastYear = null;
  function renderBars(p) {
    var box = $('bars');
    if (!box.firstChild) {
      box.innerHTML = Object.keys(RL.Report.STATS).map(function (k) {
        return '<div class="bar" data-k="' + k + '"><div class="lbl"><span>' + RL.Report.STATS[k] + '<i></i></span><b>0</b></div><div class="track"><div class="fill" style="width:0"></div></div></div>';
      }).join('');
    }
    Object.keys(RL.Report.STATS).forEach(function (k) {
      var el = box.querySelector('[data-k="' + k + '"]'), v = Math.round(p.stats[k]);
      el.dataset.lv = v < 30 ? 'low' : v < 55 ? 'mid' : 'ok';
      el.querySelector('.fill').style.width = v + '%';
      el.querySelector('b').textContent = v;
      if (prevStats) {
        var d = p.stats[k] - prevStats[k];
        if (Math.abs(d) >= 2.5) el.querySelector('i').innerHTML = '<span class="delta ' + (d > 0 ? 'up' : 'down') + '">' + (d > 0 ? '▲' : '▼') + Math.abs(Math.round(d)) + '</span>';
      }
    });
    prevStats = JSON.parse(JSON.stringify(p.stats));
  }
  // прощание: затемнение со свечой, имя и годы жизни — потом отчёт
  function farewell() {
    var p = state.person;
    if (p.alive) { showReport(); return; }
    var fx = document.createElement('div');
    fx.className = 'fx';
    fx.innerHTML = '<div><div class="candle"></div><div class="n">' + esc(p.firstName + ' ' + p.patronymic + ' ' + p.lastName) + '</div><div class="y">' + state.birth.year + ' — ' + state.date.year +
      '</div><div class="c">' + esc(p.deathCause || '') + '</div></div>';
    document.body.appendChild(fx);
    var done = false, go = function () { if (done) return; done = true; showReport(); fx.style.transition = 'opacity .8s'; fx.style.opacity = '0'; setTimeout(function () { fx.remove(); }, 800); };
    fx.onclick = go; setTimeout(go, 3600);
  }

  function memberLine(m, s) {
    var tags = [];
    if (!m.alive) tags.push('<span class="tag">умер' + (m.sex === 'f' ? 'ла' : '') + ' ' + (m.deathYear || '') + '</span>');
    else {
      if (m.job && m.job.deployed) tags.push('<span class="tag bad">' + (m.job.deployed.kind === 'contract' ? 'контракт, СВО' : 'мобилизован') + '</span>');
      if (m.alcohol === 3) tags.push('<span class="tag bad">запои</span>'); else if (m.alcohol === 2) tags.push('<span class="tag bad">пьёт</span>');
      if (m.violent && S.age(s) >= 3 && m.inHome) tags.push('<span class="tag bad">руки распускает</span>');
      if (m.disabled) tags.push('<span class="tag">инвалидность</span>');
    }
    var job = '';
    if (m.alive && m.role !== 'sibling') {
      if (m.job.pension) job = 'пенсионер' + (m.sex === 'f' ? 'ка' : '');
      else if (m.job.onLeave) job = 'в декрете';
      else if (m.job.employed && m.job.prof) job = S.profName(m) + (m.job.shadow > 0.5 ? ' (в конверте)' : '');
      else if (m.job.prof) job = 'без работы';
    }
    var name = S.relName(m) + (m.unknown ? ' (неизвестен)' : ' ' + m.name);
    var ava = m.unknown ? '' : '<span class="ava">' + RL.Avatar.mini(RL.Avatar.memberLook(m, s), m.age, !m.alive) + '</span>';
    return '<div class="m mem">' + ava + '<b>' + esc(name) + '</b>' + (m.alive ? ', ' + Math.floor(m.age) : '') + (job ? ' — ' + esc(job) : '') + tags.join('') + '</div>';
  }
  var FAMN = RL.Report.FAM;
  var famKey = '';
  function renderFamily() {
    // панель семьи с портретами перерисовываем, только когда что-то изменилось (не каждый день)
    var fk = state.date.year * 12 + state.date.month + '|' + state.log.length + '|' + state.person.alive;
    if (fk === famKey) return; famKey = fk;
    var s = state, fam = s.family, h = '', p = s.person, c = p.spouse, ks = (p.kids || []).filter(function (k) { return k.alive; });
    if (c || ks.length) {
      var stName = c ? {dating: 'встречаетесь', cohab: 'живёте вместе', married: c.sex === 'f' ? 'жена' : 'муж'}[c.status] : '';
      if (c) h += '<div class="m mem"><span class="ava">' + RL.Avatar.mini(RL.Avatar.spouseLook(c), c.age, false) + '</span><b>' + esc(c.name) + '</b>, ' + Math.floor(c.age) + ' — ' + stName + (c.job.onLeave ? ', в декрете' : c.job.employed ? ', ' + esc(RL.S.profName(c)) : ', без работы') +
        (c.alcohol >= 2 ? '<span class="tag bad">пьёт</span>' : '') + '<span class="tag">отношения: ' + (c.relation >= 70 ? 'тёплые' : c.relation >= 45 ? 'обычные' : 'трещат') + '</span></div>';
      ks.forEach(function (k) {
        var where = k.withMe ? '' : k.age >= 18 || k.grown ? 'живёт отдельно' : k.withEx ? 'с ' + (k.withEx.sex === 'f' ? 'мамой' : 'папой') : '';
        h += '<div class="m mem"><span class="ava">' + RL.Avatar.mini(RL.Avatar.kidLook(s, k), k.age, false) + '</span>' + (k.sex === 'm' ? 'сын ' : 'дочь ') + '<b>' + esc(k.name) + '</b>, ' + Math.floor(k.age) + (where ? '<span class="tag">' + where + '</span>' : '') +
          (k.grandkids ? '<span class="tag">внуков: ' + k.grandkids + '</span>' : '') + '</div>';
      });
      h += '<div class="muted small" style="margin:6px 0 4px">Родительская семья:</div>';
    }
    var noParents = S.age(s) >= 18 && !S.parentsAlive(s).length;
    h += '<div class="muted m">' + (noParents ? 'родителей нет в живых' : esc(FAMN[fam.type] || fam.type) + ' · атмосфера дома: ' + atm(fam.atmosphere)) + '</div>';
    var home = fam.members.filter(function (m) { return m.alive && m.inHome; });
    var away = fam.members.filter(function (m) { return m.alive && !m.inHome && !(m.role === 'father' && m.unknown && fam.type === 'orphanage'); });
    var dead = fam.members.filter(function (m) { return !m.alive; });
    home.forEach(function (m) { h += memberLine(m, s); });
    if (away.length) { h += '<div class="muted small" style="margin-top:6px">Отдельно:</div>'; away.forEach(function (m) { h += memberLine(m, s); }); }
    if (dead.length) dead.forEach(function (m) { h += memberLine(m, s); });
    if (RL.Young.apart(s) || noParents) h += '<div class="muted small" style="margin-top:6px">Твоё жильё: ' + esc(RL.Young.housingName(s)) + '</div>';
    else h += '<div class="muted small" style="margin-top:6px">Жильё: ' + esc(fam.housing.name || fam.housing.type) + (fam.car ? ' · машина' : '') + (fam.dacha ? ' · дача' : '') + '</div>';
    $('family').innerHTML = h;
  }
  function atm(v) { return v >= 70 ? 'тёплая' : v >= 50 ? 'обычная' : v >= 30 ? 'напряжённая' : 'тяжёлая'; }
  var ITEMS = {food: 'Еда', utilities: 'ЖКУ', rent: 'Аренда', mortgage: 'Ипотека', transport: 'Транспорт', car: 'Машина', clothes: 'Одежда', communications: 'Связь, интернет',
    medicine: 'Лекарства, врачи', alcohol: 'Алкоголь', tobacco: 'Сигареты', kindergarten: 'Детсад', school: 'Школа', focus: 'Кружки/секции', childMisc: 'Детское (игрушки, подгузники…)',
    debt_bank: 'Кредиты (банк)', debt_mfo: 'Микрозаймы', debt_relatives: 'Долг родственникам', debt_arrears: 'Долги ЖКХ / соседям', childSupport: 'Помощь тебе', tuition: 'Твоя учёба (платно)'};
  var OWN = {rent: 'Жильё', food: 'Еда', transport: 'Транспорт', phone: 'Связь', clothes: 'Одежда', fun: 'Досуг', tobacco: 'Сигареты', alcohol: 'Алкоголь', drugs: 'Вещества',
    debt_bank: 'Кредитка', debt_mfo: 'Микрозаймы', debt_relatives: 'Долг родным', debt_edu: 'Образовательный кредит', debt_mortgage: 'Ипотека', utilities: 'ЖКУ', spouse: 'На партнёра', kids: 'Дети', kindergarten: 'Детсад', rentExtra: 'Аренда (доплата за 2 комнаты)', alimony: 'Алименты', medicine: 'Лекарства и врачи', care: 'Пансионат', fssp: 'Приставы (взыскание)',
    focus: 'Занятия (фокус года)', propUtilities: 'ЖКУ за другие квартиры'};
  function renderOwn(s) {
    var o = s.person.own, b = o.lastBudget, M = function (x) { return W.money(s, x); };
    var h = '<table><tr><td>Твой доход</td><td class="r">' + M(b.income) + '</td></tr>';
    if (b.wage) h += '<tr><td class="muted">зарплата</td><td class="r muted">' + M(b.wage) + '</td></tr>';
    if (b.stipend) h += '<tr><td class="muted">стипендия</td><td class="r muted">' + M(b.stipend) + '</td></tr>';
    if (b.help) h += '<tr><td class="muted">помощь родителей</td><td class="r muted">' + M(b.help) + '</td></tr>';
    var bz = RL.Adult ? RL.Adult.income(s) : 0;
    if (bz) h += '<tr><td class="muted">своё дело</td><td class="r muted">' + M(bz) + '</td></tr>';
    Object.keys(b.items).filter(function (k) { return b.items[k] > 1; }).sort(function (a, c) { return b.items[c] - b.items[a]; })
      .forEach(function (k) { h += '<tr><td>' + (OWN[k] || k) + '</td><td class="r">−' + M(b.items[k]) + '</td></tr>'; });
    var bal = b.income - b.need;
    h += '<tr class="sep"><td>' + (bal >= 0 ? 'Остаётся' : 'Не хватает') + '</td><td class="r">' + M(Math.abs(bal)) + '</td></tr></table>';
    if (b.cut > 1) h += '<div class="small" style="color:var(--bad)">Экономишь на еде и досуге: ' + M(b.cut) + '</div>';
    h += '<div class="small muted">Сбережения: ' + M(o.savings) + (b.debt > 1 ? '. Долги: ' + M(b.debt) : '') + '</div>';
    if (RL.Assets && RL.Assets.canRepay(s)) {
      var hasSmall = o.debts.some(function (d) { return d.balance > 0 && !d.deferred && d.kind !== 'mortgage'; }), hasMg = o.debts.some(function (d) { return d.kind === 'mortgage' && d.balance > 0; });
      h += '<div class="acts">' + (hasSmall ? '<button data-repay="small">Закрыть кредиты из накоплений</button>' : '') + (hasMg ? '<button data-repay="mortgage">Досрочно гасить ипотеку</button>' : '') + '</div>';
    }
    if (RL.Adult) { var pf = RL.Adult.portfolio(s); if (pf.deposit + pf.stocks + pf.usd > 1) h += '<div class="small muted">Вклады ' + M(pf.deposit) + ' · акции ' + M(pf.stocks) + ' · доллары ' + M(pf.usd) + '</div>'; }
    var fb = s.family.lastBudget;
    if (fb && s.family.type !== 'orphanage') h += '<div class="small muted">Семья: доход ' + M(fb.income) + ', ' + s.family.quintile + '-й квинтиль</div>';
    return h;
  }
  $('budget').addEventListener('click', function (e) {
    var b = e.target.closest('button[data-repay]'); if (!b || !state) return;
    RL.Assets.repay(state, b.dataset.repay); render();
  });
  // свободное время: занятия на неделю; рядом — сколько ровесников так проводят время (по опросам)
  var leisKey = '';
  function renderLeisure() {
    var s = state;
    if (S.age(s) < 6 || !s.person.alive) { $('leisurePanel').classList.add('hidden'); return; }
    $('leisurePanel').classList.remove('hidden');
    var L = RL.Leisure.list(s), free = s.person.free === undefined ? RL.Leisure.weekly(s) : s.person.free;
    var key = free + '|' + L.map(function (o) { return o.id + (o.ok ? 1 : 0); }).join(',') + '|' + s.date.month;
    if (key === leisKey) return; leisKey = key;
    $('leisFree').textContent = free ? 'свободных вечеров: ' + free : 'вечера на неделю закончились';
    var h = '<div class="small muted m">Одно занятие — не больше пяти раз в месяц; чем чаще, тем меньше пользы.</div><div class="leis">';
    L.forEach(function (o) {
      h += '<button data-leis="' + o.id + '"' + (o.ok ? '' : ' disabled') + ' title="' + esc(o.desc + (o.share !== null ? ' Так проводят время ' + o.share + '% твоих ровесников.' : '') + (o.ok ? '' : ' Сейчас нельзя: ' + o.why)) + '">' +
        esc(o.name) + (o.cost > 1 ? ' <span class="muted">' + W.money(s, o.cost) + '</span>' : '') + '</button>';
    });
    $('leisure').innerHTML = h + '</div>';
  }
  $('leisure').addEventListener('click', function (e) {
    var b = e.target.closest('button[data-leis]'); if (!b || b.disabled || !state) return;
    var rng = new RL.RNG(1); rng.s = state.rng;
    RL.Leisure.act(state, b.dataset.leis, rng); state.rng = rng.s;
    leisKey = ''; render();
    if (state.pending) { play(false); showModal(); }
  });
  function renderBudget() {
    var s = state, fam = s.family, b = fam.lastBudget, M = function (x) { return W.money(s, x); };
    var own = s.person.own;
    if (own && own.lastBudget && RL.Young.apart(s)) { $('budgetTitle').textContent = 'Твой бюджет (в месяц)'; $('budget').innerHTML = renderOwn(s); return; }
    $('budgetTitle').textContent = 'Бюджет семьи (в месяц)';
    if (!b) { $('budget').innerHTML = '<span class="muted">—</span>'; return; }
    if (fam.type === 'orphanage') { $('budget').innerHTML = '<span class="muted">' + esc(b.note) + '</span>'; return; }
    var h = '<table><tr><td>Доход семьи</td><td class="r">' + M(b.income) + '</td></tr>';
    if (b.benefits > 1) h += '<tr><td class="muted">в т.ч. пособия, алименты, помощь</td><td class="r muted">' + M(b.benefits) + '</td></tr>';
    var items = Object.keys(b.items).filter(function (k) { return b.items[k] > 1; }).sort(function (a, c) { return b.items[c] - b.items[a]; });
    items.forEach(function (k) { h += '<tr><td>' + (ITEMS[k] || k) + '</td><td class="r">−' + M(b.items[k]) + '</td></tr>'; });
    var bal = b.income - b.expense;
    h += '<tr class="sep"><td>' + (bal >= 0 ? 'Остаётся' : 'Не хватает') + '</td><td class="r">' + M(Math.abs(bal)) + '</td></tr></table>';
    if (b.cut > 1) h += '<div class="small" style="color:var(--bad)">Экономят на еде, одежде, детском: ' + M(b.cut) + '</div>';
    var q = ['', 'беднейшие 20%', 'ниже среднего', 'средние', 'выше среднего', 'богатейшие 20%'][fam.quintile];
    h += '<div class="small muted">На человека: ' + M(b.perCapita) + ' · ' + fam.quintile + '-й квинтиль (' + q + ')' + (fam.poverty ? ' · <b style="color:var(--bad)">за чертой бедности</b>' : '') + '</div>';
    h += '<div class="small muted">Сбережения: ' + M(fam.savings) + (b.debt > 1 ? ' · Долги: ' + M(b.debt) : '') + (fam.housing.mortgage ? ' · Ипотека: ' + M(fam.housing.mortgage.balance) : '') + '</div>';
    if (b.notes && b.notes.length) h += '<div class="small" style="color:var(--bad)">' + esc(b.notes.join(', ')) + '</div>';
    $('budget').innerHTML = h;
  }
  function renderHealth() {
    var s = state, p = s.person, acc = RL.Health.access(s), h = '';
    var act = p.conditions.filter(function (c) { return !c.cured; });
    if (!act.length) h += '<div class="m muted">Хронических диагнозов нет.</div>';
    act.forEach(function (c) {
      var d = RL.DATA.conditions[c.id];
      h += '<div class="m">' + esc(RL.Health.condName(c)) + (c.severe ? ' (тяжёлый)' : '') + '<span class="tag' + (c.treated ? '' : ' bad') + '">' + (c.treated ? 'лечат' : 'не лечат как надо') + '</span></div>';
    });
    if (p.disability) h += '<div class="m">Инвалидность с ' + p.disability.since + ' г.</div>';
    RL.Report.habitLines(s).forEach(function (x) { h += '<div class="m"><span class="tag bad">' + esc(x) + '</span></div>'; });
    h += '<div class="small muted">Доступ к медицине: ' + (acc >= 0.75 ? 'хороший' : acc >= 0.5 ? 'средний' : acc >= 0.3 ? 'плохой' : 'почти нет') + (s.family.quintile >= 4 ? ' (есть деньги на платные клиники)' : '') + '</div>';
    $('health').innerHTML = h;
  }
  function renderEdu() {
    var s = state, p = s.person, ed = p.education, h = '';
    var stage = RL.Report.STAGES[ed.stage];
    var where = ed.stage === 'vuz' ? ': ' + esc(ed.vuz.name) : ed.stage === 'school' ? ': ' + esc(ed.school.name) + ', ' + ed.grade + ' класс' : ed.stage === 'college' ? ': ' + esc(ed.school.name) + ', ' + ed.grade + ' курс' + (ed.dorm ? ', общежитие' : '') :
      ed.stage === 'colony' ? ', осталось ' + Math.max(0, p.flags.sentenceMonths) + ' мес.' : '';
    h += '<div class="m">' + stage + (ed.kg && ed.kg.name ? ' — ' + esc(ed.kg.name) : ed.kg && ed.kg.private ? ' — частный' : '') + where + '</div>';
    RL.Report.examLines(s).forEach(function (x) { h += '<div class="small">' + esc(x) + '</div>'; });
    if (S.age(s) >= 16) RL.Report.lifeLines(s).slice(1).forEach(function (x) { h += '<div class="small">' + esc(x) + '</div>'; });
    if (ed.vuz) h += '<div class="small">Курс ' + ed.vuz.course + ' из ' + ed.vuz.years + ' · «' + RL.DATA.fields[ed.vuz.field].name + '» · ' + {budget: 'бюджет', paid: 'платно', target: 'целевое', zaochno: 'заочно', magistr: 'магистратура'}[ed.vuz.form] + (ed.vuz.sessions.length ? ' · последняя сессия: ' + ed.vuz.sessions.slice(-1)[0] : '') + '</div>';
    if (ed.prep > 1 && ed.stage === 'school') h += '<div class="small muted">Подготовка к экзаменам: ' + Math.round(Math.min(30, ed.prep) / 30 * 100) + '%</div>';
    if (ed.performance) h += '<div class="m">Успеваемость: ' + ed.performance + '</div>';
    var f = RL.Childhood.focusDef(p.focus);
    if (S.age(s) >= 3) h += '<div class="small muted">Фокус года: ' + esc(RL.Childhood.focusName(s, f)) + '</div>';
    $('edu').innerHTML = h;
  }
  // связи: конкретные люди, которые могут помочь (RL.Social); сила — насколько близко общаетесь
  function renderTies() {
    var T = (state.person.ties || []).slice().sort(function (a, b) { return b.rank * 40 + b.str - (a.rank * 40 + a.str); });
    $('tiesPanel').style.display = S.age(state) >= 16 ? '' : 'none';
    $('ties').innerHTML = T.length ? T.map(function (t) {
      return '<div class="m">' + esc(RL.Social.label(t)) + ' <span class="small muted">' + (t.str >= 60 ? 'близко' : t.str >= 30 ? 'общаетесь' : 'остывает') + '</span></div>';
    }).join('') : '<span class="muted">Нужных знакомых пока нет. Они появляются в вузе, армии, на работе и в компаниях друзей.</span>';
  }
  function renderTraits() {
    var p = state.person, T = RL.DATA.traits, list = [];
    Object.keys(p.traits).forEach(function (k) { var v = p.traits[k]; if (Math.abs(v) >= 8) list.push([Math.abs(v), RL.Report.traitLabel(k, v, p.sex) + (Math.abs(v) >= 30 ? '!' : '')]); });
    list.sort(function (a, b) { return b[0] - a[0]; });
    $('traits').innerHTML = list.length ? list.map(function (x) { return '<span class="tag" style="font-size:12.5px;color:var(--fg)">' + esc(x[1]) + '</span>'; }).join(' ') :
      '<span class="muted">Характер ещё не сложился — его формируют твои выборы.</span>';
  }

  // ---------- решения ----------
  function showModal() {
    var pd = state.pending; if (!pd) return;
    var h = '<h2>' + esc(pd.title || 'Решение') + '</h2><p>' + esc(pd.text) + '</p><div class="opts">';
    if (pd.kind === 'focus') {
      // основные фокусы сразу, дополнительные (справочник js/data/focuses_ext.js) — под «Ещё занятия»
      var btn = function (o) {
        return '<button data-f="' + o.id + '"' + (o.ok ? '' : ' disabled') + '><b>' + esc(o.name) + '</b>' + (o.cost ? ', ' + W.money(state, o.cost) + ' в месяц' : '') +
          '<small>' + esc(o.ok ? o.desc : 'Недоступно: ' + o.why) + '</small></button>';
      };
      var main = pd.options.filter(function (o) { var f = RL.Childhood.focusDef(o.id); return !(f && f.ext); }).sort(function (a, b) { var fa = RL.Childhood.focusDef(a.id), fb = RL.Childhood.focusDef(b.id); return (fb && fb.careerFocus ? 1 : 0) - (fa && fa.careerFocus ? 1 : 0); }), more = pd.options.filter(function (o) { var f = RL.Childhood.focusDef(o.id); return f && f.ext; });
      main.forEach(function (o) { h += btn(o); });
      if (more.length) h += '</div><details class="more"><summary>Ещё занятия (' + more.length + ')</summary><div class="opts">' + more.map(btn).join('') + '</div></details><div>';
    } else pd.choices.forEach(function (c, n) { h += '<button data-c="' + c.i + '">' + (n < 9 ? '<kbd>' + (n + 1) + '</kbd>' : '') + esc(c.text) + '</button>'; });
    h += '</div><p class="small muted" style="margin-top:12px">Время стоит, пока ты не выберешь. Клавиши 1–9 — выбор, «авто» (A) — игра решает сама.</p>';
    $('modalBox').innerHTML = h;
    $('modal').classList.remove('hidden');
  }
  function hideModal() { $('modal').classList.add('hidden'); }
  $('modalBox').addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b || b.disabled) return;
    if (b.dataset.f) RL.Game.chooseFocus(state, b.dataset.f);
    else if (b.dataset.c !== undefined) RL.Game.resolveEvent(state, +b.dataset.c);
    hideModal(); render();
    if (state.over) { showReport(); return; }
    if (state.pending) showModal(); else play(true);
  });

  // ---------- отчёт ----------
  function showReport() {
    var s = state, rep = RL.Report.build(s);
    var li = function (arr) { return arr.length ? '<ul>' + arr.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' : '<p class="muted">—</p>'; };
    var h = '<h1>' + esc(rep.title) + '</h1>';
    h += '<p class="big">' + rep.born + ' — ' + (rep.dead ? rep.ended + ' · ' + esc(rep.cause) : 'жизнь продолжается') + '</p>';
    h += '<p>' + esc(RL.Report.verdict(rep, s)) + '</p>';
    var ep = RL.Report.epitaph(s); if (ep) h += '<p class="epitaph">«' + esc(ep) + '»</p>';
    var soc = RL.Report.sociology ? RL.Report.sociology(s) : []; if (soc.length) h += '<div class="sociology"><h3>Социологический разбор</h3>' + li(soc) + '</div>';
    var bd = RL.Report.badges(s); if (bd.length) h += '<div class="badges">' + bd.map(function (x, i) { return '<span class="badge' + (x.dark ? ' dark' : '') + '" style="animation-delay:' + (0.3 + i * 0.07) + 's"><i>' + x.icon + '</i>' + esc(x.text) + '</span>'; }).join('') + '</div>';
    h += '<canvas id="chart" width="900" height="260"></canvas>';
    h += '<div class="grid"><div><h3>Итог жизни</h3>' + li(RL.Report.summary(s)) + '</div><div><h3>Жизнь по десятилетиям</h3>' + li(RL.Report.decades(s)) + '</div></div>';
    h += '<div class="grid">';
    h += '<div><h3>Где и с кем</h3>' + li([(s.person.sex === 'f' ? 'Родилась: ' : 'Родился: ') + s.history[0].city, 'Сейчас: ' + rep.place].concat(rep.familyPath)) + '</div>';
    h += '<div><h3>Характер</h3>' + li(rep.traits.length ? rep.traits : ['не успел сложиться']) + '<h3>Фокусы по годам</h3>' + li(rep.focusHistory) + '</div>';
    h += '<div><h3>Здоровье</h3>' + li(rep.conditions.length ? rep.conditions : ['без хронических диагнозов']) + (rep.disability ? '<p>Инвалидность: ' + esc(rep.disability) + '</p>' : '') +
      '<h3>Учёба</h3>' + li(rep.education.map(function (e) { return (typeof e.grade === 'number' ? e.grade + ' класс' : e.grade) + ' (' + e.year + '): ' + e.result; })) +
      '<h3>Экзамены и итоги</h3>' + li(RL.Report.examLines(s).concat(RL.Report.lifeLines(s))) + '<h3>Привычки</h3>' + li(RL.Report.habitLines(s).length ? RL.Report.habitLines(s) : ['без вредных привычек']) + '</div>';
    var hid = rep.hidden;
    h += '<div><h3>Скрытые задатки (теперь можно узнать)</h3>' + li(['Интеллект (IQ-шкала): ' + hid.iq, 'Физические данные: ' + hid.physique + '/100', 'Творческие способности: ' + hid.creativity + '/100',
      'Социальность: ' + hid.sociality + '/100', 'Устойчивость психики: ' + hid.resilience + '/100', 'Внешность: ' + rep.appearance + '/100']) + '</div>';
    h += '</div><h3>Главное в жизни</h3>' + li(rep.keyEvents.filter(function (x) { return !/перешл?а? в \d+ класс|перешёл в \d+ класс|курс колледжа закрыт|курс закрыт/.test(x); }).slice(-150));
    h += '<div class="controls" style="margin-top:12px"><button id="rSave">Сохранить историю (JSON)</button><button id="rLog">Назад к логу</button><button id="rNew" class="primary">Новая жизнь</button></div>';
    $('report').innerHTML = h;
    show('report');
    drawChart($('chart'), s);
    $('rSave').onclick = function () { download('жизнь_' + s.person.lastName + '_' + s.birth.year + '.json', {report: rep, state: s}); };
    $('rLog').onclick = function () { show('game'); };
    $('rNew').onclick = function () { renderSaves(); show('setup'); };
  }
  function drawChart(cv, s) {
    var ctx = cv.getContext('2d'), Wd = cv.width, Ht = cv.height, pad = 28;
    var css = getComputedStyle(document.documentElement);
    var fg = css.getPropertyValue('--muted') || '#888';
    var cols = {health: '#c0392b', money: '#b7950b', skills: '#2471a3', social: '#7d3c98', mental: '#1e8449', happiness: '#d35400'};
    var hist = s.history.slice();
    hist.push({age: Math.floor(s.person.alive ? S.age(s) : s.person.deathAge), stats: s.person.stats});
    var maxA = Math.max(1, hist[hist.length - 1].age);
    ctx.clearRect(0, 0, Wd, Ht); ctx.font = '12px sans-serif'; ctx.fillStyle = fg; ctx.strokeStyle = fg; ctx.globalAlpha = 0.3;
    for (var g = 0; g <= 100; g += 25) { var yy = Ht - pad - (Ht - 2 * pad) * g / 100; ctx.beginPath(); ctx.moveTo(pad, yy); ctx.lineTo(Wd - 110, yy); ctx.stroke(); }
    ctx.globalAlpha = 1;
    var grid = ctx.getImageData(0, 0, Wd, Ht), t0 = null, dur = 1400;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function frame(ts) {
      if (t0 === null) t0 = ts;
      var k01 = reduce ? 1 : Math.min(1, (ts - t0) / dur), ease = 1 - Math.pow(1 - k01, 3), upto = maxA * ease;
      ctx.putImageData(grid, 0, 0);
      Object.keys(cols).forEach(function (k, i) {
        ctx.strokeStyle = cols[k]; ctx.lineWidth = 2; ctx.lineJoin = 'round'; ctx.beginPath();
        var started = false;
        for (var j = 0; j < hist.length; j++) {
          var h = hist[j]; if (h.age > upto) break;
          var x = pad + (Wd - 110 - pad) * h.age / maxA, y = Ht - pad - (Ht - 2 * pad) * h.stats[k] / 100;
          if (started) ctx.lineTo(x, y); else { ctx.moveTo(x, y); started = true; }
        }
        ctx.stroke(); ctx.fillStyle = cols[k]; ctx.fillText(RL.Report.STATS[k], Wd - 104, pad + i * 16);
      });
      ctx.fillStyle = fg; ctx.fillText('возраст → ' + Math.round(upto), pad, Ht - 8);
      if (k01 < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  // стартовый экран: счётчик рождений (~1,22 млн в год ≈ один ребёнок каждые 26 секунд) и число событий
  (function () {
    var t0 = Date.now(), last = -1;
    if ($('evCount')) $('evCount').textContent = RL.DATA.events.length;
    function word(n) { var a = n % 100, b = n % 10; return a > 10 && a < 20 ? 'детей' : b === 1 ? 'ребёнок' : b >= 2 && b <= 4 ? 'ребёнка' : 'детей'; }
    setInterval(function () {
      var n = Math.floor((Date.now() - t0) / 25800);
      if (n !== last && $('bornNow')) { last = n; $('bornNow').textContent = n; $('bornWord').textContent = word(n); $('bornNow').classList.remove('tick'); void $('bornNow').offsetWidth; $('bornNow').classList.add('tick'); }
    }, 1000);
  })();

  // горячие клавиши: пробел — пауза, 1–5 — скорость, A — авто, в окне решения 1–9 — вариант
  document.addEventListener('keydown', function (e) {
    if (!state || $('game').classList.contains('hidden') || /INPUT|TEXTAREA/.test((e.target || {}).tagName || '')) return;
    var modalOpen = !$('modal').classList.contains('hidden');
    if (modalOpen && /^[1-9]$/.test(e.key)) {
      var btns = [].slice.call($('modalBox').querySelectorAll('.opts button')).filter(function (b) { return !b.disabled; });
      var b = btns[+e.key - 1]; if (b) { b.click(); e.preventDefault(); }
      return;
    }
    if (e.code === 'Space') { e.preventDefault(); $('btnPlay').click(); }
    else if (!modalOpen && /^[1-6]$/.test(e.key)) { var sp = $('speeds').querySelectorAll('button')[+e.key - 1]; if (sp) sp.click(); }
    else if (e.code === 'KeyF' && !modalOpen) $('btnFocus').click();
    else if (e.code === 'KeyA') { var a = $('auto'); a.checked = !a.checked; a.onchange.call(a); }
  });
  // ---------- паспорт ----------
  function renderPassport(s, age) {
    var p = s.person, a = Math.floor(age), bd = s.birth;
    $('ppNo').textContent = String(4500 + (s.seed % 4000)).replace(/(\d{2})(\d{2})/, '$1 $2') + ' ' + String(100000 + (s.seed % 899999));
    var key = RL.Avatar.key(s);
    if ($('ppPhoto').dataset.k !== key) { $('ppPhoto').dataset.k = key; $('ppPhoto').innerHTML = RL.Avatar.forPerson(s); }
    var f = [['Пол', p.sex === 'f' ? 'жен.' : 'муж.'], ['Дата рождения', ('0' + (new RL.RNG(s.seed ^ 99).int(1, 28))).slice(-2) + '.' + ('0' + (bd.month + 1)).slice(-2) + '.' + bd.year],
      ['Место рождения', s.history[0] ? s.history[0].city : p.city]];
    var eth = RL.DATA.ethnic[p.ethnic]; if (eth) f.push(['Национальность', eth[p.sex]]);
    $('ppFields').innerHTML = f.map(function (x) { return '<dt>' + x[0] + '</dt><dd>' + esc(x[1]) + '</dd>'; }).join('');
    $('ppJob').innerHTML = occupation(s);
    $('ppStamps').innerHTML = stamps(s).map(function (x, i) { return '<span class="pstamp' + (x.off ? ' off' : '') + '" style="--r:' + ((i % 3) * 3 - 3) + 'deg" title="' + esc(x.t) + '">' + esc(x.s) + '</span>'; }).join('');
  }
  function occupation(s) {
    var p = s.person, ed = p.education, j = p.job, a = S.age(s), f = RL.Childhood.focusDef(p.focus), out = [];
    if (!p.alive) return '<b>' + esc(p.deathCause || '') + '</b>';
    if (j && j.employed) {
      var pr = S.prof({job: j, sex: p.sex}), lvl = RL.DATA.adult.levels[j.level || 0];
      var t = j.prof === 'athlete' && p.sport ? (p.sport.club + ', ' + RL.DATA.sport.kinds[p.sport.kind].name) : j.prof === 'deputy' && j.title ? j.title : pr ? pr[p.sex] : '';
      out.push('<b>' + esc(t) + '</b>' + (j.level ? ' — ' + esc(lvl.name) : '') + (j.onLeave ? ', в декрете' : ''));
    } else if (ed.stage === 'vuz' && ed.vuz) out.push('<b>Студент' + (p.sex === 'f' ? 'ка' : '') + '</b>, ' + esc(ed.vuz.name));
    else if (ed.stage === 'school' && ed.school) out.push('<b>' + ed.grade + ' класс</b>, ' + esc(ed.school.name));
    else if (ed.stage === 'college' && ed.school) out.push('<b>' + ed.grade + ' курс</b>, ' + esc(ed.school.name));
    else if (ed.stage === 'kindergarten') out.push('<b>Детский сад</b>');
    else if (ed.stage === 'army') out.push('<b>Служба в армии</b>');
    else if (ed.stage === 'colony') out.push('<b>Колония</b>');
    else if (p.pension) out.push('<b>Пенсионер' + (p.sex === 'f' ? 'ка' : '') + '</b>');
    else if (a >= 16) out.push('<b>Без работы</b>');
    else out.push('<b>' + (a < 1 ? 'Младенец' : 'Дома') + '</b>');
    if (p.biz) out.push('своё дело: ' + esc(p.biz.name));
    if (f && a >= 3) out.push('<span class="muted">Фокус: ' + esc(RL.Childhood.focusName(s, f)) + '</span>');
    return out.join('<br>');
  }
  // штампы как в паспорте: брак, развод, дети, военный билет, судимость, депутат
  function stamps(s) {
    var p = s.person, out = [];
    (p.exes || []).forEach(function (x) { if (x.status === 'married') { out.push({s: 'Брак ' + (x.year - Math.round((x.months || 0) / 12)), t: 'Зарегистрирован брак с ' + x.name}); if (!x.widowed) out.push({s: 'Развод ' + x.year, t: 'Брак расторгнут', off: true}); } });
    if (p.spouse && p.spouse.status === 'married') out.push({s: 'Брак ' + (s.birth.year + Math.floor((p.spouse.marriedM || p.spouse.since || 0) / 12)), t: 'Зарегистрирован брак: ' + p.spouse.name});
    var kids = (p.kids || []).filter(function (k) { return k.alive; }).length;
    if (kids) out.push({s: 'Дети: ' + kids, t: (p.kids || []).map(function (k) { return k.name; }).join(', ')});
    if (p.flags.served) out.push({s: p.flags.officerReserve ? 'Офицер запаса' : 'Военнообязанный', t: 'Отметка военкомата'});
    if (p.flags.criminalRecord) out.push({s: 'Судимость', t: 'Есть судимость', off: true});
    if (p.politics && p.politics.level) out.push({s: 'Депутат', t: RL.DATA.politics.levels[p.politics.level].name});
    if (p.pension) out.push({s: 'Пенсия с ' + p.pension.since, t: 'Пенсионное удостоверение'});
    return out.slice(-8);
  }
  // силуэт на «фото»: младенец, ребёнок, подросток, взрослый, пожилой
  function silhouette(sex, a, dead) {
    var c = dead ? 'var(--muted)' : 'var(--ink)', st = a < 3 ? 0 : a < 12 ? 1 : a < 18 ? 2 : a < 60 ? 3 : 4, f = sex === 'f';
    var head = [[60, 64, 24], [60, 50, 21], [60, 46, 19], [60, 44, 18], [60, 47, 18]][st];
    var sh = ['M28 150 C30 118 44 98 60 98 C76 98 90 118 92 150 Z', 'M26 150 C28 108 44 84 60 84 C76 84 92 108 94 150 Z',
      'M16 150 C18 104 40 78 60 78 C80 78 102 104 104 150 Z', 'M10 150 C12 100 38 74 60 74 C82 74 108 100 110 150 Z', 'M12 150 C14 104 38 80 60 80 C82 80 106 104 108 150 Z'][st];
    var hair = '';
    if (st >= 1 && f) hair = '<path d="M' + (head[0] - head[2] - 4) + ' ' + (head[1] + (st === 4 ? 6 : 26)) + ' C' + (head[0] - head[2] - 8) + ' ' + (head[1] - head[2] - 10) + ' ' + (head[0] + head[2] + 8) + ' ' + (head[1] - head[2] - 10) + ' ' + (head[0] + head[2] + 4) + ' ' + (head[1] + (st === 4 ? 6 : 26)) + ' Z" fill="' + c + '" opacity=".55"/>';
    if (st >= 1 && !f) hair = '<path d="M' + (head[0] - head[2]) + ' ' + (head[1] - 2) + ' C' + (head[0] - head[2]) + ' ' + (head[1] - head[2] - 8) + ' ' + (head[0] + head[2]) + ' ' + (head[1] - head[2] - 8) + ' ' + (head[0] + head[2]) + ' ' + (head[1] - 2) + ' Z" fill="' + c + '" opacity="' + (st === 4 ? '.25' : '.55') + '"/>';
    var glasses = st === 4 ? '<g fill="none" stroke="var(--paper)" stroke-width="2"><circle cx="53" cy="47" r="5"/><circle cx="67" cy="47" r="5"/><path d="M58 47h4"/></g>' : '';
    return '<svg viewBox="0 0 120 150" role="img" aria-label="Фото"><rect width="120" height="150" fill="var(--paper2)"/>' +
      '<path d="' + sh + '" fill="' + c + '" opacity=".78"/>' + hair + '<circle cx="' + head[0] + '" cy="' + head[1] + '" r="' + head[2] + '" fill="' + c + '" opacity=".85"/>' + glasses + '</svg>';
  }

  // ---------- рулетка рождения ----------
  function roulette(s) {
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var p = s.person, r = S.region(s), st = RL.DATA.settlementTypes[p.settlement];
    var regs = RL.DATA.regions.filter(function (x) { return !x.legacy; });
    var cityPool = []; regs.forEach(function (x) { Object.keys(x.cities).forEach(function (k) { cityPool = cityPool.concat(x.cities[k]); }); });
    var eth = RL.DATA.ethnic[p.ethnic] || {};
    var reels = [
      {l: 'Регион', v: r.name, pool: regs.map(function (x) { return x.name; })},
      {l: 'Где именно', v: p.city + ' (' + st.name + ')', pool: cityPool},
      {l: 'Семья', v: RL.Report.FAM[s.family.type] || s.family.type, pool: Object.keys(RL.Report.FAM).map(function (k) { return RL.Report.FAM[k]; })},
      {l: 'Достаток', v: ['', 'беднейшие 20%', 'ниже среднего', 'средние', 'выше среднего', 'богатейшие 20%'][s.family.quintile || 3] || 'средние', pool: ['беднейшие 20%', 'ниже среднего', 'средние', 'выше среднего', 'богатейшие 20%']},
      {l: 'Национальность', v: eth[p.sex] || '—', pool: Object.keys(RL.DATA.ethnic).map(function (k) { return RL.DATA.ethnic[k][p.sex] || k; })}
    ];
    $('reels').innerHTML = reels.map(function (x, i) { return '<div class="reel spin" id="reel' + i + '"><span>' + x.l + '</span><b>…</b></div>'; }).join('');
    $('rlTitle').textContent = (p.sex === 'f' ? 'Где родится ' : 'Где родится ') + p.firstName + ' ' + p.lastName + ', ' + s.birth.year;
    $('rlGo').disabled = true; $('roulette').classList.remove('hidden');
    var t0 = performance.now(), stopAt = reels.map(function (x, i) { return reduce ? 0 : 900 + i * 650; }), done = false, timer = null;
    function finish() {
      if (done) return; done = true; clearInterval(timer);
      reels.forEach(function (x, i) { var el = $('reel' + i); el.classList.remove('spin'); el.classList.add('done'); el.querySelector('b').textContent = x.v; });
      $('rlGo').disabled = false; $('rlGo').focus();
    }
    timer = setInterval(function () {
      var t = performance.now() - t0, left = 0;
      reels.forEach(function (x, i) {
        var el = $('reel' + i);
        if (t < stopAt[i]) { left++; el.querySelector('b').textContent = x.pool[Math.floor(Math.random() * x.pool.length)]; }
        else if (el.classList.contains('spin')) { el.classList.remove('spin'); el.classList.add('done'); el.querySelector('b').textContent = x.v; }
      });
      if (!left) finish();
    }, 70);
    $('rlSkip').onclick = finish;
    $('rlGo').onclick = function () { finish(); $('roulette').classList.add('hidden'); start(s); };
  }

  renderSaves();
})();
