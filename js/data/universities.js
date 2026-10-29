/*
Вузы, колледжи и техникумы по 85 субъектам. [~] Конкурс и игровые уровни; наличие ВУЦ с источником либо null.
Составлено: 2026-10-27.
Источник minobr: Минобрнауки, подведомственные образовательные организации — https://minobrnauki.gov.ru/about/podvedomstvennye-organizatsii/podvedyoo/
Источник firpo: ФИРПО, официальный перечень кластеров СПО и их участников — https://mtb-spo.firpo.ru/list-clusters-type/cluster
Источник vuc2023: Минобрнауки, новые военные учебные центры, 22.11.2023 — https://www8.minobrnauki.gov.ru/press-center/news/novosti-podvedomstvennykh-uchrezhdeniy/75862/
Источник chukotka: СВФУ, отчёт Чукотского филиала (место и образовательная деятельность) — https://www.s-vfu.ru/universitet/information/filial_ch2018.pdf
[~] = оценка для игры; не официальное измерение. null = данных нет / неприменимо, не ноль.
Обычный справочник: подключение и применение выполняет потребитель данных.
*/
RL.DATA.universities = {
  "meta": {
    "schemaVersion": 1,
    "compiledAt": "2026-10-27",
    "sources": [
      {
        "id": "minobr",
        "title": "Минобрнауки, подведомственные образовательные организации",
        "url": "https://minobrnauki.gov.ru/about/podvedomstvennye-organizatsii/podvedyoo/",
        "kind": "primary"
      },
      {
        "id": "firpo",
        "title": "ФИРПО, официальный перечень кластеров СПО и их участников",
        "url": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
        "kind": "primary"
      },
      {
        "id": "vuc2023",
        "title": "Минобрнауки, новые военные учебные центры, 22.11.2023",
        "url": "https://www8.minobrnauki.gov.ru/press-center/news/novosti-podvedomstvennykh-uchrezhdeniy/75862/",
        "kind": "primary"
      },
      {
        "id": "chukotka",
        "title": "СВФУ, отчёт Чукотского филиала (место и образовательная деятельность)",
        "url": "https://www.s-vfu.ru/universitet/information/filial_ch2018.pdf",
        "kind": "primary"
      }
    ],
    "notes": [
      "Репрезентативный справочник, не полный реестр учреждений или лицензий. Покрывает все 85 территорий переписной таблицы 2021 года.",
      "Наименование/город — справочные факты; это не подтверждение действующей аккредитации или набора в 2026 году. Реорганизации возможны.",
      "ВСЕ проходные баллы и уровни [~]: реальный конкурс зависит от программы, года, квоты и формы обучения. Не выдавать за опубликованные результаты приёма.",
      "top/medium/weak — только игровая селективность. Для СПО используется средний балл аттестата, для вузов — средний ЕГЭ по предметам, а не сумма.",
      "Историческую военную кафедру нельзя переносить на любой год. true означает подтверждённый ВУЦ в указанном источнике; null означает отсутствие проверки.",
      "Для Ненецкого АО и ЯНАО активный вуз не заявлен без проверки; реальные колледжи включены. Филиал не приравнен к независимому вузу.",
      "Идентификаторы census_01…85 совпадают с ethnicCensus, но не заменяют существующие id регионов симуляции."
    ]
  },
  "regions": [
    {
      "id": "census_01",
      "name": "Белгородская область",
      "institutionIds": [
        "edu_01_vo",
        "edu_01_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_02",
      "name": "Брянская область",
      "institutionIds": [
        "edu_02_vo",
        "edu_02_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_03",
      "name": "Владимирская область",
      "institutionIds": [
        "edu_03_vo",
        "edu_03_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_04",
      "name": "Воронежская область",
      "institutionIds": [
        "edu_04_vo",
        "edu_04_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_05",
      "name": "Ивановская область",
      "institutionIds": [
        "edu_05_vo",
        "edu_05_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_06",
      "name": "Калужская область",
      "institutionIds": [
        "edu_06_vo",
        "edu_06_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_07",
      "name": "Костромская область",
      "institutionIds": [
        "edu_07_vo",
        "edu_07_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_08",
      "name": "Курская область",
      "institutionIds": [
        "edu_08_vo",
        "edu_08_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_09",
      "name": "Липецкая область",
      "institutionIds": [
        "edu_09_vo",
        "edu_09_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_10",
      "name": "Московская область",
      "institutionIds": [
        "edu_10_vo",
        "edu_10_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_11",
      "name": "Орловская область",
      "institutionIds": [
        "edu_11_vo",
        "edu_11_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_12",
      "name": "Рязанская область",
      "institutionIds": [
        "edu_12_vo",
        "edu_12_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_13",
      "name": "Смоленская область",
      "institutionIds": [
        "edu_13_vo",
        "edu_13_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_14",
      "name": "Тамбовская область",
      "institutionIds": [
        "edu_14_vo",
        "edu_14_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_15",
      "name": "Тверская область",
      "institutionIds": [
        "edu_15_vo",
        "edu_15_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_16",
      "name": "Тульская область",
      "institutionIds": [
        "edu_16_vo",
        "edu_16_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_17",
      "name": "Ярославская область",
      "institutionIds": [
        "edu_17_vo",
        "edu_17_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_18",
      "name": "г. Москва",
      "institutionIds": [
        "edu_18_vo",
        "edu_18_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_19",
      "name": "Республика Карелия",
      "institutionIds": [
        "edu_19_vo",
        "edu_19_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_20",
      "name": "Республика Коми",
      "institutionIds": [
        "edu_20_vo",
        "edu_20_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_21",
      "name": "Архангельская область без АО",
      "institutionIds": [
        "edu_21_vo",
        "edu_21_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_22",
      "name": "Ненецкий автономный округ",
      "institutionIds": [
        "edu_22_spo"
      ],
      "universityCoverage": "not_asserted",
      "spoCoverage": "representative"
    },
    {
      "id": "census_23",
      "name": "Вологодская область",
      "institutionIds": [
        "edu_23_vo",
        "edu_23_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_24",
      "name": "Калининградская область",
      "institutionIds": [
        "edu_24_vo",
        "edu_24_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_25",
      "name": "Ленинградская область",
      "institutionIds": [
        "edu_25_vo",
        "edu_25_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_26",
      "name": "Мурманская область",
      "institutionIds": [
        "edu_26_vo",
        "edu_26_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_27",
      "name": "Новгородская область",
      "institutionIds": [
        "edu_27_vo",
        "edu_27_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_28",
      "name": "Псковская область",
      "institutionIds": [
        "edu_28_vo",
        "edu_28_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_29",
      "name": "г. Санкт-Петербург",
      "institutionIds": [
        "edu_29_vo",
        "edu_29_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_30",
      "name": "Республика Адыгея",
      "institutionIds": [
        "edu_30_vo",
        "edu_30_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_31",
      "name": "Республика Калмыкия",
      "institutionIds": [
        "edu_31_vo",
        "edu_31_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_32",
      "name": "Республика Крым",
      "institutionIds": [
        "edu_32_vo",
        "edu_32_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_33",
      "name": "Краснодарский край",
      "institutionIds": [
        "edu_33_vo",
        "edu_33_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_34",
      "name": "Астраханская область",
      "institutionIds": [
        "edu_34_vo",
        "edu_34_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_35",
      "name": "Волгоградская область",
      "institutionIds": [
        "edu_35_vo",
        "edu_35_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_36",
      "name": "Ростовская область",
      "institutionIds": [
        "edu_36_vo",
        "edu_36_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_37",
      "name": "г. Севастополь",
      "institutionIds": [
        "edu_37_vo",
        "edu_37_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_38",
      "name": "Республика Дагестан",
      "institutionIds": [
        "edu_38_vo",
        "edu_38_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_39",
      "name": "Республика Ингушетия",
      "institutionIds": [
        "edu_39_vo",
        "edu_39_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_40",
      "name": "Кабардино-Балкарская Республика",
      "institutionIds": [
        "edu_40_vo",
        "edu_40_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_41",
      "name": "Карачаево-Черкесская Республика",
      "institutionIds": [
        "edu_41_vo",
        "edu_41_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_42",
      "name": "Респ. Северная Осетия-Алания",
      "institutionIds": [
        "edu_42_vo",
        "edu_42_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_43",
      "name": "Чеченская Республика",
      "institutionIds": [
        "edu_43_vo",
        "edu_43_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_44",
      "name": "Ставропольский край",
      "institutionIds": [
        "edu_44_vo",
        "edu_44_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_45",
      "name": "Республика Башкортостан",
      "institutionIds": [
        "edu_45_vo",
        "edu_45_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_46",
      "name": "Республика Марий Эл",
      "institutionIds": [
        "edu_46_vo",
        "edu_46_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_47",
      "name": "Республика Мордовия",
      "institutionIds": [
        "edu_47_vo",
        "edu_47_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_48",
      "name": "Республика Татарстан",
      "institutionIds": [
        "edu_48_vo",
        "edu_48_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_49",
      "name": "Удмуртская Республика",
      "institutionIds": [
        "edu_49_vo",
        "edu_49_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_50",
      "name": "Чувашская Республика",
      "institutionIds": [
        "edu_50_vo",
        "edu_50_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_51",
      "name": "Пермский край",
      "institutionIds": [
        "edu_51_vo",
        "edu_51_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_52",
      "name": "Кировская область",
      "institutionIds": [
        "edu_52_vo",
        "edu_52_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_53",
      "name": "Нижегородская область",
      "institutionIds": [
        "edu_53_vo",
        "edu_53_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_54",
      "name": "Оренбургская область",
      "institutionIds": [
        "edu_54_vo",
        "edu_54_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_55",
      "name": "Пензенская область",
      "institutionIds": [
        "edu_55_vo",
        "edu_55_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_56",
      "name": "Самарская область",
      "institutionIds": [
        "edu_56_vo",
        "edu_56_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_57",
      "name": "Саратовская область",
      "institutionIds": [
        "edu_57_vo",
        "edu_57_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_58",
      "name": "Ульяновская область",
      "institutionIds": [
        "edu_58_vo",
        "edu_58_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_59",
      "name": "Курганская область",
      "institutionIds": [
        "edu_59_vo",
        "edu_59_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_60",
      "name": "Свердловская область",
      "institutionIds": [
        "edu_60_vo",
        "edu_60_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_61",
      "name": "Тюменская область без АО",
      "institutionIds": [
        "edu_61_vo",
        "edu_61_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_62",
      "name": "ХМАО",
      "institutionIds": [
        "edu_62_vo",
        "edu_62_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_63",
      "name": "ЯНАО",
      "institutionIds": [
        "edu_63_spo"
      ],
      "universityCoverage": "not_asserted",
      "spoCoverage": "representative"
    },
    {
      "id": "census_64",
      "name": "Челябинская область",
      "institutionIds": [
        "edu_64_vo",
        "edu_64_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_65",
      "name": "Республика Алтай",
      "institutionIds": [
        "edu_65_vo",
        "edu_65_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_66",
      "name": "Республика Тыва",
      "institutionIds": [
        "edu_66_vo",
        "edu_66_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_67",
      "name": "Республика Хакасия",
      "institutionIds": [
        "edu_67_vo",
        "edu_67_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_68",
      "name": "Алтайский край",
      "institutionIds": [
        "edu_68_vo",
        "edu_68_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_69",
      "name": "Красноярский край",
      "institutionIds": [
        "edu_69_vo",
        "edu_69_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_70",
      "name": "Иркутская область",
      "institutionIds": [
        "edu_70_vo",
        "edu_70_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_71",
      "name": "Кемеровская область - Кузбасс",
      "institutionIds": [
        "edu_71_vo",
        "edu_71_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_72",
      "name": "Новосибирская область",
      "institutionIds": [
        "edu_72_vo",
        "edu_72_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_73",
      "name": "Омская область",
      "institutionIds": [
        "edu_73_vo",
        "edu_73_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_74",
      "name": "Томская область",
      "institutionIds": [
        "edu_74_vo",
        "edu_74_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_75",
      "name": "Республика Бурятия",
      "institutionIds": [
        "edu_75_vo",
        "edu_75_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_76",
      "name": "Республика Саха(Якутия)",
      "institutionIds": [
        "edu_76_vo",
        "edu_76_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_77",
      "name": "Забайкальский край",
      "institutionIds": [
        "edu_77_vo",
        "edu_77_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_78",
      "name": "Камчатский край",
      "institutionIds": [
        "edu_78_vo",
        "edu_78_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_79",
      "name": "Приморский край",
      "institutionIds": [
        "edu_79_vo",
        "edu_79_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_80",
      "name": "Хабаровский край",
      "institutionIds": [
        "edu_80_vo",
        "edu_80_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_81",
      "name": "Амурская область",
      "institutionIds": [
        "edu_81_vo",
        "edu_81_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_82",
      "name": "Магаданская область",
      "institutionIds": [
        "edu_82_vo",
        "edu_82_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_83",
      "name": "Сахалинская область",
      "institutionIds": [
        "edu_83_vo",
        "edu_83_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_84",
      "name": "Еврейская автономная область",
      "institutionIds": [
        "edu_84_vo",
        "edu_84_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    },
    {
      "id": "census_85",
      "name": "Чукотский автономный округ",
      "institutionIds": [
        "edu_85_vo",
        "edu_85_spo"
      ],
      "universityCoverage": "representative",
      "spoCoverage": "representative"
    }
  ],
  "items": [
    {
      "id": "edu_01_vo",
      "regionId": "census_01",
      "name": "Белгородский государственный национальный исследовательский университет",
      "city": "Белгород",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://bsu.edu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_01_spo",
      "regionId": "census_01",
      "name": "Белгородский индустриальный колледж",
      "city": "Белгород",
      "kind": "college",
      "profiles": [
        "техника"
      ],
      "level": "weak",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.2,
          4.1
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_02_vo",
      "regionId": "census_02",
      "name": "Брянский государственный технический университет",
      "city": "Брянск",
      "kind": "university",
      "profiles": [
        "техника"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://tu-bryansk.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_02_spo",
      "regionId": "census_02",
      "name": "Брянский строительный колледж имени Н. Е. Жуковского",
      "city": "Брянск",
      "kind": "college",
      "profiles": [
        "строительство"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_03_vo",
      "regionId": "census_03",
      "name": "Владимирский государственный университет имени А. Г. и Н. Г. Столетовых",
      "city": "Владимир",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://vlsu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_03_spo",
      "regionId": "census_03",
      "name": "Владимирский авиамеханический колледж",
      "city": "Владимир",
      "kind": "college",
      "profiles": [
        "авиационная техника"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_04_vo",
      "regionId": "census_04",
      "name": "Воронежский государственный университет",
      "city": "Воронеж",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://vsu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_04_spo",
      "regionId": "census_04",
      "name": "Воронежский государственный промышленно-гуманитарный колледж",
      "city": "Воронеж",
      "kind": "college",
      "profiles": [
        "многопрофильный"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_05_vo",
      "regionId": "census_05",
      "name": "Ивановский государственный энергетический университет имени В. И. Ленина",
      "city": "Иваново",
      "kind": "university",
      "profiles": [
        "энергетика"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://ispu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_05_spo",
      "regionId": "census_05",
      "name": "Ивановский энергетический колледж",
      "city": "Иваново",
      "kind": "college",
      "profiles": [
        "энергетика"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_06_vo",
      "regionId": "census_06",
      "name": "Калужский государственный университет имени К. Э. Циолковского",
      "city": "Калуга",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://tksu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_06_spo",
      "regionId": "census_06",
      "name": "Калужский технический колледж",
      "city": "Калуга",
      "kind": "college",
      "profiles": [
        "техника"
      ],
      "level": "weak",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.2,
          4.1
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_07_vo",
      "regionId": "census_07",
      "name": "Костромской государственный университет",
      "city": "Кострома",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://ksu.edu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_07_spo",
      "regionId": "census_07",
      "name": "Костромской энергетический техникум имени Ф. В. Чижова",
      "city": "Кострома",
      "kind": "technical_school",
      "profiles": [
        "энергетика"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_08_vo",
      "regionId": "census_08",
      "name": "Юго-Западный государственный университет",
      "city": "Курск",
      "kind": "university",
      "profiles": [
        "техника"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://swsu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_08_spo",
      "regionId": "census_08",
      "name": "Курский государственный политехнический колледж",
      "city": "Курск",
      "kind": "college",
      "profiles": [
        "техника"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_09_vo",
      "regionId": "census_09",
      "name": "Липецкий государственный технический университет",
      "city": "Липецк",
      "kind": "university",
      "profiles": [
        "техника"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://stu.lipetsk.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_09_spo",
      "regionId": "census_09",
      "name": "Липецкий металлургический колледж",
      "city": "Липецк",
      "kind": "college",
      "profiles": [
        "металлургия"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_10_vo",
      "regionId": "census_10",
      "name": "Московский физико-технический институт (национальный исследовательский университет)",
      "city": "Долгопрудный",
      "kind": "university",
      "profiles": [
        "физика и техника"
      ],
      "level": "top",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          78,
          96
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://mipt.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_10_spo",
      "regionId": "census_10",
      "name": "Красногорский колледж",
      "city": "Красногорск",
      "kind": "college",
      "profiles": [
        "многопрофильный"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_11_vo",
      "regionId": "census_11",
      "name": "Орловский государственный университет имени И. С. Тургенева",
      "city": "Орёл",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://oreluniver.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_11_spo",
      "regionId": "census_11",
      "name": "Орловский базовый медицинский колледж",
      "city": "Орёл",
      "kind": "college",
      "profiles": [
        "медицина"
      ],
      "level": "weak",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.2,
          4.1
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_12_vo",
      "regionId": "census_12",
      "name": "Рязанский государственный радиотехнический университет имени В. Ф. Уткина",
      "city": "Рязань",
      "kind": "university",
      "profiles": [
        "радиотехника"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://rsreu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_12_spo",
      "regionId": "census_12",
      "name": "Рязанский колледж электроники",
      "city": "Рязань",
      "kind": "college",
      "profiles": [
        "электроника"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_13_vo",
      "regionId": "census_13",
      "name": "Смоленский государственный университет",
      "city": "Смоленск",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://smolgu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_13_spo",
      "regionId": "census_13",
      "name": "Смоленская академия профессионального образования",
      "city": "Смоленск",
      "kind": "college",
      "profiles": [
        "многопрофильный"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_14_vo",
      "regionId": "census_14",
      "name": "Тамбовский государственный технический университет",
      "city": "Тамбов",
      "kind": "university",
      "profiles": [
        "техника"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://tstu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_14_spo",
      "regionId": "census_14",
      "name": "Тамбовский политехнический техникум имени М. С. Солнцева",
      "city": "Тамбов",
      "kind": "technical_school",
      "profiles": [
        "техника"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_15_vo",
      "regionId": "census_15",
      "name": "Тверской государственный университет",
      "city": "Тверь",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://tversu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_15_spo",
      "regionId": "census_15",
      "name": "Тверской колледж имени А. Н. Коняева",
      "city": "Тверь",
      "kind": "college",
      "profiles": [
        "многопрофильный"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_16_vo",
      "regionId": "census_16",
      "name": "Тульский государственный университет",
      "city": "Тула",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://tsu.tula.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_16_spo",
      "regionId": "census_16",
      "name": "Тульский государственный машиностроительный колледж имени Никиты Демидова",
      "city": "Тула",
      "kind": "college",
      "profiles": [
        "машиностроение"
      ],
      "level": "weak",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.2,
          4.1
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_17_vo",
      "regionId": "census_17",
      "name": "Ярославский государственный университет имени П. Г. Демидова",
      "city": "Ярославль",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://uniyar.ac.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_17_spo",
      "regionId": "census_17",
      "name": "Ярославский градостроительный колледж",
      "city": "Ярославль",
      "kind": "college",
      "profiles": [
        "строительство"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_18_vo",
      "regionId": "census_18",
      "name": "Московский государственный университет имени М. В. Ломоносова",
      "city": "Москва",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "top",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          78,
          96
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://msu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_18_spo",
      "regionId": "census_18",
      "name": "Колледж связи № 54 имени П. М. Вострухина",
      "city": "Москва",
      "kind": "college",
      "profiles": [
        "связь и ИТ"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_19_vo",
      "regionId": "census_19",
      "name": "Петрозаводский государственный университет",
      "city": "Петрозаводск",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://petrsu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_19_spo",
      "regionId": "census_19",
      "name": "Петрозаводский автотранспортный техникум",
      "city": "Петрозаводск",
      "kind": "technical_school",
      "profiles": [
        "транспорт"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_20_vo",
      "regionId": "census_20",
      "name": "Сыктывкарский государственный университет имени Питирима Сорокина",
      "city": "Сыктывкар",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://syktsu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_20_spo",
      "regionId": "census_20",
      "name": "Сыктывкарский лесопромышленный техникум",
      "city": "Сыктывкар",
      "kind": "technical_school",
      "profiles": [
        "лесное дело"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_21_vo",
      "regionId": "census_21",
      "name": "Северный (Арктический) федеральный университет имени М. В. Ломоносова",
      "city": "Архангельск",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://narfu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_21_spo",
      "regionId": "census_21",
      "name": "Архангельский политехнический техникум",
      "city": "Архангельск",
      "kind": "technical_school",
      "profiles": [
        "техника"
      ],
      "level": "weak",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.2,
          4.1
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_22_spo",
      "regionId": "census_22",
      "name": "Ненецкий аграрно-экономический техникум имени В. Г. Волкова",
      "city": "Нарьян-Мар",
      "kind": "technical_school",
      "profiles": [
        "аграрный и экономический"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_23_vo",
      "regionId": "census_23",
      "name": "Вологодский государственный университет",
      "city": "Вологда",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://vogu35.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_23_spo",
      "regionId": "census_23",
      "name": "Вологодский строительный колледж",
      "city": "Вологда",
      "kind": "college",
      "profiles": [
        "строительство"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_24_vo",
      "regionId": "census_24",
      "name": "Балтийский федеральный университет имени Иммануила Канта",
      "city": "Калининград",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://kantiana.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_24_spo",
      "regionId": "census_24",
      "name": "Калининградский морской рыбопромышленный колледж",
      "city": "Калининград",
      "kind": "college",
      "profiles": [
        "морской и рыбопромышленный"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_25_vo",
      "regionId": "census_25",
      "name": "Государственный институт экономики, финансов, права и технологий",
      "city": "Гатчина",
      "kind": "university",
      "profiles": [
        "экономика и право"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://gief.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_25_spo",
      "regionId": "census_25",
      "name": "Кингисеппский колледж технологии и сервиса",
      "city": "Кингисепп",
      "kind": "college",
      "profiles": [
        "технологии и сервис"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_26_vo",
      "regionId": "census_26",
      "name": "Мурманский арктический университет",
      "city": "Мурманск",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://mauniver.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_26_spo",
      "regionId": "census_26",
      "name": "Мурманский индустриальный колледж",
      "city": "Мурманск",
      "kind": "college",
      "profiles": [
        "промышленность"
      ],
      "level": "weak",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.2,
          4.1
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_27_vo",
      "regionId": "census_27",
      "name": "Новгородский государственный университет имени Ярослава Мудрого",
      "city": "Великий Новгород",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://novsu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_27_spo",
      "regionId": "census_27",
      "name": "Новгородский строительный колледж",
      "city": "Великий Новгород",
      "kind": "college",
      "profiles": [
        "строительство"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_28_vo",
      "regionId": "census_28",
      "name": "Псковский государственный университет",
      "city": "Псков",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://pskgu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_28_spo",
      "regionId": "census_28",
      "name": "Псковский агротехнический колледж",
      "city": "Псков",
      "kind": "college",
      "profiles": [
        "агротехника"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_29_vo",
      "regionId": "census_29",
      "name": "Санкт-Петербургский государственный университет",
      "city": "Санкт-Петербург",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "top",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          78,
          96
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://spbu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_29_spo",
      "regionId": "census_29",
      "name": "Санкт-Петербургский технический колледж управления и коммерции",
      "city": "Санкт-Петербург",
      "kind": "college",
      "profiles": [
        "техника и экономика"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_30_vo",
      "regionId": "census_30",
      "name": "Адыгейский государственный университет",
      "city": "Майкоп",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://adygnet.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_30_spo",
      "regionId": "census_30",
      "name": "Политехнический колледж Майкопского государственного технологического университета",
      "city": "Майкоп",
      "kind": "college",
      "profiles": [
        "техника"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mkgtu.ru/vikon/abitur/priemnaya-kampaniya-na-2026-2027-uchebnyy-god/spo_sredn/",
      "sourceScope": "Страница учреждения/учредителя",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_31_vo",
      "regionId": "census_31",
      "name": "Калмыцкий государственный университет имени Б. Б. Городовикова",
      "city": "Элиста",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": true,
      "militaryTrainingSource": "https://www8.minobrnauki.gov.ru/press-center/news/novosti-podvedomstvennykh-uchrezhdeniy/75862/",
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://kalmgu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_31_spo",
      "regionId": "census_31",
      "name": "Калмыцкий медицинский колледж имени Т. Хахлыновой",
      "city": "Элиста",
      "kind": "college",
      "profiles": [
        "медицина"
      ],
      "level": "weak",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.2,
          4.1
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_32_vo",
      "regionId": "census_32",
      "name": "Крымский федеральный университет имени В. И. Вернадского",
      "city": "Симферополь",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://cfuv.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_32_spo",
      "regionId": "census_32",
      "name": "Симферопольский политехнический колледж",
      "city": "Симферополь",
      "kind": "college",
      "profiles": [
        "техника"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_33_vo",
      "regionId": "census_33",
      "name": "Кубанский государственный университет",
      "city": "Краснодар",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://kubsu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_33_spo",
      "regionId": "census_33",
      "name": "Краснодарский политехнический техникум",
      "city": "Краснодар",
      "kind": "technical_school",
      "profiles": [
        "техника"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_34_vo",
      "regionId": "census_34",
      "name": "Астраханский государственный технический университет",
      "city": "Астрахань",
      "kind": "university",
      "profiles": [
        "техника и рыбное хозяйство"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://astu.org/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_34_spo",
      "regionId": "census_34",
      "name": "Астраханский государственный политехнический колледж",
      "city": "Астрахань",
      "kind": "college",
      "profiles": [
        "техника"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_35_vo",
      "regionId": "census_35",
      "name": "Волгоградский государственный технический университет",
      "city": "Волгоград",
      "kind": "university",
      "profiles": [
        "техника"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://vstu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_35_spo",
      "regionId": "census_35",
      "name": "Волгоградский технический колледж",
      "city": "Волгоград",
      "kind": "college",
      "profiles": [
        "техника"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_36_vo",
      "regionId": "census_36",
      "name": "Южный федеральный университет",
      "city": "Ростов-на-Дону",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "top",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          78,
          96
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://sfedu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_36_spo",
      "regionId": "census_36",
      "name": "Ростовский-на-Дону колледж связи и информатики",
      "city": "Ростов-на-Дону",
      "kind": "college",
      "profiles": [
        "связь и ИТ"
      ],
      "level": "weak",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.2,
          4.1
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_37_vo",
      "regionId": "census_37",
      "name": "Севастопольский государственный университет",
      "city": "Севастополь",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://sevsu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_37_spo",
      "regionId": "census_37",
      "name": "Севастопольский торгово-экономический техникум",
      "city": "Севастополь",
      "kind": "technical_school",
      "profiles": [
        "торговля и экономика"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://sevtet.ru/info/",
      "sourceScope": "Страница учреждения/учредителя",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_38_vo",
      "regionId": "census_38",
      "name": "Дагестанский государственный университет",
      "city": "Махачкала",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://dgu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_38_spo",
      "regionId": "census_38",
      "name": "Дагестанский политехнический колледж",
      "city": "Махачкала",
      "kind": "college",
      "profiles": [
        "техника"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_39_vo",
      "regionId": "census_39",
      "name": "Ингушский государственный университет",
      "city": "Магас",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": true,
      "militaryTrainingSource": "https://www8.minobrnauki.gov.ru/press-center/news/novosti-podvedomstvennykh-uchrezhdeniy/75862/",
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://inggu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_39_spo",
      "regionId": "census_39",
      "name": "Ингушский политехнический колледж имени Ю. И. Арапиева",
      "city": "Назрань",
      "kind": "college",
      "profiles": [
        "техника"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_40_vo",
      "regionId": "census_40",
      "name": "Кабардино-Балкарский государственный университет имени Х. М. Бербекова",
      "city": "Нальчик",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://kbsu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_40_spo",
      "regionId": "census_40",
      "name": "Нальчикский колледж лёгкой промышленности",
      "city": "Нальчик",
      "kind": "college",
      "profiles": [
        "лёгкая промышленность"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://nklp.ru/kontakty",
      "sourceScope": "Страница учреждения/учредителя",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_41_vo",
      "regionId": "census_41",
      "name": "Северо-Кавказская государственная академия",
      "city": "Черкесск",
      "kind": "university",
      "profiles": [
        "многопрофильный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": true,
      "militaryTrainingSource": "https://www8.minobrnauki.gov.ru/press-center/news/novosti-podvedomstvennykh-uchrezhdeniy/75862/",
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://ncsa.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_41_spo",
      "regionId": "census_41",
      "name": "Карачаево-Черкесский педагогический колледж имени У. Хабекова",
      "city": "Черкесск",
      "kind": "college",
      "profiles": [
        "педагогика"
      ],
      "level": "weak",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.2,
          4.1
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_42_vo",
      "regionId": "census_42",
      "name": "Северо-Осетинский государственный университет имени К. Л. Хетагурова",
      "city": "Владикавказ",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://nosu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_42_spo",
      "regionId": "census_42",
      "name": "Северо-Осетинский государственный торгово-экономический колледж",
      "city": "Владикавказ",
      "kind": "college",
      "profiles": [
        "экономика"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_43_vo",
      "regionId": "census_43",
      "name": "Чеченский государственный университет имени А. А. Кадырова",
      "city": "Грозный",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://chesu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_43_spo",
      "regionId": "census_43",
      "name": "Чеченский государственный колледж",
      "city": "Грозный",
      "kind": "college",
      "profiles": [
        "многопрофильный"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mon95.ru/subordinate-organizations",
      "sourceScope": "Страница учреждения/учредителя",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_44_vo",
      "regionId": "census_44",
      "name": "Северо-Кавказский федеральный университет",
      "city": "Ставрополь",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://ncfu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_44_spo",
      "regionId": "census_44",
      "name": "Ставропольский государственный политехнический колледж",
      "city": "Ставрополь",
      "kind": "college",
      "profiles": [
        "техника"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_45_vo",
      "regionId": "census_45",
      "name": "Уфимский университет науки и технологий",
      "city": "Уфа",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://uust.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_45_spo",
      "regionId": "census_45",
      "name": "Уфимский колледж радиоэлектроники, телекоммуникаций и безопасности",
      "city": "Уфа",
      "kind": "college",
      "profiles": [
        "радиоэлектроника"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_46_vo",
      "regionId": "census_46",
      "name": "Марийский государственный университет",
      "city": "Йошкар-Ола",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://marsu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_46_spo",
      "regionId": "census_46",
      "name": "Йошкар-Олинский технологический колледж",
      "city": "Йошкар-Ола",
      "kind": "college",
      "profiles": [
        "технологии"
      ],
      "level": "weak",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.2,
          4.1
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_47_vo",
      "regionId": "census_47",
      "name": "Национальный исследовательский Мордовский государственный университет имени Н. П. Огарёва",
      "city": "Саранск",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://mrsu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_47_spo",
      "regionId": "census_47",
      "name": "Саранский электромеханический колледж",
      "city": "Саранск",
      "kind": "college",
      "profiles": [
        "электромеханика"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_48_vo",
      "regionId": "census_48",
      "name": "Казанский (Приволжский) федеральный университет",
      "city": "Казань",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "top",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          78,
          96
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://kpfu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_48_spo",
      "regionId": "census_48",
      "name": "Казанский авиационно-технический колледж имени П. В. Дементьева",
      "city": "Казань",
      "kind": "college",
      "profiles": [
        "авиастроение"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_49_vo",
      "regionId": "census_49",
      "name": "Удмуртский государственный университет",
      "city": "Ижевск",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://udsu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_49_spo",
      "regionId": "census_49",
      "name": "Ижевский промышленно-экономический колледж",
      "city": "Ижевск",
      "kind": "college",
      "profiles": [
        "промышленность и экономика"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_50_vo",
      "regionId": "census_50",
      "name": "Чувашский государственный университет имени И. Н. Ульянова",
      "city": "Чебоксары",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://chuvsu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_50_spo",
      "regionId": "census_50",
      "name": "Чебоксарский электромеханический колледж",
      "city": "Чебоксары",
      "kind": "college",
      "profiles": [
        "электромеханика"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_51_vo",
      "regionId": "census_51",
      "name": "Пермский национальный исследовательский политехнический университет",
      "city": "Пермь",
      "kind": "university",
      "profiles": [
        "техника"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": true,
      "militaryTrainingSource": "https://www8.minobrnauki.gov.ru/press-center/news/novosti-podvedomstvennykh-uchrezhdeniy/75862/",
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://pstu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_51_spo",
      "regionId": "census_51",
      "name": "Пермский авиационный техникум имени А. Д. Швецова",
      "city": "Пермь",
      "kind": "technical_school",
      "profiles": [
        "авиастроение"
      ],
      "level": "weak",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.2,
          4.1
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_52_vo",
      "regionId": "census_52",
      "name": "Вятский государственный университет",
      "city": "Киров",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://vyatsu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_52_spo",
      "regionId": "census_52",
      "name": "Вятский электромашиностроительный техникум",
      "city": "Киров",
      "kind": "technical_school",
      "profiles": [
        "электромашиностроение"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_53_vo",
      "regionId": "census_53",
      "name": "Национальный исследовательский Нижегородский государственный университет имени Н. И. Лобачевского",
      "city": "Нижний Новгород",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://unn.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_53_spo",
      "regionId": "census_53",
      "name": "Нижегородский радиотехнический колледж",
      "city": "Нижний Новгород",
      "kind": "college",
      "profiles": [
        "радиотехника"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_54_vo",
      "regionId": "census_54",
      "name": "Оренбургский государственный университет",
      "city": "Оренбург",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://osu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_54_spo",
      "regionId": "census_54",
      "name": "Оренбургский автотранспортный колледж",
      "city": "Оренбург",
      "kind": "college",
      "profiles": [
        "транспорт"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_55_vo",
      "regionId": "census_55",
      "name": "Пензенский государственный университет",
      "city": "Пенза",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://pnzgu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_55_spo",
      "regionId": "census_55",
      "name": "Пензенский колледж информационных и промышленных технологий (ИТ-колледж)",
      "city": "Пенза",
      "kind": "college",
      "profiles": [
        "ИТ и промышленность"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_56_vo",
      "regionId": "census_56",
      "name": "Самарский национальный исследовательский университет имени академика С. П. Королёва",
      "city": "Самара",
      "kind": "university",
      "profiles": [
        "аэрокосмический"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://ssau.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_56_spo",
      "regionId": "census_56",
      "name": "Самарский государственный колледж",
      "city": "Самара",
      "kind": "college",
      "profiles": [
        "многопрофильный"
      ],
      "level": "weak",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.2,
          4.1
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_57_vo",
      "regionId": "census_57",
      "name": "Саратовский национальный исследовательский государственный университет имени Н. Г. Чернышевского",
      "city": "Саратов",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://sgu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_57_spo",
      "regionId": "census_57",
      "name": "Саратовский колледж радиоэлектроники имени П. Н. Яблочкова",
      "city": "Саратов",
      "kind": "college",
      "profiles": [
        "радиоэлектроника"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_58_vo",
      "regionId": "census_58",
      "name": "Ульяновский государственный технический университет",
      "city": "Ульяновск",
      "kind": "university",
      "profiles": [
        "техника"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://ulstu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_58_spo",
      "regionId": "census_58",
      "name": "Ульяновский авиационный колледж — Межрегиональный центр компетенций",
      "city": "Ульяновск",
      "kind": "college",
      "profiles": [
        "авиастроение"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_59_vo",
      "regionId": "census_59",
      "name": "Курганский государственный университет",
      "city": "Курган",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "top",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          78,
          96
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://kgsu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_59_spo",
      "regionId": "census_59",
      "name": "Курганский промышленный техникум",
      "city": "Курган",
      "kind": "technical_school",
      "profiles": [
        "промышленность"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_60_vo",
      "regionId": "census_60",
      "name": "Уральский федеральный университет имени первого Президента России Б. Н. Ельцина",
      "city": "Екатеринбург",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://urfu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_60_spo",
      "regionId": "census_60",
      "name": "Уральский радиотехнический колледж имени А. С. Попова",
      "city": "Екатеринбург",
      "kind": "college",
      "profiles": [
        "радиотехника"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_61_vo",
      "regionId": "census_61",
      "name": "Тюменский государственный университет",
      "city": "Тюмень",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://utmn.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_61_spo",
      "regionId": "census_61",
      "name": "Тюменский колледж производственных и социальных технологий",
      "city": "Тюмень",
      "kind": "college",
      "profiles": [
        "многопрофильный"
      ],
      "level": "weak",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.2,
          4.1
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_62_vo",
      "regionId": "census_62",
      "name": "Сургутский государственный университет",
      "city": "Сургут",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://surgu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_62_spo",
      "regionId": "census_62",
      "name": "Сургутский политехнический колледж",
      "city": "Сургут",
      "kind": "college",
      "profiles": [
        "техника"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_63_spo",
      "regionId": "census_63",
      "name": "Ноябрьский колледж профессиональных и информационных технологий",
      "city": "Ноябрьск",
      "kind": "college",
      "profiles": [
        "профессиональные технологии"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_64_vo",
      "regionId": "census_64",
      "name": "Южно-Уральский государственный университет (национальный исследовательский университет)",
      "city": "Челябинск",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://susu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_64_spo",
      "regionId": "census_64",
      "name": "Челябинский радиотехнический техникум",
      "city": "Челябинск",
      "kind": "technical_school",
      "profiles": [
        "радиотехника"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_65_vo",
      "regionId": "census_65",
      "name": "Горно-Алтайский государственный университет",
      "city": "Горно-Алтайск",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": true,
      "militaryTrainingSource": "https://www8.minobrnauki.gov.ru/press-center/news/novosti-podvedomstvennykh-uchrezhdeniy/75862/",
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://gasu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_65_spo",
      "regionId": "census_65",
      "name": "Горно-Алтайский педагогический колледж",
      "city": "Горно-Алтайск",
      "kind": "college",
      "profiles": [
        "педагогика"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_66_vo",
      "regionId": "census_66",
      "name": "Тувинский государственный университет",
      "city": "Кызыл",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://tuvsu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_66_spo",
      "regionId": "census_66",
      "name": "Тувинский политехнический техникум",
      "city": "Кызыл",
      "kind": "technical_school",
      "profiles": [
        "техника"
      ],
      "level": "weak",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.2,
          4.1
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_67_vo",
      "regionId": "census_67",
      "name": "Хакасский государственный университет имени Н. Ф. Катанова",
      "city": "Абакан",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://khsu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_67_spo",
      "regionId": "census_67",
      "name": "Хакасский политехнический колледж",
      "city": "Абакан",
      "kind": "college",
      "profiles": [
        "техника"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_68_vo",
      "regionId": "census_68",
      "name": "Алтайский государственный университет",
      "city": "Барнаул",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://asu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_68_spo",
      "regionId": "census_68",
      "name": "Бийский государственный колледж",
      "city": "Бийск",
      "kind": "college",
      "profiles": [
        "многопрофильный"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_69_vo",
      "regionId": "census_69",
      "name": "Сибирский федеральный университет",
      "city": "Красноярск",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": true,
      "militaryTrainingSource": "https://sfu.ru/ru/about/departments/instituty/vii/vuc",
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://sfu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_69_spo",
      "regionId": "census_69",
      "name": "Красноярский политехнический техникум",
      "city": "Красноярск",
      "kind": "technical_school",
      "profiles": [
        "техника"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_70_vo",
      "regionId": "census_70",
      "name": "Иркутский национальный исследовательский технический университет",
      "city": "Иркутск",
      "kind": "university",
      "profiles": [
        "техника"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://istu.edu/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_70_spo",
      "regionId": "census_70",
      "name": "Иркутский авиационный техникум",
      "city": "Иркутск",
      "kind": "technical_school",
      "profiles": [
        "авиастроение"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_71_vo",
      "regionId": "census_71",
      "name": "Кемеровский государственный университет",
      "city": "Кемерово",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "top",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          78,
          96
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://kemsu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_71_spo",
      "regionId": "census_71",
      "name": "Кемеровский горнотехнический техникум",
      "city": "Кемерово",
      "kind": "technical_school",
      "profiles": [
        "горное дело"
      ],
      "level": "weak",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.2,
          4.1
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_72_vo",
      "regionId": "census_72",
      "name": "Новосибирский национальный исследовательский государственный университет",
      "city": "Новосибирск",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://nsu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_72_spo",
      "regionId": "census_72",
      "name": "Новосибирский авиационный технический колледж имени Б. С. Галущака",
      "city": "Новосибирск",
      "kind": "college",
      "profiles": [
        "авиастроение"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_73_vo",
      "regionId": "census_73",
      "name": "Омский государственный технический университет",
      "city": "Омск",
      "kind": "university",
      "profiles": [
        "техника"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://omgtu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_73_spo",
      "regionId": "census_73",
      "name": "Омский авиационный колледж имени Н. Е. Жуковского",
      "city": "Омск",
      "kind": "college",
      "profiles": [
        "авиационная техника"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_74_vo",
      "regionId": "census_74",
      "name": "Национальный исследовательский Томский государственный университет",
      "city": "Томск",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "top",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          78,
          96
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://tsu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_74_spo",
      "regionId": "census_74",
      "name": "Томский техникум информационных технологий",
      "city": "Томск",
      "kind": "technical_school",
      "profiles": [
        "ИТ"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_75_vo",
      "regionId": "census_75",
      "name": "Бурятский государственный университет имени Доржи Банзарова",
      "city": "Улан-Удэ",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "top",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          78,
          96
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://bsu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_75_spo",
      "regionId": "census_75",
      "name": "Бурятский республиканский индустриальный техникум",
      "city": "Улан-Удэ",
      "kind": "technical_school",
      "profiles": [
        "промышленность"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_76_vo",
      "regionId": "census_76",
      "name": "Северо-Восточный федеральный университет имени М. К. Аммосова",
      "city": "Якутск",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://s-vfu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_76_spo",
      "regionId": "census_76",
      "name": "Якутский промышленный техникум имени Т. Г. Десяткина",
      "city": "Якутск",
      "kind": "technical_school",
      "profiles": [
        "промышленность"
      ],
      "level": "weak",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.2,
          4.1
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_77_vo",
      "regionId": "census_77",
      "name": "Забайкальский государственный университет",
      "city": "Чита",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://zabgu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_77_spo",
      "regionId": "census_77",
      "name": "Забайкальский горный колледж имени М. И. Агошкова",
      "city": "Чита",
      "kind": "college",
      "profiles": [
        "горное дело"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_78_vo",
      "regionId": "census_78",
      "name": "Камчатский государственный технический университет",
      "city": "Петропавловск-Камчатский",
      "kind": "university",
      "profiles": [
        "техника и рыбное хозяйство"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://kamchatgtu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_78_spo",
      "regionId": "census_78",
      "name": "Камчатский политехнический техникум",
      "city": "Петропавловск-Камчатский",
      "kind": "technical_school",
      "profiles": [
        "техника"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_79_vo",
      "regionId": "census_79",
      "name": "Дальневосточный федеральный университет",
      "city": "Владивосток",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://dvfu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_79_spo",
      "regionId": "census_79",
      "name": "Дальневосточный технический колледж",
      "city": "Уссурийск",
      "kind": "college",
      "profiles": [
        "техника"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_80_vo",
      "regionId": "census_80",
      "name": "Тихоокеанский государственный университет",
      "city": "Хабаровск",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "top",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          78,
          96
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://pnu.edu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_80_spo",
      "regionId": "census_80",
      "name": "Хабаровский технический колледж",
      "city": "Хабаровск",
      "kind": "college",
      "profiles": [
        "техника"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://dvtk.pro/sviedieniia-ob-orghanizatsii/",
      "sourceScope": "Страница учреждения/учредителя",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_81_vo",
      "regionId": "census_81",
      "name": "Амурский государственный университет",
      "city": "Благовещенск",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://amursu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_81_spo",
      "regionId": "census_81",
      "name": "Амурский колледж строительства и жилищно-коммунального хозяйства",
      "city": "Благовещенск",
      "kind": "college",
      "profiles": [
        "строительство"
      ],
      "level": "weak",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.2,
          4.1
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_82_vo",
      "regionId": "census_82",
      "name": "Северо-Восточный государственный университет",
      "city": "Магадан",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://svgu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_82_spo",
      "regionId": "census_82",
      "name": "Магаданский политехнический техникум",
      "city": "Магадан",
      "kind": "technical_school",
      "profiles": [
        "техника"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_83_vo",
      "regionId": "census_83",
      "name": "Сахалинский государственный университет",
      "city": "Южно-Сахалинск",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://sakhgu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_83_spo",
      "regionId": "census_83",
      "name": "Сахалинский промышленно-экономический техникум",
      "city": "Южно-Сахалинск",
      "kind": "technical_school",
      "profiles": [
        "промышленность и экономика"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_84_vo",
      "regionId": "census_84",
      "name": "Приамурский государственный университет имени Шолом-Алейхема",
      "city": "Биробиджан",
      "kind": "university",
      "profiles": [
        "универсальный"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": true,
      "militaryTrainingSource": "https://www8.minobrnauki.gov.ru/press-center/news/novosti-podvedomstvennykh-uchrezhdeniy/75862/",
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://pgusa.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_84_spo",
      "regionId": "census_84",
      "name": "Биробиджанский медицинский колледж",
      "city": "Биробиджан",
      "kind": "college",
      "profiles": [
        "медицина"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    },
    {
      "id": "edu_85_vo",
      "regionId": "census_85",
      "name": "Чукотский филиал Северо-Восточного федерального университета имени М. К. Аммосова",
      "city": "Анадырь",
      "kind": "university_branch",
      "profiles": [
        "экономика и управление"
      ],
      "level": "medium",
      "levelQuality": "[~] игровая селективность, не оценка качества преподавания",
      "admission": {
        "metric": "mean_ege_per_subject",
        "scale": [
          0,
          100
        ],
        "approxPassingRange": [
          50,
          78
        ],
        "year": 2025,
        "quality": "[~] условный бюджетный конкурс без конкретной программы; НЕ официальный проходной балл"
      },
      "militaryTrainingCenter": null,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "Наличие ВУЦ не гарантирует приём, отсрочку или освобождение; null = не проверено.",
      "sourceUrl": "https://s-vfu.ru/",
      "catalogStatus": "Название и город справочные; набор, реорганизации и программы проверять по сайту организации."
    },
    {
      "id": "edu_85_spo",
      "regionId": "census_85",
      "name": "Чукотский многопрофильный колледж",
      "city": "Анадырь",
      "kind": "college",
      "profiles": [
        "многопрофильный"
      ],
      "level": "medium",
      "levelQuality": "[~] только модель конкурса; weak не означает плохое образование",
      "admission": {
        "metric": "school_certificate_average",
        "scale": [
          2,
          5
        ],
        "approxPassingRange": [
          3.8,
          4.7
        ],
        "year": 2025,
        "quality": "[~] сценарный диапазон среднего аттестата; ЕГЭ для СПО не используется"
      },
      "militaryTrainingCenter": false,
      "militaryTrainingSource": null,
      "militaryTrainingNote": "ВУЦ гражданского вуза здесь не заявлен; обучение в колледже не является военной кафедрой.",
      "sourceUrl": "https://mtb-spo.firpo.ru/list-clusters-type/cluster",
      "sourceScope": "Общий официальный каталог СПО, не подтверждение проходного балла каждой записи.",
      "catalogStatus": "Справочное название; юридическое наименование и действующий набор требуют проверки по региональному реестру."
    }
  ]
};
