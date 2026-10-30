// Середина жизни (35–55) — чтобы она была не пустее юности: потолок, смена отрасли, ремонт в долг, взрослые дети,
// «здоровье уже не то», деньги или семья, статус после сокращения, сэндвич-поколение, кризис среднего возраста.
// Плюс месть врагов разной тяжести (enemy_*, их выбирает js/sim/social.js по сфере и чину врага). Частоты [~].
RL.DATA.events.push(
  // ---------- середина жизни ----------
  {"id":"ml_ceiling","title":"Потолок","major":true,"when":{"age":[38,52],"employed":true},"p":0.004,"once":true,
   "text":"Пятнадцать лет на одной должности. Выше — только «свои» и молодые с MBA. Ты понимаешь: дальше не будет ничего.",
   "choices":[
     {"text":"Смириться: стабильность тоже ценность","traits":{"conformity":2},"effects":{"mental":-3}},
     {"text":"Уйти туда, где можно расти — даже на меньшие деньги","traits":{"courage":3},"outcomes":[
       {"w":2,"text":"Через два года — снова растёшь. Не жалеешь.","effects":{"wageMul":0.9,"happiness":4,"later":{"id":"ml_ceiling_pays","years":[2,4],"p":0.6}}},
       {"w":1,"text":"На новом месте — те же «свои». Только денег меньше.","effects":{"wageMul":0.85,"mental":-4}}]},
     {"text":"Пойти к руководству с ультиматумом","traits":{"courage":2,"conformity":-1},"outcomes":[
       {"w":1,"text":"Повысили. Оказывается, надо было просто спросить.","effects":{"wageMul":1.15}},
       {"w":2,"text":"«Незаменимых нет». Отношения испорчены.","effects":{"mental":-4}}]}]},
  {"id":"ml_ceiling_pays","title":"Не зря","trigger":true,"when":{"employed":true},
   "text":"Новое место окупилось: должность, о которой на старой работе нельзя было и мечтать.",
   "effects":{"wageMul":1.25,"happiness":4}},
  {"id":"ml_switch_industry","title":"Сменить профессию","major":true,"when":{"age":[35,50],"employed":true},"p":0.003,"once":true,
   "text":"Отрасль умирает: сокращения, зарплаты не растут. Можно переучиться — в IT, на медицинского, на электрика. С нуля в сорок.",
   "choices":[
     {"text":"Переучиться","traits":{"courage":3,"diligence":2},"outcomes":[
       {"w":2,"text":"Год курсов по вечерам — и новая работа. Начинать с низов в сорок — унизительно, но работает.","effects":{"cash":-120000,"skills":5,"wageMul":0.95,"mental":-2}},
       {"w":1,"text":"Курсы [прошёл|прошла], а без опыта никуда не берут.","effects":{"cash":-120000,"mental":-6}}]},
     {"text":"Досидеть до конца","traits":{"conformity":2},"effects":{"mental":-2}}]},
  {"id":"ml_renovation_debt","title":"Ремонт","major":true,"when":{"age":[33,58],"ownsFlat":true},"p":0.004,"cooldown":120,
   "text":"Квартира разваливается: трубы, проводка, окна. Ремонт — полтора миллиона. Можно в кредит, можно частями годами.",
   "choices":[
     {"text":"Всё сразу в кредит","traits":{"selfControl":-1},"effects":{"cash":-1500000,"happiness":5}},
     {"text":"По комнате в год","traits":{"selfControl":2},"effects":{"cash":-300000,"mental":-2}},
     {"text":"Жить как есть","effects":{"mental":-3,"health":-1}}]},
  {"id":"ml_adult_kid","title":"Взрослый ребёнок просит","major":true,"when":{"age":[45,70],"adultKids":true},"p":0.006,"cooldown":48,
   "text":"Взрослый сын (или дочь) просит денег на первый взнос по ипотеке. Это почти все твои накопления «на старость».",
   "choices":[
     {"text":"Отдать","traits":{"empathy":3},"effects":{"cash":-1000000,"happiness":3,"later":{"id":"ml_kid_grateful","years":[5,15],"p":0.5}}},
     {"text":"Дать половину","traits":{"selfControl":1},"effects":{"cash":-500000}},
     {"text":"Отказать: «Мне тоже надо жить»","traits":{"empathy":-2,"selfControl":2},"effects":{"mental":-2,"relation":{"all":-3}}}]},
  {"id":"ml_kid_grateful","title":"Ребёнок помнит","trigger":true,
   "text":"Ребёнок, которому ты отдал[|а] накопления на квартиру, теперь платит за твоих врачей и зовёт на лето к себе.",
   "effects":{"cash":200000,"happiness":6}},
  {"id":"ml_health_not_same","title":"Уже не то","major":true,"when":{"age":[40,58]},"p":0.006,"once":true,
   "text":"Давление по утрам, колени на лестнице, одышка. Врач: «Возраст. Либо меняете образ жизни, либо таблетки до конца жизни».",
   "choices":[
     {"text":"Поменять: спорт, еда, сон","traits":{"selfControl":3,"diligence":2},"outcomes":[
       {"w":2,"text":"Через год — минус десять килограммов и нормальное давление.","effects":{"health":6,"mental":3}},
       {"w":1,"text":"Продержал[ся|ась] три месяца.","effects":{"health":1}}]},
     {"text":"Таблетки — и жить как жил[|а]","traits":{"selfControl":-1},"effects":{"cash":-20000,"health":-1}},
     {"text":"Ничего не менять","traits":{"courage":1,"selfControl":-2},"effects":{"health":-3}}]},
  {"id":"ml_money_or_family","title":"Деньги или время","major":true,"when":{"age":[33,52],"employed":true,"hasPartner":true},"p":0.004,"once":true,
   "text":"Предлагают должность в полтора раза дороже: командировки три недели в месяц, телефон 24/7.",
   "choices":[
     {"text":"Согласиться","traits":{"diligence":2,"empathy":-1},"effects":{"wageMul":1.4,"spouseRelation":-12,"kidWarmth":-8,"mental":-2}},
     {"text":"Отказаться ради семьи","traits":{"empathy":2},"effects":{"spouseRelation":6,"kidWarmth":5}}]},
  {"id":"ml_layoff_status","title":"После сокращения","major":true,"when":{"age":[40,58],"employed":false,"pensioner":false},"p":0.012,"cooldown":36,
   "text":"Был[|а] начальником отдела — теперь предлагают кладовщика, охранника, «менеджера по продажам на процентах».",
   "choices":[
     {"text":"Взять что есть","traits":{"conformity":2},"effects":{"mental":-5,"social":-3,"downJob":true}},
     {"text":"Ждать работу своего уровня","traits":{"courage":1},"outcomes":[
       {"w":1,"text":"Через полгода нашлось — по знакомству.","effects":{"mental":-2}},
       {"w":2,"text":"Год поисков. Накопления тают, уверенность — тоже.","effects":{"cash":-200000,"mental":-8}}]}]},
  {"id":"ml_sandwich","title":"Между двух поколений","major":true,"when":{"age":[40,60],"parentAlive":true,"kidsN":{">=":1}},"p":0.005,"once":true,
   "text":"Родителям — лекарства и сиделка, детям — репетиторы и вуз. Тебе — ничего: ни отпуска, ни себя.",
   "choices":[
     {"text":"Тянуть всех","traits":{"empathy":3,"diligence":2},"effects":{"cash":-150000,"mental":-6,"health":-2,"relation":{"all":5}}},
     {"text":"Выбрать, кому помогать","traits":{"selfControl":2},"effects":{"cash":-60000,"mental":-3,"relation":{"all":-3}}}]},
  {"id":"ml_midlife_crisis","title":"Сорок пять","major":true,"when":{"age":[42,52]},"p":0.004,"once":true,
   "text":"Сорок пять. Половина жизни прошла. Хочется всё бросить: мотоцикл, горы, новая любовь, новая жизнь.",
   "choices":[
     {"text":"Купить мотоцикл и уехать на Байкал","traits":{"courage":2,"selfControl":-1},"effects":{"cash":-500000,"happiness":7,"mental":4}},
     {"text":"Завести роман","if":{"hasPartner":true},"traits":{"honesty":-3,"selfControl":-2},"effects":{"happiness":4,"later":{"id":"ch_affair_out","years":[0.5,3],"p":0.6}}},
     {"text":"Пойти к психологу","if":{"year":[2005,2120]},"traits":{"selfControl":2},"effects":{"cash":-30000,"mental":5}},
     {"text":"Перетерпеть","traits":{"conformity":2},"effects":{"mental":-3}}]},
  {"id":"ml_peer_died","title":"Ровесник","when":{"age":[40,58]},"p":0.006,"once":true,
   "text":"Умер одноклассник — инфаркт в сорок семь. На поминках все смотрят друг на друга и считают.",
   "choices":[
     {"text":"Сходить к кардиологу","traits":{"selfControl":2},"effects":{"cash":-6000,"health":2}},
     {"text":"Выпить за него — и жить дальше","traits":{"selfControl":-1},"effects":{"mental":-3}}]},
  {"id":"ml_car_status","title":"Машина «не хуже, чем у людей»","major":true,"when":{"age":[30,55],"employed":true,"year":[2005,2120]},"p":0.004,"cooldown":120,
   "text":"Коллеги, соседи, родня — у всех машины новее. Автосалон: «Кредит на пять лет, первый взнос — ноль».",
   "choices":[
     {"text":"Взять в кредит","traits":{"selfControl":-2},"effects":{"cash":-1800000,"flag":"ownCar","happiness":4}},
     {"text":"Ездить на старой","traits":{"selfControl":2},"effects":{"mental":-1}}]},
  {"id":"ml_anniversary","title":"Годовщина","when":{"age":[38,65],"married":true,"partnerRelation":{"<":55}},"p":0.006,"cooldown":60,
   "text":"Двадцать лет брака. Ты вспоминаешь об этом вечером — по сообщению от [тёщи|свекрови].",
   "choices":[
     {"text":"Срочно устроить праздник","traits":{"empathy":2},"effects":{"cash":-20000,"spouseRelation":6}},
     {"text":"Сделать вид, что так и было задумано","traits":{"honesty":-1},"effects":{"spouseRelation":-6}}]},

  // ---------- месть врагов (разной тяжести) ----------
  {"id":"enemy_refuse_service","title":"«Мест нет»","trigger":true,
   "text":"В больнице, где работает {n}, для тебя вдруг «нет мест» и «аппарат сломан». Едешь в другой город.",
   "effects":{"cash":-25000,"health":-2,"mental":-3}},
  {"id":"enemy_kid_school","title":"Ребёнку мстят","trigger":true,"when":{"kidsN":{">=":1}},
   "text":"У ребёнка в школе вдруг «проблемы с поведением» и тройки по всем предметам. {n} в управлении образования.",
   "effects":{"mental":-4,"kidWarmth":-2}},
  {"id":"enemy_deal","title":"Сорванная сделка","trigger":true,
   "text":"Сделка, которую ты готовил[|а] полгода, сорвалась в последний день: партнёру «позвонили». Старое не забыто: {n}.",
   "effects":{"cash":-150000,"mental":-5}},
  {"id":"enemy_job_refuse","title":"Чёрный список","trigger":true,
   "text":"Тебе отказывают на собеседованиях, где ещё вчера звали. В отрасли все друг друга знают — {n} тоже.",
   "effects":{"mental":-5,"social":-3}},
  {"id":"enemy_tax","title":"Доначисления","trigger":true,
   "text":"Налоговая нашла «ошибки» в вычетах за три года. Подсказал {who}.",
   "effects":{"cash":-90000,"mental":-4}},
  {"id":"enemy_neighbor","title":"Жалобы","trigger":true,
   "text":"Участковый, управляющая компания, пожарные — по жалобам «соседей». Ты знаешь, кто их пишет: {n}.",
   "effects":{"mental":-3,"cash":-10000}},
  {"id":"enemy_setup","title":"Подстава","trigger":true,"major":true,
   "text":"При «плановом» досмотре в твоей машине нашли то, чего там не было. Понятые — знакомые {n}.",
   "choices":[
     {"text":"Лучший адвокат, какого найдёшь","traits":{"courage":2},"outcomes":[
       {"w":2,"text":"Адвокат развалил дело: понятые путались в показаниях.","effects":{"cash":-300000,"mental":-8}},
       {"w":1,"text":"Не помогло.","effects":{"cash":-300000,"case":"drugs228"}}]},
     {"text":"Позвонить своим","if":{"tieLaw":true},"traits":{"honesty":-1},"effects":{"useTie":"law","noTie":{"case":"drugs228"}}},
     {"text":"Пойти на мировую с врагом","traits":{"conformity":2},"effects":{"cash":-500000,"enemyDrop":true,"mental":-6}}]},
  {"id":"enemy_court","title":"Суд «на контроле»","trigger":true,
   "text":"Простое гражданское дело — спор с банком, раздел имущества — вдруг проигрывается по всем пунктам. Судья «советовался» с {n}.",
   "effects":{"cash":-120000,"mental":-5}}
);
