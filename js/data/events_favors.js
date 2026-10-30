// Связь — это долг. Просьбы вернуть услугу (fav_*, ставит js/sim/social.js через 6–36 месяцев после помощи)
// и месть врагов (enemy_*, если отказал «нужному человеку»). Переменные: {n} — имя, {who} — кто это, {on}/{ego}/{emu} — он/его/ему.
// Эффекты: favorPay — вернул долг (связь крепче), favorRefuse — отказал (связь рвётся, у начальников — враг), enemyDrop — помириться.
// Реалии: «ты мне — я тебе», лжесвидетельство (ст. 307 УК), «свои люди» на работе, поручительство, доносы и «заказные» проверки. Частоты [~].
RL.DATA.law.articles.perjury307 = {"name": "ст. 307 УК — заведомо ложные показания", "colony": 0.05, "years": [1, 2], "fine": 1};
RL.DATA.events.push(
  // ---------- вернуть услугу ----------
  {"id":"fav_relative","title":"Ответная просьба","trigger":true,"major":true,
   "text":"Звонит {who}: «Помнишь, я тебе помог? Племянника надо пристроить — в вуз, на работу, куда-нибудь. Ты же можешь».",
   "choices":[
     {"text":"Пристроить — долг платежом красен","traits":{"conformity":2,"honesty":-1},"outcomes":[
       {"w":3,"text":"Племянник устроен. {n} звонит: «Мы в расчёте».","effects":{"favorPay":true,"social":2}},
       {"w":1,"text":"Пристроил[|а] — а племянник прогуливает и хамит. Краснеешь за него ты.","effects":{"favorPay":true,"mental":-4,"social":-2}}]},
     {"text":"Отказать: «Не могу, извини»","traits":{"honesty":2,"courage":1},"effects":{"favorRefuse":true}}]},
  {"id":"fav_decide","title":"«Реши вопрос»","trigger":true,"major":true,
   "text":"{who} просит «по старой дружбе» решить вопрос там, где ты работаешь: подвинуть очередь, подписать, не заметить.",
   "choices":[
     {"text":"Решить","traits":{"honesty":-3,"conformity":1},"effects":{"favorPay":true,"later":{"id":"fav_backfire","years":[1,5],"p":0.2}}},
     {"text":"Отказать","traits":{"honesty":3,"courage":2},"effects":{"favorRefuse":true}}]},
  {"id":"fav_money","title":"Займи до весны","trigger":true,"major":true,
   "text":"{who}: «Выручай, как я тебя тогда. Нужно сто пятьдесят тысяч, отдам весной».",
   "choices":[
     {"text":"Дать","traits":{"empathy":2},"effects":{"cash":-150000,"favorPay":true,"later":{"id":"fav_money_back","years":[0.5,3],"p":0.55}}},
     {"text":"Дать половину","traits":{"selfControl":1},"effects":{"cash":-70000,"favorPay":true}},
     {"text":"Отказать","traits":{"selfControl":2,"empathy":-1},"effects":{"favorRefuse":true}}]},
  {"id":"fav_blind_eye","title":"Не заметить","trigger":true,"major":true,
   "text":"{who} просит «не заметить» одну вещь — у тебя на работе, в документах, на объекте. «Ты ж понимаешь, я тебе тоже глаза закрывал».",
   "choices":[
     {"text":"Не заметить","traits":{"honesty":-3},"effects":{"favorPay":true,"later":{"id":"fav_backfire","years":[1,6],"p":0.25}}},
     {"text":"Сделать как положено","traits":{"honesty":3,"courage":2},"effects":{"favorRefuse":true}}]},
  {"id":"fav_testimony","title":"Свидетель","trigger":true,"major":true,
   "text":"{who}: «Надо, чтобы ты подтвердил[|а] в протоколе, что мой человек был с тобой в тот вечер. Ничего страшного, формальность».",
   "choices":[
     {"text":"Подтвердить","traits":{"honesty":-5,"conformity":1},"effects":{"favorPay":true,"mental":-3,"later":{"id":"fav_perjury","years":[1,4],"p":0.15}}},
     {"text":"Отказаться","traits":{"honesty":4,"courage":2},"effects":{"favorRefuse":true}}]},
  {"id":"fav_hire","title":"Свой человек","trigger":true,"major":true,"when":{"employed":true},
   "text":"{who} просит взять к вам в отдел «своего человека». Не очень толкового, зато «надёжного».",
   "choices":[
     {"text":"Взять","traits":{"conformity":2},"effects":{"favorPay":true,"later":{"id":"fav_hire_bad","years":[0.5,2],"p":0.45}}},
     {"text":"Отказать — отдел не резиновый","traits":{"courage":2,"diligence":1},"effects":{"favorRefuse":true}}]},
  {"id":"fav_vote","title":"Как надо","trigger":true,"major":true,
   "text":"{who}: «На выборах надо, чтобы наш прошёл. Собери подписи у соседей, приведи коллег на участок».",
   "choices":[
     {"text":"Собрать и привести","traits":{"conformity":3,"honesty":-2},"effects":{"favorPay":true,"social":-1}},
     {"text":"Отказаться","traits":{"courage":2,"conformity":-2},"effects":{"favorRefuse":true}}]},
  {"id":"fav_sign","title":"Задним числом","trigger":true,"major":true,
   "text":"{who} просит подписать бумагу задним числом — договор, акт, справку. «Ты же меня знаешь».",
   "choices":[
     {"text":"Подписать","traits":{"honesty":-3},"effects":{"favorPay":true,"later":{"id":"ch_sign_case","years":[2,6],"p":0.2}}},
     {"text":"Отказать","traits":{"honesty":3},"effects":{"favorRefuse":true}}]},
  {"id":"fav_guarantor","title":"Поручитель для своего","trigger":true,"major":true,
   "text":"{who} берёт большой кредит и просит тебя стать поручителем: «Я ж тебе помог, когда никто не помогал».",
   "choices":[
     {"text":"Подписать поручительство","traits":{"empathy":2,"selfControl":-1},"effects":{"favorPay":true,"flag":"guarantor"}},
     {"text":"Отказать","traits":{"selfControl":2},"effects":{"favorRefuse":true}}]},
  // ---------- расплата за возвращённую услугу ----------
  {"id":"fav_backfire","title":"Всплыло","trigger":true,"major":true,
   "text":"То, что ты когда-то «решил[|а]» по дружбе, всплыло при проверке. Тебя спрашивают, кто просил.",
   "choices":[
     {"text":"Назвать того, кто просил","traits":{"honesty":2,"courage":1},"outcomes":[
       {"w":2,"text":"Тебя оставили свидетелем. Друга — нет. Теперь он враг.","effects":{"mental":-5,"social":-3}},
       {"w":1,"text":"Не помогло: [виноват|виновата] всё равно ты.","effects":{"jobLoss":true,"mental":-6}}]},
     {"text":"Взять на себя","traits":{"conformity":2},"outcomes":[
       {"w":2,"text":"Выговор и лишение премии.","effects":{"mental":-4,"wageMul":0.9}},
       {"w":1,"text":"Уволили по статье.","effects":{"jobLoss":true,"mental":-8}}]}]},
  {"id":"fav_money_back","title":"Долг вернули","trigger":true,
   "text":"Неожиданно вернули те деньги, что ты давал[|а] «до весны». Без процентов, но вернули.",
   "effects":{"cash":150000,"happiness":2}},
  {"id":"fav_perjury","title":"Ложные показания","trigger":true,"major":true,
   "text":"Дело пересмотрели. Следователь показывает: твои показания не сходятся с биллингом телефона.",
   "choices":[
     {"text":"Признаться, что солгал[|а]","traits":{"honesty":3},"effects":{"case":"perjury307"}},
     {"text":"Стоять на своём","traits":{"courage":1,"honesty":-2},"outcomes":[
       {"w":1,"text":"Дело развалилось. Пронесло.","effects":{"mental":-4}},
       {"w":1,"text":"Не поверили.","effects":{"case":"perjury307"}}]}]},
  {"id":"fav_hire_bad","title":"Тот самый «свой человек»","trigger":true,
   "text":"«Свой человек», которого ты взял[|а] по просьбе, провалил проект. Начальство спрашивает с тебя.",
   "effects":{"mental":-4,"wageMul":0.95}},
  // ---------- враги ----------
  {"id":"enemy_report","title":"Анонимка","trigger":true,"major":true,
   "text":"На тебя пришёл донос — «по сигналу граждан». Ты догадываешься, от кого: {n}.",
   "choices":[
     {"text":"Нанять адвоката сразу","traits":{"selfControl":2},"outcomes":[
       {"w":3,"text":"Проверка ничего не нашла. Адвокат обошёлся дорого.","effects":{"cash":-80000,"mental":-3}},
       {"w":1,"text":"Нашли, к чему придраться. Возбудили дело.","effects":{"cash":-80000,"case":"fraud159"}}]},
     {"text":"Ничего не делать — совесть чиста","traits":{"courage":1},"outcomes":[
       {"w":2,"text":"Потаскали на допросы и отстали.","effects":{"mental":-6}},
       {"w":1,"text":"Дело всё-таки завели.","effects":{"case":"fraud159"}}]}]},
  {"id":"enemy_inspection","title":"Внеплановая проверка","trigger":true,
   "text":"К твоему делу — третья проверка за год. {n} в администрации ничего не забывает.",
   "effects":{"queue":"biz_inspection","mental":-3}},
  {"id":"enemy_block","title":"Закрытая дверь","trigger":true,
   "text":"Там, где решается твой вопрос — справка, место, разрешение, — сидит {n}. Вопрос «застрял» на месяцы.",
   "effects":{"mental":-4,"happiness":-2}},
  {"id":"enemy_credit","title":"Отказ банка","trigger":true,
   "text":"В банке отказали без объяснений. Потом узнаёшь, чья подпись стояла под отказом: {n}.",
   "effects":{"mental":-3}},
  {"id":"enemy_rumor","title":"Слухи","trigger":true,
   "text":"До твоего начальства дошли слухи — про деньги, про прошлое, про «связи». Источник ты знаешь: {n}.",
   "outcomes":[
     {"w":3,"text":"Начальник посмотрел косо, но промолчал.","effects":{"mental":-3,"social":-2}},
     {"w":1,"text":"Тебя «попросили» по соглашению сторон.","effects":{"jobLoss":true,"mental":-7}}]},
  {"id":"enemy_peace","title":"Помириться?","major":true,"when":{"enemies":{">=":1},"age":[30,80]},"p":0.004,"cooldown":60,
   "text":"Общий знакомый предлагает свести тебя с тем, с кем вы в ссоре: «Посидите, выпьете, забудете».",
   "choices":[
     {"text":"Пойти мириться с подарком","traits":{"empathy":2,"conformity":1},"outcomes":[
       {"w":2,"text":"Посидели. Старое не вспоминаете.","effects":{"enemyDrop":true,"cash":-20000}},
       {"w":1,"text":"Не получилось: «Я ничего не забыл».","effects":{"cash":-20000,"mental":-2}}]},
     {"text":"Не унижаться","traits":{"courage":1,"empathy":-1},"effects":{}}]},
  {"id":"owes_many","title":"Всем должен","when":{"owesFavor":true,"age":[25,75]},"p":0.004,"cooldown":48,
   "text":"Ловишь себя на том, что боишься звонков: каждый второй номер в телефоне — человек, которому ты чем-то обязан[|а].",
   "effects":{"mental":-2}}
);
