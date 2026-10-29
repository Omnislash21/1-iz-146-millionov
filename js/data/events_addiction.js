// Развилки при зависимости (habit ≥ 2 или лудомания): выбор каждый раз меняет её силу.
// habitUp {k: 1} — сорваться (зависимость крепче), habitDown {k: 1} — завязать (слабее), habitTry {k: 1} — удержаться один раз:
// слабее только с шансом 35% (одни трезвые выходные зависимость не лечат); k: alcohol, smoking, drugs, gaming, gamble.
// Удержаться проще с поддержкой: супруг, дети, фокус «Здоровье», вера (mods в исходах). Тексты нейтральные, без инструкций.
// Реалии: наркодиспансер и «учёт» (снятие через годы ремиссии), кодирование и «торпеда», АА и «Анонимные наркоманы» (в России с 1990-х),
// реабилитационные центры (часто платные и сомнительные), ЦУПИС и самоисключение у букмекеров (с 2014), микрозаймы лудоманов. Частоты [~].
RL.DATA.events.push(
  // ---------- алкоголь ----------
  {"id":"add_alc_weekend","title":"Пятница","major":true,"when":{"age":[18,85],"habit_alcohol":{">=":2}},"p":0.012,"cooldown":10,
   "text":"Конец недели. Зовут «посидеть по-человечески» — ты знаешь, чем это кончится. Дома ждут.",
   "choices":[
     {"text":"Пойти «на часик»","traits":{"selfControl":-2,"sociability":1},"outcomes":[
       {"w":3,"text":"Часик стал ночью. Утро — тяжёлое, выходные — потеряны.","effects":{"habitUp":{"alcohol":1},"health":-2,"happiness":1,"social":1}},
       {"w":1,"text":"[Ушёл|Ушла] вовремя. Сам[|а] удивил[ся|ась].","effects":{"social":2}}]},
     {"text":"Провести вечер с семьёй","if":{"any":[{"hasPartner":true},{"kidsN":{">=":1}},{"adultHome":true}]},"traits":{"selfControl":2,"empathy":1},"outcomes":[
       {"w":2,"text":"Трезвые выходные. Дома давно не было так спокойно.","mods":[{"if":{"focus":"family"},"mul":1.6}],"effects":{"habitTry":{"alcohol":1},"mental":3,"spouseRelation":4}},
       {"w":2,"text":"Весь вечер тянуло. Но не сорвал[ся|ась].","effects":{"mental":1,"spouseRelation":2}}]},
     {"text":"Остаться дома [одному|одной]","traits":{"selfControl":1},"outcomes":[
       {"w":1,"text":"Купил[|а] «одну бутылку» по дороге домой.","effects":{"habitUp":{"alcohol":1},"mental":-2}},
       {"w":1,"text":"Сериал, чай, рано спать. Получилось.","effects":{"habitTry":{"alcohol":1},"mental":1}}]}]},
  {"id":"add_alc_coding","title":"Закодироваться?","major":true,"when":{"age":[22,75],"habit_alcohol":{">=":3},"year":[1988,2120]},"p":0.008,"cooldown":36,
   "text":"Родные нашли нарколога: кодирование, «торпеда» или стационар. «Последний раз прошу».",
   "choices":[
     {"text":"Закодироваться","traits":{"selfControl":2},"outcomes":[
       {"w":3,"text":"Год не пьёшь. Тяжело, но держишься.","effects":{"habitDown":{"alcohol":2},"cash":-15000,"mental":2,"health":3}},
       {"w":2,"text":"Через полгода «раскодировал[ся|ась]» сам[|а] — на свадьбе друга.","effects":{"habitDown":{"alcohol":1},"cash":-15000,"mental":-3}}]},
     {"text":"Лечь в наркологию по ОМС","traits":{"selfControl":3,"conformity":1},"outcomes":[
       {"w":2,"text":"Три недели детокса и разговоры с психологом. Ставят на учёт — зато трезв[ый|ая].","effects":{"habitDown":{"alcohol":2},"health":4,"flag":"narcoRecord"}},
       {"w":1,"text":"Выписал[ся|ась] и в тот же вечер «отметил[|а]».","effects":{"habitDown":{"alcohol":1},"flag":"narcoRecord","mental":-2}}]},
     {"text":"«Я не алкоголик»","traits":{"selfControl":-2,"courage":1},"outcomes":[
       {"w":1,"text":"Скандал. Родные устали.","effects":{"spouseRelation":-10,"mental":-3,"relation":{"all":-6}}}]}]},
  {"id":"add_alc_aa","title":"Анонимные Алкоголики","when":{"age":[20,85],"habit_alcohol":{">=":2},"year":[1990,2120]},"p":0.005,"cooldown":48,
   "text":"Знакомый позвал на собрание АА: подвал, стулья кругом, чай. «Просто послушай».",
   "choices":[
     {"text":"Сходить","traits":{"empathy":1,"selfControl":1},"outcomes":[
       {"w":2,"text":"Ходишь по четвергам. Есть кому позвонить, когда тянет.","mods":[{"if":{"focus":"faith"},"mul":1.4}],"effects":{"habitTry":{"alcohol":1},"social":3,"mental":3}},
       {"w":1,"text":"Посидел[|а], послушал[|а], больше не пош[ёл|ла].","effects":{}}]},
     {"text":"«Это для сектантов»","traits":{"selfControl":-1},"effects":{}}]},
  {"id":"add_alc_work","title":"Запах на работе","major":true,"when":{"age":[20,70],"habit_alcohol":{">=":2},"employed":true},"p":0.007,"cooldown":24,
   "text":"Начальник отвёл в сторону: «От тебя опять пахнет. Последнее предупреждение».",
   "choices":[
     {"text":"Взять себя в руки","traits":{"selfControl":2},"outcomes":[
       {"w":2,"text":"Месяц без опозданий и перегара. Начальник отстал.","effects":{"habitTry":{"alcohol":1},"mental":-1}},
       {"w":1,"text":"Продержал[ся|ась] две недели.","effects":{"mental":-2}}]},
     {"text":"Огрызнуться","traits":{"courage":1,"selfControl":-2},"outcomes":[
       {"w":1,"text":"Уволили по статье за появление на работе в нетрезвом виде.","effects":{"jobLoss":true,"habitUp":{"alcohol":1},"mental":-6}},
       {"w":1,"text":"Проглотили. Пока.","effects":{"habitUp":{"alcohol":1}}}]}]},
  {"id":"add_alc_kid","title":"Ребёнок видит","major":true,"when":{"age":[22,60],"habit_alcohol":{">=":2},"kidsN":{">=":1}},"p":0.007,"cooldown":24,
   "text":"Твой ребёнок прячет от тебя бутылку и говорит: «Ты опять будешь как в прошлый раз?»",
   "choices":[
     {"text":"Пообещать и сдержать","traits":{"empathy":2,"selfControl":2},"outcomes":[
       {"w":3,"text":"Месяц трезвости. Ребёнок снова зовёт тебя на родительское собрание.","effects":{"habitTry":{"alcohol":1},"mental":2,"happiness":3}},
       {"w":2,"text":"Пообещал[|а]. Сорвал[ся|ась] через неделю.","effects":{"habitUp":{"alcohol":1},"mental":-5}}]},
     {"text":"Отмахнуться","traits":{"empathy":-2},"effects":{"habitUp":{"alcohol":1},"spouseRelation":-6,"happiness":-2}}]},

  // ---------- курение ----------
  {"id":"add_smoke_quit","title":"Бросить курить","major":true,"when":{"age":[16,85],"habit_smoking":{">=":2}},"p":0.008,"cooldown":24,
   "text":"Пачка подорожала, кашель по утрам, лестница даётся тяжелее. Может, пора?",
   "choices":[
     {"text":"Бросить с понедельника","traits":{"selfControl":2},"outcomes":[
       {"w":2,"text":"Три месяца без сигарет. Еда вкуснее, денег больше.","mods":[{"if":{"focus":"health"},"mul":1.8},{"if":{"focus":"sport"},"mul":1.5}],"effects":{"habitTry":{"smoking":1},"health":3,"mental":-1}},
       {"w":3,"text":"Продержал[ся|ась] неделю. «Одну, чтобы успокоиться».","effects":{"mental":-2}}]},
     {"text":"Перейти на «электронку»","if":{"year":[2014,2120]},"traits":{"selfControl":-1},"effects":{"cash":-3000}},
     {"text":"Курить дальше","traits":{"selfControl":-1},"effects":{"habitUp":{"smoking":1}}}]},
  {"id":"add_smoke_pregnant","title":"Курить при малыше","major":true,"when":{"sex":"f","age":[18,42],"habit_smoking":{">=":2},"babyAtHome":true},"p":0.01,"once":true,
   "text":"Педиатр прямо говорит: у малыша частые бронхиты — дома курят. Свекровь дымит на балконе.",
   "choices":[
     {"text":"Бросить ради малыша","traits":{"selfControl":3,"empathy":2},"effects":{"habitDown":{"smoking":2},"mental":-2,"health":2}},
     {"text":"Сократить до пары в день","traits":{"selfControl":1},"effects":{"habitDown":{"smoking":1}}},
     {"text":"«Все курили — и ничего»","traits":{"selfControl":-2},"effects":{"mental":1}}]},
  {"id":"add_smoke_break","title":"Перекур","when":{"age":[18,70],"habit_smoking":{">=":2},"employed":true},"p":0.006,"cooldown":18,
   "text":"Вся «курилка» — твои люди: там решают, кого повысят. Некурящие не в курсе.",
   "choices":[
     {"text":"Ходить со всеми","traits":{"sociability":1},"effects":{"habitUp":{"smoking":1},"social":3}},
     {"text":"Пить кофе вместо сигареты","traits":{"selfControl":1},"outcomes":[
       {"w":1,"text":"Свои остались своими.","effects":{"habitTry":{"smoking":1},"social":1}},
       {"w":1,"text":"Новости теперь узнаёшь последн[им|ей].","effects":{"habitTry":{"smoking":1},"social":-2}}]}]},
  {"id":"add_smoke_doctor","title":"Флюорография","major":true,"when":{"age":[40,90],"habit_smoking":{">=":2}},"p":0.006,"cooldown":36,
   "text":"На флюорографии «затемнение». Перепроверили — пока чисто. Врач: «Следующий раз может не повезти».",
   "choices":[
     {"text":"Бросить сразу","traits":{"selfControl":3},"outcomes":[
       {"w":2,"text":"Испуг помог: не куришь.","effects":{"habitDown":{"smoking":2},"mental":-1,"health":2}},
       {"w":1,"text":"Через полгода — снова в курилке.","effects":{"habitDown":{"smoking":1}}}]},
     {"text":"«Все там будем»","traits":{"courage":1,"selfControl":-2},"effects":{"habitUp":{"smoking":1},"mental":-2}}]},

  // ---------- наркотики ----------
  {"id":"add_drug_weekend","title":"Выходные","major":true,"when":{"age":[15,50],"habit_drugs":{">=":2}},"p":0.012,"cooldown":10,
   "text":"Компания зовёт на выходные «как обычно» — {drug}. А родные звали на дачу, давно не виделись.",
   "choices":[
     {"text":"Поехать с компанией","traits":{"selfControl":-2,"sociability":1},"outcomes":[
       {"w":3,"text":"Два дня выпали из жизни. В понедельник — пустота и тревога.","effects":{"habitUp":{"drugs":1},"mental":-4,"health":-2}},
       {"w":1,"text":"Задержали всех на выходе из квартиры. Освидетельствование, протокол.","effects":{"habitUp":{"drugs":1},"case":"drugs228","mental":-6}}]},
     {"text":"Провести время с родными","if":{"any":[{"parentAlive":true},{"hasPartner":true},{"kidsN":{">=":1}}]},"traits":{"selfControl":2,"empathy":1},"outcomes":[
       {"w":2,"text":"Шашлыки, разговоры, баня, сон без тревоги. Тянет меньше.","mods":[{"if":{"focus":"family"},"mul":1.5}],"effects":{"habitTry":{"drugs":1},"mental":3,"relation":{"all":3}}},
       {"w":1,"text":"Весь день ломало и злило. Но выдержал[|а].","effects":{"mental":-1}}]},
     {"text":"Отключить телефон и спать","traits":{"selfControl":1},"outcomes":[
       {"w":1,"text":"Удержал[ся|ась].","effects":{"habitTry":{"drugs":1}}},
       {"w":1,"text":"К вечеру воскресенья сам[|а] написал[|а] «есть что?».","effects":{"habitUp":{"drugs":1},"mental":-2}}]}]},
  {"id":"add_drug_rehab","title":"Реабилитационный центр","major":true,"when":{"age":[16,55],"habit_drugs":{">=":3},"year":[1995,2120]},"p":0.009,"cooldown":30,
   "text":"Родные нашли реабилитационный центр: полгода за городом, без телефона. Платно. Говорят, бывает жёстко.",
   "choices":[
     {"text":"Поехать","traits":{"selfControl":2,"conformity":1},"outcomes":[
       {"w":3,"text":"Полгода трезвости и группа «Анонимных наркоманов» после.","effects":{"habitDown":{"drugs":2},"cash":-90000,"health":5,"mental":3}},
       {"w":1,"text":"Центр оказался «тюрьмой с молитвами»: сбежал[|а] через месяц.","effects":{"habitDown":{"drugs":1},"cash":-60000,"mental":-6}}]},
     {"text":"Государственный наркодиспансер","traits":{"selfControl":2},"outcomes":[
       {"w":2,"text":"Детокс по ОМС и учёт на годы: права и часть профессий — закрыты.","effects":{"habitDown":{"drugs":1},"health":3,"flag":"narcoRecord"}},
       {"w":1,"text":"Через месяц — снова там же.","effects":{"flag":"narcoRecord","mental":-3}}]},
     {"text":"Отказаться","traits":{"selfControl":-2},"effects":{"habitUp":{"drugs":1},"relation":{"all":-8},"mental":-3}}]},
  {"id":"add_drug_overdose_friend","title":"Передоз","major":true,"when":{"age":[15,45],"habit_drugs":{">=":2}},"p":0.004,"cooldown":48,
   "text":"Друг из компании умер от передозировки. Похороны, мать кричит в голос.",
   "choices":[
     {"text":"Завязать","traits":{"selfControl":3},"outcomes":[
       {"w":2,"text":"Удалил[|а] все контакты. Страшно, но ты держишься.","effects":{"habitDown":{"drugs":2},"mental":-6,"social":-4}},
       {"w":1,"text":"Через месяц горе «заглушил[|а]» тем же.","effects":{"habitUp":{"drugs":1},"mental":-8}}]},
     {"text":"«С ним случайность, со мной не будет»","traits":{"courage":1,"selfControl":-2},"effects":{"habitUp":{"drugs":1},"mental":-5}}]},
  {"id":"add_drug_dealer","title":"Предложение подзаработать","major":true,"when":{"age":[16,35],"habit_drugs":{">=":2},"year":[2014,2120]},"p":0.005,"cooldown":36,
   "text":"Тебе предлагают «работу»: раскладывать свёртки — и своё будет бесплатно.",
   "choices":[
     {"text":"Отказаться","traits":{"honesty":2,"selfControl":2},"effects":{"habitDown":{"drugs":1}}},
     {"text":"Согласиться","traits":{"honesty":-3,"courage":1},"outcomes":[
       {"w":2,"text":"Задержали на третьей «закладке». Часть 4 ст. 228.1 — срок от десяти лет.","effects":{"case":"drugs228","habitUp":{"drugs":1},"mental":-10}},
       {"w":1,"text":"Пока везёт. Зависимость — крепче.","effects":{"habitUp":{"drugs":1},"cash":20000}}]}]},

  // ---------- азартные игры ----------
  {"id":"add_bet_payday","title":"Зарплата пришла","major":true,"when":{"age":[18,80],"gambler":true},"p":0.012,"cooldown":8,
   "text":"Деньги на карте. В приложении букмекера «экспресс дня» — коэффициент 12. Отыграть бы прошлый месяц…",
   "choices":[
     {"text":"Поставить «последний раз»","traits":{"selfControl":-2,"courage":1},"outcomes":[
       {"w":4,"text":"Проиграл[|а]. Догнал[|а] ещё — и ещё.","effects":{"habitUp":{"gamble":1},"cash":-25000,"mental":-5}},
       {"w":1,"text":"Зашло! Тянет повторить.","effects":{"habitUp":{"gamble":1},"cash":30000,"happiness":4}}]},
     {"text":"Отдать деньги супругу на хранение","if":{"hasPartner":true},"traits":{"selfControl":2,"honesty":1},"outcomes":[
       {"w":2,"text":"Карта у супруга, ты на «карманных». Стыдно — но месяц без ставок.","effects":{"habitTry":{"gamble":1},"spouseRelation":4,"mental":1}},
       {"w":1,"text":"Через неделю взял[|а] микрозайм «на ставку».","effects":{"habitUp":{"gamble":1},"cash":-15000,"spouseRelation":-8}}]},
     {"text":"Самоисключиться через ЦУПИС","if":{"year":[2014,2120]},"traits":{"selfControl":3},"outcomes":[
       {"w":2,"text":"Легальные конторы тебя больше не пускают. Первые недели — тоскливо.","effects":{"habitTry":{"gamble":1},"mental":-1}},
       {"w":1,"text":"[Нашёл|Нашла] «серую» контору с зеркалом.","effects":{"cash":-10000}}]}]},
  {"id":"add_bet_mfo","title":"Микрозаймы","major":true,"when":{"age":[18,75],"gambler":true,"year":[2010,2120]},"p":0.008,"cooldown":18,
   "text":"Пять займов в разных МФО, коллекторы звонят родственникам. Есть вариант — признаться.",
   "choices":[
     {"text":"Признаться семье","traits":{"honesty":3,"courage":1},"outcomes":[
       {"w":2,"text":"Скандал, слёзы — и общий план: закрыть долги, никаких ставок.","effects":{"habitDown":{"gamble":1},"cash":-40000,"spouseRelation":-6,"mental":2}},
       {"w":1,"text":"Тебя выставили за дверь «пока не одумаешься».","effects":{"spouseRelation":-20,"mental":-6}}]},
     {"text":"Занять ещё и отыграться","traits":{"selfControl":-3},"outcomes":[
       {"w":3,"text":"Долги растут. Ты врёшь всем.","effects":{"habitUp":{"gamble":1},"cash":-60000,"mental":-8}},
       {"w":1,"text":"Отыграл[ся|ась] — почти. Уверенность только крепче.","effects":{"habitUp":{"gamble":1},"cash":-10000}}]}]},
  {"id":"add_bet_group","title":"Анонимные игроки","when":{"age":[18,80],"gambler":true,"year":[2000,2120]},"p":0.004,"cooldown":48,
   "text":"Психолог советует группу «Анонимных игроков». Встречи по вторникам.",
   "choices":[
     {"text":"Ходить","traits":{"selfControl":2},"effects":{"habitTry":{"gamble":1},"mental":3,"cash":-2000}},
     {"text":"«Я контролирую»","traits":{"selfControl":-1},"effects":{}}]},

  // ---------- компьютерные игры ----------
  {"id":"add_game_night","title":"Ещё один матч","major":true,"when":{"age":[12,50],"habit_gaming":{">=":2}},"p":0.01,"cooldown":10,
   "text":"Три часа ночи. Завтра рано вставать. Команда пишет: «Ещё катку?»",
   "choices":[
     {"text":"Ещё катку","traits":{"selfControl":-2},"outcomes":[
       {"w":3,"text":"[Лёг|Легла] в шесть. День прошёл как в тумане.","effects":{"habitUp":{"gaming":1},"health":-1,"mental":-1}},
       {"w":1,"text":"Взяли рейтинг! Но выспаться не получилось.","effects":{"habitUp":{"gaming":1},"happiness":2}}]},
     {"text":"Выключить и спать","traits":{"selfControl":2},"effects":{"habitTry":{"gaming":1},"health":1}}]},
  {"id":"add_game_family","title":"«Ты опять за компом»","major":true,"when":{"age":[20,55],"habit_gaming":{">=":2},"hasPartner":true},"p":0.008,"cooldown":18,
   "text":"Супруг[а|] устал[а|] разговаривать с твоей спиной: «Мы вообще живём вместе?»",
   "choices":[
     {"text":"Продать приставку / удалить игры","traits":{"selfControl":3,"empathy":2},"effects":{"habitTry":{"gaming":2},"spouseRelation":8,"happiness":-2,"cash":15000}},
     {"text":"Договориться: только выходные","traits":{"empathy":1,"selfControl":1},"outcomes":[
       {"w":2,"text":"Получается. Вечера снова общие.","effects":{"habitTry":{"gaming":1},"spouseRelation":5}},
       {"w":1,"text":"«Только выходные» быстро стали «и среда».","effects":{"spouseRelation":-3}}]},
     {"text":"Надеть наушники","traits":{"empathy":-2},"effects":{"habitUp":{"gaming":1},"spouseRelation":-10}}]},
  {"id":"add_game_donate","title":"Донат","when":{"age":[12,50],"habit_gaming":{">=":2},"year":[2010,2120]},"p":0.007,"cooldown":18,
   "text":"Новый сезон, лимитированный скин и «боевой пропуск». Все в клане уже купили.",
   "choices":[
     {"text":"Задонатить","traits":{"selfControl":-1},"effects":{"cash":-6000,"habitUp":{"gaming":1},"happiness":2}},
     {"text":"Пропустить сезон","traits":{"selfControl":2},"effects":{"habitTry":{"gaming":1}}}]}
);
