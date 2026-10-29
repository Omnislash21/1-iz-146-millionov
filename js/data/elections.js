/*
Календарь выборов и нейтральные тексты. Региональный/местный архив неполный; будущее — сценарий [~].
Составлено: 2026-10-27.
Источник cik: ЦИК России, архив федеральных избирательных кампаний — https://www.cikrf.ru/banners/vib_arhiv/
Источник presidential: МПА СНГ, Институт президентской власти, 2018, приложение по РФ — https://iacis.ru/public/upload/files/2/1387.pdf
Источник parliament: МПА СНГ, парламентские выборы, исторический справочник — https://iacis.ru/public/upload/files/2/1388.pdf
Источник pres2024: ЦИК России, сообщение об итоговой явке на выборах 2024 года — https://t.me/s/cikrossii/3653
Источник duma2026: РЦОИТ при ЦИК, общие результаты выборов 2026 года — https://www.rcoit.ru/news/7298604/
Источник moscow2023: Мосгоризбирком, архив выборов мэра Москвы 2023 — https://www.mosgorizbirkom.ru/archive/vybory-mera-moskvy-10-sentyabrya-2023-goda/vybory-mera-moskvy-2023/
Источник moscowTurnout: Уполномоченный по правам человека, доклад по Москве: явка 2018/2023 — https://map.ombudsmanrf.org/Karta_Yadro/prav_z_karta/ross_fed/doklad_v_sub/doklad_v_moskve/doklad_v_moskveweb.pdf
Источник soviet1985: Сообщение ЦИК РСФСР в газете от 28.02.1985, цифровой архив библиотеки — https://elib.uraic.ru/bitstream/123456789/10674/1/0013057.pdf
[~] = оценка для игры; не официальное измерение. null = данных нет / неприменимо, не ноль.
Обычный справочник: подключение и применение выполняет потребитель данных.
*/
RL.DATA.elections = {
  "meta": {
    "schemaVersion": 1,
    "compiledAt": "2026-10-27",
    "sources": [
      {
        "id": "cik",
        "title": "ЦИК России, архив федеральных избирательных кампаний",
        "url": "https://www.cikrf.ru/banners/vib_arhiv/",
        "kind": "primary"
      },
      {
        "id": "presidential",
        "title": "МПА СНГ, Институт президентской власти, 2018, приложение по РФ",
        "url": "https://iacis.ru/public/upload/files/2/1387.pdf",
        "kind": "primary"
      },
      {
        "id": "parliament",
        "title": "МПА СНГ, парламентские выборы, исторический справочник",
        "url": "https://iacis.ru/public/upload/files/2/1388.pdf",
        "kind": "primary"
      },
      {
        "id": "pres2024",
        "title": "ЦИК России, сообщение об итоговой явке на выборах 2024 года",
        "url": "https://t.me/s/cikrossii/3653",
        "kind": "primary"
      },
      {
        "id": "duma2026",
        "title": "РЦОИТ при ЦИК, общие результаты выборов 2026 года",
        "url": "https://www.rcoit.ru/news/7298604/",
        "kind": "primary"
      },
      {
        "id": "moscow2023",
        "title": "Мосгоризбирком, архив выборов мэра Москвы 2023",
        "url": "https://www.mosgorizbirkom.ru/archive/vybory-mera-moskvy-10-sentyabrya-2023-goda/vybory-mera-moskvy-2023/",
        "kind": "primary"
      },
      {
        "id": "moscowTurnout",
        "title": "Уполномоченный по правам человека, доклад по Москве: явка 2018/2023",
        "url": "https://map.ombudsmanrf.org/Karta_Yadro/prav_z_karta/ross_fed/doklad_v_sub/doklad_v_moskve/doklad_v_moskveweb.pdf",
        "kind": "primary"
      },
      {
        "id": "soviet1985",
        "title": "Сообщение ЦИК РСФСР в газете от 28.02.1985, цифровой архив библиотеки",
        "url": "https://elib.uraic.ru/bitstream/123456789/10674/1/0013057.pdf",
        "kind": "primary"
      }
    ],
    "notes": [
      "Календарь охватывает 1985–2035: федеральные выборы, переходные советские институты, региональные/местные примеры и отдельно сценарии будущего.",
      "Это НЕ полный архив губернаторских и муниципальных кампаний всех территорий. Неизвестная дата/явка = null, а не отсутствие выборов.",
      "На 27.10.2026 выборы Госдумы 2026 уже исторические. Будущие 2030/2031 — сценарии, без вымышленных результатов и точной даты.",
      "У губернаторских и местных выборов нет общей даты и единого пятилетнего ряда для всех субъектов. Период 2005–2011 не моделируется как всеобщие прямые выборы губернаторов.",
      "Москва и Петербург: выборы главы города федерального значения — региональный уровень; муниципальный совет — отдельный уровень.",
      "Некоторые исторические показатели явки не загружены или имеют разночтения: они оставлены null. Не интерполировать их и не выдавать оценку за результат ЦИК.",
      "Ступени карьеры и цены [~]. Это нейтральные игровые роли без убеждения голосовать за конкретного кандидата или партию.",
      "Денежные настройки не отражают разрешённые законом размеры избирательных фондов."
    ]
  },
  "coverage": {
    "fromYear": 1985,
    "toYear": 2035,
    "federal": "historical_dates_and_future_scenarios",
    "regional": "Moscow_examples",
    "municipal": "Moscow_and_StPetersburg_examples",
    "completeRegionalArchive": false,
    "completeMunicipalArchive": false
  },
  "calendar": [
    {
      "year": 1985,
      "eventIds": [
        "rsfsr_1985"
      ],
      "regionalHeadMode": "soviet_regional_councils",
      "localSchedule": "depends_on_municipality",
      "regionalLocalCoverage": "examples_only_not_exhaustive",
      "future": false
    },
    {
      "year": 1986,
      "eventIds": [],
      "regionalHeadMode": "soviet_regional_councils",
      "localSchedule": "depends_on_municipality",
      "regionalLocalCoverage": "examples_only_not_exhaustive",
      "future": false
    },
    {
      "year": 1987,
      "eventIds": [],
      "regionalHeadMode": "soviet_regional_councils",
      "localSchedule": "depends_on_municipality",
      "regionalLocalCoverage": "examples_only_not_exhaustive",
      "future": false
    },
    {
      "year": 1988,
      "eventIds": [],
      "regionalHeadMode": "soviet_regional_councils",
      "localSchedule": "depends_on_municipality",
      "regionalLocalCoverage": "examples_only_not_exhaustive",
      "future": false
    },
    {
      "year": 1989,
      "eventIds": [
        "ussr_1989"
      ],
      "regionalHeadMode": "soviet_regional_councils",
      "localSchedule": "depends_on_municipality",
      "regionalLocalCoverage": "examples_only_not_exhaustive",
      "future": false
    },
    {
      "year": 1990,
      "eventIds": [
        "rsfsr_1990"
      ],
      "regionalHeadMode": "soviet_regional_councils",
      "localSchedule": "depends_on_municipality",
      "regionalLocalCoverage": "examples_only_not_exhaustive",
      "future": false
    },
    {
      "year": 1991,
      "eventIds": [
        "pres_1991",
        "head_moscow_1991"
      ],
      "regionalHeadMode": "mixed_direct_elections_and_appointments",
      "localSchedule": "depends_on_municipality",
      "regionalLocalCoverage": "examples_only_not_exhaustive",
      "future": false
    },
    {
      "year": 1992,
      "eventIds": [],
      "regionalHeadMode": "mixed_direct_elections_and_appointments",
      "localSchedule": "depends_on_municipality",
      "regionalLocalCoverage": "examples_only_not_exhaustive",
      "future": false
    },
    {
      "year": 1993,
      "eventIds": [
        "duma_1993"
      ],
      "regionalHeadMode": "mixed_direct_elections_and_appointments",
      "localSchedule": "depends_on_municipality",
      "regionalLocalCoverage": "examples_only_not_exhaustive",
      "future": false
    },
    {
      "year": 1994,
      "eventIds": [],
      "regionalHeadMode": "mixed_direct_elections_and_appointments",
      "localSchedule": "depends_on_municipality",
      "regionalLocalCoverage": "examples_only_not_exhaustive",
      "future": false
    },
    {
      "year": 1995,
      "eventIds": [
        "duma_1995"
      ],
      "regionalHeadMode": "mixed_direct_elections_and_appointments",
      "localSchedule": "depends_on_municipality",
      "regionalLocalCoverage": "examples_only_not_exhaustive",
      "future": false
    },
    {
      "year": 1996,
      "eventIds": [
        "pres_1996",
        "pres_1996_round2",
        "head_moscow_1996"
      ],
      "regionalHeadMode": "mixed_direct_elections_and_appointments",
      "localSchedule": "depends_on_municipality",
      "regionalLocalCoverage": "examples_only_not_exhaustive",
      "future": false
    },
    {
      "year": 1997,
      "eventIds": [],
      "regionalHeadMode": "mixed_direct_elections_and_appointments",
      "localSchedule": "depends_on_municipality",
      "regionalLocalCoverage": "examples_only_not_exhaustive",
      "future": false
    },
    {
      "year": 1998,
      "eventIds": [],
      "regionalHeadMode": "mixed_direct_elections_and_appointments",
      "localSchedule": "depends_on_municipality",
      "regionalLocalCoverage": "examples_only_not_exhaustive",
      "future": false
    },
    {
      "year": 1999,
      "eventIds": [
        "duma_1999",
        "head_moscow_1999"
      ],
      "regionalHeadMode": "mixed_direct_elections_and_appointments",
      "localSchedule": "depends_on_municipality",
      "regionalLocalCoverage": "examples_only_not_exhaustive",
      "future": false
    },
    {
      "year": 2000,
      "eventIds": [
        "pres_2000"
      ],
      "regionalHeadMode": "mixed_direct_elections_and_appointments",
      "localSchedule": "depends_on_municipality",
      "regionalLocalCoverage": "examples_only_not_exhaustive",
      "future": false
    },
    {
      "year": 2001,
      "eventIds": [],
      "regionalHeadMode": "mixed_direct_elections_and_appointments",
      "localSchedule": "depends_on_municipality",
      "regionalLocalCoverage": "examples_only_not_exhaustive",
      "future": false
    },
    {
      "year": 2002,
      "eventIds": [],
      "regionalHeadMode": "mixed_direct_elections_and_appointments",
      "localSchedule": "depends_on_municipality",
      "regionalLocalCoverage": "examples_only_not_exhaustive",
      "future": false
    },
    {
      "year": 2003,
      "eventIds": [
        "duma_2003",
        "head_moscow_2003"
      ],
      "regionalHeadMode": "mixed_direct_elections_and_appointments",
      "localSchedule": "depends_on_municipality",
      "regionalLocalCoverage": "examples_only_not_exhaustive",
      "future": false
    },
    {
      "year": 2004,
      "eventIds": [
        "pres_2004"
      ],
      "regionalHeadMode": "mixed_direct_elections_and_appointments",
      "localSchedule": "depends_on_municipality",
      "regionalLocalCoverage": "examples_only_not_exhaustive",
      "future": false
    },
    {
      "year": 2005,
      "eventIds": [],
      "regionalHeadMode": "regional_legislature_on_presidential_nomination",
      "localSchedule": "depends_on_municipality",
      "regionalLocalCoverage": "examples_only_not_exhaustive",
      "future": false
    },
    {
      "year": 2006,
      "eventIds": [],
      "regionalHeadMode": "regional_legislature_on_presidential_nomination",
      "localSchedule": "depends_on_municipality",
      "regionalLocalCoverage": "examples_only_not_exhaustive",
      "future": false
    },
    {
      "year": 2007,
      "eventIds": [
        "duma_2007"
      ],
      "regionalHeadMode": "regional_legislature_on_presidential_nomination",
      "localSchedule": "depends_on_municipality",
      "regionalLocalCoverage": "examples_only_not_exhaustive",
      "future": false
    },
    {
      "year": 2008,
      "eventIds": [
        "pres_2008"
      ],
      "regionalHeadMode": "regional_legislature_on_presidential_nomination",
      "localSchedule": "depends_on_municipality",
      "regionalLocalCoverage": "examples_only_not_exhaustive",
      "future": false
    },
    {
      "year": 2009,
      "eventIds": [],
      "regionalHeadMode": "regional_legislature_on_presidential_nomination",
      "localSchedule": "depends_on_municipality",
      "regionalLocalCoverage": "examples_only_not_exhaustive",
      "future": false
    },
    {
      "year": 2010,
      "eventIds": [],
      "regionalHeadMode": "regional_legislature_on_presidential_nomination",
      "localSchedule": "depends_on_municipality",
      "regionalLocalCoverage": "examples_only_not_exhaustive",
      "future": false
    },
    {
      "year": 2011,
      "eventIds": [
        "duma_2011"
      ],
      "regionalHeadMode": "regional_legislature_on_presidential_nomination",
      "localSchedule": "depends_on_municipality",
      "regionalLocalCoverage": "examples_only_not_exhaustive",
      "future": false
    },
    {
      "year": 2012,
      "eventIds": [
        "pres_2012",
        "local_moscow_2012"
      ],
      "regionalHeadMode": "direct_or_legislative_selection_by_region",
      "localSchedule": "depends_on_municipality",
      "regionalLocalCoverage": "examples_only_not_exhaustive",
      "future": false
    },
    {
      "year": 2013,
      "eventIds": [
        "head_moscow_2013"
      ],
      "regionalHeadMode": "direct_or_legislative_selection_by_region",
      "localSchedule": "depends_on_municipality",
      "regionalLocalCoverage": "examples_only_not_exhaustive",
      "future": false
    },
    {
      "year": 2014,
      "eventIds": [
        "local_spb_2014"
      ],
      "regionalHeadMode": "direct_or_legislative_selection_by_region",
      "localSchedule": "depends_on_municipality",
      "regionalLocalCoverage": "examples_only_not_exhaustive",
      "future": false
    },
    {
      "year": 2015,
      "eventIds": [],
      "regionalHeadMode": "direct_or_legislative_selection_by_region",
      "localSchedule": "depends_on_municipality",
      "regionalLocalCoverage": "examples_only_not_exhaustive",
      "future": false
    },
    {
      "year": 2016,
      "eventIds": [
        "duma_2016"
      ],
      "regionalHeadMode": "direct_or_legislative_selection_by_region",
      "localSchedule": "depends_on_municipality",
      "regionalLocalCoverage": "examples_only_not_exhaustive",
      "future": false
    },
    {
      "year": 2017,
      "eventIds": [
        "local_moscow_2017"
      ],
      "regionalHeadMode": "direct_or_legislative_selection_by_region",
      "localSchedule": "depends_on_municipality",
      "regionalLocalCoverage": "examples_only_not_exhaustive",
      "future": false
    },
    {
      "year": 2018,
      "eventIds": [
        "pres_2018",
        "head_moscow_2018"
      ],
      "regionalHeadMode": "direct_or_legislative_selection_by_region",
      "localSchedule": "depends_on_municipality",
      "regionalLocalCoverage": "examples_only_not_exhaustive",
      "future": false
    },
    {
      "year": 2019,
      "eventIds": [
        "local_spb_2019"
      ],
      "regionalHeadMode": "direct_or_legislative_selection_by_region",
      "localSchedule": "depends_on_municipality",
      "regionalLocalCoverage": "examples_only_not_exhaustive",
      "future": false
    },
    {
      "year": 2020,
      "eventIds": [],
      "regionalHeadMode": "direct_or_legislative_selection_by_region",
      "localSchedule": "depends_on_municipality",
      "regionalLocalCoverage": "examples_only_not_exhaustive",
      "future": false
    },
    {
      "year": 2021,
      "eventIds": [
        "duma_2021"
      ],
      "regionalHeadMode": "direct_or_legislative_selection_by_region",
      "localSchedule": "depends_on_municipality",
      "regionalLocalCoverage": "examples_only_not_exhaustive",
      "future": false
    },
    {
      "year": 2022,
      "eventIds": [
        "local_moscow_2022"
      ],
      "regionalHeadMode": "direct_or_legislative_selection_by_region",
      "localSchedule": "depends_on_municipality",
      "regionalLocalCoverage": "examples_only_not_exhaustive",
      "future": false
    },
    {
      "year": 2023,
      "eventIds": [
        "head_moscow_2023"
      ],
      "regionalHeadMode": "direct_or_legislative_selection_by_region",
      "localSchedule": "depends_on_municipality",
      "regionalLocalCoverage": "examples_only_not_exhaustive",
      "future": false
    },
    {
      "year": 2024,
      "eventIds": [
        "pres_2024",
        "local_spb_2024"
      ],
      "regionalHeadMode": "direct_or_legislative_selection_by_region",
      "localSchedule": "depends_on_municipality",
      "regionalLocalCoverage": "examples_only_not_exhaustive",
      "future": false
    },
    {
      "year": 2025,
      "eventIds": [],
      "regionalHeadMode": "direct_or_legislative_selection_by_region",
      "localSchedule": "depends_on_municipality",
      "regionalLocalCoverage": "examples_only_not_exhaustive",
      "future": false
    },
    {
      "year": 2026,
      "eventIds": [
        "duma_2026"
      ],
      "regionalHeadMode": "direct_or_legislative_selection_by_region",
      "localSchedule": "depends_on_municipality",
      "regionalLocalCoverage": "examples_only_not_exhaustive",
      "future": false
    },
    {
      "year": 2027,
      "eventIds": [],
      "regionalHeadMode": "direct_or_legislative_selection_by_region",
      "localSchedule": "depends_on_municipality",
      "regionalLocalCoverage": "examples_only_not_exhaustive",
      "future": true
    },
    {
      "year": 2028,
      "eventIds": [],
      "regionalHeadMode": "direct_or_legislative_selection_by_region",
      "localSchedule": "depends_on_municipality",
      "regionalLocalCoverage": "examples_only_not_exhaustive",
      "future": true
    },
    {
      "year": 2029,
      "eventIds": [],
      "regionalHeadMode": "direct_or_legislative_selection_by_region",
      "localSchedule": "depends_on_municipality",
      "regionalLocalCoverage": "examples_only_not_exhaustive",
      "future": true
    },
    {
      "year": 2030,
      "eventIds": [
        "scenario_pres_2030"
      ],
      "regionalHeadMode": "direct_or_legislative_selection_by_region",
      "localSchedule": "depends_on_municipality",
      "regionalLocalCoverage": "examples_only_not_exhaustive",
      "future": true
    },
    {
      "year": 2031,
      "eventIds": [
        "scenario_duma_2031"
      ],
      "regionalHeadMode": "direct_or_legislative_selection_by_region",
      "localSchedule": "depends_on_municipality",
      "regionalLocalCoverage": "examples_only_not_exhaustive",
      "future": true
    },
    {
      "year": 2032,
      "eventIds": [],
      "regionalHeadMode": "direct_or_legislative_selection_by_region",
      "localSchedule": "depends_on_municipality",
      "regionalLocalCoverage": "examples_only_not_exhaustive",
      "future": true
    },
    {
      "year": 2033,
      "eventIds": [],
      "regionalHeadMode": "direct_or_legislative_selection_by_region",
      "localSchedule": "depends_on_municipality",
      "regionalLocalCoverage": "examples_only_not_exhaustive",
      "future": true
    },
    {
      "year": 2034,
      "eventIds": [],
      "regionalHeadMode": "direct_or_legislative_selection_by_region",
      "localSchedule": "depends_on_municipality",
      "regionalLocalCoverage": "examples_only_not_exhaustive",
      "future": true
    },
    {
      "year": 2035,
      "eventIds": [],
      "regionalHeadMode": "direct_or_legislative_selection_by_region",
      "localSchedule": "depends_on_municipality",
      "regionalLocalCoverage": "examples_only_not_exhaustive",
      "future": true
    }
  ],
  "events": [
    {
      "id": "rsfsr_1985",
      "kind": "soviet_parliament",
      "year": 1985,
      "dateFrom": "1985-02-24",
      "dateTo": "1985-02-24",
      "regionId": null,
      "title": "Выборы в Верховный Совет РСФСР",
      "status": "historical",
      "sourceIds": [
        "soviet1985"
      ],
      "turnoutPercent": null,
      "turnoutQuality": "not_loaded",
      "text": "Действует советская система выдвижения и голосования. Нельзя переносить на этот период современные правила партийных выборов Госдумы."
    },
    {
      "id": "ussr_1989",
      "kind": "soviet_congress",
      "year": 1989,
      "dateFrom": "1989-03-26",
      "dateTo": "1989-03-26",
      "regionId": null,
      "title": "Выборы народных депутатов СССР",
      "status": "historical",
      "sourceIds": [
        "cik"
      ],
      "turnoutPercent": null,
      "turnoutQuality": "not_loaded",
      "text": "Прямые выборы народных депутатов СССР проходили по территориальным и национально-территориальным округам. Часть депутатов избиралась общественными организациями отдельно."
    },
    {
      "id": "rsfsr_1990",
      "kind": "soviet_congress",
      "year": 1990,
      "dateFrom": "1990-03-04",
      "dateTo": "1990-03-04",
      "regionId": null,
      "title": "Выборы народных депутатов РСФСР",
      "status": "historical",
      "sourceIds": [
        "cik"
      ],
      "turnoutPercent": null,
      "turnoutQuality": "not_loaded",
      "text": "Выборы народных депутатов РСФСР. Повторное голосование и повторные выборы в отдельных округах проводятся отдельно; это не выборы Госдумы."
    },
    {
      "id": "pres_1991",
      "kind": "president",
      "year": 1991,
      "dateFrom": "1991-06-12",
      "dateTo": "1991-06-12",
      "regionId": null,
      "title": "Выборы Президента РСФСР",
      "status": "historical",
      "sourceIds": [
        "presidential"
      ],
      "turnoutPercent": 76.66,
      "turnoutQuality": "Справочное значение; определения участия/голосования в исторических публикациях могут различаться. Для точного сопоставления нужен исходный протокол ЦИК.",
      "text": "Можно ознакомиться с кандидатами и программами, обсудить вопросы и принять самостоятельное решение об участии. Выбор игрока не оценивается по партийным предпочтениям."
    },
    {
      "id": "pres_1996",
      "kind": "president",
      "year": 1996,
      "dateFrom": "1996-06-16",
      "dateTo": "1996-06-16",
      "regionId": null,
      "title": "Выборы Президента России",
      "status": "historical",
      "sourceIds": [
        "presidential"
      ],
      "turnoutPercent": 69.81,
      "turnoutQuality": "Справочное значение; определения участия/голосования в исторических публикациях могут различаться. Для точного сопоставления нужен исходный протокол ЦИК.",
      "text": "Можно ознакомиться с кандидатами и программами, обсудить вопросы и принять самостоятельное решение об участии. Выбор игрока не оценивается по партийным предпочтениям."
    },
    {
      "id": "pres_2000",
      "kind": "president",
      "year": 2000,
      "dateFrom": "2000-03-26",
      "dateTo": "2000-03-26",
      "regionId": null,
      "title": "Выборы Президента России",
      "status": "historical",
      "sourceIds": [
        "presidential"
      ],
      "turnoutPercent": 68.7,
      "turnoutQuality": "Справочное значение; определения участия/голосования в исторических публикациях могут различаться. Для точного сопоставления нужен исходный протокол ЦИК.",
      "text": "Можно ознакомиться с кандидатами и программами, обсудить вопросы и принять самостоятельное решение об участии. Выбор игрока не оценивается по партийным предпочтениям."
    },
    {
      "id": "pres_2004",
      "kind": "president",
      "year": 2004,
      "dateFrom": "2004-03-14",
      "dateTo": "2004-03-14",
      "regionId": null,
      "title": "Выборы Президента России",
      "status": "historical",
      "sourceIds": [
        "presidential"
      ],
      "turnoutPercent": 64.38,
      "turnoutQuality": "Справочное значение; определения участия/голосования в исторических публикациях могут различаться. Для точного сопоставления нужен исходный протокол ЦИК.",
      "text": "Можно ознакомиться с кандидатами и программами, обсудить вопросы и принять самостоятельное решение об участии. Выбор игрока не оценивается по партийным предпочтениям."
    },
    {
      "id": "pres_2008",
      "kind": "president",
      "year": 2008,
      "dateFrom": "2008-03-02",
      "dateTo": "2008-03-02",
      "regionId": null,
      "title": "Выборы Президента России",
      "status": "historical",
      "sourceIds": [
        "presidential"
      ],
      "turnoutPercent": 69.81,
      "turnoutQuality": "Справочное значение; определения участия/голосования в исторических публикациях могут различаться. Для точного сопоставления нужен исходный протокол ЦИК.",
      "text": "Можно ознакомиться с кандидатами и программами, обсудить вопросы и принять самостоятельное решение об участии. Выбор игрока не оценивается по партийным предпочтениям."
    },
    {
      "id": "pres_2012",
      "kind": "president",
      "year": 2012,
      "dateFrom": "2012-03-04",
      "dateTo": "2012-03-04",
      "regionId": null,
      "title": "Выборы Президента России",
      "status": "historical",
      "sourceIds": [
        "presidential"
      ],
      "turnoutPercent": 65.34,
      "turnoutQuality": "Справочное значение; определения участия/голосования в исторических публикациях могут различаться. Для точного сопоставления нужен исходный протокол ЦИК.",
      "text": "Можно ознакомиться с кандидатами и программами, обсудить вопросы и принять самостоятельное решение об участии. Выбор игрока не оценивается по партийным предпочтениям."
    },
    {
      "id": "pres_2018",
      "kind": "president",
      "year": 2018,
      "dateFrom": "2018-03-18",
      "dateTo": "2018-03-18",
      "regionId": null,
      "title": "Выборы Президента России",
      "status": "historical",
      "sourceIds": [
        "presidential"
      ],
      "turnoutPercent": 67.54,
      "turnoutQuality": "Справочное значение; определения участия/голосования в исторических публикациях могут различаться. Для точного сопоставления нужен исходный протокол ЦИК.",
      "text": "Можно ознакомиться с кандидатами и программами, обсудить вопросы и принять самостоятельное решение об участии. Выбор игрока не оценивается по партийным предпочтениям."
    },
    {
      "id": "pres_2024",
      "kind": "president",
      "year": 2024,
      "dateFrom": "2024-03-15",
      "dateTo": "2024-03-17",
      "regionId": null,
      "title": "Выборы Президента России",
      "status": "historical",
      "sourceIds": [
        "pres2024"
      ],
      "turnoutPercent": 77.49,
      "turnoutQuality": "Справочное значение; определения участия/голосования в исторических публикациях могут различаться. Для точного сопоставления нужен исходный протокол ЦИК.",
      "text": "Можно ознакомиться с кандидатами и программами, обсудить вопросы и принять самостоятельное решение об участии. Выбор игрока не оценивается по партийным предпочтениям."
    },
    {
      "id": "pres_1996_round2",
      "kind": "president_runoff",
      "year": 1996,
      "dateFrom": "1996-07-03",
      "dateTo": "1996-07-03",
      "regionId": null,
      "title": "Повторное голосование на выборах Президента России",
      "status": "historical",
      "sourceIds": [
        "presidential"
      ],
      "turnoutPercent": null,
      "turnoutQuality": "not_loaded",
      "text": "Можно ознакомиться с кандидатами и программами, обсудить вопросы и принять самостоятельное решение об участии. Выбор игрока не оценивается по партийным предпочтениям.",
      "turnoutReportedVariants": [
        {
          "value": 68.88,
          "sourceId": "presidential",
          "note": "Число в историческом издании; не принято за унифицированную итоговую явку из-за разночтений определений."
        }
      ]
    },
    {
      "id": "duma_1993",
      "kind": "state_duma",
      "year": 1993,
      "dateFrom": "1993-12-12",
      "dateTo": "1993-12-12",
      "regionId": null,
      "title": "Выборы депутатов Государственной Думы",
      "status": "historical",
      "sourceIds": [
        "parliament"
      ],
      "turnoutPercent": 54.81,
      "turnoutQuality": "Справочное историческое значение; для не загруженных/различающихся показателей оставлено null.",
      "text": "Можно ознакомиться с кандидатами и программами, обсудить вопросы и принять самостоятельное решение об участии. Выбор игрока не оценивается по партийным предпочтениям."
    },
    {
      "id": "duma_1995",
      "kind": "state_duma",
      "year": 1995,
      "dateFrom": "1995-12-17",
      "dateTo": "1995-12-17",
      "regionId": null,
      "title": "Выборы депутатов Государственной Думы",
      "status": "historical",
      "sourceIds": [
        "parliament"
      ],
      "turnoutPercent": 64.76,
      "turnoutQuality": "Справочное историческое значение; для не загруженных/различающихся показателей оставлено null.",
      "text": "Можно ознакомиться с кандидатами и программами, обсудить вопросы и принять самостоятельное решение об участии. Выбор игрока не оценивается по партийным предпочтениям."
    },
    {
      "id": "duma_1999",
      "kind": "state_duma",
      "year": 1999,
      "dateFrom": "1999-12-19",
      "dateTo": "1999-12-19",
      "regionId": null,
      "title": "Выборы депутатов Государственной Думы",
      "status": "historical",
      "sourceIds": [
        "parliament"
      ],
      "turnoutPercent": 61.85,
      "turnoutQuality": "Справочное историческое значение; для не загруженных/различающихся показателей оставлено null.",
      "text": "Можно ознакомиться с кандидатами и программами, обсудить вопросы и принять самостоятельное решение об участии. Выбор игрока не оценивается по партийным предпочтениям."
    },
    {
      "id": "duma_2003",
      "kind": "state_duma",
      "year": 2003,
      "dateFrom": "2003-12-07",
      "dateTo": "2003-12-07",
      "regionId": null,
      "title": "Выборы депутатов Государственной Думы",
      "status": "historical",
      "sourceIds": [
        "parliament"
      ],
      "turnoutPercent": null,
      "turnoutQuality": "Справочное историческое значение; для не загруженных/различающихся показателей оставлено null.",
      "text": "Можно ознакомиться с кандидатами и программами, обсудить вопросы и принять самостоятельное решение об участии. Выбор игрока не оценивается по партийным предпочтениям."
    },
    {
      "id": "duma_2007",
      "kind": "state_duma",
      "year": 2007,
      "dateFrom": "2007-12-02",
      "dateTo": "2007-12-02",
      "regionId": null,
      "title": "Выборы депутатов Государственной Думы",
      "status": "historical",
      "sourceIds": [
        "parliament"
      ],
      "turnoutPercent": null,
      "turnoutQuality": "Справочное историческое значение; для не загруженных/различающихся показателей оставлено null.",
      "text": "Можно ознакомиться с кандидатами и программами, обсудить вопросы и принять самостоятельное решение об участии. Выбор игрока не оценивается по партийным предпочтениям."
    },
    {
      "id": "duma_2011",
      "kind": "state_duma",
      "year": 2011,
      "dateFrom": "2011-12-04",
      "dateTo": "2011-12-04",
      "regionId": null,
      "title": "Выборы депутатов Государственной Думы",
      "status": "historical",
      "sourceIds": [
        "parliament"
      ],
      "turnoutPercent": 60.21,
      "turnoutQuality": "Справочное историческое значение; для не загруженных/различающихся показателей оставлено null.",
      "text": "Можно ознакомиться с кандидатами и программами, обсудить вопросы и принять самостоятельное решение об участии. Выбор игрока не оценивается по партийным предпочтениям."
    },
    {
      "id": "duma_2016",
      "kind": "state_duma",
      "year": 2016,
      "dateFrom": "2016-09-18",
      "dateTo": "2016-09-18",
      "regionId": null,
      "title": "Выборы депутатов Государственной Думы",
      "status": "historical",
      "sourceIds": [
        "parliament"
      ],
      "turnoutPercent": 47.88,
      "turnoutQuality": "Справочное историческое значение; для не загруженных/различающихся показателей оставлено null.",
      "text": "Можно ознакомиться с кандидатами и программами, обсудить вопросы и принять самостоятельное решение об участии. Выбор игрока не оценивается по партийным предпочтениям."
    },
    {
      "id": "duma_2021",
      "kind": "state_duma",
      "year": 2021,
      "dateFrom": "2021-09-17",
      "dateTo": "2021-09-19",
      "regionId": null,
      "title": "Выборы депутатов Государственной Думы",
      "status": "historical",
      "sourceIds": [
        "parliament"
      ],
      "turnoutPercent": 51.72,
      "turnoutQuality": "Справочное историческое значение; для не загруженных/различающихся показателей оставлено null.",
      "text": "Можно ознакомиться с кандидатами и программами, обсудить вопросы и принять самостоятельное решение об участии. Выбор игрока не оценивается по партийным предпочтениям."
    },
    {
      "id": "duma_2026",
      "kind": "state_duma",
      "year": 2026,
      "dateFrom": "2026-09-18",
      "dateTo": "2026-09-20",
      "regionId": null,
      "title": "Выборы депутатов Государственной Думы",
      "status": "historical",
      "sourceIds": [
        "duma2026"
      ],
      "turnoutPercent": null,
      "turnoutQuality": "Справочное историческое значение; для не загруженных/различающихся показателей оставлено null.",
      "text": "Можно ознакомиться с кандидатами и программами, обсудить вопросы и принять самостоятельное решение об участии. Выбор игрока не оценивается по партийным предпочтениям."
    },
    {
      "id": "head_moscow_1991",
      "kind": "regional_head",
      "year": 1991,
      "dateFrom": "1991-06-12",
      "dateTo": "1991-06-12",
      "regionId": "census_18",
      "title": "Выборы мэра Москвы",
      "status": "historical",
      "sourceIds": [
        "moscow2023"
      ],
      "turnoutPercent": null,
      "turnoutQuality": "not_loaded",
      "text": "Можно ознакомиться с кандидатами и программами, обсудить вопросы и принять самостоятельное решение об участии. Выбор игрока не оценивается по партийным предпочтениям."
    },
    {
      "id": "head_moscow_1996",
      "kind": "regional_head",
      "year": 1996,
      "dateFrom": "1996-06-16",
      "dateTo": "1996-06-16",
      "regionId": "census_18",
      "title": "Выборы мэра Москвы",
      "status": "historical",
      "sourceIds": [
        "moscow2023"
      ],
      "turnoutPercent": null,
      "turnoutQuality": "not_loaded",
      "text": "Можно ознакомиться с кандидатами и программами, обсудить вопросы и принять самостоятельное решение об участии. Выбор игрока не оценивается по партийным предпочтениям."
    },
    {
      "id": "head_moscow_1999",
      "kind": "regional_head",
      "year": 1999,
      "dateFrom": "1999-12-19",
      "dateTo": "1999-12-19",
      "regionId": "census_18",
      "title": "Выборы мэра Москвы",
      "status": "historical",
      "sourceIds": [
        "moscow2023"
      ],
      "turnoutPercent": null,
      "turnoutQuality": "not_loaded",
      "text": "Можно ознакомиться с кандидатами и программами, обсудить вопросы и принять самостоятельное решение об участии. Выбор игрока не оценивается по партийным предпочтениям."
    },
    {
      "id": "head_moscow_2003",
      "kind": "regional_head",
      "year": 2003,
      "dateFrom": "2003-12-07",
      "dateTo": "2003-12-07",
      "regionId": "census_18",
      "title": "Выборы мэра Москвы",
      "status": "historical",
      "sourceIds": [
        "moscow2023"
      ],
      "turnoutPercent": null,
      "turnoutQuality": "not_loaded",
      "text": "Можно ознакомиться с кандидатами и программами, обсудить вопросы и принять самостоятельное решение об участии. Выбор игрока не оценивается по партийным предпочтениям."
    },
    {
      "id": "head_moscow_2013",
      "kind": "regional_head",
      "year": 2013,
      "dateFrom": "2013-09-08",
      "dateTo": "2013-09-08",
      "regionId": "census_18",
      "title": "Выборы мэра Москвы",
      "status": "historical",
      "sourceIds": [
        "moscow2023"
      ],
      "turnoutPercent": null,
      "turnoutQuality": "not_loaded",
      "text": "Можно ознакомиться с кандидатами и программами, обсудить вопросы и принять самостоятельное решение об участии. Выбор игрока не оценивается по партийным предпочтениям."
    },
    {
      "id": "head_moscow_2018",
      "kind": "regional_head",
      "year": 2018,
      "dateFrom": "2018-09-09",
      "dateTo": "2018-09-09",
      "regionId": "census_18",
      "title": "Выборы мэра Москвы",
      "status": "historical",
      "sourceIds": [
        "moscowTurnout"
      ],
      "turnoutPercent": 30.9,
      "turnoutQuality": "reported_by_source",
      "text": "Можно ознакомиться с кандидатами и программами, обсудить вопросы и принять самостоятельное решение об участии. Выбор игрока не оценивается по партийным предпочтениям."
    },
    {
      "id": "head_moscow_2023",
      "kind": "regional_head",
      "year": 2023,
      "dateFrom": "2023-09-08",
      "dateTo": "2023-09-10",
      "regionId": "census_18",
      "title": "Выборы мэра Москвы",
      "status": "historical",
      "sourceIds": [
        "moscowTurnout"
      ],
      "turnoutPercent": 42.5,
      "turnoutQuality": "reported_by_source",
      "text": "Можно ознакомиться с кандидатами и программами, обсудить вопросы и принять самостоятельное решение об участии. Выбор игрока не оценивается по партийным предпочтениям."
    },
    {
      "id": "local_moscow_2012",
      "kind": "municipal_council",
      "year": 2012,
      "dateFrom": "2012-03-04",
      "dateTo": "2012-03-04",
      "regionId": "census_18",
      "title": "Выборы муниципальных депутатов в Москве",
      "status": "historical",
      "sourceIds": [
        "cik"
      ],
      "turnoutPercent": null,
      "turnoutQuality": "not_loaded",
      "text": "Выборы представительных органов отдельных муниципальных образований. Состав округов и даты конкретных кампаний уточняются по архиву комиссии; это не выборы мэра Москвы."
    },
    {
      "id": "local_moscow_2017",
      "kind": "municipal_council",
      "year": 2017,
      "dateFrom": "2017-09-10",
      "dateTo": "2017-09-10",
      "regionId": "census_18",
      "title": "Выборы муниципальных депутатов в Москве",
      "status": "historical",
      "sourceIds": [
        "cik"
      ],
      "turnoutPercent": null,
      "turnoutQuality": "not_loaded",
      "text": "Выборы представительных органов отдельных муниципальных образований. Состав округов и даты конкретных кампаний уточняются по архиву комиссии; это не выборы мэра Москвы."
    },
    {
      "id": "local_moscow_2022",
      "kind": "municipal_council",
      "year": 2022,
      "dateFrom": "2022-09-11",
      "dateTo": "2022-09-11",
      "regionId": "census_18",
      "title": "Выборы муниципальных депутатов в Москве",
      "status": "historical",
      "sourceIds": [
        "cik"
      ],
      "turnoutPercent": null,
      "turnoutQuality": "not_loaded",
      "text": "Выборы представительных органов отдельных муниципальных образований. Состав округов и даты конкретных кампаний уточняются по архиву комиссии; это не выборы мэра Москвы."
    },
    {
      "id": "local_spb_2014",
      "kind": "municipal_council",
      "year": 2014,
      "dateFrom": "2014-09-14",
      "dateTo": "2014-09-14",
      "regionId": "census_29",
      "title": "Муниципальные выборы в Санкт-Петербурге",
      "status": "historical",
      "sourceIds": [
        "cik"
      ],
      "turnoutPercent": null,
      "turnoutQuality": "not_loaded",
      "text": "Выбираются муниципальные советы в участвующих образованиях. Голосование за губернатора, если совмещено, является отдельной кампанией."
    },
    {
      "id": "local_spb_2019",
      "kind": "municipal_council",
      "year": 2019,
      "dateFrom": "2019-09-08",
      "dateTo": "2019-09-08",
      "regionId": "census_29",
      "title": "Муниципальные выборы в Санкт-Петербурге",
      "status": "historical",
      "sourceIds": [
        "cik"
      ],
      "turnoutPercent": null,
      "turnoutQuality": "not_loaded",
      "text": "Выбираются муниципальные советы в участвующих образованиях. Голосование за губернатора, если совмещено, является отдельной кампанией."
    },
    {
      "id": "local_spb_2024",
      "kind": "municipal_council",
      "year": 2024,
      "dateFrom": "2024-09-08",
      "dateTo": "2024-09-08",
      "regionId": "census_29",
      "title": "Муниципальные выборы в Санкт-Петербурге",
      "status": "historical",
      "sourceIds": [
        "cik"
      ],
      "turnoutPercent": null,
      "turnoutQuality": "not_loaded",
      "text": "Выбираются муниципальные советы в участвующих образованиях. Голосование за губернатора, если совмещено, является отдельной кампанией."
    },
    {
      "id": "scenario_pres_2030",
      "kind": "president",
      "year": 2030,
      "dateFrom": null,
      "dateTo": null,
      "regionId": null,
      "title": "Сценарий очередных президентских выборов около 2030 года",
      "status": "scenario",
      "sourceIds": [
        "cik"
      ],
      "turnoutPercent": null,
      "turnoutQuality": "not_loaded",
      "text": "[~] Продолжение шестилетнего цикла после 2024 года. Выборы и точная дата ещё не назначены; явка и результаты неизвестны."
    },
    {
      "id": "scenario_duma_2031",
      "kind": "state_duma",
      "year": 2031,
      "dateFrom": null,
      "dateTo": null,
      "regionId": null,
      "title": "Сценарий очередных выборов Госдумы около 2031 года",
      "status": "scenario",
      "sourceIds": [
        "cik"
      ],
      "turnoutPercent": null,
      "turnoutQuality": "not_loaded",
      "text": "[~] Продолжение пятилетнего цикла после 2026 года. Выборы и точная дата ещё не назначены; явка и результаты неизвестны."
    }
  ],
  "careerLadder": [
    {
      "id": "volunteer",
      "name": "Участие в общественном проекте",
      "modelAgeFrom": 16,
      "gainsMonthly": {
        "social": 0.2,
        "skills": 0.1
      },
      "costMonthlyRub2024": 0,
      "text": "Организация встреч, помощь жителям и изучение местных проблем. Возраст — игровая доступность, не избирательный ценз.",
      "quality": "[~] игровые ступени и расходы, не юридическая инструкция или бюджет реальной кампании"
    },
    {
      "id": "assistant",
      "name": "Помощник депутата или специалист проекта",
      "modelAgeFrom": 18,
      "gainsMonthly": {
        "social": 0.25,
        "skills": 0.2
      },
      "costMonthlyRub2024": 1000,
      "text": "Работа с обращениями, документами и публичными обсуждениями. Условия найма зависят от должности.",
      "quality": "[~] игровые ступени и расходы, не юридическая инструкция или бюджет реальной кампании"
    },
    {
      "id": "local_candidate",
      "name": "Кандидат в муниципальные депутаты",
      "modelAgeFrom": 18,
      "gainsMonthly": {
        "social": 0.3,
        "skills": 0.2
      },
      "costMonthlyRub2024": 5000,
      "text": "Потребуется проверить требования к выдвижению для конкретной кампании. Победа не гарантирована.",
      "quality": "[~] игровые ступени и расходы, не юридическая инструкция или бюджет реальной кампании"
    },
    {
      "id": "municipal_deputy",
      "name": "Муниципальный депутат",
      "modelAgeFrom": 18,
      "gainsMonthly": {
        "social": 0.3,
        "skills": 0.3
      },
      "costMonthlyRub2024": 3000,
      "text": "Работа с бюджетом и местными вопросами в пределах полномочий; часть мандатов непостоянные.",
      "quality": "[~] игровые ступени и расходы, не юридическая инструкция или бюджет реальной кампании"
    },
    {
      "id": "regional_candidate",
      "name": "Кандидат в региональный парламент",
      "modelAgeFrom": 21,
      "gainsMonthly": {
        "social": 0.35,
        "skills": 0.3
      },
      "costMonthlyRub2024": 15000,
      "text": "Возраст [~] для игрового этапа: реальные требования проверяются отдельно по закону региона.",
      "quality": "[~] игровые ступени и расходы, не юридическая инструкция или бюджет реальной кампании"
    },
    {
      "id": "duma_candidate",
      "name": "Кандидат в Госдуму",
      "modelAgeFrom": 21,
      "gainsMonthly": {
        "social": 0.4,
        "skills": 0.35
      },
      "costMonthlyRub2024": 30000,
      "text": "Участие в федеральной кампании требует соблюдения действующих правил регистрации и финансирования.",
      "quality": "[~] игровые ступени и расходы, не юридическая инструкция или бюджет реальной кампании"
    },
    {
      "id": "regional_head",
      "name": "Кандидат на должность главы региона",
      "modelAgeFrom": 30,
      "gainsMonthly": {
        "social": 0.45,
        "skills": 0.4
      },
      "costMonthlyRub2024": 50000,
      "text": "Для разных регионов предусмотрены разные процедуры избрания и требования; этап не открывается только за накопленные очки.",
      "quality": "[~] игровые ступени и расходы, не юридическая инструкция или бюджет реальной кампании"
    },
    {
      "id": "presidential_candidate",
      "name": "Кандидат на должность Президента",
      "modelAgeFrom": 35,
      "gainsMonthly": {
        "social": 0.5,
        "skills": 0.5
      },
      "costMonthlyRub2024": 100000,
      "text": "Возраст сам по себе недостаточен: гражданство, проживание и иные требования определяются действующей Конституцией и законом.",
      "quality": "[~] игровые ступени и расходы, не юридическая инструкция или бюджет реальной кампании"
    }
  ],
  "turnoutScenario": {
    "quality": "[~] игровой диапазон для будущих неназначенных кампаний",
    "presidentPercent": [
      50,
      80
    ],
    "stateDumaPercent": [
      35,
      70
    ],
    "regionalHeadPercent": [
      25,
      75
    ],
    "municipalCouncilPercent": [
      15,
      60
    ],
    "neverUseAsHistoricalResult": true
  }
};
