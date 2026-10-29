// События 17–25 лет. Дополнительные эффекты (обрабатывает RL.Young): army (conscript | contract), moveOut (rent_room | rent_flat),
// bigMove (id региона — переезд в столицу), quitJob.
RL.DATA.events.push(
  {"id":"mil_dept","title":"Военный учебный центр","trigger":true,"when":{"vuz":true},
   "text":"В вузе есть военный учебный центр: раз в неделю военные дни, сборы летом — и вместо срочной службы звание лейтенанта запаса.",
   "choices":[
     {"text":"Поступить в военный учебный центр","traits":{"conformity":3,"diligence":2},"effects":{"flag":"milDeptJoined"},
      "outcomes":[{"w":3,"text":"[Прошёл|Прошла] отбор и медкомиссию.","effects":{}},{"w":1,"mods":[{"if":{"health":{"<":60}},"mul":3}],"text":"Не прошёл медкомиссию.","effects":{"unflag":"milDeptJoined"}}]},
     {"text":"Не нужно","effects":{}}]},
  {"id":"army_contract_pressure","title":"Контракт","trigger":true,"when":{"inArmy":true},
   "text":"Командир части собирает срочников: «Подписывайте контракт — деньги, льготы. Кто не подпишет — сами понимаете».",
   "choices":[
     {"text":"Отказаться","traits":{"courage":3,"conformity":-2},"outcomes":[{"w":3,"text":"Давили неделю, потом отстали.","effects":{"mental":-3}},{"w":1,"text":"Перевели в «неудобную» роту до дембеля.","effects":{"mental":-6}}]},
     {"text":"Подписать","traits":{"conformity":4},"effects":{"army":"contract"}}]},
  {"id":"burnout","title":"Выгорание","trigger":true,"when":{"employed":true},
   "text":"Работаешь по 12 часов, по выходным не можешь заснуть, ненавидишь звук уведомлений.",
   "choices":[
     {"text":"Взять отпуск и сбавить темп","traits":{"selfControl":3},"effects":{"mental":6,"money":-2}},
     {"text":"Терпеть ради повышения","traits":{"diligence":3},"outcomes":[{"w":1,"text":"Повысили. Радости — ноль.","effects":{"mental":-8,"money":3}},{"w":1,"text":"[Сорвался|Сорвалась] на начальника и [уволился|уволилась].","effects":{"mental":-4,"quitJob":true}}]},
     {"text":"Уволиться","traits":{"courage":2},"effects":{"quitJob":true,"mental":3}}]},
  {"id":"move_out","title":"Своё жильё","when":{"age":[19,35],"employed":true,"livingApart":false,"not":{"inArmy":true}},"p":0.018,"cooldown":10,
   "mods":[{"if":{"atmosphere":{"<":40}},"mul":2},{"if":{"flag_partner":1},"mul":1.8},{"if":{"bigCity":true},"mul":1.3}],
   "text":"Сколько можно жить с родителями? Можно снять жильё.",
   "choices":[
     {"text":"Снять однушку","traits":{"courage":2},"effects":{"moveOut":"rent_flat","mental":4}},
     {"text":"Снять комнату с друзьями","traits":{"sociability":2},"effects":{"moveOut":"rent_room","mental":3,"social":2}},
     {"text":"Остаться у родителей — копить","traits":{"selfControl":3},"effects":{}}]},
  {"id":"big_move","title":"В столицу","when":{"age":[20,25],"capitalLoc":false,"not":{"any":[{"inArmy":true},{"vuz":true}]}},"p":0.008,"cooldown":18,
   "mods":[{"if":{"higherEdu":true},"mul":2},{"if":{"skills":{">":65}},"mul":1.6},{"if":{"employed":false},"mul":1.4}],
   "text":"Друг зовёт в Москву: «Тут зарплаты в два раза выше, а снимем комнату на двоих».",
   "choices":[
     {"text":"Ехать в Москву","traits":{"courage":4},"effects":{"bigMove":"msk","social":-6}},
     {"text":"Ехать в Петербург","traits":{"courage":3},"effects":{"bigMove":"spb","social":-6}},
     {"text":"Остаться дома","traits":{"conformity":2},"effects":{}}]},
  {"id":"contract_offer_young","title":"Контракт","when":{"age":[18,25],"sex":"m","svo":true,"year":[2023,2120],"not":{"inArmy":true}},"p":0.004,"cooldown":12,
   "mods":[{"if":{"poor":true},"mul":2},{"if":{"employed":false},"mul":2},{"if":{"ownDebt":true},"mul":2},{"if":{"capitalLoc":true},"mul":0.4}],
   "text":"Реклама на остановке и звонок из военкомата: контракт, разовая выплата в несколько миллионов, списание долгов.",
   "choices":[
     {"text":"Подписать контракт","traits":{"courage":3,"conformity":2},"effects":{"army":"contract","cash":1500000}},
     {"text":"Отказаться","traits":{"selfControl":2},"effects":{}}]},
  {"id":"dorm_life","title":"Общага","when":{"vuz":true,"livingApart":true},"p":0.03,"cooldown":8,
   "text":"Общежитие: сосед в два ночи жарит картошку, в соседней комнате вечеринка.",
   "choices":[
     {"text":"Присоединиться","traits":{"sociability":3,"selfControl":-2},"outcomes":[{"w":2,"text":"Лучшие друзья на всю жизнь — из этой ночи.","effects":{"social":5}},{"w":1,"text":"Утром пары, а ты «никакой».","effects":{"skills":-1,"habit":{"alcohol":1}}}]},
     {"text":"Беруши и спать","traits":{"selfControl":3},"effects":{"social":-1}}]},
  {"id":"exam_bribe","title":"Сессия","when":{"vuz":true,"month":[0,5]},"p":0.06,"cooldown":10,
   "mods":[{"if":{"year":[1992,2012]},"mul":2},{"if":{"tags":["caucasus"]},"mul":2}],
   "text":"Преподаватель намекает: зачёт можно «купить» через старосту, расценки известны.",
   "choices":[
     {"text":"Заплатить","traits":{"honesty":-4},"effects":{"cash":-8000,"mental":2}},
     {"text":"Учить и сдавать [самому|самой]","traits":{"honesty":3,"diligence":3},"outcomes":[{"w":2,"text":"[Сдал|Сдала] с первого раза.","effects":{"skills":1}},{"w":1,"text":"Завалили «из принципа». Пересдача.","effects":{"mental":-3}}]}]},
  {"id":"internship","title":"Стажировка","when":{"vuz":true,"age":[19,24]},"p":0.015,"cooldown":12,
   "mods":[{"if":{"skills":{">":65}},"mul":2},{"if":{"capitalLoc":true},"mul":2}],
   "text":"Крупная компания набирает стажёров: бесплатно или почти, но строчка в резюме.",
   "choices":[
     {"text":"Пойти","traits":{"diligence":3},"effects":{"skills":3,"social":2,"flag":"internship"}},
     {"text":"Нет времени","effects":{}}]},
  {"id":"toxic_boss","title":"Начальник","when":{"employed":true},"p":0.012,"cooldown":12,
   "text":"Начальник орёт при всех и удерживает премию за «неправильное лицо».",
   "choices":[
     {"text":"Терпеть","traits":{"selfControl":3,"conformity":2},"effects":{"mental":-5}},
     {"text":"Уволиться","traits":{"courage":3},"effects":{"quitJob":true,"mental":2}},
     {"text":"Пойти в трудовую инспекцию","traits":{"courage":3,"honesty":2},"outcomes":[{"w":1,"text":"Премию вернули. Тебя невзлюбили.","effects":{"money":1,"mental":-1}},{"w":1,"text":"Отписка. Через месяц сократили «по штату».","effects":{"quitJob":true}}]}]},
  {"id":"grey_salary","title":"Конверт","when":{"employed":true,"age":[18,25]},"p":0.008,"once":true,
   "text":"Новый работодатель предлагает: официально МРОТ, остальное — в конверте. «Все так работают».",
   "choices":[
     {"text":"Согласиться","traits":{"honesty":-2},"effects":{"money":2}},
     {"text":"Требовать белую","traits":{"honesty":2,"courage":2},"outcomes":[{"w":1,"text":"Нашли компромисс: половина белая.","effects":{}},{"w":1,"text":"«Не устраивает — до свидания».","effects":{"quitJob":true}}]}]},
  {"id":"scam_call","title":"«Служба безопасности банка»","when":{"age":[17,25],"year":[2016,2120]},"p":0.006,"cooldown":24,
   "text":"Звонок: «С вашей карты пытаются списать деньги, продиктуйте код из СМС».",
   "choices":[
     {"text":"Продиктовать","traits":{"conformity":2},"effects":{"cash":-30000,"mental":-6}},
     {"text":"Положить трубку","traits":{"selfControl":3},"effects":{}}]},
  {"id":"driving_license","title":"Права","when":{"age":[17.5,25],"not":{"flag_license":1}},"p":0.02,"cooldown":12,
   "mods":[{"if":{"smallTown":true},"mul":1.5},{"if":{"poor":true},"mul":0.5}],
   "text":"Автошкола: три месяца, экзамен в ГИБДД.",
   "choices":[
     {"text":"Учиться честно","traits":{"diligence":2},"outcomes":[{"w":2,"text":"Права получены со второй попытки.","effects":{"cash":-45000,"flag":"license"}},{"w":1,"text":"[Сдал|Сдала] с первой!","effects":{"cash":-40000,"flag":"license","mental":2}}]},
     {"text":"«Купить» экзамен","traits":{"honesty":-3},"outcomes":[{"w":2,"mods":[{"if":{"year":[2014,2120]},"mul":0.3}],"text":"Сработало.","effects":{"cash":-70000,"flag":"license"}},{"w":1,"text":"Инструктора-посредника задержали. Деньги пропали.","effects":{"cash":-30000,"mental":-4}}]},
     {"text":"Потом","effects":{}}]},
  {"id":"first_car","title":"Машина","when":{"flag_license":1,"employed":true,"age":[19,25]},"p":0.01,"once":true,
   "text":"Можно взять подержанную машину — 10–15 лет, «один хозяин, не бита, не крашена».",
   "choices":[
     {"text":"Купить в кредит","traits":{"courage":2},"effects":{"cash":-350000,"happiness":6,"flag":"ownCar"}},
     {"text":"Пока на автобусе","traits":{"selfControl":2},"effects":{}}]},
  {"id":"drunk_driving","title":"За рулём","when":{"flag_license":1,"habit_alcohol":{">=":1},"age":[18,25]},"p":0.006,"cooldown":12,
   "text":"Ночь, день рождения друга, до дома 10 километров. Такси дорого.",
   "choices":[
     {"text":"Сесть за руль","traits":{"selfControl":-4,"courage":2},
      "outcomes":[{"w":20,"text":"[Доехал|Доехала]. Повезло.","effects":{}},{"w":4,"text":"Остановили ДПС: лишение прав на полтора года и штраф.","effects":{"cash":-30000,"unflag":"license"}},
        {"w":1,"text":"[Влетел|Влетела] в столб. Реанимация.","effects":{"health":-30,"mental":-10}},{"w":0.2,"text":"ДТП.","effects":{"death":"ДТП (за рулём в нетрезвом виде)"}}]},
     {"text":"Вызвать такси","traits":{"selfControl":3},"effects":{"cash":-1500}}]},
  {"id":"relocation_2022","title":"Уехать?","when":{"age":[18,25],"year":[2022,2022],"month":[8,10],"sex":"m","not":{"inArmy":true}},"p":0.15,"once":true,
   "mods":[{"if":{"capitalLoc":true},"mul":3},{"if":{"higherEdu":true},"mul":2},{"if":{"poor":true},"mul":0.2}],
   "text":"После объявления мобилизации знакомые уезжают в Казахстан, Грузию, Армению. Билеты в один конец дорожают по часам.",
   "choices":[
     {"text":"Уехать на время","traits":{"courage":2,"conformity":-3},"outcomes":[{"w":1,"text":"Три месяца в Астане, работа удалённо. Потом вернулся.","effects":{"cash":-120000,"mental":-4}}]},
     {"text":"Остаться","traits":{"conformity":2},"effects":{"mental":-3}}]}
);
