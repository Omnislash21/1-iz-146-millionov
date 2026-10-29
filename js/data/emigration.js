// Эмиграция: страны — «регионы» с тегом abroad (legacy: при рождении не выбираются). Цены и зарплаты — к средней по России 2024 г.
// Волны: 1990-е — Израиль (репатриация), Германия (поздние переселенцы), США; 2000–2010-е — «утечка мозгов» (IT, наука, врачи);
// 2022 — Грузия, Армения, Казахстан, Сербия, Турция (сотни тысяч, в основном IT и мужчины призывного возраста).
// Источники: Росстат (выбывшие за рубеж), ООН DESA International Migrant Stock; ОЭСР; зарплаты — ОЭСР/статслужбы стран в ППС [~].
// wage, price — множители к средней по России; medicine, school — 0–100; mortality — к среднероссийской; from/to — когда реально уезжали.
RL.DATA.abroad = [
  {id: 'x_isr', name: 'Израиль', from: 1989, wage: 3.2, price: 3.0, medicine: 85, unemployment: 1.4, mortality: 0.55, lang: 'иврит', note: 'репатриация по Закону о возвращении'},
  {id: 'x_deu', name: 'Германия', from: 1990, wage: 3.6, price: 2.8, medicine: 90, unemployment: 1.6, mortality: 0.6, lang: 'немецкий', note: 'поздние переселенцы, Blue Card'},
  {id: 'x_usa', name: 'США', from: 1991, wage: 4.5, price: 3.4, medicine: 80, unemployment: 1.5, mortality: 0.62, lang: 'английский', note: 'грин-карта, H-1B'},
  {id: 'x_geo', name: 'Грузия', from: 2022, wage: 0.9, price: 1.2, medicine: 55, unemployment: 2.2, mortality: 0.8, lang: 'грузинский', note: 'безвиз на год'},
  {id: 'x_arm', name: 'Армения', from: 2022, wage: 0.9, price: 1.1, medicine: 55, unemployment: 2.0, mortality: 0.8, lang: 'армянский', note: 'ЕАЭС, без визы'},
  {id: 'x_kaz', name: 'Казахстан', from: 2022, wage: 0.85, price: 0.9, medicine: 55, unemployment: 1.6, mortality: 0.85, lang: 'казахский', note: 'ЕАЭС'},
  {id: 'x_srb', name: 'Сербия', from: 2022, wage: 1.1, price: 1.3, medicine: 65, unemployment: 2.0, mortality: 0.8, lang: 'сербский', note: 'безвиз, ВНЖ через ИП'},
  {id: 'x_tur', name: 'Турция', from: 2022, wage: 0.9, price: 1.2, medicine: 65, unemployment: 2.0, mortality: 0.8, lang: 'турецкий', note: 'ВНЖ через аренду'}
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
       {"w":2,"text":"Через три года — снова по специальности. Как дома, только в три раза больше денег.","effects":{"emigAdapt":0.4,"skills":4,"cash":-200000}},
       {"w":1,"text":"Не сдал[|а] языковой экзамен. Работаешь там, где берут.","effects":{"mental":-6,"cash":-100000}}]},
     {"text":"Работать «где возьмут»","traits":{"conformity":1},"effects":{"emigAdapt":0.1,"mental":-3}}]}
);
