/*
Хронические заболевания: симптомы/последствия, явные возрастные профили и оценочные игровые параметры [~].
Составлено: 2026-10-27.
Источник rosstat: Росстат, Здравоохранение в России — 2023 (классы причин и показатели) — https://rosstat.gov.ru/storage/mediabank/Zdravoohran-2023.pdf
Источник icd: ВОЗ, МКБ-10, классификация заболеваний и причин смерти — https://icd.who.int/browse10/2019/en
Источник clinical: Минздрав России, рубрикатор клинических рекомендаций — https://cr.minzdrav.gov.ru/
Источник oms: Программа государственных гарантий на 2025 год, постановление №1940 от 27.12.2024, официальный экземпляр ФМБА — https://skfmba.ru/files/docs/oms/State_guarantee_program_for_2025.pdf
[~] = оценка для игры; не официальное измерение. null = данных нет / неприменимо, не ноль.
Обычный справочник: подключение и применение выполняет потребитель данных.
*/
RL.DATA.diseasesExt = {
  "meta": {
    "schemaVersion": 1,
    "compiledAt": "2026-10-27",
    "sources": [
      {
        "id": "rosstat",
        "title": "Росстат, Здравоохранение в России — 2023 (классы причин и показатели)",
        "url": "https://rosstat.gov.ru/storage/mediabank/Zdravoohran-2023.pdf",
        "kind": "primary"
      },
      {
        "id": "icd",
        "title": "ВОЗ, МКБ-10, классификация заболеваний и причин смерти",
        "url": "https://icd.who.int/browse10/2019/en",
        "kind": "primary"
      },
      {
        "id": "clinical",
        "title": "Минздрав России, рубрикатор клинических рекомендаций",
        "url": "https://cr.minzdrav.gov.ru/",
        "kind": "primary"
      },
      {
        "id": "oms",
        "title": "Программа государственных гарантий на 2025 год, постановление №1940 от 27.12.2024, официальный экземпляр ФМБА",
        "url": "https://skfmba.ru/files/docs/oms/State_guarantee_program_for_2025.pdf",
        "kind": "primary"
      }
    ],
    "notes": [
      "Все численные частоты, множители риска и цены — [~] параметры игры, не эпидемиологическая выгрузка и не медицинские рекомендации.",
      "Частота: новые диагнозы за год на 100000 лиц соответствующего пола и возраста без данного диагноза; это не распространённость. Ступени возраста указаны явно.",
      "Для врождённых состояний модель первичного выявления в 0–4 года усреднена по пяти годам [~]; не подменяет частоту на 100000 живорождённых.",
      "Север не считается универсальной причиной болезни. null в факторах = нет заданного/обоснованного коэффициента; нельзя заменять произвольным штрафом.",
      "Риски не складывать без нормировки общей популяционной частоты. Болезни могут пересекаться (например, диабет и ХБП); это не независимые броски.",
      "Пол в таблице — модельный биологический параметр для эпидемиологических частот. Женские репродуктивные диагнозы и гиперплазия простаты имеют нулевую частоту у неприменимого пола.",
      "Платные цены — усреднённые помесячные расходы, не стоимость стационара, операций, диализа или всей терапии редкого заболевания."
    ]
  },
  "ageBands": [
    [
      0,
      4
    ],
    [
      5,
      14
    ],
    [
      15,
      24
    ],
    [
      25,
      39
    ],
    [
      40,
      54
    ],
    [
      55,
      69
    ],
    [
      70,
      84
    ],
    [
      85,
      110
    ]
  ],
  "sexKeys": [
    "m",
    "f"
  ],
  "items": [
    {
      "id": "hypertension",
      "name": "Артериальная гипертензия",
      "icd10": "I10",
      "incidencePer100kYear": {
        "m": [
          0.0,
          6.0,
          60.0,
          300.0,
          1200.0,
          3000.0,
          4500.0,
          5400.0
        ],
        "f": [
          0.0,
          6.6,
          66.0,
          330.0,
          1320.0,
          3300.0,
          4950.0,
          5940.0
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": {
          "multiplier": 1.7,
          "quality": "[~] игровой коэффициент, не причинный эффект из исследования"
        },
        "alcohol": {
          "multiplier": 1.6,
          "quality": "[~] игровой коэффициент, не причинный эффект из исследования"
        },
        "obesity": {
          "multiplier": 1.8,
          "quality": "[~] игровой коэффициент, не причинный эффект из исследования"
        },
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Инсульт, поражение сердца и почек"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          300,
          2400
        ],
        "privateMonthlyRub": [
          1000,
          6000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "ischemic_heart",
      "name": "Хроническая ишемическая болезнь сердца",
      "icd10": "I25",
      "incidencePer100kYear": {
        "m": [
          0.0,
          1.8,
          18.0,
          90.0,
          360.0,
          900.0,
          1350.0,
          1620.0
        ],
        "f": [
          0.0,
          1.17,
          11.7,
          58.5,
          234.0,
          585.0,
          877.5,
          1053.0
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": {
          "multiplier": 1.7,
          "quality": "[~] игровой коэффициент, не причинный эффект из исследования"
        },
        "alcohol": {
          "multiplier": 1.6,
          "quality": "[~] игровой коэффициент, не причинный эффект из исследования"
        },
        "obesity": {
          "multiplier": 1.8,
          "quality": "[~] игровой коэффициент, не причинный эффект из исследования"
        },
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Стенокардия, инфаркт, сердечная недостаточность"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          600,
          4800
        ],
        "privateMonthlyRub": [
          2000,
          12000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "heart_failure",
      "name": "Хроническая сердечная недостаточность",
      "icd10": "I50",
      "incidencePer100kYear": {
        "m": [
          0.0,
          0.0,
          0.45,
          3.6,
          22.5,
          135.0,
          450.0,
          765.0
        ],
        "f": [
          0.0,
          0.0,
          0.405,
          3.24,
          20.25,
          121.5,
          405.0,
          688.5
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": null,
        "alcohol": {
          "multiplier": 1.6,
          "quality": "[~] игровой коэффициент, не причинный эффект из исследования"
        },
        "obesity": {
          "multiplier": 1.8,
          "quality": "[~] игровой коэффициент, не причинный эффект из исследования"
        },
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Одышка, отёки, повторные госпитализации"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          900,
          7200
        ],
        "privateMonthlyRub": [
          3000,
          18000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "atrial_fibrillation",
      "name": "Фибрилляция предсердий",
      "icd10": "I48",
      "incidencePer100kYear": {
        "m": [
          0.0,
          0.0,
          0.5,
          4.0,
          25.0,
          150.0,
          500.0,
          850.0
        ],
        "f": [
          0.0,
          0.0,
          0.4,
          3.2,
          20.0,
          120.0,
          400.0,
          680.0
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": null,
        "alcohol": {
          "multiplier": 1.6,
          "quality": "[~] игровой коэффициент, не причинный эффект из исследования"
        },
        "obesity": {
          "multiplier": 1.8,
          "quality": "[~] игровой коэффициент, не причинный эффект из исследования"
        },
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Тромбоэмболии и инсульт"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          750,
          5200
        ],
        "privateMonthlyRub": [
          2500,
          13000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "cardiomyopathy",
      "name": "Дилатационная кардиомиопатия",
      "icd10": "I42.0",
      "incidencePer100kYear": {
        "m": [
          0.18,
          0.9,
          3.6,
          9.0,
          10.8,
          9.9,
          7.2,
          4.5
        ],
        "f": [
          0.099,
          0.495,
          1.98,
          4.95,
          5.94,
          5.445,
          3.96,
          2.475
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": null,
        "alcohol": {
          "multiplier": 1.6,
          "quality": "[~] игровой коэффициент, не причинный эффект из исследования"
        },
        "obesity": null,
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Сердечная недостаточность и аритмии"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          900,
          6000
        ],
        "privateMonthlyRub": [
          3000,
          15000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "asthma",
      "name": "Бронхиальная астма",
      "icd10": "J45",
      "incidencePer100kYear": {
        "m": [
          110.0,
          220.0,
          132.0,
          66.0,
          55.0,
          44.0,
          33.0,
          22.0
        ],
        "f": [
          126.5,
          253.0,
          151.8,
          75.9,
          63.25,
          50.6,
          37.95,
          25.3
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": {
          "multiplier": 1.7,
          "quality": "[~] игровой коэффициент, не причинный эффект из исследования"
        },
        "alcohol": null,
        "obesity": null,
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Приступы затруднённого дыхания, ограничения активности"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          450,
          3400
        ],
        "privateMonthlyRub": [
          1500,
          8500
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "copd",
      "name": "ХОБЛ",
      "icd10": "J44",
      "incidencePer100kYear": {
        "m": [
          0.0,
          1.3,
          13.0,
          65.0,
          260.0,
          650.0,
          975.0,
          1170.0
        ],
        "f": [
          0.0,
          0.65,
          6.5,
          32.5,
          130.0,
          325.0,
          487.5,
          585.0
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": {
          "multiplier": 1.7,
          "quality": "[~] игровой коэффициент, не причинный эффект из исследования"
        },
        "alcohol": null,
        "obesity": null,
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Дыхательная недостаточность, обострения"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          750,
          5200
        ],
        "privateMonthlyRub": [
          2500,
          13000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "bronchiectasis",
      "name": "Бронхоэктатическая болезнь",
      "icd10": "J47",
      "incidencePer100kYear": {
        "m": [
          0.16,
          0.8,
          3.2,
          8.0,
          9.6,
          8.8,
          6.4,
          4.0
        ],
        "f": [
          0.176,
          0.88,
          3.52,
          8.8,
          10.56,
          9.68,
          7.04,
          4.4
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": null,
        "alcohol": null,
        "obesity": null,
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Повторные инфекции и снижение функции лёгких"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          750,
          5600
        ],
        "privateMonthlyRub": [
          2500,
          14000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "cystic_fibrosis",
      "name": "Муковисцидоз",
      "icd10": "E84",
      "incidencePer100kYear": {
        "m": [
          7.0,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ],
        "f": [
          7.0,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": null,
        "alcohol": null,
        "obesity": null,
        "north": null,
        "poverty": null
      },
      "additionalRisks": "наследственные варианты CFTR",
      "consequences": [
        "Поражение лёгких и поджелудочной железы"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          6000,
          72000
        ],
        "privateMonthlyRub": [
          20000,
          180000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "diabetes1",
      "name": "Сахарный диабет 1 типа",
      "icd10": "E10",
      "incidencePer100kYear": {
        "m": [
          10.0,
          20.0,
          12.0,
          6.0,
          5.0,
          4.0,
          3.0,
          2.0
        ],
        "f": [
          9.0,
          18.0,
          10.8,
          5.4,
          4.5,
          3.6,
          2.7,
          1.8
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": null,
        "alcohol": null,
        "obesity": null,
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Гипогликемии, сосудистые и почечные осложнения"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          1200,
          8000
        ],
        "privateMonthlyRub": [
          4000,
          20000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "diabetes2",
      "name": "Сахарный диабет 2 типа",
      "icd10": "E11",
      "incidencePer100kYear": {
        "m": [
          0.0,
          1.5,
          15.0,
          75.0,
          300.0,
          750.0,
          1125.0,
          1350.0
        ],
        "f": [
          0.0,
          1.65,
          16.5,
          82.5,
          330.0,
          825.0,
          1237.5,
          1485.0
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": null,
        "alcohol": null,
        "obesity": {
          "multiplier": 1.8,
          "quality": "[~] игровой коэффициент, не причинный эффект из исследования"
        },
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Поражение сосудов, зрения и почек"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          750,
          7200
        ],
        "privateMonthlyRub": [
          2500,
          18000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "hypothyroid",
      "name": "Первичный гипотиреоз",
      "icd10": "E03",
      "incidencePer100kYear": {
        "m": [
          3.0,
          15.0,
          60.0,
          150.0,
          180.0,
          165.0,
          120.0,
          75.0
        ],
        "f": [
          15.0,
          75.0,
          300.0,
          750.0,
          900.0,
          825.0,
          600.0,
          375.0
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": null,
        "alcohol": null,
        "obesity": null,
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Утомляемость, нарушение обмена веществ"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          240,
          1600
        ],
        "privateMonthlyRub": [
          800,
          4000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "hyperthyroid",
      "name": "Тиреотоксикоз",
      "icd10": "E05",
      "incidencePer100kYear": {
        "m": [
          0.8,
          4.0,
          16.0,
          40.0,
          48.0,
          44.0,
          32.0,
          20.0
        ],
        "f": [
          4.0,
          20.0,
          80.0,
          200.0,
          240.0,
          220.0,
          160.0,
          100.0
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": {
          "multiplier": 1.7,
          "quality": "[~] игровой коэффициент, не причинный эффект из исследования"
        },
        "alcohol": null,
        "obesity": null,
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Аритмии, потеря массы, поражение глаз"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          450,
          2800
        ],
        "privateMonthlyRub": [
          1500,
          7000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "thyroiditis",
      "name": "Аутоиммунный тиреоидит",
      "icd10": "E06.3",
      "incidencePer100kYear": {
        "m": [
          2.0,
          10.0,
          40.0,
          100.0,
          120.0,
          110.0,
          80.0,
          50.0
        ],
        "f": [
          14.0,
          70.0,
          280.0,
          700.0,
          840.0,
          770.0,
          560.0,
          350.0
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": null,
        "alcohol": null,
        "obesity": null,
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Возможен гипотиреоз"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          210,
          1600
        ],
        "privateMonthlyRub": [
          700,
          4000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "obesity",
      "name": "Ожирение",
      "icd10": "E66",
      "incidencePer100kYear": {
        "m": [
          36.0,
          180.0,
          720.0,
          1800.0,
          2160.0,
          1980.0,
          1440.0,
          900.0
        ],
        "f": [
          45.0,
          225.0,
          900.0,
          2250.0,
          2700.0,
          2475.0,
          1800.0,
          1125.0
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": null,
        "alcohol": null,
        "obesity": null,
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Диабет 2 типа, апноэ, сердечно-сосудистые болезни"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          450,
          6000
        ],
        "privateMonthlyRub": [
          1500,
          15000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "osteoporosis",
      "name": "Остеопороз",
      "icd10": "M81",
      "incidencePer100kYear": {
        "m": [
          0.0,
          0.0,
          0.5,
          4.0,
          25.0,
          150.0,
          500.0,
          850.0
        ],
        "f": [
          0.0,
          0.0,
          2.0,
          16.0,
          100.0,
          600.0,
          2000.0,
          3400.0
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": {
          "multiplier": 1.7,
          "quality": "[~] игровой коэффициент, не причинный эффект из исследования"
        },
        "alcohol": {
          "multiplier": 1.6,
          "quality": "[~] игровой коэффициент, не причинный эффект из исследования"
        },
        "obesity": null,
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Переломы при небольшой травме"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          450,
          4000
        ],
        "privateMonthlyRub": [
          1500,
          10000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "rheumatoid",
      "name": "Ревматоидный артрит",
      "icd10": "M05-M06",
      "incidencePer100kYear": {
        "m": [
          0.6,
          3.0,
          12.0,
          30.0,
          36.0,
          33.0,
          24.0,
          15.0
        ],
        "f": [
          1.8,
          9.0,
          36.0,
          90.0,
          108.0,
          99.0,
          72.0,
          45.0
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": {
          "multiplier": 1.7,
          "quality": "[~] игровой коэффициент, не причинный эффект из исследования"
        },
        "alcohol": null,
        "obesity": null,
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Боль, деформация суставов, инвалидизация"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          900,
          18000
        ],
        "privateMonthlyRub": [
          3000,
          45000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "osteoarthritis",
      "name": "Остеоартрит",
      "icd10": "M15-M19",
      "incidencePer100kYear": {
        "m": [
          0.0,
          3.6,
          36.0,
          180.0,
          720.0,
          1800.0,
          2700.0,
          3240.0
        ],
        "f": [
          0.0,
          5.4,
          54.0,
          270.0,
          1080.0,
          2700.0,
          4050.0,
          4860.0
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": null,
        "alcohol": null,
        "obesity": {
          "multiplier": 1.8,
          "quality": "[~] игровой коэффициент, не причинный эффект из исследования"
        },
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Боль и снижение подвижности"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          540,
          4800
        ],
        "privateMonthlyRub": [
          1800,
          12000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "ankylosing",
      "name": "Анкилозирующий спондилит",
      "icd10": "M45",
      "incidencePer100kYear": {
        "m": [
          1.05,
          4.2,
          7.0,
          6.3,
          3.85,
          2.1,
          1.05,
          0.35
        ],
        "f": [
          0.525,
          2.1,
          3.5,
          3.15,
          1.925,
          1.05,
          0.525,
          0.175
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": {
          "multiplier": 1.7,
          "quality": "[~] игровой коэффициент, не причинный эффект из исследования"
        },
        "alcohol": null,
        "obesity": null,
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Ограничение подвижности позвоночника"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          900,
          16000
        ],
        "privateMonthlyRub": [
          3000,
          40000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "gout",
      "name": "Подагра",
      "icd10": "M10",
      "incidencePer100kYear": {
        "m": [
          3.6,
          18.0,
          72.0,
          180.0,
          216.0,
          198.0,
          144.0,
          90.0
        ],
        "f": [
          0.9,
          4.5,
          18.0,
          45.0,
          54.0,
          49.5,
          36.0,
          22.5
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": null,
        "alcohol": {
          "multiplier": 1.6,
          "quality": "[~] игровой коэффициент, не причинный эффект из исследования"
        },
        "obesity": {
          "multiplier": 1.8,
          "quality": "[~] игровой коэффициент, не причинный эффект из исследования"
        },
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Боль в суставах, тофусы, поражение почек"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          300,
          2400
        ],
        "privateMonthlyRub": [
          1000,
          6000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "lupus",
      "name": "Системная красная волчанка",
      "icd10": "M32",
      "incidencePer100kYear": {
        "m": [
          0.6,
          2.4,
          4.0,
          3.6,
          2.2,
          1.2,
          0.6,
          0.2
        ],
        "f": [
          5.4,
          21.6,
          36.0,
          32.4,
          19.8,
          10.8,
          5.4,
          1.8
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": {
          "multiplier": 1.7,
          "quality": "[~] игровой коэффициент, не причинный эффект из исследования"
        },
        "alcohol": null,
        "obesity": null,
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Поражение почек, кожи, нервной системы"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          1050,
          18000
        ],
        "privateMonthlyRub": [
          3500,
          45000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "psoriasis",
      "name": "Псориаз",
      "icd10": "L40",
      "incidencePer100kYear": {
        "m": [
          13.5,
          54.0,
          90.0,
          81.0,
          49.5,
          27.0,
          13.5,
          4.5
        ],
        "f": [
          13.5,
          54.0,
          90.0,
          81.0,
          49.5,
          27.0,
          13.5,
          4.5
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": {
          "multiplier": 1.7,
          "quality": "[~] игровой коэффициент, не причинный эффект из исследования"
        },
        "alcohol": {
          "multiplier": 1.6,
          "quality": "[~] игровой коэффициент, не причинный эффект из исследования"
        },
        "obesity": {
          "multiplier": 1.8,
          "quality": "[~] игровой коэффициент, не причинный эффект из исследования"
        },
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Хронические высыпания, возможен псориатический артрит"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          450,
          16000
        ],
        "privateMonthlyRub": [
          1500,
          40000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "atopic",
      "name": "Атопический дерматит",
      "icd10": "L20",
      "incidencePer100kYear": {
        "m": [
          800.0,
          1600.0,
          960.0,
          480.0,
          400.0,
          320.0,
          240.0,
          160.0
        ],
        "f": [
          880.0,
          1760.0,
          1056.0,
          528.0,
          440.0,
          352.0,
          264.0,
          176.0
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": null,
        "alcohol": null,
        "obesity": null,
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Зуд, нарушения сна, инфекции кожи"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          300,
          8000
        ],
        "privateMonthlyRub": [
          1000,
          20000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "eczema",
      "name": "Хроническая экзема",
      "icd10": "L30",
      "incidencePer100kYear": {
        "m": [
          4.4,
          22.0,
          88.0,
          220.0,
          264.0,
          242.0,
          176.0,
          110.0
        ],
        "f": [
          5.06,
          25.3,
          101.2,
          253.0,
          303.6,
          278.3,
          202.4,
          126.5
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": null,
        "alcohol": null,
        "obesity": null,
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Рецидивирующее воспаление кожи"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          300,
          2800
        ],
        "privateMonthlyRub": [
          1000,
          7000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "vitiligo",
      "name": "Витилиго",
      "icd10": "L80",
      "incidencePer100kYear": {
        "m": [
          3.75,
          15.0,
          25.0,
          22.5,
          13.75,
          7.5,
          3.75,
          1.25
        ],
        "f": [
          3.75,
          15.0,
          25.0,
          22.5,
          13.75,
          7.5,
          3.75,
          1.25
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": null,
        "alcohol": null,
        "obesity": null,
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Депигментация, психологическая нагрузка"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          150,
          3600
        ],
        "privateMonthlyRub": [
          500,
          9000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "rosacea",
      "name": "Розацеа",
      "icd10": "L71",
      "incidencePer100kYear": {
        "m": [
          2.0,
          10.0,
          40.0,
          100.0,
          120.0,
          110.0,
          80.0,
          50.0
        ],
        "f": [
          4.0,
          20.0,
          80.0,
          200.0,
          240.0,
          220.0,
          160.0,
          100.0
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": null,
        "alcohol": null,
        "obesity": null,
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Рецидивирующее воспаление кожи лица и глаз"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          300,
          2600
        ],
        "privateMonthlyRub": [
          1000,
          6500
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "chronic_kidney",
      "name": "Хроническая болезнь почек",
      "icd10": "N18",
      "incidencePer100kYear": {
        "m": [
          0.0,
          0.8,
          8.0,
          40.0,
          160.0,
          400.0,
          600.0,
          720.0
        ],
        "f": [
          0.0,
          0.88,
          8.8,
          44.0,
          176.0,
          440.0,
          660.0,
          792.0
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": {
          "multiplier": 1.7,
          "quality": "[~] игровой коэффициент, не причинный эффект из исследования"
        },
        "alcohol": null,
        "obesity": {
          "multiplier": 1.8,
          "quality": "[~] игровой коэффициент, не причинный эффект из исследования"
        },
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Почечная недостаточность, возможен диализ"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          750,
          6000
        ],
        "privateMonthlyRub": [
          2500,
          15000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "glomerulonephritis",
      "name": "Хронический гломерулонефрит",
      "icd10": "N03",
      "incidencePer100kYear": {
        "m": [
          0.4,
          2.0,
          8.0,
          20.0,
          24.0,
          22.0,
          16.0,
          10.0
        ],
        "f": [
          0.32,
          1.6,
          6.4,
          16.0,
          19.2,
          17.6,
          12.8,
          8.0
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": null,
        "alcohol": null,
        "obesity": null,
        "north": null,
        "poverty": null
      },
      "additionalRisks": "иммунные и инфекционные заболевания",
      "consequences": [
        "Снижение функции почек, гипертензия"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          600,
          6000
        ],
        "privateMonthlyRub": [
          2000,
          15000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "polycystic_kidney",
      "name": "Наследственный поликистоз почек",
      "icd10": "Q61",
      "incidencePer100kYear": {
        "m": [
          0.24,
          1.2,
          4.8,
          12.0,
          14.4,
          13.2,
          9.6,
          6.0
        ],
        "f": [
          0.24,
          1.2,
          4.8,
          12.0,
          14.4,
          13.2,
          9.6,
          6.0
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": null,
        "alcohol": null,
        "obesity": null,
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Кисты, гипертензия, почечная недостаточность"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          450,
          4000
        ],
        "privateMonthlyRub": [
          1500,
          10000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "kidney_stones",
      "name": "Мочекаменная болезнь, рецидивирующая",
      "icd10": "N20",
      "incidencePer100kYear": {
        "m": [
          5.0,
          25.0,
          100.0,
          250.0,
          300.0,
          275.0,
          200.0,
          125.0
        ],
        "f": [
          3.25,
          16.25,
          65.0,
          162.5,
          195.0,
          178.75,
          130.0,
          81.25
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": null,
        "alcohol": null,
        "obesity": {
          "multiplier": 1.8,
          "quality": "[~] игровой коэффициент, не причинный эффект из исследования"
        },
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Почечная колика, обструкция и инфекции"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          300,
          2400
        ],
        "privateMonthlyRub": [
          1000,
          6000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "endometriosis",
      "name": "Эндометриоз",
      "icd10": "N80",
      "incidencePer100kYear": {
        "m": [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ],
        "f": [
          52.5,
          210.0,
          350,
          315.0,
          192.5,
          105.0,
          0,
          0
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": null,
        "alcohol": null,
        "obesity": null,
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Тазовая боль, возможное бесплодие"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          750,
          6400
        ],
        "privateMonthlyRub": [
          2500,
          16000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "pcos",
      "name": "Синдром поликистозных яичников",
      "icd10": "E28.2",
      "incidencePer100kYear": {
        "m": [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ],
        "f": [
          52.5,
          210.0,
          350,
          315.0,
          192.5,
          105.0,
          0,
          0
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": null,
        "alcohol": null,
        "obesity": {
          "multiplier": 1.8,
          "quality": "[~] игровой коэффициент, не причинный эффект из исследования"
        },
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Нарушения цикла, метаболические осложнения"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          450,
          3200
        ],
        "privateMonthlyRub": [
          1500,
          8000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "prostate_hyperplasia",
      "name": "Доброкачественная гиперплазия простаты",
      "icd10": "N40",
      "incidencePer100kYear": {
        "m": [
          0.0,
          0.0,
          1.2,
          9.6,
          60.0,
          360.0,
          1200.0,
          2040.0
        ],
        "f": [
          0.0,
          0.0,
          0.0,
          0.0,
          0.0,
          0.0,
          0.0,
          0.0
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": null,
        "alcohol": null,
        "obesity": null,
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Нарушение мочеиспускания, задержка мочи"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          450,
          3200
        ],
        "privateMonthlyRub": [
          1500,
          8000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "glaucoma",
      "name": "Первичная глаукома",
      "icd10": "H40",
      "incidencePer100kYear": {
        "m": [
          0.0,
          0.0,
          0.23,
          1.84,
          11.5,
          69.0,
          230.0,
          391.0
        ],
        "f": [
          0.0,
          0.0,
          0.265,
          2.116,
          13.225,
          79.35,
          264.5,
          449.65
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": null,
        "alcohol": null,
        "obesity": null,
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Необратимая потеря зрения"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          360,
          2800
        ],
        "privateMonthlyRub": [
          1200,
          7000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "cataract",
      "name": "Возрастная катаракта",
      "icd10": "H25",
      "incidencePer100kYear": {
        "m": [
          0.0,
          0.0,
          2.3,
          18.4,
          115.0,
          690.0,
          2300.0,
          3910.0
        ],
        "f": [
          0.0,
          0.0,
          2.875,
          23.0,
          143.75,
          862.5,
          2875.0,
          4887.5
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": {
          "multiplier": 1.7,
          "quality": "[~] игровой коэффициент, не причинный эффект из исследования"
        },
        "alcohol": null,
        "obesity": null,
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Снижение зрения, операция при показаниях"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          150,
          1400
        ],
        "privateMonthlyRub": [
          500,
          3500
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "macular",
      "name": "Возрастная макулярная дегенерация",
      "icd10": "H35.3",
      "incidencePer100kYear": {
        "m": [
          0.0,
          0.0,
          0.4,
          3.2,
          20.0,
          120.0,
          400.0,
          680.0
        ],
        "f": [
          0.0,
          0.0,
          0.48,
          3.84,
          24.0,
          144.0,
          480.0,
          816.0
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": {
          "multiplier": 1.7,
          "quality": "[~] игровой коэффициент, не причинный эффект из исследования"
        },
        "alcohol": null,
        "obesity": null,
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Утрата центрального зрения"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          600,
          14000
        ],
        "privateMonthlyRub": [
          2000,
          35000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "myopia",
      "name": "Миопия",
      "icd10": "H52.1",
      "incidencePer100kYear": {
        "m": [
          1100.0,
          2200.0,
          1320.0,
          660.0,
          550.0,
          440.0,
          330.0,
          220.0
        ],
        "f": [
          1210.0,
          2420.0,
          1452.0,
          726.0,
          605.0,
          484.0,
          363.0,
          242.0
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": null,
        "alcohol": null,
        "obesity": null,
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Снижение зрения вдаль, при высокой степени осложнения сетчатки"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          150,
          1400
        ],
        "privateMonthlyRub": [
          500,
          3500
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "hearing_loss",
      "name": "Нейросенсорная тугоухость",
      "icd10": "H90",
      "incidencePer100kYear": {
        "m": [
          0.0,
          0.0,
          0.6,
          4.8,
          30.0,
          180.0,
          600.0,
          1020.0
        ],
        "f": [
          0.0,
          0.0,
          0.48,
          3.84,
          24.0,
          144.0,
          480.0,
          816.0
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": null,
        "alcohol": null,
        "obesity": null,
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Трудности общения, потребность в слухопротезировании"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          150,
          2800
        ],
        "privateMonthlyRub": [
          500,
          7000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "epilepsy",
      "name": "Эпилепсия",
      "icd10": "G40",
      "incidencePer100kYear": {
        "m": [
          22.5,
          45.0,
          27.0,
          13.5,
          11.25,
          9.0,
          6.75,
          4.5
        ],
        "f": [
          20.25,
          40.5,
          24.3,
          12.15,
          10.125,
          8.1,
          6.075,
          4.05
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": null,
        "alcohol": null,
        "obesity": null,
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Повторные приступы, травмы, ограничения некоторых занятий"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          450,
          4400
        ],
        "privateMonthlyRub": [
          1500,
          11000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "migraine",
      "name": "Мигрень",
      "icd10": "G43",
      "incidencePer100kYear": {
        "m": [
          120.0,
          480.0,
          800.0,
          720.0,
          440.0,
          240.0,
          120.0,
          40.0
        ],
        "f": [
          360.0,
          1440.0,
          2400.0,
          2160.0,
          1320.0,
          720.0,
          360.0,
          120.0
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": null,
        "alcohol": null,
        "obesity": null,
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Приступы боли, снижение работоспособности"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          300,
          5600
        ],
        "privateMonthlyRub": [
          1000,
          14000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "multiple_sclerosis",
      "name": "Рассеянный склероз",
      "icd10": "G35",
      "incidencePer100kYear": {
        "m": [
          0.75,
          3.0,
          5.0,
          4.5,
          2.75,
          1.5,
          0.75,
          0.25
        ],
        "f": [
          1.875,
          7.5,
          12.5,
          11.25,
          6.875,
          3.75,
          1.875,
          0.625
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": {
          "multiplier": 1.7,
          "quality": "[~] игровой коэффициент, не причинный эффект из исследования"
        },
        "alcohol": null,
        "obesity": null,
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Неврологические нарушения, возможная инвалидизация"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          1200,
          36000
        ],
        "privateMonthlyRub": [
          4000,
          90000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "parkinson",
      "name": "Болезнь Паркинсона",
      "icd10": "G20",
      "incidencePer100kYear": {
        "m": [
          0.0,
          0.0,
          0.16,
          1.28,
          8.0,
          48.0,
          160.0,
          272.0
        ],
        "f": [
          0.0,
          0.0,
          0.104,
          0.832,
          5.2,
          31.2,
          104.0,
          176.8
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": null,
        "alcohol": null,
        "obesity": null,
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Двигательные и когнитивные нарушения"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          750,
          8800
        ],
        "privateMonthlyRub": [
          2500,
          22000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "alzheimer",
      "name": "Болезнь Альцгеймера",
      "icd10": "G30",
      "incidencePer100kYear": {
        "m": [
          0.0,
          0.0,
          0.65,
          5.2,
          32.5,
          195.0,
          650.0,
          1105.0
        ],
        "f": [
          0.0,
          0.0,
          1.105,
          8.84,
          55.25,
          331.5,
          1105.0,
          1878.5
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": null,
        "alcohol": null,
        "obesity": null,
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Прогрессирующая потеря памяти и самостоятельности"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          750,
          7200
        ],
        "privateMonthlyRub": [
          2500,
          18000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "polyneuropathy",
      "name": "Хроническая полинейропатия",
      "icd10": "G62",
      "incidencePer100kYear": {
        "m": [
          0.0,
          0.28,
          2.8,
          14.0,
          56.0,
          140.0,
          210.0,
          252.0
        ],
        "f": [
          0.0,
          0.238,
          2.38,
          11.9,
          47.6,
          119.0,
          178.5,
          214.2
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": null,
        "alcohol": {
          "multiplier": 1.6,
          "quality": "[~] игровой коэффициент, не причинный эффект из исследования"
        },
        "obesity": null,
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Боль, нарушение чувствительности и ходьбы"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          450,
          3600
        ],
        "privateMonthlyRub": [
          1500,
          9000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "cerebral_palsy",
      "name": "Детский церебральный паралич",
      "icd10": "G80",
      "incidencePer100kYear": {
        "m": [
          40.0,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ],
        "f": [
          32.0,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": null,
        "alcohol": null,
        "obesity": null,
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Стойкие двигательные нарушения, реабилитация"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          1500,
          24000
        ],
        "privateMonthlyRub": [
          5000,
          60000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "depression",
      "name": "Рекуррентное депрессивное расстройство",
      "icd10": "F33",
      "incidencePer100kYear": {
        "m": [
          120.0,
          480.0,
          800.0,
          720.0,
          440.0,
          240.0,
          120.0,
          40.0
        ],
        "f": [
          216.0,
          864.0,
          1440.0,
          1296.0,
          792.0,
          432.0,
          216.0,
          72.0
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": null,
        "alcohol": null,
        "obesity": null,
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Нарушение сна, снижение повседневного функционирования"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": null,
        "omsNote": "Помощь при социально значимых заболеваниях может финансироваться бюджетом и отдельными программами, а не базовым ОМС. Покрытая помощь для пациента бесплатна; маршрутизацию проверяют отдельно.",
        "uncoveredMedicinesMonthlyRub": [
          750,
          7200
        ],
        "privateMonthlyRub": [
          2500,
          18000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "budget_or_special_program",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "anxiety",
      "name": "Генерализованное тревожное расстройство",
      "icd10": "F41.1",
      "incidencePer100kYear": {
        "m": [
          75.0,
          300.0,
          500.0,
          450.0,
          275.0,
          150.0,
          75.0,
          25.0
        ],
        "f": [
          135.0,
          540.0,
          900.0,
          810.0,
          495.0,
          270.0,
          135.0,
          45.0
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": null,
        "alcohol": null,
        "obesity": null,
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Стойкое беспокойство, нарушения сна"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": null,
        "omsNote": "Помощь при социально значимых заболеваниях может финансироваться бюджетом и отдельными программами, а не базовым ОМС. Покрытая помощь для пациента бесплатна; маршрутизацию проверяют отдельно.",
        "uncoveredMedicinesMonthlyRub": [
          750,
          6400
        ],
        "privateMonthlyRub": [
          2500,
          16000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "budget_or_special_program",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "bipolar",
      "name": "Биполярное аффективное расстройство",
      "icd10": "F31",
      "incidencePer100kYear": {
        "m": [
          5.25,
          21.0,
          35.0,
          31.5,
          19.25,
          10.5,
          5.25,
          1.75
        ],
        "f": [
          5.775,
          23.1,
          38.5,
          34.65,
          21.175,
          11.55,
          5.775,
          1.925
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": null,
        "alcohol": null,
        "obesity": null,
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Эпизоды мании и депрессии"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": null,
        "omsNote": "Помощь при социально значимых заболеваниях может финансироваться бюджетом и отдельными программами, а не базовым ОМС. Покрытая помощь для пациента бесплатна; маршрутизацию проверяют отдельно.",
        "uncoveredMedicinesMonthlyRub": [
          750,
          6400
        ],
        "privateMonthlyRub": [
          2500,
          16000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "budget_or_special_program",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "schizophrenia",
      "name": "Шизофрения",
      "icd10": "F20",
      "incidencePer100kYear": {
        "m": [
          3.0,
          12.0,
          20.0,
          18.0,
          11.0,
          6.0,
          3.0,
          1.0
        ],
        "f": [
          2.4,
          9.6,
          16.0,
          14.4,
          8.8,
          4.8,
          2.4,
          0.8
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": null,
        "alcohol": null,
        "obesity": null,
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Психотические эпизоды, нарушения социальной адаптации"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": null,
        "omsNote": "Помощь при социально значимых заболеваниях может финансироваться бюджетом и отдельными программами, а не базовым ОМС. Покрытая помощь для пациента бесплатна; маршрутизацию проверяют отдельно.",
        "uncoveredMedicinesMonthlyRub": [
          750,
          7200
        ],
        "privateMonthlyRub": [
          2500,
          18000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "budget_or_special_program",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "alcohol_dependence",
      "name": "Алкогольная зависимость",
      "icd10": "F10.2",
      "incidencePer100kYear": {
        "m": [
          5.0,
          25.0,
          100.0,
          250.0,
          300.0,
          275.0,
          200.0,
          125.0
        ],
        "f": [
          1.5,
          7.5,
          30.0,
          75.0,
          90.0,
          82.5,
          60.0,
          37.5
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": null,
        "alcohol": {
          "multiplier": 1.6,
          "quality": "[~] игровой коэффициент, не причинный эффект из исследования"
        },
        "obesity": null,
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Поражение органов, трудности в семье и на работе"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": null,
        "omsNote": "Помощь при социально значимых заболеваниях может финансироваться бюджетом и отдельными программами, а не базовым ОМС. Покрытая помощь для пациента бесплатна; маршрутизацию проверяют отдельно.",
        "uncoveredMedicinesMonthlyRub": [
          900,
          10000
        ],
        "privateMonthlyRub": [
          3000,
          25000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "budget_or_special_program",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "hepatitis_b",
      "name": "Хронический вирусный гепатит B",
      "icd10": "B18.1",
      "incidencePer100kYear": {
        "m": [
          0.6,
          1.2,
          9.6,
          12.0,
          7.8,
          4.2,
          2.4,
          1.2
        ],
        "f": [
          0.45,
          0.9,
          7.2,
          9.0,
          5.85,
          3.15,
          1.8,
          0.9
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": null,
        "alcohol": null,
        "obesity": null,
        "north": null,
        "poverty": null
      },
      "additionalRisks": "контакты с заражённой кровью, половой и вертикальный пути; отсутствие вакцинации",
      "consequences": [
        "Цирроз и рак печени"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          450,
          7200
        ],
        "privateMonthlyRub": [
          1500,
          18000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "hepatitis_c",
      "name": "Хронический вирусный гепатит C",
      "icd10": "B18.2",
      "incidencePer100kYear": {
        "m": [
          1.25,
          2.5,
          20.0,
          25.0,
          16.25,
          8.75,
          5.0,
          2.5
        ],
        "f": [
          0.875,
          1.75,
          14.0,
          17.5,
          11.375,
          6.125,
          3.5,
          1.75
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": null,
        "alcohol": null,
        "obesity": null,
        "north": null,
        "poverty": null
      },
      "additionalRisks": "контакты с заражённой кровью",
      "consequences": [
        "Цирроз и рак печени, возможно излечение"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          600,
          8000
        ],
        "privateMonthlyRub": [
          2000,
          20000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "hiv",
      "name": "ВИЧ-инфекция",
      "icd10": "B20-B24,Z21",
      "incidencePer100kYear": {
        "m": [
          2.75,
          5.5,
          44.0,
          55.0,
          35.75,
          19.25,
          11.0,
          5.5
        ],
        "f": [
          1.788,
          3.575,
          28.6,
          35.75,
          23.238,
          12.513,
          7.15,
          3.575
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": null,
        "alcohol": null,
        "obesity": null,
        "north": null,
        "poverty": null
      },
      "additionalRisks": "контакты с заражённой кровью, передача половым и вертикальным путями",
      "consequences": [
        "Без контроля инфекции — иммунодефицит и оппортунистические инфекции"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": null,
        "omsNote": "Помощь при социально значимых заболеваниях может финансироваться бюджетом и отдельными программами, а не базовым ОМС. Покрытая помощь для пациента бесплатна; маршрутизацию проверяют отдельно.",
        "uncoveredMedicinesMonthlyRub": [
          0,
          0
        ],
        "privateMonthlyRub": [
          3500,
          35000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "budget_or_special_program",
        "publicCoveredServicesPatientCopay": 0,
        "drugProvisionNote": "Основная специфическая терапия предоставляется по государственной программе при постановке на наблюдение; не моделировать её как обязательную платную покупку."
      }
    },
    {
      "id": "tuberculosis",
      "name": "Туберкулёз, длительное течение",
      "icd10": "A15-A19",
      "incidencePer100kYear": {
        "m": [
          2.75,
          5.5,
          44.0,
          55.0,
          35.75,
          19.25,
          11.0,
          5.5
        ],
        "f": [
          1.1,
          2.2,
          17.6,
          22.0,
          14.3,
          7.7,
          4.4,
          2.2
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": {
          "multiplier": 1.7,
          "quality": "[~] игровой коэффициент, не причинный эффект из исследования"
        },
        "alcohol": null,
        "obesity": null,
        "north": null,
        "poverty": {
          "multiplier": 1.4,
          "quality": "[~] игровой коэффициент, не причинный эффект из исследования"
        }
      },
      "additionalRisks": "контакт с источником инфекции, иммунодефицит",
      "consequences": [
        "Поражение лёгких и других органов, заразность некоторых форм"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": null,
        "omsNote": "Помощь при социально значимых заболеваниях может финансироваться бюджетом и отдельными программами, а не базовым ОМС. Покрытая помощь для пациента бесплатна; маршрутизацию проверяют отдельно.",
        "uncoveredMedicinesMonthlyRub": [
          0,
          0
        ],
        "privateMonthlyRub": [
          4000,
          30000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "budget_or_special_program",
        "publicCoveredServicesPatientCopay": 0,
        "drugProvisionNote": "Основная специфическая терапия предоставляется по государственной программе при постановке на наблюдение; не моделировать её как обязательную платную покупку."
      }
    },
    {
      "id": "cirrhosis",
      "name": "Цирроз печени",
      "icd10": "K74",
      "incidencePer100kYear": {
        "m": [
          0.0,
          0.2,
          2.0,
          10.0,
          40.0,
          100.0,
          150.0,
          180.0
        ],
        "f": [
          0.0,
          0.1,
          1.0,
          5.0,
          20.0,
          50.0,
          75.0,
          90.0
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": null,
        "alcohol": {
          "multiplier": 1.6,
          "quality": "[~] игровой коэффициент, не причинный эффект из исследования"
        },
        "obesity": null,
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Портальная гипертензия, печёночная недостаточность"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          750,
          7200
        ],
        "privateMonthlyRub": [
          2500,
          18000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "fatty_liver",
      "name": "Метаболически ассоциированная жировая болезнь печени",
      "icd10": "K76.0",
      "incidencePer100kYear": {
        "m": [
          22.0,
          110.0,
          440.0,
          1100.0,
          1320.0,
          1210.0,
          880.0,
          550.0
        ],
        "f": [
          24.2,
          121.0,
          484.0,
          1210.0,
          1452.0,
          1331.0,
          968.0,
          605.0
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": null,
        "alcohol": null,
        "obesity": {
          "multiplier": 1.8,
          "quality": "[~] игровой коэффициент, не причинный эффект из исследования"
        },
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Возможны фиброз и цирроз"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          300,
          2800
        ],
        "privateMonthlyRub": [
          1000,
          7000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "pancreatitis",
      "name": "Хронический панкреатит",
      "icd10": "K86.1",
      "incidencePer100kYear": {
        "m": [
          1.6,
          8.0,
          32.0,
          80.0,
          96.0,
          88.0,
          64.0,
          40.0
        ],
        "f": [
          1.04,
          5.2,
          20.8,
          52.0,
          62.4,
          57.2,
          41.6,
          26.0
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": {
          "multiplier": 1.7,
          "quality": "[~] игровой коэффициент, не причинный эффект из исследования"
        },
        "alcohol": {
          "multiplier": 1.6,
          "quality": "[~] игровой коэффициент, не причинный эффект из исследования"
        },
        "obesity": null,
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Нарушение пищеварения, диабет"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          600,
          4400
        ],
        "privateMonthlyRub": [
          2000,
          11000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "crohn",
      "name": "Болезнь Крона",
      "icd10": "K50",
      "incidencePer100kYear": {
        "m": [
          1.05,
          4.2,
          7.0,
          6.3,
          3.85,
          2.1,
          1.05,
          0.35
        ],
        "f": [
          1.155,
          4.62,
          7.7,
          6.93,
          4.235,
          2.31,
          1.155,
          0.385
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": {
          "multiplier": 1.7,
          "quality": "[~] игровой коэффициент, не причинный эффект из исследования"
        },
        "alcohol": null,
        "obesity": null,
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Свищи, стриктуры, операции"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          1200,
          26000
        ],
        "privateMonthlyRub": [
          4000,
          65000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "ulcerative_colitis",
      "name": "Язвенный колит",
      "icd10": "K51",
      "incidencePer100kYear": {
        "m": [
          1.5,
          6.0,
          10.0,
          9.0,
          5.5,
          3.0,
          1.5,
          0.5
        ],
        "f": [
          1.65,
          6.6,
          11.0,
          9.9,
          6.05,
          3.3,
          1.65,
          0.55
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": null,
        "alcohol": null,
        "obesity": null,
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Кишечное кровотечение, воспалительные осложнения"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          900,
          22000
        ],
        "privateMonthlyRub": [
          3000,
          55000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "celiac",
      "name": "Целиакия",
      "icd10": "K90.0",
      "incidencePer100kYear": {
        "m": [
          10.0,
          20.0,
          12.0,
          6.0,
          5.0,
          4.0,
          3.0,
          2.0
        ],
        "f": [
          17.0,
          34.0,
          20.4,
          10.2,
          8.5,
          6.8,
          5.1,
          3.4
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": null,
        "alcohol": null,
        "obesity": null,
        "north": null,
        "poverty": null
      },
      "additionalRisks": "генетическая предрасположенность и воздействие глютена",
      "consequences": [
        "Мальабсорбция, дефициты питания"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          300,
          3200
        ],
        "privateMonthlyRub": [
          1000,
          8000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "gerd",
      "name": "Гастроэзофагеальная рефлюксная болезнь",
      "icd10": "K21",
      "incidencePer100kYear": {
        "m": [
          32.0,
          160.0,
          640.0,
          1600.0,
          1920.0,
          1760.0,
          1280.0,
          800.0
        ],
        "f": [
          35.2,
          176.0,
          704.0,
          1760.0,
          2112.0,
          1936.0,
          1408.0,
          880.0
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": {
          "multiplier": 1.7,
          "quality": "[~] игровой коэффициент, не причинный эффект из исследования"
        },
        "alcohol": null,
        "obesity": {
          "multiplier": 1.8,
          "quality": "[~] игровой коэффициент, не причинный эффект из исследования"
        },
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Хронические симптомы, эзофагит"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          300,
          2600
        ],
        "privateMonthlyRub": [
          1000,
          6500
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "peptic_ulcer",
      "name": "Язвенная болезнь",
      "icd10": "K25-K26",
      "incidencePer100kYear": {
        "m": [
          4.4,
          22.0,
          88.0,
          220.0,
          264.0,
          242.0,
          176.0,
          110.0
        ],
        "f": [
          3.3,
          16.5,
          66.0,
          165.0,
          198.0,
          181.5,
          132.0,
          82.5
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": {
          "multiplier": 1.7,
          "quality": "[~] игровой коэффициент, не причинный эффект из исследования"
        },
        "alcohol": null,
        "obesity": null,
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Helicobacter pylori, НПВП",
      "consequences": [
        "Кровотечение и перфорация"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          360,
          2800
        ],
        "privateMonthlyRub": [
          1200,
          7000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "iron_deficiency",
      "name": "Железодефицитная анемия, рецидивирующая",
      "icd10": "D50",
      "incidencePer100kYear": {
        "m": [
          60.0,
          240.0,
          400.0,
          360.0,
          220.0,
          120.0,
          60.0,
          20.0
        ],
        "f": [
          180.0,
          720.0,
          1200.0,
          1080.0,
          660.0,
          360.0,
          180.0,
          60.0
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": null,
        "alcohol": null,
        "obesity": null,
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Утомляемость, снижение переносимости нагрузки"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          240,
          2000
        ],
        "privateMonthlyRub": [
          800,
          5000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "hemophilia",
      "name": "Наследственная гемофилия A",
      "icd10": "D66",
      "incidencePer100kYear": {
        "m": [
          1.8,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ],
        "f": [
          0.009,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": null,
        "alcohol": null,
        "obesity": null,
        "north": null,
        "poverty": null
      },
      "additionalRisks": "наследственные варианты гена F8",
      "consequences": [
        "Кровотечения и поражение суставов"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          3000,
          100000
        ],
        "privateMonthlyRub": [
          10000,
          250000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "sarcoidosis",
      "name": "Саркоидоз",
      "icd10": "D86",
      "incidencePer100kYear": {
        "m": [
          0.1,
          0.5,
          2.0,
          5.0,
          6.0,
          5.5,
          4.0,
          2.5
        ],
        "f": [
          0.13,
          0.65,
          2.6,
          6.5,
          7.8,
          7.15,
          5.2,
          3.25
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": null,
        "alcohol": null,
        "obesity": null,
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Поражение лёгких, глаз и других органов"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          600,
          5600
        ],
        "privateMonthlyRub": [
          2000,
          14000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "sleep_apnea",
      "name": "Обструктивное апноэ сна",
      "icd10": "G47.3",
      "incidencePer100kYear": {
        "m": [
          0.0,
          1.3,
          13.0,
          65.0,
          260.0,
          650.0,
          975.0,
          1170.0
        ],
        "f": [
          0.0,
          0.65,
          6.5,
          32.5,
          130.0,
          325.0,
          487.5,
          585.0
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": null,
        "alcohol": null,
        "obesity": {
          "multiplier": 1.8,
          "quality": "[~] игровой коэффициент, не причинный эффект из исследования"
        },
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Сонливость, сердечно-сосудистые осложнения"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          450,
          4800
        ],
        "privateMonthlyRub": [
          1500,
          12000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "allergic_rhinitis",
      "name": "Аллергический ринит",
      "icd10": "J30",
      "incidencePer100kYear": {
        "m": [
          500.0,
          1000.0,
          600.0,
          300.0,
          250.0,
          200.0,
          150.0,
          100.0
        ],
        "f": [
          550.0,
          1100.0,
          660.0,
          330.0,
          275.0,
          220.0,
          165.0,
          110.0
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": null,
        "alcohol": null,
        "obesity": null,
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Нарушения сна и носового дыхания"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          210,
          2000
        ],
        "privateMonthlyRub": [
          700,
          5000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    },
    {
      "id": "lymphoedema",
      "name": "Хронический лимфоотёк",
      "icd10": "I89.0",
      "incidencePer100kYear": {
        "m": [
          0.4,
          2.0,
          8.0,
          20.0,
          24.0,
          22.0,
          16.0,
          10.0
        ],
        "f": [
          0.8,
          4.0,
          16.0,
          40.0,
          48.0,
          44.0,
          32.0,
          20.0
        ]
      },
      "incidenceQuality": "[~] синтетическая ежегодная частота новых диагнозов; не измеренная заболеваемость Росстата",
      "riskFactors": {
        "smoking": null,
        "alcohol": null,
        "obesity": {
          "multiplier": 1.8,
          "quality": "[~] игровой коэффициент, не причинный эффект из исследования"
        },
        "north": null,
        "poverty": null
      },
      "additionalRisks": "Наследственность, возраст и специфические факторы уточняются по клиническим рекомендациям.",
      "consequences": [
        "Отёк конечности, инфекции кожи"
      ],
      "costs": {
        "currency": "RUB",
        "priceYear": 2025,
        "quality": "[~] интервалы сценария, не тариф клиники или ОМС",
        "omsCoveredServicesPatientCopay": 0,
        "omsNote": "При наличии показаний и права на помощь: услуги в рамках программы госгарантий бесплатны. Доступность, сроки и лекарственное обеспечение зависят от программы и льгот. Нулевой платёж не означает бесплатность всех амбулаторных лекарств.",
        "uncoveredMedicinesMonthlyRub": [
          360,
          4000
        ],
        "privateMonthlyRub": [
          1200,
          10000
        ],
        "oneOffProceduresIncluded": false,
        "publicFundingRoute": "oms_and_indicated_programs",
        "publicCoveredServicesPatientCopay": 0
      }
    }
  ],
  "specialCare": [
    {
      "id": "dialysis",
      "privatePerSessionRub": [
        5000,
        15000
      ],
      "omsCoveredPatientCopayRub": 0,
      "quality": "[~] цена; по показаниям в программе ОМС"
    },
    {
      "id": "cataract_surgery",
      "privateOneEyeRub": [
        40000,
        150000
      ],
      "omsCoveredPatientCopayRub": 0,
      "quality": "[~] цена, тип хрусталика и программа влияют"
    },
    {
      "id": "hepatitis_c_course",
      "privateCourseRub": [
        40000,
        500000
      ],
      "omsCoveredPatientCopayRub": 0,
      "quality": "[~] полный курс, не ежемесячная сумма; доступность по маршрутизации"
    }
  ]
};
