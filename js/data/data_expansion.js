/*
Манифест пакета: фактическое покрытие, ограничения и контрольные суммы новых данных.
Составлено: 2026-10-27.
Источник package: Состав и проверка этого пакета — docs/DATA_EXPANSION.md
[~] = оценка для игры; не официальное измерение. null = данных нет / неприменимо, не ноль.
Обычный справочник: подключение и применение выполняет потребитель данных.
*/
RL.DATA.dataExpansion = {
  "meta": {
    "schemaVersion": 1,
    "compiledAt": "2026-10-27",
    "sources": [
      {
        "id": "package",
        "title": "Состав и проверка этого пакета",
        "url": "docs/DATA_EXPANSION.md",
        "kind": "project"
      }
    ],
    "notes": [
      "Новые данные не загружаются index.html автоматически. Существующие пространства имён и логика не перезаписываются.",
      "Восемь запрошенных справочников + отчёт вычитки + этот манифест. Исправления рода применены отдельно только к строкам шести существующих файлов."
    ]
  },
  "files": [
    {
      "file": "js/data/deathcauses.js",
      "namespace": "RL.DATA.deathCausesExt",
      "sha256": "37d0ccbd802508c22b9a8d91b3045c2ecc55b6347d83d90eb87b9f9cbd5c1f40"
    },
    {
      "file": "js/data/diseases_ext.js",
      "namespace": "RL.DATA.diseasesExt",
      "sha256": "0dc5287183235152fc86f207fcb87be2dc785061365e64dd1f50474cc56083ef"
    },
    {
      "file": "js/data/ethnic.js",
      "namespace": "RL.DATA.ethnicCensus",
      "sha256": "46aa0f67c4d3dd865dddad0924574d1843751298fc950ffa8a28547be45923b5"
    },
    {
      "file": "js/data/focuses_ext.js",
      "namespace": "RL.DATA.focusesExt",
      "sha256": "5b220e1617659e5973a98ca669e2ee2a0b522323fecc7da875d9bfb13f6d846d"
    },
    {
      "file": "js/data/sport.js",
      "namespace": "RL.DATA.sportExt",
      "sha256": "7083f930b1a0accb6caf4d1164b1c2925f8395039cb33dd2cc40ebf78e9af3d7"
    },
    {
      "file": "js/data/universities.js",
      "namespace": "RL.DATA.universities",
      "sha256": "3966fc08197b00577a0bf4e98845d804aa4835dbe23711dcd99f9760ae17007b"
    },
    {
      "file": "js/data/elections.js",
      "namespace": "RL.DATA.elections",
      "sha256": "c285d95750fb1b8884ea073ebfba03993823017ceb377325c2dad770c69aa394"
    },
    {
      "file": "js/data/events_kin.js",
      "namespace": "RL.DATA.eventsKin",
      "sha256": "7c91ee6f98e87aec850d3657ce4c6e2f6a94857d9bf7c0dd7e4cbc2ffa89af59"
    },
    {
      "file": "js/data/gender_audit.js",
      "namespace": "RL.DATA.genderAudit",
      "sha256": "f721eb243442df308b4f8120776c71752bc9445648642533f5bb3e50bc2abd50"
    }
  ],
  "counts": {
    "deathCauses": 81,
    "diseases": 68,
    "censusGroups": 145,
    "regions": 85,
    "focuses": 128,
    "clubs": 150,
    "schools": 5,
    "educationInstitutions": 168,
    "kinEvents": 60,
    "genderReplacements": 26,
    "patchedEventFiles": 6
  },
  "validationStatus": "passed",
  "taskCoverage": {
    "deathCauses": "81 категория; [~] синтетические возрастно-половые доли, официальные опорные показатели отдельно; точного куба Росстата нет",
    "diseases": "68 болезней; частоты, множители и цены [~]",
    "ethnic": "Точные численности 145 основных групп по 85 субъектам; именование [~], не переписные частоты имён",
    "focuses": "128 авторских фокусов; эффекты и стоимость [~]",
    "sport": "150 клубов и 5 школ; разные указанные сезоны, не полный реестр; зарплаты [~]",
    "universities": "168 примеров учреждений по 85 территориям, СПО в каждой; проходные баллы [~], часть ВУЦ не проверена",
    "elections": "Федеральный ряд и 51 год календаря; региональные/местные примеры, полный архив не собран",
    "kin": "60 авторских событий; обязательный when и совместимые эффекты",
    "gender": "26 текстовых замен в шести существующих файлах"
  },
  "limitations": [
    "Детальные доли причин смерти и медицинские частоты — оценочные модели [~].",
    "Региональный и муниципальный календарь содержит примеры, не полный архив.",
    "Учреждения и клубы — репрезентативный справочник, с неполной индивидуальной проверкой источников.",
    "Новые справочники не подключены к index.html и движку."
  ]
};
