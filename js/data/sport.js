/*
Реальные спортивные организации, сезоны участия и история; зарплаты и возрастные диапазоны [~].
Составлено: 2026-10-27.
Источник rfs2025: РФС, состав участников Кубка России 2025/26 — https://www.rfs.ru/news/222638?mobile=no
Источник rfsCorrection: РФС, замена Торпедо на Оренбург в РПЛ, 11.07.2025 — https://www.rfs.ru/news/222692
Источник khl: КХЛ, архив сезона 2024/25 — https://history.khl.ru/2024_25.html
Источник khlHistory: КХЛ, история и названия клубов — https://kids.khl.ru/guide/evolyutsiya-nazvaniy-klubov-kkhl-ot-tsska-do-shankhayskikh-drakonov/
Источник vhl: ВХЛ, клубы — https://www.vhlru.ru/teams/
Источник rfb: РФБ, мужская Суперлига, архив сезона 2024/25 — https://irkut.russiabasket.ru/competitions
Источник vtb: УНИКС, утверждённый состав Единой лиги 2025/26 — https://www.unics.ru/eng/news/team-news/?id=vtb-united-league-approves-the-list-of-participants-and-the-system-of-the-championship-2025-26
Источник volley: Белогорье, состав Суперлиги 2025/26 — https://belogorievolley.ru/media/20250424_superliga_2026_sformirovana/
Источник handball: ФГР, календарь и команды мужской Суперлиги 2026/27 — https://rushandball.ru/publications/30658/kalendar-muzhskoj-superligi
Источник handball2016: ФГР, регламент 2016 года, мужские и женские клубы — https://rushandball.ru/files/docs/proekt_regulation_russia2016.pdf
Источник academy: Зенит, история школы Смена / академии — https://fc-zenit.ru/academy/academy_news/2025-05-27-gazprom-akademii-zenita-57-let.htm
[~] = оценка для игры; не официальное измерение. null = данных нет / неприменимо, не ноль.
Обычный справочник: подключение и применение выполняет потребитель данных.
*/
RL.DATA.sportExt = {
  "meta": {
    "schemaVersion": 1,
    "compiledAt": "2026-10-27",
    "sources": [
      {
        "id": "rfs2025",
        "title": "РФС, состав участников Кубка России 2025/26",
        "url": "https://www.rfs.ru/news/222638?mobile=no",
        "kind": "primary"
      },
      {
        "id": "rfsCorrection",
        "title": "РФС, замена Торпедо на Оренбург в РПЛ, 11.07.2025",
        "url": "https://www.rfs.ru/news/222692",
        "kind": "primary"
      },
      {
        "id": "khl",
        "title": "КХЛ, архив сезона 2024/25",
        "url": "https://history.khl.ru/2024_25.html",
        "kind": "primary"
      },
      {
        "id": "khlHistory",
        "title": "КХЛ, история и названия клубов",
        "url": "https://kids.khl.ru/guide/evolyutsiya-nazvaniy-klubov-kkhl-ot-tsska-do-shankhayskikh-drakonov/",
        "kind": "primary"
      },
      {
        "id": "vhl",
        "title": "ВХЛ, клубы",
        "url": "https://www.vhlru.ru/teams/",
        "kind": "primary"
      },
      {
        "id": "rfb",
        "title": "РФБ, мужская Суперлига, архив сезона 2024/25",
        "url": "https://irkut.russiabasket.ru/competitions",
        "kind": "primary"
      },
      {
        "id": "vtb",
        "title": "УНИКС, утверждённый состав Единой лиги 2025/26",
        "url": "https://www.unics.ru/eng/news/team-news/?id=vtb-united-league-approves-the-list-of-participants-and-the-system-of-the-championship-2025-26",
        "kind": "primary"
      },
      {
        "id": "volley",
        "title": "Белогорье, состав Суперлиги 2025/26",
        "url": "https://belogorievolley.ru/media/20250424_superliga_2026_sformirovana/",
        "kind": "primary"
      },
      {
        "id": "handball",
        "title": "ФГР, календарь и команды мужской Суперлиги 2026/27",
        "url": "https://rushandball.ru/publications/30658/kalendar-muzhskoj-superligi",
        "kind": "primary"
      },
      {
        "id": "handball2016",
        "title": "ФГР, регламент 2016 года, мужские и женские клубы",
        "url": "https://rushandball.ru/files/docs/proekt_regulation_russia2016.pdf",
        "kind": "primary"
      },
      {
        "id": "academy",
        "title": "Зенит, история школы Смена / академии",
        "url": "https://fc-zenit.ru/academy/academy_news/2025-05-27-gazprom-akademii-zenita-57-let.htm",
        "kind": "primary"
      }
    ],
    "notes": [
      "Отдельное имя sportExt: существующий RL.DATA.sport из careers.js не перезаписывается.",
      "Репрезентативный список российских клубов всех запрошенных уровней, не полный реестр всех составов. Принадлежность к лиге верна только для явно указанного сезона.",
      "Город — место клуба в указанном снимке; не переносить на всю историю. Год основания относится к команде/проекту, не всегда к текущему юридическому лицу.",
      "Футбол 2025/26 учтён с исправлением РФС от 11.07.2025: Оренбург в РПЛ, Торпедо в Первой лиге.",
      "Для хоккея часть данных — 2024/25, гандбол мужчины — 2026/27, женщины — 2015/16. Это не единый текущий состав 2026 года.",
      "Зарплаты ВСЕ [~]: условные диапазоны месячной суммы до налогов без премий; не средняя, медиана или данные контрактов конкретных людей.",
      "1998–2025 — оценочная модель, после 2025 — сценарий. Рубли после деноминации. До 1998 номинальные суммы не заданы: нельзя смешивать советские, старые и новые рубли.",
      "До появления конкретной лиги её ряд зарплат означает уровень соревнований, а не существование бренда лиги в прошлом.",
      "Школы — реальные примеры, места и возраст набора не гарантированы. Зарплата воспитаннику не обещается; в МХЛ ноль может означать отсутствие профессионального контракта.",
      "Будущие периоды существования и зарплаты нельзя выдавать за установленные факты."
    ]
  },
  "clubs": [
    {
      "id": "club_001",
      "sport": "football",
      "name": "Краснодар",
      "city": "Краснодар",
      "country": "RU",
      "sex": "m",
      "foundedYear": 2008,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "rpl",
          "season": "2025/26",
          "sourceId": "rfsCorrection"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfsCorrection"
      ]
    },
    {
      "id": "club_002",
      "sport": "football",
      "name": "Зенит",
      "city": "Санкт-Петербург",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1925,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "rpl",
          "season": "2025/26",
          "sourceId": "rfsCorrection"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfsCorrection"
      ]
    },
    {
      "id": "club_003",
      "sport": "football",
      "name": "ЦСКА",
      "city": "Москва",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1911,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "rpl",
          "season": "2025/26",
          "sourceId": "rfsCorrection"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfsCorrection"
      ]
    },
    {
      "id": "club_004",
      "sport": "football",
      "name": "Спартак",
      "city": "Москва",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1922,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "rpl",
          "season": "2025/26",
          "sourceId": "rfsCorrection"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfsCorrection"
      ]
    },
    {
      "id": "club_005",
      "sport": "football",
      "name": "Динамо",
      "city": "Москва",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1923,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "rpl",
          "season": "2025/26",
          "sourceId": "rfsCorrection"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfsCorrection"
      ]
    },
    {
      "id": "club_006",
      "sport": "football",
      "name": "Локомотив",
      "city": "Москва",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1922,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "rpl",
          "season": "2025/26",
          "sourceId": "rfsCorrection"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfsCorrection"
      ]
    },
    {
      "id": "club_007",
      "sport": "football",
      "name": "Рубин",
      "city": "Казань",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1958,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "rpl",
          "season": "2025/26",
          "sourceId": "rfsCorrection"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfsCorrection"
      ]
    },
    {
      "id": "club_008",
      "sport": "football",
      "name": "Ростов",
      "city": "Ростов-на-Дону",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1930,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "rpl",
          "season": "2025/26",
          "sourceId": "rfsCorrection"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfsCorrection"
      ]
    },
    {
      "id": "club_009",
      "sport": "football",
      "name": "Акрон",
      "city": "Тольятти",
      "country": "RU",
      "sex": "m",
      "foundedYear": 2018,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "rpl",
          "season": "2025/26",
          "sourceId": "rfsCorrection"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfsCorrection"
      ]
    },
    {
      "id": "club_010",
      "sport": "football",
      "name": "Крылья Советов",
      "city": "Самара",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1942,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "rpl",
          "season": "2025/26",
          "sourceId": "rfsCorrection"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfsCorrection"
      ]
    },
    {
      "id": "club_011",
      "sport": "football",
      "name": "Динамо",
      "city": "Махачкала",
      "country": "RU",
      "sex": "m",
      "foundedYear": 2021,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "rpl",
          "season": "2025/26",
          "sourceId": "rfsCorrection"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfsCorrection"
      ]
    },
    {
      "id": "club_012",
      "sport": "football",
      "name": "Ахмат",
      "city": "Грозный",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1958,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "rpl",
          "season": "2025/26",
          "sourceId": "rfsCorrection"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfsCorrection"
      ]
    },
    {
      "id": "club_013",
      "sport": "football",
      "name": "Балтика",
      "city": "Калининград",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1954,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "rpl",
          "season": "2025/26",
          "sourceId": "rfsCorrection"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfsCorrection"
      ]
    },
    {
      "id": "club_014",
      "sport": "football",
      "name": "Оренбург",
      "city": "Оренбург",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1976,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "rpl",
          "season": "2025/26",
          "sourceId": "rfsCorrection"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfsCorrection"
      ]
    },
    {
      "id": "club_015",
      "sport": "football",
      "name": "Сочи",
      "city": "Сочи",
      "country": "RU",
      "sex": "m",
      "foundedYear": 2018,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "rpl",
          "season": "2025/26",
          "sourceId": "rfsCorrection"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfsCorrection"
      ]
    },
    {
      "id": "club_016",
      "sport": "football",
      "name": "Пари НН",
      "city": "Нижний Новгород",
      "country": "RU",
      "sex": "m",
      "foundedYear": 2015,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "rpl",
          "season": "2025/26",
          "sourceId": "rfsCorrection"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfsCorrection"
      ]
    },
    {
      "id": "club_017",
      "sport": "football",
      "name": "Торпедо",
      "city": "Москва",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1924,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "fnl",
          "season": "2025/26",
          "sourceId": "rfs2025"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfs2025"
      ]
    },
    {
      "id": "club_018",
      "sport": "football",
      "name": "Факел",
      "city": "Воронеж",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1947,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "fnl",
          "season": "2025/26",
          "sourceId": "rfs2025"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfs2025"
      ]
    },
    {
      "id": "club_019",
      "sport": "football",
      "name": "Арсенал",
      "city": "Тула",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1946,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "fnl",
          "season": "2025/26",
          "sourceId": "rfs2025"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfs2025"
      ]
    },
    {
      "id": "club_020",
      "sport": "football",
      "name": "Енисей",
      "city": "Красноярск",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1937,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "fnl",
          "season": "2025/26",
          "sourceId": "rfs2025"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfs2025"
      ]
    },
    {
      "id": "club_021",
      "sport": "football",
      "name": "КАМАЗ",
      "city": "Набережные Челны",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1981,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "fnl",
          "season": "2025/26",
          "sourceId": "rfs2025"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfs2025"
      ]
    },
    {
      "id": "club_022",
      "sport": "football",
      "name": "Нефтехимик",
      "city": "Нижнекамск",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1991,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "fnl",
          "season": "2025/26",
          "sourceId": "rfs2025"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfs2025"
      ]
    },
    {
      "id": "club_023",
      "sport": "football",
      "name": "Родина",
      "city": "Москва",
      "country": "RU",
      "sex": "m",
      "foundedYear": 2015,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "fnl",
          "season": "2025/26",
          "sourceId": "rfs2025"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfs2025"
      ]
    },
    {
      "id": "club_024",
      "sport": "football",
      "name": "Ротор",
      "city": "Волгоград",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1929,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "fnl",
          "season": "2025/26",
          "sourceId": "rfs2025"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfs2025"
      ]
    },
    {
      "id": "club_025",
      "sport": "football",
      "name": "СКА-Хабаровск",
      "city": "Хабаровск",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1946,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "fnl",
          "season": "2025/26",
          "sourceId": "rfs2025"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfs2025"
      ]
    },
    {
      "id": "club_026",
      "sport": "football",
      "name": "Урал",
      "city": "Екатеринбург",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1930,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "fnl",
          "season": "2025/26",
          "sourceId": "rfs2025"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfs2025"
      ]
    },
    {
      "id": "club_027",
      "sport": "football",
      "name": "Уфа",
      "city": "Уфа",
      "country": "RU",
      "sex": "m",
      "foundedYear": 2010,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "fnl",
          "season": "2025/26",
          "sourceId": "rfs2025"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfs2025"
      ]
    },
    {
      "id": "club_028",
      "sport": "football",
      "name": "Чайка",
      "city": "Песчанокопское",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1997,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "fnl",
          "season": "2025/26",
          "sourceId": "rfs2025"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfs2025"
      ]
    },
    {
      "id": "club_029",
      "sport": "football",
      "name": "Черноморец",
      "city": "Новороссийск",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1907,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "fnl",
          "season": "2025/26",
          "sourceId": "rfs2025"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfs2025"
      ]
    },
    {
      "id": "club_030",
      "sport": "football",
      "name": "Шинник",
      "city": "Ярославль",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1957,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "fnl",
          "season": "2025/26",
          "sourceId": "rfs2025"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfs2025"
      ]
    },
    {
      "id": "club_031",
      "sport": "football",
      "name": "Спартак",
      "city": "Кострома",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1959,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "fnl",
          "season": "2025/26",
          "sourceId": "rfs2025"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfs2025"
      ]
    },
    {
      "id": "club_032",
      "sport": "football",
      "name": "Волга",
      "city": "Ульяновск",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1947,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "fnl",
          "season": "2025/26",
          "sourceId": "rfs2025"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfs2025"
      ]
    },
    {
      "id": "club_033",
      "sport": "football",
      "name": "Челябинск",
      "city": "Челябинск",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1977,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "fnl",
          "season": "2025/26",
          "sourceId": "rfs2025"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfs2025"
      ]
    },
    {
      "id": "club_034",
      "sport": "football",
      "name": "Сокол",
      "city": "Саратов",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1946,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "fnl",
          "season": "2025/26",
          "sourceId": "rfs2025"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfs2025"
      ]
    },
    {
      "id": "club_035",
      "sport": "football",
      "name": "Велес",
      "city": "Подольск",
      "country": "RU",
      "sex": "m",
      "foundedYear": 2016,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "second_a",
          "season": "2025/26",
          "sourceId": "rfs2025"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfs2025"
      ]
    },
    {
      "id": "club_036",
      "sport": "football",
      "name": "Динамо",
      "city": "Владивосток",
      "country": "RU",
      "sex": "m",
      "foundedYear": 2021,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "second_a",
          "season": "2025/26",
          "sourceId": "rfs2025"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfs2025"
      ]
    },
    {
      "id": "club_037",
      "sport": "football",
      "name": "Динамо",
      "city": "Киров",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1923,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "second_a",
          "season": "2025/26",
          "sourceId": "rfs2025"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfs2025"
      ]
    },
    {
      "id": "club_038",
      "sport": "football",
      "name": "Иртыш",
      "city": "Омск",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1946,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "second_a",
          "season": "2025/26",
          "sourceId": "rfs2025"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfs2025"
      ]
    },
    {
      "id": "club_039",
      "sport": "football",
      "name": "Калуга",
      "city": "Калуга",
      "country": "RU",
      "sex": "m",
      "foundedYear": 2009,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "second_a",
          "season": "2025/26",
          "sourceId": "rfs2025"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfs2025"
      ]
    },
    {
      "id": "club_040",
      "sport": "football",
      "name": "Машук-КМВ",
      "city": "Пятигорск",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1936,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "second_a",
          "season": "2025/26",
          "sourceId": "rfs2025"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfs2025"
      ]
    },
    {
      "id": "club_041",
      "sport": "football",
      "name": "Ленинградец",
      "city": "Ленинградская область",
      "country": "RU",
      "sex": "m",
      "foundedYear": 2018,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "second_a",
          "season": "2025/26",
          "sourceId": "rfs2025"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfs2025"
      ]
    },
    {
      "id": "club_042",
      "sport": "football",
      "name": "Муром",
      "city": "Муром",
      "country": "RU",
      "sex": "m",
      "foundedYear": 2014,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "second_a",
          "season": "2025/26",
          "sourceId": "rfs2025"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfs2025"
      ]
    },
    {
      "id": "club_043",
      "sport": "football",
      "name": "Сибирь",
      "city": "Новосибирск",
      "country": "RU",
      "sex": "m",
      "foundedYear": 2019,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "second_a",
          "season": "2025/26",
          "sourceId": "rfs2025"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfs2025"
      ]
    },
    {
      "id": "club_044",
      "sport": "football",
      "name": "Торпедо",
      "city": "Миасс",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1942,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "second_a",
          "season": "2025/26",
          "sourceId": "rfs2025"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfs2025"
      ]
    },
    {
      "id": "club_045",
      "sport": "football",
      "name": "Текстильщик",
      "city": "Иваново",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1937,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "second_a",
          "season": "2025/26",
          "sourceId": "rfs2025"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfs2025"
      ]
    },
    {
      "id": "club_046",
      "sport": "football",
      "name": "Волгарь",
      "city": "Астрахань",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1960,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "second_a",
          "season": "2025/26",
          "sourceId": "rfs2025"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfs2025"
      ]
    },
    {
      "id": "club_047",
      "sport": "football",
      "name": "Алания",
      "city": "Владикавказ",
      "country": "RU",
      "sex": "m",
      "foundedYear": 2019,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "second_a",
          "season": "2025/26",
          "sourceId": "rfs2025"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfs2025"
      ]
    },
    {
      "id": "club_048",
      "sport": "football",
      "name": "Тюмень",
      "city": "Тюмень",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1961,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "second_a",
          "season": "2025/26",
          "sourceId": "rfs2025"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfs2025"
      ]
    },
    {
      "id": "club_049",
      "sport": "football",
      "name": "Ангушт",
      "city": "Назрань",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1993,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "second_b",
          "season": "2025/26",
          "sourceId": "rfs2025"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfs2025"
      ]
    },
    {
      "id": "club_050",
      "sport": "football",
      "name": "Динамо",
      "city": "Ставрополь",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1924,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "second_b",
          "season": "2025/26",
          "sourceId": "rfs2025"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfs2025"
      ]
    },
    {
      "id": "club_051",
      "sport": "football",
      "name": "Дружба",
      "city": "Майкоп",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1963,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "second_b",
          "season": "2025/26",
          "sourceId": "rfs2025"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfs2025"
      ]
    },
    {
      "id": "club_052",
      "sport": "football",
      "name": "Спартак",
      "city": "Нальчик",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1935,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "second_b",
          "season": "2025/26",
          "sourceId": "rfs2025"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfs2025"
      ]
    },
    {
      "id": "club_053",
      "sport": "football",
      "name": "Динамо",
      "city": "Вологда",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1926,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "second_b",
          "season": "2025/26",
          "sourceId": "rfs2025"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfs2025"
      ]
    },
    {
      "id": "club_054",
      "sport": "football",
      "name": "Торпедо",
      "city": "Владимир",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1959,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "second_b",
          "season": "2025/26",
          "sourceId": "rfs2025"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfs2025"
      ]
    },
    {
      "id": "club_055",
      "sport": "football",
      "name": "Чертаново",
      "city": "Москва",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1993,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "second_b",
          "season": "2025/26",
          "sourceId": "rfs2025"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfs2025"
      ]
    },
    {
      "id": "club_056",
      "sport": "football",
      "name": "Динамо",
      "city": "Брянск",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1931,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "second_b",
          "season": "2025/26",
          "sourceId": "rfs2025"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfs2025"
      ]
    },
    {
      "id": "club_057",
      "sport": "football",
      "name": "Зенит",
      "city": "Пенза",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1918,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "second_b",
          "season": "2025/26",
          "sourceId": "rfs2025"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfs2025"
      ]
    },
    {
      "id": "club_058",
      "sport": "football",
      "name": "Знамя Труда",
      "city": "Орехово-Зуево",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1909,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "second_b",
          "season": "2025/26",
          "sourceId": "rfs2025"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfs2025"
      ]
    },
    {
      "id": "club_059",
      "sport": "football",
      "name": "Металлург",
      "city": "Липецк",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1957,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "second_b",
          "season": "2025/26",
          "sourceId": "rfs2025"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfs2025"
      ]
    },
    {
      "id": "club_060",
      "sport": "football",
      "name": "Салют",
      "city": "Белгород",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1960,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "second_b",
          "season": "2025/26",
          "sourceId": "rfs2025"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfs2025"
      ]
    },
    {
      "id": "club_061",
      "sport": "football",
      "name": "Динамо",
      "city": "Барнаул",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1957,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "second_b",
          "season": "2025/26",
          "sourceId": "rfs2025"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfs2025"
      ]
    },
    {
      "id": "club_062",
      "sport": "football",
      "name": "Носта",
      "city": "Новотроицк",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1991,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "second_b",
          "season": "2025/26",
          "sourceId": "rfs2025"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfs2025"
      ]
    },
    {
      "id": "club_063",
      "sport": "football",
      "name": "Химик",
      "city": "Дзержинск",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1946,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "second_b",
          "season": "2025/26",
          "sourceId": "rfs2025"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfs2025"
      ]
    },
    {
      "id": "club_064",
      "sport": "hockey",
      "name": "Авангард",
      "city": "Омск",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1950,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "khl",
          "season": "2024/25",
          "sourceId": "khl"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "khl"
      ]
    },
    {
      "id": "club_065",
      "sport": "hockey",
      "name": "Автомобилист",
      "city": "Екатеринбург",
      "country": "RU",
      "sex": "m",
      "foundedYear": 2006,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "khl",
          "season": "2024/25",
          "sourceId": "khl"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "khl"
      ]
    },
    {
      "id": "club_066",
      "sport": "hockey",
      "name": "Адмирал",
      "city": "Владивосток",
      "country": "RU",
      "sex": "m",
      "foundedYear": 2013,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "khl",
          "season": "2024/25",
          "sourceId": "khl"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "khl"
      ]
    },
    {
      "id": "club_067",
      "sport": "hockey",
      "name": "Ак Барс",
      "city": "Казань",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1956,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "khl",
          "season": "2024/25",
          "sourceId": "khl"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "khl"
      ]
    },
    {
      "id": "club_068",
      "sport": "hockey",
      "name": "Амур",
      "city": "Хабаровск",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1966,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "khl",
          "season": "2024/25",
          "sourceId": "khl"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "khl"
      ]
    },
    {
      "id": "club_069",
      "sport": "hockey",
      "name": "Витязь",
      "city": "Балашиха",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1996,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "khl",
          "season": "2024/25",
          "sourceId": "khl"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "khl"
      ]
    },
    {
      "id": "club_070",
      "sport": "hockey",
      "name": "Динамо",
      "city": "Москва",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1946,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "khl",
          "season": "2024/25",
          "sourceId": "khl"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "khl"
      ]
    },
    {
      "id": "club_071",
      "sport": "hockey",
      "name": "Лада",
      "city": "Тольятти",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1976,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "khl",
          "season": "2024/25",
          "sourceId": "khl"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "khl"
      ]
    },
    {
      "id": "club_072",
      "sport": "hockey",
      "name": "Локомотив",
      "city": "Ярославль",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1959,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "khl",
          "season": "2024/25",
          "sourceId": "khl"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "khl"
      ]
    },
    {
      "id": "club_073",
      "sport": "hockey",
      "name": "Металлург",
      "city": "Магнитогорск",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1955,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "khl",
          "season": "2024/25",
          "sourceId": "khl"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "khl"
      ]
    },
    {
      "id": "club_074",
      "sport": "hockey",
      "name": "Нефтехимик",
      "city": "Нижнекамск",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1968,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "khl",
          "season": "2024/25",
          "sourceId": "khl"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "khl"
      ]
    },
    {
      "id": "club_075",
      "sport": "hockey",
      "name": "Салават Юлаев",
      "city": "Уфа",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1961,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "khl",
          "season": "2024/25",
          "sourceId": "khl"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "khl"
      ]
    },
    {
      "id": "club_076",
      "sport": "hockey",
      "name": "Северсталь",
      "city": "Череповец",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1955,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "khl",
          "season": "2024/25",
          "sourceId": "khl"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "khl"
      ]
    },
    {
      "id": "club_077",
      "sport": "hockey",
      "name": "Сибирь",
      "city": "Новосибирск",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1962,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "khl",
          "season": "2024/25",
          "sourceId": "khl"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "khl"
      ]
    },
    {
      "id": "club_078",
      "sport": "hockey",
      "name": "СКА",
      "city": "Санкт-Петербург",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1946,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "khl",
          "season": "2024/25",
          "sourceId": "khl"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "khl"
      ]
    },
    {
      "id": "club_079",
      "sport": "hockey",
      "name": "Сочи",
      "city": "Сочи",
      "country": "RU",
      "sex": "m",
      "foundedYear": 2014,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "khl",
          "season": "2024/25",
          "sourceId": "khl"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "khl"
      ]
    },
    {
      "id": "club_080",
      "sport": "hockey",
      "name": "Спартак",
      "city": "Москва",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1946,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "khl",
          "season": "2024/25",
          "sourceId": "khl"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "khl"
      ]
    },
    {
      "id": "club_081",
      "sport": "hockey",
      "name": "Торпедо",
      "city": "Нижний Новгород",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1946,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "khl",
          "season": "2024/25",
          "sourceId": "khl"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "khl"
      ]
    },
    {
      "id": "club_082",
      "sport": "hockey",
      "name": "Трактор",
      "city": "Челябинск",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1947,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "khl",
          "season": "2024/25",
          "sourceId": "khl"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "khl"
      ]
    },
    {
      "id": "club_083",
      "sport": "hockey",
      "name": "ЦСКА",
      "city": "Москва",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1946,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "khl",
          "season": "2024/25",
          "sourceId": "khl"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "khl"
      ]
    },
    {
      "id": "club_084",
      "sport": "hockey",
      "name": "Рубин",
      "city": "Тюмень",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1959,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "vhl",
          "season": "2025/26",
          "sourceId": "vhl"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "vhl"
      ]
    },
    {
      "id": "club_085",
      "sport": "hockey",
      "name": "Югра",
      "city": "Ханты-Мансийск",
      "country": "RU",
      "sex": "m",
      "foundedYear": 2006,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "vhl",
          "season": "2025/26",
          "sourceId": "vhl"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "vhl"
      ]
    },
    {
      "id": "club_086",
      "sport": "hockey",
      "name": "Нефтяник",
      "city": "Альметьевск",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1965,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "vhl",
          "season": "2025/26",
          "sourceId": "vhl"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "vhl"
      ]
    },
    {
      "id": "club_087",
      "sport": "hockey",
      "name": "Сокол",
      "city": "Красноярск",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1977,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "vhl",
          "season": "2025/26",
          "sourceId": "vhl"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "vhl"
      ]
    },
    {
      "id": "club_088",
      "sport": "hockey",
      "name": "Ермак",
      "city": "Ангарск",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1959,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "vhl",
          "season": "2022/23",
          "sourceId": "vhl"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "vhl"
      ]
    },
    {
      "id": "club_089",
      "sport": "hockey",
      "name": "Ижсталь",
      "city": "Ижевск",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1958,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "vhl",
          "season": "2025/26",
          "sourceId": "vhl"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "vhl"
      ]
    },
    {
      "id": "club_090",
      "sport": "hockey",
      "name": "Химик",
      "city": "Воскресенск",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1953,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "vhl",
          "season": "2025/26",
          "sourceId": "vhl"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "vhl"
      ]
    },
    {
      "id": "club_091",
      "sport": "hockey",
      "name": "Торос",
      "city": "Нефтекамск",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1988,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "vhl",
          "season": "2025/26",
          "sourceId": "vhl"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "vhl"
      ]
    },
    {
      "id": "club_092",
      "sport": "hockey",
      "name": "Челмет",
      "city": "Челябинск",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1948,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "vhl",
          "season": "2025/26",
          "sourceId": "vhl"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "vhl"
      ]
    },
    {
      "id": "club_093",
      "sport": "hockey",
      "name": "Металлург",
      "city": "Новокузнецк",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1949,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "vhl",
          "season": "2025/26",
          "sourceId": "vhl"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "vhl"
      ]
    },
    {
      "id": "club_094",
      "sport": "hockey",
      "name": "Молот",
      "city": "Пермь",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1948,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "vhl",
          "season": "2025/26",
          "sourceId": "vhl"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "vhl"
      ]
    },
    {
      "id": "club_095",
      "sport": "hockey",
      "name": "Дизель",
      "city": "Пенза",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1955,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "vhl",
          "season": "2025/26",
          "sourceId": "vhl"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "vhl"
      ]
    },
    {
      "id": "club_096",
      "sport": "hockey",
      "name": "Локо",
      "city": "Ярославль",
      "country": "RU",
      "sex": "m",
      "foundedYear": 2009,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "mhl",
          "season": "2024/25",
          "sourceId": "khl"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "khl"
      ]
    },
    {
      "id": "club_097",
      "sport": "hockey",
      "name": "Красная Армия",
      "city": "Москва",
      "country": "RU",
      "sex": "m",
      "foundedYear": 2009,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "mhl",
          "season": "2024/25",
          "sourceId": "khl"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "khl"
      ]
    },
    {
      "id": "club_098",
      "sport": "hockey",
      "name": "СКА-1946",
      "city": "Санкт-Петербург",
      "country": "RU",
      "sex": "m",
      "foundedYear": 2009,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "mhl",
          "season": "2024/25",
          "sourceId": "khl"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "khl"
      ]
    },
    {
      "id": "club_099",
      "sport": "hockey",
      "name": "Чайка",
      "city": "Нижний Новгород",
      "country": "RU",
      "sex": "m",
      "foundedYear": 2009,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "mhl",
          "season": "2024/25",
          "sourceId": "khl"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "khl"
      ]
    },
    {
      "id": "club_100",
      "sport": "hockey",
      "name": "Омские Ястребы",
      "city": "Омск",
      "country": "RU",
      "sex": "m",
      "foundedYear": 2009,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "mhl",
          "season": "2024/25",
          "sourceId": "khl"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "khl"
      ]
    },
    {
      "id": "club_101",
      "sport": "hockey",
      "name": "Белые Медведи",
      "city": "Челябинск",
      "country": "RU",
      "sex": "m",
      "foundedYear": 2009,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "mhl",
          "season": "2024/25",
          "sourceId": "khl"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "khl"
      ]
    },
    {
      "id": "club_102",
      "sport": "hockey",
      "name": "Толпар",
      "city": "Уфа",
      "country": "RU",
      "sex": "m",
      "foundedYear": 2009,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "mhl",
          "season": "2024/25",
          "sourceId": "khl"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "khl"
      ]
    },
    {
      "id": "club_103",
      "sport": "hockey",
      "name": "МХК Динамо",
      "city": "Москва",
      "country": "RU",
      "sex": "m",
      "foundedYear": 2009,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "mhl",
          "season": "2024/25",
          "sourceId": "khl"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "khl"
      ]
    },
    {
      "id": "club_104",
      "sport": "basketball",
      "name": "ЦСКА",
      "city": "Москва",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1923,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "vtb",
          "season": "2025/26",
          "sourceId": "vtb"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "vtb"
      ]
    },
    {
      "id": "club_105",
      "sport": "basketball",
      "name": "Зенит",
      "city": "Санкт-Петербург",
      "country": "RU",
      "sex": "m",
      "foundedYear": 2014,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "vtb",
          "season": "2025/26",
          "sourceId": "vtb"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "vtb"
      ]
    },
    {
      "id": "club_106",
      "sport": "basketball",
      "name": "УНИКС",
      "city": "Казань",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1991,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "vtb",
          "season": "2025/26",
          "sourceId": "vtb"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "vtb"
      ]
    },
    {
      "id": "club_107",
      "sport": "basketball",
      "name": "Локомотив-Кубань",
      "city": "Краснодар",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1946,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "vtb",
          "season": "2025/26",
          "sourceId": "vtb"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "vtb"
      ]
    },
    {
      "id": "club_108",
      "sport": "basketball",
      "name": "Пари Нижний Новгород",
      "city": "Нижний Новгород",
      "country": "RU",
      "sex": "m",
      "foundedYear": 2000,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "vtb",
          "season": "2025/26",
          "sourceId": "vtb"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "vtb"
      ]
    },
    {
      "id": "club_109",
      "sport": "basketball",
      "name": "ПАРМА",
      "city": "Пермь",
      "country": "RU",
      "sex": "m",
      "foundedYear": 2012,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "vtb",
          "season": "2025/26",
          "sourceId": "vtb"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "vtb"
      ]
    },
    {
      "id": "club_110",
      "sport": "basketball",
      "name": "Автодор",
      "city": "Саратов",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1960,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "vtb",
          "season": "2025/26",
          "sourceId": "vtb"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "vtb"
      ]
    },
    {
      "id": "club_111",
      "sport": "basketball",
      "name": "Енисей",
      "city": "Красноярск",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1981,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "vtb",
          "season": "2025/26",
          "sourceId": "vtb"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "vtb"
      ]
    },
    {
      "id": "club_112",
      "sport": "basketball",
      "name": "Самара",
      "city": "Самара",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1976,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "vtb",
          "season": "2025/26",
          "sourceId": "vtb"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "vtb"
      ]
    },
    {
      "id": "club_113",
      "sport": "basketball",
      "name": "МБА-МАИ",
      "city": "Москва",
      "country": "RU",
      "sex": "m",
      "foundedYear": 2013,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "vtb",
          "season": "2025/26",
          "sourceId": "vtb"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "vtb"
      ]
    },
    {
      "id": "club_114",
      "sport": "basketball",
      "name": "Уралмаш",
      "city": "Екатеринбург",
      "country": "RU",
      "sex": "m",
      "foundedYear": 2015,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "vtb",
          "season": "2025/26",
          "sourceId": "vtb"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "vtb"
      ]
    },
    {
      "id": "club_115",
      "sport": "basketball",
      "name": "Темп-СУМЗ",
      "city": "Ревда",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1996,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "superleague",
          "season": "2024/25",
          "sourceId": "rfb"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfb"
      ]
    },
    {
      "id": "club_116",
      "sport": "basketball",
      "name": "Динамо",
      "city": "Владивосток",
      "country": "RU",
      "sex": "m",
      "foundedYear": 2021,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "superleague",
          "season": "2024/25",
          "sourceId": "rfb"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfb"
      ]
    },
    {
      "id": "club_117",
      "sport": "basketball",
      "name": "Новосибирск",
      "city": "Новосибирск",
      "country": "RU",
      "sex": "m",
      "foundedYear": 2011,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "superleague",
          "season": "2024/25",
          "sourceId": "rfb"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfb"
      ]
    },
    {
      "id": "club_118",
      "sport": "basketball",
      "name": "Иркут",
      "city": "Иркутск",
      "country": "RU",
      "sex": "m",
      "foundedYear": 2004,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "superleague",
          "season": "2024/25",
          "sourceId": "rfb"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfb"
      ]
    },
    {
      "id": "club_119",
      "sport": "basketball",
      "name": "Химки",
      "city": "Химки",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1997,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "superleague",
          "season": "2024/25",
          "sourceId": "rfb"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfb"
      ]
    },
    {
      "id": "club_120",
      "sport": "basketball",
      "name": "Купол-Родники",
      "city": "Ижевск",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1999,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "superleague",
          "season": "2024/25",
          "sourceId": "rfb"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfb"
      ]
    },
    {
      "id": "club_121",
      "sport": "basketball",
      "name": "Университет-Югра",
      "city": "Сургут",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1974,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "superleague",
          "season": "2024/25",
          "sourceId": "rfb"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "rfb"
      ]
    },
    {
      "id": "club_122",
      "sport": "volleyball",
      "name": "Зенит-Казань",
      "city": "Казань",
      "country": "RU",
      "sex": "m",
      "foundedYear": 2000,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "superleague_m",
          "season": "2025/26",
          "sourceId": "volley"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "volley"
      ]
    },
    {
      "id": "club_123",
      "sport": "volleyball",
      "name": "Зенит",
      "city": "Санкт-Петербург",
      "country": "RU",
      "sex": "m",
      "foundedYear": 2017,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "superleague_m",
          "season": "2025/26",
          "sourceId": "volley"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "volley"
      ]
    },
    {
      "id": "club_124",
      "sport": "volleyball",
      "name": "Белогорье",
      "city": "Белгород",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1976,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "superleague_m",
          "season": "2025/26",
          "sourceId": "volley"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "volley"
      ]
    },
    {
      "id": "club_125",
      "sport": "volleyball",
      "name": "Динамо-ЛО",
      "city": "Сосновый Бор",
      "country": "RU",
      "sex": "m",
      "foundedYear": 2004,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "superleague_m",
          "season": "2025/26",
          "sourceId": "volley"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "volley"
      ]
    },
    {
      "id": "club_126",
      "sport": "volleyball",
      "name": "Динамо",
      "city": "Москва",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1926,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "superleague_m",
          "season": "2025/26",
          "sourceId": "volley"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "volley"
      ]
    },
    {
      "id": "club_127",
      "sport": "volleyball",
      "name": "Локомотив",
      "city": "Новосибирск",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1977,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "superleague_m",
          "season": "2025/26",
          "sourceId": "volley"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "volley"
      ]
    },
    {
      "id": "club_128",
      "sport": "volleyball",
      "name": "Динамо-Урал",
      "city": "Уфа",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1977,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "superleague_m",
          "season": "2025/26",
          "sourceId": "volley"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "volley"
      ]
    },
    {
      "id": "club_129",
      "sport": "volleyball",
      "name": "Кузбасс",
      "city": "Кемерово",
      "country": "RU",
      "sex": "m",
      "foundedYear": 2008,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "superleague_m",
          "season": "2025/26",
          "sourceId": "volley"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "volley"
      ]
    },
    {
      "id": "club_130",
      "sport": "volleyball",
      "name": "Енисей",
      "city": "Красноярск",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1993,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "superleague_m",
          "season": "2025/26",
          "sourceId": "volley"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "volley"
      ]
    },
    {
      "id": "club_131",
      "sport": "volleyball",
      "name": "Факел Ямал",
      "city": "Новый Уренгой",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1996,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "superleague_m",
          "season": "2025/26",
          "sourceId": "volley"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "volley"
      ]
    },
    {
      "id": "club_132",
      "sport": "volleyball",
      "name": "Газпром-Югра",
      "city": "Сургут",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1996,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "superleague_m",
          "season": "2025/26",
          "sourceId": "volley"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "volley"
      ]
    },
    {
      "id": "club_133",
      "sport": "volleyball",
      "name": "Нова",
      "city": "Новокуйбышевск",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1993,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "superleague_m",
          "season": "2025/26",
          "sourceId": "volley"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "volley"
      ]
    },
    {
      "id": "club_134",
      "sport": "volleyball",
      "name": "Ярославич",
      "city": "Ярославль",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1988,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "superleague_m",
          "season": "2025/26",
          "sourceId": "volley"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "volley"
      ]
    },
    {
      "id": "club_135",
      "sport": "handball",
      "name": "ЦСКА",
      "city": "Москва",
      "country": "RU",
      "sex": "m",
      "foundedYear": 2017,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "superleague_m",
          "season": "2026/27",
          "sourceId": "handball"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "handball"
      ]
    },
    {
      "id": "club_136",
      "sport": "handball",
      "name": "Зенит",
      "city": "Санкт-Петербург",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1964,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "superleague_m",
          "season": "2026/27",
          "sourceId": "handball"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "handball"
      ]
    },
    {
      "id": "club_137",
      "sport": "handball",
      "name": "Пермские медведи",
      "city": "Пермь",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1999,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "superleague_m",
          "season": "2026/27",
          "sourceId": "handball"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "handball"
      ]
    },
    {
      "id": "club_138",
      "sport": "handball",
      "name": "Чеховские медведи",
      "city": "Чехов",
      "country": "RU",
      "sex": "m",
      "foundedYear": 2001,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "superleague_m",
          "season": "2026/27",
          "sourceId": "handball"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "handball"
      ]
    },
    {
      "id": "club_139",
      "sport": "handball",
      "name": "Динамо-Сунгуль",
      "city": "Снежинск",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1990,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "superleague_m",
          "season": "2026/27",
          "sourceId": "handball"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "handball"
      ]
    },
    {
      "id": "club_140",
      "sport": "handball",
      "name": "Виктор",
      "city": "Ставрополь",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1992,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "superleague_m",
          "season": "2026/27",
          "sourceId": "handball"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "handball"
      ]
    },
    {
      "id": "club_141",
      "sport": "handball",
      "name": "СКИФ",
      "city": "Краснодар",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1963,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "superleague_m",
          "season": "2026/27",
          "sourceId": "handball"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "handball"
      ]
    },
    {
      "id": "club_142",
      "sport": "handball",
      "name": "СГАУ-Саратов",
      "city": "Саратов",
      "country": "RU",
      "sex": "m",
      "foundedYear": 2010,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "superleague_m",
          "season": "2026/27",
          "sourceId": "handball"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "handball"
      ]
    },
    {
      "id": "club_143",
      "sport": "handball",
      "name": "Динамо",
      "city": "Астрахань",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1978,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "superleague_m",
          "season": "2026/27",
          "sourceId": "handball"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "handball"
      ]
    },
    {
      "id": "club_144",
      "sport": "handball",
      "name": "Каустик",
      "city": "Волгоград",
      "country": "RU",
      "sex": "m",
      "foundedYear": 1976,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "superleague_m",
          "season": "2026/27",
          "sourceId": "handball"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "handball"
      ]
    },
    {
      "id": "club_145",
      "sport": "handball",
      "name": "Ростов-Дон",
      "city": "Ростов-на-Дону",
      "country": "RU",
      "sex": "f",
      "foundedYear": 1965,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "superleague_f",
          "season": "2015/16",
          "sourceId": "handball2016"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "handball2016"
      ]
    },
    {
      "id": "club_146",
      "sport": "handball",
      "name": "Лада",
      "city": "Тольятти",
      "country": "RU",
      "sex": "f",
      "foundedYear": 1998,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "superleague_f",
          "season": "2015/16",
          "sourceId": "handball2016"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "handball2016"
      ]
    },
    {
      "id": "club_147",
      "sport": "handball",
      "name": "Астраханочка",
      "city": "Астрахань",
      "country": "RU",
      "sex": "f",
      "foundedYear": 1993,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "superleague_f",
          "season": "2015/16",
          "sourceId": "handball2016"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "handball2016"
      ]
    },
    {
      "id": "club_148",
      "sport": "handball",
      "name": "Звезда",
      "city": "Звенигород",
      "country": "RU",
      "sex": "f",
      "foundedYear": 2004,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "superleague_f",
          "season": "2015/16",
          "sourceId": "handball2016"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "handball2016"
      ]
    },
    {
      "id": "club_149",
      "sport": "handball",
      "name": "Динамо-Синара",
      "city": "Волгоград",
      "country": "RU",
      "sex": "f",
      "foundedYear": 1972,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "superleague_f",
          "season": "2015/16",
          "sourceId": "handball2016"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "handball2016"
      ]
    },
    {
      "id": "club_150",
      "sport": "handball",
      "name": "Кубань",
      "city": "Краснодар",
      "country": "RU",
      "sex": "f",
      "foundedYear": 1973,
      "endedYear": null,
      "existenceNote": "Исторический год основания команды / нынешнего проекта; не гарантия непрерывности юридического лица. null в endedYear означает отсутствие подтверждённого закрытия на дату снимка.",
      "foundedYearQuality": "Справочная дата; для спорной преемственности требуется сверка с историей клуба.",
      "leagueMembership": [
        {
          "league": "superleague_f",
          "season": "2015/16",
          "sourceId": "handball2016"
        }
      ],
      "validOnlyForListedSeasons": true,
      "sourceIds": [
        "handball2016"
      ]
    }
  ],
  "schools": [
    {
      "id": "academy_zenit",
      "name": "Газпром-Академия Зенита имени Д. И. Бесова (ранее Смена)",
      "city": "Санкт-Петербург",
      "sport": "football",
      "foundedYear": 1968,
      "endedYear": null,
      "clubId": "club_002",
      "sourceUrl": "https://fc-zenit.ru/academy/academy_news/2025-05-27-gazprom-akademii-zenita-57-let.htm",
      "ageFrom": 6,
      "ageTo": 18,
      "ageQuality": "[~] типичный возраст, фактические группы набора проверяются отдельно",
      "feesMonthlyRub2025": [
        0,
        8000
      ],
      "feesQuality": "[~] бюджетные места и платные секции; экипировка и поездки отдельно",
      "snapshotYear": 2025
    },
    {
      "id": "academy_krasnodar",
      "name": "Академия ФК Краснодар",
      "city": "Краснодар",
      "sport": "football",
      "foundedYear": 2009,
      "endedYear": null,
      "clubId": "club_001",
      "sourceUrl": "https://fckrasnodar.ru/academy/",
      "ageFrom": 6,
      "ageTo": 18,
      "ageQuality": "[~] типичный возраст, фактические группы набора проверяются отдельно",
      "feesMonthlyRub2025": [
        0,
        8000
      ],
      "feesQuality": "[~] бюджетные места и платные секции; экипировка и поездки отдельно",
      "snapshotYear": 2025
    },
    {
      "id": "academy_spartak",
      "name": "Академия Спартак имени Ф. Ф. Черенкова",
      "city": "Москва",
      "sport": "football",
      "foundedYear": 1934,
      "endedYear": null,
      "clubId": "club_004",
      "sourceUrl": "https://spartak.com/academy/",
      "ageFrom": 6,
      "ageTo": 18,
      "ageQuality": "[~] типичный возраст, фактические группы набора проверяются отдельно",
      "feesMonthlyRub2025": [
        0,
        8000
      ],
      "feesQuality": "[~] бюджетные места и платные секции; экипировка и поездки отдельно",
      "snapshotYear": 2025
    },
    {
      "id": "school_traktor",
      "name": "Спортивная школа Трактор имени В. К. Белоусова",
      "city": "Челябинск",
      "sport": "hockey",
      "foundedYear": 1968,
      "endedYear": null,
      "sourceUrl": "https://hctraktor.org/club/school/",
      "ageFrom": 5,
      "ageTo": 18,
      "ageQuality": "[~] типичный возраст, фактические группы набора проверяются отдельно",
      "feesMonthlyRub2025": [
        0,
        8000
      ],
      "feesQuality": "[~] бюджетные места и платные секции; экипировка и поездки отдельно",
      "snapshotYear": 2025
    },
    {
      "id": "school_cska",
      "name": "Спортивная школа олимпийского резерва ЦСКА по баскетболу",
      "city": "Москва",
      "sport": "basketball",
      "foundedYear": null,
      "endedYear": null,
      "sourceUrl": "https://cska.ru/",
      "ageFrom": 8,
      "ageTo": 18,
      "ageQuality": "[~] типичный возраст, фактические группы набора проверяются отдельно",
      "feesMonthlyRub2025": [
        0,
        8000
      ],
      "feesQuality": "[~] бюджетные места и платные секции; экипировка и поездки отдельно",
      "snapshotYear": 2025
    }
  ],
  "salaries": [
    {
      "sport": "football",
      "level": "rpl",
      "series": [
        {
          "year": 1998,
          "monthlyGrossRubRange": [
            32000,
            560000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 1999,
          "monthlyGrossRubRange": [
            39200,
            685900
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2000,
          "monthlyGrossRubRange": [
            48000,
            840000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2001,
          "monthlyGrossRubRange": [
            56900,
            995100
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2002,
          "monthlyGrossRubRange": [
            67400,
            1178900
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2003,
          "monthlyGrossRubRange": [
            79800,
            1396600
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2004,
          "monthlyGrossRubRange": [
            94500,
            1654500
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2005,
          "monthlyGrossRubRange": [
            112000,
            1960000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2006,
          "monthlyGrossRubRange": [
            128200,
            2243300
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2007,
          "monthlyGrossRubRange": [
            146700,
            2567700
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2008,
          "monthlyGrossRubRange": [
            167900,
            2938900
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2009,
          "monthlyGrossRubRange": [
            192200,
            3363700
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2010,
          "monthlyGrossRubRange": [
            220000,
            3850000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2011,
          "monthlyGrossRubRange": [
            230900,
            4040200
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2012,
          "monthlyGrossRubRange": [
            242300,
            4239900
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2013,
          "monthlyGrossRubRange": [
            254300,
            4449400
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2014,
          "monthlyGrossRubRange": [
            266800,
            4669300
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2015,
          "monthlyGrossRubRange": [
            280000,
            4900000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2016,
          "monthlyGrossRubRange": [
            289000,
            5057500
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2017,
          "monthlyGrossRubRange": [
            298300,
            5220100
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2018,
          "monthlyGrossRubRange": [
            307900,
            5388000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2019,
          "monthlyGrossRubRange": [
            317800,
            5561200
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2020,
          "monthlyGrossRubRange": [
            328000,
            5740000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2021,
          "monthlyGrossRubRange": [
            341300,
            5972400
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2022,
          "monthlyGrossRubRange": [
            355100,
            6214200
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2023,
          "monthlyGrossRubRange": [
            369500,
            6465800
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2024,
          "monthlyGrossRubRange": [
            384400,
            6727600
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2025,
          "monthlyGrossRubRange": [
            400000,
            7000000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2026,
          "monthlyGrossRubRange": [
            420200,
            7354300
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2027,
          "monthlyGrossRubRange": [
            441500,
            7726500
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2028,
          "monthlyGrossRubRange": [
            463900,
            8117500
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2029,
          "monthlyGrossRubRange": [
            487300,
            8528400
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2030,
          "monthlyGrossRubRange": [
            512000,
            8960000
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2031,
          "monthlyGrossRubRange": [
            538000,
            9415300
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2032,
          "monthlyGrossRubRange": [
            565400,
            9893800
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2033,
          "monthlyGrossRubRange": [
            594100,
            10396500
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2034,
          "monthlyGrossRubRange": [
            624300,
            10924800
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2035,
          "monthlyGrossRubRange": [
            656000,
            11480000
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        }
      ]
    },
    {
      "sport": "football",
      "level": "fnl",
      "series": [
        {
          "year": 1998,
          "monthlyGrossRubRange": [
            6400,
            52000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 1999,
          "monthlyGrossRubRange": [
            7800,
            63700
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2000,
          "monthlyGrossRubRange": [
            9600,
            78000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2001,
          "monthlyGrossRubRange": [
            11400,
            92400
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2002,
          "monthlyGrossRubRange": [
            13500,
            109500
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2003,
          "monthlyGrossRubRange": [
            16000,
            129700
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2004,
          "monthlyGrossRubRange": [
            18900,
            153600
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2005,
          "monthlyGrossRubRange": [
            22400,
            182000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2006,
          "monthlyGrossRubRange": [
            25600,
            208300
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2007,
          "monthlyGrossRubRange": [
            29300,
            238400
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2008,
          "monthlyGrossRubRange": [
            33600,
            272900
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2009,
          "monthlyGrossRubRange": [
            38400,
            312300
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2010,
          "monthlyGrossRubRange": [
            44000,
            357500
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2011,
          "monthlyGrossRubRange": [
            46200,
            375200
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2012,
          "monthlyGrossRubRange": [
            48500,
            393700
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2013,
          "monthlyGrossRubRange": [
            50900,
            413200
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2014,
          "monthlyGrossRubRange": [
            53400,
            433600
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2015,
          "monthlyGrossRubRange": [
            56000,
            455000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2016,
          "monthlyGrossRubRange": [
            57800,
            469600
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2017,
          "monthlyGrossRubRange": [
            59700,
            484700
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2018,
          "monthlyGrossRubRange": [
            61600,
            500300
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2019,
          "monthlyGrossRubRange": [
            63600,
            516400
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2020,
          "monthlyGrossRubRange": [
            65600,
            533000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2021,
          "monthlyGrossRubRange": [
            68300,
            554600
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2022,
          "monthlyGrossRubRange": [
            71000,
            577000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2023,
          "monthlyGrossRubRange": [
            73900,
            600400
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2024,
          "monthlyGrossRubRange": [
            76900,
            624700
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2025,
          "monthlyGrossRubRange": [
            80000,
            650000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2026,
          "monthlyGrossRubRange": [
            84000,
            682900
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2027,
          "monthlyGrossRubRange": [
            88300,
            717500
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2028,
          "monthlyGrossRubRange": [
            92800,
            753800
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2029,
          "monthlyGrossRubRange": [
            97500,
            791900
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2030,
          "monthlyGrossRubRange": [
            102400,
            832000
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2031,
          "monthlyGrossRubRange": [
            107600,
            874300
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2032,
          "monthlyGrossRubRange": [
            113100,
            918700
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2033,
          "monthlyGrossRubRange": [
            118800,
            965400
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2034,
          "monthlyGrossRubRange": [
            124900,
            1014400
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2035,
          "monthlyGrossRubRange": [
            131200,
            1066000
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        }
      ]
    },
    {
      "sport": "football",
      "level": "second_a",
      "series": [
        {
          "year": 1998,
          "monthlyGrossRubRange": [
            3600,
            17600
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 1999,
          "monthlyGrossRubRange": [
            4400,
            21600
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2000,
          "monthlyGrossRubRange": [
            5400,
            26400
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2001,
          "monthlyGrossRubRange": [
            6400,
            31300
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2002,
          "monthlyGrossRubRange": [
            7600,
            37100
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2003,
          "monthlyGrossRubRange": [
            9000,
            43900
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2004,
          "monthlyGrossRubRange": [
            10600,
            52000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2005,
          "monthlyGrossRubRange": [
            12600,
            61600
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2006,
          "monthlyGrossRubRange": [
            14400,
            70500
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2007,
          "monthlyGrossRubRange": [
            16500,
            80700
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2008,
          "monthlyGrossRubRange": [
            18900,
            92400
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2009,
          "monthlyGrossRubRange": [
            21600,
            105700
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2010,
          "monthlyGrossRubRange": [
            24800,
            121000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2011,
          "monthlyGrossRubRange": [
            26000,
            127000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2012,
          "monthlyGrossRubRange": [
            27300,
            133300
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2013,
          "monthlyGrossRubRange": [
            28600,
            139800
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2014,
          "monthlyGrossRubRange": [
            30000,
            146700
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2015,
          "monthlyGrossRubRange": [
            31500,
            154000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2016,
          "monthlyGrossRubRange": [
            32500,
            159000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2017,
          "monthlyGrossRubRange": [
            33600,
            164100
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2018,
          "monthlyGrossRubRange": [
            34600,
            169300
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2019,
          "monthlyGrossRubRange": [
            35800,
            174800
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2020,
          "monthlyGrossRubRange": [
            36900,
            180400
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2021,
          "monthlyGrossRubRange": [
            38400,
            187700
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2022,
          "monthlyGrossRubRange": [
            39900,
            195300
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2023,
          "monthlyGrossRubRange": [
            41600,
            203200
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2024,
          "monthlyGrossRubRange": [
            43200,
            211400
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2025,
          "monthlyGrossRubRange": [
            45000,
            220000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2026,
          "monthlyGrossRubRange": [
            47300,
            231100
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2027,
          "monthlyGrossRubRange": [
            49700,
            242800
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2028,
          "monthlyGrossRubRange": [
            52200,
            255100
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2029,
          "monthlyGrossRubRange": [
            54800,
            268000
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2030,
          "monthlyGrossRubRange": [
            57600,
            281600
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2031,
          "monthlyGrossRubRange": [
            60500,
            295900
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2032,
          "monthlyGrossRubRange": [
            63600,
            310900
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2033,
          "monthlyGrossRubRange": [
            66800,
            326700
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2034,
          "monthlyGrossRubRange": [
            70200,
            343400
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2035,
          "monthlyGrossRubRange": [
            73800,
            360800
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        }
      ]
    },
    {
      "sport": "football",
      "level": "second_b",
      "series": [
        {
          "year": 1998,
          "monthlyGrossRubRange": [
            2000,
            9600
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 1999,
          "monthlyGrossRubRange": [
            2400,
            11800
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2000,
          "monthlyGrossRubRange": [
            3000,
            14400
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2001,
          "monthlyGrossRubRange": [
            3600,
            17100
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2002,
          "monthlyGrossRubRange": [
            4200,
            20200
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2003,
          "monthlyGrossRubRange": [
            5000,
            23900
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2004,
          "monthlyGrossRubRange": [
            5900,
            28400
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2005,
          "monthlyGrossRubRange": [
            7000,
            33600
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2006,
          "monthlyGrossRubRange": [
            8000,
            38500
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2007,
          "monthlyGrossRubRange": [
            9200,
            44000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2008,
          "monthlyGrossRubRange": [
            10500,
            50400
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2009,
          "monthlyGrossRubRange": [
            12000,
            57700
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2010,
          "monthlyGrossRubRange": [
            13800,
            66000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2011,
          "monthlyGrossRubRange": [
            14400,
            69300
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2012,
          "monthlyGrossRubRange": [
            15100,
            72700
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2013,
          "monthlyGrossRubRange": [
            15900,
            76300
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2014,
          "monthlyGrossRubRange": [
            16700,
            80000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2015,
          "monthlyGrossRubRange": [
            17500,
            84000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2016,
          "monthlyGrossRubRange": [
            18100,
            86700
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2017,
          "monthlyGrossRubRange": [
            18600,
            89500
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2018,
          "monthlyGrossRubRange": [
            19200,
            92400
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2019,
          "monthlyGrossRubRange": [
            19900,
            95300
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2020,
          "monthlyGrossRubRange": [
            20500,
            98400
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2021,
          "monthlyGrossRubRange": [
            21300,
            102400
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2022,
          "monthlyGrossRubRange": [
            22200,
            106500
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2023,
          "monthlyGrossRubRange": [
            23100,
            110800
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2024,
          "monthlyGrossRubRange": [
            24000,
            115300
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2025,
          "monthlyGrossRubRange": [
            25000,
            120000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2026,
          "monthlyGrossRubRange": [
            26300,
            126100
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2027,
          "monthlyGrossRubRange": [
            27600,
            132500
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2028,
          "monthlyGrossRubRange": [
            29000,
            139200
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2029,
          "monthlyGrossRubRange": [
            30500,
            146200
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2030,
          "monthlyGrossRubRange": [
            32000,
            153600
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2031,
          "monthlyGrossRubRange": [
            33600,
            161400
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2032,
          "monthlyGrossRubRange": [
            35300,
            169600
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2033,
          "monthlyGrossRubRange": [
            37100,
            178200
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2034,
          "monthlyGrossRubRange": [
            39000,
            187300
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2035,
          "monthlyGrossRubRange": [
            41000,
            196800
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        }
      ]
    },
    {
      "sport": "hockey",
      "level": "khl",
      "series": [
        {
          "year": 1998,
          "monthlyGrossRubRange": [
            20000,
            480000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 1999,
          "monthlyGrossRubRange": [
            24500,
            587900
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2000,
          "monthlyGrossRubRange": [
            30000,
            720000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2001,
          "monthlyGrossRubRange": [
            35500,
            853000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2002,
          "monthlyGrossRubRange": [
            42100,
            1010500
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2003,
          "monthlyGrossRubRange": [
            49900,
            1197100
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2004,
          "monthlyGrossRubRange": [
            59100,
            1418100
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2005,
          "monthlyGrossRubRange": [
            70000,
            1680000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2006,
          "monthlyGrossRubRange": [
            80100,
            1922900
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2007,
          "monthlyGrossRubRange": [
            91700,
            2200900
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2008,
          "monthlyGrossRubRange": [
            105000,
            2519000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2009,
          "monthlyGrossRubRange": [
            120100,
            2883200
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2010,
          "monthlyGrossRubRange": [
            137500,
            3300000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2011,
          "monthlyGrossRubRange": [
            144300,
            3463100
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2012,
          "monthlyGrossRubRange": [
            151400,
            3634200
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2013,
          "monthlyGrossRubRange": [
            158900,
            3813800
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2014,
          "monthlyGrossRubRange": [
            166800,
            4002200
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2015,
          "monthlyGrossRubRange": [
            175000,
            4200000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2016,
          "monthlyGrossRubRange": [
            180600,
            4335000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2017,
          "monthlyGrossRubRange": [
            186400,
            4474400
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2018,
          "monthlyGrossRubRange": [
            192400,
            4618300
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2019,
          "monthlyGrossRubRange": [
            198600,
            4766700
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2020,
          "monthlyGrossRubRange": [
            205000,
            4920000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2021,
          "monthlyGrossRubRange": [
            213300,
            5119200
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2022,
          "monthlyGrossRubRange": [
            221900,
            5326500
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2023,
          "monthlyGrossRubRange": [
            230900,
            5542100
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2024,
          "monthlyGrossRubRange": [
            240300,
            5766500
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2025,
          "monthlyGrossRubRange": [
            250000,
            6000000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2026,
          "monthlyGrossRubRange": [
            262700,
            6303700
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2027,
          "monthlyGrossRubRange": [
            275900,
            6622700
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2028,
          "monthlyGrossRubRange": [
            289900,
            6957900
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2029,
          "monthlyGrossRubRange": [
            304600,
            7310000
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2030,
          "monthlyGrossRubRange": [
            320000,
            7680000
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2031,
          "monthlyGrossRubRange": [
            336300,
            8070300
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2032,
          "monthlyGrossRubRange": [
            353300,
            8480400
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2033,
          "monthlyGrossRubRange": [
            371300,
            8911300
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2034,
          "monthlyGrossRubRange": [
            390200,
            9364100
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2035,
          "monthlyGrossRubRange": [
            410000,
            9840000
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        }
      ]
    },
    {
      "sport": "hockey",
      "level": "vhl",
      "series": [
        {
          "year": 1998,
          "monthlyGrossRubRange": [
            4800,
            40000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 1999,
          "monthlyGrossRubRange": [
            5900,
            49000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2000,
          "monthlyGrossRubRange": [
            7200,
            60000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2001,
          "monthlyGrossRubRange": [
            8500,
            71100
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2002,
          "monthlyGrossRubRange": [
            10100,
            84200
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2003,
          "monthlyGrossRubRange": [
            12000,
            99800
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2004,
          "monthlyGrossRubRange": [
            14200,
            118200
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2005,
          "monthlyGrossRubRange": [
            16800,
            140000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2006,
          "monthlyGrossRubRange": [
            19200,
            160200
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2007,
          "monthlyGrossRubRange": [
            22000,
            183400
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2008,
          "monthlyGrossRubRange": [
            25200,
            209900
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2009,
          "monthlyGrossRubRange": [
            28800,
            240300
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2010,
          "monthlyGrossRubRange": [
            33000,
            275000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2011,
          "monthlyGrossRubRange": [
            34600,
            288600
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2012,
          "monthlyGrossRubRange": [
            36300,
            302800
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2013,
          "monthlyGrossRubRange": [
            38100,
            317800
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2014,
          "monthlyGrossRubRange": [
            40000,
            333500
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2015,
          "monthlyGrossRubRange": [
            42000,
            350000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2016,
          "monthlyGrossRubRange": [
            43400,
            361300
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2017,
          "monthlyGrossRubRange": [
            44700,
            372900
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2018,
          "monthlyGrossRubRange": [
            46200,
            384900
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2019,
          "monthlyGrossRubRange": [
            47700,
            397200
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2020,
          "monthlyGrossRubRange": [
            49200,
            410000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2021,
          "monthlyGrossRubRange": [
            51200,
            426600
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2022,
          "monthlyGrossRubRange": [
            53300,
            443900
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2023,
          "monthlyGrossRubRange": [
            55400,
            461800
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2024,
          "monthlyGrossRubRange": [
            57700,
            480500
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2025,
          "monthlyGrossRubRange": [
            60000,
            500000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2026,
          "monthlyGrossRubRange": [
            63000,
            525300
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2027,
          "monthlyGrossRubRange": [
            66200,
            551900
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2028,
          "monthlyGrossRubRange": [
            69600,
            579800
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2029,
          "monthlyGrossRubRange": [
            73100,
            609200
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2030,
          "monthlyGrossRubRange": [
            76800,
            640000
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2031,
          "monthlyGrossRubRange": [
            80700,
            672500
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2032,
          "monthlyGrossRubRange": [
            84800,
            706700
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2033,
          "monthlyGrossRubRange": [
            89100,
            742600
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2034,
          "monthlyGrossRubRange": [
            93600,
            780300
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2035,
          "monthlyGrossRubRange": [
            98400,
            820000
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        }
      ]
    },
    {
      "sport": "hockey",
      "level": "mhl",
      "series": [
        {
          "year": 1998,
          "monthlyGrossRubRange": [
            0,
            8000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 1999,
          "monthlyGrossRubRange": [
            0,
            9800
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2000,
          "monthlyGrossRubRange": [
            0,
            12000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2001,
          "monthlyGrossRubRange": [
            0,
            14200
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2002,
          "monthlyGrossRubRange": [
            0,
            16800
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2003,
          "monthlyGrossRubRange": [
            0,
            20000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2004,
          "monthlyGrossRubRange": [
            0,
            23600
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2005,
          "monthlyGrossRubRange": [
            0,
            28000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2006,
          "monthlyGrossRubRange": [
            0,
            32000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2007,
          "monthlyGrossRubRange": [
            0,
            36700
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2008,
          "monthlyGrossRubRange": [
            0,
            42000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2009,
          "monthlyGrossRubRange": [
            0,
            48100
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2010,
          "monthlyGrossRubRange": [
            0,
            55000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2011,
          "monthlyGrossRubRange": [
            0,
            57700
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2012,
          "monthlyGrossRubRange": [
            0,
            60600
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2013,
          "monthlyGrossRubRange": [
            0,
            63600
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2014,
          "monthlyGrossRubRange": [
            0,
            66700
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2015,
          "monthlyGrossRubRange": [
            0,
            70000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2016,
          "monthlyGrossRubRange": [
            0,
            72300
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2017,
          "monthlyGrossRubRange": [
            0,
            74600
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2018,
          "monthlyGrossRubRange": [
            0,
            77000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2019,
          "monthlyGrossRubRange": [
            0,
            79400
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2020,
          "monthlyGrossRubRange": [
            0,
            82000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2021,
          "monthlyGrossRubRange": [
            0,
            85300
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2022,
          "monthlyGrossRubRange": [
            0,
            88800
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2023,
          "monthlyGrossRubRange": [
            0,
            92400
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2024,
          "monthlyGrossRubRange": [
            0,
            96100
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2025,
          "monthlyGrossRubRange": [
            0,
            100000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2026,
          "monthlyGrossRubRange": [
            0,
            105100
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2027,
          "monthlyGrossRubRange": [
            0,
            110400
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2028,
          "monthlyGrossRubRange": [
            0,
            116000
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2029,
          "monthlyGrossRubRange": [
            0,
            121800
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2030,
          "monthlyGrossRubRange": [
            0,
            128000
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2031,
          "monthlyGrossRubRange": [
            0,
            134500
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2032,
          "monthlyGrossRubRange": [
            0,
            141300
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2033,
          "monthlyGrossRubRange": [
            0,
            148500
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2034,
          "monthlyGrossRubRange": [
            0,
            156100
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2035,
          "monthlyGrossRubRange": [
            0,
            164000
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        }
      ]
    },
    {
      "sport": "basketball",
      "level": "vtb",
      "series": [
        {
          "year": 1998,
          "monthlyGrossRubRange": [
            16000,
            280000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 1999,
          "monthlyGrossRubRange": [
            19600,
            342900
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2000,
          "monthlyGrossRubRange": [
            24000,
            420000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2001,
          "monthlyGrossRubRange": [
            28400,
            497600
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2002,
          "monthlyGrossRubRange": [
            33700,
            589400
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2003,
          "monthlyGrossRubRange": [
            39900,
            698300
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2004,
          "monthlyGrossRubRange": [
            47300,
            827200
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2005,
          "monthlyGrossRubRange": [
            56000,
            980000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2006,
          "monthlyGrossRubRange": [
            64100,
            1121700
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2007,
          "monthlyGrossRubRange": [
            73400,
            1283800
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2008,
          "monthlyGrossRubRange": [
            84000,
            1469400
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2009,
          "monthlyGrossRubRange": [
            96100,
            1681900
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2010,
          "monthlyGrossRubRange": [
            110000,
            1925000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2011,
          "monthlyGrossRubRange": [
            115400,
            2020100
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2012,
          "monthlyGrossRubRange": [
            121100,
            2119900
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2013,
          "monthlyGrossRubRange": [
            127100,
            2224700
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2014,
          "monthlyGrossRubRange": [
            133400,
            2334600
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2015,
          "monthlyGrossRubRange": [
            140000,
            2450000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2016,
          "monthlyGrossRubRange": [
            144500,
            2528800
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2017,
          "monthlyGrossRubRange": [
            149100,
            2610100
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2018,
          "monthlyGrossRubRange": [
            153900,
            2694000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2019,
          "monthlyGrossRubRange": [
            158900,
            2780600
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2020,
          "monthlyGrossRubRange": [
            164000,
            2870000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2021,
          "monthlyGrossRubRange": [
            170600,
            2986200
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2022,
          "monthlyGrossRubRange": [
            177500,
            3107100
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2023,
          "monthlyGrossRubRange": [
            184700,
            3232900
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2024,
          "monthlyGrossRubRange": [
            192200,
            3363800
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2025,
          "monthlyGrossRubRange": [
            200000,
            3500000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2026,
          "monthlyGrossRubRange": [
            210100,
            3677100
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2027,
          "monthlyGrossRubRange": [
            220800,
            3863200
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2028,
          "monthlyGrossRubRange": [
            231900,
            4058800
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2029,
          "monthlyGrossRubRange": [
            243700,
            4264200
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2030,
          "monthlyGrossRubRange": [
            256000,
            4480000
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2031,
          "monthlyGrossRubRange": [
            269000,
            4707700
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2032,
          "monthlyGrossRubRange": [
            282700,
            4946900
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2033,
          "monthlyGrossRubRange": [
            297000,
            5198300
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2034,
          "monthlyGrossRubRange": [
            312100,
            5462400
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2035,
          "monthlyGrossRubRange": [
            328000,
            5740000
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        }
      ]
    },
    {
      "sport": "basketball",
      "level": "superleague",
      "series": [
        {
          "year": 1998,
          "monthlyGrossRubRange": [
            3600,
            24000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 1999,
          "monthlyGrossRubRange": [
            4400,
            29400
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2000,
          "monthlyGrossRubRange": [
            5400,
            36000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2001,
          "monthlyGrossRubRange": [
            6400,
            42600
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2002,
          "monthlyGrossRubRange": [
            7600,
            50500
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2003,
          "monthlyGrossRubRange": [
            9000,
            59900
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2004,
          "monthlyGrossRubRange": [
            10600,
            70900
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2005,
          "monthlyGrossRubRange": [
            12600,
            84000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2006,
          "monthlyGrossRubRange": [
            14400,
            96100
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2007,
          "monthlyGrossRubRange": [
            16500,
            110000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2008,
          "monthlyGrossRubRange": [
            18900,
            126000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2009,
          "monthlyGrossRubRange": [
            21600,
            144200
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2010,
          "monthlyGrossRubRange": [
            24800,
            165000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2011,
          "monthlyGrossRubRange": [
            26000,
            173200
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2012,
          "monthlyGrossRubRange": [
            27300,
            181700
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2013,
          "monthlyGrossRubRange": [
            28600,
            190700
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2014,
          "monthlyGrossRubRange": [
            30000,
            200100
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2015,
          "monthlyGrossRubRange": [
            31500,
            210000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2016,
          "monthlyGrossRubRange": [
            32500,
            216800
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2017,
          "monthlyGrossRubRange": [
            33600,
            223700
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2018,
          "monthlyGrossRubRange": [
            34600,
            230900
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2019,
          "monthlyGrossRubRange": [
            35800,
            238300
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2020,
          "monthlyGrossRubRange": [
            36900,
            246000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2021,
          "monthlyGrossRubRange": [
            38400,
            256000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2022,
          "monthlyGrossRubRange": [
            39900,
            266300
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2023,
          "monthlyGrossRubRange": [
            41600,
            277100
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2024,
          "monthlyGrossRubRange": [
            43200,
            288300
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2025,
          "monthlyGrossRubRange": [
            45000,
            300000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2026,
          "monthlyGrossRubRange": [
            47300,
            315200
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2027,
          "monthlyGrossRubRange": [
            49700,
            331100
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2028,
          "monthlyGrossRubRange": [
            52200,
            347900
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2029,
          "monthlyGrossRubRange": [
            54800,
            365500
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2030,
          "monthlyGrossRubRange": [
            57600,
            384000
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2031,
          "monthlyGrossRubRange": [
            60500,
            403500
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2032,
          "monthlyGrossRubRange": [
            63600,
            424000
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2033,
          "monthlyGrossRubRange": [
            66800,
            445600
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2034,
          "monthlyGrossRubRange": [
            70200,
            468200
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2035,
          "monthlyGrossRubRange": [
            73800,
            492000
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        }
      ]
    },
    {
      "sport": "volleyball",
      "level": "superleague_m",
      "series": [
        {
          "year": 1998,
          "monthlyGrossRubRange": [
            9600,
            160000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 1999,
          "monthlyGrossRubRange": [
            11800,
            196000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2000,
          "monthlyGrossRubRange": [
            14400,
            240000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2001,
          "monthlyGrossRubRange": [
            17100,
            284300
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2002,
          "monthlyGrossRubRange": [
            20200,
            336800
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2003,
          "monthlyGrossRubRange": [
            23900,
            399000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2004,
          "monthlyGrossRubRange": [
            28400,
            472700
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2005,
          "monthlyGrossRubRange": [
            33600,
            560000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2006,
          "monthlyGrossRubRange": [
            38500,
            641000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2007,
          "monthlyGrossRubRange": [
            44000,
            733600
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2008,
          "monthlyGrossRubRange": [
            50400,
            839700
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2009,
          "monthlyGrossRubRange": [
            57700,
            961100
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2010,
          "monthlyGrossRubRange": [
            66000,
            1100000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2011,
          "monthlyGrossRubRange": [
            69300,
            1154400
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2012,
          "monthlyGrossRubRange": [
            72700,
            1211400
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2013,
          "monthlyGrossRubRange": [
            76300,
            1271300
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2014,
          "monthlyGrossRubRange": [
            80000,
            1334100
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2015,
          "monthlyGrossRubRange": [
            84000,
            1400000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2016,
          "monthlyGrossRubRange": [
            86700,
            1445000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2017,
          "monthlyGrossRubRange": [
            89500,
            1491500
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2018,
          "monthlyGrossRubRange": [
            92400,
            1539400
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2019,
          "monthlyGrossRubRange": [
            95300,
            1588900
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2020,
          "monthlyGrossRubRange": [
            98400,
            1640000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2021,
          "monthlyGrossRubRange": [
            102400,
            1706400
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2022,
          "monthlyGrossRubRange": [
            106500,
            1775500
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2023,
          "monthlyGrossRubRange": [
            110800,
            1847400
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2024,
          "monthlyGrossRubRange": [
            115300,
            1922200
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2025,
          "monthlyGrossRubRange": [
            120000,
            2000000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2026,
          "monthlyGrossRubRange": [
            126100,
            2101200
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2027,
          "monthlyGrossRubRange": [
            132500,
            2207600
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2028,
          "monthlyGrossRubRange": [
            139200,
            2319300
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2029,
          "monthlyGrossRubRange": [
            146200,
            2436700
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2030,
          "monthlyGrossRubRange": [
            153600,
            2560000
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2031,
          "monthlyGrossRubRange": [
            161400,
            2690100
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2032,
          "monthlyGrossRubRange": [
            169600,
            2826800
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2033,
          "monthlyGrossRubRange": [
            178200,
            2970400
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2034,
          "monthlyGrossRubRange": [
            187300,
            3121400
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2035,
          "monthlyGrossRubRange": [
            196800,
            3280000
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        }
      ]
    },
    {
      "sport": "volleyball",
      "level": "superleague_f",
      "series": [
        {
          "year": 1998,
          "monthlyGrossRubRange": [
            6400,
            112000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 1999,
          "monthlyGrossRubRange": [
            7800,
            137200
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2000,
          "monthlyGrossRubRange": [
            9600,
            168000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2001,
          "monthlyGrossRubRange": [
            11400,
            199000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2002,
          "monthlyGrossRubRange": [
            13500,
            235800
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2003,
          "monthlyGrossRubRange": [
            16000,
            279300
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2004,
          "monthlyGrossRubRange": [
            18900,
            330900
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2005,
          "monthlyGrossRubRange": [
            22400,
            392000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2006,
          "monthlyGrossRubRange": [
            25600,
            448700
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2007,
          "monthlyGrossRubRange": [
            29300,
            513500
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2008,
          "monthlyGrossRubRange": [
            33600,
            587800
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2009,
          "monthlyGrossRubRange": [
            38400,
            672700
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2010,
          "monthlyGrossRubRange": [
            44000,
            770000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2011,
          "monthlyGrossRubRange": [
            46200,
            808000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2012,
          "monthlyGrossRubRange": [
            48500,
            848000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2013,
          "monthlyGrossRubRange": [
            50900,
            889900
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2014,
          "monthlyGrossRubRange": [
            53400,
            933900
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2015,
          "monthlyGrossRubRange": [
            56000,
            980000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2016,
          "monthlyGrossRubRange": [
            57800,
            1011500
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2017,
          "monthlyGrossRubRange": [
            59700,
            1044000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2018,
          "monthlyGrossRubRange": [
            61600,
            1077600
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2019,
          "monthlyGrossRubRange": [
            63600,
            1112200
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2020,
          "monthlyGrossRubRange": [
            65600,
            1148000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2021,
          "monthlyGrossRubRange": [
            68300,
            1194500
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2022,
          "monthlyGrossRubRange": [
            71000,
            1242800
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2023,
          "monthlyGrossRubRange": [
            73900,
            1293200
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2024,
          "monthlyGrossRubRange": [
            76900,
            1345500
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2025,
          "monthlyGrossRubRange": [
            80000,
            1400000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2026,
          "monthlyGrossRubRange": [
            84000,
            1470900
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2027,
          "monthlyGrossRubRange": [
            88300,
            1545300
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2028,
          "monthlyGrossRubRange": [
            92800,
            1623500
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2029,
          "monthlyGrossRubRange": [
            97500,
            1705700
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2030,
          "monthlyGrossRubRange": [
            102400,
            1792000
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2031,
          "monthlyGrossRubRange": [
            107600,
            1883100
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2032,
          "monthlyGrossRubRange": [
            113100,
            1978800
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2033,
          "monthlyGrossRubRange": [
            118800,
            2079300
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2034,
          "monthlyGrossRubRange": [
            124900,
            2185000
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2035,
          "monthlyGrossRubRange": [
            131200,
            2296000
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        }
      ]
    },
    {
      "sport": "handball",
      "level": "superleague_m",
      "series": [
        {
          "year": 1998,
          "monthlyGrossRubRange": [
            4800,
            40000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 1999,
          "monthlyGrossRubRange": [
            5900,
            49000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2000,
          "monthlyGrossRubRange": [
            7200,
            60000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2001,
          "monthlyGrossRubRange": [
            8500,
            71100
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2002,
          "monthlyGrossRubRange": [
            10100,
            84200
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2003,
          "monthlyGrossRubRange": [
            12000,
            99800
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2004,
          "monthlyGrossRubRange": [
            14200,
            118200
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2005,
          "monthlyGrossRubRange": [
            16800,
            140000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2006,
          "monthlyGrossRubRange": [
            19200,
            160200
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2007,
          "monthlyGrossRubRange": [
            22000,
            183400
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2008,
          "monthlyGrossRubRange": [
            25200,
            209900
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2009,
          "monthlyGrossRubRange": [
            28800,
            240300
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2010,
          "monthlyGrossRubRange": [
            33000,
            275000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2011,
          "monthlyGrossRubRange": [
            34600,
            288600
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2012,
          "monthlyGrossRubRange": [
            36300,
            302800
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2013,
          "monthlyGrossRubRange": [
            38100,
            317800
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2014,
          "monthlyGrossRubRange": [
            40000,
            333500
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2015,
          "monthlyGrossRubRange": [
            42000,
            350000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2016,
          "monthlyGrossRubRange": [
            43400,
            361300
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2017,
          "monthlyGrossRubRange": [
            44700,
            372900
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2018,
          "monthlyGrossRubRange": [
            46200,
            384900
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2019,
          "monthlyGrossRubRange": [
            47700,
            397200
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2020,
          "monthlyGrossRubRange": [
            49200,
            410000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2021,
          "monthlyGrossRubRange": [
            51200,
            426600
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2022,
          "monthlyGrossRubRange": [
            53300,
            443900
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2023,
          "monthlyGrossRubRange": [
            55400,
            461800
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2024,
          "monthlyGrossRubRange": [
            57700,
            480500
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2025,
          "monthlyGrossRubRange": [
            60000,
            500000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2026,
          "monthlyGrossRubRange": [
            63000,
            525300
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2027,
          "monthlyGrossRubRange": [
            66200,
            551900
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2028,
          "monthlyGrossRubRange": [
            69600,
            579800
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2029,
          "monthlyGrossRubRange": [
            73100,
            609200
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2030,
          "monthlyGrossRubRange": [
            76800,
            640000
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2031,
          "monthlyGrossRubRange": [
            80700,
            672500
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2032,
          "monthlyGrossRubRange": [
            84800,
            706700
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2033,
          "monthlyGrossRubRange": [
            89100,
            742600
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2034,
          "monthlyGrossRubRange": [
            93600,
            780300
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2035,
          "monthlyGrossRubRange": [
            98400,
            820000
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        }
      ]
    },
    {
      "sport": "handball",
      "level": "superleague_f",
      "series": [
        {
          "year": 1998,
          "monthlyGrossRubRange": [
            3600,
            32000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 1999,
          "monthlyGrossRubRange": [
            4400,
            39200
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2000,
          "monthlyGrossRubRange": [
            5400,
            48000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2001,
          "monthlyGrossRubRange": [
            6400,
            56900
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2002,
          "monthlyGrossRubRange": [
            7600,
            67400
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2003,
          "monthlyGrossRubRange": [
            9000,
            79800
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2004,
          "monthlyGrossRubRange": [
            10600,
            94500
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2005,
          "monthlyGrossRubRange": [
            12600,
            112000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2006,
          "monthlyGrossRubRange": [
            14400,
            128200
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2007,
          "monthlyGrossRubRange": [
            16500,
            146700
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2008,
          "monthlyGrossRubRange": [
            18900,
            167900
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2009,
          "monthlyGrossRubRange": [
            21600,
            192200
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2010,
          "monthlyGrossRubRange": [
            24800,
            220000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2011,
          "monthlyGrossRubRange": [
            26000,
            230900
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2012,
          "monthlyGrossRubRange": [
            27300,
            242300
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2013,
          "monthlyGrossRubRange": [
            28600,
            254300
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2014,
          "monthlyGrossRubRange": [
            30000,
            266800
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2015,
          "monthlyGrossRubRange": [
            31500,
            280000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2016,
          "monthlyGrossRubRange": [
            32500,
            289000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2017,
          "monthlyGrossRubRange": [
            33600,
            298300
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2018,
          "monthlyGrossRubRange": [
            34600,
            307900
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2019,
          "monthlyGrossRubRange": [
            35800,
            317800
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2020,
          "monthlyGrossRubRange": [
            36900,
            328000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2021,
          "monthlyGrossRubRange": [
            38400,
            341300
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2022,
          "monthlyGrossRubRange": [
            39900,
            355100
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2023,
          "monthlyGrossRubRange": [
            41600,
            369500
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2024,
          "monthlyGrossRubRange": [
            43200,
            384400
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2025,
          "monthlyGrossRubRange": [
            45000,
            400000
          ],
          "status": "estimate",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2026,
          "monthlyGrossRubRange": [
            47300,
            420200
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2027,
          "monthlyGrossRubRange": [
            49700,
            441500
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2028,
          "monthlyGrossRubRange": [
            52200,
            463900
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2029,
          "monthlyGrossRubRange": [
            54800,
            487300
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2030,
          "monthlyGrossRubRange": [
            57600,
            512000
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2031,
          "monthlyGrossRubRange": [
            60500,
            538000
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2032,
          "monthlyGrossRubRange": [
            63600,
            565400
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2033,
          "monthlyGrossRubRange": [
            66800,
            594100
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2034,
          "monthlyGrossRubRange": [
            70200,
            624300
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        },
        {
          "year": 2035,
          "monthlyGrossRubRange": [
            73800,
            656000
          ],
          "status": "scenario",
          "quality": "[~] интерполяция сценарных опор, не реальная ведомость зарплат"
        }
      ]
    }
  ],
  "careerAges": [
    {
      "sport": "football",
      "professionalDebutAge": [
        16,
        21
      ],
      "peakAge": [
        24,
        30
      ],
      "typicalRetirementAge": [
        32,
        38
      ],
      "sex": "both",
      "quality": "[~] типичные диапазоны, не ограничения и не гарантия карьеры"
    },
    {
      "sport": "hockey",
      "professionalDebutAge": [
        17,
        22
      ],
      "peakAge": [
        24,
        31
      ],
      "typicalRetirementAge": [
        33,
        40
      ],
      "sex": "both",
      "quality": "[~] типичные диапазоны, не ограничения и не гарантия карьеры"
    },
    {
      "sport": "basketball",
      "professionalDebutAge": [
        17,
        22
      ],
      "peakAge": [
        25,
        31
      ],
      "typicalRetirementAge": [
        33,
        39
      ],
      "sex": "both",
      "quality": "[~] типичные диапазоны, не ограничения и не гарантия карьеры"
    },
    {
      "sport": "volleyball",
      "professionalDebutAge": [
        17,
        22
      ],
      "peakAge": [
        24,
        30
      ],
      "typicalRetirementAge": [
        32,
        38
      ],
      "sex": "both",
      "quality": "[~] типичные диапазоны, не ограничения и не гарантия карьеры"
    },
    {
      "sport": "handball",
      "professionalDebutAge": [
        17,
        22
      ],
      "peakAge": [
        25,
        31
      ],
      "typicalRetirementAge": [
        33,
        39
      ],
      "sex": "both",
      "quality": "[~] типичные диапазоны, не ограничения и не гарантия карьеры"
    }
  ],
  "pre1998SalaryPolicy": {
    "years": [
      1985,
      1997
    ],
    "nominalRubles": null,
    "note": "Нет сопоставимого годового ряда; не экстраполировать рубли после деноминации назад."
  }
};
