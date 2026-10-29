// Правки событий поверх файлов events*.js: кто должен быть жив и рядом, чтобы событие имело смысл,
// и нейтральные тексты там, где растить ребёнка может кто угодно (мама, папа, бабушка, детдом).
// Подключается последним из data-файлов. Проверка — tests/kin-check.js (ни одного упоминания умерших).
(function (E) {
  function ev(id) { return E.filter(function (e) { return e.id === id; })[0]; }
  function need(ids, cond) {
    ids.forEach(function (id) { var e = ev(id); if (!e) return; e.when = e.when || {}; for (var k in cond) e.when[k] = cond[k]; });
  }
  // замена текста во всём событии (заголовок, текст, варианты, исходы)
  function retext(id, pairs) {
    var e = ev(id); if (!e) return;
    var j = JSON.stringify(e);
    pairs.forEach(function (p) { j = j.split(p[0]).join(p[1]); });
    var n = JSON.parse(j);
    Object.keys(n).forEach(function (k) { e[k] = n[k]; });
  }
  function choiceIf(id, start, cond) {
    var e = ev(id); if (!e) return;
    (e.choices || []).forEach(function (c) { if (c.text.indexOf(start) === 0) c.if = cond; });
  }

  // мама должна быть жива и жить с ребёнком
  need(['first_steps', 'first_words', 'poisoning', 'vaccination', 'lost_market', 'matinee', 'kitten', 'gymnasium_interview', 'father_mobilized',
    'domestic_violence', 'default_1998', 'soviet_queue', 'no_presents', 'younger_care', 'steal_parents', 'dad_coding'], {motherHome: true});
  need(['dacha_summer_baby', 'church_holiday'], {grandmaAlive: true});
  // нужен кто-то из родителей в доме (не детдом, не опека)
  need(['talent_spotted', 'mmm_pyramid', 'phone_like_everyone', 'rehab', 'tutor_offer', 'move_out'], {parentHome: true});
  need(['collectors'], {parentHome: true, livingApart: false});
  need(['lottery_win'], {dadHome: true});
  need(['in_laws'], {spouseParents: true});
  need(['birthday_party'], {birthdayMonth: true});
  // права не получить с противопоказаниями (медкомиссия)
  need(['driving_license', 'license_c', 'hunt_license'], {driveBan: false});

  retext('kg_toy_conflict', [['пожаловалась маме', 'пожаловалась {carerD}']]);
  retext('first_september', [['Гладиолусы — с бабушкиной дачи.', 'Гладиолусы — с соседской дачи.']]);
  retext('loss_parent', [['[нахамил|нахамила] бабушке', '[нахамил|нахамила] взрослым']]);
  retext('found_money', [['Отдать маме', 'Отдать {carerD}'], ['Мама похвалила.', 'Тебя похвалили.']]);
  retext('school_bully', [['Маму вызвали к директору.', 'В школу вызвали {carerA}.']]);
  retext('broken_window', [['Мама заплатила за стекло и долго ругалась.', 'За стекло заплатили из семейных денег, дома долго ругались.']]);
  retext('summer_camp', [['[Звонил|Звонила] маме', '[Звонил|Звонила] домой']]);
  retext('river_swim', [['Мама сказала «правильно».', 'Дома сказали «правильно».']]);
  retext('stranger_car', [['Мама позвонила в полицию.', 'Взрослые позвонили в полицию.']]);
  retext('collectors', [['Коллекторы звонят маме', 'Коллекторы звонят домой'], ['Мама не открыла дверь', 'Взрослые не открыли дверь']]);
  retext('drug_offer', [['Мама в ужасе.', 'Дома в ужасе.']]);
  retext('drug_spiral', [['Мама плачет и проверяет карманы.', 'Дома плачут и проверяют карманы.']]);
  retext('alcohol_trouble', [['Классная звонит маме.', 'Классная звонит домой.']]);
  retext('gaming_night', [['мамины деньги с карты', 'деньги с карты {carerG}']]);
  retext('tutor_offer', [['Мама нашла репетитора по математике', 'Тебе нашли репетитора по математике']]);
  retext('prom_11', [['Дома мама испекла торт.', 'Дома испекли торт.']]);
  retext('run_away', [['Уйти к другу / бабушке', 'Уйти к другу или к родне'], ['Неделя у бабушки.', 'Неделя у друзей.']]);
  retext('dark_mood', [['Рассказать маме / близкому взрослому', 'Рассказать близкому взрослому']]);
  retext('summer_job', [['Часть — маме.', 'Часть отдаёшь домой.']]);
  retext('look_change', [['Мама в шоке', 'Дома в шоке']]);
  retext('domestic_violence', [['Убежать к соседям / бабушке', 'Убежать к соседям']]);
  retext('in_laws', [['Встал(а) на твою сторону.', '[Встала|Встал] на твою сторону.']]);
  // «Папа достал сапоги» — только если папа живёт с семьёй
  var sq = ev('soviet_queue'); if (sq) sq.outcomes.forEach(function (o) { if (/Папа/.test(o.text)) o.mods = [{"if": {"dadHome": false}, "mul": 0}]; });
  choiceIf('no_presents', 'Попросить у бабушки', {grandmaAlive: true});
  choiceIf('baby_nights', 'Позвать бабушку', {kidsGrandma: true});
  choiceIf('nursing_home', 'Попросить детей', {adultKids: {'>=': 1}});

  // Важные развилки: их всегда спрашивают у игрока. Остальные случайные события с выбором при включённой
  // настройке «мелочи — сами» решает автопилот (с записью в ленте), чтобы окна не сыпались каждые полгода.
  RL.DATA.majorEvents = ['start_business', 'buy_flat', 'invest_choice', 'drug_offer', 'first_cigarette', 'first_party', 'cheating', 'partner_violence', 'partner_drinking',
    'run_away', 'dark_mood', 'planted_drugs', 'biz_raid', 'rotation_work', 'want_child', 'first_love', 'bad_company', 'exam_cheat', 'exam_bribe', 'zakladchik', 'big_move',
    'relocation_2022', 'crypto_bubble', 'pyramid_scam', 'street_fight_adult', 'repost_case', 'far_east_hectare', 'invest_flat', 'help_kids_flat', 'buy_dacha', 'drunk_driving',
    'gang_90s', 'school_bully', 'shoplift', 'talent_spotted', 'driving_license', 'currency_panic', 'biz_close_choice', 'crisis_layoff', 'quit_smoking', 'rehab',
    'teacher_conflict', 'domestic_violence', 'steal_parents', 'look_change', 'patriotic_club', 'contract_offer_young', 'internship', 'scam_flat_old', 'retire_wealth',
    'guarantor_ask', 'buy_diploma', 'small_bank', 'promotion_move', 'party_join', 'kid_paid_vuz', 'kid_tutors', 'osago', 'mlm', 'license_c'];
  E.forEach(function (e) { if (e.trigger || RL.DATA.majorEvents.indexOf(e.id) >= 0) e.major = true; });

  // частота: модальные выборы не должны сыпаться каждый год (p — в месяц, cooldown — месяцев)
  function tune(id, p, cd) { var e = ev(id); if (!e) return; if (p !== null) e.p = p; if (cd !== null) e.cooldown = cd; }
  tune('vacation', 0.009, 24); tune('grandkids_summer', 0.08, 30); tune('checkup', null, 48); tune('specialist_queue', 0.012, 30);
  tune('toxic_boss', null, 30); tune('pension_scam', null, 48); tune('heart_warning', null, 36); tune('kids_ask_money', null, 36);
  tune('in_laws', null, 24); tune('buy_dacha', null, 120); tune('renovation', null, 120);
  // жертвой квартирной кражи становится примерно каждый пятый за жизнь (МВД: ~0,3% домохозяйств в год) — не два раза
  tune('burglary_victim', 0.0004, 240); tune('pension_scam', null, 60); tune('scam_call', null, 48); tune('neighbours_flood', null, 60);
  tune('street_robbery', 0.002, 60); tune('noisy_neighbor', null, 120); tune('lend_friend', 0.003, 60); tune('found_wallet', 0.001, null); tune('driving_license', 0.012, null);
  // права можно получить и после 25 (к 35 годам права есть у большинства мужчин)
  var dl = ev('driving_license');
  if (dl) { dl.when.age = [17.5, 55]; dl.mods = (dl.mods || []).concat([{"if":{"age":[25,55]},"mul":0.45},{"if":{"male":true},"mul":1.5}]); }

  // годовщина — только с нынешним супругом и только если правда 30 лет в браке
  var g = ev('golden_years');
  if (g) {
    g.when = {married: true, marriedYears: [30, 31]}; g.p = 0.15;
    g.text = 'Тридцать лет в браке. Жемчужная свадьба: собираете родных за большим столом.';
    g.choices = [{"text":"Праздновать","effects":{"happiness":8,"spouseRelation":8,"cash":-30000}},
      {"text":"Тихо вдвоём — съездить туда, где познакомились","traits":{"empathy":2},"effects":{"happiness":6,"spouseRelation":10,"cash":-15000}}];
  }
  // внуки на лето: понятные варианты
  var gk = ev('grandkids_summer');
  if (gk) gk.choices = [
    {"text":"Возиться с внуками всё лето","traits":{"empathy":2},"effects":{"happiness":6,"mental":4,"health":-1}},
    {"text":"Увезти внуков на дачу","if":{"any":[{"flag_dacha":1},{"focus_dacha":true}]},"effects":{"happiness":5,"health":1}},
    {"text":"Взять на неделю — дольше сил нет","effects":{"happiness":2}}];
})(RL.DATA.events);
