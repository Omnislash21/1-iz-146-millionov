// Фокусы года: окончательный набор по возрастам (подключается после всех этапов и переопределяет их ages).
// nameByAge — название меняется с возрастом; when — условие из фактов (RL.Events.check), без него фокус не показывается;
// sexW — насколько чаще фокус выбирают мужчины/женщины (только автопилот) [~ Росстат «Использование времени» 2019, ВЦИОМ о досуге];
// milestones — что даёт фокус, если держать его годами (fy — накопленные годы): флаги открывают пути (работа, армия, политика).
RL.DATA = RL.DATA || {};
(function (F) {
  function get(id) { return F.filter(function (f) { return f.id === id; })[0]; }
  function set(id, o) { var f = get(id); if (f) Object.keys(o).forEach(function (k) { f[k] = o[k]; }); }

  // существующие — новые возрастные рамки и «взрослые» названия
  set('yard', {ages: [3, 13]});
  set('reading', {ages: [3, 11]});
  set('sport', {ages: [4, 110], nameByAge: {"18": "Спорт и тренировки", "45": "Фитнес, бег, бассейн"}, descByAge: {"18": "Зал, бег, командные игры по выходным. Здоровье и настроение лучше, болезни сердца — реже.", "45": "Ходьба, бассейн, турник во дворе. Сердце и суставы скажут спасибо."}, sexW: {m: 1.3, f: 0.8},
    milestones: [{years: 3, minAge: 8, maxAge: 17, flag: "gto", text: "[Сдал|Сдала] ГТО на золотой значок.", effects: {health: 2, mental: 2}}]});
  set('arts', {ages: [4, 110], nameByAge: {"18": "Творчество: музыка, рисование, театр"}, descByAge: {"18": "Гитара, холст, любительский театр. Для души — а иногда и для заработка."}, sexW: {m: 0.7, f: 1.4},
    milestones: [{years: 6, maxAge: 17, flag: "musicSchool", text: "Окончена художественная или музыкальная школа — диплом и выступление на отчётном концерте.", effects: {skills: 3, mental: 3}}]});
  set('screen', {ages: [3, 110], nameByAge: {"18": "Сериалы, игры и соцсети", "50": "Телевизор и сериалы"}, descByAge: {"18": "Вечера в телефоне и за сериалами. Отдыхаешь, но время утекает.", "50": "Новости, ток-шоу и любимые сериалы. Спокойно, но мало движения."}, sexW: {m: 1.2, f: 0.9}});
  set('help', {ages: [3, 110], nameByAge: {"18": "Дом и хозяйство"}, desc: "Посуда, младшие, огород, магазин. Взрослые ценят.", descByAge: {"18": "Ремонт, готовка, порядок дома. Меньше трат, спокойнее в семье."}, sexW: {m: 0.8, f: 1.3}});
  set('family', {ages: [3, 110], nameByAge: {"18": "Семья и близкие"}, descByAge: {"18": "Вечера и выходные — с супругом, детьми, родителями. Отношения крепче, карьера медленнее."}, sexW: {m: 0.8, f: 1.3}});
  set('schoolprep', {ages: [5, 6]});
  set('study', {ages: [7, 110]});
  set('health', {ages: [3, 110], descByAge: {"40": "Врачи, анализы, режим, таблетки по часам. Болезни не запускаются."}});
  set('friends', {ages: [11, 110], nameByAge: {"41": "Друзья и встречи"}});
  set('tutors', {ages: [13, 18]});
  set('selfedu', {ages: [12, 110], nameByAge: {"25": "Курсы и переквалификация"},
    milestones: [{years: 3, minAge: 14, flag: "english", text: "Свободный английский: книги и сериалы — в оригинале.", effects: {skills: 3}},
      {years: 3, minAge: 18, flag: "requalified", text: "Курсы окончены, сертификат в резюме.", effects: {skills: 2, money: 1}}]});
  set('parttime', {ages: [14, 25]});
  set('love', {ages: [13, 75], nameByAge: {"18": "Поиск пары"}, when: {"any": [{"age": [0, 17.99]}, {"hasPartner": false}, {"partnerStatus": "dating"}]}});
  set('career', {ages: [17, 75]});
  set('jobhunt', {ages: [16, 80]});
  set('business', {ages: [18, 85]});
  set('invest', {ages: [18, 110]});
  set('dacha', {ages: [40, 110], nameByAge: {"40": "Дача и огород", "60": "Дача и внуки"}});

  F.push(
    {"id":"kgclubs","name":"Развивающие кружки","desc":"Английский для малышей, танцы, лепка, бассейн. Платно, зато интересно.","ages":[3,6],"cost":2500,
     "eff":{"skills":0.5,"social":0.3,"mental":0.1},"apt":"iq","support":true,"traits":{"curiosity":0.4,"sociability":0.2}},
    {"id":"olympiad","name":"Олимпиады и кружки","desc":"Шахматы, робототехника, математический кружок, олимпиады. Нужны голова и упорство.","ages":[8,17],"cost":800,
     "eff":{"skills":0.85,"social":-0.05,"mental":0.05},"apt":"iq","support":true,"prep":0.8,"traits":{"curiosity":0.5,"diligence":0.4},"sexW":{"m":1.2,"f":0.9},
     "milestones":[{"years":3,"minAge":12,"flag":"olympiadWinner","text":"Призёр региональной олимпиады — это плюс при поступлении.","effects":{"skills":3,"mental":3}}]},
    {"id":"dance","name":"Танцы","desc":"Бальные, народные, хип-хоп. Осанка, сцена, костюмы.","ages":[5,30],"cost":3000,"needsSections":true,
     "eff":{"health":0.3,"social":0.35,"mental":0.15,"happiness":0.2},"apt":"physique","traits":{"diligence":0.3,"sociability":0.3},"sexW":{"m":0.35,"f":1.8}},
    {"id":"military","name":"Военно-патриотический клуб","desc":"Строевая, разборка автомата на время, прыжки с парашютом, походы.","ages":[12,17],"cost":500,
     "eff":{"health":0.35,"social":0.2,"mental":0.05},"apt":"physique","traits":{"courage":0.4,"conformity":0.4,"selfControl":0.2},"sexW":{"m":2,"f":0.25},
     "milestones":[{"years":2,"flag":"militaryPrep","text":"Значок парашютиста и характеристика из клуба — в армии будет проще.","effects":{"mental":2}}]},
    {"id":"garage","name":"Гараж и техника","desc":"Мопеды, машины, электроника, паяльник. Руки растут откуда надо.","ages":[12,85],"cost":1000,
     "eff":{"skills":0.35,"social":0.1,"mental":0.15},"traits":{"diligence":0.3,"curiosity":0.3},"sexW":{"m":2.2,"f":0.15},
     "milestones":[{"years":3,"minAge":15,"flag":"handy","text":"[Сам перебрал|Сама перебрала] двигатель — теперь чинишь всё вокруг. Возьмут и в автосервис, и электриком.","effects":{"skills":2}}]},
    {"id":"beauty","name":"Внешность и стиль","desc":"Спортзал, уход, одежда, фото. Встречают по одёжке.","ages":[13,70],"cost":3500,
     "eff":{"social":0.25,"happiness":0.25,"mental":0.1},"traits":{"selfControl":0.1},"sexW":{"m":0.5,"f":1.8},"looks":0.06},
    {"id":"blog","name":"Блог и соцсети","desc":"Ролики, посты, подписчики. Может выстрелить, может съесть всё время.","ages":[13,60],"cost":0,"when":{"year":[2010,2120]},
     "eff":{"social":0.35,"skills":0.1,"mental":-0.05,"happiness":0.15},"traits":{"sociability":0.3,"courage":0.2},"sexW":{"m":0.9,"f":1.2}},
    {"id":"party","name":"Тусовки и клубы","desc":"Бары, концерты, вечеринки до утра. Весело, но здоровье и деньги уходят.","ages":[16,35],"cost":4000,
     "eff":{"social":0.6,"happiness":0.45,"health":-0.15,"mental":0.1,"skills":-0.1},"risk":{"habits":2},"traits":{"sociability":0.4,"selfControl":-0.3}},
    {"id":"volunteer","name":"Волонтёрство","desc":"Приюты для животных, поисковые отряды, помощь пожилым. Без денег, зато со смыслом.","ages":[14,90],"cost":0,
     "eff":{"social":0.35,"mental":0.25,"happiness":0.2},"traits":{"empathy":0.5,"diligence":0.2},"sexW":{"m":0.7,"f":1.4},
     "milestones":[{"years":2,"minAge":16,"flag":"volunteer","text":"Тебя знают в городе как человека, который помогает. Зовут в общественные советы.","effects":{"social":3}}]},
    {"id":"faith","name":"Вера и община","nameByReligion":{"muslim":"Вера: мечеть и община","orthodox":"Вера: храм и община"},"desc":"Службы, пост, люди вокруг. Спокойнее на душе, меньше соблазнов.","ages":[14,110],"cost":300,
     "eff":{"mental":0.3,"social":0.2,"happiness":0.15},"traits":{"conformity":0.3,"selfControl":0.3,"empathy":0.2},"sexW":{"m":0.7,"f":1.4},"sober":true},
    {"id":"publicwork","name":"Общественная работа и политика","desc":"Собрания жильцов, партийная ячейка, депутатские приёмные. Связи и риск.","ages":[18,85],"cost":0,
     "eff":{"social":0.4,"mental":-0.05,"skills":0.1},"traits":{"courage":0.3,"sociability":0.3},"sexW":{"m":1.3,"f":0.8},
     "milestones":[{"years":2,"flag":"activist","text":"Тебя заметили в районе: позвали в партийный список на муниципальных выборах.","effects":{"social":3}}]},
    {"id":"kids","name":"Дети","desc":"Уроки, кружки, разговоры, совместные выходные. Дети растут увереннее.","ages":[18,65],"cost":2000,"when":{"kidsN":{">=":1}},
     "eff":{"mental":0.15,"happiness":0.25,"social":-0.05},"traits":{"empathy":0.4,"diligence":0.2},"sexW":{"m":0.7,"f":1.4},"kidBoost":true},
    {"id":"sidejob","name":"Подработки и халтуры","desc":"Вечером и в выходные — ремонт, такси, репетиторство. Деньги есть, сил нет.","ages":[26,72],"cost":0,"when":{"employed":true},
     "eff":{"mental":-0.15,"health":-0.08,"skills":0.05},"earnAdult":0.18,"traits":{"diligence":0.4}},
    {"id":"travel","name":"Путешествия","desc":"Новые города и страны каждый отпуск. Дорого, но жизнь — ярче.","ages":[20,85],"cost":15000,
     "eff":{"happiness":0.45,"mental":0.3,"social":0.1,"skills":0.1},"traits":{"curiosity":0.5,"courage":0.2}},
    {"id":"fishing","name":"Рыбалка, охота, баня","desc":"Выходные — на природе с мужиками. Отдыхаешь, но не всегда трезвым.","ages":[18,90],"cost":2000,
     "eff":{"mental":0.35,"social":0.2,"health":0.05,"happiness":0.25},"risk":{"habits":1.4},"traits":{"selfControl":0.1},"sexW":{"m":2.2,"f":0.15}},
    {"id":"caregiving","name":"Забота о родителях","desc":"Врачи, лекарства, продукты, ремонт у родителей. Им легче — тебе тяжелее.","ages":[30,85],"cost":3000,"when":{"parentAlive":true},
     "eff":{"mental":-0.1,"happiness":0.05},"traits":{"empathy":0.5,"diligence":0.2},"sexW":{"m":0.7,"f":1.4},"parentCare":true},
    // женские занятия [~ Росстат «Использование времени» 2019: рукоделие, готовка, встречи с подругами — у женщин в разы чаще]
    {"id":"needlework","name":"Рукоделие и уют","desc":"Вязание, шитьё, вышивка, заготовки на зиму. Руки заняты — голова отдыхает.","ages":[12,100],"cost":1000,"when":{"sex":"f"},
     "eff":{"mental":0.3,"happiness":0.2,"skills":0.05},"traits":{"diligence":0.3,"selfControl":0.2},"sober":true},
    {"id":"girlfriends","name":"Подруги и девичники","desc":"Кафе, долгие разговоры, салон, кино. Есть кому позвонить в три часа ночи.","ages":[16,90],"cost":3000,"when":{"sex":"f"},
     "eff":{"social":0.4,"mental":0.25,"happiness":0.2},"traits":{"sociability":0.4,"empathy":0.2}},
    {"id":"cooking","name":"Кулинария и домашний стол","desc":"Новые рецепты, пироги по выходным, гости за большим столом.","ages":[16,100],"cost":2500,"when":{"sex":"f"},
     "eff":{"happiness":0.25,"social":0.15,"mental":0.1},"traits":{"diligence":0.2,"empathy":0.2}},
    // теневой заработок 18+ (без подробностей): деньги сразу, риски каждый месяц — js/sim/careers.js adultWork.
    // Проституция — КоАП ст. 6.11 (штраф 1500–2000 ₽); OnlyFans — с ~2017, после 2022 выплаты в Россию только через посредников.
    {"id":"escort","name":"Работа по вызову","nameByEra":{"2008":"Эскорт"},"desc":"Быстрые и большие деньги. Платишь здоровьем, страхом и репутацией. Незаконно (ст. 6.11 КоАП).","ages":[18,40],"cost":0,
     "when":{"sex":"f","year":[1990,2120]},"eff":{"mental":-0.35,"health":-0.1,"social":-0.1},"earnAny":1.3,"adultWork":"escort","risk":{"habits":1.6},"traits":{"courage":0.3,"selfControl":-0.2}},
    {"id":"content18","name":"Контент 18+ (OnlyFans)","desc":"Фото и видео для платных подписчиков. Доход — как повезёт, а слить могут кому угодно: родным, на работу.","ages":[18,45],"cost":2000,
     "when":{"sex":"f","year":[2017,2120]},"eff":{"mental":-0.15,"social":-0.05},"earnAny":0.6,"adultWork":"content","traits":{"courage":0.3}}
  );
  // гараж, рыбалка с охотой и баней — мужские компании; у девочки-подростка «Компания друзей» без гаражей
  set('garage', {when: {sex: 'm'}});
  set('fishing', {when: {sex: 'm'}});
  set('friends', {descBySex: {f: "Подруги, прогулки, торговый центр, первые дискотеки. Связи растут — и риски тоже."}});
  F.forEach(function (f) { if (!f.auto) f.auto = 1; });
})(RL.DATA.focuses);
