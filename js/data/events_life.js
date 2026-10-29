// Взрослая жизнь: решения с отложенными последствиями (цепочки через флаги). Сначала — выбор, через месяцы или годы — расплата или награда.
// Эффекты RL.Assets: kidBoost, fakeDiploma, diplomaCheck, smallBank (доля накоплений), bankRefund, promoteMove, licenseC.
// Реалии: поручительство и коллекторы, отзыв лицензий банков в 2013–2019 (страховка АСВ до 1,4 млн), «купленные» дипломы 90-х и 2000-х,
// охотничий билет, страховка квартиры, ОСАГО, партийный билет. Частоты — игровые оценки [~].
RL.DATA.events.push(
  // поручительство
  {"id":"guarantor_ask","title":"Поручитель","when":{"age":[22,65],"employed":true,"year":[2000,2120],"not":{"flag_guarantor":1}},"p":0.003,"cooldown":60,
   "text":"Друг берёт кредит на машину, банк требует поручителя: «Да я сам всё заплачу, это формальность!»",
   "choices":[
     {"text":"Подписать","traits":{"empathy":2,"selfControl":-1},"effects":{"flag":"guarantor","social":2}},
     {"text":"Отказать","traits":{"selfControl":2},"effects":{"social":-2}}]},
  {"id":"guarantor_default","title":"Звонок из банка","when":{"flag_guarantor":1},"p":0.012,"once":true,
   "text":"Друг перестал платить и пропал. Банк требует долг с поручителя.",
   "choices":[
     {"text":"Заплатить, что осталось","traits":{"honesty":2},"effects":{"cash":-350000,"mental":-6,"unflag":"guarantor"}},
     {"text":"Судиться и тянуть время","traits":{"courage":2},"outcomes":[{"w":1,"text":"Суд встал на сторону банка: приставы списывают часть зарплаты.","effects":{"cash":-420000,"mental":-8,"unflag":"guarantor"}},{"w":0.5,"text":"Друг объявился и закрыл долг сам. Неловко, но спасибо.","effects":{"unflag":"guarantor"}}]}]},
  // одолжить денег
  {"id":"lend_friend","title":"Одолжить","when":{"age":[20,75],"wealthAvg":{">":1}},"p":0.005,"cooldown":36,
   "text":"Старый знакомый просит в долг до зарплаты — 50 тысяч. «Через месяц верну, честно».",
   "choices":[
     {"text":"Дать","traits":{"empathy":2},"effects":{"cash":-50000,"flag":"lent"}},
     {"text":"Отказать","traits":{"selfControl":1},"effects":{"social":-1}}]},
  {"id":"lend_return","when":{"flag_lent":1},"p":0.08,"once":false,"cooldown":1,
   "outcomes":[{"w":3,"text":"Знакомый вернул долг — с шоколадкой сверху.","effects":{"cash":50000,"unflag":"lent","social":1}},
     {"w":2,"text":"Знакомый перестал отвечать на звонки. Пятьдесят тысяч — урок.","effects":{"unflag":"lent","mental":-3}}]},
  // купленный диплом
  {"id":"buy_diploma","title":"Диплом за деньги","when":{"age":[20,45],"higherEdu":false,"year":[1993,2012]},"p":0.002,"once":true,
   "text":"В переходе метро объявление: «Дипломы любых вузов. С занесением в реестр». Без «вышки» на хорошую должность не берут.",
   "choices":[
     {"text":"Купить диплом экономиста","traits":{"honesty":-5},"effects":{"cash":-40000,"fakeDiploma":"econ"}},
     {"text":"Не связываться","traits":{"honesty":3},"effects":{}}]},
  {"id":"diploma_check","title":"Проверка дипломов","when":{"flag_fakeDiploma":1,"year":[2010,2120]},"p":0.006,"once":true,
   "text":"Отдел кадров проверяет дипломы по федеральному реестру. Твоего вуза в нём нет.",
   "outcomes":[{"w":2,"text":"Тебя уволили. По 327-й статье дела не завели — повезло.","effects":{"diplomaCheck":true,"mental":-10}},
     {"w":1,"text":"Уволили и возбудили дело за использование поддельного документа: штраф.","effects":{"diplomaCheck":true,"cash":-80000,"mental":-12}}]},
  // маленький банк с высоким процентом
  {"id":"small_bank","title":"Вклад под высокий процент","when":{"wealthAvg":{">":4},"year":[2009,2019]},"p":0.004,"once":true,
   "text":"Маленький региональный банк даёт по вкладам на 4% больше, чем Сбер. Реклама в каждом автобусе.",
   "choices":[
     {"text":"Положить почти всё","traits":{"courage":2,"selfControl":-2},"effects":{"smallBank":0.9}},
     {"text":"Положить не больше страхуемых 1,4 млн","traits":{"selfControl":3},"effects":{"smallBank":0.35}},
     {"text":"Оставить в крупном банке","effects":{}}]},
  {"id":"bank_revoked","title":"ЦБ отозвал лицензию","when":{"flag_smallBank":1,"year":[2012,2120]},"p":0.03,"once":true,
   "text":"Новости: у твоего банка отозвана лицензия. Очередь в отделение до утра.",
   "outcomes":[{"w":1,"text":"АСВ выплачивает страховку по вкладам — но не больше 1,4 млн.","effects":{"bankRefund":true,"mental":-6}}]},
  // ДТП во дворе
  {"id":"scratch_car","title":"Во дворе","when":{"flag_license":1,"age":[18,85]},"p":0.004,"cooldown":48,
   "text":"Парковался задом и задел чужую машину. Царапина на бампере, свидетелей вроде нет.",
   "choices":[
     {"text":"Оставить записку с телефоном","traits":{"honesty":4},"effects":{"cash":-15000,"social":1}},
     {"text":"Уехать","traits":{"honesty":-4},"outcomes":[{"w":3,"text":"Никто не заметил.","effects":{}},{"w":1,"text":"Камера на подъезде всё записала: оставление места ДТП — лишение прав на год.","effects":{"unflag":"license","cash":-15000,"mental":-5}}]}]},
  {"id":"osago","title":"Страховка","when":{"flag_ownCar":1,"year":[2003,2120]},"p":0.004,"cooldown":60,
   "text":"Подходит срок ОСАГО. Можно сэкономить и ездить без полиса.",
   "choices":[
     {"text":"Оформить полис","traits":{"conformity":2},"effects":{"cash":-9000}},
     {"text":"Ездить без страховки","traits":{"conformity":-2},"effects":{"flag":"noOsago"}}]},
  {"id":"crash_no_osago","title":"ДТП","when":{"flag_noOsago":1},"p":0.02,"once":true,
   "text":"Въехал[|а] в машину на светофоре. Полиса нет.",
   "outcomes":[{"w":1,"text":"Ремонт чужой иномарки — из своего кармана.","effects":{"cash":-280000,"mental":-6,"unflag":"noOsago"}}]},
  // страховка квартиры и потоп
  {"id":"flat_insurance","title":"Страховка квартиры","when":{"ownsFlat":true,"year":[2005,2120],"not":{"flag_flatInsured":1}},"p":0.003,"cooldown":60,
   "text":"Банк предлагает застраховать квартиру и ответственность перед соседями: две тысячи в год.",
   "choices":[{"text":"Застраховать","traits":{"selfControl":2},"effects":{"cash":-2000,"flag":"flatInsured"}},{"text":"Не нужно","effects":{}}]},
  {"id":"flood_downstairs","title":"Потоп","when":{"ownsFlat":true},"p":0.0015,"cooldown":120,
   "text":"Пока ты был[|а] на работе, лопнул шланг стиральной машины. Залиты две квартиры снизу.",
   "outcomes":[{"w":1,"mods":[{"if":{"flag_flatInsured":1},"mul":0.01}],"text":"Соседи насчитали ремонт на 300 тысяч. Платишь сам[|а].","effects":{"cash":-300000,"mental":-6}},
     {"w":1,"mods":[{"if":{"not":{"flag_flatInsured":1}},"mul":0.01}],"text":"Страховая всё оплатила. Страховка окупилась в сто раз.","effects":{"mental":-1}}]},
  // работа
  {"id":"promotion_move","title":"Повышение с переездом","when":{"employed":true,"jobLevel":{">=":1},"age":[24,50],"capitalLoc":false},"p":0.002,"once":true,
   "text":"Предлагают должность выше в Москве: зарплата в полтора раза больше, но придётся переезжать.",
   "choices":[
     {"text":"Переехать","traits":{"courage":3},"effects":{"promoteMove":"msk","social":-6}},
     {"text":"Остаться дома","traits":{"conformity":2},"effects":{}}]},
  {"id":"corporate","title":"Корпоратив","when":{"employed":true,"age":[20,60],"month":[11,11]},"p":0.25,"cooldown":10,
   "text":"Новогодний корпоратив: ресторан, ведущий, конкурсы, бар без ограничений.",
   "choices":[
     {"text":"Отрываться до утра","traits":{"sociability":2,"selfControl":-2},"outcomes":[{"w":3,"text":"Лучший корпоратив за всё время.","effects":{"social":3,"happiness":3}},{"w":1,"text":"Фото с корпоратива разошлись по всему офису. Неловко.","effects":{"social":-3,"mental":-3}},{"w":0.5,"mods":[{"if":{"hasPartner":true},"mul":2}],"text":"Поцелуй с коллегой у гардероба. Теперь это секрет.","effects":{"flag":"officeRomance"}}]},
     {"text":"Посидеть пару часов и домой","traits":{"selfControl":2},"effects":{"social":1}},
     {"text":"Не ходить","traits":{"sociability":-2},"effects":{"social":-2}}]},
  {"id":"office_romance_out","title":"Тайна раскрылась","when":{"flag_officeRomance":1,"hasPartner":true},"p":0.03,"once":true,
   "text":"Вскрылась переписка с коллегой.",
   "outcomes":[{"w":1,"text":"Скандал, слёзы, ночёвки у друзей. Отношения дали трещину.","effects":{"spouseRelation":-25,"mental":-8,"unflag":"officeRomance"}}]},
  {"id":"license_c","title":"Категория C","when":{"prof":["driver","courier","laborer"],"flag_license":1,"not":{"flag_licenseC":1}},"p":0.006,"once":true,
   "text":"Можно выучиться на грузовую категорию: два месяца автошколы — и путь в дальнобой и на вахту.",
   "choices":[{"text":"Учиться","traits":{"diligence":2},"effects":{"cash":-35000,"licenseC":true}},{"text":"Не надо","effects":{}}]},
  // охотничий билет
  {"id":"hunt_license","title":"Охотничий билет","when":{"sex":"m","age":[18,70],"not":{"flag_huntLicense":1},"any":[{"village":true},{"smallTown":true},{"siberiaFE":true}]},"p":0.003,"once":true,
   "text":"Друзья зовут на охоту. Нужен охотничий билет, медкомиссия и разрешение на ружьё.",
   "choices":[{"text":"Оформить всё по закону","traits":{"conformity":2},"effects":{"cash":-30000,"flag":"huntLicense"}},{"text":"Не моё","effects":{}}]},
  // партия
  {"id":"party_join","title":"Партийный билет","when":{"age":[20,65],"any":[{"prof":["official","teacher","doctor","police","manager"]},{"focus_publicwork":true}],"year":[2002,2120],"not":{"flag_partyMember":1}},"p":0.003,"once":true,
   "text":"На работе намекают: вступишь в партию власти — пойдёшь в кадровый резерв.",
   "choices":[
     {"text":"Вступить","traits":{"conformity":4},"effects":{"flag":"partyMember","social":2}},
     {"text":"Вежливо отказаться","traits":{"conformity":-2},"effects":{}}]},
  // дети
  {"id":"kid_phone","title":"Новый телефон","when":{"teenKid":true,"year":[2010,2120]},"p":0.01,"cooldown":36,
   "text":"Ребёнок просит айфон: «У всех в классе есть, надо мной смеются».",
   "choices":[
     {"text":"Купить","traits":{"empathy":2},"effects":{"cash":-80000,"kidBoost":0.1,"happiness":1}},
     {"text":"Купить попроще","traits":{"selfControl":2},"effects":{"cash":-20000}},
     {"text":"Отказать: «Заработаешь — купишь»","traits":{"selfControl":3},"effects":{"kidBoost":-0.05}}]},
  {"id":"kid_smokes","title":"Пахнет табаком","when":{"teenKid":true},"p":0.006,"cooldown":48,
   "text":"Из рюкзака ребёнка выпала пачка сигарет.",
   "choices":[
     {"text":"Спокойно поговорить","traits":{"empathy":3},"effects":{"kidBoost":0.15}},
     {"text":"Наказать и отобрать телефон","traits":{"aggression":2},"effects":{"kidBoost":-0.1,"mental":-1}},
     {"text":"Сделать вид, что не заметил[|а]","effects":{"kidBoost":-0.15}}]},
  {"id":"kid_tutors","title":"Подготовка к ЕГЭ","when":{"teenKid":true,"year":[2009,2120]},"p":0.008,"cooldown":36,
   "text":"Ребёнку через год ЕГЭ. Репетиторы — 30 тысяч в месяц.",
   "choices":[
     {"text":"Нанять репетиторов","traits":{"diligence":2},"effects":{"cash":-250000,"kidBoost":0.4}},
     {"text":"Заниматься с ним самому","traits":{"empathy":2},"effects":{"kidBoost":0.2,"mental":-2}},
     {"text":"Пусть сам","effects":{}}]},
  {"id":"kid_paid_vuz","title":"Платное отделение","when":{"teenKid":true,"wealthAvg":{">":3}},"p":0.006,"cooldown":60,
   "text":"Ребёнок не добирает баллов на бюджет. Платное — двести тысяч в год.",
   "choices":[
     {"text":"Платить за учёбу","traits":{"empathy":2},"effects":{"cash":-800000,"kidBoost":0.5}},
     {"text":"Пусть идёт в колледж","effects":{"kidBoost":0.1}}]},
  // соседи и быт
  {"id":"noisy_neighbor","title":"Сосед","when":{"age":[18,95]},"p":0.004,"cooldown":60,
   "text":"Сосед сверху каждую ночь включает музыку и ругается с женой.",
   "choices":[
     {"text":"Поговорить","traits":{"courage":2},"outcomes":[{"w":2,"text":"Договорились — стало тише.","effects":{"mental":2}},{"w":1,"text":"Нахамил в ответ. Война продолжается.","effects":{"mental":-3}}]},
     {"text":"Вызвать участкового","traits":{"conformity":2},"outcomes":[{"w":1,"text":"Участковый провёл беседу. На неделю помогло.","effects":{"mental":1}}]},
     {"text":"Терпеть","traits":{"selfControl":2},"effects":{"mental":-3,"health":-1}}]},
  {"id":"found_wallet","title":"Кошелёк","when":{"age":[16,95]},"p":0.002,"cooldown":120,
   "text":"На лавочке забыли кошелёк: 15 тысяч и паспорт.",
   "choices":[
     {"text":"Найти владельца по паспорту","traits":{"honesty":4},"outcomes":[{"w":2,"text":"Владелец счастлив и отблагодарил.","effects":{"cash":3000,"mental":3}},{"w":1,"text":"Вернул[|а] — даже спасибо не сказали.","effects":{"mental":1}}]},
     {"text":"Деньги забрать, паспорт подкинуть в полицию","traits":{"honesty":-4},"effects":{"cash":15000}}]},
  {"id":"flu_shot","title":"Прививка от гриппа","when":{"age":[18,110],"month":[8,10]},"p":0.04,"cooldown":12,
   "text":"На работе или в поликлинике бесплатно прививают от гриппа.",
   "choices":[{"text":"Привиться","traits":{"selfControl":1},"effects":{"flag":"fluShot"}},{"text":"Обойдусь","effects":{"unflag":"fluShot"}}]},
  {"id":"flu_season","title":"Грипп","when":{"age":[18,110],"month":[0,2]},"p":0.03,"cooldown":12,
   "outcomes":[{"w":1,"mods":[{"if":{"flag_fluShot":1},"mul":0.3}],"text":"Грипп: неделя с температурой под сорок.","effects":{"health":-4,"mental":-2}},
     {"w":1.5,"text":"Эпидемия гриппа обошла стороной.","effects":{}}]},
  {"id":"mlm","title":"Бизнес-возможность","when":{"age":[20,60]},"p":0.002,"once":true,
   "text":"Подруга зовёт в «бизнес»: продавать косметику и приводить людей. «Через год — машина от компании!»",
   "choices":[
     {"text":"Вложиться в стартовый набор","traits":{"selfControl":-2},"outcomes":[{"w":4,"text":"Склад коробок дома и испорченные отношения с друзьями.","effects":{"cash":-60000,"social":-3}},{"w":1,"text":"Немного заработал[|а] на знакомых и вовремя вышел[|а].","effects":{"cash":20000}}]},
     {"text":"Отказаться","traits":{"selfControl":2},"effects":{}}]}
);
