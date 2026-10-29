/*
Отчёт вычитки рода: отдельные текстовые замены в существующих событиях.
Составлено: 2026-10-27.
Источник local: Исходные авторские события проекта — js/data/events*.js
[~] = оценка для игры; не официальное измерение. null = данных нет / неприменимо, не ноль.
Обычный справочник: подключение и применение выполняет потребитель данных.
*/
RL.DATA.genderAudit = {
  "meta": {
    "schemaVersion": 1,
    "compiledAt": "2026-10-27",
    "sources": [
      {
        "id": "local",
        "title": "Исходные авторские события проекта",
        "url": "js/data/events*.js",
        "kind": "project"
      }
    ],
    "notes": [
      "Ручная вычитка и поиск скобочных сокращений / мужского рода в репликах персонажа. Вероятности, условия, эффекты и числовые настройки не менялись.",
      "Мужской и женский варианты относятся к игроку. Для партнёра используется нейтральная фраза, поскольку его пол нельзя выбирать по полу игрока.",
      "Названия причин смерти не проходят через шаблонизатор: фраза о падении из окна сделана нейтральной вместо добавления скобок."
    ]
  },
  "scannedFiles": [
    "events.js",
    "events_adult.js",
    "events_family.js",
    "events_old.js",
    "events_teen.js",
    "events_young.js"
  ],
  "patchedFiles": [
    "events.js",
    "events_adult.js",
    "events_family.js",
    "events_old.js",
    "events_teen.js",
    "events_young.js"
  ],
  "changes": [
    {
      "file": "js/data/events.js",
      "before": "Тебя поймал куст под окном — переломы, но живой.",
      "after": "Тебя поймал куст под окном — переломы, но [живой|живая].",
      "occurrences": 1
    },
    {
      "file": "js/data/events.js",
      "before": "Падение с высоты (выпал из окна)",
      "after": "Падение из окна с высоты",
      "occurrences": 1
    },
    {
      "file": "js/data/events.js",
      "before": "\"title\":\"Потерялся\"",
      "after": "\"title\":\"[Потерялся|Потерялась]\"",
      "occurrences": 1
    },
    {
      "file": "js/data/events_adult.js",
      "before": "Успел вывести с прибылью — повезло.",
      "after": "[Успел|Успела] вывести с прибылью — повезло.",
      "occurrences": 1
    },
    {
      "file": "js/data/events_adult.js",
      "before": "Проиграл. Штраф плюс юристы.",
      "after": "[Проиграл|Проиграла]. Штраф плюс юристы.",
      "occurrences": 1
    },
    {
      "file": "js/data/events_adult.js",
      "before": "Продал вовремя. Плюс.",
      "after": "[Продал|Продала] вовремя. Плюс.",
      "occurrences": 1
    },
    {
      "file": "js/data/events_family.js",
      "before": "Я не готов(а)",
      "after": "Я не [готов|готова]",
      "occurrences": 1
    },
    {
      "file": "js/data/events_family.js",
      "before": "Терпеть самому(ой)",
      "after": "Терпеть [самому|самой]",
      "occurrences": 1
    },
    {
      "file": "js/data/events_family.js",
      "before": "Поговорить с супругом",
      "after": "Поговорить с партнёром",
      "occurrences": 1
    },
    {
      "file": "js/data/events_family.js",
      "before": "Встал(а) на твою сторону.",
      "after": "Партнёр поддерживает тебя.",
      "occurrences": 1
    },
    {
      "file": "js/data/events_family.js",
      "before": "Партнёр опять пришёл пьяным. Деньги из семейного бюджета тают.",
      "after": "Партнёр снова возвращается домой в состоянии опьянения. Деньги из семейного бюджета тают.",
      "occurrences": 1
    },
    {
      "file": "js/data/events_family.js",
      "before": "Закодировался. Держится.",
      "after": "После лечения удаётся держаться.",
      "occurrences": 1
    },
    {
      "file": "js/data/events_old.js",
      "before": "Самому(ой) жить уже трудно: забываешь лекарства, однажды не выключил(а) газ.",
      "after": "[Самому|Самой] жить уже трудно: забываешь лекарства, однажды не [выключил|выключила] газ.",
      "occurrences": 1
    },
    {
      "file": "js/data/events_old.js",
      "before": "Жить одному(ой), пока можется",
      "after": "Жить [одному|одной], пока можется",
      "occurrences": 1
    },
    {
      "file": "js/data/events_teen.js",
      "before": "Обещать бросить самому",
      "after": "Обещать бросить [самому|самой]",
      "occurrences": 1
    },
    {
      "file": "js/data/events_teen.js",
      "before": "Отказаться — сам разберусь",
      "after": "Отказаться — [сам|сама] разберусь",
      "occurrences": 1
    },
    {
      "file": "js/data/events_teen.js",
      "before": "Перебрал. Соседи вызвали скорую — отравление, капельница.",
      "after": "[Перебрал|Перебрала]. Соседи вызвали скорую — отравление, капельница.",
      "occurrences": 1
    },
    {
      "file": "js/data/events_teen.js",
      "before": "\"text\":\"Поступил.\"",
      "after": "\"text\":\"[Поступил|Поступила].\"",
      "occurrences": 2
    },
    {
      "file": "js/data/events_teen.js",
      "before": "\"title\":\"Чужой\"",
      "after": "\"title\":\"[Чужой|Чужая]\"",
      "occurrences": 1
    },
    {
      "file": "js/data/events_young.js",
      "before": "Учить и сдавать самому",
      "after": "Учить и сдавать [самому|самой]",
      "occurrences": 1
    },
    {
      "file": "js/data/events_young.js",
      "before": "Сорвался на начальника и уволился.",
      "after": "[Сорвался|Сорвалась] на начальника и [уволился|уволилась].",
      "occurrences": 1
    },
    {
      "file": "js/data/events_young.js",
      "before": "Прошёл отбор и медкомиссию.",
      "after": "[Прошёл|Прошла] отбор и медкомиссию.",
      "occurrences": 1
    },
    {
      "file": "js/data/events_young.js",
      "before": "Сдал с первой!",
      "after": "[Сдал|Сдала] с первой!",
      "occurrences": 1
    },
    {
      "file": "js/data/events_young.js",
      "before": "Доехал. Повезло.",
      "after": "[Доехал|Доехала]. Повезло.",
      "occurrences": 1
    },
    {
      "file": "js/data/events_young.js",
      "before": "Влетел в столб. Реанимация.",
      "after": "[Влетел|Влетела] в столб. Реанимация.",
      "occurrences": 1
    }
  ]
};
