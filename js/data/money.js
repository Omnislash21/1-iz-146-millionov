// Деньги взрослого в действии: на что тратят накопления, что делать со второй квартирой, досрочное погашение.
// Суммы cash — рубли 2024 (расходы умножаются на уровень цен региона). Эффекты RL.Assets: flatUse, repay, spend (в средних ЗП), buyRentFlat.
// Источники: Росстат (структура потребительских расходов, выезды за рубеж), ЦИАН/Авито (аренда и цены жилья, дач, авто) [~].
RL.DATA.events.push(
  {"id":"extra_flat","title":"Вторая квартира","trigger":true,"when":{"age":[18,120]},
   "text":"Теперь у тебя есть ещё одно жильё ({what}). Что с ним делать?",
   "choices":[
     {"text":"Сдавать","traits":{"diligence":1},"effects":{"flatUse":"rent"}},
     {"text":"Продать","effects":{"flatUse":"sell"}},
     {"text":"Переехать туда, а свою — освободить","effects":{"flatUse":"live"}},
     {"text":"Оставить пустой — для детей","traits":{"empathy":1},"effects":{"flatUse":"keep"}}]},
  {"id":"mortgage_prepay","title":"Ипотека","trigger":true,"when":{"hasMortgage":true},
   "text":"Накоплений уже больше, чем осталось по ипотеке. Закрыть её досрочно?",
   "choices":[
     {"text":"Закрыть полностью","traits":{"selfControl":2},"effects":{"repay":"mortgage","mental":5,"happiness":3}},
     {"text":"Оставить: деньги работают на вкладе","traits":{"courage":1},"effects":{}}]},
  {"id":"vacation","title":"Отпуск","when":{"age":[22,85],"wealthAvg":{">":3},"health":{">":35}},"p":0.025,"cooldown":11,
   "mods":[{"if":{"wealthAvg":{">":15}},"mul":2},{"if":{"bigCity":true},"mul":1.4},{"if":{"year":[1985,1995]},"mul":0.3}],
   "text":"Отпуск через месяц. Куда?",
   "choices":[
     {"text":"Турция или Египет, «всё включено»","if":{"year":[1997,2120]},"traits":{"curiosity":1},"effects":{"cash":-180000,"happiness":7,"mental":6}},
     {"text":"Сочи, Крым или Калининград","effects":{"cash":-110000,"happiness":5,"mental":5}},
     {"text":"Европа или Азия — посмотреть мир","if":{"wealthAvg":{">":10},"year":[1995,2120]},"traits":{"curiosity":3},"effects":{"cash":-350000,"happiness":9,"mental":7,"skills":1}},
     {"text":"На дачу или к родне","effects":{"cash":-10000,"happiness":2,"mental":3}},
     {"text":"Остаться дома — копить","traits":{"selfControl":2},"effects":{"mental":-1}}]},
  {"id":"buy_dacha","title":"Дача","when":{"age":[38,75],"wealthAvg":{">":12},"not":{"flag_dacha":1}},"p":0.006,"cooldown":36,
   "mods":[{"if":{"focus_dacha":true},"mul":5},{"if":{"bigCity":true},"mul":1.5}],
   "text":"Продаётся дача в садовом товариществе: шесть соток, домик, баня, яблони.",
   "choices":[
     {"text":"Купить","traits":{"diligence":2},"effects":{"cash":-900000,"flag":"dacha","happiness":6}},
     {"text":"Не нужна — лишние хлопоты","effects":{}}]},
  {"id":"new_car","title":"Машина","when":{"age":[24,82],"flag_license":1,"wealthAvg":{">":8}},"p":0.008,"cooldown":60,
   "text":"Старая машина сыплется. Пора менять?",
   "choices":[
     {"text":"Новая из салона","traits":{"selfControl":-1},"effects":{"cash":-2600000,"flag":"ownCar","happiness":6}},
     {"text":"Хорошая с пробегом","traits":{"selfControl":1},"effects":{"cash":-1200000,"flag":"ownCar","happiness":4}},
     {"text":"Ездить на том, что есть","effects":{}}]},
  {"id":"renovation","title":"Ремонт","when":{"ownsFlat":true,"wealthAvg":{">":6},"age":[25,85]},"p":0.006,"cooldown":96,
   "text":"Обои отклеиваются, сантехника течёт. Делать ремонт?",
   "choices":[
     {"text":"Капитальный, с бригадой","effects":{"cash":-900000,"happiness":5,"mental":2}},
     {"text":"Косметический своими руками","traits":{"diligence":3},"effects":{"cash":-150000,"happiness":2,"health":-1}},
     {"text":"Потерпеть","effects":{"happiness":-1}}]},
  {"id":"help_kids_flat","title":"Детям на квартиру","when":{"adultKids":{">=":1},"wealthAvg":{">":25},"age":[42,95]},"p":0.006,"cooldown":48,
   "text":"Взрослые дети копят на первый взнос по ипотеке. Помочь?",
   "choices":[
     {"text":"Дать на первый взнос","traits":{"empathy":3},"effects":{"cash":-1500000,"happiness":6,"mental":3}},
     {"text":"Дать в долг","traits":{"selfControl":2},"outcomes":[{"w":2,"text":"Вернули через три года.","effects":{"happiness":2}},{"w":1,"text":"Не вернули. Неловко спрашивать.","effects":{"cash":-1500000,"mental":-3}}]},
     {"text":"Пусть сами — так надёжнее","traits":{"empathy":-2},"effects":{"mental":-1}}]},
  {"id":"invest_flat","title":"Квартира под сдачу","when":{"age":[28,75],"ownsFlat":true,"wealthAvg":{">":60}},"p":0.006,"cooldown":48,
   "text":"Денег хватает на ещё одну квартиру целиком. Купить под сдачу?",
   "choices":[
     {"text":"Купить и сдавать","traits":{"courage":1,"diligence":1},"effects":{"buyRentFlat":true}},
     {"text":"Не связываться с арендаторами","effects":{}}]},
  {"id":"retire_wealth","title":"Хватит работать?","when":{"retired":true,"employed":true,"wealthAvg":{">":20}},"p":0.03,"cooldown":12,
   "text":"Пенсия идёт, накоплений хватит на годы вперёд. Работа уже не в радость.",
   "choices":[
     {"text":"Уволиться и жить в своё удовольствие","traits":{"selfControl":1},"effects":{"retire":true,"mental":5,"happiness":4}},
     {"text":"Ещё поработать","traits":{"diligence":2},"effects":{}}]},
  {"id":"kids_ask_money","title":"Просьба","when":{"adultKids":{">=":1},"wealthAvg":{">":5},"age":[45,100]},"p":0.006,"cooldown":24,
   "text":"Сын или дочь просит помочь деньгами: кредит, ремонт, лечение.",
   "choices":[
     {"text":"Помочь","traits":{"empathy":3},"effects":{"cash":-300000,"happiness":3}},
     {"text":"Отказать","traits":{"empathy":-2},"effects":{"mental":-2}}]},
  {"id":"scam_flat_old","title":"Звонок из «Росреестра»","when":{"age":[65,110],"ownsFlat":true,"year":[2018,2120]},"p":0.002,"cooldown":60,
   "mods":[{"if":{"dementia":true},"mul":4}],
   "text":"«На вашу квартиру оформляют сделку мошенники. Срочно переоформите её на безопасного покупателя».",
   "choices":[
     {"text":"Позвонить детям или в полицию","traits":{"selfControl":3},"effects":{}},
     {"text":"Делать, как говорят","traits":{"conformity":3},"outcomes":[{"w":1,"text":"Квартиру и деньги потеряли. Суд идёт годами.","effects":{"wealthLoss":0.5,"mental":-25}},{"w":1,"text":"В последний момент остановил нотариус.","effects":{"mental":-5}}]}]}
);
