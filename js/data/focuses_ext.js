/*
Фокусы жизни: 128 вариантов, по 16 на период. Эффекты и расходы [~].
Составлено: 2026-10-27.
Источник author: Авторские сценарии и баланс; статистического источника для эффектов нет — about:blank
[~] = оценка для игры; не официальное измерение. null = данных нет / неприменимо, не ноль.
Обычный справочник: подключение и применение выполняет потребитель данных.
*/
RL.DATA.focusesExt = {
  "meta": {
    "schemaVersion": 1,
    "compiledAt": "2026-10-27",
    "sources": [
      {
        "id": "author",
        "title": "Авторские сценарии и баланс; статистического источника для эффектов нет",
        "url": "about:blank",
        "kind": "authored"
      }
    ],
    "notes": [
      "По 16 новых фокусов для каждого из восьми периодов. Все эффекты и цены [~].",
      "Возрастные интервалы включительные; в 60 лет выбирать период с наибольшим ageFrom (senior), чтобы не удваивать эффекты.",
      "gainsMonthly/lossesMonthly — пункты характеристик в месяц; стоимость отдельно в RUB цен 2024 года. Не списывать money второй раз за ту же стоимость.",
      "Пол не ограничивает доступ к занятиям. Все фокусы both: нет подтверждённых долей для маркировки чаще м/ж.",
      "Упоминание спорта/меднаблюдения — деятельность персонажа, а не обещание лечения. Потребитель должен проверять доступность и бюджет."
    ]
  },
  "currency": "RUB",
  "priceYear": 2024,
  "periodSelection": "max(ageFrom) among matching periods",
  "sexPreferenceValues": {
    "both": "оба пола",
    "more_m": "чаще м [~], доступно всем",
    "more_f": "чаще ж [~], доступно всем"
  },
  "periods": [
    {
      "id": "preschool",
      "ageFrom": 3,
      "ageTo": 6
    },
    {
      "id": "primary",
      "ageFrom": 7,
      "ageTo": 10
    },
    {
      "id": "early_teen",
      "ageFrom": 11,
      "ageTo": 14
    },
    {
      "id": "late_teen",
      "ageFrom": 15,
      "ageTo": 17
    },
    {
      "id": "young",
      "ageFrom": 18,
      "ageTo": 25
    },
    {
      "id": "adult",
      "ageFrom": 26,
      "ageTo": 40
    },
    {
      "id": "mature",
      "ageFrom": 41,
      "ageTo": 60
    },
    {
      "id": "senior",
      "ageFrom": 60,
      "ageTo": 110
    }
  ],
  "items": [
    {
      "id": "fx_preschool_01",
      "name": "Игры во дворе",
      "periodId": "preschool",
      "ageFrom": 3,
      "ageTo": 6,
      "sexPreference": "both",
      "gainsMonthly": {
        "social": 0.35,
        "health": 0.2
      },
      "lossesMonthly": {
        "skills": -0.05
      },
      "costMonthlyRub": 0,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_preschool_02",
      "name": "Чтение с родными",
      "periodId": "preschool",
      "ageFrom": 3,
      "ageTo": 6,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.4,
        "mental": 0.1
      },
      "lossesMonthly": {
        "social": -0.05
      },
      "costMonthlyRub": 300,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_preschool_03",
      "name": "Лепка и рисование",
      "periodId": "preschool",
      "ageFrom": 3,
      "ageTo": 6,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.3,
        "happiness": 0.2
      },
      "lossesMonthly": {
        "health": -0.03
      },
      "costMonthlyRub": 700,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_preschool_04",
      "name": "Плавание с инструктором",
      "periodId": "preschool",
      "ageFrom": 3,
      "ageTo": 6,
      "sexPreference": "both",
      "gainsMonthly": {
        "health": 0.4,
        "mental": 0.1
      },
      "lossesMonthly": {
        "money": -0.1
      },
      "costMonthlyRub": 3500,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_preschool_05",
      "name": "Детская гимнастика",
      "periodId": "preschool",
      "ageFrom": 3,
      "ageTo": 6,
      "sexPreference": "both",
      "gainsMonthly": {
        "health": 0.35,
        "skills": 0.15
      },
      "lossesMonthly": {
        "happiness": -0.05
      },
      "costMonthlyRub": 2500,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_preschool_06",
      "name": "Музыкальные игры",
      "periodId": "preschool",
      "ageFrom": 3,
      "ageTo": 6,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.3,
        "social": 0.1
      },
      "lossesMonthly": {
        "mental": -0.03
      },
      "costMonthlyRub": 1800,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_preschool_07",
      "name": "Конструкторы",
      "periodId": "preschool",
      "ageFrom": 3,
      "ageTo": 6,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.4
      },
      "lossesMonthly": {
        "social": -0.08
      },
      "costMonthlyRub": 900,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_preschool_08",
      "name": "Кукольный театр",
      "periodId": "preschool",
      "ageFrom": 3,
      "ageTo": 6,
      "sexPreference": "both",
      "gainsMonthly": {
        "social": 0.3,
        "happiness": 0.2
      },
      "lossesMonthly": {
        "skills": -0.03
      },
      "costMonthlyRub": 800,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_preschool_09",
      "name": "Прогулки в природе",
      "periodId": "preschool",
      "ageFrom": 3,
      "ageTo": 6,
      "sexPreference": "both",
      "gainsMonthly": {
        "health": 0.3,
        "mental": 0.2
      },
      "lossesMonthly": {
        "skills": -0.04
      },
      "costMonthlyRub": 300,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_preschool_10",
      "name": "Логопедические занятия",
      "periodId": "preschool",
      "ageFrom": 3,
      "ageTo": 6,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.35,
        "social": 0.15
      },
      "lossesMonthly": {
        "happiness": -0.04
      },
      "costMonthlyRub": 5000,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_preschool_11",
      "name": "Настольные игры",
      "periodId": "preschool",
      "ageFrom": 3,
      "ageTo": 6,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.3,
        "social": 0.15
      },
      "lossesMonthly": {
        "health": -0.04
      },
      "costMonthlyRub": 400,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_preschool_12",
      "name": "Подготовка к школе",
      "periodId": "preschool",
      "ageFrom": 3,
      "ageTo": 6,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.45
      },
      "lossesMonthly": {
        "happiness": -0.1
      },
      "costMonthlyRub": 3000,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_preschool_13",
      "name": "Помощь по дому в игре",
      "periodId": "preschool",
      "ageFrom": 3,
      "ageTo": 6,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.2,
        "social": 0.2
      },
      "lossesMonthly": {
        "happiness": -0.03
      },
      "costMonthlyRub": 0,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_preschool_14",
      "name": "Танцевальная студия",
      "periodId": "preschool",
      "ageFrom": 3,
      "ageTo": 6,
      "sexPreference": "both",
      "gainsMonthly": {
        "health": 0.25,
        "social": 0.25
      },
      "lossesMonthly": {
        "mental": -0.04
      },
      "costMonthlyRub": 2200,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_preschool_15",
      "name": "Иностранный язык в игре",
      "periodId": "preschool",
      "ageFrom": 3,
      "ageTo": 6,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.35
      },
      "lossesMonthly": {
        "mental": -0.05
      },
      "costMonthlyRub": 2500,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_preschool_16",
      "name": "Свободная игра дома",
      "periodId": "preschool",
      "ageFrom": 3,
      "ageTo": 6,
      "sexPreference": "both",
      "gainsMonthly": {
        "happiness": 0.3,
        "mental": 0.2
      },
      "lossesMonthly": {
        "social": -0.1
      },
      "costMonthlyRub": 0,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_primary_01",
      "name": "Шахматы",
      "periodId": "primary",
      "ageFrom": 7,
      "ageTo": 10,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.45
      },
      "lossesMonthly": {
        "health": -0.08
      },
      "costMonthlyRub": 1500,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_primary_02",
      "name": "Футбольная секция",
      "periodId": "primary",
      "ageFrom": 7,
      "ageTo": 10,
      "sexPreference": "both",
      "gainsMonthly": {
        "health": 0.4,
        "social": 0.2
      },
      "lossesMonthly": {
        "skills": -0.06
      },
      "costMonthlyRub": 2500,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_primary_03",
      "name": "Хоккейная секция",
      "periodId": "primary",
      "ageFrom": 7,
      "ageTo": 10,
      "sexPreference": "both",
      "gainsMonthly": {
        "health": 0.4,
        "social": 0.15
      },
      "lossesMonthly": {
        "mental": -0.08
      },
      "costMonthlyRub": 6000,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_primary_04",
      "name": "Музыкальная школа",
      "periodId": "primary",
      "ageFrom": 7,
      "ageTo": 10,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.45
      },
      "lossesMonthly": {
        "happiness": -0.08
      },
      "costMonthlyRub": 2200,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_primary_05",
      "name": "Художественная школа",
      "periodId": "primary",
      "ageFrom": 7,
      "ageTo": 10,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.35,
        "happiness": 0.1
      },
      "lossesMonthly": {
        "health": -0.04
      },
      "costMonthlyRub": 1800,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_primary_06",
      "name": "Робототехника",
      "periodId": "primary",
      "ageFrom": 7,
      "ageTo": 10,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.5
      },
      "lossesMonthly": {
        "health": -0.07
      },
      "costMonthlyRub": 3500,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_primary_07",
      "name": "Школьный театр",
      "periodId": "primary",
      "ageFrom": 7,
      "ageTo": 10,
      "sexPreference": "both",
      "gainsMonthly": {
        "social": 0.4,
        "skills": 0.15
      },
      "lossesMonthly": {
        "mental": -0.04
      },
      "costMonthlyRub": 500,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_primary_08",
      "name": "Лёгкая атлетика",
      "periodId": "primary",
      "ageFrom": 7,
      "ageTo": 10,
      "sexPreference": "both",
      "gainsMonthly": {
        "health": 0.45
      },
      "lossesMonthly": {
        "happiness": -0.05
      },
      "costMonthlyRub": 1200,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_primary_09",
      "name": "Дневник наблюдений",
      "periodId": "primary",
      "ageFrom": 7,
      "ageTo": 10,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.3,
        "mental": 0.15
      },
      "lossesMonthly": {
        "social": -0.06
      },
      "costMonthlyRub": 200,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_primary_10",
      "name": "Краеведческий кружок",
      "periodId": "primary",
      "ageFrom": 7,
      "ageTo": 10,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.25,
        "social": 0.2
      },
      "lossesMonthly": {
        "health": -0.03
      },
      "costMonthlyRub": 500,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_primary_11",
      "name": "Помощь в школьной библиотеке",
      "periodId": "primary",
      "ageFrom": 7,
      "ageTo": 10,
      "sexPreference": "both",
      "gainsMonthly": {
        "social": 0.25,
        "skills": 0.25
      },
      "lossesMonthly": {
        "happiness": -0.04
      },
      "costMonthlyRub": 0,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_primary_12",
      "name": "Туристический кружок",
      "periodId": "primary",
      "ageFrom": 7,
      "ageTo": 10,
      "sexPreference": "both",
      "gainsMonthly": {
        "health": 0.3,
        "social": 0.3
      },
      "lossesMonthly": {
        "mental": -0.04
      },
      "costMonthlyRub": 1500,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_primary_13",
      "name": "Углублённая математика",
      "periodId": "primary",
      "ageFrom": 7,
      "ageTo": 10,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.5
      },
      "lossesMonthly": {
        "mental": -0.1
      },
      "costMonthlyRub": 2000,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_primary_14",
      "name": "Уход за домашним питомцем",
      "periodId": "primary",
      "ageFrom": 7,
      "ageTo": 10,
      "sexPreference": "both",
      "gainsMonthly": {
        "mental": 0.2,
        "skills": 0.2
      },
      "lossesMonthly": {
        "happiness": -0.03
      },
      "costMonthlyRub": 1500,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_primary_15",
      "name": "Игры с друзьями",
      "periodId": "primary",
      "ageFrom": 7,
      "ageTo": 10,
      "sexPreference": "both",
      "gainsMonthly": {
        "social": 0.4,
        "happiness": 0.2
      },
      "lossesMonthly": {
        "skills": -0.1
      },
      "costMonthlyRub": 0,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_primary_16",
      "name": "Компьютерные игры",
      "periodId": "primary",
      "ageFrom": 7,
      "ageTo": 10,
      "sexPreference": "both",
      "gainsMonthly": {
        "happiness": 0.3,
        "skills": 0.1
      },
      "lossesMonthly": {
        "health": -0.15,
        "social": -0.08
      },
      "costMonthlyRub": 600,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_early_teen_01",
      "name": "Олимпиады по математике",
      "periodId": "early_teen",
      "ageFrom": 11,
      "ageTo": 14,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.6
      },
      "lossesMonthly": {
        "mental": -0.15
      },
      "costMonthlyRub": 2500,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_early_teen_02",
      "name": "Кодинг для начинающих",
      "periodId": "early_teen",
      "ageFrom": 11,
      "ageTo": 14,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.5
      },
      "lossesMonthly": {
        "health": -0.1
      },
      "costMonthlyRub": 3000,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_early_teen_03",
      "name": "Школьное самоуправление",
      "periodId": "early_teen",
      "ageFrom": 11,
      "ageTo": 14,
      "sexPreference": "both",
      "gainsMonthly": {
        "social": 0.45,
        "skills": 0.15
      },
      "lossesMonthly": {
        "mental": -0.1
      },
      "costMonthlyRub": 0,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_early_teen_04",
      "name": "Театральная студия",
      "periodId": "early_teen",
      "ageFrom": 11,
      "ageTo": 14,
      "sexPreference": "both",
      "gainsMonthly": {
        "social": 0.45,
        "happiness": 0.15
      },
      "lossesMonthly": {
        "skills": -0.05
      },
      "costMonthlyRub": 2200,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_early_teen_05",
      "name": "Волейбольная секция",
      "periodId": "early_teen",
      "ageFrom": 11,
      "ageTo": 14,
      "sexPreference": "both",
      "gainsMonthly": {
        "health": 0.4,
        "social": 0.2
      },
      "lossesMonthly": {
        "mental": -0.04
      },
      "costMonthlyRub": 2000,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_early_teen_06",
      "name": "Плавательная секция",
      "periodId": "early_teen",
      "ageFrom": 11,
      "ageTo": 14,
      "sexPreference": "both",
      "gainsMonthly": {
        "health": 0.45
      },
      "lossesMonthly": {
        "social": -0.04
      },
      "costMonthlyRub": 3000,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_early_teen_07",
      "name": "Школьная газета",
      "periodId": "early_teen",
      "ageFrom": 11,
      "ageTo": 14,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.35,
        "social": 0.25
      },
      "lossesMonthly": {
        "mental": -0.05
      },
      "costMonthlyRub": 300,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_early_teen_08",
      "name": "Фотография",
      "periodId": "early_teen",
      "ageFrom": 11,
      "ageTo": 14,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.3,
        "happiness": 0.2
      },
      "lossesMonthly": {
        "health": -0.04
      },
      "costMonthlyRub": 1500,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_early_teen_09",
      "name": "Волонтёрство с наставником",
      "periodId": "early_teen",
      "ageFrom": 11,
      "ageTo": 14,
      "sexPreference": "both",
      "gainsMonthly": {
        "social": 0.4,
        "mental": 0.1
      },
      "lossesMonthly": {
        "happiness": -0.04
      },
      "costMonthlyRub": 300,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_early_teen_10",
      "name": "Историческая реконструкция",
      "periodId": "early_teen",
      "ageFrom": 11,
      "ageTo": 14,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.3,
        "social": 0.2
      },
      "lossesMonthly": {
        "health": -0.05
      },
      "costMonthlyRub": 1800,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_early_teen_11",
      "name": "Разговорный иностранный язык",
      "periodId": "early_teen",
      "ageFrom": 11,
      "ageTo": 14,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.4,
        "social": 0.15
      },
      "lossesMonthly": {
        "mental": -0.06
      },
      "costMonthlyRub": 3000,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_early_teen_12",
      "name": "Гитарный кружок",
      "periodId": "early_teen",
      "ageFrom": 11,
      "ageTo": 14,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.3,
        "social": 0.2
      },
      "lossesMonthly": {
        "health": -0.03
      },
      "costMonthlyRub": 2000,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_early_teen_13",
      "name": "Скейт и ролики",
      "periodId": "early_teen",
      "ageFrom": 11,
      "ageTo": 14,
      "sexPreference": "both",
      "gainsMonthly": {
        "health": 0.3,
        "happiness": 0.25
      },
      "lossesMonthly": {
        "mental": -0.05
      },
      "costMonthlyRub": 1000,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_early_teen_14",
      "name": "Настольные ролевые игры",
      "periodId": "early_teen",
      "ageFrom": 11,
      "ageTo": 14,
      "sexPreference": "both",
      "gainsMonthly": {
        "social": 0.35,
        "skills": 0.2
      },
      "lossesMonthly": {
        "health": -0.06
      },
      "costMonthlyRub": 800,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_early_teen_15",
      "name": "Спортивное ориентирование",
      "periodId": "early_teen",
      "ageFrom": 11,
      "ageTo": 14,
      "sexPreference": "both",
      "gainsMonthly": {
        "health": 0.35,
        "skills": 0.2
      },
      "lossesMonthly": {
        "happiness": -0.05
      },
      "costMonthlyRub": 1000,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_early_teen_16",
      "name": "Дворовая компания",
      "periodId": "early_teen",
      "ageFrom": 11,
      "ageTo": 14,
      "sexPreference": "both",
      "gainsMonthly": {
        "social": 0.45,
        "happiness": 0.2
      },
      "lossesMonthly": {
        "skills": -0.15
      },
      "costMonthlyRub": 500,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_late_teen_01",
      "name": "Подготовка к ЕГЭ",
      "periodId": "late_teen",
      "ageFrom": 15,
      "ageTo": 17,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.65
      },
      "lossesMonthly": {
        "mental": -0.2,
        "health": -0.06
      },
      "costMonthlyRub": 6000,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_late_teen_02",
      "name": "Подготовка к колледжу",
      "periodId": "late_teen",
      "ageFrom": 15,
      "ageTo": 17,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.4,
        "mental": 0.1
      },
      "lossesMonthly": {
        "social": -0.08
      },
      "costMonthlyRub": 2000,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_late_teen_03",
      "name": "Профпробы и стажировки",
      "periodId": "late_teen",
      "ageFrom": 15,
      "ageTo": 17,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.4,
        "social": 0.25
      },
      "lossesMonthly": {
        "happiness": -0.08
      },
      "costMonthlyRub": 1000,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_late_teen_04",
      "name": "Олимпиадный интенсив",
      "periodId": "late_teen",
      "ageFrom": 15,
      "ageTo": 17,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.7
      },
      "lossesMonthly": {
        "mental": -0.25
      },
      "costMonthlyRub": 4500,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_late_teen_05",
      "name": "Спортивный разряд",
      "periodId": "late_teen",
      "ageFrom": 15,
      "ageTo": 17,
      "sexPreference": "both",
      "gainsMonthly": {
        "health": 0.5
      },
      "lossesMonthly": {
        "skills": -0.12
      },
      "costMonthlyRub": 5000,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_late_teen_06",
      "name": "Дебатный клуб",
      "periodId": "late_teen",
      "ageFrom": 15,
      "ageTo": 17,
      "sexPreference": "both",
      "gainsMonthly": {
        "social": 0.45,
        "skills": 0.25
      },
      "lossesMonthly": {
        "mental": -0.1
      },
      "costMonthlyRub": 1000,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_late_teen_07",
      "name": "Подработка по выходным",
      "periodId": "late_teen",
      "ageFrom": 15,
      "ageTo": 17,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.25,
        "money": 0.2
      },
      "lossesMonthly": {
        "health": -0.12,
        "mental": -0.1
      },
      "costMonthlyRub": 0,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_late_teen_08",
      "name": "Портфолио дизайнера",
      "periodId": "late_teen",
      "ageFrom": 15,
      "ageTo": 17,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.5
      },
      "lossesMonthly": {
        "health": -0.1
      },
      "costMonthlyRub": 2500,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_late_teen_09",
      "name": "Видеомонтаж",
      "periodId": "late_teen",
      "ageFrom": 15,
      "ageTo": 17,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.45,
        "social": 0.1
      },
      "lossesMonthly": {
        "health": -0.12
      },
      "costMonthlyRub": 1500,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_late_teen_10",
      "name": "Творческая студия",
      "periodId": "late_teen",
      "ageFrom": 15,
      "ageTo": 17,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.35,
        "happiness": 0.2
      },
      "lossesMonthly": {
        "mental": -0.06
      },
      "costMonthlyRub": 2500,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_late_teen_11",
      "name": "Добровольческий отряд",
      "periodId": "late_teen",
      "ageFrom": 15,
      "ageTo": 17,
      "sexPreference": "both",
      "gainsMonthly": {
        "social": 0.45,
        "skills": 0.15
      },
      "lossesMonthly": {
        "happiness": -0.05
      },
      "costMonthlyRub": 500,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_late_teen_12",
      "name": "Учебный исследовательский проект",
      "periodId": "late_teen",
      "ageFrom": 15,
      "ageTo": 17,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.55
      },
      "lossesMonthly": {
        "mental": -0.12
      },
      "costMonthlyRub": 1700,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_late_teen_13",
      "name": "Дружба и свидания",
      "periodId": "late_teen",
      "ageFrom": 15,
      "ageTo": 17,
      "sexPreference": "both",
      "gainsMonthly": {
        "social": 0.45,
        "happiness": 0.25
      },
      "lossesMonthly": {
        "skills": -0.12
      },
      "costMonthlyRub": 1800,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_late_teen_14",
      "name": "Автодело на учебном стенде",
      "periodId": "late_teen",
      "ageFrom": 15,
      "ageTo": 17,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.4
      },
      "lossesMonthly": {
        "mental": -0.05
      },
      "costMonthlyRub": 2500,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_late_teen_15",
      "name": "Кулинарная практика",
      "periodId": "late_teen",
      "ageFrom": 15,
      "ageTo": 17,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.35,
        "happiness": 0.15
      },
      "lossesMonthly": {
        "health": -0.03
      },
      "costMonthlyRub": 1600,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_late_teen_16",
      "name": "Спокойный выпускной год",
      "periodId": "late_teen",
      "ageFrom": 15,
      "ageTo": 17,
      "sexPreference": "both",
      "gainsMonthly": {
        "mental": 0.4,
        "happiness": 0.15
      },
      "lossesMonthly": {
        "skills": -0.15
      },
      "costMonthlyRub": 500,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_young_01",
      "name": "Университетская наука",
      "periodId": "young",
      "ageFrom": 18,
      "ageTo": 25,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.6,
        "social": 0.1
      },
      "lossesMonthly": {
        "money": -0.1,
        "mental": -0.12
      },
      "costMonthlyRub": 2500,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_young_02",
      "name": "Сильная сессия",
      "periodId": "young",
      "ageFrom": 18,
      "ageTo": 25,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.65
      },
      "lossesMonthly": {
        "mental": -0.2
      },
      "costMonthlyRub": 3000,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_young_03",
      "name": "Освоение рабочего ремесла",
      "periodId": "young",
      "ageFrom": 18,
      "ageTo": 25,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.5,
        "money": 0.1
      },
      "lossesMonthly": {
        "health": -0.1
      },
      "costMonthlyRub": 2000,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_young_04",
      "name": "Стажировка по специальности",
      "periodId": "young",
      "ageFrom": 18,
      "ageTo": 25,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.45,
        "social": 0.25
      },
      "lossesMonthly": {
        "happiness": -0.1
      },
      "costMonthlyRub": 1500,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_young_05",
      "name": "Первый небольшой бизнес",
      "periodId": "young",
      "ageFrom": 18,
      "ageTo": 25,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.35,
        "money": 0.25
      },
      "lossesMonthly": {
        "mental": -0.25
      },
      "costMonthlyRub": 15000,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_young_06",
      "name": "Фриланс-портфолио",
      "periodId": "young",
      "ageFrom": 18,
      "ageTo": 25,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.45,
        "money": 0.15
      },
      "lossesMonthly": {
        "social": -0.15
      },
      "costMonthlyRub": 3500,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_young_07",
      "name": "Иностранный язык для карьеры",
      "periodId": "young",
      "ageFrom": 18,
      "ageTo": 25,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.45,
        "social": 0.1
      },
      "lossesMonthly": {
        "mental": -0.06
      },
      "costMonthlyRub": 4000,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_young_08",
      "name": "Водительские курсы",
      "periodId": "young",
      "ageFrom": 18,
      "ageTo": 25,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.3
      },
      "lossesMonthly": {
        "mental": -0.08
      },
      "costMonthlyRub": 9000,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_young_09",
      "name": "Командный любительский спорт",
      "periodId": "young",
      "ageFrom": 18,
      "ageTo": 25,
      "sexPreference": "both",
      "gainsMonthly": {
        "health": 0.4,
        "social": 0.25
      },
      "lossesMonthly": {
        "skills": -0.06
      },
      "costMonthlyRub": 3000,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_young_10",
      "name": "Профессиональный спорт",
      "periodId": "young",
      "ageFrom": 18,
      "ageTo": 25,
      "sexPreference": "both",
      "gainsMonthly": {
        "health": 0.45,
        "skills": 0.2
      },
      "lossesMonthly": {
        "mental": -0.2
      },
      "costMonthlyRub": 12000,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_young_11",
      "name": "Студенческое самоуправление",
      "periodId": "young",
      "ageFrom": 18,
      "ageTo": 25,
      "sexPreference": "both",
      "gainsMonthly": {
        "social": 0.5,
        "skills": 0.2
      },
      "lossesMonthly": {
        "mental": -0.12
      },
      "costMonthlyRub": 1000,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_young_12",
      "name": "Творческий коллектив",
      "periodId": "young",
      "ageFrom": 18,
      "ageTo": 25,
      "sexPreference": "both",
      "gainsMonthly": {
        "social": 0.4,
        "happiness": 0.2
      },
      "lossesMonthly": {
        "money": -0.05
      },
      "costMonthlyRub": 3500,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_young_13",
      "name": "Отношения и совместный быт",
      "periodId": "young",
      "ageFrom": 18,
      "ageTo": 25,
      "sexPreference": "both",
      "gainsMonthly": {
        "social": 0.3,
        "happiness": 0.25
      },
      "lossesMonthly": {
        "skills": -0.1
      },
      "costMonthlyRub": 4000,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_young_14",
      "name": "Накопление подушки",
      "periodId": "young",
      "ageFrom": 18,
      "ageTo": 25,
      "sexPreference": "both",
      "gainsMonthly": {
        "money": 0.3,
        "mental": 0.15
      },
      "lossesMonthly": {
        "happiness": -0.12
      },
      "costMonthlyRub": 0,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_young_15",
      "name": "Поездки по стране",
      "periodId": "young",
      "ageFrom": 18,
      "ageTo": 25,
      "sexPreference": "both",
      "gainsMonthly": {
        "social": 0.3,
        "happiness": 0.35
      },
      "lossesMonthly": {
        "mental": -0.05
      },
      "costMonthlyRub": 12000,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_young_16",
      "name": "Восстановление режима",
      "periodId": "young",
      "ageFrom": 18,
      "ageTo": 25,
      "sexPreference": "both",
      "gainsMonthly": {
        "health": 0.35,
        "mental": 0.35
      },
      "lossesMonthly": {
        "money": -0.1
      },
      "costMonthlyRub": 1000,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_adult_01",
      "name": "Повышение квалификации",
      "periodId": "adult",
      "ageFrom": 26,
      "ageTo": 40,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.5,
        "money": 0.15
      },
      "lossesMonthly": {
        "mental": -0.12
      },
      "costMonthlyRub": 6000,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_adult_02",
      "name": "Управленческая карьера",
      "periodId": "adult",
      "ageFrom": 26,
      "ageTo": 40,
      "sexPreference": "both",
      "gainsMonthly": {
        "social": 0.4,
        "money": 0.3
      },
      "lossesMonthly": {
        "mental": -0.25
      },
      "costMonthlyRub": 4000,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_adult_03",
      "name": "Свой магазин или мастерская",
      "periodId": "adult",
      "ageFrom": 26,
      "ageTo": 40,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.3,
        "money": 0.3
      },
      "lossesMonthly": {
        "mental": -0.3
      },
      "costMonthlyRub": 20000,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_adult_04",
      "name": "Смена профессии",
      "periodId": "adult",
      "ageFrom": 26,
      "ageTo": 40,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.65
      },
      "lossesMonthly": {
        "money": -0.2,
        "mental": -0.15
      },
      "costMonthlyRub": 8000,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_adult_05",
      "name": "Регулярный спорт",
      "periodId": "adult",
      "ageFrom": 26,
      "ageTo": 40,
      "sexPreference": "both",
      "gainsMonthly": {
        "health": 0.45,
        "mental": 0.1
      },
      "lossesMonthly": {
        "skills": -0.06
      },
      "costMonthlyRub": 4500,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_adult_06",
      "name": "Совместные занятия с детьми",
      "periodId": "adult",
      "ageFrom": 26,
      "ageTo": 40,
      "sexPreference": "both",
      "gainsMonthly": {
        "social": 0.35,
        "happiness": 0.3
      },
      "lossesMonthly": {
        "money": -0.08
      },
      "costMonthlyRub": 4000,
      "quality": "[~] авторская игровая настройка",
      "when": {
        "kidsAlive": {
          ">=": 1
        }
      }
    },
    {
      "id": "fx_adult_07",
      "name": "Забота о близких",
      "periodId": "adult",
      "ageFrom": 26,
      "ageTo": 40,
      "sexPreference": "both",
      "gainsMonthly": {
        "social": 0.3,
        "mental": 0.1
      },
      "lossesMonthly": {
        "health": -0.12
      },
      "costMonthlyRub": 2500,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_adult_08",
      "name": "Время для партнёра",
      "periodId": "adult",
      "ageFrom": 26,
      "ageTo": 40,
      "sexPreference": "both",
      "gainsMonthly": {
        "happiness": 0.35,
        "social": 0.25
      },
      "lossesMonthly": {
        "skills": -0.06
      },
      "costMonthlyRub": 4000,
      "quality": "[~] авторская игровая настройка",
      "when": {
        "hasPartner": true
      }
    },
    {
      "id": "fx_adult_09",
      "name": "Обустройство жилья",
      "periodId": "adult",
      "ageFrom": 26,
      "ageTo": 40,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.3,
        "happiness": 0.15
      },
      "lossesMonthly": {
        "mental": -0.1
      },
      "costMonthlyRub": 15000,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_adult_10",
      "name": "Финансовая дисциплина",
      "periodId": "adult",
      "ageFrom": 26,
      "ageTo": 40,
      "sexPreference": "both",
      "gainsMonthly": {
        "money": 0.35,
        "mental": 0.15
      },
      "lossesMonthly": {
        "happiness": -0.1
      },
      "costMonthlyRub": 500,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_adult_11",
      "name": "Городское волонтёрство",
      "periodId": "adult",
      "ageFrom": 26,
      "ageTo": 40,
      "sexPreference": "both",
      "gainsMonthly": {
        "social": 0.45,
        "happiness": 0.1
      },
      "lossesMonthly": {
        "money": -0.08
      },
      "costMonthlyRub": 1200,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_adult_12",
      "name": "Муниципальный общественный проект",
      "periodId": "adult",
      "ageFrom": 26,
      "ageTo": 40,
      "sexPreference": "both",
      "gainsMonthly": {
        "social": 0.45,
        "skills": 0.15
      },
      "lossesMonthly": {
        "mental": -0.16
      },
      "costMonthlyRub": 2500,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_adult_13",
      "name": "Творчество после работы",
      "periodId": "adult",
      "ageFrom": 26,
      "ageTo": 40,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.3,
        "happiness": 0.3
      },
      "lossesMonthly": {
        "health": -0.05
      },
      "costMonthlyRub": 3500,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_adult_14",
      "name": "Языковая практика",
      "periodId": "adult",
      "ageFrom": 26,
      "ageTo": 40,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.4,
        "social": 0.15
      },
      "lossesMonthly": {
        "mental": -0.06
      },
      "costMonthlyRub": 4000,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_adult_15",
      "name": "Психологическая поддержка",
      "periodId": "adult",
      "ageFrom": 26,
      "ageTo": 40,
      "sexPreference": "both",
      "gainsMonthly": {
        "mental": 0.5
      },
      "lossesMonthly": {
        "money": -0.12
      },
      "costMonthlyRub": 10000,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_adult_16",
      "name": "Отдых без переработок",
      "periodId": "adult",
      "ageFrom": 26,
      "ageTo": 40,
      "sexPreference": "both",
      "gainsMonthly": {
        "health": 0.2,
        "mental": 0.4
      },
      "lossesMonthly": {
        "money": -0.2
      },
      "costMonthlyRub": 3000,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_mature_01",
      "name": "Наставничество на работе",
      "periodId": "mature",
      "ageFrom": 41,
      "ageTo": 60,
      "sexPreference": "both",
      "gainsMonthly": {
        "social": 0.4,
        "skills": 0.2
      },
      "lossesMonthly": {
        "mental": -0.08
      },
      "costMonthlyRub": 1000,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_mature_02",
      "name": "Обновление профессиональных навыков",
      "periodId": "mature",
      "ageFrom": 41,
      "ageTo": 60,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.55
      },
      "lossesMonthly": {
        "mental": -0.12
      },
      "costMonthlyRub": 6000,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_mature_03",
      "name": "Собственное дело без расширения",
      "periodId": "mature",
      "ageFrom": 41,
      "ageTo": 60,
      "sexPreference": "both",
      "gainsMonthly": {
        "money": 0.25,
        "skills": 0.25
      },
      "lossesMonthly": {
        "mental": -0.2
      },
      "costMonthlyRub": 12000,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_mature_04",
      "name": "Силовые занятия с тренером",
      "periodId": "mature",
      "ageFrom": 41,
      "ageTo": 60,
      "sexPreference": "both",
      "gainsMonthly": {
        "health": 0.4
      },
      "lossesMonthly": {
        "mental": -0.05
      },
      "costMonthlyRub": 5000,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_mature_05",
      "name": "Ходьба и плавание",
      "periodId": "mature",
      "ageFrom": 41,
      "ageTo": 60,
      "sexPreference": "both",
      "gainsMonthly": {
        "health": 0.4,
        "mental": 0.2
      },
      "lossesMonthly": {
        "money": -0.04
      },
      "costMonthlyRub": 2500,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_mature_06",
      "name": "Поддержка взрослых детей",
      "periodId": "mature",
      "ageFrom": 41,
      "ageTo": 60,
      "sexPreference": "both",
      "gainsMonthly": {
        "social": 0.3,
        "happiness": 0.2
      },
      "lossesMonthly": {
        "mental": -0.08
      },
      "costMonthlyRub": 6000,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_mature_07",
      "name": "Уход за пожилыми родителями",
      "periodId": "mature",
      "ageFrom": 41,
      "ageTo": 60,
      "sexPreference": "both",
      "gainsMonthly": {
        "social": 0.25
      },
      "lossesMonthly": {
        "health": -0.12,
        "mental": -0.15
      },
      "costMonthlyRub": 5000,
      "quality": "[~] авторская игровая настройка",
      "when": {
        "parentAlive": true
      }
    },
    {
      "id": "fx_mature_08",
      "name": "Семейные поездки",
      "periodId": "mature",
      "ageFrom": 41,
      "ageTo": 60,
      "sexPreference": "both",
      "gainsMonthly": {
        "happiness": 0.35,
        "social": 0.25
      },
      "lossesMonthly": {
        "skills": -0.05
      },
      "costMonthlyRub": 12000,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_mature_09",
      "name": "Сад и огород",
      "periodId": "mature",
      "ageFrom": 41,
      "ageTo": 60,
      "sexPreference": "both",
      "gainsMonthly": {
        "health": 0.25,
        "happiness": 0.25
      },
      "lossesMonthly": {
        "mental": -0.04
      },
      "costMonthlyRub": 2500,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_mature_10",
      "name": "Планирование пенсии",
      "periodId": "mature",
      "ageFrom": 41,
      "ageTo": 60,
      "sexPreference": "both",
      "gainsMonthly": {
        "money": 0.3,
        "mental": 0.2
      },
      "lossesMonthly": {
        "happiness": -0.08
      },
      "costMonthlyRub": 500,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_mature_11",
      "name": "Местное самоуправление",
      "periodId": "mature",
      "ageFrom": 41,
      "ageTo": 60,
      "sexPreference": "both",
      "gainsMonthly": {
        "social": 0.5
      },
      "lossesMonthly": {
        "mental": -0.15
      },
      "costMonthlyRub": 3000,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_mature_12",
      "name": "Клуб по интересам",
      "periodId": "mature",
      "ageFrom": 41,
      "ageTo": 60,
      "sexPreference": "both",
      "gainsMonthly": {
        "social": 0.4,
        "mental": 0.2
      },
      "lossesMonthly": {
        "skills": -0.04
      },
      "costMonthlyRub": 1800,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_mature_13",
      "name": "Любительская музыка",
      "periodId": "mature",
      "ageFrom": 41,
      "ageTo": 60,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.25,
        "happiness": 0.3
      },
      "lossesMonthly": {
        "health": -0.03
      },
      "costMonthlyRub": 2500,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_mature_14",
      "name": "Семейный архив",
      "periodId": "mature",
      "ageFrom": 41,
      "ageTo": 60,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.25,
        "mental": 0.25
      },
      "lossesMonthly": {
        "social": -0.04
      },
      "costMonthlyRub": 1000,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_mature_15",
      "name": "Поддержание медицинского наблюдения",
      "periodId": "mature",
      "ageFrom": 41,
      "ageTo": 60,
      "sexPreference": "both",
      "gainsMonthly": {
        "health": 0.25,
        "mental": 0.15
      },
      "lossesMonthly": {
        "happiness": -0.04
      },
      "costMonthlyRub": 2000,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_mature_16",
      "name": "Снижение рабочей нагрузки",
      "periodId": "mature",
      "ageFrom": 41,
      "ageTo": 60,
      "sexPreference": "both",
      "gainsMonthly": {
        "health": 0.2,
        "mental": 0.4
      },
      "lossesMonthly": {
        "money": -0.25
      },
      "costMonthlyRub": 1000,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_senior_01",
      "name": "Скандинавская ходьба",
      "periodId": "senior",
      "ageFrom": 60,
      "ageTo": 110,
      "sexPreference": "both",
      "gainsMonthly": {
        "health": 0.35,
        "social": 0.15
      },
      "lossesMonthly": {
        "skills": -0.03
      },
      "costMonthlyRub": 800,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_senior_02",
      "name": "Гимнастика по возможностям",
      "periodId": "senior",
      "ageFrom": 60,
      "ageTo": 110,
      "sexPreference": "both",
      "gainsMonthly": {
        "health": 0.3,
        "mental": 0.15
      },
      "lossesMonthly": {
        "money": -0.03
      },
      "costMonthlyRub": 1000,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_senior_03",
      "name": "Университет третьего возраста",
      "periodId": "senior",
      "ageFrom": 60,
      "ageTo": 110,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.35,
        "social": 0.25
      },
      "lossesMonthly": {
        "mental": -0.04
      },
      "costMonthlyRub": 1000,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_senior_04",
      "name": "Шахматный клуб",
      "periodId": "senior",
      "ageFrom": 60,
      "ageTo": 110,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.3,
        "social": 0.25
      },
      "lossesMonthly": {
        "health": -0.05
      },
      "costMonthlyRub": 500,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_senior_05",
      "name": "Помощь внукам",
      "periodId": "senior",
      "ageFrom": 60,
      "ageTo": 110,
      "sexPreference": "both",
      "gainsMonthly": {
        "social": 0.35,
        "happiness": 0.3
      },
      "lossesMonthly": {
        "health": -0.1
      },
      "costMonthlyRub": 2000,
      "quality": "[~] авторская игровая настройка",
      "when": {
        "grandkids": {
          ">=": 1
        }
      }
    },
    {
      "id": "fx_senior_06",
      "name": "Встречи со взрослыми детьми",
      "periodId": "senior",
      "ageFrom": 60,
      "ageTo": 110,
      "sexPreference": "both",
      "gainsMonthly": {
        "social": 0.35,
        "happiness": 0.25
      },
      "lossesMonthly": {
        "money": -0.05
      },
      "costMonthlyRub": 2000,
      "quality": "[~] авторская игровая настройка",
      "when": {
        "kidsAlive": {
          ">=": 1
        }
      }
    },
    {
      "id": "fx_senior_07",
      "name": "Хор и музыкальный кружок",
      "periodId": "senior",
      "ageFrom": 60,
      "ageTo": 110,
      "sexPreference": "both",
      "gainsMonthly": {
        "social": 0.35,
        "mental": 0.25
      },
      "lossesMonthly": {
        "health": -0.03
      },
      "costMonthlyRub": 700,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_senior_08",
      "name": "Садовый участок",
      "periodId": "senior",
      "ageFrom": 60,
      "ageTo": 110,
      "sexPreference": "both",
      "gainsMonthly": {
        "health": 0.2,
        "happiness": 0.3
      },
      "lossesMonthly": {
        "mental": -0.04
      },
      "costMonthlyRub": 2500,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_senior_09",
      "name": "Краеведческий архив",
      "periodId": "senior",
      "ageFrom": 60,
      "ageTo": 110,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.3,
        "social": 0.15
      },
      "lossesMonthly": {
        "health": -0.03
      },
      "costMonthlyRub": 700,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_senior_10",
      "name": "Волонтёрская помощь по силам",
      "periodId": "senior",
      "ageFrom": 60,
      "ageTo": 110,
      "sexPreference": "both",
      "gainsMonthly": {
        "social": 0.4,
        "happiness": 0.2
      },
      "lossesMonthly": {
        "health": -0.08
      },
      "costMonthlyRub": 500,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_senior_11",
      "name": "Неспешные поездки",
      "periodId": "senior",
      "ageFrom": 60,
      "ageTo": 110,
      "sexPreference": "both",
      "gainsMonthly": {
        "happiness": 0.35,
        "social": 0.2
      },
      "lossesMonthly": {
        "mental": -0.06
      },
      "costMonthlyRub": 9000,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_senior_12",
      "name": "Цифровая грамотность",
      "periodId": "senior",
      "ageFrom": 60,
      "ageTo": 110,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.35,
        "social": 0.15
      },
      "lossesMonthly": {
        "mental": -0.04
      },
      "costMonthlyRub": 1000,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_senior_13",
      "name": "Домашнее творчество",
      "periodId": "senior",
      "ageFrom": 60,
      "ageTo": 110,
      "sexPreference": "both",
      "gainsMonthly": {
        "skills": 0.25,
        "happiness": 0.3
      },
      "lossesMonthly": {
        "social": -0.05
      },
      "costMonthlyRub": 1800,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_senior_14",
      "name": "Режим и плановый контроль здоровья",
      "periodId": "senior",
      "ageFrom": 60,
      "ageTo": 110,
      "sexPreference": "both",
      "gainsMonthly": {
        "health": 0.3,
        "mental": 0.2
      },
      "lossesMonthly": {
        "happiness": -0.04
      },
      "costMonthlyRub": 2000,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_senior_15",
      "name": "Продолжение работы по силам",
      "periodId": "senior",
      "ageFrom": 60,
      "ageTo": 110,
      "sexPreference": "both",
      "gainsMonthly": {
        "money": 0.25,
        "social": 0.2
      },
      "lossesMonthly": {
        "health": -0.12
      },
      "costMonthlyRub": 1000,
      "quality": "[~] авторская игровая настройка"
    },
    {
      "id": "fx_senior_16",
      "name": "Спокойная жизнь дома",
      "periodId": "senior",
      "ageFrom": 60,
      "ageTo": 110,
      "sexPreference": "both",
      "gainsMonthly": {
        "mental": 0.3,
        "happiness": 0.2
      },
      "lossesMonthly": {
        "social": -0.12
      },
      "costMonthlyRub": 500,
      "quality": "[~] авторская игровая настройка"
    }
  ]
};
