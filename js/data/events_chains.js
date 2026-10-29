// Цепочки «решение → расплата через годы» (эффект later — js/sim/chains.js; addTie — js/sim/social.js; kidWarmth — тепло детей).
// Реалии: служебные романы и разводы; дружба, которая через 10–15 лет становится «связью»; «подпиши акт» — ст. 159 и 286 УК
// по делам о госзакупках приходят через 2–6 лет; диспансеризация с 2013 г.; утренники и «папа всегда на работе». Частоты — [~].
RL.DATA.events.push(
  // роман на стороне
  {"id":"ch_affair","title":"Командировка","major":true,"when":{"age":[24,60],"hasPartner":true,"employed":true},"p":0.0035,"cooldown":60,
   "text":"Командировка, гостиница, коллега, [с которой|с которым] давно «искрит». Дома ничего не узнают — кажется.",
   "choices":[
     {"text":"Не переходить черту","traits":{"honesty":2,"selfControl":2},"effects":{"spouseRelation":1}},
     {"text":"Завести роман","traits":{"honesty":-3,"selfControl":-2},"effects":{"happiness":3,"later":{"id":"ch_affair_out","years":[0.5,4],"p":0.6}}}]},
  {"id":"ch_affair_out","title":"Переписка","trigger":true,"major":true,"when":{"hasPartner":true},
   "text":"{man} [нашла|нашёл] переписку. Старую, но очень подробную.",
   "choices":[
     {"text":"Признаться и просить прощения","traits":{"honesty":3},"outcomes":[
       {"w":2,"text":"Простили — не сразу и не до конца.","effects":{"spouseRelation":-30,"mental":-8}},
       {"w":1,"text":"Не простили. Вещи — в коридоре.","effects":{"relationship":"breakup","reason":"измена","mental":-12}}]},
     {"text":"Всё отрицать","traits":{"honesty":-3},"outcomes":[
       {"w":1,"text":"Поверили. Или сделали вид.","effects":{"spouseRelation":-15}},
       {"w":2,"text":"Ложь сделала хуже. Развод.","effects":{"relationship":"breakup","reason":"измена","mental":-10}}]}]},

  // помочь другу — через годы он «нужный человек»
  {"id":"ch_help_friend","title":"Друг в беде","major":true,"when":{"age":[19,40]},"p":0.004,"cooldown":120,
   "text":"Старый друг попал в историю: уволили, долги, жена ушла. Просит пожить у тебя и занять денег — «верну, честно».",
   "choices":[
     {"text":"Помочь — и деньгами, и временем","traits":{"empathy":3},"effects":{"cash":-25000,"mental":-1,"later":{"id":"ch_friend_returns","years":[7,16],"p":0.55}}},
     {"text":"Помочь советом, но не деньгами","traits":{"selfControl":1},"effects":{}},
     {"text":"Сослаться на занятость","traits":{"empathy":-2},"effects":{"social":-2}}]},
  {"id":"ch_friend_returns","title":"Долг платежом красен","trigger":true,
   "text":"Тот самый друг, которому ты помог[|ла] когда-то, теперь сам на ногах — и не забыл.",
   "outcomes":[
     {"w":2,"text":"Вернул деньги с лихвой и сказал: «Если что — звони в любое время».","effects":{"cash":60000,"addTie":{"sphere":"business","src":"school","rank":2},"happiness":4}},
     {"w":1,"text":"Он теперь в областной администрации: «Если что — звони».","effects":{"addTie":{"sphere":"official","src":"school","rank":3},"happiness":3}}]},

  // подписать «левый» акт — через годы приходит следователь
  {"id":"ch_sign_act","title":"Подпиши акт","major":true,"when":{"age":[26,62],"employed":true,"prof":["official","manager","engineer","builder","teacher","doctor","accountant"]},"p":0.004,"cooldown":72,
   "text":"Начальник просит подписать акт приёмки работ, которых не было: «Все так делают. Премия будет».",
   "choices":[
     {"text":"Подписать","traits":{"honesty":-3,"conformity":2},"effects":{"cash":40000,"later":{"id":"ch_sign_case","years":[2,6],"p":0.3}}},
     {"text":"Отказаться","traits":{"honesty":3,"courage":2},"outcomes":[
       {"w":2,"text":"Начальник подписал сам. Тебя с тех пор «не замечают».","effects":{"mental":-2}},
       {"w":1,"text":"Через месяц тебя сократили.","effects":{"jobLoss":true,"mental":-6}}]}]},
  {"id":"ch_sign_case","title":"Следователь","trigger":true,"major":true,
   "text":"Пришли по тому акту, который ты подписал[|а] несколько лет назад. Начальник уже дал показания — против тебя.",
   "choices":[
     {"text":"Рассказать всё как было","traits":{"honesty":2},"outcomes":[
       {"w":2,"text":"Тебя сделали свидетелем, а не обвиняемым. Повезло.","effects":{"mental":-6}},
       {"w":1,"text":"Всё равно [обвиняемый|обвиняемая].","effects":{"case":"fraud159"}}]},
     {"text":"Позвонить знакомому","if":{"tieLaw":true},"traits":{"honesty":-2},"effects":{"useTie":"law","noTie":{"case":"fraud159"}}},
     {"text":"Молчать","traits":{"courage":1},"effects":{"case":"fraud159"}}]},

  // диспансеризация: пропустишь — найдут поздно
  {"id":"ch_checkup","title":"Диспансеризация","when":{"age":[39,75],"year":[2013,2120]},"p":0.006,"cooldown":36,
   "text":"Из поликлиники звонят: диспансеризация, полдня по кабинетам. На работе можно взять день.",
   "choices":[
     {"text":"Сходить","traits":{"selfControl":1},"outcomes":[
       {"w":6,"text":"Всё в пределах нормы. Давление — «последите».","effects":{"health":1}},
       {"w":1,"text":"Нашли «что-то» на ранней стадии — лечат по ОМС, прогноз хороший.","effects":{"health":-2,"mental":-3}}]},
     {"text":"Некогда","traits":{"selfControl":-1},"effects":{"later":{"id":"ch_late_diagnosis","years":[2,8],"p":0.06}}}]},
  {"id":"ch_late_diagnosis","title":"Поздно","trigger":true,"major":true,
   "text":"Боли, обследования — и диагноз. Врач спрашивает, почему не приходил[|а] раньше. На диспансеризацию ты так и не [сходил|сходила].",
   "effects":{"condition":"cancer_adult","mental":-10}},

  // утренник или работа — дети запоминают
  {"id":"ch_matinee","title":"Утренник","major":true,"when":{"age":[22,50],"employed":true,"kidsN":{">=":1}},"p":0.006,"cooldown":24,
   "text":"У ребёнка утренник — главная роль, репетировали месяц. В то же утро — важная встреча на работе.",
   "choices":[
     {"text":"Пойти на утренник","traits":{"empathy":2},"effects":{"kidWarmth":10,"happiness":3}},
     {"text":"Встреча важнее","traits":{"diligence":2,"empathy":-1},"outcomes":[
       {"w":1,"text":"Встреча прошла хорошо. Ребёнок неделю не разговаривал.","effects":{"kidWarmth":-10,"cash":10000}},
       {"w":1,"text":"Встречу перенесли в последний момент. А ребёнок искал тебя глазами в зале.","effects":{"kidWarmth":-12,"mental":-3}}]}]},
  {"id":"ch_teen_talk","title":"Подросток","major":true,"when":{"age":[30,60],"teenKid":true},"p":0.006,"cooldown":24,
   "text":"Ребёнок-подросток пришёл поздно, глаза красные, дверь в комнату — на замок.",
   "choices":[
     {"text":"Поговорить спокойно","traits":{"empathy":2,"selfControl":2},"outcomes":[
       {"w":2,"text":"Разговор до двух ночи. Кажется, вы снова на одной стороне.","effects":{"kidWarmth":10}},
       {"w":1,"text":"Ребёнок молчал. Но запомнил, что ты не кричал[|а].","effects":{"kidWarmth":5}}]},
     {"text":"Наорать и отобрать телефон","traits":{"selfControl":-2,"conformity":1},"effects":{"kidWarmth":-10,"mental":-2}},
     {"text":"Сделать вид, что не заметил[|а]","traits":{"empathy":-1},"effects":{"kidWarmth":-4}}]}
);
