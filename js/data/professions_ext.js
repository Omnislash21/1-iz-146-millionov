/*
Профессии: реальные виды требований с альтернативными путями; 25 новых записей. Зарплаты и баланс [~].
Деньги: рубли 2024 года. Составлено 27.10.2026.
hh2024: hh.ru, обзор рынка труда 2024: методика зарплатных предложений — https://hh.ru/article/32527
hhstats: hh Статистика: предложения работодателей и ожидания соискателей — https://stats.hh.ru/
hhmed: hh.ru, рынок среднего медицинского персонала — https://hh.ru/article/32417
rosstat: Росстат: рынок труда, занятость и заработная плата — https://rosstat.gov.ru/labor_market_employment_salaries
taxi: Прокуратура Саратовской области: требования к водителям такси по 580-ФЗ — https://epp.genproc.gov.ru/ru/proc_64/activity/legal-education/explain/e685431/
driving: Прокуратура Тульской области: категории и стаж по статье 26 закона 196-ФЗ — https://epp.genproc.gov.ru/ru/proc_71/activity/legal-education/explain/e1292439/
guard: Росгвардия: медицинские и квалификационные документы частного охранника — https://49.rosguard.gov.ru/page/index/chasto-zadavaemye-voprosy
teacher: Департамент образования Костромской области: квалификация учителя и воспитателя — https://don.kostroma.gov.ru/kontakty/obrashcheniya-grazhdan/chasto-zadavaemye-voprosy.php
med: Росздравнадзор: допуск к медицинской и фармацевтической деятельности — https://www.roszdravnadzor.gov.ru/medactivities/specialist
med2026: Федеральный закон 17.11.2025 №424-ФЗ: наставничество с 01.03.2026 — https://publication.pravo.gov.ru/document/0001202511170015
advocate: Минюст: закон 63-ФЗ, статьи 9–13 и 28 — https://minjust.gov.ru/ru/documents/7885/
notary: Минюст: Основы законодательства о нотариате, статьи 2, 3.1 и 12 — https://minjust.gov.ru/ru/documents/7900/
judge: Совет судей Курской области: закон о статусе судей, статьи 4, 5, 11 — https://krs.ssrf.ru/dokumienty/polozhieniia/58629
prosecutor: Прокуратура Курской области: образование прокурорского работника — https://epp.genproc.gov.ru/ru/proc_46/activity/legal-education/explain/e435129/
firefighter: ГУ МЧС по Москве: квалификация и приём на службу — https://moscow.mchs.gov.ru/deyatelnost/trudoustroystvo-i-obuchenie/vakansii/obshchaya-informaciya-o-prieme-na-sluzhbu
tractor: Минсельхоз Пензенской области: возраст и категории удостоверения тракториста — https://mcx.pnzreg.ru/news/gostekhnadzor/5470/
coach: Минтруд, профстандарт Тренер, приказ №362н от 27.04.2023 — https://publication.pravo.gov.ru/document/0001202305250012
police: ГФС России: текст закона 342-ФЗ о службе в органах внутренних дел — https://gfs.gov.ru/pravovaya-osnova/federalnye-zakony/zakon-30-noyabrya-2011-g-n-342-fz/
civil: Прокуратура Орловской области: приём на гражданскую службу по 79-ФЗ — https://epp.genproc.gov.ru/ru/proc_57/about-the-proc/staffing/document/e562158/
metro: Петербургский метрополитен: обучение и требования к машинисту — https://metro.spb.ru/mashinistep.html?full_version=1
crane: Мурманский строительный колледж: официальная программа подготовки крановщиков — https://msk-murman.ru/data/73d7caee8b94e260309dbc8674254ab5.pdf
military: Закон 53-ФЗ, статья 34, текст с действующими исключениями — https://www.consultant.ru/document/cons_doc_LAW_18260/2976e6b52fdae8cf180047026d1b613c724006a2/
foodmedical: Публичный проверочный лист: обязательные осмотры, закон 52-ФЗ, статья 34 — https://proverki.gov.ru/portal/public-knm/link-only/7d007225-35a2-49c6-be71-3a44757b838d
aviation: ФАП: требования к свидетельству коммерческого пилота, приказ Минтранса №236 от 26.05.2026; текст и даты действия проверять при подключении — https://base.garant.ru/414331649/
vet: Закон РФ №4979-1 О ветеринарии, статья 4, право на ветеринарную деятельность — https://www.consultant.ru/document/cons_doc_LAW_4438/
[~] — авторская оценка для симуляции, не измеренная вероятность и не официальная тарифная ставка.
*/
RL.DATA.professionsExt = {
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
        "id": "hhstats",
        "title": "hh Статистика: предложения работодателей и ожидания соискателей",
        "url": "https://stats.hh.ru/",
        "type": "primary_analytics"
      },
      {
        "id": "hhmed",
        "title": "hh.ru, рынок среднего медицинского персонала",
        "url": "https://hh.ru/article/32417",
        "type": "primary_analytics"
      },
      {
        "id": "rosstat",
        "title": "Росстат: рынок труда, занятость и заработная плата",
        "url": "https://rosstat.gov.ru/labor_market_employment_salaries",
        "type": "primary_statistics"
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
        "id": "guard",
        "title": "Росгвардия: медицинские и квалификационные документы частного охранника",
        "url": "https://49.rosguard.gov.ru/page/index/chasto-zadavaemye-voprosy",
        "type": "official_explanation"
      },
      {
        "id": "teacher",
        "title": "Департамент образования Костромской области: квалификация учителя и воспитателя",
        "url": "https://don.kostroma.gov.ru/kontakty/obrashcheniya-grazhdan/chasto-zadavaemye-voprosy.php",
        "type": "official_explanation"
      },
      {
        "id": "med",
        "title": "Росздравнадзор: допуск к медицинской и фармацевтической деятельности",
        "url": "https://www.roszdravnadzor.gov.ru/medactivities/specialist",
        "type": "official_explanation"
      },
      {
        "id": "med2026",
        "title": "Федеральный закон 17.11.2025 №424-ФЗ: наставничество с 01.03.2026",
        "url": "https://publication.pravo.gov.ru/document/0001202511170015",
        "type": "official_law"
      },
      {
        "id": "advocate",
        "title": "Минюст: закон 63-ФЗ, статьи 9–13 и 28",
        "url": "https://minjust.gov.ru/ru/documents/7885/",
        "type": "official_law"
      },
      {
        "id": "notary",
        "title": "Минюст: Основы законодательства о нотариате, статьи 2, 3.1 и 12",
        "url": "https://minjust.gov.ru/ru/documents/7900/",
        "type": "official_law"
      },
      {
        "id": "judge",
        "title": "Совет судей Курской области: закон о статусе судей, статьи 4, 5, 11",
        "url": "https://krs.ssrf.ru/dokumienty/polozhieniia/58629",
        "type": "official_law"
      },
      {
        "id": "prosecutor",
        "title": "Прокуратура Курской области: образование прокурорского работника",
        "url": "https://epp.genproc.gov.ru/ru/proc_46/activity/legal-education/explain/e435129/",
        "type": "official_explanation"
      },
      {
        "id": "firefighter",
        "title": "ГУ МЧС по Москве: квалификация и приём на службу",
        "url": "https://moscow.mchs.gov.ru/deyatelnost/trudoustroystvo-i-obuchenie/vakansii/obshchaya-informaciya-o-prieme-na-sluzhbu",
        "type": "official_explanation"
      },
      {
        "id": "tractor",
        "title": "Минсельхоз Пензенской области: возраст и категории удостоверения тракториста",
        "url": "https://mcx.pnzreg.ru/news/gostekhnadzor/5470/",
        "type": "official_explanation"
      },
      {
        "id": "coach",
        "title": "Минтруд, профстандарт Тренер, приказ №362н от 27.04.2023",
        "url": "https://publication.pravo.gov.ru/document/0001202305250012",
        "type": "official_standard"
      },
      {
        "id": "police",
        "title": "ГФС России: текст закона 342-ФЗ о службе в органах внутренних дел",
        "url": "https://gfs.gov.ru/pravovaya-osnova/federalnye-zakony/zakon-30-noyabrya-2011-g-n-342-fz/",
        "type": "official_law"
      },
      {
        "id": "civil",
        "title": "Прокуратура Орловской области: приём на гражданскую службу по 79-ФЗ",
        "url": "https://epp.genproc.gov.ru/ru/proc_57/about-the-proc/staffing/document/e562158/",
        "type": "official_explanation"
      },
      {
        "id": "metro",
        "title": "Петербургский метрополитен: обучение и требования к машинисту",
        "url": "https://metro.spb.ru/mashinistep.html?full_version=1",
        "type": "employer_requirements"
      },
      {
        "id": "crane",
        "title": "Мурманский строительный колледж: официальная программа подготовки крановщиков",
        "url": "https://msk-murman.ru/data/73d7caee8b94e260309dbc8674254ab5.pdf",
        "type": "training_provider"
      },
      {
        "id": "military",
        "title": "Закон 53-ФЗ, статья 34, текст с действующими исключениями",
        "url": "https://www.consultant.ru/document/cons_doc_LAW_18260/2976e6b52fdae8cf180047026d1b613c724006a2/",
        "type": "law_text"
      },
      {
        "id": "foodmedical",
        "title": "Публичный проверочный лист: обязательные осмотры, закон 52-ФЗ, статья 34",
        "url": "https://proverki.gov.ru/portal/public-knm/link-only/7d007225-35a2-49c6-be71-3a44757b838d",
        "type": "official_inspection_checklist"
      },
      {
        "id": "aviation",
        "title": "ФАП: требования к свидетельству коммерческого пилота, приказ Минтранса №236 от 26.05.2026; текст и даты действия проверять при подключении",
        "url": "https://base.garant.ru/414331649/",
        "type": "law_text"
      },
      {
        "id": "vet",
        "title": "Закон РФ №4979-1 О ветеринарии, статья 4, право на ветеринарную деятельность",
        "url": "https://www.consultant.ru/document/cons_doc_LAW_4438/",
        "type": "law_text"
      }
    ],
    "notes": [
      "Требования для 42 перечисленных профессий и 25 новых: 67 записей. Современный срез на 27.10.2026, а не неизменные правила 1985–2035.",
      "level: 0 — не требуется профессиональная ступень образования в выбранном пути (средняя школа/профобучение могут требоваться), 1 — СПО, 2 — высшее. Профобучение не тождественно СПО.",
      "field — укрупнённые игровые направления; уточнение educationDetail обязательно для медицины, фармации, ветеринарии, педагогики и лётной подготовки. Любой диплом из широкой группы не даёт допуск.",
      "basis отличает закон/обязательную квалификацию от практики и модельного взрослого возраста. Поля recommended* — пожелания/типовой путь, а не запреты.",
      "Плоские поля описывают базовый путь; routes — альтернативы OR, не дополнительные условия AND. По ролям guard/driver/police/deputy выбирается подходящий путь.",
      "medical: true — обязателен подходящий медосмотр/отбор в данном пути; null — зависит от должности/условий, а не доказанное отсутствие любых требований.",
      "noRecord=true означает необходимость правовой проверки recordRestriction. Нельзя запрещать профессию по любому единственному булеву criminalRecord: составы, погашение, прекращение дела и исключения различаются.",
      "citizenship=RF — российское гражданство в базовом пути; null — общего требования для всех путей не заявлено. Это не разрешение игнорировать миграционные и трудовые нормы.",
      "license — дорожная категория; specialLicense тракториста и лётное свидетельство — отдельные документы. Для CE год считается по C, для такси три года — по B.",
      "minAge=16 для простых гражданских ролей — основной трудовой путь; исключения для более младших по ТК РФ здесь не автоматизированы. Для опасных операций — дополнительные запреты.",
      "maxAge=null не задаёт общего потолка; предел первого приёма, продолжения службы и исполнения полномочий — разные понятия. Для судьи/нотариуса точная дата предельного возраста проверяется отдельно.",
      "Ни педагогический вуз, ни юридический диплом, ни спортсменское прошлое не создают автоматически статус врача, адвоката, судьи, нотариуса или тренера.",
      "Изменения с 01.03.2026 для медработников отмечены temporalRules: применимость наставничества зависит от специальности, момента выпуска/аккредитации и исключений, а не просто от возраста.",
      "Зарплаты wage, разброс и все поведенческие коэффициенты [~]. Значения wage — оценки центрального уровня 2024 в рублях 2024, не выданные за рассчитанные медианы отдельных профессий hh.ru/Росстата.",
      "Для независимых нотариусов/адвокатов/риелторов и самостоятельного такси wage — сопоставимый месячный доход после прямых расходов до личного налога, не оборот и не гарантированный оклад.",
      "sex={m:1,f:1} — равная доступность в этой модели, не измеренное распределение полов. Правовые условия не подменяются полом персонажа.",
      "В будущем и в СССР применять требования только через соответствующие нормы эпохи. Новые fromYear — [~] доступность современных ролей для игры; это не дата возникновения каждой специальности.",
      "В старой базе id nurse имеет разные названия по полу (фельдшер/медсестра), а agro и mechanic объединяют разные роли. Требования здесь относятся к квалификации, не к полу; для feldsher используется отдельный новый id paramedic. Существующие подписи не менялись.",
      "Три новых файла — самостоятельные данные. Подключение, выдача документов, проверки routes и изменение логики найма остаются у интегратора."
    ]
  },
  "requirements": {
    "laborer": {
      "level": 0,
      "field": [],
      "license": null,
      "minDrivingYears": 0,
      "medical": null,
      "noRecord": false,
      "minAge": 16,
      "maxAge": null,
      "experienceYears": 0,
      "exam": null,
      "citizenship": null,
      "note": "Практика: для простых подсобных работ профессиональный диплом обычно не требуется. ТК РФ, ст. 63, 265: общий приём с 16 лет, для тяжёлых/опасных операций — 18; допуск по фактической работе.",
      "sourceIds": [
        "hh2024"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно."
    },
    "worker": {
      "level": 1,
      "field": [
        "eng"
      ],
      "license": null,
      "minDrivingYears": 0,
      "medical": null,
      "noRecord": false,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 0,
      "exam": null,
      "citizenship": null,
      "note": "Практика: производственная квалификация через СПО либо профессиональное обучение у работодателя. Медосмотр и допуски определяются операциями и условиями, а не словом «рабочий».",
      "sourceIds": [
        "hh2024"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно.",
      "professionalTraining": "Профобучение по рабочей профессии — альтернативный путь без СПО.",
      "routes": [
        {
          "level": 1,
          "field": [
            "eng"
          ]
        },
        {
          "level": 0,
          "professionalTrainingRequired": true
        }
      ]
    },
    "builder": {
      "level": 0,
      "field": [],
      "license": null,
      "minDrivingYears": 0,
      "medical": true,
      "noRecord": false,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 0,
      "exam": null,
      "citizenship": null,
      "note": "ТК РФ, охрана труда и практика: строительные профессии осваивают через СПО или профобучение; общий диплом строителя не является единым допуском. Высота, опасные операции и механизмы требуют отдельной подготовки.",
      "sourceIds": [
        "hh2024"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно.",
      "professionalTraining": "По конкретной рабочей профессии; работы на высоте — отдельные условия."
    },
    "welder": {
      "level": 0,
      "field": [],
      "license": null,
      "minDrivingYears": 0,
      "medical": true,
      "noRecord": false,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 0,
      "exam": null,
      "citizenship": null,
      "note": "Профобучение сварщика или профильное СПО; проверка знаний охраны труда и квалификация по виду работ. Аттестация для специальных объектов не заменяется универсальным флагом диплома.",
      "sourceIds": [
        "hh2024"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно.",
      "professionalTraining": "Квалификация сварщика; специальные аттестации по объекту и технологии.",
      "routes": [
        {
          "level": 0,
          "professionalTrainingRequired": true
        },
        {
          "level": 1,
          "field": [
            "eng"
          ]
        }
      ]
    },
    "electrician": {
      "level": 0,
      "field": [],
      "license": null,
      "minDrivingYears": 0,
      "medical": true,
      "noRecord": false,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 0,
      "exam": null,
      "citizenship": null,
      "note": "Профобучение или электротехническое СПО; группа по электробезопасности и право конкретных работ назначаются после проверки знаний. Диплом сам по себе не даёт права работать с любым напряжением.",
      "sourceIds": [
        "hh2024"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно.",
      "professionalTraining": "Электротехническая квалификация, проверка знаний, группа по фактической работе.",
      "routes": [
        {
          "level": 0,
          "professionalTrainingRequired": true
        },
        {
          "level": 1,
          "field": [
            "eng"
          ]
        }
      ]
    },
    "mechanic": {
      "level": 0,
      "field": [],
      "license": null,
      "minDrivingYears": 0,
      "medical": null,
      "noRecord": false,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 0,
      "exam": null,
      "citizenship": null,
      "note": "Практика: автомеханика осваивают через СПО, профобучение или подтверждённую подготовку. Тестовая поездка на дороге требует соответствующих прав; ремонту без управления категория B автоматически не нужна.",
      "sourceIds": [
        "hh2024"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно.",
      "professionalTraining": "По выполняемым операциям; профильное СПО — обычный альтернативный путь."
    },
    "rotation": {
      "level": 0,
      "field": [],
      "license": null,
      "minDrivingYears": 0,
      "medical": true,
      "noRecord": false,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 0,
      "exam": null,
      "citizenship": null,
      "note": "Вахта — режим организации труда, а не единая квалификация. ТК РФ, ст. 298: 18+, медицинские ограничения и дополнительные запреты для отдельных категорий работников; диплом и допуск зависят от реальной работы.",
      "sourceIds": [
        "hh2024"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно"
      },
      "scope": "Работник на вахте; общие ограничения режима плюс требования фактической специальности.",
      "jobSpecificRequirements": true
    },
    "seller": {
      "level": 0,
      "field": [],
      "license": null,
      "minDrivingYears": 0,
      "medical": null,
      "noRecord": false,
      "minAge": 16,
      "maxAge": null,
      "experienceYears": 0,
      "exam": null,
      "citizenship": null,
      "note": "Практика и ТК РФ: единого профессионального диплома для продавца нет. Осмотры обязательны в предусмотренных законом видах торговли; несовершеннолетним недоступны отдельные товары и условия.",
      "sourceIds": [
        "hh2024"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно."
    },
    "cook": {
      "level": 0,
      "field": [],
      "license": null,
      "minDrivingYears": 0,
      "medical": true,
      "noRecord": false,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 0,
      "exam": null,
      "citizenship": null,
      "note": "Закон 52-ФЗ, ст. 34, и санитарные требования: для общепита нужны предусмотренные осмотры и гигиеническая подготовка. СПО или профобучение повара — квалификационный путь; отдельного универсального требования иметь именно СПО нет.",
      "sourceIds": [
        "foodmedical"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно.",
      "professionalTraining": "Поварская подготовка и санитарные процедуры; квалификация по должности."
    },
    "hairdresser": {
      "level": 0,
      "field": [],
      "license": null,
      "minDrivingYears": 0,
      "medical": null,
      "noRecord": false,
      "minAge": 16,
      "maxAge": null,
      "experienceYears": 0,
      "exam": null,
      "citizenship": null,
      "note": "Практика: СПО, курсы или профессиональное обучение и портфолио. Санитарные требования и осмотры определяются работами. Медицинские косметологические процедуры требуют отдельной медицинской квалификации.",
      "sourceIds": [
        "hh2024"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно.",
      "professionalTraining": "Профобучение по выбранным парикмахерским работам."
    },
    "cleaner": {
      "level": 0,
      "field": [],
      "license": null,
      "minDrivingYears": 0,
      "medical": null,
      "noRecord": false,
      "minAge": 16,
      "maxAge": null,
      "experienceYears": 0,
      "exam": null,
      "citizenship": null,
      "note": "Практика: профессиональный диплом обычно не нужен. Необходимы инструктаж и безопасная работа со средствами; медицинские требования зависят от объекта и факторов.",
      "sourceIds": [
        "hh2024"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно."
    },
    "guard": {
      "level": 0,
      "field": [],
      "license": null,
      "minDrivingYears": 0,
      "medical": true,
      "noRecord": true,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 0,
      "exam": "private_guard_qualification",
      "citizenship": "RF",
      "note": "Закон №2487-1: для частного охранника нужны обучение, квалификационный экзамен, удостоверение, медицинское заключение и гражданство РФ. Вахтёр без охранных полномочий — иной путь; это отражено в routes.",
      "sourceIds": [
        "guard"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "law_or_mandatory_qualification",
        "medical": "law_or_mandatory_qualification",
        "citizenship": "law_or_mandatory_qualification",
        "exam": "law_or_mandatory_qualification"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно.",
      "recordRestriction": "Проверка ограничений статьи 11.1 закона №2487-1; запрет не сводится к любому историческому флагу criminalRecord.",
      "professionalTraining": "Профессиональное обучение частного охранника и удостоверение по разряду.",
      "routes": [
        {
          "role": "private_security_guard",
          "level": 0,
          "citizenship": "RF",
          "minAge": 18,
          "qualificationExam": true,
          "medical": true,
          "specialCertificate": "УЧО"
        },
        {
          "role": "watchperson_without_security_powers",
          "level": 0,
          "citizenship": null,
          "qualificationExam": false,
          "note": "Отдельная трудовая роль без полномочий частного охранника."
        }
      ]
    },
    "courier": {
      "level": 0,
      "field": [],
      "license": null,
      "minDrivingYears": 0,
      "medical": null,
      "noRecord": false,
      "minAge": 16,
      "maxAge": null,
      "experienceYears": 0,
      "exam": null,
      "citizenship": null,
      "note": "Практика: для пешей доставки диплом и водительские права не требуются. На автомобиле нужна категория по машине; медицинские и возрастные требования зависят от товаров и формата труда.",
      "sourceIds": [
        "hh2024"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно.",
      "roleVariants": [
        {
          "role": "walking",
          "license": null
        },
        {
          "role": "car",
          "license": "B",
          "minAge": 18
        }
      ]
    },
    "driver": {
      "level": 0,
      "field": [],
      "license": "B",
      "minDrivingYears": 0,
      "medical": true,
      "noRecord": false,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 0,
      "exam": "driving_category",
      "citizenship": null,
      "note": "196-ФЗ, ст. 23, 25, 26: профессиональное обучение водителя, экзамен, права по машине и медицинский допуск. Универсального требования СПО нет. Варианты категорий — альтернативы по транспортному средству, не список обязательных одновременно.",
      "sourceIds": [
        "driving"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "law_or_mandatory_qualification",
        "license": "law_or_mandatory_qualification",
        "medical": "law_or_mandatory_qualification",
        "exam": "law_or_mandatory_qualification",
        "minDrivingYears": "law_or_mandatory_qualification"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно.",
      "routes": [
        {
          "vehicle": "car",
          "license": "B",
          "minAge": 18,
          "minDrivingYears": 0
        },
        {
          "vehicle": "truck_without_heavy_trailer",
          "license": "C",
          "minAge": 18,
          "minDrivingYears": 0
        },
        {
          "vehicle": "bus",
          "license": "D",
          "minAge": 21,
          "minDrivingYears": 1,
          "priorLicenseAny": [
            "B",
            "C",
            "C1",
            "D1"
          ]
        },
        {
          "vehicle": "heavy_truck_with_trailer",
          "license": "CE",
          "minAge": 19,
          "minDrivingYears": 1,
          "priorLicense": "C"
        }
      ]
    },
    "doctor": {
      "level": 2,
      "field": [
        "med"
      ],
      "license": null,
      "minDrivingYears": 0,
      "medical": true,
      "noRecord": false,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 0,
      "exam": "medical_accreditation",
      "citizenship": null,
      "note": "323-ФЗ, ст. 69: соответствующее высшее медицинское образование и аккредитация по специальности; для части должностей нужна ординатура/дополнительная подготовка. Лицензия на меддеятельность принадлежит организации или ИП, а не каждому наёмному врачу.",
      "sourceIds": [
        "med",
        "med2026"
      ],
      "basis": {
        "level": "law_or_mandatory_qualification",
        "field": "law_or_mandatory_qualification",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно",
        "medical": "law_or_mandatory_qualification",
        "exam": "law_or_mandatory_qualification"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно.",
      "specialCertificate": "Действующая аккредитация по нужной специальности.",
      "educationDetail": "Лечебное дело/педиатрия или иной допустимый профиль плюс подготовка для выбранной специальности.",
      "requiresAccreditation": true,
      "temporalRules": [
        {
          "fromDate": "2026-03-01",
          "rule": "Наставничество для впервые аккредитованных по применимым специальностям: перечень, срок до 3 лет, организация и исключения проверяются отдельно.",
          "doesNotApply": "Лица, завершившие обучение или впервые прошедшие соответствующую аккредитацию до 01.03.2026, и другие предусмотренные законом исключения.",
          "sourceId": "med2026"
        }
      ]
    },
    "nurse": {
      "level": 1,
      "field": [
        "med"
      ],
      "license": null,
      "minDrivingYears": 0,
      "medical": true,
      "noRecord": false,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 0,
      "exam": "medical_accreditation",
      "citizenship": null,
      "note": "323-ФЗ, ст. 69 и квалификационные требования: профильное сестринское образование и аккредитация. Фельдшер — отдельная квалификация, которая не определяется полом персонажа.",
      "sourceIds": [
        "med",
        "med2026"
      ],
      "basis": {
        "level": "law_or_mandatory_qualification",
        "field": "law_or_mandatory_qualification",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно",
        "medical": "law_or_mandatory_qualification",
        "exam": "law_or_mandatory_qualification"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно.",
      "requiresAccreditation": true,
      "educationDetail": "Сестринское дело или допускаемый требованиями специальности путь с нужной переподготовкой.",
      "temporalRules": [
        {
          "fromDate": "2026-03-01",
          "rule": "Наставничество для впервые аккредитованных по применимым специальностям: перечень, срок до 3 лет, организация и исключения проверяются отдельно.",
          "doesNotApply": "Лица, завершившие обучение или впервые прошедшие соответствующую аккредитацию до 01.03.2026, и другие предусмотренные законом исключения.",
          "sourceId": "med2026"
        }
      ]
    },
    "pharmacist": {
      "level": 1,
      "field": [
        "med"
      ],
      "license": null,
      "minDrivingYears": 0,
      "medical": true,
      "noRecord": false,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 0,
      "exam": "pharmacy_accreditation",
      "citizenship": null,
      "note": "323-ФЗ, ст. 69: фармацевтическое СПО и аккредитация по соответствующей специальности. Диплом по естественным наукам сам по себе не даёт права отпуска лекарств; провизор с высшим образованием описан отдельно.",
      "sourceIds": [
        "med"
      ],
      "basis": {
        "level": "law_or_mandatory_qualification",
        "field": "law_or_mandatory_qualification",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно",
        "medical": "law_or_mandatory_qualification",
        "exam": "law_or_mandatory_qualification"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно.",
      "requiresAccreditation": true,
      "educationDetail": "Фармация, СПО."
    },
    "teacher": {
      "level": 1,
      "field": [
        "ped"
      ],
      "license": null,
      "minDrivingYears": 0,
      "medical": true,
      "noRecord": true,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 0,
      "exam": null,
      "citizenship": null,
      "note": "273-ФЗ, ст. 46, ТК РФ, ст. 331: допускаются СПО или высшее образование при соответствии предмету и квалификационным требованиям; возможна нужная переподготовка. Универсального правила «всем учителям только вуз» нет.",
      "sourceIds": [
        "teacher"
      ],
      "basis": {
        "level": "law_or_mandatory_qualification",
        "field": "practice",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно",
        "medical": "law_or_mandatory_qualification"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно.",
      "recordRestriction": "Составы и основания ограничений по статьям 331/351.1 ТК РФ, с предусмотренными исключениями и решениями комиссии; не автоматический пожизненный запрет за любую судимость.",
      "routes": [
        {
          "level": 1,
          "field": [
            "ped"
          ],
          "qualificationMatch": true
        },
        {
          "level": 2,
          "field": [
            "ped"
          ],
          "qualificationMatch": true
        },
        {
          "level": 1,
          "field": [],
          "pedagogicalRetrainingRequired": true,
          "qualificationMatch": true
        },
        {
          "level": 2,
          "field": [],
          "pedagogicalRetrainingRequired": true,
          "qualificationMatch": true
        }
      ]
    },
    "kgteacher": {
      "level": 1,
      "field": [
        "ped"
      ],
      "license": null,
      "minDrivingYears": 0,
      "medical": true,
      "noRecord": true,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 0,
      "exam": null,
      "citizenship": null,
      "note": "273-ФЗ, ст. 46 и квалификационные требования: дошкольная педагогика в СПО/вузе либо допускаемый путь с профессиональной переподготовкой. Нужны предусмотренные осмотры и проверка ограничений к работе с детьми.",
      "sourceIds": [
        "teacher"
      ],
      "basis": {
        "level": "law_or_mandatory_qualification",
        "field": "practice",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно",
        "medical": "law_or_mandatory_qualification"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно.",
      "recordRestriction": "Применимые ограничения статей 331/351.1 ТК РФ с предусмотренными исключениями.",
      "routes": [
        {
          "level": 1,
          "field": [
            "ped"
          ],
          "preschoolQualification": true
        },
        {
          "level": 2,
          "field": [
            "ped"
          ],
          "preschoolQualification": true
        },
        {
          "level": 1,
          "field": [],
          "preschoolRetrainingRequired": true
        }
      ]
    },
    "coach": {
      "level": 1,
      "field": [
        "ped"
      ],
      "license": null,
      "minDrivingYears": 0,
      "medical": true,
      "noRecord": true,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 0,
      "exam": null,
      "citizenship": null,
      "note": "Профстандарт Тренер №362н: для начальных функций предусмотрено профильное СПО и альтернативные квалификационные пути, включая нужную переподготовку. Звания спортсмена не заменяют все условия допуска, особенно для работы с детьми.",
      "sourceIds": [
        "coach"
      ],
      "basis": {
        "level": "law_or_mandatory_qualification",
        "field": "practice",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно",
        "medical": "law_or_mandatory_qualification"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно.",
      "recordRestriction": "Специальные ограничения к деятельности с несовершеннолетними и спортивной подготовке.",
      "educationDetail": "Физическая культура и спорт; ped — код объединённой игровой группы, не любой педагогический диплом.",
      "routes": [
        {
          "level": 1,
          "field": [
            "ped"
          ],
          "sportQualification": true
        },
        {
          "level": 2,
          "field": [
            "ped"
          ],
          "sportQualification": true
        },
        {
          "level": 1,
          "field": [],
          "sportRetrainingRequired": true
        }
      ]
    },
    "police": {
      "level": 0,
      "field": [],
      "license": null,
      "minDrivingYears": 0,
      "medical": true,
      "noRecord": true,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 0,
      "exam": null,
      "citizenship": "RF",
      "note": "342-ФЗ, ст. 9, 14, 17: гражданство РФ, 18+, квалификация по должности, ВВК/психологический отбор и установленные ограничения. Для рядовых/младших должностей возможен путь со средним общим образованием; офицерским ролям нужны другие условия.",
      "sourceIds": [
        "police"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "law_or_mandatory_qualification",
        "medical": "law_or_mandatory_qualification",
        "citizenship": "law_or_mandatory_qualification"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно.",
      "generalEducation": "secondary_general",
      "recordRestriction": "Основания статьи 14 закона №342-ФЗ, включая прошлую судимость и нереабилитирующее прекращение дела; учитывать действующие исключения.",
      "ageNote": "Предельный возраст первого приёма зависит от должности, звания, закона и исключений. maxAge=null, чтобы не подменять его общим устаревшим пределом 35/40 лет.",
      "routes": [
        {
          "role": "junior",
          "level": 0,
          "generalEducation": "secondary_general"
        },
        {
          "role": "middle_command",
          "level": 1,
          "qualificationMatch": true
        },
        {
          "role": "senior_or_special",
          "level": 2,
          "qualificationMatch": true
        }
      ]
    },
    "military": {
      "level": 0,
      "field": [],
      "license": null,
      "minDrivingYears": 0,
      "medical": true,
      "noRecord": true,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 0,
      "exam": null,
      "citizenship": null,
      "note": "53-ФЗ, ст. 33–34: контракт, медицинский и профессиональный отбор, подготовка по воинской должности. Общее правило не требует каждому контрактнику СПО или высшего образования; права и специальные дипломы зависят от должности.",
      "sourceIds": [
        "military"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "law_or_mandatory_qualification",
        "medical": "law_or_mandatory_qualification"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно.",
      "citizenshipPolicy": "Пути для граждан РФ и предусмотренных законом иностранных граждан/лиц без гражданства различаются по доступным должностям.",
      "recordRestriction": "Проверка статьи 34 закона №53-ФЗ; общие запреты и специальные нормы мобилизационного/военного периода различаются.",
      "ageNote": "18+; верхний возраст определяется применимой нормой, статусом кандидата и должностью, а не общей игровой цифрой.",
      "jobSpecificRequirements": true
    },
    "firefighter": {
      "level": 0,
      "field": [],
      "license": null,
      "minDrivingYears": 0,
      "medical": true,
      "noRecord": true,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 0,
      "exam": null,
      "citizenship": "RF",
      "note": "Для рядового пожарного ФПС возможны среднее общее образование и специальная подготовка; медотбор и физические требования обязательны. Сотрудник ФПС со званием, гражданский работник и доброволец — разные статусы.",
      "sourceIds": [
        "firefighter"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "law_or_mandatory_qualification",
        "medical": "law_or_mandatory_qualification",
        "citizenship": "law_or_mandatory_qualification"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно.",
      "generalEducation": "secondary_general",
      "professionalTraining": "Подготовка пожарного и проверка знаний по должности.",
      "recordRestriction": "Для службы ФПС — установленные законом ограничения; гражданская должность проверяется отдельно.",
      "ageNote": "Предел первого поступления на службу отличается от срока продолжения службы и от гражданской работы. Уточнять по статусу и действующей редакции."
    },
    "office": {
      "level": 0,
      "field": [],
      "license": null,
      "minDrivingYears": 0,
      "medical": null,
      "noRecord": false,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 0,
      "exam": null,
      "citizenship": null,
      "note": "Практика: единого обязательного диплома для офисного специалиста нет. Работодатель может требовать СПО/вуз и владение программами; специальные регулируемые должности проверяются отдельно.",
      "sourceIds": [
        "hh2024"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно.",
      "recommendedEducation": {
        "level": 1,
        "field": [
          "econ",
          "hum"
        ]
      }
    },
    "accountant": {
      "level": 1,
      "field": [
        "econ"
      ],
      "license": null,
      "minDrivingYears": 0,
      "medical": null,
      "noRecord": false,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 0,
      "exam": null,
      "citizenship": null,
      "note": "Практика: профильное СПО — обычный путь; общая обязательность одного уровня образования для всех бухгалтеров законом не установлена. Для главного бухгалтера отдельных организаций действуют специальные требования 402-ФЗ, ст. 7.",
      "sourceIds": [
        "hh2024"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно.",
      "recommendedExperienceYears": 1
    },
    "economist": {
      "level": 2,
      "field": [
        "econ"
      ],
      "license": null,
      "minDrivingYears": 0,
      "medical": null,
      "noRecord": false,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 0,
      "exam": null,
      "citizenship": null,
      "note": "Практика и квалификационные требования работодателя: обычно профильное высшее образование; это не универсальный государственный допуск к любой аналитической задаче.",
      "sourceIds": [
        "hh2024"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно."
    },
    "lawyer": {
      "level": 2,
      "field": [
        "law"
      ],
      "license": null,
      "minDrivingYears": 0,
      "medical": null,
      "noRecord": false,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 0,
      "exam": null,
      "citizenship": null,
      "note": "Практика: юридический вуз обычно нужен для штатного юриста. Отдельные виды судебного представительства имеют установленные процессуальными кодексами требования и исключения; статус адвоката не возникает из диплома.",
      "sourceIds": [
        "hh2024"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно"
      },
      "scope": "Штатный юрисконсульт; адвокат/нотариус/судья представлены отдельными id."
    },
    "manager": {
      "level": 0,
      "field": [],
      "license": null,
      "minDrivingYears": 0,
      "medical": null,
      "noRecord": false,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 0,
      "exam": null,
      "citizenship": null,
      "note": "Практика: руководящая должность сама по себе не означает обязательный вуз и возраст 26+. Работодатели обычно требуют отраслевые навыки и опыт; регулируемые организации имеют дополнительные правила.",
      "sourceIds": [
        "hh2024"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно.",
      "recommendedEducation": {
        "level": 2,
        "field": [
          "econ",
          "gmu",
          "eng"
        ]
      },
      "recommendedExperienceYears": 3
    },
    "official": {
      "level": 1,
      "field": [
        "gmu",
        "law",
        "econ"
      ],
      "license": null,
      "minDrivingYears": 0,
      "medical": true,
      "noRecord": true,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 0,
      "exam": null,
      "citizenship": "RF",
      "note": "79-ФЗ, ст. 12, 16, 21–22: гражданство РФ, 18+, квалификационные требования и конкурс/исключения. Для обеспечивающих должностей возможен путь через СПО; для других групп/категорий нужен соответствующий уровень вуза и стаж.",
      "sourceIds": [
        "civil"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "law_or_mandatory_qualification",
        "citizenship": "law_or_mandatory_qualification"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно.",
      "recordRestriction": "Применимые ограничения статьи 16 закона №79-ФЗ, включая несовместимое наказание; не любой исторический criminalRecord.",
      "routes": [
        {
          "role": "supporting_positions",
          "level": 1,
          "qualificationMatch": true
        },
        {
          "role": "other_civil_service_positions",
          "level": 2,
          "qualificationMatch": true,
          "experienceByPosition": true
        }
      ]
    },
    "it": {
      "level": 0,
      "field": [],
      "license": null,
      "minDrivingYears": 0,
      "medical": null,
      "noRecord": false,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 0,
      "exam": null,
      "citizenship": null,
      "note": "Практика: навыки, портфолио и проверка на собеседовании; общего законодательного требования к диплому программиста нет. Для специальных защищённых/государственных систем возможны дополнительные условия.",
      "sourceIds": [
        "hh2024"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно.",
      "recommendedEducation": {
        "level": 1,
        "field": [
          "it",
          "eng",
          "natsci"
        ]
      }
    },
    "designer": {
      "level": 0,
      "field": [],
      "license": null,
      "minDrivingYears": 0,
      "medical": null,
      "noRecord": false,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 0,
      "exam": null,
      "citizenship": null,
      "note": "Практика: портфолио и владение инструментами; профильное образование полезно, но общий дипломный запрет на работу дизайнером не установлен.",
      "sourceIds": [
        "hh2024"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно.",
      "recommendedEducation": {
        "level": 1,
        "field": [
          "arts",
          "it"
        ]
      }
    },
    "scientist": {
      "level": 2,
      "field": [
        "natsci",
        "eng",
        "it",
        "med",
        "hum",
        "agro"
      ],
      "license": null,
      "minDrivingYears": 0,
      "medical": null,
      "noRecord": false,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 0,
      "exam": null,
      "citizenship": null,
      "note": "Квалификация зависит от научной должности и организации: обычно профильный вуз, для старших должностей — учёная степень/опыт. Один любой диплом не даёт права заниматься регулируемой клинической работой.",
      "sourceIds": [
        "hh2024"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно.",
      "recommendedExperienceYears": 0
    },
    "journalist": {
      "level": 0,
      "field": [],
      "license": null,
      "minDrivingYears": 0,
      "medical": null,
      "noRecord": false,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 0,
      "exam": null,
      "citizenship": null,
      "note": "Практика и закон о СМИ: универсального требования иметь журналистский диплом нет. Нужны профессиональные навыки, работа с источниками и соблюдение закона; редакция может требовать образование.",
      "sourceIds": [
        "hh2024"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно.",
      "recommendedEducation": {
        "level": 2,
        "field": [
          "hum"
        ]
      }
    },
    "psychologist": {
      "level": 2,
      "field": [
        "hum",
        "ped",
        "med"
      ],
      "license": null,
      "minDrivingYears": 0,
      "medical": null,
      "noRecord": false,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 0,
      "exam": null,
      "citizenship": null,
      "note": "Типовой путь — профильная психология; точные требования зависят от учреждения и вида услуг. Клиническая психология, педагогическая и социальная работа имеют собственные условия; это не врачебная психотерапия.",
      "sourceIds": [
        "hh2024"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно"
      },
      "scope": "Психологическое консультирование в рамках квалификации; для регулируемой должности нужны отдельные требования.",
      "recommendedEducation": {
        "level": 2,
        "field": [
          "hum"
        ],
        "specialization": "Психология"
      }
    },
    "actor": {
      "level": 0,
      "field": [],
      "license": null,
      "minDrivingYears": 0,
      "medical": null,
      "noRecord": false,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 0,
      "exam": null,
      "citizenship": null,
      "note": "Практика: отбор, портфолио и профессиональная подготовка; для части штатных театральных должностей — требования квалификационных справочников. Единого правила «для любой роли нужен вуз» нет.",
      "sourceIds": [
        "hh2024"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно.",
      "recommendedEducation": {
        "level": 2,
        "field": [
          "arts"
        ]
      }
    },
    "musician": {
      "level": 0,
      "field": [],
      "license": null,
      "minDrivingYears": 0,
      "medical": null,
      "noRecord": false,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 0,
      "exam": null,
      "citizenship": null,
      "note": "Практика: исполнительские навыки, репертуар и прослушивание; штатные оркестровые/педагогические должности имеют свои квалификационные условия.",
      "sourceIds": [
        "hh2024"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно.",
      "recommendedEducation": {
        "level": 1,
        "field": [
          "arts"
        ]
      }
    },
    "artist": {
      "level": 0,
      "field": [],
      "license": null,
      "minDrivingYears": 0,
      "medical": null,
      "noRecord": false,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 0,
      "exam": null,
      "citizenship": null,
      "note": "Практика: портфолио и соответствие задаче; диплом не является общим допуском к иллюстрации и авторской работе. Для педагогических должностей условия отдельные.",
      "sourceIds": [
        "hh2024"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно.",
      "recommendedEducation": {
        "level": 1,
        "field": [
          "arts"
        ]
      }
    },
    "railway": {
      "level": 0,
      "field": [],
      "license": null,
      "minDrivingYears": 0,
      "medical": true,
      "noRecord": false,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 0,
      "exam": null,
      "citizenship": null,
      "note": "Железнодорожная работа включает разные профессии. Для конкретной должности нужны профобучение либо СПО/вуз, медицинский отбор, проверка знаний и допуск; личные автомобильные права не дают права вести поезд.",
      "sourceIds": [
        "metro"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно.",
      "professionalTraining": "Профессия и допуск по должности; требования железной дороги уточнять отдельно от метрополитена.",
      "jobSpecificRequirements": true
    },
    "pilot": {
      "level": 1,
      "field": [
        "eng"
      ],
      "license": null,
      "minDrivingYears": 0,
      "medical": true,
      "noRecord": false,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 0,
      "exam": "commercial_pilot_theory_and_skill",
      "citizenship": null,
      "note": "Воздушный кодекс и ФАП: профильная лётная подготовка/образование, свидетельство коммерческого пилота, медицинское заключение нужного класса, налёт, квалификационные отметки и подготовка по типу. Для авиакомпании условия выше минимального свидетельства.",
      "sourceIds": [
        "aviation"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно.",
      "specialCertificate": "Лётное свидетельство и действующие квалификационные отметки.",
      "flightHoursRequired": true,
      "educationDetail": "Профильное СПО или высшее лётное образование; eng не означает любой инженерный диплом.",
      "routes": [
        {
          "level": 1,
          "field": [
            "eng"
          ],
          "flightTraining": true
        },
        {
          "level": 2,
          "field": [
            "eng"
          ],
          "flightTraining": true
        }
      ]
    },
    "agro": {
      "level": 0,
      "field": [],
      "license": null,
      "minDrivingYears": 0,
      "medical": null,
      "noRecord": false,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 0,
      "exam": null,
      "citizenship": null,
      "note": "Сельские работы не имеют одного обязательного диплома: ручной труд, животноводство, агрономия и управление техникой требуют разных квалификаций. Для самоходной техники нужен отдельный допуск тракториста.",
      "sourceIds": [
        "hh2024"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно.",
      "jobSpecificRequirements": true,
      "recommendedEducation": {
        "level": 1,
        "field": [
          "agro"
        ]
      }
    },
    "athlete": {
      "level": 0,
      "field": [],
      "license": null,
      "minDrivingYears": 0,
      "medical": true,
      "noRecord": false,
      "minAge": 16,
      "maxAge": null,
      "experienceYears": 0,
      "exam": null,
      "citizenship": null,
      "note": "ТК РФ, гл. 54.1: спортивный отбор, договор и медицинское обеспечение; профильный диплом не является общим условием карьеры спортсмена. Для несовершеннолетних нужны специальные гарантии и согласования.",
      "sourceIds": [
        "hh2024"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно.",
      "minorRules": "Контракты младше 18 лет — только по специальным нормам; 16 — игровой стандарт, не всеобщий запрет младших возрастов."
    },
    "deputy": {
      "level": 0,
      "field": [],
      "license": null,
      "minDrivingYears": 0,
      "medical": null,
      "noRecord": true,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 0,
      "exam": null,
      "citizenship": "RF",
      "note": "Диплом не является общим избирательным цензом. Для муниципального представительного органа базовый возраст 18, для Госдумы 21; нужны гражданство, избирательные права, регистрация и избрание, а ограничения зависят от уровня и закона.",
      "sourceIds": [
        "hh2024"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно.",
      "recordRestriction": "Ограничения пассивного избирательного права по видам преступлений, срокам и судимости; не любой прошлый criminalRecord.",
      "routes": [
        {
          "office": "municipal_council",
          "minAge": 18,
          "level": 0
        },
        {
          "office": "state_duma",
          "minAge": 21,
          "level": 0
        }
      ],
      "electionRequired": true
    },
    "taxi_driver": {
      "level": 0,
      "field": [],
      "license": "B",
      "minDrivingYears": 3,
      "medical": true,
      "noRecord": true,
      "minAge": 21,
      "maxAge": null,
      "experienceYears": 0,
      "exam": null,
      "citizenship": null,
      "note": "580-ФЗ, ст. 12, 196-ФЗ и ТК РФ, ст. 328.1: B не менее 3 лет, медицинский допуск, законное отношение с перевозчиком и отсутствие специальных запретов. Региональная аттестация требуется там, где введена; разрешение перевозчика и запись в реестрах проверяются отдельно.",
      "sourceIds": [
        "taxi"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "Выведено: B с 18 + минимум три года права управления B.",
        "license": "law_or_mandatory_qualification",
        "minDrivingYears": "law_or_mandatory_qualification",
        "medical": "law_or_mandatory_qualification"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно.",
      "recordRestriction": "Специальные составы и ограничения статей 12 закона №580-ФЗ и 328.1 ТК РФ; не запрет за любое прошлое преступление.",
      "carrierPermitRequired": true,
      "regionalExamMayBeRequired": true
    },
    "long_haul_driver": {
      "level": 0,
      "field": [],
      "license": "CE",
      "minDrivingYears": 1,
      "medical": true,
      "noRecord": false,
      "minAge": 19,
      "maxAge": null,
      "experienceYears": 0,
      "exam": "driving_CE",
      "citizenship": null,
      "note": "196-ФЗ, ст. 26: для тяжёлого автопоезда CE нужна категория C не менее 12 месяцев и сдача экзаменов; обычный гражданский путь — не раньше 19 лет. Опыт международных рейсов, допуск к опасным грузам и документы на конкретный рейс — отдельно.",
      "sourceIds": [
        "driving"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "Выведено: C с 18 + минимум год владения C, обычный гражданский путь.",
        "license": "law_or_mandatory_qualification",
        "minDrivingYears": "law_or_mandatory_qualification",
        "medical": "law_or_mandatory_qualification"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно.",
      "priorLicense": "C",
      "recommendedExperienceYears": 2
    },
    "tractor_driver": {
      "level": 0,
      "field": [],
      "license": null,
      "minDrivingYears": 0,
      "medical": true,
      "noRecord": false,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 0,
      "exam": "tractor_operator",
      "citizenship": null,
      "note": "Удостоверение тракториста-машиниста после обучения, медзаключения и экзамена Гостехнадзора. Категории B/C/E/F самоходной техники обычно с 17 лет, D с 18; опасная работа несовершеннолетнему ограничена ТК РФ. Буквы не означают дорожные категории.",
      "sourceIds": [
        "tractor"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно"
      },
      "scope": "Взрослый работник на сельскохозяйственной самоходной технике.",
      "specialLicense": {
        "document": "Удостоверение тракториста-машиниста",
        "categoryByMachine": true,
        "examAge": {
          "B": 17,
          "C": 17,
          "E": 17,
          "F": 17,
          "D": 18
        }
      },
      "professionalTraining": "Подготовка тракториста-машиниста по категории машины."
    },
    "district_police": {
      "level": 1,
      "field": [
        "law"
      ],
      "license": null,
      "minDrivingYears": 0,
      "medical": true,
      "noRecord": true,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 0,
      "exam": null,
      "citizenship": "RF",
      "note": "342-ФЗ и квалификационные требования МВД: для участкового нужна соответствующая юридическая квалификация либо допускаемый ведомственными правилами путь; образование и стаж проверяют по должности. Гражданство РФ, ВВК и ограничения службы обязательны.",
      "sourceIds": [
        "police"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно"
      },
      "scope": "Участковый уполномоченный полиции.",
      "recordRestriction": "Основания статьи 14 закона №342-ФЗ, включая прошлую судимость и нереабилитирующее прекращение дела; учитывать действующие исключения.",
      "routes": [
        {
          "level": 2,
          "field": [
            "law"
          ],
          "departmentalQualificationCheck": true
        },
        {
          "level": 1,
          "field": [
            "law"
          ],
          "departmentalQualificationCheck": true,
          "note": "Только для допускаемых ведомственными требованиями случаев; не универсальный приём с любым СПО."
        },
        {
          "level": 2,
          "field": [],
          "departmentalQualificationCheck": true,
          "additionalTrainingMayBeRequired": true,
          "note": "Допускаемый ведомственными правилами путь с иным высшим образованием; решает соответствие конкретной должности."
        }
      ],
      "ageNote": "Предельный возраст первого приёма зависит от должности, звания, закона и исключений. maxAge=null, чтобы не подменять его общим устаревшим пределом 35/40 лет."
    },
    "investigator": {
      "level": 2,
      "field": [
        "law"
      ],
      "license": null,
      "minDrivingYears": 0,
      "medical": true,
      "noRecord": true,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 0,
      "exam": null,
      "citizenship": "RF",
      "note": "Для следователя нужна соответствующая высшая юридическая подготовка, медотбор, гражданство РФ и специальные проверки. Требования службы МВД и Следственного комитета различаются; исключения нельзя вывести из одного диплома.",
      "sourceIds": [
        "police"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно"
      },
      "scope": "Следователь государственного правоохранительного органа, базовый путь через юридический вуз.",
      "recordRestriction": "Специальные ограничения выбранного органа: 342-ФЗ либо 403-ФЗ; кадровая проверка обязательна."
    },
    "prosecutor": {
      "level": 2,
      "field": [
        "law"
      ],
      "license": null,
      "minDrivingYears": 0,
      "medical": true,
      "noRecord": true,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 0,
      "exam": null,
      "citizenship": "RF",
      "note": "2202-1, ст. 40.1: профильное юридическое высшее образование установленного уровня, гражданство РФ и пригодность по здоровью. Здесь начальный прокурорский работник; прокурор района/города и вышестоящие должности имеют отдельные требования к возрасту и стажу.",
      "sourceIds": [
        "prosecutor"
      ],
      "basis": {
        "level": "law_or_mandatory_qualification",
        "field": "law_or_mandatory_qualification",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно"
      },
      "scope": "Начальная прокурорская должность, например помощник; не руководитель районной прокуратуры.",
      "educationDetail": "Юридический специалитет либо магистратура после юридического бакалавриата; переходные исключения по закону.",
      "recordRestriction": "Ограничения статьи 40.1 закона о прокуратуре; проверяются кадровой службой.",
      "selection": "Ведомственный отбор и проверки; последующая аттестация по порядку службы.",
      "seniorRoleExamples": [
        {
          "role": "district_or_city_prosecutor",
          "minAge": 27,
          "prosecutorialExperienceYears": 5
        }
      ]
    },
    "judge": {
      "level": 2,
      "field": [
        "law"
      ],
      "license": null,
      "minDrivingYears": 0,
      "medical": true,
      "noRecord": true,
      "minAge": 25,
      "maxAge": 70,
      "experienceYears": 5,
      "exam": "judicial_qualification",
      "citizenship": "RF",
      "note": "Закон №3132-1, ст. 4–5: для мирового/районного судьи минимум 25 лет и 5 лет юридического стажа, юридическое образование установленного уровня, гражданство РФ, квалификационный экзамен и процедура отбора/назначения. Для высших судов возраст и стаж выше.",
      "sourceIds": [
        "judge"
      ],
      "basis": {
        "level": "law_or_mandatory_qualification",
        "field": "law_or_mandatory_qualification",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно"
      },
      "scope": "Мировой или районный судья, обычный путь впервые.",
      "educationDetail": "Юридический специалитет либо допустимая магистратура с юридическим бакалавриатом.",
      "recordRestriction": "Отсутствие судимости в прошлом/настоящем и иные ограничения статьи 4; реабилитирующие основания учитываются.",
      "appointmentRequired": true,
      "ageNote": "70 — общий предел исполнения полномочий, не предел подачи заявления; исключения для отдельных должностей отдельно.",
      "citizenshipRestrictions": "Требования к отсутствию иностранного гражданства и права постоянного проживания за рубежом — по статье 4 закона №3132-1."
    },
    "notary": {
      "level": 2,
      "field": [
        "law"
      ],
      "license": null,
      "minDrivingYears": 0,
      "medical": null,
      "noRecord": true,
      "minAge": 25,
      "maxAge": 75,
      "experienceYears": 5,
      "exam": "notarial_qualification",
      "citizenship": "RF",
      "note": "Основы о нотариате, ст. 2, 3.1, 12: гражданство РФ, юридический вуз, 5 лет юридического стажа, возраст 25–75, стажировка/экзамен и назначение на вакантную должность по конкурсу. Сдача экзамена сама по себе не создаёт место нотариуса.",
      "sourceIds": [
        "notary"
      ],
      "basis": {
        "level": "law_or_mandatory_qualification",
        "field": "law_or_mandatory_qualification",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно.",
      "recordRestriction": "Ограничения статьи 2: применимые судимости, дееспособность и другие предусмотренные законом основания.",
      "internshipRequired": true,
      "appointmentRequired": true,
      "educationDetail": "Высшее юридическое образование по установленным требованиям.",
      "ageNote": "75 — предельный возраст нотариальной деятельности; проверка точной даты прекращения отдельно.",
      "healthRestrictions": "Дееспособность и ограничения по состоянию здоровья/учёту проверяются по статье 2 Основ о нотариате; medical=null не отменяет их."
    },
    "advocate": {
      "level": 2,
      "field": [
        "law"
      ],
      "license": null,
      "minDrivingYears": 0,
      "medical": null,
      "noRecord": true,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 2,
      "exam": "advocate_qualification",
      "citizenship": null,
      "note": "63-ФЗ, ст. 9–13, 28: предусмотренное юридическое образование; 2 года учитываемого юридического стажа либо стажировка 1–2 года, квалификационный экзамен, присяга и реестр. Гражданство РФ не является общим требованием ко всем претендентам.",
      "sourceIds": [
        "advocate"
      ],
      "basis": {
        "level": "law_or_mandatory_qualification",
        "field": "law_or_mandatory_qualification",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно.",
      "recordRestriction": "Неснятая/непогашенная судимость за умышленное преступление, дееспособность и другие законные ограничения; не любая прошлая судимость.",
      "educationDetail": "С 01.07.2024 — предусмотренные законом специалитет/магистратура и сочетания дипломов; учтены переходные исключения для старого образования и стажёров.",
      "routes": [
        {
          "level": 2,
          "field": [
            "law"
          ],
          "experienceYears": 2,
          "exam": "advocate_qualification"
        },
        {
          "level": 2,
          "field": [
            "law"
          ],
          "experienceYears": 0,
          "internshipYears": [
            1,
            2
          ],
          "exam": "advocate_qualification"
        }
      ]
    },
    "ambulance_nurse": {
      "level": 1,
      "field": [
        "med"
      ],
      "license": null,
      "minDrivingYears": 0,
      "medical": true,
      "noRecord": false,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 0,
      "exam": "medical_accreditation",
      "citizenship": null,
      "note": "Профильное сестринское образование, аккредитация и предусмотренная подготовка для работы в скорой помощи. Такая роль не заменяет квалификацию фельдшера или врача бригады.",
      "sourceIds": [
        "med",
        "med2026"
      ],
      "basis": {
        "level": "law_or_mandatory_qualification",
        "field": "law_or_mandatory_qualification",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно.",
      "requiresAccreditation": true,
      "educationDetail": "Сестринское дело плюс подготовка по квалификационным требованиям должности.",
      "temporalRules": [
        {
          "fromDate": "2026-03-01",
          "rule": "Наставничество для впервые аккредитованных по применимым специальностям: перечень, срок до 3 лет, организация и исключения проверяются отдельно.",
          "doesNotApply": "Лица, завершившие обучение или впервые прошедшие соответствующую аккредитацию до 01.03.2026, и другие предусмотренные законом исключения.",
          "sourceId": "med2026"
        }
      ]
    },
    "paramedic": {
      "level": 1,
      "field": [
        "med"
      ],
      "license": null,
      "minDrivingYears": 0,
      "medical": true,
      "noRecord": false,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 0,
      "exam": "medical_accreditation",
      "citizenship": null,
      "note": "Фельдшер: СПО Лечебное дело и соответствующая аккредитация; дополнительные требования зависят от ФАПа, скорой помощи или другой должности. Диплом сестринского дела не тождествен диплому фельдшера.",
      "sourceIds": [
        "med",
        "med2026"
      ],
      "basis": {
        "level": "law_or_mandatory_qualification",
        "field": "law_or_mandatory_qualification",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно.",
      "requiresAccreditation": true,
      "educationDetail": "Лечебное дело, СПО.",
      "temporalRules": [
        {
          "fromDate": "2026-03-01",
          "rule": "Наставничество для впервые аккредитованных по применимым специальностям: перечень, срок до 3 лет, организация и исключения проверяются отдельно.",
          "doesNotApply": "Лица, завершившие обучение или впервые прошедшие соответствующую аккредитацию до 01.03.2026, и другие предусмотренные законом исключения.",
          "sourceId": "med2026"
        }
      ]
    },
    "provisor": {
      "level": 2,
      "field": [
        "med"
      ],
      "license": null,
      "minDrivingYears": 0,
      "medical": true,
      "noRecord": false,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 0,
      "exam": "pharmacy_accreditation",
      "citizenship": null,
      "note": "Провизор: высшее фармацевтическое образование и соответствующая аккредитация; для отдельных должностей нужна дополнительная подготовка. От обычного фармацевта СПО отличается уровнем и квалификацией.",
      "sourceIds": [
        "med"
      ],
      "basis": {
        "level": "law_or_mandatory_qualification",
        "field": "law_or_mandatory_qualification",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно.",
      "requiresAccreditation": true,
      "educationDetail": "Фармация, высшее образование."
    },
    "veterinarian": {
      "level": 2,
      "field": [
        "agro"
      ],
      "license": null,
      "minDrivingYears": 0,
      "medical": null,
      "noRecord": false,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 0,
      "exam": null,
      "citizenship": null,
      "note": "Закон №4979-1, ст. 4: ветеринарная деятельность требует соответствующего ветеринарного образования. Для ветеринарного врача выбран путь через ветеринарный вуз; для ветеринарного фельдшера существует отдельный путь через СПО. Частная практика имеет дополнительные правила.",
      "sourceIds": [
        "vet"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно"
      },
      "scope": "Ветеринарный врач, не ветеринарный фельдшер.",
      "educationDetail": "Ветеринария; agro — укрупнённая игровая группа, не любой аграрный диплом."
    },
    "barista": {
      "level": 0,
      "field": [],
      "license": null,
      "minDrivingYears": 0,
      "medical": true,
      "noRecord": false,
      "minAge": 16,
      "maxAge": null,
      "experienceYears": 0,
      "exam": null,
      "citizenship": null,
      "note": "Для приготовления кофе диплом СПО обычно не требуется, обучение возможно на рабочем месте. Общепит требует предусмотренных медосмотров и санитарной подготовки; работа с алкоголем и ночные смены несовершеннолетних ограничены отдельно.",
      "sourceIds": [
        "foodmedical"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно.",
      "professionalTraining": "Вводное обучение приготовлению напитков и санитарным процедурам."
    },
    "waiter": {
      "level": 0,
      "field": [],
      "license": null,
      "minDrivingYears": 0,
      "medical": true,
      "noRecord": false,
      "minAge": 16,
      "maxAge": null,
      "experienceYears": 0,
      "exam": null,
      "citizenship": null,
      "note": "Практика: обучение на рабочем месте, навыки обслуживания и санитарная подготовка; для общепита — обязательные медосмотры. Для несовершеннолетних есть ограничения ночных смен и работ с алкогольной продукцией.",
      "sourceIds": [
        "foodmedical"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно."
    },
    "marketplace_manager": {
      "level": 0,
      "field": [],
      "license": null,
      "minDrivingYears": 0,
      "medical": null,
      "noRecord": false,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 0,
      "exam": null,
      "citizenship": null,
      "note": "Практика: работа с кабинетами продавца, ассортиментом, ценами и аналитикой. Обязательного государственного диплома для этой общей роли нет; требуемые навыки определяет работодатель.",
      "sourceIds": [
        "hh2024"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно.",
      "recommendedEducation": {
        "level": 1,
        "field": [
          "econ",
          "it"
        ]
      }
    },
    "smm_specialist": {
      "level": 0,
      "field": [],
      "license": null,
      "minDrivingYears": 0,
      "medical": null,
      "noRecord": false,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 0,
      "exam": null,
      "citizenship": null,
      "note": "Практика: портфолио, работа с контентом и аналитикой; общего требования профильного диплома нет. Для рекламы действуют правила маркировки, прав на материалы и содержания публикаций.",
      "sourceIds": [
        "hh2024"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно.",
      "recommendedEducation": {
        "level": 2,
        "field": [
          "hum",
          "econ"
        ]
      }
    },
    "qa_tester": {
      "level": 0,
      "field": [],
      "license": null,
      "minDrivingYears": 0,
      "medical": null,
      "noRecord": false,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 0,
      "exam": null,
      "citizenship": null,
      "note": "Практика: тестовые задания, базовые технические навыки и работа с дефектами. Вуз или СПО могут требоваться работодателем, но универсального дипломного ценза нет.",
      "sourceIds": [
        "hh2024"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно.",
      "recommendedEducation": {
        "level": 1,
        "field": [
          "it",
          "eng"
        ]
      }
    },
    "sysadmin": {
      "level": 0,
      "field": [],
      "license": null,
      "minDrivingYears": 0,
      "medical": null,
      "noRecord": false,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 0,
      "exam": null,
      "citizenship": null,
      "note": "Практика: подтверждённые навыки администрирования; СПО/вуз полезны, но общего дипломного допуска нет. Для защищённых систем, гостайны и отдельных организаций требования дополнительные.",
      "sourceIds": [
        "hh2024"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно.",
      "recommendedEducation": {
        "level": 1,
        "field": [
          "it",
          "eng"
        ]
      }
    },
    "crane_operator": {
      "level": 0,
      "field": [],
      "license": null,
      "minDrivingYears": 0,
      "medical": true,
      "noRecord": false,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 0,
      "exam": "crane_operator_qualification",
      "citizenship": null,
      "note": "Профобучение машиниста крана, обязательные осмотры, проверка знаний и допуск к конкретному типу подъёмного сооружения. Требования зависят от крана и объекта. Автокран дополнительно требует дорожную категорию по шасси.",
      "sourceIds": [
        "crane"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно"
      },
      "scope": "Крановщик на подъёмном сооружении; тип крана и объект проверяются отдельно.",
      "professionalTraining": "Профобучение по типу крана, охрана труда, проверка знаний и допуск работодателя.",
      "specialCertificate": "Квалификация и удостоверение/допуск по типу подъёмного сооружения."
    },
    "metro_driver": {
      "level": 0,
      "field": [],
      "license": null,
      "minDrivingYears": 0,
      "medical": true,
      "noRecord": false,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 0,
      "exam": "metro_driver_qualification",
      "citizenship": null,
      "note": "Путь работодателя: среднее общее образование, профессиональное обучение в технической школе, медицинская пригодность, экзамены и допуск к самостоятельной работе. Диплом вуза и автомобильные права не заменяют обучение машиниста.",
      "sourceIds": [
        "metro"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно.",
      "generalEducation": "secondary_general",
      "professionalTraining": "Ученический договор, техническая школа и проверка квалификации.",
      "specialCertificate": "Допуск к самостоятельной работе по процедурам метрополитена."
    },
    "dispatcher": {
      "level": 0,
      "field": [],
      "license": null,
      "minDrivingYears": 0,
      "medical": null,
      "noRecord": false,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 0,
      "exam": null,
      "citizenship": null,
      "note": "Практика: диспетчеризация службы доставки, телефонная связь, маршрутизация и учёт заказов. Для этой роли общего дипломного ценза нет; специальные транспортные/авиационные должности регулируются отдельно.",
      "sourceIds": [
        "hh2024"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно"
      },
      "scope": "Диспетчер службы доставки и заказов.",
      "recommendedEducation": {
        "level": 1,
        "field": [
          "econ",
          "it"
        ]
      }
    },
    "call_center_operator": {
      "level": 0,
      "field": [],
      "license": null,
      "minDrivingYears": 0,
      "medical": null,
      "noRecord": false,
      "minAge": 16,
      "maxAge": null,
      "experienceYears": 0,
      "exam": null,
      "citizenship": null,
      "note": "Практика: грамотная речь, работа с программой и обучение продукту. Специального государственного диплома для обычного оператора нет; отдельные сферы требуют специальных компетенций.",
      "sourceIds": [
        "hh2024"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно."
    },
    "bank_cashier": {
      "level": 0,
      "field": [],
      "license": null,
      "minDrivingYears": 0,
      "medical": null,
      "noRecord": false,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 0,
      "exam": null,
      "citizenship": null,
      "note": "Практика банка: кассовая подготовка, проверка навыков и внутренний допуск к наличности. Профильное СПО обычно востребовано, но единого закона «всем кассирам банка только финансовый вуз» нет.",
      "sourceIds": [
        "hh2024"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно.",
      "recommendedEducation": {
        "level": 1,
        "field": [
          "econ"
        ]
      },
      "professionalTraining": "Внутренние кассовые процедуры банка, работа с наличностью и документами."
    },
    "realtor": {
      "level": 0,
      "field": [],
      "license": null,
      "minDrivingYears": 0,
      "medical": null,
      "noRecord": false,
      "minAge": 18,
      "maxAge": null,
      "experienceYears": 0,
      "exam": null,
      "citizenship": null,
      "note": "Практика: знание сделок, договоров и проверок; общего обязательного государственного лицензирования риелтора и единого дипломного ценза нет. Добровольные сертификаты и требования агентства — отдельные условия.",
      "sourceIds": [
        "hh2024"
      ],
      "basis": {
        "level": "practice",
        "field": "practice",
        "minAge": "[~] взрослый сценарий; специальные случаи несовершеннолетних отдельно"
      },
      "scope": "Типичная начальная роль; специальные должности внутри профессии проверяются отдельно.",
      "recommendedEducation": {
        "level": 1,
        "field": [
          "law",
          "econ"
        ]
      }
    }
  },
  "professions": [
    {
      "id": "taxi_driver",
      "m": "водитель такси",
      "f": "водитель такси",
      "edu": 0,
      "wage": 95000,
      "sd": 0.45,
      "shadow": 0.35,
      "sector": "private",
      "arrears": 0.1,
      "sex": {
        "m": 1,
        "f": 1
      },
      "alcohol": 1.0,
      "injury": 1.8,
      "unempl": 1.0,
      "fromYear": 1985,
      "wageYear": 2024,
      "wageCurrency": "RUB",
      "wageStatistic": "[~] месячный эквивалент профессионального дохода после прямых расходов до личного налога; не гарантированный оклад",
      "wageSourceIds": [
        "hh2024",
        "hhstats",
        "rosstat"
      ],
      "modelParametersQuality": "[~] sd/shadow/arrears/alcohol/injury/unempl и год доступности — игровой баланс"
    },
    {
      "id": "long_haul_driver",
      "m": "водитель-дальнобойщик",
      "f": "водитель-дальнобойщица",
      "edu": 0,
      "wage": 150000,
      "sd": 0.4,
      "shadow": 0.25,
      "sector": "private",
      "arrears": 0.3,
      "sex": {
        "m": 1,
        "f": 1
      },
      "alcohol": 1.0,
      "injury": 2.2,
      "unempl": 0.7,
      "fromYear": 1985,
      "wageYear": 2024,
      "wageCurrency": "RUB",
      "wageStatistic": "[~] оценка медианного уровня, не медиана рассчитанной выборки",
      "wageSourceIds": [
        "hh2024",
        "hhstats",
        "rosstat"
      ],
      "modelParametersQuality": "[~] sd/shadow/arrears/alcohol/injury/unempl и год доступности — игровой баланс"
    },
    {
      "id": "tractor_driver",
      "m": "тракторист-машинист",
      "f": "трактористка-машинист",
      "edu": 0,
      "wage": 65000,
      "sd": 0.35,
      "shadow": 0.25,
      "sector": "private",
      "arrears": 0.8,
      "sex": {
        "m": 1,
        "f": 1
      },
      "alcohol": 1.0,
      "injury": 1.9,
      "unempl": 1.1,
      "fromYear": 1985,
      "wageYear": 2024,
      "wageCurrency": "RUB",
      "wageStatistic": "[~] оценка медианного уровня, не медиана рассчитанной выборки",
      "wageSourceIds": [
        "hh2024",
        "hhstats",
        "rosstat"
      ],
      "modelParametersQuality": "[~] sd/shadow/arrears/alcohol/injury/unempl и год доступности — игровой баланс"
    },
    {
      "id": "district_police",
      "m": "участковый уполномоченный полиции",
      "f": "участковая уполномоченная полиции",
      "edu": 1,
      "wage": 70000,
      "sd": 0.25,
      "shadow": 0.0,
      "sector": "budget",
      "arrears": 0.8,
      "sex": {
        "m": 1,
        "f": 1
      },
      "alcohol": 1.0,
      "injury": 1.4,
      "unempl": 0.4,
      "fromYear": 1985,
      "wageYear": 2024,
      "wageCurrency": "RUB",
      "wageStatistic": "[~] центральный уровень денежного содержания 2024; не измеренная медиана вакансий hh.ru",
      "wageSourceIds": [
        "hh2024",
        "hhstats",
        "rosstat"
      ],
      "modelParametersQuality": "[~] sd/shadow/arrears/alcohol/injury/unempl и год доступности — игровой баланс"
    },
    {
      "id": "investigator",
      "m": "следователь",
      "f": "следователь",
      "edu": 2,
      "wage": 85000,
      "sd": 0.3,
      "shadow": 0.0,
      "sector": "budget",
      "arrears": 0.8,
      "sex": {
        "m": 1,
        "f": 1
      },
      "alcohol": 0.95,
      "injury": 1.1,
      "unempl": 0.4,
      "fromYear": 1985,
      "wageYear": 2024,
      "wageCurrency": "RUB",
      "wageStatistic": "[~] центральный уровень денежного содержания 2024; не измеренная медиана вакансий hh.ru",
      "wageSourceIds": [
        "hh2024",
        "hhstats",
        "rosstat"
      ],
      "modelParametersQuality": "[~] sd/shadow/arrears/alcohol/injury/unempl и год доступности — игровой баланс"
    },
    {
      "id": "prosecutor",
      "m": "прокурорский работник",
      "f": "прокурорский работник",
      "edu": 2,
      "wage": 100000,
      "sd": 0.3,
      "shadow": 0.0,
      "sector": "budget",
      "arrears": 0.7,
      "sex": {
        "m": 1,
        "f": 1
      },
      "alcohol": 0.9,
      "injury": 0.6,
      "unempl": 0.3,
      "fromYear": 1985,
      "wageYear": 2024,
      "wageCurrency": "RUB",
      "wageStatistic": "[~] центральный уровень денежного содержания 2024; не измеренная медиана вакансий hh.ru",
      "wageSourceIds": [
        "hh2024",
        "hhstats",
        "rosstat"
      ],
      "modelParametersQuality": "[~] sd/shadow/arrears/alcohol/injury/unempl и год доступности — игровой баланс"
    },
    {
      "id": "judge",
      "m": "судья",
      "f": "судья",
      "edu": 2,
      "wage": 160000,
      "sd": 0.3,
      "shadow": 0.0,
      "sector": "budget",
      "arrears": 0.3,
      "sex": {
        "m": 1,
        "f": 1
      },
      "alcohol": 0.9,
      "injury": 0.3,
      "unempl": 0.2,
      "fromYear": 1985,
      "wageYear": 2024,
      "wageCurrency": "RUB",
      "wageStatistic": "[~] центральный уровень денежного содержания 2024; не измеренная медиана вакансий hh.ru",
      "wageSourceIds": [
        "hh2024",
        "hhstats",
        "rosstat"
      ],
      "modelParametersQuality": "[~] sd/shadow/arrears/alcohol/injury/unempl и год доступности — игровой баланс"
    },
    {
      "id": "notary",
      "m": "нотариус",
      "f": "нотариус",
      "edu": 2,
      "wage": 180000,
      "sd": 0.6,
      "shadow": 0.05,
      "sector": "private",
      "arrears": 0.0,
      "sex": {
        "m": 1,
        "f": 1
      },
      "alcohol": 0.9,
      "injury": 0.2,
      "unempl": 0.5,
      "fromYear": 1985,
      "wageYear": 2024,
      "wageCurrency": "RUB",
      "wageStatistic": "[~] месячный эквивалент профессионального дохода после прямых расходов до личного налога; не гарантированный оклад",
      "wageSourceIds": [
        "hh2024",
        "hhstats",
        "rosstat"
      ],
      "modelParametersQuality": "[~] sd/shadow/arrears/alcohol/injury/unempl и год доступности — игровой баланс"
    },
    {
      "id": "advocate",
      "m": "адвокат",
      "f": "адвокат",
      "edu": 2,
      "wage": 100000,
      "sd": 0.7,
      "shadow": 0.2,
      "sector": "private",
      "arrears": 0.1,
      "sex": {
        "m": 1,
        "f": 1
      },
      "alcohol": 0.95,
      "injury": 0.3,
      "unempl": 1.1,
      "fromYear": 1985,
      "wageYear": 2024,
      "wageCurrency": "RUB",
      "wageStatistic": "[~] месячный эквивалент профессионального дохода после прямых расходов до личного налога; не гарантированный оклад",
      "wageSourceIds": [
        "hh2024",
        "hhstats",
        "rosstat"
      ],
      "modelParametersQuality": "[~] sd/shadow/arrears/alcohol/injury/unempl и год доступности — игровой баланс"
    },
    {
      "id": "ambulance_nurse",
      "m": "медицинский брат скорой помощи",
      "f": "медицинская сестра скорой помощи",
      "edu": 1,
      "wage": 65000,
      "sd": 0.3,
      "shadow": 0.02,
      "sector": "budget",
      "arrears": 1.0,
      "sex": {
        "m": 1,
        "f": 1
      },
      "alcohol": 0.8,
      "injury": 1.2,
      "unempl": 0.3,
      "fromYear": 1985,
      "wageYear": 2024,
      "wageCurrency": "RUB",
      "wageStatistic": "[~] оценка медианного уровня, не медиана рассчитанной выборки",
      "wageSourceIds": [
        "hh2024",
        "hhstats",
        "rosstat",
        "hhmed"
      ],
      "modelParametersQuality": "[~] sd/shadow/arrears/alcohol/injury/unempl и год доступности — игровой баланс"
    },
    {
      "id": "paramedic",
      "m": "фельдшер",
      "f": "фельдшер",
      "edu": 1,
      "wage": 65000,
      "sd": 0.3,
      "shadow": 0.02,
      "sector": "budget",
      "arrears": 1.0,
      "sex": {
        "m": 1,
        "f": 1
      },
      "alcohol": 0.85,
      "injury": 0.9,
      "unempl": 0.3,
      "fromYear": 1985,
      "wageYear": 2024,
      "wageCurrency": "RUB",
      "wageStatistic": "[~] оценка медианного уровня, не медиана рассчитанной выборки",
      "wageSourceIds": [
        "hh2024",
        "hhstats",
        "rosstat",
        "hhmed"
      ],
      "modelParametersQuality": "[~] sd/shadow/arrears/alcohol/injury/unempl и год доступности — игровой баланс"
    },
    {
      "id": "provisor",
      "m": "провизор",
      "f": "провизор",
      "edu": 2,
      "wage": 65000,
      "sd": 0.25,
      "shadow": 0.04,
      "sector": "private",
      "arrears": 0.4,
      "sex": {
        "m": 1,
        "f": 1
      },
      "alcohol": 0.8,
      "injury": 0.4,
      "unempl": 0.5,
      "fromYear": 1985,
      "wageYear": 2024,
      "wageCurrency": "RUB",
      "wageStatistic": "[~] оценка медианного уровня, не медиана рассчитанной выборки",
      "wageSourceIds": [
        "hh2024",
        "hhstats",
        "rosstat",
        "hhmed"
      ],
      "modelParametersQuality": "[~] sd/shadow/arrears/alcohol/injury/unempl и год доступности — игровой баланс"
    },
    {
      "id": "veterinarian",
      "m": "ветеринарный врач",
      "f": "ветеринарный врач",
      "edu": 2,
      "wage": 65000,
      "sd": 0.4,
      "shadow": 0.2,
      "sector": "private",
      "arrears": 0.6,
      "sex": {
        "m": 1,
        "f": 1
      },
      "alcohol": 0.85,
      "injury": 1.2,
      "unempl": 0.8,
      "fromYear": 1985,
      "wageYear": 2024,
      "wageCurrency": "RUB",
      "wageStatistic": "[~] оценка медианного уровня, не медиана рассчитанной выборки",
      "wageSourceIds": [
        "hh2024",
        "hhstats",
        "rosstat"
      ],
      "modelParametersQuality": "[~] sd/shadow/arrears/alcohol/injury/unempl и год доступности — игровой баланс"
    },
    {
      "id": "barista",
      "m": "бариста",
      "f": "бариста",
      "edu": 0,
      "wage": 45000,
      "sd": 0.3,
      "shadow": 0.35,
      "sector": "private",
      "arrears": 0.2,
      "sex": {
        "m": 1,
        "f": 1
      },
      "alcohol": 0.9,
      "injury": 0.6,
      "unempl": 1.1,
      "fromYear": 1995,
      "wageYear": 2024,
      "wageCurrency": "RUB",
      "wageStatistic": "[~] оценка медианного уровня, не медиана рассчитанной выборки",
      "wageSourceIds": [
        "hh2024",
        "hhstats",
        "rosstat"
      ],
      "modelParametersQuality": "[~] sd/shadow/arrears/alcohol/injury/unempl и год доступности — игровой баланс"
    },
    {
      "id": "waiter",
      "m": "официант",
      "f": "официантка",
      "edu": 0,
      "wage": 50000,
      "sd": 0.4,
      "shadow": 0.4,
      "sector": "private",
      "arrears": 0.3,
      "sex": {
        "m": 1,
        "f": 1
      },
      "alcohol": 1.0,
      "injury": 0.7,
      "unempl": 1.2,
      "fromYear": 1985,
      "wageYear": 2024,
      "wageCurrency": "RUB",
      "wageStatistic": "[~] оценка медианного уровня, не медиана рассчитанной выборки",
      "wageSourceIds": [
        "hh2024",
        "hhstats",
        "rosstat"
      ],
      "modelParametersQuality": "[~] sd/shadow/arrears/alcohol/injury/unempl и год доступности — игровой баланс"
    },
    {
      "id": "marketplace_manager",
      "m": "менеджер маркетплейсов",
      "f": "менеджер маркетплейсов",
      "edu": 0,
      "wage": 75000,
      "sd": 0.4,
      "shadow": 0.25,
      "sector": "private",
      "arrears": 0.0,
      "sex": {
        "m": 1,
        "f": 1
      },
      "alcohol": 0.8,
      "injury": 0.2,
      "unempl": 1.1,
      "fromYear": 2010,
      "wageYear": 2024,
      "wageCurrency": "RUB",
      "wageStatistic": "[~] оценка медианного уровня, не медиана рассчитанной выборки",
      "wageSourceIds": [
        "hh2024",
        "hhstats",
        "rosstat"
      ],
      "modelParametersQuality": "[~] sd/shadow/arrears/alcohol/injury/unempl и год доступности — игровой баланс"
    },
    {
      "id": "smm_specialist",
      "m": "SMM-специалист",
      "f": "SMM-специалист",
      "edu": 0,
      "wage": 60000,
      "sd": 0.45,
      "shadow": 0.35,
      "sector": "private",
      "arrears": 0.0,
      "sex": {
        "m": 1,
        "f": 1
      },
      "alcohol": 0.85,
      "injury": 0.2,
      "unempl": 1.3,
      "fromYear": 2008,
      "wageYear": 2024,
      "wageCurrency": "RUB",
      "wageStatistic": "[~] оценка медианного уровня, не медиана рассчитанной выборки",
      "wageSourceIds": [
        "hh2024",
        "hhstats",
        "rosstat"
      ],
      "modelParametersQuality": "[~] sd/shadow/arrears/alcohol/injury/unempl и год доступности — игровой баланс"
    },
    {
      "id": "qa_tester",
      "m": "тестировщик программного обеспечения",
      "f": "тестировщица программного обеспечения",
      "edu": 0,
      "wage": 90000,
      "sd": 0.4,
      "shadow": 0.08,
      "sector": "private",
      "arrears": 0.1,
      "sex": {
        "m": 1,
        "f": 1
      },
      "alcohol": 0.75,
      "injury": 0.2,
      "unempl": 0.9,
      "fromYear": 1990,
      "wageYear": 2024,
      "wageCurrency": "RUB",
      "wageStatistic": "[~] оценка медианного уровня, не медиана рассчитанной выборки",
      "wageSourceIds": [
        "hh2024",
        "hhstats",
        "rosstat"
      ],
      "modelParametersQuality": "[~] sd/shadow/arrears/alcohol/injury/unempl и год доступности — игровой баланс"
    },
    {
      "id": "sysadmin",
      "m": "системный администратор",
      "f": "системный администратор",
      "edu": 0,
      "wage": 80000,
      "sd": 0.35,
      "shadow": 0.12,
      "sector": "private",
      "arrears": 0.3,
      "sex": {
        "m": 1,
        "f": 1
      },
      "alcohol": 0.8,
      "injury": 0.3,
      "unempl": 0.8,
      "fromYear": 1990,
      "wageYear": 2024,
      "wageCurrency": "RUB",
      "wageStatistic": "[~] оценка медианного уровня, не медиана рассчитанной выборки",
      "wageSourceIds": [
        "hh2024",
        "hhstats",
        "rosstat"
      ],
      "modelParametersQuality": "[~] sd/shadow/arrears/alcohol/injury/unempl и год доступности — игровой баланс"
    },
    {
      "id": "crane_operator",
      "m": "машинист крана",
      "f": "машинист крана",
      "edu": 0,
      "wage": 105000,
      "sd": 0.35,
      "shadow": 0.2,
      "sector": "private",
      "arrears": 0.6,
      "sex": {
        "m": 1,
        "f": 1
      },
      "alcohol": 0.9,
      "injury": 2.3,
      "unempl": 0.7,
      "fromYear": 1985,
      "wageYear": 2024,
      "wageCurrency": "RUB",
      "wageStatistic": "[~] оценка медианного уровня, не медиана рассчитанной выборки",
      "wageSourceIds": [
        "hh2024",
        "hhstats",
        "rosstat"
      ],
      "modelParametersQuality": "[~] sd/shadow/arrears/alcohol/injury/unempl и год доступности — игровой баланс"
    },
    {
      "id": "metro_driver",
      "m": "машинист электропоезда метро",
      "f": "машинист электропоезда метро",
      "edu": 0,
      "wage": 95000,
      "sd": 0.25,
      "shadow": 0.0,
      "sector": "state",
      "arrears": 0.5,
      "sex": {
        "m": 1,
        "f": 1
      },
      "alcohol": 0.8,
      "injury": 1.2,
      "unempl": 0.3,
      "fromYear": 1985,
      "wageYear": 2024,
      "wageCurrency": "RUB",
      "wageStatistic": "[~] оценка медианного уровня, не медиана рассчитанной выборки",
      "wageSourceIds": [
        "hh2024",
        "hhstats",
        "rosstat"
      ],
      "modelParametersQuality": "[~] sd/shadow/arrears/alcohol/injury/unempl и год доступности — игровой баланс"
    },
    {
      "id": "dispatcher",
      "m": "диспетчер службы доставки",
      "f": "диспетчер службы доставки",
      "edu": 0,
      "wage": 50000,
      "sd": 0.25,
      "shadow": 0.15,
      "sector": "private",
      "arrears": 0.2,
      "sex": {
        "m": 1,
        "f": 1
      },
      "alcohol": 0.8,
      "injury": 0.3,
      "unempl": 1.0,
      "fromYear": 1995,
      "wageYear": 2024,
      "wageCurrency": "RUB",
      "wageStatistic": "[~] оценка медианного уровня, не медиана рассчитанной выборки",
      "wageSourceIds": [
        "hh2024",
        "hhstats",
        "rosstat"
      ],
      "modelParametersQuality": "[~] sd/shadow/arrears/alcohol/injury/unempl и год доступности — игровой баланс"
    },
    {
      "id": "call_center_operator",
      "m": "оператор колл-центра",
      "f": "оператор колл-центра",
      "edu": 0,
      "wage": 45000,
      "sd": 0.3,
      "shadow": 0.2,
      "sector": "private",
      "arrears": 0.1,
      "sex": {
        "m": 1,
        "f": 1
      },
      "alcohol": 0.85,
      "injury": 0.2,
      "unempl": 1.3,
      "fromYear": 1995,
      "wageYear": 2024,
      "wageCurrency": "RUB",
      "wageStatistic": "[~] оценка медианного уровня, не медиана рассчитанной выборки",
      "wageSourceIds": [
        "hh2024",
        "hhstats",
        "rosstat"
      ],
      "modelParametersQuality": "[~] sd/shadow/arrears/alcohol/injury/unempl и год доступности — игровой баланс"
    },
    {
      "id": "bank_cashier",
      "m": "кассир банка",
      "f": "кассир банка",
      "edu": 0,
      "wage": 55000,
      "sd": 0.25,
      "shadow": 0.02,
      "sector": "private",
      "arrears": 0.2,
      "sex": {
        "m": 1,
        "f": 1
      },
      "alcohol": 0.8,
      "injury": 0.3,
      "unempl": 0.9,
      "fromYear": 1985,
      "wageYear": 2024,
      "wageCurrency": "RUB",
      "wageStatistic": "[~] оценка медианного уровня, не медиана рассчитанной выборки",
      "wageSourceIds": [
        "hh2024",
        "hhstats",
        "rosstat"
      ],
      "modelParametersQuality": "[~] sd/shadow/arrears/alcohol/injury/unempl и год доступности — игровой баланс"
    },
    {
      "id": "realtor",
      "m": "риелтор",
      "f": "риелтор",
      "edu": 0,
      "wage": 95000,
      "sd": 0.8,
      "shadow": 0.35,
      "sector": "private",
      "arrears": 0.1,
      "sex": {
        "m": 1,
        "f": 1
      },
      "alcohol": 0.95,
      "injury": 0.4,
      "unempl": 1.5,
      "fromYear": 1992,
      "wageYear": 2024,
      "wageCurrency": "RUB",
      "wageStatistic": "[~] месячный эквивалент профессионального дохода после прямых расходов до личного налога; не гарантированный оклад",
      "wageSourceIds": [
        "hh2024",
        "hhstats",
        "rosstat"
      ],
      "modelParametersQuality": "[~] sd/shadow/arrears/alcohol/injury/unempl и год доступности — игровой баланс"
    }
  ]
};
