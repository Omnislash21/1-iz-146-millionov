// Портрет персонажа на «фото в паспорте»: внешность выпадает один раз (из seed) и дальше только стареет.
// Кожа, волосы, глаза — по группе национальности (типичные сочетания, не правило); причёска, борода, веснушки, серьги — случайно.
// С возрастом: детские пропорции, седина, лысина, морщины, очки. От состояния: близорукость — очки, ожирение — полнее,
// «Удовлетворённость» — улыбка или грусть, плохая психика — круги под глазами. Дети наследуют черты родителей.
RL.Avatar = (function () {
  // группы внешности по национальности (по набору имён и названию)
  var GROUP = {slavic: 'north', tatar: 'volga', chechen: 'cauc', dagestan: 'cauc', ossetian: 'cauc', circassian: 'cauc', armenian: 'cauc', azeri: 'cauc',
    central_asia: 'central', tajik: 'central', buryat: 'east', yakut: 'east'};
  var BY_ID = {chuvash: 'volga', mari: 'volga', udmurt: 'volga', mordvin: 'north', komi: 'north', khanty: 'east', kazakh: 'central_e', kyrgyz: 'central_e',
    korean: 'east', altai: 'east', khakas: 'east', tuvan: 'east', kalmyk: 'east', jewish: 'north', german: 'north'};
  var BY_NAME = [[/араб|ассири|перс|курд|езид|афган/, 'arab'], [/инди|пакистан|цыган/, 'south'], [/кубин|американ/, 'mixed'], [/китаец|япон|вьетнам|монгол|сойот|эвенк|эвен|чукч|коряк|нен|долган|нанай|ульч|нивх|удэге|орочи|юкагир|ительмен|эскимос|алеут|негидал|тофалар|шорец|телеут|кумандин|чулым|кет|селькуп|нганасан|энец|уйльта|ороч/, 'east'],
    [/грузин|абхаз|абазин|шапсуг|турок|греч|грек|талыш|таты|удин/, 'cauc'], [/узбек|туркмен|уйгур|дунган|памир|каракалп/, 'central']];
  var SKIN = {north: ['#f6dcc8', '#f1d0b5', '#ebc4a4', '#e4b896'], volga: ['#f1d0b5', '#e9c3a0', '#e0b48f'], cauc: ['#ecc6a2', '#e2b58e', '#d6a47c'],
    central: ['#e2b48c', '#d4a074', '#c99367'], central_e: ['#e8c29c', '#dcae84', '#cf9e74'], east: ['#f0d2b0', '#e6c39c', '#dbb28a'],
    arab: ['#d2a077', '#c08b62', '#b07c55'], south: ['#b47a52', '#a06a45', '#8c5c3c'], mixed: ['#e8c29c', '#b47a52', '#7a4a2e', '#f1d0b5']};
  var HAIR = {blond: '#d9bb7c', lightbrown: '#a77d52', brown: '#6b4a30', dark: '#3b2b1f', black: '#1e1a18', red: '#b0532a'};
  var HAIRW = {north: {blond: 0.18, lightbrown: 0.3, brown: 0.3, dark: 0.16, red: 0.06}, volga: {blond: 0.05, lightbrown: 0.15, brown: 0.4, dark: 0.38, red: 0.02},
    cauc: {brown: 0.1, dark: 0.35, black: 0.55}, central: {dark: 0.25, black: 0.75}, central_e: {dark: 0.2, black: 0.8}, east: {dark: 0.1, black: 0.9},
    arab: {dark: 0.3, black: 0.7}, south: {dark: 0.2, black: 0.8}, mixed: {brown: 0.3, dark: 0.3, black: 0.4}};
  var EYE = {blue: '#4d7fb0', grey: '#7d8b96', green: '#5c8a58', brown: '#6a4529', hazel: '#8a6a3a'};
  var EYEW = {north: {blue: 0.3, grey: 0.3, green: 0.13, brown: 0.2, hazel: 0.07}, volga: {blue: 0.12, grey: 0.22, green: 0.1, brown: 0.46, hazel: 0.1},
    cauc: {brown: 0.75, hazel: 0.15, green: 0.06, blue: 0.04}, central: {brown: 0.92, hazel: 0.08}, central_e: {brown: 0.95, hazel: 0.05}, east: {brown: 1},
    arab: {brown: 0.9, hazel: 0.1}, south: {brown: 1}, mixed: {brown: 0.7, hazel: 0.15, green: 0.15}};
  var BEARD = {north: 0.2, volga: 0.25, cauc: 0.55, central: 0.35, central_e: 0.15, east: 0.05, arab: 0.5, south: 0.35, mixed: 0.25};
  var CLOTH = ['#3f5a7a', '#6d1a2b', '#2f5b4a', '#5a4a7a', '#7a5a3a', '#3d3d48', '#8a3f3f', '#2d6b7a', '#7a6a2f', '#4a4a4a'];

  function hash(str) { var h = 2166136261; str = String(str); for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function wkey(rng, w) { return rng.weightedKey(w); }
  function groupOf(ethKey) {
    var e = RL.DATA.ethnic[ethKey] || {}, n = (e.m || '').toLowerCase();
    if (BY_ID[ethKey]) return BY_ID[ethKey];
    for (var i = 0; i < BY_NAME.length; i++) if (BY_NAME[i][0].test(n)) return BY_NAME[i][1];
    if (e.names && /^ext_(chinese|japanese|vietnamese|korean|mongol|tyva|turk_siberia|sakha|kalmyk)$/.test(e.names)) return 'east';
    if (e.names && /^ext_georgian$/.test(e.names)) return 'cauc';
    return GROUP[e.names] || 'north';
  }
  // внешность: seed, пол, национальность; parents — внешность родителей (для детей)
  function make(seed, sex, ethKey, parents) {
    var rng = new RL.RNG(seed >>> 0), g = groupOf(ethKey), par = (parents || []).filter(Boolean);
    var from = function (k, fn) { return par.length && rng.chance(0.8) ? rng.pick(par)[k] : fn(); };
    var L = {
      sex: sex, g: g,
      skin: from('skin', function () { return rng.pick(SKIN[g]); }),
      hair: from('hair', function () { return HAIR[wkey(rng, HAIRW[g])]; }),
      eye: from('eye', function () { return EYE[wkey(rng, EYEW[g])]; }),
      epi: par.length ? rng.pick(par).epi : g === 'east' ? 1 : g === 'central_e' ? 0.7 : g === 'central' ? 0.3 : 0,
      faceW: 20.5 + rng.range(0, 3.5), faceH: 25 + rng.range(0, 3.5), jaw: rng.range(0, 1),
      brow: (g === 'cauc' || g === 'arab' ? 1.4 : 1) * rng.range(0.8, 1.25),
      nose: rng.int(0, 2), lips: rng.range(0.8, 1.2),
      style: sex === 'f' ? wkey(rng, {long: 0.32, bob: 0.2, ponytail: 0.2, curly: g === 'cauc' || g === 'south' ? 0.2 : 0.1, braid: 0.08, short: 0.06})
        : wkey(rng, {short: 0.42, side: 0.2, buzz: 0.15, curly: g === 'cauc' || g === 'south' || g === 'mixed' ? 0.15 : 0.07, long: 0.04, quiff: 0.08}),
      beard: sex === 'm' && rng.chance(BEARD[g]) ? (rng.chance(0.35) ? 'mustache' : rng.chance(0.5) ? 'stubble' : 'full') : null,
      baldAge: sex === 'm' && rng.chance(0.5) ? rng.int(32, 75) : 0,
      grayAge: Math.round(rng.normal(sex === 'f' ? 52 : 48, 7)),
      freckles: false, earrings: sex === 'f' && rng.chance(0.65), mole: rng.chance(0.15) ? [rng.range(-12, 12), rng.range(-4, 10)] : null,
      cloth: rng.pick(CLOTH), collar: rng.int(0, 2), oldGlasses: rng.chance(0.55)
    };
    L.freckles = (L.hair === HAIR.red && rng.chance(0.6)) || (g === 'north' && rng.chance(0.06));
    return L;
  }
  function personLook(s) {
    var p = s.person;
    if (!p.look) p.look = make(s.seed ^ 0xA5A5, p.sex, p.ethnic);
    return p.look;
  }
  function spouseLook(c) { if (!c.look) c.look = make(hash(c.id || c.name), c.sex, c.ethnic || 'russian'); return c.look; }
  function kidLook(s, k) {
    if (!k.look) k.look = make(hash(k.name + (k.bornM || 0)), k.sex, s.person.ethnic, [personLook(s), s.person.spouse ? spouseLook(s.person.spouse) : null]);
    return k.look;
  }
  function memberLook(m, s) { if (!m.look) m.look = make(hash((m.id || m.role) + m.name + s.seed), m.sex, m.ethnic || s.person.ethnic, m.role === 'sibling' ? [personLook(s)] : null); return m.look; }

  function mix(c1, c2, t) {
    var a = parseInt(c1.slice(1), 16), b = parseInt(c2.slice(1), 16);
    var r = Math.round(((a >> 16) & 255) * (1 - t) + ((b >> 16) & 255) * t), g = Math.round(((a >> 8) & 255) * (1 - t) + ((b >> 8) & 255) * t), bl = Math.round((a & 255) * (1 - t) + (b & 255) * t);
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + bl).toString(16).slice(1);
  }

  // o: {age, happiness, mental, glasses, obese, dead, scar}
  function svg(L, o) {
    var a = o.age, f = L.sex === 'f';
    var st = a < 2 ? 0 : a < 12 ? 1 : a < 18 ? 2 : a < 60 ? 3 : 4;
    var gray = a >= L.grayAge ? Math.min(1, (a - L.grayAge) / 22 + 0.15) : 0;
    var hair = gray ? mix(L.hair, '#d8d6d2', gray) : L.hair, brow = gray > 0.5 ? mix(L.hair, '#cfccc6', gray * 0.7) : L.hair;
    var skin = L.skin, shade = mix(skin, '#7a4a35', 0.22), line = mix(skin, '#3a2418', 0.55);
    var sc = [1.12, 1.05, 1.0, 1.0, 0.98][st];
    var cx = 60, cy = [70, 62, 56, 54, 55][st], fw = L.faceW * sc + (o.obese ? 3 : 0), fh = L.faceH * sc * (st <= 1 ? 0.92 : 1);
    var bald = !f && L.baldAge && a >= L.baldAge ? Math.min(1, (a - L.baldAge) / 15 + 0.3) : 0;
    var out = [];
    // кадр как на фото в паспорте: лицо крупно, плечи внизу
    out.push('<svg viewBox="16 ' + (cy - 44) + ' 88 110" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Фото">');
    if (o.dead) out.push('<defs><filter id="bw"><feColorMatrix type="saturate" values="0"/></filter></defs><g filter="url(#bw)" opacity=".8">'); else out.push('<g>');
    out.push('<rect y="-20" width="120" height="190" fill="' + mix('#dfe6ea', L.cloth, 0.08) + '"/>');
    // длинные волосы сзади
    var top = cy - fh;
    if (st >= 1 && f && ['long', 'curly', 'braid'].indexOf(L.style) >= 0 && a < 75) {
      var len = L.style === 'long' ? 58 : L.style === 'curly' ? 44 : 50, hx = fw + 4;
      // прямые пряди: вертикально вниз, снизу чуть скруглены
      out.push('<path d="M' + (cx - hx) + ' ' + (cy - fh * 0.5) + ' L' + (cx - hx) + ' ' + (cy + len - 3) + ' Q' + (cx - hx) + ' ' + (cy + len) + ' ' + (cx - hx + 4) + ' ' + (cy + len) +
        ' L' + (cx + hx - 4) + ' ' + (cy + len) + ' Q' + (cx + hx) + ' ' + (cy + len) + ' ' + (cx + hx) + ' ' + (cy + len - 3) + ' L' + (cx + hx) + ' ' + (cy - fh * 0.5) + ' Z" fill="' + hair + '"/>');
    }
    // плечи и одежда
    var shW = [24, 30, 40, 46, 45][st] + (o.obese ? 6 : 0), shY = cy + fh + [4, 4, 6, 6, 6][st];
    out.push('<path d="M' + (cx - shW) + ' 175 C' + (cx - shW) + ' ' + (shY + 8) + ' ' + (cx - shW * 0.55) + ' ' + shY + ' ' + cx + ' ' + shY + ' C' + (cx + shW * 0.55) + ' ' + shY + ' ' + (cx + shW) + ' ' + (shY + 8) + ' ' + (cx + shW) + ' 175 Z" fill="' + (st === 0 ? '#e9d7a8' : L.cloth) + '"/>');
    // шея
    var nW = fw * 0.42;
    out.push('<path d="M' + (cx - nW) + ' ' + (cy + fh * 0.6) + ' L' + (cx - nW) + ' ' + (shY + 2) + ' Q' + cx + ' ' + (shY + 8) + ' ' + (cx + nW) + ' ' + (shY + 2) + ' L' + (cx + nW) + ' ' + (cy + fh * 0.6) + ' Z" fill="' + shade + '"/>');
    if (st >= 2) out.push(L.collar === 0 ? '<path d="M' + (cx - nW - 3) + ' ' + (shY + 1) + ' L' + cx + ' ' + (shY + 12) + ' L' + (cx + nW + 3) + ' ' + (shY + 1) + '" fill="none" stroke="' + mix(L.cloth, '#ffffff', 0.35) + '" stroke-width="2"/>' :
      L.collar === 1 ? '<path d="M' + (cx - nW) + ' ' + (shY + 1) + ' Q' + cx + ' ' + (shY + 9) + ' ' + (cx + nW) + ' ' + (shY + 1) + '" fill="none" stroke="' + mix(L.cloth, '#000000', 0.25) + '" stroke-width="2"/>' : '');
    // уши
    out.push('<ellipse cx="' + (cx - fw + 0.5) + '" cy="' + (cy + 2) + '" rx="3.6" ry="5.5" fill="' + shade + '"/><ellipse cx="' + (cx + fw - 0.5) + '" cy="' + (cy + 2) + '" rx="3.6" ry="5.5" fill="' + shade + '"/>');
    if (L.earrings && st >= 1) out.push('<circle cx="' + (cx - fw + 0.5) + '" cy="' + (cy + 8) + '" r="1.6" fill="#d9b44a"/><circle cx="' + (cx + fw - 0.5) + '" cy="' + (cy + 8) + '" r="1.6" fill="#d9b44a"/>');
    // лицо
    var jaw = fh * (0.82 + L.jaw * 0.12);
    out.push('<path d="M' + (cx - fw) + ' ' + cy + ' C' + (cx - fw) + ' ' + (cy - fh * 1.05) + ' ' + (cx + fw) + ' ' + (cy - fh * 1.05) + ' ' + (cx + fw) + ' ' + cy +
      ' C' + (cx + fw) + ' ' + (cy + jaw * 0.7) + ' ' + (cx + fw * 0.45) + ' ' + (cy + jaw) + ' ' + cx + ' ' + (cy + jaw) + ' C' + (cx - fw * 0.45) + ' ' + (cy + jaw) + ' ' + (cx - fw) + ' ' + (cy + jaw * 0.7) + ' ' + (cx - fw) + ' ' + cy + ' Z" fill="' + skin + '"/>');
    if (o.obese) out.push('<path d="M' + (cx - fw * 0.5) + ' ' + (cy + jaw - 1) + ' Q' + cx + ' ' + (cy + jaw + 5) + ' ' + (cx + fw * 0.5) + ' ' + (cy + jaw - 1) + '" fill="none" stroke="' + shade + '" stroke-width="1.4"/>');
    // глаза
    var ey = cy - fh * 0.05, ex = fw * 0.42, er = st <= 1 ? 3.6 : 3, eh = er * (1 - L.epi * 0.42);
    [-1, 1].forEach(function (sd) {
      var x = cx + sd * ex;
      out.push('<ellipse cx="' + x + '" cy="' + ey + '" rx="' + (er + 1.4) + '" ry="' + (eh + 0.9) + '" fill="#fbfaf7"/>');
      out.push('<circle cx="' + x + '" cy="' + (ey + 0.3) + '" r="' + Math.min(er, eh + 0.8) + '" fill="' + L.eye + '"/><circle cx="' + x + '" cy="' + (ey + 0.3) + '" r="' + Math.min(er, eh + 0.8) * 0.45 + '" fill="#1b1512"/>');
      out.push('<circle cx="' + (x + 1) + '" cy="' + (ey - 0.8) + '" r="0.8" fill="#fff"/>');
      if (L.epi > 0.4) out.push('<path d="M' + (x - er - 1.6) + ' ' + (ey - eh * 0.2) + ' Q' + x + ' ' + (ey - eh - 2.2) + ' ' + (x + er + 1.6) + ' ' + (ey - eh * 0.3) + '" fill="' + skin + '"/>');
      if (o.mental < 30 || a >= 55) out.push('<path d="M' + (x - er) + ' ' + (ey + eh + 2.2) + ' Q' + x + ' ' + (ey + eh + 4) + ' ' + (x + er) + ' ' + (ey + eh + 2.2) + '" fill="none" stroke="' + shade + '" stroke-width="1"/>');
      // брови
      if (st >= 1) { var bw = 1.3 * L.brow * (f ? 0.75 : 1), by = ey - eh - 4.5 - (o.happiness > 65 ? 0.6 : 0), tilt = o.happiness < 35 ? 1.4 : 0;
        out.push('<path d="M' + (x - er - 2) + ' ' + (by + (sd < 0 ? tilt : 0)) + ' Q' + x + ' ' + (by - 2) + ' ' + (x + er + 2) + ' ' + (by + (sd > 0 ? tilt : 0)) + '" fill="none" stroke="' + brow + '" stroke-width="' + bw + '" stroke-linecap="round"/>'); }
    });
    // нос
    var ny = cy + fh * 0.28;
    out.push(['<path d="M' + (cx - 1) + ' ' + (ey + 3) + ' Q' + (cx - 3.5) + ' ' + (ny - 1) + ' ' + (cx - 1.5) + ' ' + (ny + 1) + ' Q' + cx + ' ' + (ny + 2) + ' ' + (cx + 2.5) + ' ' + (ny + 0.5) + '" fill="none" stroke="' + line + '" stroke-width="1.1" stroke-linecap="round"/>',
      '<path d="M' + (cx - 3) + ' ' + (ny + 0.5) + ' Q' + cx + ' ' + (ny + 2.8) + ' ' + (cx + 3) + ' ' + (ny + 0.5) + '" fill="none" stroke="' + line + '" stroke-width="1.1" stroke-linecap="round"/>',
      '<path d="M' + cx + ' ' + (ey + 2) + ' L' + (cx - 2.5) + ' ' + ny + ' Q' + cx + ' ' + (ny + 2.5) + ' ' + (cx + 2.5) + ' ' + ny + '" fill="none" stroke="' + line + '" stroke-width="1.1" stroke-linecap="round"/>'][L.nose]);
    // рот: настроение
    var my = cy + fh * 0.55, mw = (st <= 1 ? 4.5 : 6) * L.lips, curve = o.happiness > 65 ? 3.2 : o.happiness < 35 ? -2.2 : 0.8;
    out.push('<path d="M' + (cx - mw) + ' ' + my + ' Q' + cx + ' ' + (my + curve) + ' ' + (cx + mw) + ' ' + my + '" fill="' + (curve > 2 ? '#8a3b3b' : 'none') + '" stroke="' + mix(skin, '#7a2f2f', 0.6) + '" stroke-width="1.5" stroke-linecap="round"/>');
    if (st <= 2 || f) out.push('<circle cx="' + (cx - ex - 2) + '" cy="' + (ny + 1) + '" r="3.2" fill="#e8907a" opacity=".22"/><circle cx="' + (cx + ex + 2) + '" cy="' + (ny + 1) + '" r="3.2" fill="#e8907a" opacity=".22"/>');
    if (L.freckles && st >= 1) for (var i = 0; i < 9; i++) out.push('<circle cx="' + (cx + (i % 2 ? 1 : -1) * (5 + (i * 3.1) % 9)) + '" cy="' + (ny - 2 + (i * 1.7) % 4) + '" r="0.55" fill="' + shade + '"/>');
    if (L.mole && st >= 2) out.push('<circle cx="' + (cx + L.mole[0]) + '" cy="' + (cy + L.mole[1]) + '" r="0.9" fill="' + line + '"/>');
    // морщины
    if (a >= 50) { var wk = Math.min(1, (a - 50) / 25);
      out.push('<path d="M' + (cx - fw * 0.5) + ' ' + (top + fh * 0.55) + ' Q' + cx + ' ' + (top + fh * 0.45) + ' ' + (cx + fw * 0.5) + ' ' + (top + fh * 0.55) + '" fill="none" stroke="' + shade + '" stroke-width="0.8" opacity="' + wk + '"/>' +
        '<path d="M' + (cx - 6) + ' ' + (ny + 2) + ' Q' + (cx - 8) + ' ' + (my + 1) + ' ' + (cx - 7) + ' ' + (my + 3) + 'M' + (cx + 6) + ' ' + (ny + 2) + ' Q' + (cx + 8) + ' ' + (my + 1) + ' ' + (cx + 7) + ' ' + (my + 3) + '" fill="none" stroke="' + shade + '" stroke-width="0.9" opacity="' + wk + '"/>'); }
    // борода и усы
    if (!f && a >= 18 && L.beard) {
      var bc = gray ? mix(L.hair, '#d8d6d2', Math.min(1, gray + 0.1)) : L.hair;
      if (L.beard === 'mustache') out.push('<path d="M' + (cx - 6.5) + ' ' + (my - 1.5) + ' Q' + cx + ' ' + (my - 5.5) + ' ' + (cx + 6.5) + ' ' + (my - 1.5) + ' Q' + cx + ' ' + (my - 3) + ' ' + (cx - 6.5) + ' ' + (my - 1.5) + ' Z" fill="' + bc + '"/>');
      else out.push('<path d="M' + (cx - fw + 1) + ' ' + (cy + 2) + ' C' + (cx - fw + 1) + ' ' + (cy + jaw + (L.beard === 'full' ? 6 : 1)) + ' ' + (cx + fw - 1) + ' ' + (cy + jaw + (L.beard === 'full' ? 6 : 1)) + ' ' + (cx + fw - 1) + ' ' + (cy + 2) +
        ' C' + (cx + fw * 0.6) + ' ' + (my + 1) + ' ' + (cx - fw * 0.6) + ' ' + (my + 1) + ' ' + (cx - fw + 1) + ' ' + (cy + 2) + ' Z" fill="' + bc + '" opacity="' + (L.beard === 'full' ? 0.95 : 0.35) + '"/>' +
        (L.beard === 'full' ? '<path d="M' + (cx - 6.5) + ' ' + (my - 1.5) + ' Q' + cx + ' ' + (my - 5) + ' ' + (cx + 6.5) + ' ' + (my - 1.5) + '" fill="none" stroke="' + bc + '" stroke-width="2.4"/>' : ''));
    }
    // волосы спереди
    var hairTop = top - 1.5, sides = 'M' + (cx - fw - 1) + ' ' + (cy + 1);
    if (st === 0) out.push('<path d="M' + (cx - fw * 0.8) + ' ' + (cy - fh * 0.45) + ' C' + (cx - fw * 0.7) + ' ' + (cy - fh * 1.02) + ' ' + (cx + fw * 0.7) + ' ' + (cy - fh * 1.02) + ' ' + (cx + fw * 0.8) + ' ' + (cy - fh * 0.45) +
      ' Q' + cx + ' ' + (cy - fh * 0.62) + ' ' + (cx - fw * 0.8) + ' ' + (cy - fh * 0.45) + ' Z" fill="' + hair + '" opacity=".35"/>');
    else if (bald >= 0.95) out.push('<path d="' + sides + ' Q' + (cx - fw - 2) + ' ' + (cy - 8) + ' ' + (cx - fw + 4) + ' ' + (cy - 10) + ' L' + (cx - fw + 4) + ' ' + (cy - 2) + ' Z M' + (cx + fw + 1) + ' ' + (cy + 1) + ' Q' + (cx + fw + 2) + ' ' + (cy - 8) + ' ' + (cx + fw - 4) + ' ' + (cy - 10) + ' L' + (cx + fw - 4) + ' ' + (cy - 2) + ' Z" fill="' + hair + '"/>');
    else {
      var vol = {buzz: 1.5, short: 3, side: 4, quiff: 6, curly: 6, long: 4, bob: 5, ponytail: 3.5, braid: 3.5}[L.style] || 3;
      if (f && a >= 70) vol = 5;
      var fringe = bald ? cy - fh * (0.55 + bald * 0.4) : (f || L.style === 'long' ? cy - fh * 0.45 : cy - fh * 0.62);
      // шапка волос и чёлка прядями (у пробора — косая)
      var locks = f && ['long', 'braid', 'curly', 'bob'].indexOf(L.style) >= 0 && a < 70, hx2 = fw + 4;
      var d = locks ? 'M' + (cx - hx2) + ' ' + (cy + 12) + ' L' + (cx - hx2) + ' ' + (cy - fh * 0.2) + ' C' + (cx - fw - vol) + ' ' + (hairTop - vol) + ' ' + (cx + fw + vol) + ' ' + (hairTop - vol) + ' ' + (cx + hx2) + ' ' + (cy - fh * 0.2) +
        ' L' + (cx + hx2) + ' ' + (cy + 12) + ' L' + (cx + fw - 2) + ' ' + (cy + 12) + ' L' + (cx + fw - 2) + ' ' + (cy - fh * 0.3)
        : sides + ' C' + (cx - fw - vol) + ' ' + (hairTop - vol) + ' ' + (cx + fw + vol) + ' ' + (hairTop - vol) + ' ' + (cx + fw + 1) + ' ' + (cy + 1) + ' L' + (cx + fw - 1.5) + ' ' + (cy - fh * 0.3);
      var n = 5, side = L.style === 'side' || L.style === 'bob' || L.style === 'quiff';
      for (var q = 0; q < n; q++) {
        var x0 = cx + fw - 1.5 - (2 * fw - 3) * q / n, x1 = cx + fw - 1.5 - (2 * fw - 3) * (q + 1) / n;
        var yb = fringe + (side ? (q / n - 0.5) * 9 : 0), amp = L.style === 'buzz' ? 0.8 : L.style === 'curly' ? 3.5 : 2.6;
        d += ' Q' + ((x0 + x1) / 2) + ' ' + (yb + amp) + ' ' + x1 + ' ' + (q === n - 1 ? cy - fh * 0.3 : yb - 0.5);
      }
      if (locks) d += ' L' + (cx - fw + 2) + ' ' + (cy + 12) + ' L' + (cx - hx2) + ' ' + (cy + 12);
      out.push('<path d="' + d + ' Z" fill="' + hair + '"/>');
      if (L.style === 'curly') for (var j = -3; j <= 3; j++) out.push('<circle cx="' + (cx + j * fw * 0.3) + '" cy="' + (hairTop - vol * 0.4 + Math.abs(j)) + '" r="' + (vol * 0.8) + '" fill="' + hair + '"/>');
      if (f && L.style === 'ponytail' && st >= 1) out.push('<path d="M' + (cx + fw - 2) + ' ' + (top + 4) + ' Q' + (cx + fw + 14) + ' ' + (top + 8) + ' ' + (cx + fw + 8) + ' ' + (cy + 22) + ' Q' + (cx + fw + 4) + ' ' + (cy + 4) + ' ' + (cx + fw - 2) + ' ' + (top + 10) + ' Z" fill="' + hair + '"/>');
      if (false && f && L.style === 'bob') out.push('<path d="M' + (cx - fw - 2) + ' ' + (cy - 6) + ' L' + (cx - fw - 3) + ' ' + (cy + 12) + ' L' + (cx - fw + 3) + ' ' + (cy + 12) + ' Z M' + (cx + fw + 2) + ' ' + (cy - 6) + ' L' + (cx + fw + 3) + ' ' + (cy + 12) + ' L' + (cx + fw - 3) + ' ' + (cy + 12) + ' Z" fill="' + hair + '"/>');
      if (f && a >= 70) out.push('<circle cx="' + cx + '" cy="' + (cy - 0.75 * fh - 5) + '" r="7.5" fill="' + hair + '"/>');
    }
    // очки
    if ((o.glasses && a >= 6) || (a >= 58 && L.oldGlasses)) {
      var gc = a >= 58 ? '#6b5a4a' : '#2b2b33';
      out.push('<g fill="none" stroke="' + gc + '" stroke-width="1.3"><rect x="' + (cx - ex - 6) + '" y="' + (ey - 4.5) + '" width="12" height="9" rx="3"/><rect x="' + (cx + ex - 6) + '" y="' + (ey - 4.5) + '" width="12" height="9" rx="3"/><path d="M' + (cx - ex + 6) + ' ' + ey + ' L' + (cx + ex - 6) + ' ' + ey + '"/></g>');
    }
    if (o.scar) out.push('<path d="M' + (cx + fw * 0.35) + ' ' + (cy - 3) + ' l5 7" stroke="' + mix(skin, '#8a4a4a', 0.5) + '" stroke-width="1.2"/>');
    out.push('</g></svg>');
    return out.join('');
  }
  function forPerson(s) {
    var p = s.person, has = function (id) { return p.conditions.some(function (c) { return c.id === id && !c.cured; }); };
    var age = p.alive ? RL.S.age(s) : p.deathAge;
    return svg(personLook(s), {age: age, happiness: p.stats.happiness, mental: p.stats.mental, glasses: has('myopia') || has('glaucoma'), obese: has('obesity'), dead: !p.alive, scar: has('war_injury')});
  }
  function key(s) {
    var p = s.person, a = Math.floor(p.alive ? RL.S.age(s) : p.deathAge);
    return [p.alive ? 1 : 0, a < 2 ? 0 : a < 12 ? 1 : a < 18 ? 2 : Math.floor(a / 5), p.stats.happiness > 65 ? 2 : p.stats.happiness < 35 ? 0 : 1, p.stats.mental < 30 ? 1 : 0,
      p.conditions.filter(function (c) { return !c.cured && /myopia|obesity|war_injury|glaucoma/.test(c.id); }).map(function (c) { return c.id; }).join('')].join('|');
  }
  function mini(L, age, dead) { return svg(L, {age: age, happiness: 60, mental: 60, dead: dead}); }
  return {make: make, svg: svg, forPerson: forPerson, key: key, mini: mini, personLook: personLook, spouseLook: spouseLook, kidLook: kidLook, memberLook: memberLook};
})();
