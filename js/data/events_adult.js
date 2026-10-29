// События взрослой экономики (этап 3). Эффекты RL.Adult: buyFlat (secondary | new), startBiz (id), closeBiz, invest {deposit|stocks|usd: доля | withdraw},
// acceptOffer, wealthLoss (доля), bizFine (в средних ЗП).
RL.DATA.events.push(
  {"id":"job_offer","title":"Предложение о работе","trigger":true,"when":{"employed":true},
   "text":"Пишет рекрутер: та же работа в другой компании, зарплата выше. Но испытательный срок и новый коллектив.",
   "choices":[
     {"text":"Перейти","traits":{"courage":2},"effects":{"acceptOffer":true,"social":-2}},
     {"text":"Попросить повышение у своего начальника","traits":{"courage":3,"honesty":1},"outcomes":[{"w":1,"text":"Дали +10%.","effects":{"money":2}},{"w":1,"text":"«Не устраивает — никого не держим».","effects":{"mental":-3}}]},
     {"text":"Остаться","traits":{"conformity":2},"effects":{}}]},
  {"id":"buy_flat","title":"Своя квартира","when":{"canBuyFlat":true,"age":[22,35]},"p":0.04,"cooldown":10,
   "mods":[{"if":{"flag_partner":1},"mul":1.6},{"if":{"livingApart":true},"mul":1.5}],
   "text":"Накоплений хватает на первый взнос. Можно взять ипотеку на 20 лет.",
   "choices":[
     {"text":"Однушка в новостройке (льготы для новостроек)","traits":{"courage":2},"effects":{"buyFlat":"new"}},
     {"text":"Квартира на вторичке","effects":{"buyFlat":"secondary"}},
     {"text":"Копить дальше — ставки слишком высокие","traits":{"selfControl":2},"effects":{}}]},
  {"id":"invest_choice","title":"Куда деть деньги","when":{"wealthAvg":{">":3},"age":[20,35],"year":[2003,2120]},"p":0.015,"cooldown":24,
   "mods":[{"if":{"focus_invest":true},"mul":3}],
   "text":"На карте лежат свободные деньги. Инфляция их потихоньку ест.",
   "choices":[
     {"text":"Вклад в банке","traits":{"selfControl":2},"effects":{"invest":{"deposit":0.7}}},
     {"text":"Брокерский счёт: акции","traits":{"courage":3,"curiosity":2},"effects":{"invest":{"stocks":0.5,"deposit":0.2}}},
     {"text":"Купить доллары","traits":{"conformity":1},"effects":{"invest":{"usd":0.6}}},
     {"text":"Оставить на карте","effects":{}}]},
  {"id":"currency_panic","title":"Курс","when":{"wealthAvg":{">":1.5},"any":[{"year":[2008,2008],"month":[10,11]},{"year":[2014,2014],"month":[11,11]},{"year":[2022,2022],"month":[1,2]}]},"p":0.5,"once":true,
   "text":"Рубль падает, в обменниках очереди, курс меняется каждый час.",
   "choices":[
     {"text":"Скупить доллары сейчас","traits":{"conformity":3,"selfControl":-2},"effects":{"invest":{"usd":0.8}}},
     {"text":"Ничего не делать","traits":{"selfControl":3},"effects":{}}]},
  {"id":"pyramid_scam","title":"Доходность 30% в месяц","when":{"wealthAvg":{">":1},"age":[19,35],"any":[{"year":[2011,2013]},{"year":[2017,2018]},{"year":[2020,2022]}]},"p":0.006,"cooldown":36,
   "text":"Знакомый зовёт в «инвестиционный клуб»: крипта, трейдинг, 30% в месяц, «я уже вывел».",
   "choices":[
     {"text":"Вложить","traits":{"selfControl":-3,"courage":2},"outcomes":[{"w":1,"text":"Два месяца приходили «проценты». Потом сайт закрылся.","effects":{"wealthLoss":0.45,"mental":-8}},{"w":0.25,"text":"[Успел|Успела] вывести с прибылью — повезло.","effects":{"cash":30000}}]},
     {"text":"Отказаться","traits":{"selfControl":3},"effects":{}}]},
  {"id":"start_business","title":"Своё дело","when":{"age":[21,35],"hasBiz":false,"wealthAvg":{">":1}},"p":0.004,"cooldown":24,
   "mods":[{"if":{"trait_courage":{">":20}},"mul":2},{"if":{"employed":false},"mul":1.5},{"if":{"focus_business":true},"mul":3}],
   "text":"Работать на дядю надоело. Можно открыть своё — ИП или самозанятость.",
   "choices":[
     {"text":"Точка на рынке / магазинчик","traits":{"courage":3},"effects":{"startBiz":"stall"}},
     {"text":"Сервис: ремонт, салон, автомойка","traits":{"courage":3},"effects":{"startBiz":"service"}},
     {"text":"Кафе / шаурма","traits":{"courage":4},"effects":{"startBiz":"cafe"}},
     {"text":"Фриланс / самозанятость","if":{"skills":{">":55}},"traits":{"curiosity":2},"effects":{"startBiz":"freelance"}},
     {"text":"Продажи на маркетплейсе","if":{"year":[2018,2120]},"traits":{"courage":2},"effects":{"startBiz":"marketplace"}},
     {"text":"Не рисковать","traits":{"selfControl":2},"effects":{}}]},
  {"id":"biz_inspection","title":"Проверка","trigger":true,"when":{"hasBiz":true},
   "text":"Пришла проверка — налоговая, Роспотребнадзор или пожарные. Нашли нарушения.",
   "choices":[
     {"text":"Заплатить штраф и исправить","traits":{"honesty":3},"effects":{"bizFine":1.5,"mental":-3}},
     {"text":"«Решить вопрос» на месте","traits":{"honesty":-4},"outcomes":[{"w":3,"text":"Решили. Дешевле штрафа.","effects":{"bizFine":0.6}},{"w":1,"text":"Проверяющий оказался «честным». Штраф вдвое и протокол о попытке дачи взятки.","effects":{"bizFine":3,"mental":-8}}]},
     {"text":"Судиться","traits":{"courage":3},"outcomes":[{"w":1,"text":"Через полгода суд отменил штраф.","effects":{"mental":-2}},{"w":1,"text":"[Проиграл|Проиграла]. Штраф плюс юристы.","effects":{"bizFine":2.5,"mental":-5}}]},
     {"text":"Позвонить знакомому «наверху»","if":{"tieOfficial":true},"traits":{"honesty":-2},"effects":{"useTie":"official","noTie":{"bizFine":1.8}}}]},
  {"id":"biz_close_choice","title":"Бизнес не тянет","when":{"hasBiz":true,"money":{"<":30}},"p":0.05,"cooldown":8,
   "text":"Третий месяц в минус. Может, хватит?",
   "choices":[
     {"text":"Закрыть и вернуться в найм","traits":{"selfControl":2},"effects":{"closeBiz":true}},
     {"text":"Держаться","traits":{"diligence":3,"courage":2},"effects":{"mental":-3}}]},
  {"id":"crisis_layoff","title":"Сокращение","when":{"employed":true,"crisis":true},"p":0.03,"cooldown":12,
   "text":"В компании «оптимизация»: зарплаты режут на 20%, части отдела предлагают уйти «по соглашению сторон».",
   "choices":[
     {"text":"Согласиться на урезанную зарплату","traits":{"conformity":3},"effects":{"money":-4,"mental":-3}},
     {"text":"Уйти с компенсацией","traits":{"courage":2},"effects":{"quitJob":true,"cash":60000}}]},
  {"id":"rotation_work","title":"Вахта","when":{"age":[20,35],"sex":"m","capitalLoc":false,"not":{"inArmy":true}},"p":0.004,"cooldown":24,
   "mods":[{"if":{"employed":false},"mul":2},{"if":{"poor":true},"mul":1.5},{"if":{"ownDebt":true},"mul":1.5}],
   "text":"Зовут на вахту на Север: месяц через месяц, зарплата втрое выше, мороз и общага в балке.",
   "choices":[
     {"text":"Поехать","traits":{"diligence":3,"courage":2},"effects":{"cash":400000,"health":-4,"social":-4,"habit":{"alcohol":1}}},
     {"text":"Отказаться","effects":{}}]},
  {"id":"crypto_bubble","title":"Биткоин","when":{"age":[18,35],"any":[{"year":[2017,2017],"month":[9,11]},{"year":[2021,2021],"month":[2,10]}]},"p":0.06,"once":true,
   "text":"Все вокруг говорят о биткоине: «он будет стоить миллион долларов».",
   "choices":[
     {"text":"Купить на все свободные","traits":{"courage":3,"selfControl":-3},"outcomes":[{"w":1,"text":"Через год стоимость упала в 3 раза.","effects":{"wealthLoss":0.3,"mental":-5}},{"w":0.6,"text":"[Продал|Продала] вовремя. Плюс.","effects":{"cash":80000,"happiness":4}}]},
     {"text":"Купить немного","traits":{"curiosity":2},"effects":{}},
     {"text":"Пройти мимо","traits":{"selfControl":2},"effects":{}}]},
  {"id":"car_loan","title":"Машина","when":{"employed":true,"age":[22,35],"flag_license":1,"not":{"flag_ownCar":1}},"p":0.012,"cooldown":18,
   "text":"Автосалон: «Новая машина — кредит 0% первый год!»",
   "choices":[
     {"text":"Взять в кредит","traits":{"selfControl":-2},"effects":{"cash":-900000,"flag":"ownCar","happiness":6}},
     {"text":"Подержанную за наличные","traits":{"selfControl":2},"effects":{"cash":-450000,"flag":"ownCar","happiness":3}},
     {"text":"Обойтись","effects":{}}]}
);
