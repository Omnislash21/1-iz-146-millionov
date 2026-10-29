// Полиция, суды, коррупция, приставы (взрослые) + особенности регионов.
// Источники: Судебный департамент ВС РФ (доля оправданий <1%, доля реального лишения свободы по статьям),
// ФССП (взыскания), опросы ФОМ/ВЦИОМ о бытовой коррупции [~].
RL.DATA = RL.DATA || {};
RL.DATA.law = {
  // статьи: colony — доля реальных сроков, years — срок, fine — штраф в средних ЗП (если не колония)
  "articles":{
    "dtp264":{"name":"ст. 264 УК — ДТП с тяжкими последствиями","colony":0.45,"years":[2,5],"fine":3},
    "drugs228":{"name":"ст. 228 УК — хранение наркотиков","colony":0.4,"years":[3,8],"fine":2},
    "fraud159":{"name":"ст. 159 УК — мошенничество (предпринимательская деятельность)","colony":0.35,"years":[2,6],"fine":8},
    "theft158":{"name":"ст. 158 УК — кража","colony":0.25,"years":[1,3],"fine":1},
    "harm111":{"name":"ст. 111 УК — тяжкий вред здоровью (драка)","colony":0.6,"years":[2,8],"fine":3},
    "posts282":{"name":"ст. 282 УК — «экстремизм» за публикации","colony":0.03,"years":[1,2],"fine":2},
    "evade328":{"name":"ст. 328 УК — уклонение от призыва","colony":0.02,"years":[1,2],"fine":1.5},
    "bribe291":{"name":"ст. 291 УК — дача взятки","colony":0.25,"years":[2,5],"fine":10}
  },
  "acquittal":0.004,"dealDiscount":0.33,"lawyerColonyMul":0.7,"lawyerCost":4,
  "fsspDebtIncomeMul":8,"fsspShare":0.5,
  // особенности регионов
  "northPensionMonths":180,"northPensionYears":5,
  "fareastMortgage":{"from":2019,"rate":2,"maxAge":36},
  "arcticWinterMental":-0.3
};

RL.DATA.events.push(
  {"id":"traffic_stop","title":"ГИБДД","when":{"flag_license":1,"age":[18,85]},"p":0.012,"cooldown":10,
   "mods":[{"if":{"drinker":true},"mul":1.8},{"if":{"tags":["caucasus"]},"mul":1.4}],
   "text":"Инспектор ДПС: «Превышение. Протокол или… решим на месте?»",
   "choices":[
     {"text":"Оформлять протокол","traits":{"honesty":3},"effects":{"cash":-3000}},
     {"text":"«Решить на месте»","traits":{"honesty":-3},"outcomes":[{"w":3,"mods":[{"if":{"year":[1992,2012]},"mul":2},{"if":{"corruption":{">":0.7}},"mul":2}],"text":"Купюра в документах — свободен.","effects":{"cash":-2000}},
       {"w":1,"mods":[{"if":{"year":[2013,2120]},"mul":2}],"text":"У инспектора видеорегистратор. Дело о даче взятки.","effects":{"case":"bribe291"}}]},
     {"text":"Спорить и снимать на телефон","traits":{"courage":3},"outcomes":[{"w":1,"text":"Отпустили без протокола.","effects":{}},{"w":1,"text":"Протокол «за неповиновение» и штраф.","effects":{"cash":-5000,"mental":-2}}]}]},
  {"id":"drunk_crash","title":"Авария","when":{"flag_license":1,"age":[18,80],"drinker":true},"p":0.0007,"cooldown":60,
   "text":"Ночь, трасса, «пара рюмок». Встречная фура, удар.",
   "outcomes":[{"w":3,"text":"Чудом живы все. Лишение прав на два года.","effects":{"health":-15,"unflag":"license","cash":-30000}},
     {"w":1,"text":"Погиб пассажир встречной машины. Уголовное дело.","effects":{"health":-20,"case":"dtp264"}},
     {"w":0.3,"text":"ДТП.","effects":{"death":"ДТП (за рулём в нетрезвом виде)"}}]},
  {"id":"planted_drugs","title":"Досмотр","when":{"age":[18,45],"year":[2008,2120]},"p":0.00025,"cooldown":120,
   "mods":[{"if":{"migrant":true},"mul":3},{"if":{"criminalRecord":true},"mul":3},{"if":{"habit_drugs":{">=":1}},"mul":4}],
   "text":"Полицейские на улице: «Ваши документы. Пройдёмте». При понятых в кармане «находят» пакетик.",
   "choices":[
     {"text":"Нанять хорошего адвоката","effects":{"cash":-200000},"outcomes":[{"w":2,"text":"Экспертиза: на пакете нет твоих отпечатков. Дело закрыли.","effects":{"mental":-8}},{"w":1,"text":"Не помогло — суд.","effects":{"case":"drugs228"}}]},
     {"text":"«Договориться» со следователем","traits":{"honesty":-4},"outcomes":[{"w":2,"mods":[{"if":{"corruption":{">":0.6}},"mul":2}],"text":"Дело развалилось за деньги.","effects":{"cash":-300000,"mental":-6}},{"w":1,"text":"Взяли деньги и всё равно передали в суд.","effects":{"cash":-300000,"case":"drugs228"}}]},
     {"text":"Защищаться самому","traits":{"courage":3},"effects":{"case":"drugs228"}}]},
  {"id":"street_fight_adult","title":"Драка","when":{"age":[18,50],"sex":"m","drinker":true},"p":0.0025,"cooldown":36,
   "text":"У бара пьяная ссора. Тебя толкают, в руке оказывается бутылка.",
   "choices":[
     {"text":"Ударить","traits":{"aggression":5,"selfControl":-4},"outcomes":[{"w":2,"text":"Разошлись с синяками.","effects":{"health":-3}},{"w":1,"text":"У того — черепно-мозговая. Уголовное дело.","effects":{"case":"harm111"}}]},
     {"text":"Уйти","traits":{"selfControl":4},"effects":{"mental":-1}}]},
  {"id":"repost_case","title":"Репост","when":{"age":[18,60],"year":[2014,2018]},"p":0.0008,"once":true,
   "mods":[{"if":{"focus_screen":true},"mul":2}],
   "text":"Центр «Э» вызывает на беседу: твой репост во «ВКонтакте» пятилетней давности признан экстремистским.",
   "choices":[
     {"text":"Удалить всё и раскаяться","traits":{"conformity":4},"outcomes":[{"w":2,"text":"Ограничились профилактической беседой.","effects":{"mental":-5}},{"w":1,"text":"Всё равно возбудили дело.","effects":{"case":"posts282"}}]},
     {"text":"Защищаться с правозащитниками","traits":{"courage":4},"effects":{"case":"posts282"}}]},
  {"id":"burglary_victim","title":"Кража","when":{"age":[20,90]},"p":0.003,"cooldown":36,
   "mods":[{"if":{"bigCity":true},"mul":1.4},{"if":{"year":[1990,2005]},"mul":2}],
   "text":"Квартиру обокрали: техника, наличные, золото бабушки.",
   "choices":[
     {"text":"Заявить в полицию","traits":{"conformity":2},"outcomes":[{"w":1,"text":"Через полгода — «приостановлено за отсутствием подозреваемого».","effects":{"cash":-60000,"mental":-5}},{"w":0.25,"text":"Нашли! Часть вещей вернули.","effects":{"cash":-20000}}]},
     {"text":"Махнуть рукой","effects":{"cash":-60000,"mental":-6}}]},
  {"id":"biz_raid","title":"Давление на бизнес","when":{"hasBiz":true},"p":0.004,"cooldown":24,
   "mods":[{"if":{"corruption":{">":0.6}},"mul":2}],
   "text":"Следователь ОБЭП намекает: бизнес «понравился» нужным людям. Либо делиться, либо статья 159.",
   "choices":[
     {"text":"Платить «долю»","traits":{"conformity":3,"honesty":-2},"effects":{"bizFine":4,"mental":-6}},
     {"text":"Продать бизнес за бесценок","effects":{"closeBiz":true,"mental":-8}},
     {"text":"Сопротивляться","traits":{"courage":5},"outcomes":[{"w":1,"text":"Отстали — адвокаты и жалобы помогли.","effects":{"bizFine":2,"mental":-5}},{"w":1,"text":"Возбудили дело о мошенничестве.","effects":{"case":"fraud159"}}]}]},
  {"id":"far_east_hectare","title":"Дальневосточный гектар","when":{"tags":["fareast"],"year":[2016,2120],"age":[25,65]},"p":0.004,"once":true,
   "text":"Можно бесплатно получить гектар земли: построить дом, поставить пасеку, базу для туристов.",
   "choices":[
     {"text":"Взять гектар","traits":{"courage":2,"diligence":2},"outcomes":[{"w":1,"text":"Поставили домик и баню. Дорогу пообещали «в следующем году».","effects":{"cash":-300000,"happiness":4}},{"w":1,"text":"Участок оказался в болоте. Бросили.","effects":{"cash":-80000,"mental":-2}}]},
     {"text":"Не нужно","effects":{}}]},
  {"id":"native_language","title":"Родной язык","when":{"region":["tat","bash"],"school":true,"year":[1992,2017]},"p":0.04,"once":true,
   "text":"В школе обязательные уроки татарского (башкирского) языка — пять часов в неделю.",
   "choices":[
     {"text":"Учить всерьёз","traits":{"diligence":2,"curiosity":2},"effects":{"skills":1,"social":2}},
     {"text":"Отсиживать уроки","traits":{"diligence":-1},"effects":{}}]},
  {"id":"arctic_bonus","title":"Северные","when":{"tags":["arctic","north"],"employed":true,"age":[22,60]},"p":0.006,"once":true,
   "text":"Начислили северные надбавки: каждые полгода — плюс к зарплате. Но полярная ночь и цены в магазине…",
   "choices":[{"text":"Остаться на Севере ради пенсии","traits":{"diligence":2},"effects":{"flag":"northCommitted"}},{"text":"Копить и уехать на «материк»","effects":{}}]}
);
