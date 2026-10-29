// Молодость 17–25: вузы и направления, армия, первая работа, своё жильё.
// Источники: Минобрнауки (средний балл зачисленных на бюджет, «Мониторинг качества приёма» ВШЭ), Росстат (охват высшим
// образованием, занятость молодёжи), Минобороны (сроки службы, объём призыва), открытые данные о стоимости обучения и аренды [~].
RL.DATA = RL.DATA || {};

// Направления. need — нужные предметы ЕГЭ: каждая группа — «один из»; score = среднее (русский + по одному из каждой группы).
// prof — профессии выпускника (RL.DATA.economy.professions), bySpec — доля работающих по специальности [~ ВШЭ, Росстат].
RL.DATA.fields = {
  "it":{"name":"программирование и IT","need":[["math"],["informatics","physics"]],"prof":["it"],"bySpec":0.7},
  "eng":{"name":"инженерия","need":[["math"],["physics","informatics"]],"prof":["engineer"],"bySpec":0.45},
  "med":{"name":"лечебное дело","need":[["biology"],["chemistry"]],"prof":["doctor"],"bySpec":0.85,"years":6},
  "econ":{"name":"экономика и менеджмент","need":[["math","mathBase"],["social","english"]],"prof":["office","accountant","manager"],"bySpec":0.45},
  "law":{"name":"юриспруденция","need":[["social"],["history","english"]],"prof":["official","office","police"],"bySpec":0.4},
  "hum":{"name":"филология, история, журналистика","need":[["social","literature","history"],["literature","history","english","social"]],"prof":["office","teacher"],"bySpec":0.3},
  "natsci":{"name":"физика, химия, биология","need":[["math","biology"],["physics","chemistry","biology"]],"prof":["engineer","teacher"],"bySpec":0.35},
  "ped":{"name":"педагогика","need":[["social","biology","history","literature","mathBase","math"]],"prof":["teacher"],"bySpec":0.5},
  "agro":{"name":"агрономия и ветеринария","need":[["biology","math","mathBase"]],"prof":["agro","engineer"],"bySpec":0.35},
  "mil":{"name":"военное училище","need":[["math","social","mathBase"],["physics","history","social"]],"prof":["military"],"bySpec":0.9,"years":5,"maleOnly":true}
};

// Типы вузов. pass — средний балл ЕГЭ зачисленных на бюджет (2015–2023) [~]; tuition — руб. 2024 в год;
// dorm — шанс общежития для иногороднего; mil — военный учебный центр / кафедра.
RL.DATA.vuzTypes = {
  "top":{"pass":88,"tuition":450000,"q":92,"dorm":0.8,"mil":true,"budgetMul":1},
  "toptech":{"pass":80,"tuition":350000,"q":85,"dorm":0.85,"mil":true,"budgetMul":1.2},
  "federal":{"pass":71,"tuition":230000,"q":74,"dorm":0.7,"mil":true,"budgetMul":1.1},
  "classic":{"pass":64,"tuition":150000,"q":62,"dorm":0.6,"mil":false,"budgetMul":1.1},
  "tech":{"pass":59,"tuition":140000,"q":58,"dorm":0.65,"mil":true,"budgetMul":1.4},
  "medical":{"pass":76,"tuition":260000,"q":68,"dorm":0.55,"mil":false,"budgetMul":0.7},
  "pedagogical":{"pass":57,"tuition":110000,"q":50,"dorm":0.6,"mil":false,"budgetMul":1.3},
  "agrarian":{"pass":50,"tuition":95000,"q":45,"dorm":0.75,"mil":false,"budgetMul":1.5},
  "military":{"pass":56,"tuition":0,"q":60,"dorm":1,"mil":true,"budgetMul":1},
  "private":{"pass":999,"minPaid":40,"tuition":90000,"q":35,"dorm":0.1,"mil":false,"budgetMul":0,"fromYear":1992}
};

// Вузы национального уровня (остальные — региональные, генерируются по регионам ниже).
RL.DATA.vuzTop = [
  {"name":"МГУ им. Ломоносова","region":"msk","type":"top","fields":["it","econ","law","hum","natsci","med"]},
  {"name":"НИУ ВШЭ","region":"msk","type":"top","fields":["it","econ","law","hum"],"fromYear":1992,"pass":90},
  {"name":"МФТИ","region":"mo","city":"Долгопрудный","type":"top","fields":["it","natsci","eng"],"pass":92},
  {"name":"МГТУ им. Баумана","region":"msk","type":"toptech","fields":["eng","it"]},
  {"name":"Сеченовский университет","region":"msk","type":"medical","fields":["med"],"pass":88,"q":85,"tuition":450000},
  {"name":"МГИМО","region":"msk","type":"top","fields":["law","econ","hum"],"pass":95,"tuition":700000,"budgetMul":0.5},
  {"name":"СПбГУ","region":"spb","type":"top","fields":["it","econ","law","hum","natsci","med"],"pass":87},
  {"name":"ИТМО","region":"spb","type":"toptech","fields":["it","eng"],"pass":86},
  {"name":"Политех Петра Великого","region":"spb","type":"toptech","fields":["eng","it","econ"],"pass":78},
  {"name":"НГУ","region":"nsk","type":"top","fields":["it","natsci","econ","hum"],"pass":82,"tuition":280000},
  {"name":"Томский государственный университет","region":"tom","city":"Томск","type":"federal","fields":["it","natsci","econ","law","hum"],"pass":75},
  {"name":"Казанский федеральный университет","region":"tat","type":"federal","fields":["it","natsci","econ","law","hum","ped","med"],"pass":76},
  {"name":"Уральский федеральный университет","region":"sve","type":"federal","fields":["eng","it","econ","law","hum"],"pass":73}
];
// Регионы с федеральным/исследовательским университетом (классический вуз региона — тип federal)
RL.DATA.vuzFederalRegions = ["krs","ros","prim","arh","kgd","crimea_rep","stav","nn","sam","perm","chel","tyu_obl","bash","vrn","yakut","khab","irk","kem","oren","sar","udm","bel"];
// Где учатся жители областей-спутников
RL.DATA.vuzRegionAlias = {"mo":"msk","lo":"spb"};
// Эпохи приёма: сдвиг проходного (в 2000-е — бум платного и заочного), стоимость обучения в реальном выражении
RL.DATA.admissionEra = {
  "passShift":{"1990":-6,"1999":-2,"2005":-4,"2012":0,"2020":2,"2025":2},
  "tuitionMul":{"1993":0.2,"1998":0.4,"2005":0.6,"2012":0.85,"2024":1},
  "bribeYears":[1992,2008], "targetFrom":2014, "eduCreditFrom":2018, "bachelorFrom":2011, "privateDiplomaMillEnd":2015
};
RL.DATA.stipend = {"academic":0.035,"high":0.09,"social":0.05,"eraMul":{"1993":0.3,"2000":0.4,"2008":0.7,"2015":1}};

// Армия
RL.DATA.army = {
  // срок службы по призыву (мес.): до 2007 — 24, весна 2007 — 18, с 2008 — 12
  "termByYear":{"1985":24,"2007":18,"2008":12},
  // доля годных без отсрочки, призываемых за одну кампанию (весна апр–июл, осень окт–дек) [~ из объёма призыва]
  "draftPerCampaign":0.17,"draftEraMul":{"1992":0.8,"1999":1.0,"2008":1.1,"2015":0.9,"2022":0.9},
  "draftMods":{"village":1.4,"capital":0.55,"chechnya":0.2,"caucasus":0.7},
  "upperAge":{"1985":27,"2024":30},
  // дедовщина: шанс тяжёлого эпизода в месяц; небоевая смертность [~ данные правозащитных организаций и МО]
  "hazing":{"1990":0.06,"2008":0.03,"2016":0.015},"deathMonthly":0.0001,
  // участие срочников в чеченских кампаниях
  "warYears":[[1995,1996],[1999,2002]],"warDeployShare":0.25,"warDeathMonthly":0.004,
  "whiteTicketFrom":1992,"whiteTicketTo":2019,"whiteTicketCost":2.5,"agsFrom":2004
};

// Своё жильё и расходы молодого взрослого (руб. 2024 в месяц, × цены региона)
RL.DATA.young = {"dorm":2500,"roomShare":0.55,"foodAdult":9500,"transport":2500,"phone":800,"clothes":1800,"fun":3000,
  "entryWage":{"18":0.68,"21":0.76,"23":0.82,"25":0.89},"helpShare":0.4,"helpMax":0.22,
  "mortalityNormalization":2.5, // [~] популяционная нормировка множителей 18–24; qx уже включает болезни и зависимости
  "sessionDebtThreshold":-0.35}; // [~] хвосты при z ниже порога; калибруется среди поступивших, не всего населения

// Фокусы 18–25 (часть детских продлевается до 25)
RL.DATA.focuses.forEach(function (f) {
  if (['study', 'friends', 'love', 'sport', 'selfedu', 'health', 'none', 'screen', 'family', 'help', 'parttime'].indexOf(f.id) >= 0) f.ages[1] = 25;
  if (f.id === 'tutors') f.ages[1] = 18;
});
RL.DATA.focuses.push(
  {"id":"career","name":"Карьера","desc":"Переработки, курсы, инициативность. Быстрее растёшь в деньгах — и быстрее выгораешь.","ages":[17,25],"cost":0,
   "needsJob":true,"eff":{"skills":0.4,"mental":-0.15,"social":0.1},"apt":"iq","traits":{"diligence":0.5,"selfControl":0.2}},
  {"id":"jobhunt","name":"Искать работу","desc":"Резюме на hh.ru, собеседования, знакомые знакомых.","ages":[16,25],"cost":0,
   "needsNoJob":true,"eff":{"mental":-0.1},"traits":{"diligence":0.2,"courage":0.2}}
);

// хронические болезни могут проявиться и после 17
['asthma', 'gastritis', 'diabetes1', 'epilepsy', 'cancer', 'tb', 'obesity'].forEach(function (id) { if (RL.DATA.conditions[id]) RL.DATA.conditions[id].ages[1] = 25; });
