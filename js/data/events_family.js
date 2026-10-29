// События своей семьи (этап 4). Эффекты RL.OwnFamily: relationship (cohab | marry | breakup | mend), reason, wantChild, notNow,
// parentCare (take | nurse | home | weekends), spouseRelation.
RL.DATA.events.push(
  {"id":"proposal","title":"Предложение","trigger":true,"when":{"hasPartner":true,"married":false},
   "text":"{n} заводит разговор о свадьбе: «Может, пора расписаться?»",
   "choices":[
     {"text":"Да, женимся!","traits":{"courage":2,"conformity":2},"effects":{"relationship":"marry"}},
     {"text":"Жить вместе, но без штампа","traits":{"conformity":-2},"effects":{"relationship":"cohab","spouseRelation":-8}},
     {"text":"Я не [готов|готова]","traits":{"selfControl":1},"effects":{"spouseRelation":-15}}]},
  {"id":"breakup_adult","title":"Кризис в отношениях","trigger":true,"when":{"hasPartner":true},
   "text":"Отношения трещат ({n}): ссоры каждый день, молчание за ужином.",
   "choices":[
     {"text":"Расстаться","traits":{"courage":2},"effects":{"relationship":"breakup","reason":"не сошлись характерами"}},
     {"text":"Сходить к семейному психологу","traits":{"empathy":3,"selfControl":2},"outcomes":[{"w":1,"text":"Стало легче — пока.","effects":{"relationship":"mend","cash":-15000}},{"w":0.6,"text":"Не помогло.","effects":{"relationship":"breakup","reason":"не помог даже психолог"}}]},
     {"text":"Терпеть ради детей / привычки","traits":{"conformity":3},"effects":{"mental":-6,"spouseRelation":5}}]},
  {"id":"want_child","title":"Ребёнок","when":{"any":[{"married":true},{"cohab":true}],"age":[20,42],"kidsN":[0,2],"wantChildFlag":false},"p":0.025,"cooldown":18,
   "mods":[{"if":{"kidsN":0},"mul":1.8},{"if":{"married":true},"mul":1.5},{"if":{"tags":["caucasus"]},"mul":2}],
   "text":"Всё чаще разговоры о ребёнке. Деньги, жильё, работа — всё не идеально. Но когда будет идеально?",
   "choices":[
     {"text":"Решаемся","traits":{"courage":2,"empathy":2},"effects":{"wantChild":true,"spouseRelation":5}},
     {"text":"Подождём пару лет","traits":{"selfControl":2},"effects":{"notNow":true}}]},
  {"id":"cheating","title":"Измена","when":{"hasPartner":true,"age":[20,35]},"p":0.004,"cooldown":24,
   "mods":[{"if":{"partnerRelation":{"<":40}},"mul":3},{"if":{"focus_friends":true},"mul":1.5}],
   "text":"Ты [узнал|узнала], что {man} переписывается с кем-то «по работе» по ночам.",
   "choices":[
     {"text":"Устроить разборку","traits":{"aggression":3},"outcomes":[{"w":1,"text":"Оказалось — правда. Конец.","effects":{"relationship":"breakup","reason":"измена"}},{"w":1,"text":"Оказалось — не то. Неловко.","effects":{"spouseRelation":-10}}]},
     {"text":"Простить","traits":{"empathy":3},"effects":{"mental":-6,"spouseRelation":-5}},
     {"text":"Уйти молча","traits":{"selfControl":3},"effects":{"relationship":"breakup","reason":"измена"}}]},
  {"id":"partner_drinking","title":"Пьёт","when":{"partnerAlcohol":{">=":2}},"p":0.03,"cooldown":10,
   "text":"Партнёр снова возвращается домой в состоянии опьянения. Деньги из семейного бюджета тают.",
   "choices":[
     {"text":"Поставить ультиматум: лечение или развод","traits":{"courage":4},"outcomes":[{"w":1,"text":"После лечения удаётся держаться.","effects":{"spouseRelation":5}},{"w":1.2,"text":"Не помогло — разошлись.","effects":{"relationship":"breakup","reason":"пьянство"}}]},
     {"text":"Терпеть","traits":{"conformity":3,"empathy":1},"effects":{"mental":-6,"cash":-5000}},
     {"text":"Уйти","traits":{"courage":3},"effects":{"relationship":"breakup","reason":"пьянство"}}]},
  {"id":"partner_violence","title":"Удар","when":{"partnerViolent":true},"p":0.03,"cooldown":10,
   "text":"Ссора закончилась пощёчиной. Потом извинения и цветы.",
   "choices":[
     {"text":"Уйти сразу","traits":{"courage":5,"selfControl":2},"effects":{"relationship":"breakup","reason":"насилие","mental":-4}},
     {"text":"Позвонить в кризисный центр","traits":{"courage":3},"outcomes":[{"w":1,"text":"Помогли с юристом и временным жильём. Ты [ушёл|ушла].","effects":{"relationship":"breakup","reason":"насилие"}}]},
     {"text":"Простить «последний раз»","traits":{"conformity":3},"effects":{"mental":-10,"health":-3}}]},
  {"id":"in_laws","title":"Родня","when":{"married":true},"p":0.012,"cooldown":12,
   "text":"[Тёща|Свекровь] опять учит жить: как готовить, как растить детей, на что тратить деньги.",
   "choices":[
     {"text":"Терпеть и улыбаться","traits":{"selfControl":3,"conformity":2},"effects":{"mental":-3}},
     {"text":"Высказать всё","traits":{"courage":3,"aggression":2},"effects":{"spouseRelation":-8,"mental":2}},
     {"text":"Поговорить с партнёром","traits":{"empathy":2},"outcomes":[{"w":1,"text":"Партнёр поддерживает тебя.","effects":{"spouseRelation":5}},{"w":1,"text":"«Это же моя мама».","effects":{"spouseRelation":-6}}]}]},
  {"id":"baby_nights","title":"Младенец","when":{"babyAtHome":true},"p":0.05,"cooldown":10,
   "text":"Ребёнок не спит третью ночь подряд. Колики, зубы, ты [зомби|зомби].",
   "choices":[
     {"text":"Дежурить по очереди","traits":{"empathy":2},"effects":{"spouseRelation":4,"health":-1}},
     {"text":"Позвать бабушку на помощь","traits":{"sociability":2},"effects":{"mental":2,"relation":{"mother":3}}},
     {"text":"Терпеть [самому|самой]","traits":{"diligence":2},"effects":{"mental":-4,"health":-2}}]},
  {"id":"kid_kindergarten","title":"Садик","when":{"kidsN":{">=":1},"age":[20,45]},"p":0.006,"cooldown":24,
   "text":"Очередь в садик: «Мест нет, приходите через год». Частный — дорого.",
   "choices":[
     {"text":"Частный садик","effects":{"cash":-60000}},
     {"text":"«Отблагодарить» заведующую","traits":{"honesty":-3},"effects":{"cash":-25000}},
     {"text":"Ждать и сидеть с ребёнком","traits":{"selfControl":2},"effects":{"money":-2}}]},
  {"id":"parent_care","title":"Родители стареют","trigger":true,"when":{"age":[18,60]},
   "text":"{who} {n} сильно сдаёт: давление, память, падает дома. Нужен уход.",
   "choices":[
     {"text":"Забрать к себе","traits":{"empathy":5},"effects":{"parentCare":"take","mental":-5,"spouseRelation":-6}},
     {"text":"Нанять сиделку","effects":{"parentCare":"nurse","cash":-150000}},
     {"text":"Пансионат для пожилых","traits":{"empathy":-2},"effects":{"parentCare":"home","cash":-90000,"mental":-3}},
     {"text":"Приезжать по выходным","traits":{"diligence":2},"effects":{"parentCare":"weekends","mental":-2}}]}
);
