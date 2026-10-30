// Ещё 27 цепочек «решение сейчас → последствие через годы» (эффект later — js/sim/chains.js).
// Решения в 18–25 аукаются в 30–45, решения в 30–40 — в 50–65, молодость — в старости.
// Эффекты: kidWarmth (тепло детей), shadow (доля зарплаты «в конверте»), addTie {theyOwe}, wantChild, kidBoost, wageMul, emigAdapt.
// Факт kidsWarm — дети выросли в тепле (среднее kid.warmth > 20). Частоты и вероятности — оценки [~]:
// p разовых развилок подобран под долю за жизнь (например, «сообщить о хищениях» ~5%, «забрать сироту» ~3%, «дача своими руками» ~20%).
RL.DATA.events.push(
  // 1. купленная курсовая / диплом на заказ → проверка через годы
  {"id":"c2_coursework","title":"Курсовая на заказ","major":true,"when":{"vuz":true,"age":[18,24]},"p":0.006,"once":true,
   "text":"Сессия горит. Объявление в подъезде: «Курсовые, дипломы. Быстро, недорого, антиплагиат 90%».",
   "choices":[
     {"text":"Заказать","traits":{"honesty":-2,"diligence":-1},"effects":{"cash":-8000,"later":{"id":"c2_coursework_check","years":[10,22],"p":0.15}}},
     {"text":"Писать самому","traits":{"diligence":2,"honesty":1},"effects":{"skills":2,"mental":-1}}]},
  {"id":"c2_coursework_check","title":"Антиплагиат","trigger":true,"major":true,
   "text":"Тебя выдвигают на повышение. Отдел кадров прогоняет старый диплом через «Антиплагиат» — совпадение с чужой работой 80%.",
   "choices":[
     {"text":"Признаться","traits":{"honesty":3},"effects":{"mental":-5,"wageMul":0.95}},
     {"text":"Сказать, что украли у тебя","traits":{"honesty":-2,"courage":1},"outcomes":[
       {"w":1,"text":"Поверили. Повышение — твоё.","effects":{"mental":-2}},
       {"w":1,"text":"Не поверили. Повышение отдали другому, за спиной шепчутся.","effects":{"mental":-6,"social":-3}}]}]},

  // 2. просьба родителей → наследство или его отсутствие
  {"id":"c2_parents_ask","title":"Родителям тяжело","major":true,"when":{"age":[30,55],"parentAlive":true},"p":0.004,"cooldown":120,
   "text":"Родители стареют: просят приезжать по выходным, помочь с ремонтом и врачами. У тебя своя жизнь и вечный цейтнот.",
   "choices":[
     {"text":"Ездить каждые выходные","traits":{"empathy":3,"diligence":1},"effects":{"mental":-2,"relation":{"all":8},"later":{"id":"c2_parents_thanks","years":[3,12],"p":0.45}}},
     {"text":"Помогать деньгами, но не временем","traits":{"selfControl":1},"effects":{"cash":-60000,"relation":{"all":2}}},
     {"text":"«Мне некогда»","traits":{"empathy":-3},"effects":{"relation":{"all":-10},"later":{"id":"c2_will_cut","years":[3,14],"p":0.4}}}]},
  {"id":"c2_parents_thanks","title":"Родители не забыли","trigger":true,
   "text":"Родители переписали на тебя гараж и сбережения «пока живы — чтобы потом не делить».",
   "effects":{"cash":400000,"happiness":4}},
  {"id":"c2_will_cut","title":"Завещание","trigger":true,"major":true,
   "text":"Узнаёшь: квартиру родители завещали другим родственникам — тем, кто «был рядом». Тебе — ничего.",
   "choices":[
     {"text":"Смириться","traits":{"conformity":1},"effects":{"mental":-6}},
     {"text":"Оспорить в суде","traits":{"courage":2,"empathy":-2},"outcomes":[
       {"w":1,"text":"Суд выделил обязательную долю. Родня с тобой не разговаривает.","effects":{"cash":600000,"social":-6,"mental":-4}},
       {"w":2,"text":"Суд отказал, юристам — двести тысяч.","effects":{"cash":-200000,"mental":-8}}]}]},

  // 3. служебный флирт в молодости → старые письма
  {"id":"c2_young_affair","title":"Двойная жизнь","major":true,"when":{"age":[22,35],"married":true},"p":0.003,"once":true,
   "text":"Однокурсни[ца|к], старая любовь, вдруг пишет. Встречи «по-дружески» становятся чем-то большим.",
   "choices":[
     {"text":"Оборвать сразу","traits":{"honesty":2,"selfControl":2},"effects":{"spouseRelation":2}},
     {"text":"Продолжать тайком","traits":{"honesty":-3},"effects":{"happiness":3,"later":{"id":"c2_old_letters","years":[8,18],"p":0.3}}}]},
  {"id":"c2_old_letters","title":"Через общих знакомых","trigger":true,"major":true,"when":{"hasPartner":true},
   "text":"Спустя годы общий знакомый «случайно» проговорился о той истории. Твой партнёр смотрит на тебя как на чужого.",
   "choices":[
     {"text":"Рассказать всё честно","traits":{"honesty":3},"outcomes":[
       {"w":2,"text":"Тяжёлый месяц. Остались вместе — но что-то сломалось.","effects":{"spouseRelation":-25,"mental":-6}},
       {"w":1,"text":"Развод. «Я двадцать лет жил[а|] во лжи».","effects":{"relationship":"breakup","reason":"старая измена","mental":-10}}]},
     {"text":"«Это сплетни»","traits":{"honesty":-2},"effects":{"spouseRelation":-12,"mental":-3}}]},

  // 4. друг тянет в сомнительное дело
  {"id":"c2_friend_deal","title":"Своё дело с другом","major":true,"when":{"age":[22,40]},"p":0.0008,"once":true,
   "text":"Старый друг зовёт в «тему»: перепродажа, без договоров, «все так работают». Нужны твои деньги и твоя подпись.",
   "choices":[
     {"text":"Войти","traits":{"courage":2,"selfControl":-1},"effects":{"cash":-150000,"later":{"id":"c2_friend_deal_end","years":[1,5],"p":0.8}}},
     {"text":"Отказаться","traits":{"selfControl":2},"effects":{"social":-1}}]},
  {"id":"c2_friend_deal_end","title":"Чем кончилась «тема»","trigger":true,"major":true,
   "text":"«Тема», в которую ты вошёл[|ла] с другом, закончилась.",
   "outcomes":[
     {"w":2,"text":"Друг исчез с деньгами и долгами на твоё имя.","effects":{"cash":-200000,"mental":-8}},
     {"w":1,"text":"К вам пришли из налоговой: незаконное предпринимательство. Друг всё свалил на тебя.","effects":{"case":"fraud159"}},
     {"w":1,"text":"Неожиданно выгорело! Вернул[|а] вложенное втрое.","effects":{"cash":450000,"happiness":5,"addTie":{"sphere":"business","src":"school","rank":2,"theyOwe":1}}}]},

  // 5. серая схема на работе → проверка через 3–8 лет
  {"id":"c2_gray_scheme","title":"Обнал","major":true,"when":{"age":[25,55],"employed":true,"prof":["accountant","manager","official","business","bank","economist","seller"]},"p":0.004,"once":true,
   "text":"Директор предлагает провести платежи через «прокладку» — фирму-однодневку. Тебе — процент.",
   "choices":[
     {"text":"Провести","traits":{"honesty":-4},"effects":{"cash":200000,"later":{"id":"c2_gray_audit","years":[3,8],"p":0.35}}},
     {"text":"Отказаться","traits":{"honesty":3,"courage":2},"outcomes":[
       {"w":2,"text":"Директор нашёл другого. Тебя перестали звать на совещания.","effects":{"mental":-2}},
       {"w":1,"text":"«Не командный игрок». Сократили.","effects":{"jobLoss":true,"mental":-5}}]}]},
  {"id":"c2_gray_audit","title":"Выездная налоговая","trigger":true,"major":true,
   "text":"Выездная проверка ФНС подняла платежи прошлых лет. Твоя подпись — на каждом.",
   "choices":[
     {"text":"Сотрудничать со следствием","traits":{"honesty":2},"outcomes":[
       {"w":2,"text":"Тебя сделали свидетелем. Директор сел.","effects":{"mental":-6,"jobLoss":true}},
       {"w":1,"text":"Всё равно в обвиняемых.","effects":{"case":"fraud159"}}]},
     {"text":"Позвонить знакомому","if":{"tieLaw":true},"traits":{"honesty":-2},"effects":{"useTie":"law","noTie":{"case":"fraud159"}}},
     {"text":"Молчать","effects":{"case":"fraud159"}}]},

  // 6. неплановая беременность (решение — тяжёлое в любую сторону)
  {"id":"c2_pregnancy","title":"Две полоски","major":true,"when":{"sex":"f","age":[17,38]},"p":0.0012,"cooldown":120,
   "text":"Тест — две полоски. Не планировали. Денег мало, жильё съёмное, работа шаткая.",
   "choices":[
     {"text":"Оставить ребёнка","traits":{"courage":2,"empathy":2},"effects":{"wantChild":true,"mental":-2}},
     {"text":"Прервать","traits":{"selfControl":1},"effects":{"mental":-6,"later":{"id":"c2_pregnancy_late","years":[6,18],"p":0.3}}}]},
  {"id":"c2_pregnancy_late","title":"Тот год","trigger":true,
   "text":"Иногда считаешь: тому ребёнку сейчас было бы столько-то лет. Мысль приходит без спроса.",
   "effects":{"mental":-4}},

  // 7. опека над племянником
  {"id":"c2_custody","title":"Сирота в семье","major":true,"when":{"age":[25,55]},"p":0.0001,"once":true,
   "text":"В аварии погибла твоя двоюродная сестра. Её ребёнка забирает опека — если родня не оформит опекунство.",
   "choices":[
     {"text":"Забрать к себе","traits":{"empathy":4,"courage":2},"effects":{"cash":-200000,"mental":-4,"later":{"id":"c2_nephew_grown","years":[10,18],"p":0.7}}},
     {"text":"Не потянуть — пусть решает опека","traits":{"empathy":-3},"effects":{"mental":-4,"relation":{"all":-12},"later":{"id":"c2_custody_guilt","years":[4,15],"p":0.5}}}]},
  {"id":"c2_nephew_grown","title":"Вырос","trigger":true,
   "text":"Ребёнок сестры, которого ты забрал[|а], вырос, выучился и зовёт тебя на свадьбу «вместо родителей».",
   "effects":{"happiness":8,"mental":4,"addTie":{"sphere":"business","src":"kin","rank":1,"theyOwe":2}}},
  {"id":"c2_custody_guilt","title":"Письмо из детдома","trigger":true,
   "text":"Пришло письмо от выпускника детдома — того самого ребёнка сестры. Без упрёков. От этого только тяжелее.",
   "effects":{"mental":-8,"happiness":-4}},

  // 8. работа по выходным или дети
  {"id":"c2_weekends","title":"Выходные","major":true,"when":{"age":[28,48],"employed":true,"kidsN":{">=":1}},"p":0.005,"cooldown":48,
   "text":"Предлагают постоянные смены по выходным — плюс треть к зарплате. Дети и так видят тебя только вечером.",
   "choices":[
     {"text":"Брать смены","traits":{"diligence":2,"empathy":-1},"effects":{"wageMul":1.12,"kidWarmth":-12}},
     {"text":"Выходные — детям","traits":{"empathy":2},"effects":{"kidWarmth":10,"happiness":2,"later":{"id":"c2_kids_call","years":[18,30],"p":0.6}}}]},
  {"id":"c2_kids_call","title":"Дети звонят","trigger":true,"when":{"kidsWarm":true},
   "text":"Взрослые дети звонят просто так, приезжают на праздники с внуками. Ты помнишь, на что потратил[|а] те выходные.",
   "effects":{"happiness":6,"mental":3}},

  // 9. кредит в 20 лет → кредитная история
  {"id":"c2_young_credit","title":"Рассрочка","major":true,"when":{"age":[18,24],"year":[2005,2120]},"p":0.006,"once":true,
   "text":"Новый телефон — «0% в рассрочку», машина — «кредит без первого взноса». Все друзья уже взяли.",
   "choices":[
     {"text":"Взять","traits":{"selfControl":-2},"effects":{"cash":-60000,"happiness":3,"later":{"id":"c2_bad_history","years":[4,10],"p":0.35}}},
     {"text":"Обойтись","traits":{"selfControl":2},"effects":{}}]},
  {"id":"c2_bad_history","title":"Кредитная история","trigger":true,
   "text":"Подаёшь на ипотеку — отказ. В бюро кредитных историй — просрочки из той самой рассрочки в двадцать лет.",
   "effects":{"mental":-4}},

  // 10. язык в молодости → карьера или эмиграция
  {"id":"c2_language","title":"Английский","major":true,"when":{"age":[18,32]},"p":0.002,"once":true,
   "text":"Курсы английского по вечерам — два года, дорого и скучно. «Зачем, если ты никуда не едешь?»",
   "choices":[
     {"text":"Учить","traits":{"diligence":3,"curiosity":2},"effects":{"cash":-60000,"skills":3,"flag":"english","later":{"id":"c2_language_pays","years":[5,15],"p":0.5}}},
     {"text":"Не до того","effects":{}}]},
  {"id":"c2_language_pays","title":"Язык пригодился","trigger":true,"when":{"employed":true},
   "text":"Иностранный партнёр, проект, переписка — и единственный, кто может, это ты. Через месяц — новая должность.",
   "effects":{"wageMul":1.15,"happiness":3}},

  // 11. спорт в молодости → сосуды в 50
  {"id":"c2_sport_habit","title":"Привычка двигаться","major":true,"when":{"age":[20,35]},"p":0.002,"once":true,
   "text":"Друг зовёт бегать по утрам — три раза в неделю, без пропусков, годами.",
   "choices":[
     {"text":"Втянуться","traits":{"diligence":2,"selfControl":2},"effects":{"health":2,"later":{"id":"c2_sport_dividend","years":[18,28],"p":0.6}}},
     {"text":"Не моё","effects":{}}]},
  {"id":"c2_sport_dividend","title":"Сосуды как в сорок","trigger":true,
   "text":"На диспансеризации кардиолог удивлён: «Давление и сосуды — как у сорокалетнего. Что делали?» Двадцать лет пробежек.",
   "effects":{"health":6,"mental":2}},

  // 12. игнорировать симптомы → поздний инфаркт
  {"id":"c2_ignore_pain","title":"Давит в груди","major":true,"when":{"age":[40,70]},"p":0.004,"cooldown":60,
   "text":"На лестнице давит в груди, отдаёт в руку. «Возраст, устал». Кардиолог — через месяц, платно — завтра.",
   "choices":[
     {"text":"Сходить к врачу","traits":{"selfControl":1},"effects":{"cash":-5000,"health":1}},
     {"text":"Пройдёт само","traits":{"selfControl":-1,"courage":1},"effects":{"later":{"id":"c2_heart_late","years":[1,4],"p":0.25}}}]},
  {"id":"c2_heart_late","title":"Скорая","trigger":true,"major":true,
   "text":"Ночью — скорая, реанимация, стент. Врач: «Вы же наверняка давно чувствовали?»",
   "effects":{"condition":"ihd","health":-12,"mental":-6,"cash":-50000}},

  // 13. дешёвая квартира без проверки → объявился наследник
  {"id":"c2_cheap_flat","title":"Слишком дёшево","major":true,"when":{"age":[25,55],"wealthAvg":{">":8}},"p":0.001,"once":true,
   "text":"Квартира на треть дешевле рынка: «Хозяин уезжает, срочно». Риелтор торопит, проверять историю некогда.",
   "choices":[
     {"text":"Купить как дачу или для сдачи","traits":{"courage":2,"selfControl":-1},"effects":{"cash":-1500000,"later":{"id":"c2_flat_claim","years":[1,5],"p":0.35}}},
     {"text":"Проверить и отказаться","traits":{"selfControl":2},"effects":{}}]},
  {"id":"c2_flat_claim","title":"Наследник","trigger":true,"major":true,
   "text":"Объявился наследник прежнего хозяина: продажу оспаривают в суде — квартиру продали «по поддельной доверенности».",
   "outcomes":[
     {"w":2,"text":"Суд забрал квартиру. Деньги ушли «продавцу», которого нет.","effects":{"cash":-300000,"mental":-12}},
     {"w":1,"text":"Отстоял[|а] — добросовестный приобретатель. Год нервов и юристы.","effects":{"cash":1300000,"mental":-5}}]},

  // 14. студсовет и тусовки → связи через годы
  {"id":"c2_student_union","title":"Студсовет","major":true,"when":{"vuz":true,"age":[18,23]},"p":0.005,"once":true,
   "text":"Зовут в студсовет: собрания, мероприятия, ректорат. Учёба страдает, зато ты знаешь всех.",
   "choices":[
     {"text":"Пойти","traits":{"sociability":3,"diligence":-1},"effects":{"social":4,"later":{"id":"c2_classmate_rises","years":[6,14],"p":0.6}}},
     {"text":"Учиться","traits":{"diligence":2},"effects":{"skills":2}}]},
  {"id":"c2_classmate_rises","title":"Свой человек наверху","trigger":true,
   "text":"Парень из студсовета теперь в областном правительстве. Узнал тебя на улице: «Заходи, если что».",
   "effects":{"addTie":{"sphere":"official","src":"vuz","rank":2},"happiness":2}},

  // 15. ранний брак
  {"id":"c2_early_marriage","title":"Свадьба в двадцать","major":true,"when":{"age":[18,22],"hasPartner":true,"married":false},"p":0.006,"once":true,
   "text":"Родители торопят: «Пора, хорошая пара». Вы вместе полгода.",
   "choices":[
     {"text":"Жениться сейчас","traits":{"conformity":2,"courage":1},"effects":{"relationship":"marry","later":{"id":"c2_early_crisis","years":[4,9],"p":0.4}}},
     {"text":"Подождать","traits":{"selfControl":2},"effects":{}}]},
  {"id":"c2_early_crisis","title":"Выросли в разные стороны","trigger":true,"major":true,"when":{"married":true},
   "text":"Женились в двадцать — а в тридцать вы будто разные люди. Говорить не о чем.",
   "choices":[
     {"text":"Попробовать заново","traits":{"empathy":2},"effects":{"spouseRelation":-8,"mental":-3}},
     {"text":"Разойтись по-хорошему","traits":{"courage":2},"effects":{"relationship":"breakup","reason":"выросли в разные стороны","mental":-6}}]},

  // 16. переезд за карьерой — родители одни
  {"id":"c2_move_career","title":"Повышение в другом городе","major":true,"when":{"age":[25,42],"employed":true,"parentAlive":true,"ownsFlat":false},"p":0.0015,"once":true,
   "text":"Предлагают должность в областном центре или Москве. Родители остаются одни в своём городе.",
   "choices":[
     {"text":"Ехать","traits":{"courage":2,"empathy":-1},"effects":{"cityMove":true,"wageMul":1.25,"later":{"id":"c2_parents_far","years":[8,18],"p":0.5}}},
     {"text":"Остаться рядом с родителями","traits":{"empathy":2},"effects":{"relation":{"all":6}}}]},
  {"id":"c2_parents_far","title":"Далеко","trigger":true,"when":{"parentAlive":true},
   "text":"Родители постарели. Звонок соседки: «Приезжай, им одним уже тяжело». Билеты, отпуска, сиделки — на расстоянии.",
   "effects":{"cash":-120000,"mental":-6}},

  // 17. дача своими руками → старость на природе
  {"id":"c2_dacha_build","title":"Строить дачу","major":true,"when":{"age":[33,58],"dachaOwn":false},"p":0.0008,"once":true,
   "text":"Участок за городом. Строить самим — все выходные десять лет. Или забыть.",
   "choices":[
     {"text":"Строить","traits":{"diligence":3},"effects":{"cash":-400000,"flag":"dachaBuilt","later":{"id":"c2_dacha_old","years":[12,25],"p":0.7}}},
     {"text":"Не надо","effects":{}}]},
  {"id":"c2_dacha_old","title":"Своя дача","trigger":true,
   "text":"Лето на даче, которую ты построил[|а] своими руками. Внуки, яблони, баня — то, ради чего было всё это.",
   "effects":{"happiness":7,"mental":4,"health":1}},

  // 18. откладывать с молодости
  {"id":"c2_savings","title":"Десять процентов","major":true,"when":{"age":[24,38],"employed":true},"p":0.0025,"once":true,
   "text":"Финансист на работе советует откладывать 10% каждой зарплаты — «и не трогать до пенсии».",
   "choices":[
     {"text":"Откладывать","traits":{"selfControl":3},"effects":{"cash":-30000,"later":{"id":"c2_savings_result","years":[20,30],"p":0.75}}},
     {"text":"Жить сейчас","traits":{"selfControl":-1},"effects":{"happiness":2}}]},
  {"id":"c2_savings_result","title":"Подушка","trigger":true,
   "text":"Двадцать лет по десять процентов. На счёте — то, что делает старость не страшной.",
   "effects":{"cash":2500000,"mental":4}},

  // 19. сообщить о хищениях
  {"id":"c2_whistle","title":"Хищения","major":true,"when":{"age":[28,58],"employed":true},"p":0.00025,"once":true,
   "text":"Ты видишь, как начальство выводит деньги. Можно написать в прокуратуру. Можно промолчать.",
   "choices":[
     {"text":"Написать","traits":{"honesty":4,"courage":4},"effects":{"later":{"id":"c2_whistle_end","years":[0.5,2],"p":1}}},
     {"text":"Промолчать","traits":{"conformity":2,"honesty":-1},"effects":{}}]},
  {"id":"c2_whistle_end","title":"Чем кончилось","trigger":true,"major":true,
   "text":"Твоё заявление в прокуратуре «рассмотрели».",
   "outcomes":[
     {"w":3,"text":"Начальник узнал, кто писал. Тебя уволили за «прогулы».","effects":{"jobLoss":true,"mental":-8}},
     {"w":1,"text":"Возбудили дело. Начальника сняли, тебя повысили.","effects":{"wageMul":1.2,"happiness":5}}]},

  // 20. кружки ребёнку
  {"id":"c2_kid_clubs","title":"Кружки за деньги","major":true,"when":{"age":[28,48],"kidsN":{">=":1}},"p":0.004,"cooldown":60,
   "text":"Хорошие кружки — шахматы, программирование, музыка — восемь тысяч в месяц на ребёнка. Это треть свободных денег.",
   "choices":[
     {"text":"Отдать","traits":{"empathy":2,"diligence":1},"effects":{"cash":-96000,"kidBoost":0.3,"kidWarmth":4,"later":{"id":"c2_kid_success","years":[8,15],"p":0.35}}},
     {"text":"Двор и бесплатная секция","effects":{}}]},
  {"id":"c2_kid_success","title":"Гордость","trigger":true,
   "text":"Ребёнок поступил на бюджет в сильный вуз — тот самый кружок программирования.",
   "effects":{"happiness":7}},

  // 21. дети после развода
  {"id":"c2_divorce_kids","title":"Выходные с детьми","major":true,"when":{"age":[25,55],"divorced":true,"kidsN":{">=":1}},"p":0.006,"once":true,
   "text":"После развода дети живут с бывшими. Видеться по выходным — дорога, неловкие разговоры. Новая семья ревнует.",
   "choices":[
     {"text":"Видеться каждые выходные","traits":{"empathy":3},"effects":{"kidWarmth":12,"mental":-1}},
     {"text":"«Начать новую жизнь»","traits":{"empathy":-3},"effects":{"kidWarmth":-20,"later":{"id":"c2_kids_wedding","years":[12,22],"p":0.5}}}]},
  {"id":"c2_kids_wedding","title":"Свадьба без тебя","trigger":true,
   "text":"О свадьбе своего ребёнка ты узнаёшь из чужих фотографий. Тебя не позвали.",
   "effects":{"mental":-8,"happiness":-6}},

  // 22. «белая» зарплата или конверт
  {"id":"c2_white_salary","title":"Белая или серая","major":true,"when":{"age":[20,40],"employed":true,"year":[1995,2120]},"p":0.0025,"once":true,
   "text":"Новый работодатель предлагает выбор: «белыми» на 20% меньше или «в конверте» — и все довольны.",
   "choices":[
     {"text":"«В конверте»","traits":{"honesty":-1},"effects":{"shadow":0.95,"wageMul":1.15}},
     {"text":"Белую","traits":{"selfControl":2},"effects":{"shadow":0}}]},

  // 23. друг детства из плохой компании
  {"id":"c2_bad_friend","title":"Друг со двора","major":true,"when":{"age":[14,17]},"p":0.006,"once":true,
   "text":"Друг со двора зовёт «на дело» — снять колёса, вскрыть ларёк. «Не ссы, все так».",
   "choices":[
     {"text":"Отказаться и отдалиться","traits":{"selfControl":2,"courage":1},"effects":{"social":-2,"later":{"id":"c2_friend_out","years":[8,15],"p":0.4}}},
     {"text":"Пойти","traits":{"selfControl":-2,"conformity":2},"effects":{"later":{"id":"c2_friend_out","years":[8,15],"p":0.4}},"outcomes":[{"w":2,"text":"Обошлось — никто не видел.","effects":{"social":2}},{"w":1,"text":"Поймали обоих.","effects":{"crime":"minor"}}]}]},
  {"id":"c2_friend_out","title":"Откинулся","trigger":true,"major":true,
   "text":"Друг со двора вышел из колонии. Ни работы, ни жилья. Просит пожить и помочь «устроиться».",
   "choices":[
     {"text":"Помочь — он же свой","traits":{"empathy":3},"outcomes":[
       {"w":2,"text":"Устроил[|а] его грузчиком. Держится.","effects":{"cash":-30000,"addTie":{"sphere":"business","src":"school","rank":1,"theyOwe":1}}},
       {"w":1,"text":"Через месяц пропали деньги и он сам.","effects":{"cash":-80000,"mental":-5}}]},
     {"text":"Отказать","traits":{"selfControl":1},"effects":{"mental":-2}}]},

  // 24. занять родственнику крупную сумму
  {"id":"c2_lend_kin","title":"Родственник просит","major":true,"when":{"age":[25,60],"wealthAvg":{">":4}},"p":0.0011,"once":true,
   "text":"Двоюродный брат просит в долг полмиллиона «на бизнес». Отказывать родне — не принято.",
   "choices":[
     {"text":"Дать","traits":{"empathy":2,"conformity":2},"effects":{"cash":-500000,"later":{"id":"c2_lend_kin_end","years":[2,8],"p":1}}},
     {"text":"Отказать","traits":{"selfControl":2},"effects":{"relation":{"all":-5}}}]},
  {"id":"c2_lend_kin_end","title":"Родственный долг","trigger":true,
   "text":"Долг двоюродного брата.",
   "outcomes":[
     {"w":1,"text":"Вернул с процентами и с тех пор зовёт тебя «спасителем».","effects":{"cash":650000,"happiness":3}},
     {"w":2,"text":"Не вернул. На семейных праздниках вы делаете вид, что не знакомы.","effects":{"mental":-5,"relation":{"all":-4}}}]},

  // 25. мать (отец) на старости — к себе или в пансионат (без упоминания конкретного родителя)
  {"id":"c2_parent_move_in","title":"Забрать к себе?","major":true,"when":{"age":[40,68],"parentAlive":true},"p":0.0018,"once":true,
   "text":"Родитель после восьмидесяти уже не справляется один. Забрать к себе — значит потерять свою жизнь на годы.",
   "choices":[
     {"text":"Забрать","traits":{"empathy":4},"effects":{"mental":-6,"happiness":-3,"later":{"id":"c2_parent_peace","years":[2,8],"p":0.6}}},
     {"text":"Нанять помощницу и навещать","traits":{"diligence":1},"effects":{"cash":-250000}},
     {"text":"Пусть справляется сам","traits":{"empathy":-3},"effects":{"later":{"id":"c2_parent_alone","years":[1,5],"p":0.5}}}]},
  {"id":"c2_parent_peace","title":"Последние годы","trigger":true,
   "text":"Последние годы родителя прошли у тебя дома. Тяжело — но тебе не в чем себя упрекнуть.",
   "effects":{"mental":5,"happiness":3}},
  {"id":"c2_parent_alone","title":"Упал дома","trigger":true,
   "text":"Соседи нашли твоего родителя на полу: упал дома, пролежал сутки. Вина остаётся с тобой надолго.",
   "effects":{"mental":-10}},

  // 26. в 30 — учиться заново
  {"id":"c2_second_degree","title":"Второе высшее","major":true,"when":{"age":[28,42],"employed":true},"p":0.0012,"once":true,
   "text":"Заочно, по вечерам, за деньги — второе высшее или переподготовка. Пять лет без выходных.",
   "choices":[
     {"text":"Учиться","traits":{"diligence":3,"curiosity":2},"effects":{"cash":-250000,"mental":-3,"later":{"id":"c2_second_pays","years":[4,8],"p":0.6}}},
     {"text":"Поздно","effects":{}}]},
  {"id":"c2_second_pays","title":"Новый диплом","trigger":true,"when":{"employed":true},
   "text":"Второй диплом открыл двери, которые были закрыты: новая должность и другие деньги.",
   "effects":{"wageMul":1.25,"happiness":4}},

  // 27. рискнуть всем ради своего дела в 40
  {"id":"c2_midlife_biz","title":"Сейчас или никогда","major":true,"when":{"age":[38,50],"employed":true},"p":0.001,"once":true,
   "text":"Сорок лет, стабильная работа — и мысль, что так и пройдёт вся жизнь. Можно заложить машину и открыть своё.",
   "choices":[
     {"text":"Рискнуть","traits":{"courage":3},"effects":{"startBiz":"service","later":{"id":"c2_midlife_end","years":[3,8],"p":0.6}}},
     {"text":"Остаться","traits":{"conformity":2},"effects":{"later":{"id":"c2_midlife_regret","years":[10,20],"p":0.3}}}]},
  {"id":"c2_midlife_end","title":"Своё дело в сорок","trigger":true,
   "text":"Своё дело, начатое в сорок.",
   "outcomes":[
     {"w":1,"text":"Выстояло. Теперь у тебя пять сотрудников и спокойные ночи.","effects":{"happiness":6,"cash":300000}},
     {"w":1,"text":"Закрылось. Машины нет, долги есть, на прежнее место не берут.","effects":{"closeBiz":true,"cash":-300000,"mental":-8}}]},
  {"id":"c2_midlife_regret","title":"А если бы","trigger":true,
   "text":"Иногда думаешь: а если бы тогда, в сорок, рискнул[|а]? Ответа нет, и это хуже всего.",
   "effects":{"mental":-3,"happiness":-3}}
);
