/*
Фокусы по профессиям: 42 × 3. Карьерные эффекты и цены [~], стоимость в RUB2024.
Деньги: рубли 2024 года. Составлено 27.10.2026.
hh2024: hh.ru, обзор рынка труда 2024: методика зарплатных предложений — https://hh.ru/article/32527
hhmed: hh.ru, рынок среднего медицинского персонала — https://hh.ru/article/32417
taxi: Прокуратура Саратовской области: требования к водителям такси по 580-ФЗ — https://epp.genproc.gov.ru/ru/proc_64/activity/legal-education/explain/e685431/
driving: Прокуратура Тульской области: категории и стаж по статье 26 закона 196-ФЗ — https://epp.genproc.gov.ru/ru/proc_71/activity/legal-education/explain/e1292439/
med: Росздравнадзор: допуск к медицинской и фармацевтической деятельности — https://www.roszdravnadzor.gov.ru/medactivities/specialist
teacher: Департамент образования Костромской области: квалификация учителя и воспитателя — https://don.kostroma.gov.ru/kontakty/obrashcheniya-grazhdan/chasto-zadavaemye-voprosy.php
coach: Минтруд, профстандарт Тренер, приказ №362н от 27.04.2023 — https://publication.pravo.gov.ru/document/0001202305250012
advocate: Минюст: закон 63-ФЗ, статьи 9–13 и 28 — https://minjust.gov.ru/ru/documents/7885/
[~] — авторская оценка для симуляции, не измеренная вероятность и не официальная тарифная ставка.
*/
RL.DATA.careerFocuses = {
  "meta": {
    "schemaVersion": 1,
    "compiledAt": "2026-10-27",
    "currency": "RUB",
    "priceYear": 2024,
    "sources": [
      {
        "id": "hh2024",
        "title": "hh.ru, обзор рынка труда 2024: методика зарплатных предложений",
        "url": "https://hh.ru/article/32527",
        "type": "primary_analytics"
      },
      {
        "id": "hhmed",
        "title": "hh.ru, рынок среднего медицинского персонала",
        "url": "https://hh.ru/article/32417",
        "type": "primary_analytics"
      },
      {
        "id": "taxi",
        "title": "Прокуратура Саратовской области: требования к водителям такси по 580-ФЗ",
        "url": "https://epp.genproc.gov.ru/ru/proc_64/activity/legal-education/explain/e685431/",
        "type": "official_explanation"
      },
      {
        "id": "driving",
        "title": "Прокуратура Тульской области: категории и стаж по статье 26 закона 196-ФЗ",
        "url": "https://epp.genproc.gov.ru/ru/proc_71/activity/legal-education/explain/e1292439/",
        "type": "official_explanation"
      },
      {
        "id": "med",
        "title": "Росздравнадзор: допуск к медицинской и фармацевтической деятельности",
        "url": "https://www.roszdravnadzor.gov.ru/medactivities/specialist",
        "type": "official_explanation"
      },
      {
        "id": "teacher",
        "title": "Департамент образования Костромской области: квалификация учителя и воспитателя",
        "url": "https://don.kostroma.gov.ru/kontakty/obrashcheniya-grazhdan/chasto-zadavaemye-voprosy.php",
        "type": "official_explanation"
      },
      {
        "id": "coach",
        "title": "Минтруд, профстандарт Тренер, приказ №362н от 27.04.2023",
        "url": "https://publication.pravo.gov.ru/document/0001202305250012",
        "type": "official_standard"
      },
      {
        "id": "advocate",
        "title": "Минюст: закон 63-ФЗ, статьи 9–13 и 28",
        "url": "https://minjust.gov.ru/ru/documents/7885/",
        "type": "official_law"
      }
    ],
    "notes": [
      "126 фокусов: ровно по 3 на каждую из 42 профессий, перечисленных в GPT_TASKS.md. Для 25 новых профессий в этой задаче дополнительные фокусы не запрашивались.",
      "Все численные эффекты, расходы и вероятности [~]. Профили описывают игровой баланс, а не измеренные причинные эффекты занятий.",
      "eff — пункты шкалы за месяц; cost — RUB2024 в месяц. raise — доля роста за год; promo — множитель шанса повышения; side — доля средней зарплаты за месяц после прямых профессиональных расходов, до личного налога.",
      "burnout/injury/fire/caseRisk — дополнительные неотрицательные месячные вероятности, не годовые коэффициенты и не защитные отрицательные числа. Ноль не отменяет фоновые риски профессии.",
      "При подключении нужно ограничивать суммарные вероятности и зарплатный рост, проверять занятость, profs, ages, when, доступность обучения и бюджет.",
      "entryRequirementRef/entryRequirements — дополнительные требования к конкретной деятельности. Их должен проверить потребитель; один возраст и id профессии не доказывают наличие прав или допуска.",
      "Для cf_driver_3 нужен допуск такси из professionsExt.requirements.taxi_driver; курс в фокусе не выдаёт права или профессиональный статус.",
      "Все lawful-подработки предполагают допустимое совмещение по договору и закону. Для госслужбы и военной службы фокусы с коммерческой подработкой не созданы.",
      "Серые служебные схемы отмечены bribe290 и ограничены 1997+; они не представлены как законная практика.",
      "raise/promo выражают карьерные возможности [~], не гарантируют квалификационную категорию, чин, мандат, медицинский допуск или место в составе.",
      "Фокусы — данные для подключения, существующий career_focus.js и другие файлы не изменяются."
    ]
  },
  "items": [
    {
      "id": "cf_laborer_1",
      "name": "Освоить смежные операции",
      "desc": "Ты учишься работать с разными простыми операциями под руководством мастера. Навыки растут, но после смены остаётся меньше сил.",
      "profs": [
        "laborer"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 600,
      "eff": {
        "skills": 0.4,
        "mental": -0.1
      },
      "career": {
        "raise": 0.025,
        "promo": 1.6,
        "side": 0,
        "burnout": 0.002,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_laborer_2",
      "name": "Разовые заказы по выходным",
      "desc": "Ты берёшь посильные работы у знакомых с заранее оговорённой оплатой. Доход зависит от заказов, а свободного времени становится меньше.",
      "profs": [
        "laborer"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 500,
      "eff": {
        "skills": 0.1,
        "health": -0.15,
        "mental": -0.1
      },
      "career": {
        "raise": 0,
        "promo": 1,
        "side": 0.2,
        "burnout": 0.005,
        "injury": 0.002,
        "fire": 0.0004,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_laborer_3",
      "name": "Работа без постоянных подмен",
      "desc": "Ты заранее договариваешься о графике и не берёшь каждую свободную смену. Восстановление лучше, но дополнительных денег меньше.",
      "profs": [
        "laborer"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 0,
      "eff": {
        "health": 0.15,
        "mental": 0.25,
        "skills": -0.05
      },
      "career": {
        "raise": 0,
        "promo": 0.85,
        "side": 0,
        "burnout": 0,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_worker_1",
      "name": "Подготовка к повышению разряда",
      "desc": "Ты изучаешь технологию и готовишься к проверке квалификации на предприятии. Учёба требует времени и не гарантирует назначения.",
      "profs": [
        "worker"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 900,
      "eff": {
        "skills": 0.4,
        "mental": -0.1
      },
      "career": {
        "raise": 0.025,
        "promo": 1.6,
        "side": 0,
        "burnout": 0.002,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_worker_2",
      "name": "Наладка и улучшение участка",
      "desc": "Ты предлагаешь небольшие улучшения процесса и учишься у наладчиков. Ответственность и напряжение растут вместе с заметностью.",
      "profs": [
        "worker"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 400,
      "eff": {
        "social": 0.25,
        "skills": 0.15,
        "mental": -0.2
      },
      "career": {
        "raise": 0.02,
        "promo": 1.9,
        "side": 0,
        "burnout": 0.006,
        "injury": 0,
        "fire": 0.0007,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_worker_3",
      "name": "Смены с доплатой",
      "desc": "Ты берёшь оформленные дополнительные смены в допустимых пределах. Доход выше, но недосып и физическая усталость накапливаются.",
      "profs": [
        "worker"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 600,
      "eff": {
        "skills": 0.1,
        "health": -0.15,
        "mental": -0.1
      },
      "career": {
        "raise": 0,
        "promo": 1,
        "side": 0.2,
        "burnout": 0.005,
        "injury": 0.002,
        "fire": 0.0004,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_builder_1",
      "name": "Чертежи и сметы",
      "desc": "Ты учишься читать чертежи и проверять объём работ. Ошибок становится меньше, но вечера уходят на обучение.",
      "profs": [
        "builder"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 1300,
      "eff": {
        "skills": 0.4,
        "mental": -0.1
      },
      "career": {
        "raise": 0.025,
        "promo": 1.6,
        "side": 0,
        "burnout": 0.002,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_builder_2",
      "name": "Небольшие частные ремонты",
      "desc": "Ты берёшь короткие заказы с понятным объёмом и безопасными условиями. Инструмент и дорога стоят денег, а отдых сокращается.",
      "profs": [
        "builder"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 2500,
      "eff": {
        "skills": 0.1,
        "health": -0.15,
        "mental": -0.1
      },
      "career": {
        "raise": 0,
        "promo": 1,
        "side": 0.2,
        "burnout": 0.005,
        "injury": 0.002,
        "fire": 0.0004,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_builder_3",
      "name": "Бригадирские навыки",
      "desc": "Ты координируешь этапы работ и передачу участка. Возможность роста сопровождается конфликтами сроков и нагрузкой.",
      "profs": [
        "builder"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 800,
      "eff": {
        "social": 0.25,
        "skills": 0.15,
        "mental": -0.2
      },
      "career": {
        "raise": 0.02,
        "promo": 1.9,
        "side": 0,
        "burnout": 0.006,
        "injury": 0,
        "fire": 0.0007,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_welder_1",
      "name": "Новый способ сварки",
      "desc": "Ты проходишь обучение по новому способу сварки и работаешь в пределах своего допуска. Подготовка стоит денег и не заменяет аттестацию для специальных объектов.",
      "profs": [
        "welder"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 2200,
      "eff": {
        "skills": 0.4,
        "mental": -0.1
      },
      "career": {
        "raise": 0.025,
        "promo": 1.6,
        "side": 0,
        "burnout": 0.002,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_welder_2",
      "name": "Изделия по частным заказам",
      "desc": "Ты берёшь посильные заказы на изделия с проверенным оборудованием. Расходники съедают часть оплаты, а физическая нагрузка растёт.",
      "profs": [
        "welder"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 3500,
      "eff": {
        "skills": 0.1,
        "health": -0.15,
        "mental": -0.1
      },
      "career": {
        "raise": 0,
        "promo": 1,
        "side": 0.2,
        "burnout": 0.005,
        "injury": 0.002,
        "fire": 0.0004,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_welder_3",
      "name": "Качество шва и контроль",
      "desc": "Ты уделяешь больше внимания подготовке, контролю и документации. Темп ниже, зато навык и предсказуемость результата выше.",
      "profs": [
        "welder"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 1000,
      "eff": {
        "skills": 0.25,
        "social": 0.1,
        "mental": -0.05
      },
      "career": {
        "raise": 0.01,
        "promo": 1.3,
        "side": 0,
        "burnout": 0.001,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_electrician_1",
      "name": "Подготовка по электробезопасности",
      "desc": "Ты повторяешь схемы и готовишься к проверке знаний для своей работы. Учёба не присваивает группу автоматически и отнимает свободное время.",
      "profs": [
        "electrician"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 1500,
      "eff": {
        "skills": 0.4,
        "mental": -0.1
      },
      "career": {
        "raise": 0.025,
        "promo": 1.6,
        "side": 0,
        "burnout": 0.002,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_electrician_2",
      "name": "Заявки на бытовой ремонт",
      "desc": "Ты принимаешь только работы, на которые хватает подготовки и допуска. Нужны инструмент и учёт времени, а ошибки обходятся дорого.",
      "profs": [
        "electrician"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 2500,
      "eff": {
        "skills": 0.1,
        "health": -0.15,
        "mental": -0.1
      },
      "career": {
        "raise": 0,
        "promo": 1,
        "side": 0.2,
        "burnout": 0.005,
        "injury": 0.002,
        "fire": 0.0004,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_electrician_3",
      "name": "Плановое обслуживание",
      "desc": "Ты системно ведёшь осмотры и записи по согласованным процедурам. Это укрепляет квалификацию, но добавляет рутинной нагрузки.",
      "profs": [
        "electrician"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 600,
      "eff": {
        "skills": 0.25,
        "social": 0.1,
        "mental": -0.05
      },
      "career": {
        "raise": 0.01,
        "promo": 1.3,
        "side": 0,
        "burnout": 0.001,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_mechanic_1",
      "name": "Диагностика вместо замены наугад",
      "desc": "Ты изучаешь диагностику и разбираешь сложные случаи с опытными коллегами. Оборудование и обучение стоят денег.",
      "profs": [
        "mechanic"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 2500,
      "eff": {
        "skills": 0.4,
        "mental": -0.1
      },
      "career": {
        "raise": 0.025,
        "promo": 1.6,
        "side": 0,
        "burnout": 0.002,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_mechanic_2",
      "name": "Частные заказы в мастерской",
      "desc": "Ты обслуживаешь несколько дополнительных машин с понятной ответственностью. Подработка требует расходников и сокращает выходные.",
      "profs": [
        "mechanic"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 3500,
      "eff": {
        "skills": 0.1,
        "health": -0.15,
        "mental": -0.1
      },
      "career": {
        "raise": 0,
        "promo": 1,
        "side": 0.2,
        "burnout": 0.005,
        "injury": 0.002,
        "fire": 0.0004,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_mechanic_3",
      "name": "Организация приёмки",
      "desc": "Ты учишься согласовывать дефекты, сроки и стоимость с клиентом. Общаться приходится больше, а конфликты теперь идут через тебя.",
      "profs": [
        "mechanic"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 700,
      "eff": {
        "social": 0.25,
        "skills": 0.15,
        "mental": -0.2
      },
      "career": {
        "raise": 0.02,
        "promo": 1.9,
        "side": 0,
        "burnout": 0.006,
        "injury": 0,
        "fire": 0.0007,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_rotation_1",
      "name": "Освоить смежную вахтовую специальность",
      "desc": "Ты готовишься к работе по дополнительной специальности через официальное обучение. Допуск проверяется отдельно, а восстановление между вахтами сокращается.",
      "profs": [
        "rotation"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 2500,
      "eff": {
        "skills": 0.4,
        "mental": -0.1
      },
      "career": {
        "raise": 0.025,
        "promo": 1.6,
        "side": 0,
        "burnout": 0.002,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_rotation_2",
      "name": "Наставничество на вахте",
      "desc": "Ты помогаешь новичкам разобраться в быте и безопасных процедурах. Растёт влияние в бригаде, но появляется дополнительная ответственность.",
      "profs": [
        "rotation"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 500,
      "eff": {
        "social": 0.25,
        "skills": 0.15,
        "mental": -0.2
      },
      "career": {
        "raise": 0.02,
        "promo": 1.9,
        "side": 0,
        "burnout": 0.006,
        "injury": 0,
        "fire": 0.0007,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_rotation_3",
      "name": "Межвахтовое восстановление",
      "desc": "Ты оставляешь межвахтовый отдых свободным от лишних заказов. Здоровье и сон выигрывают ценой упущенной подработки.",
      "profs": [
        "rotation"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 1500,
      "eff": {
        "health": 0.15,
        "mental": 0.25,
        "skills": -0.05
      },
      "career": {
        "raise": 0,
        "promo": 0.85,
        "side": 0,
        "burnout": 0,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_seller_1",
      "name": "Товар и работа с возражениями",
      "desc": "Ты изучаешь ассортимент и объясняешь условия покупки без обмана. Общение даётся легче, но эмоциональная нагрузка остаётся.",
      "profs": [
        "seller"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 500,
      "eff": {
        "skills": 0.4,
        "mental": -0.1
      },
      "career": {
        "raise": 0.025,
        "promo": 1.6,
        "side": 0,
        "burnout": 0.002,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_seller_2",
      "name": "Выкладка и учёт остатков",
      "desc": "Ты берёшь на себя аккуратную сверку товара и передачи смены. Ответственность растёт, а работа с цифрами требует внимания.",
      "profs": [
        "seller"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 300,
      "eff": {
        "skills": 0.25,
        "social": 0.1,
        "mental": -0.05
      },
      "career": {
        "raise": 0.01,
        "promo": 1.3,
        "side": 0,
        "burnout": 0.001,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_seller_3",
      "name": "Оформленные дополнительные смены",
      "desc": "Ты подменяешь коллег по согласованному графику и оплате. Денег больше, но ноги и сон страдают от длинных дней.",
      "profs": [
        "seller"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 500,
      "eff": {
        "social": 0.1,
        "health": -0.1,
        "mental": -0.15
      },
      "career": {
        "raise": 0,
        "promo": 1.05,
        "side": 0.15,
        "burnout": 0.005,
        "injury": 0.0004,
        "fire": 0.0004,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_cook_1",
      "name": "Технология и санитарные процедуры",
      "desc": "Ты повторяешь технологические карты и безопасную работу с продуктами. Учёба помогает качеству, но требует сил после смены.",
      "profs": [
        "cook"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 1400,
      "eff": {
        "skills": 0.4,
        "mental": -0.1
      },
      "career": {
        "raise": 0.025,
        "promo": 1.6,
        "side": 0,
        "burnout": 0.002,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_cook_2",
      "name": "Небольшие заказы на блюда",
      "desc": "Ты берёшь ограниченное число законно оформленных заказов с соблюдением условий приготовления. Закупки и доставка съедают часть выручки.",
      "profs": [
        "cook"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 3000,
      "eff": {
        "social": 0.1,
        "health": -0.1,
        "mental": -0.15
      },
      "career": {
        "raise": 0,
        "promo": 1.05,
        "side": 0.15,
        "burnout": 0.005,
        "injury": 0.0004,
        "fire": 0.0004,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_cook_3",
      "name": "Организация кухонной смены",
      "desc": "Ты учишься распределять задачи и контролировать готовность блюд. Карьерный рост сопровождается высоким темпом и ответственностью.",
      "profs": [
        "cook"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 700,
      "eff": {
        "social": 0.25,
        "skills": 0.15,
        "mental": -0.2
      },
      "career": {
        "raise": 0.02,
        "promo": 1.9,
        "side": 0,
        "burnout": 0.006,
        "injury": 0,
        "fire": 0.0007,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_hairdresser_1",
      "name": "Новые техники на учебных моделях",
      "desc": "Ты отрабатываешь новые техники на обучении и с согласия модели. Расходники и курсы стоят денег, а результат требует практики.",
      "profs": [
        "hairdresser"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 3000,
      "eff": {
        "skills": 0.4,
        "mental": -0.1
      },
      "career": {
        "raise": 0.025,
        "promo": 1.6,
        "side": 0,
        "burnout": 0.002,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_hairdresser_2",
      "name": "Запись постоянных клиентов",
      "desc": "Ты выстраиваешь удобную запись и берёшь несколько дополнительных клиентов. Доход растёт вместе с нагрузкой на руки и спину.",
      "profs": [
        "hairdresser"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 1800,
      "eff": {
        "social": 0.1,
        "health": -0.1,
        "mental": -0.15
      },
      "career": {
        "raise": 0,
        "promo": 1.05,
        "side": 0.15,
        "burnout": 0.005,
        "injury": 0.0004,
        "fire": 0.0004,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_hairdresser_3",
      "name": "Портфолио и консультация клиента",
      "desc": "Ты согласуешь ожидания до работы и собираешь портфолио с разрешения клиентов. Это занимает время, но уменьшает недопонимание.",
      "profs": [
        "hairdresser"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 1000,
      "eff": {
        "skills": 0.25,
        "social": 0.1,
        "mental": -0.05
      },
      "career": {
        "raise": 0.01,
        "promo": 1.3,
        "side": 0,
        "burnout": 0.001,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_cleaner_1",
      "name": "Освоить профессиональное оборудование",
      "desc": "Ты учишься безопасно работать с оборудованием и средствами в пределах инструкций. Нагрузка на внимание растёт, хотя рутина постепенно упрощается.",
      "profs": [
        "cleaner"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 600,
      "eff": {
        "skills": 0.4,
        "mental": -0.1
      },
      "career": {
        "raise": 0.025,
        "promo": 1.6,
        "side": 0,
        "burnout": 0.002,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_cleaner_2",
      "name": "Дополнительные объекты",
      "desc": "Ты берёшь несколько небольших объектов с понятным графиком и оплатой. Дорога и физическая усталость забирают часть выгоды.",
      "profs": [
        "cleaner"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 1200,
      "eff": {
        "skills": 0.1,
        "health": -0.15,
        "mental": -0.1
      },
      "career": {
        "raise": 0,
        "promo": 1,
        "side": 0.2,
        "burnout": 0.005,
        "injury": 0.002,
        "fire": 0.0004,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_cleaner_3",
      "name": "Стабильный посильный график",
      "desc": "Ты выбираешь объём уборки, который можно выдерживать без постоянных подмен. Доход от лишних часов снижается, зато легче восстанавливаться.",
      "profs": [
        "cleaner"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 0,
      "eff": {
        "health": 0.15,
        "mental": 0.25,
        "skills": -0.05
      },
      "career": {
        "raise": 0,
        "promo": 0.85,
        "side": 0,
        "burnout": 0,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_guard_1",
      "name": "Повторить порядок действий на объекте",
      "desc": "Ты изучаешь регламенты и проходишь необходимое обучение для своей роли. Удостоверение частного охранника и специальные допуски проверяются отдельно.",
      "profs": [
        "guard"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 900,
      "eff": {
        "skills": 0.4,
        "mental": -0.1
      },
      "career": {
        "raise": 0.025,
        "promo": 1.6,
        "side": 0,
        "burnout": 0.002,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_guard_2",
      "name": "Контроль передачи смены",
      "desc": "Ты внимательно фиксируешь ключи, оборудование и замечания при передаче поста. Надёжность выше, но документов становится больше.",
      "profs": [
        "guard"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 300,
      "eff": {
        "skills": 0.25,
        "social": 0.1,
        "mental": -0.05
      },
      "career": {
        "raise": 0.01,
        "promo": 1.3,
        "side": 0,
        "burnout": 0.001,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_guard_3",
      "name": "Подмены на согласованных постах",
      "desc": "Ты берёшь законные подмены только на подходящих по допуску объектах. Доплата сопровождается недосыпом и меньшим количеством выходных.",
      "profs": [
        "guard"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 700,
      "eff": {
        "social": 0.1,
        "health": -0.1,
        "mental": -0.15
      },
      "career": {
        "raise": 0,
        "promo": 1.05,
        "side": 0.15,
        "burnout": 0.005,
        "injury": 0.0004,
        "fire": 0.0004,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_courier_1",
      "name": "Планирование маршрутов",
      "desc": "Ты разбираешь типовые маршруты и оставляешь запас времени на сложные адреса. На планирование уходят вечера, зато меньше суеты.",
      "profs": [
        "courier"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 500,
      "eff": {
        "skills": 0.25,
        "social": 0.1,
        "mental": -0.05
      },
      "career": {
        "raise": 0.01,
        "promo": 1.3,
        "side": 0,
        "burnout": 0.001,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_courier_2",
      "name": "Пиковые часы доставки",
      "desc": "Ты берёшь больше заказов в часы спроса без нарушения правил движения. Доход непостоянен, а усталость и риск травмы растут.",
      "profs": [
        "courier"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 1800,
      "eff": {
        "skills": 0.1,
        "health": -0.15,
        "mental": -0.1
      },
      "career": {
        "raise": 0,
        "promo": 1,
        "side": 0.2,
        "burnout": 0.005,
        "injury": 0.002,
        "fire": 0.0004,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_courier_3",
      "name": "Переход к координации доставок",
      "desc": "Ты учишься разбирать статусы заказов и помогать с распределением маршрутов. Это путь к другой роли, но без гарантии назначения.",
      "profs": [
        "courier"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 900,
      "eff": {
        "skills": 0.4,
        "mental": -0.1
      },
      "career": {
        "raise": 0.025,
        "promo": 1.6,
        "side": 0,
        "burnout": 0.002,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_driver_1",
      "name": "Междугородние рейсы",
      "desc": "Ты берёшь более длинные маршруты только на подходящем автомобиле и с нужной категорией прав. Оплата может вырасти, но сон и время дома сокращаются.",
      "profs": [
        "driver"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 3500,
      "eff": {
        "health": -0.15,
        "mental": -0.15
      },
      "career": {
        "raise": 0.015,
        "promo": 1.15,
        "side": 0.12,
        "burnout": 0.006,
        "injury": 0.0015,
        "fire": 0.0005,
        "caseRisk": {}
      },
      "entryRequirements": {
        "vehicleLicense": "По фактическому автомобилю: B, C, D или CE; стаж для категории проверять отдельно."
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_driver_2",
      "name": "Обслуживание и ровный график",
      "desc": "Ты заранее планируешь обслуживание и рабочие часы. Простои становятся предсказуемее, но часть заказов приходится отклонять.",
      "profs": [
        "driver"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 2500,
      "eff": {
        "health": 0.15,
        "mental": 0.25,
        "skills": -0.05
      },
      "career": {
        "raise": 0,
        "promo": 0.85,
        "side": 0,
        "burnout": 0,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_driver_3",
      "name": "Таксовать на себя",
      "desc": "Ты работаешь через легально оформленного перевозчика или в разрешённом самостоятельном формате и считаешь расходы. Комиссии и обслуживание уменьшают выручку, а усталость растёт.",
      "profs": [
        "driver"
      ],
      "ages": [
        21,
        100
      ],
      "cost": 4500,
      "eff": {
        "skills": 0.1,
        "health": -0.15,
        "mental": -0.15
      },
      "career": {
        "raise": 0,
        "promo": 1,
        "side": 0.23,
        "burnout": 0.006,
        "injury": 0.0013,
        "fire": 0.0004,
        "caseRisk": {}
      },
      "when": {
        "year": [
          1992,
          2035
        ],
        "employed": true
      },
      "entryRequirementRef": "taxi_driver"
    },
    {
      "id": "cf_doctor_1",
      "name": "Подготовка к квалификационной категории",
      "desc": "Ты разбираешь клинические случаи и готовишь документы по своей специальности. Категория и допуск требуют отдельной процедуры, а учёба утомляет.",
      "profs": [
        "doctor"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 3000,
      "eff": {
        "skills": 0.4,
        "mental": -0.1
      },
      "career": {
        "raise": 0.025,
        "promo": 1.6,
        "side": 0,
        "burnout": 0.002,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_doctor_2",
      "name": "Подработка в частной клинике",
      "desc": "Ты принимаешь дополнительные часы в лицензированной клинике в пределах аккредитации и договорных ограничений. Доход выше, но отдых короче.",
      "profs": [
        "doctor"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 1500,
      "eff": {
        "skills": 0.15,
        "health": -0.05,
        "mental": -0.2
      },
      "career": {
        "raise": 0,
        "promo": 1,
        "side": 0.22,
        "burnout": 0.006,
        "injury": 0.0001,
        "fire": 0.0005,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_doctor_3",
      "name": "Клиническое качество и наставничество",
      "desc": "Ты участвуешь в разборе качества и обучении коллег без раскрытия лишних данных пациента. Ответственность и эмоциональная нагрузка возрастают.",
      "profs": [
        "doctor"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 1800,
      "eff": {
        "social": 0.25,
        "skills": 0.15,
        "mental": -0.2
      },
      "career": {
        "raise": 0.02,
        "promo": 1.9,
        "side": 0,
        "burnout": 0.006,
        "injury": 0,
        "fire": 0.0007,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_nurse_1",
      "name": "Профильное повышение квалификации",
      "desc": "Ты учишься новым для своей должности процедурам и повторяешь порядок допуска. Обучение требует времени и не заменяет аккредитацию.",
      "profs": [
        "nurse"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 1800,
      "eff": {
        "skills": 0.4,
        "mental": -0.1
      },
      "career": {
        "raise": 0.025,
        "promo": 1.6,
        "side": 0,
        "burnout": 0.002,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_nurse_2",
      "name": "Дополнительные дежурства",
      "desc": "Ты берёшь оформленные дежурства в пределах квалификации. Оплата увеличивается вместе с недосыпом и физической нагрузкой.",
      "profs": [
        "nurse"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 900,
      "eff": {
        "skills": 0.15,
        "health": -0.05,
        "mental": -0.2
      },
      "career": {
        "raise": 0,
        "promo": 1,
        "side": 0.22,
        "burnout": 0.006,
        "injury": 0.0001,
        "fire": 0.0005,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_nurse_3",
      "name": "Безопасная передача смены",
      "desc": "Ты внимательно ведёшь передачу информации и проверяешь поручения в пределах своей роли. Качество работы растёт, но рутины становится больше.",
      "profs": [
        "nurse"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 300,
      "eff": {
        "skills": 0.25,
        "social": 0.1,
        "mental": -0.05
      },
      "career": {
        "raise": 0.01,
        "promo": 1.3,
        "side": 0,
        "burnout": 0.001,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_pharmacist_1",
      "name": "Фармацевтическая квалификация",
      "desc": "Ты повторяешь правила отпуска и учёта препаратов и проходишь нужное обучение. Это укрепляет квалификацию, но отнимает время после смены.",
      "profs": [
        "pharmacist"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 1700,
      "eff": {
        "skills": 0.4,
        "mental": -0.1
      },
      "career": {
        "raise": 0.025,
        "promo": 1.6,
        "side": 0,
        "burnout": 0.002,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_pharmacist_2",
      "name": "Подмены в аптеке",
      "desc": "Ты берёшь дополнительные часы там, где подходит твой профессиональный допуск. Доход растёт, но стоять и общаться приходится дольше.",
      "profs": [
        "pharmacist"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 700,
      "eff": {
        "social": 0.1,
        "health": -0.1,
        "mental": -0.15
      },
      "career": {
        "raise": 0,
        "promo": 1.05,
        "side": 0.15,
        "burnout": 0.005,
        "injury": 0.0004,
        "fire": 0.0004,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_pharmacist_3",
      "name": "Учёт и хранение препаратов",
      "desc": "Ты сосредоточиваешься на правильном учёте и условиях хранения. Ответственность выше, а на сверку уходят силы.",
      "profs": [
        "pharmacist"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 500,
      "eff": {
        "skills": 0.25,
        "social": 0.1,
        "mental": -0.05
      },
      "career": {
        "raise": 0.01,
        "promo": 1.3,
        "side": 0,
        "burnout": 0.001,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_teacher_1",
      "name": "Предметная методика",
      "desc": "Ты обновляешь материалы и осваиваешь способы объяснять сложные темы. Подготовка помогает занятиям, но занимает вечера.",
      "profs": [
        "teacher"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 1600,
      "eff": {
        "skills": 0.4,
        "mental": -0.1
      },
      "career": {
        "raise": 0.025,
        "promo": 1.6,
        "side": 0,
        "burnout": 0.002,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_teacher_2",
      "name": "Репетиторство",
      "desc": "Ты берёшь небольшое число учеников с соблюдением правил конфликта интересов и оформления дохода. Подработка сокращает время на отдых.",
      "profs": [
        "teacher"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 1800,
      "eff": {
        "skills": 0.15,
        "health": -0.05,
        "mental": -0.2
      },
      "career": {
        "raise": 0,
        "promo": 1,
        "side": 0.22,
        "burnout": 0.006,
        "injury": 0.0001,
        "fire": 0.0005,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_teacher_3",
      "name": "Классное руководство и олимпиады",
      "desc": "Ты организуешь встречи, поездки и подготовку учеников без обещаний побед. Общение и влияние растут вместе с нагрузкой.",
      "profs": [
        "teacher"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 1000,
      "eff": {
        "social": 0.25,
        "skills": 0.15,
        "mental": -0.2
      },
      "career": {
        "raise": 0.02,
        "promo": 1.9,
        "side": 0,
        "burnout": 0.006,
        "injury": 0,
        "fire": 0.0007,
        "caseRisk": {}
      },
      "when": {
        "prof": [
          "teacher"
        ],
        "employed": true
      }
    },
    {
      "id": "cf_kgteacher_1",
      "name": "Методика дошкольных занятий",
      "desc": "Ты готовишь занятия с учётом возраста и осваиваешь подходящие материалы. Подготовка требует времени и умеренных расходов.",
      "profs": [
        "kgteacher"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 1200,
      "eff": {
        "skills": 0.4,
        "mental": -0.1
      },
      "career": {
        "raise": 0.025,
        "promo": 1.6,
        "side": 0,
        "burnout": 0.002,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_kgteacher_2",
      "name": "Оформленные подмены в группе",
      "desc": "Ты берёшь отдельные согласованные подмены в рамках квалификации и рабочего времени. Доплата идёт вместе с эмоциональной усталостью.",
      "profs": [
        "kgteacher"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 500,
      "eff": {
        "social": 0.1,
        "health": -0.1,
        "mental": -0.15
      },
      "career": {
        "raise": 0,
        "promo": 1.05,
        "side": 0.15,
        "burnout": 0.005,
        "injury": 0.0004,
        "fire": 0.0004,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_kgteacher_3",
      "name": "Работа с родителями",
      "desc": "Ты выстраиваешь понятные встречи и обсуждаешь наблюдения без сравнений детей. Социальные навыки растут, но сложных разговоров больше.",
      "profs": [
        "kgteacher"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 600,
      "eff": {
        "skills": 0.25,
        "social": 0.1,
        "mental": -0.05
      },
      "career": {
        "raise": 0.01,
        "promo": 1.3,
        "side": 0,
        "burnout": 0.001,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_coach_1",
      "name": "Планирование и тренерское обучение",
      "desc": "Ты учишься планировать нагрузку и готовишься к подтверждению квалификации. Спортивный опыт полезен, но сам по себе не выдаёт допуск.",
      "profs": [
        "coach"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 2400,
      "eff": {
        "skills": 0.4,
        "mental": -0.1
      },
      "career": {
        "raise": 0.025,
        "promo": 1.6,
        "side": 0,
        "burnout": 0.002,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_coach_2",
      "name": "Дополнительные законные занятия",
      "desc": "Ты берёшь посильную группу или индивидуальные занятия в пределах подготовки. Доход выше, но восстановление сокращается.",
      "profs": [
        "coach"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 1800,
      "eff": {
        "skills": 0.15,
        "health": -0.05,
        "mental": -0.2
      },
      "career": {
        "raise": 0,
        "promo": 1,
        "side": 0.22,
        "burnout": 0.006,
        "injury": 0.0001,
        "fire": 0.0005,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_coach_3",
      "name": "Подготовка команды к соревнованиям",
      "desc": "Ты координируешь подготовку и поездки, согласуя нагрузку и безопасность. Возможности роста сопровождаются ответственностью и стрессом.",
      "profs": [
        "coach"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 2200,
      "eff": {
        "social": 0.25,
        "skills": 0.15,
        "mental": -0.2
      },
      "career": {
        "raise": 0.02,
        "promo": 1.9,
        "side": 0,
        "burnout": 0.006,
        "injury": 0,
        "fire": 0.0007,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_police_1",
      "name": "Профильная учёба в системе МВД",
      "desc": "Ты готовишься к профильному обучению и повышению квалификации для своей должности. Поступление и назначение проходят отдельно, а свободного времени меньше.",
      "profs": [
        "police"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 1400,
      "eff": {
        "skills": 0.4,
        "mental": -0.1
      },
      "career": {
        "raise": 0.025,
        "promo": 1.6,
        "side": 0,
        "burnout": 0.002,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_police_2",
      "name": "Деньги за служебное решение",
      "desc": "Ты соглашаешься на вознаграждение за использование полномочий. Временный доход сопровождается риском уголовного дела и потери службы.",
      "profs": [
        "police"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 0,
      "eff": {
        "mental": -0.15,
        "social": 0.05
      },
      "career": {
        "raise": 0,
        "promo": 1,
        "side": 0.3,
        "burnout": 0.004,
        "injury": 0,
        "fire": 0.001,
        "caseRisk": {
          "bribe290": 0.0015
        }
      },
      "when": {
        "year": [
          1997,
          2035
        ],
        "employed": true
      }
    },
    {
      "id": "cf_police_3",
      "name": "Точный учёт служебных действий",
      "desc": "Ты внимательно оформляешь решения и разбираешь правовые основания. Ответственность остаётся высокой, а работа с документами утомляет.",
      "profs": [
        "police"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 400,
      "eff": {
        "skills": 0.25,
        "social": 0.1,
        "mental": -0.05
      },
      "career": {
        "raise": 0.01,
        "promo": 1.3,
        "side": 0,
        "burnout": 0.001,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_military_1",
      "name": "Подготовка по специальности",
      "desc": "Ты совершенствуешь подготовку по своей военно-учётной специальности в установленном порядке. Рост навыка требует времени и нагрузки.",
      "profs": [
        "military"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 700,
      "eff": {
        "skills": 0.4,
        "mental": -0.1
      },
      "career": {
        "raise": 0.025,
        "promo": 1.6,
        "side": 0,
        "burnout": 0.002,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_military_2",
      "name": "Работа младшим командиром",
      "desc": "Ты учишься распределять задачи и отвечать за подготовку подчинённых. Возможность назначения сопровождается стрессом и большей ответственностью.",
      "profs": [
        "military"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 400,
      "eff": {
        "social": 0.25,
        "skills": 0.15,
        "mental": -0.2
      },
      "career": {
        "raise": 0.02,
        "promo": 1.9,
        "side": 0,
        "burnout": 0.006,
        "injury": 0,
        "fire": 0.0007,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_military_3",
      "name": "Режим и восстановление после службы",
      "desc": "Ты используешь доступное время для сна и разрешённого восстановления. Это помогает состоянию, но оставляет меньше времени на самостоятельную учёбу.",
      "profs": [
        "military"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 1000,
      "eff": {
        "health": 0.15,
        "mental": 0.25,
        "skills": -0.05
      },
      "career": {
        "raise": 0,
        "promo": 0.85,
        "side": 0,
        "burnout": 0,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_firefighter_1",
      "name": "Подготовка и разбор действий",
      "desc": "Ты отрабатываешь процедуры в рамках организованного обучения и разбираешь выезды. Учебная нагрузка требует сил даже без происшествий.",
      "profs": [
        "firefighter"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 800,
      "eff": {
        "skills": 0.4,
        "mental": -0.1
      },
      "career": {
        "raise": 0.025,
        "promo": 1.6,
        "side": 0,
        "burnout": 0.002,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_firefighter_2",
      "name": "Координация караула",
      "desc": "Ты учишься передавать задачи и поддерживать готовность подразделения. Ответственность и напряжение растут вместе с заметностью.",
      "profs": [
        "firefighter"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 400,
      "eff": {
        "social": 0.25,
        "skills": 0.15,
        "mental": -0.2
      },
      "career": {
        "raise": 0.02,
        "promo": 1.9,
        "side": 0,
        "burnout": 0.006,
        "injury": 0,
        "fire": 0.0007,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_firefighter_3",
      "name": "Восстановление между сменами",
      "desc": "Ты бережёшь сон и пользуешься доступной профессиональной поддержкой. Меньше сил остаётся на подмены и посторонние заказы.",
      "profs": [
        "firefighter"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 1200,
      "eff": {
        "health": 0.15,
        "mental": 0.25,
        "skills": -0.05
      },
      "career": {
        "raise": 0,
        "promo": 0.85,
        "side": 0,
        "burnout": 0,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_office_1",
      "name": "Офисные инструменты и отчётность",
      "desc": "Ты осваиваешь таблицы, документооборот и проверку данных. Навык растёт, но учёба занимает часть свободного времени.",
      "profs": [
        "office"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 1500,
      "eff": {
        "skills": 0.4,
        "mental": -0.1
      },
      "career": {
        "raise": 0.025,
        "promo": 1.6,
        "side": 0,
        "burnout": 0.002,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_office_2",
      "name": "Небольшие внешние проекты",
      "desc": "Ты берёшь разрешённые договором задачи вне основной работы. Дополнительный доход зависит от заказов и уменьшает отдых.",
      "profs": [
        "office"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 1000,
      "eff": {
        "skills": 0.15,
        "health": -0.1,
        "mental": -0.15
      },
      "career": {
        "raise": 0,
        "promo": 1,
        "side": 0.2,
        "burnout": 0.005,
        "injury": 0,
        "fire": 0.0005,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_office_3",
      "name": "Координация команды",
      "desc": "Ты берёшь на себя согласование сроков и понятную передачу задач. Карьерные возможности растут вместе с количеством сложных разговоров.",
      "profs": [
        "office"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 700,
      "eff": {
        "social": 0.25,
        "skills": 0.15,
        "mental": -0.2
      },
      "career": {
        "raise": 0.02,
        "promo": 1.9,
        "side": 0,
        "burnout": 0.006,
        "injury": 0,
        "fire": 0.0007,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_accountant_1",
      "name": "Обновление профессиональных знаний",
      "desc": "Ты разбираешь изменения учёта и проверяешь расчёты на учебных примерах. Курсы стоят денег, а сроки основной работы остаются.",
      "profs": [
        "accountant"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 2200,
      "eff": {
        "skills": 0.4,
        "mental": -0.1
      },
      "career": {
        "raise": 0.025,
        "promo": 1.6,
        "side": 0,
        "burnout": 0.002,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_accountant_2",
      "name": "Учёт для небольшой организации",
      "desc": "Ты ведёшь дополнительного клиента с оформленным объёмом ответственности. Подработка требует внимания и усиливает нагрузку в отчётные периоды.",
      "profs": [
        "accountant"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 1700,
      "eff": {
        "skills": 0.15,
        "health": -0.05,
        "mental": -0.2
      },
      "career": {
        "raise": 0,
        "promo": 1,
        "side": 0.22,
        "burnout": 0.006,
        "injury": 0.0001,
        "fire": 0.0005,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_accountant_3",
      "name": "Внутренний контроль документов",
      "desc": "Ты настраиваешь сверку первичных документов и понятный порядок исправлений. Это помогает качеству, но увеличивает рутинную нагрузку.",
      "profs": [
        "accountant"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 900,
      "eff": {
        "skills": 0.25,
        "social": 0.1,
        "mental": -0.05
      },
      "career": {
        "raise": 0.01,
        "promo": 1.3,
        "side": 0,
        "burnout": 0.001,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_economist_1",
      "name": "Аналитика затрат",
      "desc": "Ты учишься проверять допущения и строить прозрачные модели затрат. Навык растёт, но больше времени уходит на проверку источников.",
      "profs": [
        "economist"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 1800,
      "eff": {
        "skills": 0.4,
        "mental": -0.1
      },
      "career": {
        "raise": 0.025,
        "promo": 1.6,
        "side": 0,
        "burnout": 0.002,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_economist_2",
      "name": "Расчёты для внешних проектов",
      "desc": "Ты берёшь разрешённые небольшие расчётные задачи с понятным заданием. Доход непостоянен, а сроки могут пересекаться.",
      "profs": [
        "economist"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 1200,
      "eff": {
        "skills": 0.15,
        "health": -0.1,
        "mental": -0.15
      },
      "career": {
        "raise": 0,
        "promo": 1,
        "side": 0.2,
        "burnout": 0.005,
        "injury": 0,
        "fire": 0.0005,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_economist_3",
      "name": "Планирование вместе с подразделениями",
      "desc": "Ты согласуешь предпосылки планов с коллегами и объясняешь ограничения расчётов. Социальные навыки растут вместе с ответственностью.",
      "profs": [
        "economist"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 700,
      "eff": {
        "social": 0.25,
        "skills": 0.15,
        "mental": -0.2
      },
      "career": {
        "raise": 0.02,
        "promo": 1.9,
        "side": 0,
        "burnout": 0.006,
        "injury": 0,
        "fire": 0.0007,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_lawyer_1",
      "name": "Практика договоров и актуальные нормы",
      "desc": "Ты разбираешь судебную практику и обновляешь шаблоны под конкретные задачи. Обучение требует расходов и внимательного чтения.",
      "profs": [
        "lawyer"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 2500,
      "eff": {
        "skills": 0.4,
        "mental": -0.1
      },
      "career": {
        "raise": 0.025,
        "promo": 1.6,
        "side": 0,
        "burnout": 0.002,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_lawyer_2",
      "name": "Разрешённые частные консультации",
      "desc": "Ты берёшь дополнительные вопросы в пределах компетенции, сохраняя конфиденциальность. Доход растёт, но статус адвоката таким фокусом не присваивается.",
      "profs": [
        "lawyer"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 1800,
      "eff": {
        "skills": 0.15,
        "health": -0.05,
        "mental": -0.2
      },
      "career": {
        "raise": 0,
        "promo": 1,
        "side": 0.22,
        "burnout": 0.006,
        "injury": 0.0001,
        "fire": 0.0005,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_lawyer_3",
      "name": "Согласование правовых рисков",
      "desc": "Ты объясняешь коллегам варианты и последствия решений без обещания гарантированного исхода. Карьерный рост идёт вместе со сложными переговорами.",
      "profs": [
        "lawyer"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 1000,
      "eff": {
        "social": 0.25,
        "skills": 0.15,
        "mental": -0.2
      },
      "career": {
        "raise": 0.02,
        "promo": 1.9,
        "side": 0,
        "burnout": 0.006,
        "injury": 0,
        "fire": 0.0007,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_manager_1",
      "name": "Обучение управлению людьми",
      "desc": "Ты осваиваешь распределение задач, обратную связь и планирование нагрузки. Учёба помогает работе, но отнимает вечера.",
      "profs": [
        "manager"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 2500,
      "eff": {
        "skills": 0.4,
        "mental": -0.1
      },
      "career": {
        "raise": 0.025,
        "promo": 1.6,
        "side": 0,
        "burnout": 0.002,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_manager_2",
      "name": "Сложный проект подразделения",
      "desc": "Ты берёшь ответственность за проект с несколькими участниками и ограниченным сроком. Шансы роста увеличиваются вместе со стрессом.",
      "profs": [
        "manager"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 1800,
      "eff": {
        "social": 0.25,
        "skills": 0.15,
        "mental": -0.2
      },
      "career": {
        "raise": 0.02,
        "promo": 1.9,
        "side": 0,
        "burnout": 0.006,
        "injury": 0,
        "fire": 0.0007,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_manager_3",
      "name": "Ровный график для команды",
      "desc": "Ты уменьшаешь хаотичные переработки и заранее согласуешь приоритеты. Восстановление лучше, но быстрых видимых побед может стать меньше.",
      "profs": [
        "manager"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 500,
      "eff": {
        "health": 0.15,
        "mental": 0.25,
        "skills": -0.05
      },
      "career": {
        "raise": 0,
        "promo": 0.85,
        "side": 0,
        "burnout": 0,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_official_1",
      "name": "Профильное служебное обучение",
      "desc": "Ты проходишь обучение по своим должностным обязанностям и работе с обращениями. Назначение на другую должность всё равно требует установленной процедуры.",
      "profs": [
        "official"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 800,
      "eff": {
        "skills": 0.4,
        "mental": -0.1
      },
      "career": {
        "raise": 0.025,
        "promo": 1.6,
        "side": 0,
        "burnout": 0.002,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_official_2",
      "name": "Вознаграждение за полномочия",
      "desc": "Ты принимаешь деньги за служебное решение в интересах плательщика. Доход сопровождается риском дела о взятке и утраты должности.",
      "profs": [
        "official"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 0,
      "eff": {
        "mental": -0.15,
        "social": 0.05
      },
      "career": {
        "raise": 0,
        "promo": 1,
        "side": 0.3,
        "burnout": 0.004,
        "injury": 0,
        "fire": 0.001,
        "caseRisk": {
          "bribe290": 0.0015
        }
      },
      "when": {
        "year": [
          1997,
          2035
        ],
        "employed": true
      }
    },
    {
      "id": "cf_official_3",
      "name": "Понятная работа с обращениями",
      "desc": "Ты проверяешь сроки и основания ответов и объясняешь заявителям пределы полномочий. Навык общения растёт вместе с эмоциональной нагрузкой.",
      "profs": [
        "official"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 300,
      "eff": {
        "skills": 0.25,
        "social": 0.1,
        "mental": -0.05
      },
      "career": {
        "raise": 0.01,
        "promo": 1.3,
        "side": 0,
        "burnout": 0.001,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_it_1",
      "name": "Системное развитие технических навыков",
      "desc": "Ты разбираешь устройство систем и пишешь учебные решения без рабочих секретов. Рост квалификации требует времени за экраном.",
      "profs": [
        "it"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 2200,
      "eff": {
        "skills": 0.4,
        "mental": -0.1
      },
      "career": {
        "raise": 0.025,
        "promo": 1.6,
        "side": 0,
        "burnout": 0.002,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "year": [
          1998,
          2035
        ],
        "employed": true
      }
    },
    {
      "id": "cf_it_2",
      "name": "Фриланс по договорённости",
      "desc": "Ты берёшь небольшие внешние задачи с учётом договора и конфиденциальности. Доход зависит от заказов, а отдых становится короче.",
      "profs": [
        "it"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 1800,
      "eff": {
        "skills": 0.15,
        "health": -0.1,
        "mental": -0.15
      },
      "career": {
        "raise": 0,
        "promo": 1,
        "side": 0.2,
        "burnout": 0.005,
        "injury": 0,
        "fire": 0.0005,
        "caseRisk": {}
      },
      "when": {
        "year": [
          1998,
          2035
        ],
        "employed": true
      }
    },
    {
      "id": "cf_it_3",
      "name": "Координация разработки",
      "desc": "Ты учишься согласовывать решения, сроки и поддержку. Карьерные возможности растут вместе с ответственностью за чужие зависимости.",
      "profs": [
        "it"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 1200,
      "eff": {
        "social": 0.25,
        "skills": 0.15,
        "mental": -0.2
      },
      "career": {
        "raise": 0.02,
        "promo": 1.9,
        "side": 0,
        "burnout": 0.006,
        "injury": 0,
        "fire": 0.0007,
        "caseRisk": {}
      },
      "when": {
        "year": [
          1998,
          2035
        ],
        "employed": true
      }
    },
    {
      "id": "cf_designer_1",
      "name": "Навыки и разбор портфолио",
      "desc": "Ты обновляешь инструменты и дорабатываешь учебные работы. Обучение и материалы стоят денег, а практика занимает вечера.",
      "profs": [
        "designer"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 2600,
      "eff": {
        "skills": 0.4,
        "mental": -0.1
      },
      "career": {
        "raise": 0.025,
        "promo": 1.6,
        "side": 0,
        "burnout": 0.002,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "year": [
          1998,
          2035
        ],
        "employed": true
      }
    },
    {
      "id": "cf_designer_2",
      "name": "Частные дизайнерские заказы",
      "desc": "Ты берёшь посильные задачи с согласованными правами и числом правок. Доход растёт вместе со временем за экраном и общением с клиентом.",
      "profs": [
        "designer"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 1700,
      "eff": {
        "skills": 0.15,
        "health": -0.1,
        "mental": -0.15
      },
      "career": {
        "raise": 0,
        "promo": 1,
        "side": 0.2,
        "burnout": 0.005,
        "injury": 0,
        "fire": 0.0005,
        "caseRisk": {}
      },
      "when": {
        "year": [
          1998,
          2035
        ],
        "employed": true
      }
    },
    {
      "id": "cf_designer_3",
      "name": "Дизайн-система и передача работы",
      "desc": "Ты выстраиваешь понятные правила и объясняешь решения команде. Возрастает влияние на проект, но больше времени уходит на согласования.",
      "profs": [
        "designer"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 1200,
      "eff": {
        "social": 0.25,
        "skills": 0.15,
        "mental": -0.2
      },
      "career": {
        "raise": 0.02,
        "promo": 1.9,
        "side": 0,
        "burnout": 0.006,
        "injury": 0,
        "fire": 0.0007,
        "caseRisk": {}
      },
      "when": {
        "year": [
          1998,
          2035
        ],
        "employed": true
      }
    },
    {
      "id": "cf_scientist_1",
      "name": "Методика и воспроизводимость",
      "desc": "Ты изучаешь методы и приводишь рабочие материалы в проверяемый вид. Глубина растёт, но быстрых публикаций может стать меньше.",
      "profs": [
        "scientist"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 1800,
      "eff": {
        "skills": 0.4,
        "mental": -0.1
      },
      "career": {
        "raise": 0.025,
        "promo": 1.6,
        "side": 0,
        "burnout": 0.002,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_scientist_2",
      "name": "Разрешённые прикладные проекты",
      "desc": "Ты берёшь внешнюю аналитическую задачу с понятными правами на результат. Подработка сокращает время на основное исследование.",
      "profs": [
        "scientist"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 1500,
      "eff": {
        "skills": 0.15,
        "health": -0.05,
        "mental": -0.2
      },
      "career": {
        "raise": 0,
        "promo": 1,
        "side": 0.22,
        "burnout": 0.006,
        "injury": 0.0001,
        "fire": 0.0005,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_scientist_3",
      "name": "Организация исследовательского проекта",
      "desc": "Ты согласуешь задачи, источники финансирования и распределение работы. Возможность роста сопровождается отчётностью и стрессом.",
      "profs": [
        "scientist"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 1200,
      "eff": {
        "social": 0.25,
        "skills": 0.15,
        "mental": -0.2
      },
      "career": {
        "raise": 0.02,
        "promo": 1.9,
        "side": 0,
        "burnout": 0.006,
        "injury": 0,
        "fire": 0.0007,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_journalist_1",
      "name": "Проверка фактов и работа с источниками",
      "desc": "Ты совершенствуешь проверку данных и аккуратную работу с цитатами. Материалы выходят медленнее, зато квалификация растёт.",
      "profs": [
        "journalist"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 1600,
      "eff": {
        "skills": 0.4,
        "mental": -0.1
      },
      "career": {
        "raise": 0.025,
        "promo": 1.6,
        "side": 0,
        "burnout": 0.002,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_journalist_2",
      "name": "Внешние редакционные заказы",
      "desc": "Ты берёшь дополнительные материалы с обозначенными условиями публикации. Доход непостоянен, а дедлайнов становится больше.",
      "profs": [
        "journalist"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 1300,
      "eff": {
        "skills": 0.15,
        "health": -0.1,
        "mental": -0.15
      },
      "career": {
        "raise": 0,
        "promo": 1,
        "side": 0.2,
        "burnout": 0.005,
        "injury": 0,
        "fire": 0.0005,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_journalist_3",
      "name": "Редактирование и организация выпуска",
      "desc": "Ты учишься согласовывать работу авторов и проверять готовность материалов. Ответственность и число конфликтов сроков увеличиваются.",
      "profs": [
        "journalist"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 1000,
      "eff": {
        "social": 0.25,
        "skills": 0.15,
        "mental": -0.2
      },
      "career": {
        "raise": 0.02,
        "promo": 1.9,
        "side": 0,
        "burnout": 0.006,
        "injury": 0,
        "fire": 0.0007,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_psychologist_1",
      "name": "Профессиональное обучение и супервизия",
      "desc": "Ты разбираешь работу с квалифицированным специалистом, соблюдая конфиденциальность. Это стоит денег и не заменяет необходимое образование.",
      "profs": [
        "psychologist"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 4000,
      "eff": {
        "skills": 0.4,
        "mental": -0.1
      },
      "career": {
        "raise": 0.025,
        "promo": 1.6,
        "side": 0,
        "burnout": 0.002,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_psychologist_2",
      "name": "Ограниченная дополнительная практика",
      "desc": "Ты берёшь несколько дополнительных консультаций только в пределах подготовки и разрешённых условий. Доход сопровождается эмоциональной нагрузкой.",
      "profs": [
        "psychologist"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 2000,
      "eff": {
        "skills": 0.15,
        "health": -0.05,
        "mental": -0.2
      },
      "career": {
        "raise": 0,
        "promo": 1,
        "side": 0.22,
        "burnout": 0.006,
        "injury": 0.0001,
        "fire": 0.0005,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_psychologist_3",
      "name": "Посильная нагрузка и границы",
      "desc": "Ты ограничиваешь число встреч и время доступности, сохраняя порядок направления к другим специалистам. Доход от дополнительных приёмов ниже, восстановление лучше.",
      "profs": [
        "psychologist"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 1800,
      "eff": {
        "health": 0.15,
        "mental": 0.25,
        "skills": -0.05
      },
      "career": {
        "raise": 0,
        "promo": 0.85,
        "side": 0,
        "burnout": 0,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_actor_1",
      "name": "Репетиции и профессиональные пробы",
      "desc": "Ты готовишь материал и участвуешь в пробах с ясными условиями. Навык растёт, но затраты не гарантируют роль.",
      "profs": [
        "actor"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 3000,
      "eff": {
        "skills": 0.4,
        "mental": -0.1
      },
      "career": {
        "raise": 0.025,
        "promo": 1.6,
        "side": 0,
        "burnout": 0.002,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_actor_2",
      "name": "Ведение небольших мероприятий",
      "desc": "Ты берёшь дополнительные выступления по договорённости с понятным сценарием. Доход зависит от заказов и сокращает выходные.",
      "profs": [
        "actor"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 2500,
      "eff": {
        "social": 0.1,
        "skills": 0.1,
        "mental": -0.15
      },
      "career": {
        "raise": 0,
        "promo": 1,
        "side": 0.18,
        "burnout": 0.004,
        "injury": 0.0001,
        "fire": 0.0003,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_actor_3",
      "name": "Организация собственного проекта",
      "desc": "Ты собираешь небольшую команду и согласуешь права и расходы. Это развивает навыки, но добавляет финансовое и эмоциональное напряжение.",
      "profs": [
        "actor"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 4500,
      "eff": {
        "social": 0.25,
        "skills": 0.15,
        "mental": -0.2
      },
      "career": {
        "raise": 0.02,
        "promo": 1.9,
        "side": 0,
        "burnout": 0.006,
        "injury": 0,
        "fire": 0.0007,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_musician_1",
      "name": "Репертуар и регулярная практика",
      "desc": "Ты планово занимаешься техникой и разбираешь новые произведения. Навык растёт, но занятиями легко вытеснить отдых.",
      "profs": [
        "musician"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 2500,
      "eff": {
        "skills": 0.4,
        "mental": -0.1
      },
      "career": {
        "raise": 0.025,
        "promo": 1.6,
        "side": 0,
        "burnout": 0.002,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_musician_2",
      "name": "Дополнительные выступления",
      "desc": "Ты берёшь посильные выступления с заранее согласованной оплатой и правами. Доход непостоянен, а дорога и подготовка утомляют.",
      "profs": [
        "musician"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 3000,
      "eff": {
        "social": 0.1,
        "skills": 0.1,
        "mental": -0.15
      },
      "career": {
        "raise": 0,
        "promo": 1,
        "side": 0.18,
        "burnout": 0.004,
        "injury": 0.0001,
        "fire": 0.0003,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_musician_3",
      "name": "Работа с ансамблем",
      "desc": "Ты учишься организовывать репетиции и согласовывать решения с другими музыкантами. Карьерные возможности сопровождаются сложными переговорами.",
      "profs": [
        "musician"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 1800,
      "eff": {
        "social": 0.25,
        "skills": 0.15,
        "mental": -0.2
      },
      "career": {
        "raise": 0.02,
        "promo": 1.9,
        "side": 0,
        "burnout": 0.006,
        "injury": 0,
        "fire": 0.0007,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_artist_1",
      "name": "Учебные этюды и новые материалы",
      "desc": "Ты работаешь над техникой и получаешь разбор своих работ. Расходники стоят денег, а результат требует регулярности.",
      "profs": [
        "artist"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 2800,
      "eff": {
        "skills": 0.4,
        "mental": -0.1
      },
      "career": {
        "raise": 0.025,
        "promo": 1.6,
        "side": 0,
        "burnout": 0.002,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_artist_2",
      "name": "Иллюстрации и портреты на заказ",
      "desc": "Ты берёшь небольшой объём внешних заказов с согласованными правками и правами. Доход растёт вместе с нагрузкой на глаза и руки.",
      "profs": [
        "artist"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 2200,
      "eff": {
        "social": 0.1,
        "skills": 0.1,
        "mental": -0.15
      },
      "career": {
        "raise": 0,
        "promo": 1,
        "side": 0.18,
        "burnout": 0.004,
        "injury": 0.0001,
        "fire": 0.0003,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_artist_3",
      "name": "Выставочный проект",
      "desc": "Ты готовишь серию работ и обсуждаешь условия показа и продажи. Навыки продвижения растут, но расходы могут не окупиться.",
      "profs": [
        "artist"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 4000,
      "eff": {
        "social": 0.25,
        "skills": 0.15,
        "mental": -0.2
      },
      "career": {
        "raise": 0.02,
        "promo": 1.9,
        "side": 0,
        "burnout": 0.006,
        "injury": 0,
        "fire": 0.0007,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_railway_1",
      "name": "Профильная подготовка на транспорте",
      "desc": "Ты готовишься к следующему уровню квалификации по своей должности. Обучение и экзамены проходят отдельно и требуют времени.",
      "profs": [
        "railway"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 1600,
      "eff": {
        "skills": 0.4,
        "mental": -0.1
      },
      "career": {
        "raise": 0.025,
        "promo": 1.6,
        "side": 0,
        "burnout": 0.002,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_railway_2",
      "name": "Точность передачи смены",
      "desc": "Ты внимательно ведёшь записи и проверяешь порядок передачи информации. Это укрепляет профессиональную надёжность, но добавляет рутины.",
      "profs": [
        "railway"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 400,
      "eff": {
        "skills": 0.25,
        "social": 0.1,
        "mental": -0.05
      },
      "career": {
        "raise": 0.01,
        "promo": 1.3,
        "side": 0,
        "burnout": 0.001,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_railway_3",
      "name": "Восстановление между сменами",
      "desc": "Ты бережёшь сон и заранее планируешь бытовые дела между сменами. Меньше времени остаётся на дополнительный заработок.",
      "profs": [
        "railway"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 1200,
      "eff": {
        "health": 0.15,
        "mental": 0.25,
        "skills": -0.05
      },
      "career": {
        "raise": 0,
        "promo": 0.85,
        "side": 0,
        "burnout": 0,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_pilot_1",
      "name": "Подготовка по типу и процедурам",
      "desc": "Ты участвуешь в организованной подготовке и поддерживаешь необходимую квалификацию. Лётное свидетельство и допуски проверяются отдельно, а учёба утомляет.",
      "profs": [
        "pilot"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 2200,
      "eff": {
        "skills": 0.4,
        "mental": -0.1
      },
      "career": {
        "raise": 0.025,
        "promo": 1.6,
        "side": 0,
        "burnout": 0.002,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_pilot_2",
      "name": "Наставничество в пределах допуска",
      "desc": "Ты помогаешь коллегам разбирать рабочие процедуры только в разрешённой роли. Карьерный рост сопровождается высокой ответственностью.",
      "profs": [
        "pilot"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 1000,
      "eff": {
        "social": 0.25,
        "skills": 0.15,
        "mental": -0.2
      },
      "career": {
        "raise": 0.02,
        "promo": 1.9,
        "side": 0,
        "burnout": 0.006,
        "injury": 0,
        "fire": 0.0007,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_pilot_3",
      "name": "Управление усталостью",
      "desc": "Ты согласуешь посильный график и сохраняешь время для сна и восстановления. Часть дополнительных часов оказывается недоступна.",
      "profs": [
        "pilot"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 2200,
      "eff": {
        "health": 0.15,
        "mental": 0.25,
        "skills": -0.05
      },
      "career": {
        "raise": 0,
        "promo": 0.85,
        "side": 0,
        "burnout": 0,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_agro_1",
      "name": "Новая агротехника и организация работ",
      "desc": "Ты изучаешь технологии своей сельской специальности и безопасную работу. Подготовка требует времени и не выдаёт удостоверения на технику.",
      "profs": [
        "agro"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 1400,
      "eff": {
        "skills": 0.4,
        "mental": -0.1
      },
      "career": {
        "raise": 0.025,
        "promo": 1.6,
        "side": 0,
        "burnout": 0.002,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_agro_2",
      "name": "Небольшое личное хозяйство",
      "desc": "Ты ведёшь посильное хозяйство с соблюдением правил содержания и продажи продукции. Расходы и сезонность уменьшают доход, а нагрузки больше.",
      "profs": [
        "agro"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 3500,
      "eff": {
        "skills": 0.1,
        "health": -0.15,
        "mental": -0.1
      },
      "career": {
        "raise": 0,
        "promo": 1,
        "side": 0.2,
        "burnout": 0.005,
        "injury": 0.002,
        "fire": 0.0004,
        "caseRisk": {}
      },
      "when": {
        "any": [
          {
            "village": true
          },
          {
            "smallTown": true
          }
        ],
        "employed": true
      }
    },
    {
      "id": "cf_agro_3",
      "name": "Планирование сезона",
      "desc": "Ты заранее считаешь материалы, погодные резервы и сроки. Организаторские навыки растут, но больше решений и ответственности проходит через тебя.",
      "profs": [
        "agro"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 1600,
      "eff": {
        "social": 0.25,
        "skills": 0.15,
        "mental": -0.2
      },
      "career": {
        "raise": 0.02,
        "promo": 1.9,
        "side": 0,
        "burnout": 0.006,
        "injury": 0,
        "fire": 0.0007,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_athlete_1",
      "name": "Техника и разбор выступлений",
      "desc": "Ты совершенствуешь технику в рамках индивидуального плана и рекомендаций специалистов. Учебная нагрузка требует сил и не гарантирует результат.",
      "profs": [
        "athlete"
      ],
      "ages": [
        18,
        60
      ],
      "cost": 3000,
      "eff": {
        "skills": 0.35,
        "health": -0.05,
        "mental": -0.1
      },
      "career": {
        "raise": 0.015,
        "promo": 1.4,
        "side": 0,
        "burnout": 0.003,
        "injury": 0.0008,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_athlete_2",
      "name": "Реклама с проверкой договора",
      "desc": "Ты берёшь ограниченное число законных рекламных обязательств, согласованных с клубом. Дополнительный доход сокращает время на отдых.",
      "profs": [
        "athlete"
      ],
      "ages": [
        18,
        60
      ],
      "cost": 1500,
      "eff": {
        "social": 0.25,
        "mental": -0.1
      },
      "career": {
        "raise": 0,
        "promo": 1,
        "side": 0.16,
        "burnout": 0.003,
        "injury": 0,
        "fire": 0.0003,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_athlete_3",
      "name": "Режим и восстановление",
      "desc": "Ты придерживаешься посильного режима сна и доступной профессиональной поддержки. На дополнительные активности остаётся меньше времени.",
      "profs": [
        "athlete"
      ],
      "ages": [
        18,
        60
      ],
      "cost": 2500,
      "eff": {
        "health": 0.15,
        "mental": 0.25,
        "skills": -0.05
      },
      "career": {
        "raise": 0,
        "promo": 0.85,
        "side": 0,
        "burnout": 0,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_deputy_1",
      "name": "Работа с обращениями жителей",
      "desc": "Ты проверяешь исполнение ответов и объясняешь пределы своих полномочий. Социальный навык растёт, но эмоциональная нагрузка значительна.",
      "profs": [
        "deputy"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 1000,
      "eff": {
        "skills": 0.25,
        "social": 0.1,
        "mental": -0.05
      },
      "career": {
        "raise": 0.01,
        "promo": 1.3,
        "side": 0,
        "burnout": 0.001,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_deputy_2",
      "name": "Разбор бюджета и полномочий",
      "desc": "Ты изучаешь документы и задаёшь проверяемые вопросы по местным решениям. Учёба требует времени и не создаёт отсутствующих полномочий.",
      "profs": [
        "deputy"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 1800,
      "eff": {
        "skills": 0.4,
        "mental": -0.1
      },
      "career": {
        "raise": 0.025,
        "promo": 1.6,
        "side": 0,
        "burnout": 0.002,
        "injury": 0,
        "fire": 0,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    },
    {
      "id": "cf_deputy_3",
      "name": "Общественные обсуждения проектов",
      "desc": "Ты организуешь доступное обсуждение разных предложений без обещания всем одинакового результата. Влияние растёт вместе с конфликтами интересов и стрессом.",
      "profs": [
        "deputy"
      ],
      "ages": [
        18,
        100
      ],
      "cost": 2200,
      "eff": {
        "social": 0.25,
        "skills": 0.15,
        "mental": -0.2
      },
      "career": {
        "raise": 0.02,
        "promo": 1.9,
        "side": 0,
        "burnout": 0.006,
        "injury": 0,
        "fire": 0.0007,
        "caseRisk": {}
      },
      "when": {
        "employed": true
      }
    }
  ]
};
