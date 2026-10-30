// Женская доля — по плотности не беднее мужской (армия, мобилизация, бутылка). Работа и материнство, давление окружения,
// безопасность, алименты, «вторая смена» дома, развод с детьми, возраст 35–45. Все события — только для героини (sex: f).
// Эффекты: wageMul, jobLoss, wantChild, spouseRelation, kidWarmth; «вторая смена» копится в js/sim/hardship.js (f_burnout_home).
// Реалии и частоты [~]: дискриминация при найме (вопросы о детях на собеседовании — по опросам hh.ru, у ~половины женщин);
// «штраф материнства» −10–20% (НИУ ВШЭ); алименты — около 40% должников платят нерегулярно (ФССП); ЭКО по ОМС с 2013 г.;
// домашнее насилие — по оценкам, до трети женщин сталкивались (опросы, «Насилию.нет») [~]; кризисные центры — в крупных городах.
RL.DATA.events.push(
  // ---------- работа и дети ----------
  {"id":"f_hire_man","title":"«Мы возьмём мужчину»","when":{"sex":"f","age":[22,45],"employed":false},"p":0.012,"cooldown":24,
   "text":"Финал собеседования: «Вы нам подходите, но… мы возьмём мужчину. Сами понимаете — декреты, больничные».",
   "effects":{"mental":-3}},
  {"id":"f_interview_kids","title":"«А детей планируете?»","major":true,"when":{"sex":"f","age":[22,38]},"p":0.006,"cooldown":36,
   "text":"На собеседовании спрашивают: замужем ли, есть ли дети, «не планируете ли в ближайшие годы».",
   "choices":[
     {"text":"Соврать: «Не планирую»","traits":{"honesty":-1},"effects":{"mental":-1}},
     {"text":"Ответить честно","traits":{"honesty":2},"outcomes":[
       {"w":1,"text":"Взяли. Повезло с начальником.","effects":{}},
       {"w":2,"text":"«Мы вам перезвоним». Не перезвонили.","effects":{"mental":-3}}]},
     {"text":"«Это незаконный вопрос»","traits":{"courage":3},"effects":{"mental":1,"social":-1}}]},
  {"id":"f_sick_kid","title":"Опять больничный","major":true,"when":{"sex":"f","age":[22,45],"employed":true,"kidsN":{">=":1}},"p":0.008,"cooldown":18,
   "text":"Третий больничный по уходу за ребёнком за зиму. Начальник: «Вы вообще работать собираетесь?»",
   "choices":[
     {"text":"Оставлять ребёнка с кем придётся","traits":{"empathy":-1,"diligence":1},"effects":{"kidWarmth":-4,"mental":-2}},
     {"text":"Сидеть с ребёнком сколько нужно","traits":{"empathy":2},"outcomes":[
       {"w":2,"text":"Премии лишили, но место осталось.","effects":{"wageMul":0.95,"kidWarmth":3}},
       {"w":1,"text":"«По соглашению сторон».","effects":{"jobLoss":true,"mental":-5,"kidWarmth":3}}]}]},
  {"id":"f_kindergarten","title":"Нет места в садике","when":{"sex":"f","age":[21,40],"babyAtHome":true},"p":0.01,"once":true,
   "text":"Очередь в садик — на два года вперёд. Частный — половина зарплаты. Выйти на работу некуда.",
   "choices":[
     {"text":"Частный садик","effects":{"cash":-180000}},
     {"text":"Сидеть дома дальше","traits":{"conformity":1},"effects":{"wageMul":0.9,"mental":-3}}]},
  {"id":"f_glass_ceiling","title":"Потолок","when":{"sex":"f","age":[32,52],"employed":true},"p":0.004,"cooldown":60,
   "text":"Место начальника отдела снова отдали мужчине — младше и с меньшим стажем. «Ему семью кормить».",
   "effects":{"mental":-4,"happiness":-2}},
  {"id":"f_ageism","title":"После сорока пяти","when":{"sex":"f","age":[45,58],"employed":false},"p":0.012,"cooldown":24,
   "text":"Резюме уходят в пустоту. На одном собеседовании прямо говорят: «Нам нужна девушка помоложе — для клиентов».",
   "effects":{"mental":-4}},
  // ---------- давление окружения ----------
  {"id":"f_husband_provide","title":"«Сиди дома»","major":true,"when":{"sex":"f","age":[22,45],"married":true,"employed":true},"p":0.004,"once":true,
   "text":"Муж: «Зачем тебе эта работа за копейки? Я обеспечу. Сиди с детьми, дома должен быть порядок».",
   "choices":[
     {"text":"Уйти с работы","traits":{"conformity":3},"effects":{"jobLoss":true,"spouseRelation":6,"later":{"id":"f_dependent","years":[3,15],"p":0.35}}},
     {"text":"Продолжать работать","traits":{"courage":2,"conformity":-2},"effects":{"spouseRelation":-6}}]},
  {"id":"f_dependent","title":"Без своих денег","trigger":true,"major":true,
   "text":"Годы без работы — и теперь каждая покупка «с разрешения». Если уйти — уходить не с чем.",
   "choices":[
     {"text":"Выйти на работу хоть куда","traits":{"courage":2},"effects":{"mental":2,"spouseRelation":-6}},
     {"text":"Терпеть","traits":{"conformity":2},"effects":{"mental":-6}}]},
  {"id":"f_mother_in_law","title":"Свекровь","when":{"sex":"f","age":[20,50],"married":true},"p":0.004,"cooldown":48,
   "text":"Свекровь «помогает»: учит варить, растить детей, переставляет вещи и звонит мужу каждый вечер.",
   "choices":[
     {"text":"Терпеть ради мира","traits":{"conformity":2},"effects":{"mental":-3}},
     {"text":"Поставить границы","traits":{"courage":2},"outcomes":[
       {"w":1,"text":"Муж поддержал. Стало тише.","effects":{"spouseRelation":4}},
       {"w":1,"text":"Муж встал на сторону матери.","effects":{"spouseRelation":-8,"mental":-3}}]}]},
  // ---------- вторая смена ----------
  {"id":"f_who_cooks","title":"Вторая смена","major":true,"when":{"sex":"f","age":[24,55],"married":true,"employed":true,"kidsN":{">=":1}},"p":0.006,"cooldown":36,
   "text":"Работа до шести, потом садик, магазин, ужин, уроки, стирка. Муж «устал» и смотрит телевизор.",
   "choices":[
     {"text":"Поговорить и поделить обязанности","traits":{"courage":2},"outcomes":[
       {"w":1,"text":"Муж взял на себя садик и посуду. Мир не рухнул.","effects":{"spouseRelation":3,"mental":3,"shiftRelief":true}},
       {"w":2,"text":"«Это женское». Ничего не поменялось.","effects":{"spouseRelation":-5,"mental":-2}}]},
     {"text":"Тянуть самой","traits":{"conformity":2,"diligence":1},"effects":{"mental":-3}}]},
  {"id":"f_burnout_home","title":"Не могу больше","trigger":true,"major":true,
   "text":"Годы «второй смены»: утром — работа, вечером — дом и дети, ночью — тревога. Однажды утром ты просто не встаёшь.",
   "choices":[
     {"text":"К психотерапевту","if":{"year":[2005,2120]},"traits":{"courage":1},"effects":{"cash":-30000,"mental":5,"shiftRelief":true}},
     {"text":"Уволиться","traits":{"selfControl":-1},"effects":{"jobLoss":true,"mental":3,"shiftRelief":true}},
     {"text":"Взять себя в руки","traits":{"conformity":2},"effects":{"mental":-6,"health":-3}}]},
  // ---------- безопасность ----------
  {"id":"f_stalker","title":"Преследование","major":true,"when":{"sex":"f","age":[16,55],"hasPartner":false},"p":0.002,"cooldown":120,
   "text":"Бывший (или случайный знакомый) пишет с новых номеров, ждёт у подъезда, приходит на работу.",
   "choices":[
     {"text":"Заявление в полицию","traits":{"courage":2},"outcomes":[
       {"w":2,"text":"«Пока он ничего не сделал — оснований нет».","effects":{"mental":-6}},
       {"w":1,"text":"Участковый поговорил с ним. Отстал.","effects":{"mental":-2}}]},
     {"text":"Сменить номер и переехать","traits":{"selfControl":1},"effects":{"cash":-50000,"mental":-4,"social":-2}},
     {"text":"Попросить друзей-мужчин поговорить","traits":{"sociability":1},"outcomes":[
       {"w":2,"text":"Поговорили. Он исчез.","effects":{"mental":-1}},
       {"w":1,"text":"Стало только хуже: он злится.","effects":{"mental":-6}}]}]},
  {"id":"f_entrance","title":"Подъезд","when":{"sex":"f","age":[14,80]},"p":0.0015,"cooldown":48,
   "text":"Тёмный подъезд, лампочку опять выкрутили. В лифт вместе с тобой заходит незнакомец.",
   "outcomes":[
     {"w":6,"text":"Вышла на своём этаже, ключи — в кулаке. Сердце колотится до утра.","effects":{"mental":-2}},
     {"w":1,"text":"Он прижал тебя к стене. Отбилась и закричала — убежал. Заявление в полиции «потерялось».","effects":{"mental":-10,"health":-2}}]},
  {"id":"f_taxi_night","title":"Такси ночью","when":{"sex":"f","age":[18,50],"year":[2013,2120]},"p":0.002,"cooldown":36,
   "text":"Водитель такси сворачивает не туда и спрашивает, «есть ли у такой красивой муж».",
   "outcomes":[
     {"w":5,"text":"Включила геолокацию подруге и вышла на светофоре.","effects":{"mental":-2}},
     {"w":1,"text":"Пожаловалась в сервис. Ответ: «Водитель заблокирован». Через неделю видишь его снова.","effects":{"mental":-4}}]},
  {"id":"f_domestic","title":"Он поднял руку","major":true,"when":{"sex":"f","age":[19,65],"hasPartner":true},"p":0.0007,"cooldown":60,
   "mods":[{"if":{"partnerViolent":true},"mul":6},{"if":{"partnerAlcohol":{">=":2}},"mul":3}],
   "text":"Скандал. Он ударил. Потом плакал и просил прощения: «Это в первый и последний раз».",
   "choices":[
     {"text":"Уйти — к родне, к подруге, в кризисный центр","traits":{"courage":3},"effects":{"relationship":"breakup","reason":"побои","mental":-8,"cash":-30000}},
     {"text":"Заявление в полицию","traits":{"courage":3},"outcomes":[
       {"w":2,"text":"«Семейное дело, помиритесь». Побои — административка, штраф из общего бюджета.","effects":{"mental":-8,"cash":-5000}},
       {"w":1,"text":"Завели дело. Он съехал.","effects":{"relationship":"breakup","reason":"побои","mental":-6}}]},
     {"text":"Простить","traits":{"conformity":2,"courage":-2},"effects":{"mental":-10,"spouseRelation":-15,"later":{"id":"f_domestic_again","years":[0.5,3],"p":0.6}}}]},
  {"id":"f_domestic_again","title":"Снова","trigger":true,"major":true,"when":{"hasPartner":true},
   "text":"«Последний раз» оказался не последним.",
   "choices":[
     {"text":"Уйти","traits":{"courage":3},"effects":{"relationship":"breakup","reason":"побои","mental":-10,"cash":-40000}},
     {"text":"Остаться ради детей","traits":{"conformity":3},"effects":{"mental":-14,"health":-4,"kidWarmth":-6}}]},
  // ---------- развод с детьми и алименты ----------
  {"id":"f_divorce_housing","title":"После развода","major":true,"when":{"sex":"f","age":[22,55],"divorced":true,"kidsN":{">=":1},"hasPartner":false,"ownsFlat":false},"p":0.012,"once":true,
   "text":"После развода — ты с детьми, без жилья. Квартира была его (или в ипотеке на двоих). Снимать на одну зарплату — почти невозможно.",
   "choices":[
     {"text":"Переехать к маме","if":{"parentAlive":true},"traits":{"conformity":2},"effects":{"mental":-4,"relation":{"all":3}}},
     {"text":"Снимать комнату, подработки ночами","traits":{"diligence":2},"effects":{"mental":-6,"health":-2,"cash":-40000}},
     {"text":"Делить имущество в суде","traits":{"courage":2},"outcomes":[
       {"w":1,"text":"Суд выделил долю. Год нервов — зато свой угол.","effects":{"cash":800000,"mental":-6}},
       {"w":2,"text":"Доли нет — квартира оформлена на свекровь.","effects":{"cash":-60000,"mental":-8}}]}]},
  {"id":"f_alimony_again","title":"Он снова пропал","when":{"sex":"f","age":[22,60],"divorced":true,"kidsN":{">=":1}},"p":0.008,"cooldown":24,
   "text":"Алименты снова не пришли. Телефон бывшего выключен, приставы: «Работы официальной нет, взыскать нечего».",
   "choices":[
     {"text":"Писать приставам и в суд снова","traits":{"courage":1,"diligence":1},"outcomes":[
       {"w":1,"text":"Нашли его подработку — немного пришло.","effects":{"cash":20000,"mental":-2}},
       {"w":2,"text":"Ничего. Время и нервы.","effects":{"mental":-4}}]},
     {"text":"Не тратить силы","effects":{"mental":-2,"happiness":-1}}]},
  {"id":"f_single_mom","title":"Одна с детьми","when":{"sex":"f","age":[22,55],"kidsN":{">=":1},"hasPartner":false,"money":{"<":40}},"p":0.01,"cooldown":24,
   "text":"Денег до зарплаты нет, а ребёнку нужна куртка и сбор на ремонт класса. Подработка ночами — или в долг.",
   "choices":[
     {"text":"Подработка ночами","traits":{"diligence":2},"effects":{"cash":15000,"health":-2,"mental":-2}},
     {"text":"Занять","effects":{"cash":-1000,"mental":-2}}]},
  // ---------- возраст 35–45 ----------
  {"id":"f_clock","title":"Часики","major":true,"when":{"sex":"f","age":[34,42],"kidsN":0},"p":0.008,"once":true,
   "text":"Тридцать пять. Врач на приёме: «Если хотите детей — не тяните». Подруги показывают фото с выпускных своих детей.",
   "choices":[
     {"text":"ЭКО по квоте ОМС","if":{"year":[2013,2120]},"traits":{"courage":2},"outcomes":[
       {"w":1,"text":"Со второй попытки — получилось.","effects":{"wantChild":true,"mental":3,"health":-2}},
       {"w":2,"text":"Три попытки, гормоны, надежда и пустота.","effects":{"mental":-10,"health":-3}}]},
     {"text":"Платное ЭКО","if":{"wealthAvg":{">":4}},"traits":{"courage":2},"outcomes":[
       {"w":1,"text":"Получилось.","effects":{"wantChild":true,"cash":-450000,"health":-2}},
       {"w":1,"text":"Не получилось. Полмиллиона и год жизни.","effects":{"cash":-450000,"mental":-8}}]},
     {"text":"Попробовать естественно","if":{"hasPartner":true},"effects":{"wantChild":true}},
     {"text":"Принять, что детей не будет","traits":{"courage":1},"effects":{"mental":-3,"later":{"id":"f_childless_late","years":[15,30],"p":0.3}}}]},
  {"id":"f_childless_late","title":"Без детей","trigger":true,
   "text":"Подруги нянчат внуков. Тебе хорошо одной — почти всегда. Кроме больниц и праздников.",
   "effects":{"mental":-3}},
  {"id":"f_late_pregnancy","title":"«Старородящая»","when":{"sex":"f","age":[36,46],"babyAtHome":true},"p":0.02,"once":true,
   "text":"В консультации тебя записали «старородящей»: скрининги, давление, диабет беременных. Роды — тяжёлые.",
   "effects":{"health":-5,"mental":-3}},
  {"id":"f_pension_gap","title":"Декреты в стаже","when":{"sex":"f","age":[55,70],"kidsN":{">=":2},"pensioner":true},"p":0.05,"once":true,
   "text":"Пенсия меньше, чем у ровесников-мужчин: годы декретов, «полставки», больничные с детьми. Баллы за детей набежали — но не догнали.",
   "effects":{"mental":-2}}
);
