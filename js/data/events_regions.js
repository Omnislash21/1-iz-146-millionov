// Регион — не коэффициент, а другая жизнь. События, которые бывают только «там»: Кавказ, Москва, Север, Дальний Восток,
// промышленный Урал и Кузбасс, нефтяной Север, село. Плюс переезд внутри страны — как реальный выход.
// tags — теги регионов (js/data/regions.js). Реалии: «кража невесты» и решения родни на Северном Кавказе (правозащитные доклады, редкие случаи [~]);
// реновация в Москве (2017); северный завоз; «праворульки» Владивостока; «дальневосточный гектар» (2016); аварии на шахтах Кузбасса
// («Распадская» 2010, «Листвяжная» 2021); закрытие сельских школ и ФАПов (2000–2010-е); моногорода; переезды в Москву и Тюмень за зарплатой.
RL.DATA.events.push(
  // ---------- Северный Кавказ ----------
  {"id":"rg_cauc_family_decides","title":"Решение родни","major":true,"when":{"tags":["caucasus"],"age":[18,30],"hasPartner":false},"p":0.006,"once":true,
   "text":"Старшие родственники уже нашли [тебе невесту|тебе жениха] — «из хорошей семьи». Сватовство через месяц.",
   "choices":[
     {"text":"Согласиться — так принято","traits":{"conformity":3},"effects":{"relation":{"all":8},"flag":"arrangedMatch"}},
     {"text":"Сказать, что выберешь сам[|а]","traits":{"courage":3,"conformity":-3},"outcomes":[
       {"w":2,"text":"Скандал. Отец неделю не разговаривал, но отступил.","effects":{"relation":{"all":-8},"mental":-3}},
       {"w":1,"text":"Родня обиделась всерьёз: на свадьбы и похороны тебя больше не зовут.","effects":{"relation":{"all":-20},"social":-8}}]}]},
  {"id":"rg_cauc_jobs_kin","title":"Работа по родству","when":{"tags":["caucasus"],"age":[20,45],"employed":false},"p":0.015,"cooldown":24,
   "text":"Безработица в республике — каждая третья семья. Работу дают «своим»: дядя может устроить, но за это ты ему [обязан|обязана].",
   "choices":[
     {"text":"Попросить дядю","traits":{"conformity":2},"effects":{"addTie":{"sphere":"official","src":"kin","rank":2},"mental":1}},
     {"text":"Уехать на заработки в Москву или Сургут","if":{"ownsFlat":false},"traits":{"courage":2},"effects":{"bigMove":"msk","relation":{"all":-3}}}]},
  {"id":"rg_cauc_women","title":"«Что люди скажут»","when":{"tags":["caucasus"],"sex":"f","age":[15,40]},"p":0.006,"cooldown":48,
   "text":"Родственники недовольны: юбка короткая, работаешь допоздна, «девушке не пристало».",
   "choices":[
     {"text":"Подстроиться","traits":{"conformity":3},"effects":{"relation":{"all":4},"mental":-3}},
     {"text":"Жить по-своему","traits":{"courage":3,"conformity":-2},"effects":{"relation":{"all":-6},"mental":1,"social":-2}}]},
  {"id":"rg_chechnya_video","title":"Извинение на видео","when":{"tags":["chechnya"],"age":[16,60],"year":[2015,2120]},"p":0.002,"once":true,
   "text":"Знакомый резко высказался в соцсетях о руководстве республики. Через день — видео, где он извиняется. Все всё понимают.",
   "effects":{"mental":-4,"trait":{"conformity":2}}},

  // ---------- Москва ----------
  {"id":"rg_msk_mortgage","title":"Квадратный метр","when":{"tags":["capital"],"age":[25,45],"ownsFlat":false},"p":0.006,"cooldown":60,
   "text":"Однушка на окраине Москвы — 25 твоих годовых зарплат. Коллеги берут ипотеку на 30 лет или уезжают в Подмосковье.",
   "effects":{"mental":-2}},
  {"id":"rg_msk_renovation","title":"Реновация","when":{"tags":["capital"],"year":[2017,2030],"ownsFlat":true},"p":0.004,"once":true,
   "text":"Твою пятиэтажку включили в программу реновации. Новая квартира — но в другом районе и через несколько лет.",
   "choices":[
     {"text":"Голосовать «за»","traits":{"conformity":1},"effects":{"happiness":3}},
     {"text":"Протестовать с соседями","traits":{"courage":2},"effects":{"social":3,"mental":-2}}]},
  {"id":"rg_msk_commute","title":"Дорога","when":{"tags":["capital_area","capital"],"age":[20,65],"employed":true},"p":0.006,"cooldown":36,
   "text":"Два часа в одну сторону: электричка, метро, пересадка. Четыре часа в день — жизнь в дороге.",
   "effects":{"mental":-2,"health":-1}},

  // ---------- Север и нефть ----------
  {"id":"rg_north_delivery","title":"Северный завоз","when":{"tags":["arctic","remote"],"age":[18,90]},"p":0.006,"cooldown":24,
   "text":"Последний паром до весны. Цены в магазине — вдвое выше материковых, свежих овощей не будет до мая.",
   "effects":{"cash":-12000,"mental":-1}},
  {"id":"rg_north_leave","title":"На материк","major":true,"when":{"tags":["arctic","north"],"age":[45,70]},"p":0.004,"once":true,
   "text":"Северяне к пенсии уезжают «на материк». Квартира здесь не стоит ничего, жильё по программе переселения — очередь на годы.",
   "choices":[
     {"text":"Встать в очередь на переселение","traits":{"selfControl":2},"effects":{"mental":-1}},
     {"text":"Остаться — здесь всё своё","traits":{"conformity":1},"effects":{"happiness":1}}]},
  {"id":"rg_oil_shift","title":"Нефтянка","when":{"tags":["oil"],"age":[20,50],"sex":"m","employed":false},"p":0.02,"cooldown":24,
   "text":"На месторождение набирают операторов и слесарей: вахта, зарплата вдвое выше средней, но два месяца без семьи.",
   "choices":[
     {"text":"Устроиться","traits":{"diligence":2},"effects":{"cash":50000,"mental":-2,"spouseRelation":-3}},
     {"text":"Не ехать","effects":{}}]},

  // ---------- Дальний Восток ----------
  {"id":"rg_fe_wheel","title":"Праворулька","when":{"tags":["fareast"],"age":[20,60],"year":[1993,2012]},"p":0.006,"once":true,
   "text":"Во Владивосток пришёл паром с японскими машинами. «Корона» с правым рулём — вдвое дешевле новой «Лады».",
   "choices":[
     {"text":"Купить","traits":{"courage":1},"effects":{"cash":-150000,"flag":"ownCar","happiness":4}},
     {"text":"Не надо","effects":{}}]},
  {"id":"rg_fe_hectare","title":"Дальневосточный гектар","when":{"tags":["fareast"],"age":[25,60],"year":[2016,2120]},"p":0.004,"once":true,
   "text":"Можно бесплатно взять гектар земли. Только дороги, электричества и воды там нет.",
   "choices":[
     {"text":"Взять и строить дом","traits":{"courage":2,"diligence":2},"outcomes":[
       {"w":1,"text":"Через три года стоит дом. Тяжело, но своё.","effects":{"cash":-500000,"happiness":6}},
       {"w":2,"text":"Деньги ушли на дорогу и сваи. Участок зарастает.","effects":{"cash":-200000,"mental":-4}}]},
     {"text":"Не связываться","effects":{}}]},
  {"id":"rg_fe_outflow","title":"Все уезжают","when":{"tags":["fareast","remote"],"age":[18,40]},"p":0.006,"cooldown":48,
   "text":"Друзья один за другим уезжают «на Запад» — в Новосибирск, Краснодар, Москву. В городе остаются старики.",
   "choices":[
     {"text":"Уехать тоже","if":{"ownsFlat":false},"traits":{"courage":2},"effects":{"bigMove":"krd","social":-5}},
     {"text":"Остаться","traits":{"conformity":1},"effects":{"social":-3,"mental":-1}}]},

  // ---------- Урал, Кузбасс, промышленные города ----------
  {"id":"rg_mine_accident","title":"Авария на шахте","major":true,"when":{"tags":["industrial"],"sex":"m","age":[20,55],"prof":["worker","miner","laborer","welder","electrician"]},"p":0.002,"cooldown":120,
   "text":"Взрыв метана на соседнем участке. Из смены вернулись не все. Ты был в другой лаве.",
   "choices":[
     {"text":"Остаться — другой работы в городе нет","traits":{"courage":2},"effects":{"mental":-8}},
     {"text":"Уволиться, пока жив","traits":{"selfControl":1},"effects":{"jobLoss":true,"mental":-4}}]},
  {"id":"rg_monotown","title":"Градообразующий","major":true,"when":{"tags":["industrial"],"age":[25,60],"smallTown":true,"employed":true},"p":0.003,"once":true,
   "text":"Завод, на котором держится весь город, «временно» переводят на трёхдневку. Потом — сокращения.",
   "choices":[
     {"text":"Держаться за место","traits":{"conformity":2},"effects":{"wageMul":0.7,"mental":-4}},
     {"text":"Уехать в областной центр","if":{"ownsFlat":false},"traits":{"courage":2},"effects":{"cityMove":true,"mental":-2}}]},
  {"id":"rg_ecology","title":"Чёрное небо","when":{"tags":["industrial"],"age":[3,90],"bigCity":true},"p":0.006,"cooldown":36,
   "text":"Режим «чёрного неба»: выбросы комбината, дышать тяжело, детям нельзя гулять. Каждый год одно и то же.",
   "effects":{"health":-2}},

  // ---------- село ----------
  {"id":"rg_village_school_closed","title":"Школу закрыли","when":{"village":true,"year":[2000,2020],"kidsN":{">=":1}},"p":0.003,"once":true,
   "text":"Сельскую школу «оптимизировали»: детей возят за 20 км на школьном автобусе, зимой он не всегда доезжает.",
   "effects":{"mental":-3,"kidWarmth":-2}},
  {"id":"rg_village_fap","title":"Фельдшер уехал","when":{"village":true,"age":[30,110]},"p":0.003,"once":true,
   "text":"ФАП в селе закрыли: фельдшер на пенсии, нового не нашли. До поликлиники — 40 км, автобус два раза в неделю.",
   "effects":{"health":-2,"mental":-2}},
  {"id":"rg_village_gas","title":"Газ провели","when":{"village":true,"year":[2005,2120]},"p":0.002,"once":true,
   "text":"В село наконец провели газ. Подключение к дому — за свои, но зимой больше не нужно колоть дрова.",
   "choices":[
     {"text":"Подключиться","effects":{"cash":-150000,"happiness":5,"health":1}},
     {"text":"Дорого — останемся на печке","effects":{"health":-1}}]},
  {"id":"rg_village_leave","title":"Уехать из села","major":true,"when":{"village":true,"age":[18,35],"ownsFlat":false},"p":0.006,"cooldown":60,
   "text":"Работы в селе нет, клуб закрыт, молодёжь уезжает. Зовут в город — к однокласснику на стройку.",
   "choices":[
     {"text":"Уехать в город","traits":{"courage":2},"effects":{"cityMove":true,"social":-3}},
     {"text":"Остаться — здесь дом и родители","traits":{"conformity":2},"effects":{"relation":{"all":4}}}]}
);
