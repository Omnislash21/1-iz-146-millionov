// Тяжёлая взрослая жизнь: долги, ипотека, медицина, работа после 45, «тихие» разрушения, женская доля.
// Эффекты: refinance, bankrupt, mortHoliday, sellMortFlat — js/sim/hardship.js; useTie — js/sim/social.js.
// Реалии и частоты: 127-ФЗ (банкротство с 2015, через МФЦ с 2020 — до 500 тыс.); 76-ФЗ (ипотечные каникулы, 2019);
// квоты ВМП и ожидание месяцами; льготные лекарства «закончились в аптеке»; скорая в сёлах — час и больше;
// эйджизм после 45 (hh.ru: шанс на отклик в 2–3 раза ниже [~]); «штраф материнства» — минус 10–20% зарплаты на годы
// (НИУ ВШЭ, Ипатова [~]); алименты: около половины не платят в полном объёме (ФССП [~]).
RL.DATA.events.push(
  // ---------- долги ----------
  {"id":"credit_trap","title":"Кредитная кабала","trigger":true,"major":true,
   "text":"Половина дохода уходит банкам и МФО — и долг не уменьшается. Звонки с незнакомых номеров каждый день.",
   "choices":[
     {"text":"Рефинансировать в одном банке","if":{"badCredit":false},"traits":{"selfControl":2},"outcomes":[
       {"w":2,"text":"Один кредит на семь лет вместо пяти. Платёж меньше, переплата — огромная.","effects":{"refinance":true,"mental":2}},
       {"w":1,"text":"Банк отказал: «высокая долговая нагрузка».","effects":{"mental":-3}}]},
     {"text":"Банкротство","if":{"year":[2015,2120]},"traits":{"courage":2},"outcomes":[{"w":1,"text":"Суд признал тебя банкротом: долги списаны, но пять лет без кредитов и с отметкой в истории.","effects":{"bankrupt":true,"cash":-30000,"mental":-4,"social":-3}}]},
     {"text":"Попросить родных","if":{"parentsCanHelp":true},"traits":{"conformity":1},"outcomes":[
       {"w":2,"text":"Родители сняли со вклада всё, что было. Тебе стыдно.","effects":{"repay":"small","relation":{"all":-4},"mental":-2}},
       {"w":1,"text":"«У нас самих пенсия». Отказали.","effects":{"mental":-4}}]},
     {"text":"Перезанять в МФО","traits":{"selfControl":-3},"effects":{"cash":-20000,"mental":-5}}]},
  {"id":"mortgage_late","title":"Просрочка по ипотеке","trigger":true,"major":true,
   "text":"Три месяца без платежа. Банк пишет: «Обратитесь в отделение, иначе — суд и обращение взыскания на квартиру».",
   "choices":[
     {"text":"Ипотечные каникулы","if":{"year":[2019,2120]},"traits":{"selfControl":1},"effects":{"mortHoliday":true,"mental":-2}},
     {"text":"Продать квартиру самим, пока не поздно","traits":{"selfControl":2},"effects":{"sellMortFlat":true,"mental":-8}},
     {"text":"Занять у всех, кого знаешь","traits":{"sociability":1},"outcomes":[
       {"w":1,"text":"Закрыл[|а] просрочку. Теперь [должен|должна] всем.","effects":{"cash":-90000,"mental":-4}},
       {"w":1,"text":"Набрал[|а] половину. Банк ждать не будет.","effects":{"cash":-40000,"mental":-6}}]},
     {"text":"Ждать и надеяться","traits":{"selfControl":-2},"effects":{"mental":-5}}]},

  // ---------- работа после 45 ----------
  {"id":"layoff_45","title":"Сокращение","major":true,"when":{"age":[45,59],"employed":true},"p":0.003,"cooldown":60,
   "text":"Отдел «оптимизируют». Тебе предлагают уйти по соглашению сторон с двумя окладами — или «будет хуже».",
   "choices":[
     {"text":"Подписать и искать новое","traits":{"conformity":2},"effects":{"jobLoss":true,"cash":90000,"mental":-6}},
     {"text":"Требовать сокращения по ТК (выходное пособие, биржа)","traits":{"courage":2},"outcomes":[
       {"w":1,"text":"Сократили по закону: три оклада и полгода спокойнее.","effects":{"jobLoss":true,"cash":140000,"mental":-4}},
       {"w":1,"text":"Начали «выдавливать»: выговоры, переводы, бессмысленные отчёты. [Ушёл|Ушла] [сам|сама].","effects":{"jobLoss":true,"mental":-10}}]},
     {"text":"Позвонить знакомому — найти место заранее","if":{"tieOfficial":true},"traits":{"sociability":1},"effects":{"useTie":"official","onTie":{"mental":2},"noTie":{"jobLoss":true,"mental":-6}}}]},
  {"id":"age_interview","title":"Собеседование","when":{"age":[46,62],"employed":false},"p":0.02,"cooldown":12,
   "text":"Менеджер по найму вдвое младше тебя: «Мы ищем молодую динамичную команду. Мы вам перезвоним».",
   "effects":{"mental":-3}},
  {"id":"toxic_team","title":"Коллектив","major":true,"when":{"age":[23,60],"employed":true},"p":0.004,"cooldown":48,
   "text":"Новый начальник орёт на планёрках, коллеги пишут друг на друга докладные. Ты засыпаешь с тревогой.",
   "choices":[
     {"text":"Терпеть — ипотека, дети","traits":{"conformity":2,"selfControl":1},"effects":{"mental":-8,"health":-2}},
     {"text":"Уволиться в никуда","traits":{"courage":2},"effects":{"jobLoss":true,"mental":3}},
     {"text":"Жаловаться в трудовую инспекцию","traits":{"courage":3,"honesty":1},"outcomes":[
       {"w":1,"text":"Пришла проверка. Начальника перевели.","effects":{"mental":4}},
       {"w":2,"text":"Проверка «ничего не нашла». Тебя — уволили через месяц.","effects":{"jobLoss":true,"mental":-5}}]}]},

  // ---------- медленное скатывание ----------
  {"id":"slow_poverty","title":"Экономия","when":{"age":[30,75],"money":{"<":25}},"p":0.01,"cooldown":24,
   "text":"Ты уже не помнишь, когда покупал[|а] себе новую одежду. Мясо — по праздникам, стоматолог — «потом».",
   "effects":{"mental":-3,"health":-1,"happiness":-2}},
  {"id":"status_loss","title":"Встреча выпускников","when":{"age":[35,60],"money":{"<":35}},"p":0.004,"cooldown":120,
   "text":"Двадцать лет выпуска. Кто-то — директор, кто-то в Москве. Тебя спрашивают: «А ты где сейчас?»",
   "choices":[
     {"text":"Пойти и рассказать как есть","traits":{"honesty":2,"courage":1},"effects":{"social":3,"mental":-1}},
     {"text":"Не пойти","traits":{"sociability":-2},"effects":{"mental":-2,"social":-2}}]},
  {"id":"toxic_marriage","title":"Дома","major":true,"when":{"age":[25,70],"married":true},"p":0.004,"cooldown":36,
   "text":"Вы давно не разговариваете — только про деньги и кто что не сделал. Каждый вечер — холодная война.",
   "choices":[
     {"text":"Сходить к семейному психологу","if":{"year":[2005,2120]},"traits":{"empathy":2,"courage":1},"outcomes":[
       {"w":2,"text":"Пять встреч — и вы снова умеете разговаривать.","effects":{"spouseRelation":15,"cash":-20000,"mental":3}},
       {"w":1,"text":"Психолог помог понять, что вы давно чужие.","effects":{"spouseRelation":-10,"cash":-15000}}]},
     {"text":"Жить «ради детей»","traits":{"conformity":2},"effects":{"mental":-6,"happiness":-4}},
     {"text":"Развестись","traits":{"courage":2},"effects":{"relationship":"breakup","reason":"холодная война","mental":-6}}]},

  // ---------- медицина ----------
  {"id":"vmp_quota","title":"Квота на операцию","major":true,"when":{"age":[35,90],"chronic":true},"p":0.004,"cooldown":60,
   "text":"Нужна операция на сердце (или суставе). По квоте ВМП — бесплатно, но очередь на полгода и ехать в областной центр.",
   "choices":[
     {"text":"Ждать квоту","traits":{"conformity":2},"outcomes":[
       {"w":3,"text":"Дождал[ся|ась]. Прооперировали хорошо.","effects":{"health":6,"mental":-3}},
       {"w":1,"text":"Пока ждал[|а] — стало хуже. Операцию сделали экстренно, восстановление тяжёлое.","effects":{"health":-8,"mental":-6}}]},
     {"text":"Платно — сейчас","traits":{"selfControl":1},"effects":{"cash":-450000,"health":8,"mental":1}},
     {"text":"Позвонить знакомому врачу","if":{"tieDoctor":true},"traits":{"honesty":-1},"effects":{"useTie":"doctor","onTie":{"health":7},"noTie":{"mental":-3}}}]},
  {"id":"lgot_drugs","title":"Льготные лекарства","when":{"age":[40,110],"chronic":true,"year":[2005,2120]},"p":0.008,"cooldown":24,
   "text":"В аптеке говорят: льготный препарат «не поступил». Покупать свой — четверть пенсии в месяц.",
   "choices":[
     {"text":"Купить за свои","effects":{"cash":-8000}},
     {"text":"Писать жалобу в Минздрав и ждать","traits":{"courage":1},"outcomes":[
       {"w":1,"text":"Через месяц препарат «нашёлся».","effects":{"mental":-1}},
       {"w":1,"text":"Пока ждал[|а] — обострение.","effects":{"health":-5}}]},
     {"text":"Перейти на «аналог подешевле»","effects":{"health":-3,"cash":-2000}}]},
  {"id":"ambulance_far","title":"Скорая","when":{"age":[45,110],"village":true},"p":0.003,"cooldown":60,
   "text":"Ночью прихватило сердце. Скорая едет из райцентра — полтора часа по разбитой дороге.",
   "outcomes":[
     {"w":3,"text":"Дождались. Обошлось — в этот раз.","effects":{"health":-4,"mental":-3}},
     {"w":1,"text":"Сосед довёз на «Ниве» до ЦРБ. Врач сказал: ещё час — и всё.","effects":{"health":-8,"mental":-5}}]},
  {"id":"bedridden_parent","title":"Лежачий родитель","major":true,"when":{"age":[35,70],"parentAlive":true},"p":0.003,"once":true,
   "text":"После инсульта у отца или матери — постельный режим. Нужен уход 24 часа. Сиделка — как твоя зарплата.",
   "choices":[
     {"text":"Забрать к себе и ухаживать","traits":{"empathy":3},"effects":{"mental":-10,"health":-3,"happiness":-4,"jobLoss":true,"relation":{"all":5}}},
     {"text":"Нанять сиделку","traits":{"diligence":1},"effects":{"cash":-300000,"mental":-4}},
     {"text":"Пансионат","traits":{"empathy":-1},"outcomes":[
       {"w":2,"text":"Хороший пансионат: дорого, но спокойно.","effects":{"cash":-250000,"mental":-3}},
       {"w":1,"text":"Пансионат оказался «частным подвалом». Забрал[|а] через неделю.","effects":{"cash":-60000,"mental":-8}}]}]},

  // ---------- женская доля ----------
  {"id":"mat_penalty","title":"После декрета","major":true,"when":{"sex":"f","age":[22,45],"babyAtHome":true,"employed":true},"p":0.012,"once":true,
   "text":"Выходишь из декрета. Твоё место занято, предлагают должность ниже: «У вас же ребёнок, вам будет тяжело».",
   "choices":[
     {"text":"Согласиться","traits":{"conformity":2},"effects":{"mental":-4,"wageMul":0.85}},
     {"text":"Спорить по ТК — место должны сохранить","traits":{"courage":3},"outcomes":[
       {"w":1,"text":"Вернули на должность. Но премии с тех пор «нет».","effects":{"mental":-2,"wageMul":0.92}},
       {"w":1,"text":"Вернули — и через полгода «сократили».","effects":{"jobLoss":true,"mental":-6}}]},
     {"text":"Уйти на удалёнку или фриланс","if":{"year":[2010,2120]},"traits":{"curiosity":2},"effects":{"wageMul":0.75,"happiness":2}}]},
  {"id":"alimony_none","title":"Алименты","major":true,"when":{"sex":"f","age":[22,55],"kidsN":{">=":1},"hasPartner":false,"divorced":true},"p":0.008,"cooldown":36,
   "text":"Бывший муж не платит алименты: «официально безработный», а сам ездит на новой машине.",
   "choices":[
     {"text":"Через приставов","traits":{"courage":2},"outcomes":[
       {"w":1,"text":"Приставы закрыли ему выезд и арестовали карту. Деньги пошли — немного.","effects":{"cash":30000,"mental":-2}},
       {"w":2,"text":"«Взыскать нечего». Год переписки — без результата.","effects":{"mental":-5}}]},
     {"text":"Махнуть рукой — сама справлюсь","traits":{"selfControl":2},"effects":{"mental":-3,"happiness":-2}}]},
  {"id":"when_baby","title":"«Когда рожать?»","when":{"sex":"f","age":[25,36],"kidsN":0},"p":0.008,"cooldown":24,
   "text":"Каждое застолье — одно и то же: «Часики-то тикают». Мама, тётки, даже коллеги.",
   "choices":[
     {"text":"Отшутиться","traits":{"selfControl":1},"effects":{"mental":-1}},
     {"text":"Сказать, что это не их дело","traits":{"courage":2,"conformity":-2},"effects":{"relation":{"all":-4},"mental":1}}]},
  {"id":"night_street","title":"Дорога домой","when":{"sex":"f","age":[15,60]},"p":0.004,"cooldown":36,
   "text":"Поздно вечером от остановки за тобой идёт мужчина. Ускоряешь шаг — он тоже.",
   "outcomes":[
     {"w":5,"text":"Забежала в круглосуточный магазин, позвонила подруге. Он ушёл.","effects":{"mental":-3}},
     {"w":1,"text":"Вырвал сумку и убежал. Полиция приняла заявление «на всякий случай».","effects":{"cash":-10000,"mental":-6}}]},
  {"id":"harassment_boss","title":"Начальник","major":true,"when":{"sex":"f","age":[19,45],"employed":true},"p":0.003,"cooldown":60,
   "text":"Начальник всё чаще «задерживает после работы» и намекает на «особое отношение» и премию.",
   "choices":[
     {"text":"Жёстко отказать","traits":{"courage":3},"outcomes":[
       {"w":1,"text":"Отстал. Холодно, но отстал.","effects":{"mental":-2}},
       {"w":1,"text":"Через месяц — выговор за выговором. Ушла сама.","effects":{"jobLoss":true,"mental":-6}}]},
     {"text":"Уволиться","traits":{"selfControl":1},"effects":{"jobLoss":true,"mental":-3}},
     {"text":"Записать разговор и пойти к руководству","if":{"year":[2010,2120]},"traits":{"courage":3,"honesty":2},"outcomes":[
       {"w":1,"text":"Начальника тихо перевели в другой филиал.","effects":{"mental":3}},
       {"w":2,"text":"«Сама виновата». Уволили по сокращению.","effects":{"jobLoss":true,"mental":-8}}]}]}
);
