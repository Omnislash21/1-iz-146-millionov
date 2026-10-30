// Регион как путь жизни, а не колорит. Главная развилка малого города и села — уехать или остаться (с расплатой через годы);
// контракт как социальный лифт в бедных регионах (Тыва, Бурятия, Северный Кавказ — доля контрактников в разы выше [~]);
// «все уехали» в 40 у оставшихся; редкие возвращения. Факты: smallTown, village, poorRegion (безработица выше средней в 1,8 раза).
RL.DATA.events.push(
  {"id":"rg_leave_hometown","title":"Уехать или остаться","major":true,"when":{"smallTown":true,"age":[17,24],"ownsFlat":false,"vuz":false,"inArmy":false},"p":0.02,"once":true,
   "text":"Одноклассники разъезжаются: кто в областной центр, кто в Москву. Здесь — родители, дом, свои. И ничего впереди.",
   "choices":[
     {"text":"В областной центр","traits":{"courage":2},"effects":{"cityMove":true,"social":-3,"later":{"id":"rg_left_parents","years":[10,20],"p":0.35}}},
     {"text":"В Москву — сразу всё","if":{"capitalLoc":false},"traits":{"courage":4},"effects":{"bigMove":"msk","social":-5,"mental":-2,"later":{"id":"rg_left_parents","years":[10,20],"p":0.4}}},
     {"text":"Остаться","traits":{"conformity":3},"effects":{"relation":{"all":5},"later":{"id":"rg_stayed","years":[15,22],"p":0.55}}}]},
  {"id":"rg_stayed","title":"Все уехали","trigger":true,"when":{"smallTown":true},
   "text":"Сорок лет. Школа на 80 учеников вместо 600, завод закрыт, одноклассники — в Москве и Сургуте. Ты остался[|ась].",
   "choices":[
     {"text":"Уехать хотя бы сейчас","if":{"ownsFlat":false},"traits":{"courage":3},"effects":{"cityMove":true,"mental":-2}},
     {"text":"Жить дальше здесь","traits":{"conformity":2},"effects":{"mental":-4,"happiness":-2}}]},
  {"id":"rg_left_parents","title":"Малая родина","trigger":true,"when":{"parentAlive":true},
   "text":"Родители остались в родном городке. Приезжаешь раз в год, и каждый раз они старше на пять.",
   "effects":{"mental":-3,"relation":{"all":-3}}},
  {"id":"rg_contract_lift","title":"Контракт","major":true,"when":{"sex":"m","age":[20,45],"poorRegion":true,"employed":false,"served":true,"year":[2000,2120]},"p":0.006,"cooldown":60,
   "mods":[{"if":{"svoActive":true},"mul":3}],
   "text":"Работы нет. В военкомате — контракт: зарплата в три раза больше любой местной, ипотека, льготы. Половина знакомых уже там.",
   "choices":[
     {"text":"Подписать","traits":{"courage":3,"conformity":2},"effects":{"army":"contract"}},
     {"text":"Нет","traits":{"selfControl":1},"effects":{"mental":-1}}]},
  {"id":"rg_poor_region","title":"Зарплата в регионе","when":{"poorRegion":true,"age":[22,60],"employed":true},"p":0.006,"cooldown":48,
   "text":"Вакансии в городе — за 20–25 тысяч. В Москве за ту же работу платят втрое. Половина мужчин района — на вахтах.",
   "choices":[
     {"text":"Вахта на Север","if":{"sex":"m"},"traits":{"diligence":2},"effects":{"cash":80000,"mental":-3,"spouseRelation":-4}},
     {"text":"Держаться за то, что есть","traits":{"conformity":1},"effects":{"mental":-2}}]},
  {"id":"rg_return_home","title":"Вернуться на малую родину","major":true,"when":{"age":[50,70],"capitalLoc":true},"p":0.002,"once":true,
   "text":"Устал[|а] от большого города. В родном городке — дом родителей, речка, тишина. И больше ничего.",
   "choices":[
     {"text":"Вернуться","traits":{"conformity":1},"effects":{"happiness":4,"mental":3,"social":-4}},
     {"text":"Остаться","effects":{}}]}
);
