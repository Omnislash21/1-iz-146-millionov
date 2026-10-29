// Болезни и состояния. Частоты — по данным Минздрава/Росстата о заболеваемости детей, ВОЗ, профильным регистрам [~ округлено].
// kind: congenital (при рождении), chronic (может проявиться), acute (эпизод с длительностью).
// birthP — вероятность при рождении; perYear — годовая заболеваемость в диапазоне ages [от, до].
// mods — множители: ключ = факт (см. RL.Facts), значение = множитель, если факт истинен.
// cap — потолок здоровья, пока состояние активно; drain — потеря здоровья в месяц;
// mort — множитель к табличной смертности (может зависеть от лечения, см. treated/untreated);
// cost — стоимость лечения/контроля в месяц (руб. 2024), freeShare — доля, покрываемая ОМС/льготами при нормальном доступе;
// disability — вероятность оформления инвалидности; cureYear — шанс излечения/ремиссии за год при лечении.
RL.DATA = RL.DATA || {};
RL.DATA.conditions = {
  "premature":{"name":"Недоношенность","kind":"congenital","birthP":0.06,
    "mods":{"motherSmokes":1.5,"motherAlcohol":1.7,"poor":1.2,"motherYoung":1.4,"motherOld":1.4},
    "cap":85,"mortInfant":4,"mortToddler":1.5,"resolveAge":3,"cost":0,"text":"Ты [родился|родилась] раньше срока и [весил|весила] меньше нормы."},
  "chd":{"name":"Врождённый порок сердца","kind":"congenital","birthP":0.008,"severeShare":0.25,
    "cap":70,"mortSevere":10,"mortMild":1.5,"needsSurgery":true,"cost":2000,"freeShare":0.8,
    "surgerySuccess":{"1985":0.65,"1995":0.75,"2005":0.88,"2015":0.95,"2025":0.97},
    "text":"Врачи услышали шум в сердце: врождённый порок."},
  "cp":{"name":"ДЦП","kind":"congenital","birthP":0.0025,"mods":{"premature":4},
    "cap":55,"mort":3,"disability":0.85,"cost":8000,"freeShare":0.4,"skillsPenalty":0.4,
    "text":"Поставили диагноз — детский церебральный паралич."},
  "down":{"name":"Синдром Дауна","kind":"congenital","birthP":0.0008,"mods":{"motherAge35":3,"motherAge40":10},
    "cap":65,"mort":4,"disability":1,"cost":5000,"freeShare":0.4,"iqSet":50,
    "text":"У тебя синдром Дауна."},
  "hearing":{"name":"Нейросенсорная тугоухость","kind":"congenital","birthP":0.0015,
    "cap":90,"mort":1,"disability":0.5,"cost":3000,"freeShare":0.5,"socialPenalty":0.3,
    "text":"Скрининг показал нарушение слуха."},
  "fas":{"name":"Фетальный алкогольный синдром","kind":"congenital","birthP":0,"birthPIf":{"motherAlcohol":0.25},
    "cap":75,"mort":1.8,"iqShift":-15,"cost":1500,"freeShare":0.6,
    "text":"Мать пила во время беременности: у тебя фетальный алкогольный синдром."},
  "hiv":{"name":"ВИЧ-инфекция","kind":"congenital","birthP":0,
    "cap":80,"mortNoArt":12,"mortArt":2,"artFrom":2006,"cost":0,"freeShare":1,
    "text":"Ты родился с ВИЧ, переданным от матери."},
  "asthma":{"name":"Бронхиальная астма","kind":"chronic","perYear":0.006,"ages":[2,17],
    "mods":{"parentsSmoke":1.5,"bigCity":1.3,"allergy":2.2,"poorHousing":1.4},
    "cap":82,"mort":1.6,"cost":2500,"freeShare":0.6,"cureYear":0.04,
    "text":"Тебе поставили диагноз «бронхиальная астма»."},
  "allergy":{"name":"Атопический дерматит / аллергия","kind":"chronic","perYear":0.02,"ages":[0,6],
    "mods":{"bigCity":1.3},"cap":95,"mort":1,"cost":1200,"freeShare":0.2,"cureYear":0.12,
    "text":"У тебя аллергия: сыпь, зуд, особая диета."},
  "myopia":{"name":"Близорукость","kind":"chronic","perYear":0.04,"ages":[7,17],
    "mods":{"focus_screen":1.6,"focus_reading":1.3},"cap":97,"mort":1,"cost":600,"freeShare":0,
    "text":"Окулист выписал очки: близорукость."},
  "scoliosis":{"name":"Сколиоз","kind":"chronic","perYear":0.015,"ages":[7,15],
    "mods":{"focus_sport":0.6,"focus_screen":1.3},"cap":92,"mort":1,"cost":500,"freeShare":0.3,"cureYear":0.05,
    "text":"У тебя сколиоз — врач велел больше двигаться и лечебную физкультуру."},
  "gastritis":{"name":"Хронический гастрит","kind":"chronic","perYear":0.008,"ages":[7,17],
    "mods":{"poor":1.5,"stress":1.6},"cap":90,"mort":1,"cost":900,"freeShare":0.3,"cureYear":0.08,
    "text":"Болит живот: хронический гастрит."},
  "obesity":{"name":"Ожирение","kind":"chronic","perYear":0.01,"ages":[4,17],
    "mods":{"focus_screen":2.0,"focus_sport":0.35,"focus_yard":0.6},"cap":85,"mort":1.2,"cost":0,"freeShare":0,"cureYear":0.15,
    "text":"Педиатр говорит про лишний вес."},
  "diabetes1":{"name":"Сахарный диабет 1 типа","kind":"chronic","perYear":0.00025,"ages":[0,17],
    "cap":78,"mort":3,"mort90s":6,"cost":3500,"freeShare":0.85,
    "text":"Диагноз — сахарный диабет 1 типа. Инсулин теперь каждый день."},
  "epilepsy":{"name":"Эпилепсия","kind":"chronic","perYear":0.0005,"ages":[0,17],
    "cap":80,"mort":3,"cost":2500,"freeShare":0.6,"disability":0.4,"cureYear":0.07,
    "text":"После приступа поставили диагноз «эпилепсия»."},
  "cancer":{"name":"Онкологическое заболевание (лейкоз)","kind":"chronic","perYear":0.00012,"ages":[0,17],
    "cap":40,"drain":0.5,"durationMonths":24,"cost":15000,"freeShare":0.7,"disability":1,
    "survival5y":{"1985":0.45,"1995":0.55,"2005":0.7,"2015":0.8,"2025":0.85},
    "text":"Диагноз — острый лейкоз. Впереди долгое лечение."},
  "tb":{"name":"Туберкулёз","kind":"chronic","perYear":0.00014,"ages":[0,17],
    "byYear":{"1985":0.6,"1995":1.4,"2000":1.3,"2010":1.0,"2020":0.5},
    "mods":{"poor":2.5,"familyAlcohol":2.0,"siberiaFE":2.0,"orphanage":2.0,"colony":4,"hiv":20},
    "cap":60,"drain":0.3,"durationMonths":9,"mort":4,"cost":1000,"freeShare":0.95,
    "text":"Проба Манту и рентген: туберкулёз. Тубдиспансер на полгода."},
  "zpr":{"name":"Задержка психического развития","kind":"chronic","perYear":0.012,"ages":[3,7],
    "mods":{"lowIq":4,"familyAlcohol":2,"village":1.3,"orphanage":2.5},"cap":100,"mort":1,"cost":2000,"freeShare":0.5,"cureYear":0.15,
    "text":"Психолого-медико-педагогическая комиссия: задержка психического развития."},
  "adhd":{"name":"СДВГ","kind":"chronic","perYear":0.005,"ages":[4,9],"cap":100,"mort":1,"cost":1500,"freeShare":0.3,"cureYear":0.06,
    "text":"Невролог говорит про гиперактивность и дефицит внимания."}
};

// Острые эпизоды (заболеваемость в год, база для ребёнка 0–10).
RL.DATA.acute = {
  "pneumonia":{"name":"Пневмония","perYear":0.03,"ages":[0,10],"mods":{"poor":1.5,"parentsSmoke":1.4,"infant":2},"hit":18,"months":1,
    "deathP":{"1985":0.003,"1995":0.003,"2005":0.0012,"2015":0.0005,"2025":0.0004},"hospital":true},
  "gastro":{"name":"Кишечная инфекция","perYear":0.06,"ages":[0,10],"mods":{"summer":3,"village":1.5,"poor":1.3},"hit":10,"months":1,
    "deathP":{"1985":0.0006,"2000":0.0003,"2015":0.00005},"hospital":true},
  "chickenpox":{"name":"Ветрянка","perYear":0.12,"ages":[1,12],"mods":{"kindergarten":2.5,"school":1.5},"hit":6,"months":1,"once":true},
  "measles":{"name":"Корь","perYear":0.0002,"ages":[0,14],"mods":{"unvaccinated":40,"measlesYear":8},"hit":20,"months":1,"once":true,"deathP":{"1985":0.003,"2025":0.001},"hospital":true},
  "covid":{"name":"COVID-19","perYear":0.25,"ages":[0,100],"epidemic":"covid","hit":5,"months":1,"once":false}
};

// Медицина: эффективность лечения = f(качество медицины региона/поселения, деньги, эпоха).
RL.DATA.medicineEra = {"1985":0.75,"1992":0.6,"1995":0.55,"2000":0.65,"2005":0.75,"2010":0.85,"2015":0.9,"2020":0.92,"2025":0.94};
