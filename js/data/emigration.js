// Эмиграция: страны — «регионы» с тегом abroad (legacy: при рождении не выбираются). Цены и зарплаты — к средней по России 2024 г.
// Волны: 1990-е — Израиль (репатриация), Германия (поздние переселенцы), США; 2000–2010-е — «утечка мозгов» (IT, наука, врачи);
// 2022 — Грузия, Армения, Казахстан, Сербия, Турция (сотни тысяч, в основном IT и мужчины призывного возраста).
// Источники: Росстат (выбывшие за рубеж), ООН DESA International Migrant Stock; ОЭСР; зарплаты — ОЭСР/статслужбы стран в ППС [~].
// wage, price — множители к средней по России; medicine, school — 0–100; mortality — к среднероссийской; from/to — когда реально уезжали.
// adapt — скорость привыкания (язык, бюрократия, русскоязычная среда: Казахстан и Армения — быстро, Германия и Турция — медленно) [~];
// dip — шанс подтвердить регулируемый диплом (врач, юрист, учитель) [~].
RL.DATA.abroad = [
  {id: 'x_isr', name: 'Израиль', from: 1989, wage: 3.2, price: 3.0, medicine: 85, unemployment: 1.4, mortality: 0.55, lang: 'иврит', adapt: 1.0, dip: 0.5, note: 'репатриация по Закону о возвращении, ульпан'},
  {id: 'x_deu', name: 'Германия', from: 1990, wage: 3.6, price: 2.8, medicine: 90, unemployment: 1.6, mortality: 0.6, lang: 'немецкий', adapt: 0.75, dip: 0.45, note: 'поздние переселенцы, Blue Card, интеграционные курсы'},
  {id: 'x_usa', name: 'США', from: 1991, wage: 4.5, price: 3.4, medicine: 80, unemployment: 1.5, mortality: 0.62, lang: 'английский', adapt: 0.9, dip: 0.3, note: 'грин-карта, H-1B; врачам — резидентура заново'},
  {id: 'x_geo', name: 'Грузия', from: 2022, wage: 0.9, price: 1.2, medicine: 55, unemployment: 2.2, mortality: 0.8, lang: 'грузинский', adapt: 1.2, dip: 0.3, note: 'безвиз на год'},
  {id: 'x_arm', name: 'Армения', from: 2022, wage: 0.9, price: 1.1, medicine: 55, unemployment: 2.0, mortality: 0.8, lang: 'армянский', adapt: 1.4, dip: 0.5, note: 'ЕАЭС, без визы, говорят по-русски'},
  {id: 'x_kaz', name: 'Казахстан', from: 2022, wage: 0.85, price: 0.9, medicine: 55, unemployment: 1.6, mortality: 0.85, lang: 'казахский', adapt: 1.6, dip: 0.7, note: 'ЕАЭС, русский — в быту'},
  {id: 'x_srb', name: 'Сербия', from: 2022, wage: 1.1, price: 1.3, medicine: 65, unemployment: 2.0, mortality: 0.8, lang: 'сербский', adapt: 1.1, dip: 0.3, note: 'безвиз, ВНЖ через ИП'},
  {id: 'x_tur', name: 'Турция', from: 2022, wage: 0.9, price: 1.2, medicine: 65, unemployment: 2.0, mortality: 0.8, lang: 'турецкий', adapt: 0.75, dip: 0.2, note: 'ВНЖ через аренду'}
];
RL.DATA.abroad.forEach(function (c) {
  RL.DATA.regions.push({id: c.id, name: c.name, fd: 'за рубежом', pop: 0, birthMul: 1, tags: ['abroad'], wage: c.wage, price: c.price, medicine: c.medicine, school: 75,
    mortality: c.mortality, alcohol: 0.5, unemployment: c.unemployment, migrantShare: 0.1, urban: {big: 1}, cities: {big: [c.name]}, ethnic: {}, corruption: 0.3, legacy: true, abroad: true});
});

RL.DATA.events.push(
  {"id":"emig_offer","title":"Уехать?","major":true,"when":{"age":[20,50],"not":{"tags":["abroad"]},"inPrison":false},"p":0.00013,"cooldown":60,
   "mods":[{"if":{"higherEdu":true},"mul":2},{"if":{"prof":["it","doctor","engineer","scientist"]},"mul":2},{"if":{"year":[1990,1999]},"mul":1.5},{"if":{"year":[2022,2023]},"mul":6},{"if":{"capitalLoc":true},"mul":1.5}],
   "text":"Знакомые уехали и зовут: «Здесь у тебя будущего нет». Там — другой язык, ноль связей и работа ниже квалификации на первые годы.",
   "choices":[
     {"text":"Уехать","traits":{"courage":3,"conformity":-2},"effects":{"emigrate":true}},
     {"text":"Остаться — здесь родители, язык, свои","traits":{"conformity":2},"effects":{}}]},
  {"id":"emig_homesick","title":"Тоска","when":{"tags":["abroad"]},"p":0.02,"cooldown":12,
   "text":"Магазин «Русские продукты», гречка втридорога, звонки родным раз в неделю. Здесь ты навсегда «иностранец».",
   "effects":{"mental":-3,"social":-1}},
  {"id":"emig_cards","title":"Карты не работают","when":{"tags":["abroad"],"year":[2022,2120]},"p":0.02,"once":true,
   "text":"Российские карты за границей не работают. Деньги — через знакомых, криптовалюту и обменники с комиссией 10%.",
   "effects":{"cash":-20000,"mental":-2}},
  {"id":"emig_diploma","title":"Подтвердить диплом","major":true,"when":{"tags":["abroad"],"higherEdu":true},"p":0.02,"once":true,
   "text":"Российский диплом здесь — «бумага». Чтобы работать по специальности: экзамены на местном языке, стажировка, два-три года.",
   "choices":[
     {"text":"Подтверждать","traits":{"diligence":3},"outcomes":[
       {"w":2,"mods":[{"if":{"emigDipHigh":true},"mul":1.6},{"if":{"emigDipLow":true},"mul":0.45}],"text":"Через три года — снова по специальности.","effects":{"emigAdapt":0.4,"skills":4,"cash":-200000}},
       {"w":1,"text":"Не сдал[|а] языковой экзамен. Работаешь там, где берут.","effects":{"mental":-6,"cash":-100000}}]},
     {"text":"Работать «где возьмут»","traits":{"conformity":1},"effects":{"emigAdapt":0.1,"mental":-3}}]},
  // ---------- пара, дети, родители ----------
  {"id":"emig_spouse","title":"«Я хочу домой»","trigger":true,"major":true,"when":{"hasPartner":true},
   "text":"Партнёр плачет по вечерам: работы по специальности нет, подруг нет, язык не идёт. «Давай вернёмся. Или я уеду [одна|один]».",
   "choices":[
     {"text":"Вернуться вместе","traits":{"empathy":3},"effects":{"emigBack":"партнёр не прижился — вернулись вместе.","spouseRelation":10}},
     {"text":"Уговорить потерпеть год","traits":{"courage":1},"outcomes":[
       {"w":2,"text":"Потерпели. Стало легче.","effects":{"spouseRelation":-5,"emigAdapt":0.05}},
       {"w":1,"text":"[Не выдержала — уехала одна|Не выдержал — уехал один]. Брак на расстоянии, потом развод.","effects":{"relationship":"breakup","reason":"не прижился за границей","mental":-10}}]},
     {"text":"«Езжай, я остаюсь»","traits":{"empathy":-2,"courage":2},"effects":{"relationship":"breakup","reason":"не захотел вернуться","mental":-8}}]},
  {"id":"emig_kids","title":"Дети — уже местные","when":{"abroad":true,"kidsN":{">=":1},"age":[30,65]},"p":0.01,"once":true,
   "text":"Дети говорят по-русски с акцентом, друзья — местные, домой в Россию — «в гости к бабушке, не больше». Вернуться они не захотят.",
   "choices":[
     {"text":"Принять — у них здесь жизнь","traits":{"empathy":2},"effects":{"flag":"kidsAbroad","happiness":1}},
     {"text":"Русская школа по субботам","traits":{"conformity":2},"effects":{"cash":-40000,"kidWarmth":-4,"flag":"kidsAbroad"}}]},
  {"id":"emig_funeral","title":"Похороны","major":true,"when":{"abroad":true,"parentAlive":true,"age":[35,80]},"p":0.004,"once":true,
   "text":"Звонок из России: умер крёстный — человек из детства. Лететь — через третьи страны, сутки в дороге, полмесячной зарплаты.",
   "choices":[
     {"text":"Лететь","traits":{"empathy":3},"effects":{"cash":-90000,"mental":-4,"relation":{"all":5}}},
     {"text":"Не лететь — помянуть здесь","traits":{"empathy":-2},"effects":{"mental":-7,"relation":{"all":-6}}}]},
  {"id":"emig_parents","title":"Родители там","when":{"abroad":true,"parentAlive":true},"p":0.012,"cooldown":24,
   "text":"Родители стареют там, а ты — здесь. Звонок раз в неделю: «Всё хорошо, не волнуйся». Ты знаешь, что не всё.",
   "effects":{"mental":-3}},
  {"id":"emig_community","title":"Свои","when":{"abroad":true},"p":0.012,"once":true,
   "text":"Нашлись «свои»: русскоязычный клуб, чат района, баня по пятницам. Здесь можно говорить без акцента.",
   "choices":[
     {"text":"Ходить","traits":{"sociability":2},"effects":{"social":6,"mental":3,"emigAdapt":-0.03}},
     {"text":"Держаться местных — интегрироваться","traits":{"courage":2},"effects":{"emigAdapt":0.08,"social":-2}}]},
  {"id":"emig_discrimination","title":"«Русский?»","when":{"abroad":true},"p":0.01,"cooldown":24,
   "mods":[{"if":{"year":[2022,2120]},"mul":2.5}],
   "text":"В банке «по внутренним правилам» не открывают счёт, арендодатель отказывает, в очереди шипят про «оккупантов».",
   "effects":{"mental":-4,"social":-2}},
  {"id":"emig_passport","title":"Второй паспорт","major":true,"when":{"abroad":true,"age":[25,70]},"p":0.006,"once":true,
   "text":"Можно получить гражданство новой страны. Российское — оставить (двойное) или отказаться.",
   "choices":[
     {"text":"Оставить оба","traits":{"conformity":1},"effects":{"emigAdapt":0.05,"flag":"dualCitizen"}},
     {"text":"Отказаться от российского","traits":{"courage":3,"conformity":-2},"effects":{"emigAdapt":0.1,"relation":{"all":-4},"flag":"renounced"}}]},
  {"id":"emig_mobilized_kin","title":"Брата мобилизовали","when":{"abroad":true,"year":[2022,2024]},"p":0.01,"once":true,
   "text":"Двоюродного брата, оставшегося в России, мобилизовали. Тётя пишет: «А ты там отсиживаешься».",
   "effects":{"mental":-6,"relation":{"all":-5}}},
  {"id":"emig_lonely_success","title":"Получилось","when":{"abroad":true,"age":[35,75],"money":{">":60}},"p":0.006,"once":true,
   "text":"Дом, хорошая работа, машина — всё получилось. А на твой день рождения звонят трое, и все из России.",
   "effects":{"mental":-4,"happiness":-2}}
);
