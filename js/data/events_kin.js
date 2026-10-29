/*
Семейные события: отдельный объект с совместимыми записями и обязательным when; ничего не исполняется.
Составлено: 2026-10-27.
Источник author: Авторские художественные ситуации; формат проверен по events_family.js и существующим facts — about:blank
[~] = оценка для игры; не официальное измерение. null = данных нет / неприменимо, не ноль.
Обычный справочник: подключение и применение выполняет потребитель данных.
*/
RL.DATA.eventsKin = {
  "meta": {
    "schemaVersion": 1,
    "compiledAt": "2026-10-27",
    "sources": [
      {
        "id": "author",
        "title": "Авторские художественные ситуации; формат проверен по events_family.js и существующим facts",
        "url": "about:blank",
        "kind": "authored"
      }
    ],
    "notes": [
      "Все тексты авторские. Вероятности и эффекты [~], не частоты семейных событий из опроса.",
      "Каждая запись содержит when и обычные choices/effects. Справочник не вызывает events.push и сам не включает события в игру.",
      "Используются только существующие факты age/hasPartner/kidsAlive/adultKids/parentAlive/siblings/grandkids и поддерживаемые эффекты.",
      "p — месячная базовая вероятность [~]; при будущем подключении нужен общий лимит событий, иначе десятки записей повысят суммарную частоту.",
      "cash — разовая сумма в рублях 2024 года, как в текущем движке. Учитывать бюджет при подключении.",
      "Условия не знают точного возраста каждого ребёнка/внука: тексты выбраны без жёстко заданного школьного возраста. Наличие родственника не доказывает его доступность."
    ]
  },
  "events": [
    {
      "id": "kin_shared_weekend",
      "title": "Выходной вдвоём",
      "when": {
        "age": [
          18,
          110
        ],
        "hasPartner": true
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "У вас впервые за месяц совпал свободный день. Хочется провести его вместе.",
      "choices": [
        {
          "text": "Пойти гулять без телефонов",
          "effects": {
            "spouseRelation": 4,
            "happiness": 2
          }
        },
        {
          "text": "Заняться своими делами",
          "effects": {
            "spouseRelation": -1
          }
        }
      ]
    },
    {
      "id": "kin_home_duties",
      "title": "Домашние обязанности",
      "when": {
        "age": [
          18,
          110
        ],
        "hasPartner": true
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "Вечером снова спор о том, кто убирает и готовит. Оба устали.",
      "choices": [
        {
          "text": "Составить удобный график",
          "effects": {
            "spouseRelation": 3,
            "mental": 1
          }
        },
        {
          "text": "Отложить разговор",
          "effects": {
            "spouseRelation": -2
          }
        }
      ]
    },
    {
      "id": "kin_partner_exam",
      "title": "Важный экзамен",
      "when": {
        "age": [
          18,
          110
        ],
        "hasPartner": true
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "У партнёра скоро экзамен на новую квалификацию. Дома постоянно конспекты.",
      "choices": [
        {
          "text": "Освободить вечер для подготовки",
          "effects": {
            "spouseRelation": 3,
            "mental": -1
          }
        },
        {
          "text": "Попросить оставить время семье",
          "effects": {
            "spouseRelation": -1,
            "mental": 1
          }
        }
      ]
    },
    {
      "id": "kin_partner_job",
      "title": "Предложение по работе",
      "when": {
        "age": [
          18,
          110
        ],
        "hasPartner": true
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "Партнёру предлагают новую должность с длинной дорогой до офиса.",
      "choices": [
        {
          "text": "Вместе посчитать время и расходы",
          "effects": {
            "spouseRelation": 3,
            "skills": 1
          }
        },
        {
          "text": "Пусть решение будет самостоятельным",
          "effects": {
            "spouseRelation": 1
          }
        }
      ]
    },
    {
      "id": "kin_shared_budget",
      "title": "Общий бюджет",
      "when": {
        "age": [
          18,
          110
        ],
        "hasPartner": true
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "Мелкие покупки незаметно съедают деньги на общие планы.",
      "choices": [
        {
          "text": "Сверить расходы без обвинений",
          "effects": {
            "spouseRelation": 3,
            "skills": 1
          }
        },
        {
          "text": "Ничего не обсуждать",
          "effects": {
            "spouseRelation": -2,
            "mental": -1
          }
        }
      ]
    },
    {
      "id": "kin_partner_hobby",
      "title": "Новое увлечение",
      "when": {
        "age": [
          18,
          110
        ],
        "hasPartner": true
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "У партнёра появился кружок по интересам. Несколько вечеров теперь заняты.",
      "choices": [
        {
          "text": "Поддержать и найти время для себя",
          "effects": {
            "spouseRelation": 3,
            "happiness": 1
          }
        },
        {
          "text": "Обижаться на отсутствие внимания",
          "effects": {
            "spouseRelation": -3
          }
        }
      ]
    },
    {
      "id": "kin_partner_ill",
      "title": "Домашний уход",
      "when": {
        "age": [
          18,
          110
        ],
        "hasPartner": true
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "Партнёр простудился: работа подождёт, а ужин и бытовые дела остались.",
      "choices": [
        {
          "text": "Взять дела на себя",
          "effects": {
            "spouseRelation": 4,
            "mental": -1
          }
        },
        {
          "text": "Помочь только с самым срочным",
          "effects": {
            "spouseRelation": 1
          }
        }
      ]
    },
    {
      "id": "kin_family_recipe",
      "title": "Семейный рецепт",
      "when": {
        "age": [
          18,
          110
        ],
        "hasPartner": true
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "Партнёр хочет приготовить блюдо из детства. Рецепт помнят только родственники.",
      "choices": [
        {
          "text": "Готовить и записывать вместе",
          "effects": {
            "spouseRelation": 3,
            "happiness": 2,
            "cash": -800
          }
        },
        {
          "text": "Заказать обычный ужин",
          "effects": {
            "cash": -1200
          }
        }
      ]
    },
    {
      "id": "kin_partner_friend",
      "title": "Встреча старых друзей",
      "when": {
        "age": [
          18,
          110
        ],
        "hasPartner": true
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "У партнёра встреча с давними друзьями. Тебя тоже приглашают.",
      "choices": [
        {
          "text": "Сходить и познакомиться",
          "effects": {
            "spouseRelation": 2,
            "social": 2,
            "cash": -1500
          }
        },
        {
          "text": "Пожелать хорошего вечера",
          "effects": {
            "spouseRelation": 1
          }
        }
      ]
    },
    {
      "id": "kin_small_anniversary",
      "title": "Маленькая годовщина",
      "when": {
        "age": [
          18,
          110
        ],
        "hasPartner": true
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "Вы вспоминаете день знакомства. Дорогих подарков никто не ждёт.",
      "choices": [
        {
          "text": "Написать тёплое письмо",
          "effects": {
            "spouseRelation": 4,
            "happiness": 2
          }
        },
        {
          "text": "Не придавать дате значения",
          "effects": {
            "spouseRelation": -1
          }
        }
      ]
    },
    {
      "id": "kin_partner_silence",
      "title": "Тихий вечер",
      "when": {
        "age": [
          18,
          110
        ],
        "hasPartner": true
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "Партнёр весь вечер молчит: тяжёлый день, разговор не клеится.",
      "choices": [
        {
          "text": "Спросить, какая поддержка нужна",
          "effects": {
            "spouseRelation": 3,
            "mental": 1
          }
        },
        {
          "text": "Требовать немедленного объяснения",
          "effects": {
            "spouseRelation": -3,
            "mental": -1
          }
        }
      ]
    },
    {
      "id": "kin_shared_repair",
      "title": "Мелкий ремонт",
      "when": {
        "age": [
          18,
          110
        ],
        "hasPartner": true
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "В квартире ломается полка. Заодно всплывают старые споры о ремонте.",
      "choices": [
        {
          "text": "Разделить задачи и починить",
          "effects": {
            "spouseRelation": 2,
            "skills": 2,
            "cash": -1200
          }
        },
        {
          "text": "Вызвать мастера по договорённости",
          "effects": {
            "spouseRelation": 1,
            "cash": -3500
          }
        }
      ]
    },
    {
      "id": "kin_kid_question",
      "title": "Неожиданный вопрос",
      "when": {
        "age": [
          20,
          110
        ],
        "kidsAlive": {
          ">=": 1
        }
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "Ребёнок спрашивает, почему у разных семей так по-разному устроена жизнь.",
      "choices": [
        {
          "text": "Поговорить спокойно и честно",
          "effects": {
            "social": 2,
            "happiness": 1
          }
        },
        {
          "text": "Ответить, что это сложно",
          "effects": {
            "mental": -1
          }
        }
      ]
    },
    {
      "id": "kin_kid_drawing",
      "title": "Рисунок в подарок",
      "when": {
        "age": [
          20,
          110
        ],
        "kidsAlive": {
          ">=": 1
        }
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "Ребёнок дарит рисунок: на нём вся семья и огромное солнце.",
      "choices": [
        {
          "text": "Найти рисунку место дома",
          "effects": {
            "happiness": 3
          }
        },
        {
          "text": "Убрать в папку на память",
          "effects": {
            "happiness": 1
          }
        }
      ]
    },
    {
      "id": "kin_kid_bad_day",
      "title": "Трудный день ребёнка",
      "when": {
        "age": [
          20,
          110
        ],
        "kidsAlive": {
          ">=": 1
        }
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "Ребёнок возвращается расстроенным и не хочет рассказывать подробности.",
      "choices": [
        {
          "text": "Побыть рядом без допроса",
          "effects": {
            "social": 2,
            "mental": 1
          }
        },
        {
          "text": "Сразу читать нотации",
          "effects": {
            "mental": -2
          }
        }
      ]
    },
    {
      "id": "kin_kid_books",
      "title": "Книги на выходные",
      "when": {
        "age": [
          20,
          110
        ],
        "kidsAlive": {
          ">=": 1
        }
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "Ребёнок просит помочь выбрать книгу. Хочется чего-то интереснее обязательного списка.",
      "choices": [
        {
          "text": "Сходить вместе в библиотеку",
          "effects": {
            "skills": 1,
            "happiness": 2
          }
        },
        {
          "text": "Купить по рекомендации",
          "effects": {
            "happiness": 1,
            "cash": -900
          }
        }
      ]
    },
    {
      "id": "kin_kid_club",
      "title": "Пробное занятие",
      "when": {
        "age": [
          20,
          110
        ],
        "kidsAlive": {
          ">=": 1
        }
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "Ребёнок хочет попробовать новый кружок. Обещать оплату на год пока рано.",
      "choices": [
        {
          "text": "Оплатить одно пробное занятие",
          "effects": {
            "happiness": 2,
            "cash": -1500
          }
        },
        {
          "text": "Найти бесплатное занятие",
          "effects": {
            "social": 1,
            "skills": 1
          }
        }
      ]
    },
    {
      "id": "kin_kid_apology",
      "title": "Семейная ссора",
      "when": {
        "age": [
          20,
          110
        ],
        "kidsAlive": {
          ">=": 1
        }
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "В споре с ребёнком прозвучали резкие слова. Теперь оба избегают разговора.",
      "choices": [
        {
          "text": "Извиниться за свой тон",
          "effects": {
            "mental": 1,
            "social": 2
          }
        },
        {
          "text": "Подождать первого шага",
          "effects": {
            "mental": -2
          }
        }
      ]
    },
    {
      "id": "kin_kid_cooking",
      "title": "Ужин вместе",
      "when": {
        "age": [
          20,
          110
        ],
        "kidsAlive": {
          ">=": 1
        }
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "Ребёнок предлагает помочь с ужином, хотя быстрее было бы сделать всё самостоятельно.",
      "choices": [
        {
          "text": "Готовить вместе",
          "effects": {
            "skills": 1,
            "happiness": 2,
            "cash": -500
          }
        },
        {
          "text": "Попросить накрыть на стол",
          "effects": {
            "happiness": 1
          }
        }
      ]
    },
    {
      "id": "kin_kid_money",
      "title": "Первый личный бюджет",
      "when": {
        "age": [
          20,
          110
        ],
        "kidsAlive": {
          ">=": 1
        }
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "Ребёнок спрашивает, как накопить на дорогую вещь.",
      "choices": [
        {
          "text": "Вместе составить простой план",
          "effects": {
            "skills": 2,
            "social": 1
          }
        },
        {
          "text": "Просто дать немного денег",
          "effects": {
            "cash": -2000,
            "happiness": 1
          }
        }
      ]
    },
    {
      "id": "kin_kid_tradition",
      "title": "Семейная традиция",
      "when": {
        "age": [
          20,
          110
        ],
        "kidsAlive": {
          ">=": 1
        }
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "Ребёнок предлагает каждое воскресенье играть вместе в настольную игру.",
      "choices": [
        {
          "text": "Выделить вечер для игры",
          "effects": {
            "happiness": 3,
            "social": 1
          }
        },
        {
          "text": "Договориться встречаться реже",
          "effects": {
            "happiness": 1
          }
        }
      ]
    },
    {
      "id": "kin_kid_privacy",
      "title": "Личное пространство",
      "when": {
        "age": [
          20,
          110
        ],
        "kidsAlive": {
          ">=": 1
        }
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "Ребёнок просит не пересказывать родственникам личные разговоры.",
      "choices": [
        {
          "text": "Уважить просьбу",
          "effects": {
            "social": 2,
            "mental": 1
          }
        },
        {
          "text": "Сказать, что родня должна всё знать",
          "effects": {
            "mental": -2
          }
        }
      ]
    },
    {
      "id": "kin_kid_broken",
      "title": "Случайная поломка",
      "when": {
        "age": [
          20,
          110
        ],
        "kidsAlive": {
          ">=": 1
        }
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "Ребёнок признаётся в сломанной вещи. Было страшно рассказать.",
      "choices": [
        {
          "text": "Обсудить ремонт без крика",
          "effects": {
            "skills": 1,
            "social": 2,
            "cash": -1800
          }
        },
        {
          "text": "Долго упрекать",
          "effects": {
            "mental": -2
          }
        }
      ]
    },
    {
      "id": "kin_kid_memory",
      "title": "Вечер воспоминаний",
      "when": {
        "age": [
          20,
          110
        ],
        "kidsAlive": {
          ">=": 1
        }
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "Ребёнок просит рассказать, каким было твоё детство.",
      "choices": [
        {
          "text": "Рассказать и достать фотографии",
          "effects": {
            "happiness": 3
          }
        },
        {
          "text": "Коротко ответить между делами",
          "effects": {
            "happiness": 1
          }
        }
      ]
    },
    {
      "id": "kin_adult_kid_move",
      "title": "Самостоятельный переезд",
      "when": {
        "age": [
          38,
          110
        ],
        "adultKids": {
          ">=": 1
        }
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "Взрослый ребёнок обсуждает переезд в другой город. Решение ещё не принято.",
      "choices": [
        {
          "text": "Помочь сравнить варианты",
          "effects": {
            "social": 2,
            "mental": -1
          }
        },
        {
          "text": "Настаивать остаться рядом",
          "effects": {
            "mental": -2
          }
        }
      ]
    },
    {
      "id": "kin_adult_kid_work",
      "title": "Первое серьёзное собеседование",
      "when": {
        "age": [
          38,
          110
        ],
        "adultKids": {
          ">=": 1
        }
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "Взрослый ребёнок просит порепетировать собеседование.",
      "choices": [
        {
          "text": "Выделить вечер на репетицию",
          "effects": {
            "skills": 1,
            "happiness": 2
          }
        },
        {
          "text": "Пожелать удачи без советов",
          "effects": {
            "happiness": 1
          }
        }
      ]
    },
    {
      "id": "kin_adult_kid_visit",
      "title": "Редкая встреча",
      "when": {
        "age": [
          38,
          110
        ],
        "adultKids": {
          ">=": 1
        }
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "Взрослый ребёнок приезжает ненадолго. Хочется обсудить всё сразу.",
      "choices": [
        {
          "text": "Оставить время просто побыть вместе",
          "effects": {
            "happiness": 3
          }
        },
        {
          "text": "Составить длинный список поручений",
          "effects": {
            "mental": -1
          }
        }
      ]
    },
    {
      "id": "kin_adult_kid_boundaries",
      "title": "Советы без запроса",
      "when": {
        "age": [
          38,
          110
        ],
        "adultKids": {
          ">=": 1
        }
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "Взрослый ребёнок прямо говорит, что постоянные советы утомляют.",
      "choices": [
        {
          "text": "Договориться о границах",
          "effects": {
            "social": 2,
            "mental": 1
          }
        },
        {
          "text": "Продолжать настаивать",
          "effects": {
            "mental": -2
          }
        }
      ]
    },
    {
      "id": "kin_adult_kid_help",
      "title": "Просьба о помощи",
      "when": {
        "age": [
          38,
          110
        ],
        "adultKids": {
          ">=": 1
        }
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "Взрослому ребёнку не хватает небольшой суммы на внезапный ремонт.",
      "choices": [
        {
          "text": "Помочь в пределах бюджета",
          "effects": {
            "cash": -5000,
            "happiness": 1
          }
        },
        {
          "text": "Вместе поискать другое решение",
          "effects": {
            "skills": 1,
            "social": 1
          }
        }
      ]
    },
    {
      "id": "kin_adult_kid_success",
      "title": "Хорошая новость",
      "when": {
        "age": [
          38,
          110
        ],
        "adultKids": {
          ">=": 1
        }
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "Взрослый ребёнок делится важным личным успехом.",
      "choices": [
        {
          "text": "Отпраздновать без сравнений с другими",
          "effects": {
            "happiness": 3,
            "cash": -1500
          }
        },
        {
          "text": "Отправить тёплое сообщение",
          "effects": {
            "happiness": 2
          }
        }
      ]
    },
    {
      "id": "kin_parent_photos",
      "title": "Старые фотографии",
      "when": {
        "age": [
          18,
          110
        ],
        "parentAlive": true
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "Родитель находит коробку фотографий. На обороте почти нигде нет подписей.",
      "choices": [
        {
          "text": "Записать имена и истории",
          "effects": {
            "skills": 1,
            "happiness": 2
          }
        },
        {
          "text": "Оставить на следующий раз",
          "effects": {
            "mental": -1
          }
        }
      ]
    },
    {
      "id": "kin_parent_phone",
      "title": "Долгий звонок",
      "when": {
        "age": [
          18,
          110
        ],
        "parentAlive": true
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "Родителю хочется подробно рассказать обычные новости. У тебя мало времени.",
      "choices": [
        {
          "text": "Договориться о спокойном разговоре вечером",
          "effects": {
            "social": 2,
            "mental": 1
          }
        },
        {
          "text": "Оборвать разговор",
          "effects": {
            "mental": -1
          }
        }
      ]
    },
    {
      "id": "kin_parent_papers",
      "title": "Документы в папке",
      "when": {
        "age": [
          18,
          110
        ],
        "parentAlive": true
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "Родитель просит помочь разобрать квитанции и документы.",
      "choices": [
        {
          "text": "Разложить и объяснить систему",
          "effects": {
            "skills": 2,
            "social": 1
          }
        },
        {
          "text": "Помочь только с одной срочной бумагой",
          "effects": {
            "skills": 1
          }
        }
      ]
    },
    {
      "id": "kin_parent_repair",
      "title": "Помощь по дому",
      "when": {
        "age": [
          18,
          110
        ],
        "parentAlive": true
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "У родителя протекает кран. Нужен ремонт, а не очередной спор о мелочах.",
      "choices": [
        {
          "text": "Найти мастера и согласовать время",
          "effects": {
            "cash": -3500,
            "mental": 1
          }
        },
        {
          "text": "Попробовать безопасный мелкий ремонт",
          "effects": {
            "skills": 1,
            "cash": -1000
          }
        }
      ]
    },
    {
      "id": "kin_parent_walk",
      "title": "Прогулка с родителем",
      "when": {
        "age": [
          18,
          110
        ],
        "parentAlive": true
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "Родитель зовёт пройтись по знакомому району и рассказать, что изменилось.",
      "choices": [
        {
          "text": "Пойти вместе",
          "effects": {
            "health": 1,
            "happiness": 2
          }
        },
        {
          "text": "Предложить чай дома",
          "effects": {
            "happiness": 1
          }
        }
      ]
    },
    {
      "id": "kin_parent_recipe",
      "title": "Записать рецепт",
      "when": {
        "age": [
          18,
          110
        ],
        "parentAlive": true
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "Родитель готовит семейное блюдо на глаз, без весов и записей.",
      "choices": [
        {
          "text": "Записать рецепт вместе",
          "effects": {
            "skills": 2,
            "happiness": 1
          }
        },
        {
          "text": "Просто поужинать вместе",
          "effects": {
            "happiness": 2
          }
        }
      ]
    },
    {
      "id": "kin_parent_independence",
      "title": "Помощь и самостоятельность",
      "when": {
        "age": [
          18,
          110
        ],
        "parentAlive": true
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "Родитель просит помогать без постоянного контроля каждого шага.",
      "choices": [
        {
          "text": "Обсудить удобные границы помощи",
          "effects": {
            "social": 2,
            "mental": 1
          }
        },
        {
          "text": "Начать всё решать самостоятельно",
          "effects": {
            "mental": -2
          }
        }
      ]
    },
    {
      "id": "kin_parent_checkup",
      "title": "Сопровождение на приём",
      "when": {
        "age": [
          18,
          110
        ],
        "parentAlive": true
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "Родителю назначен плановый приём. Нужна помощь с дорогой и записями.",
      "choices": [
        {
          "text": "Сопроводить по договорённости",
          "effects": {
            "social": 1,
            "mental": -1,
            "cash": -800
          }
        },
        {
          "text": "Помочь организовать транспорт",
          "effects": {
            "cash": -1800
          }
        }
      ]
    },
    {
      "id": "kin_parent_gift",
      "title": "Практичный подарок",
      "when": {
        "age": [
          18,
          110
        ],
        "parentAlive": true
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "Родитель говорит, что ничего не нужно, но старая настольная лампа едва работает.",
      "choices": [
        {
          "text": "Уточнить пожелания и выбрать вместе",
          "effects": {
            "happiness": 2,
            "cash": -2000
          }
        },
        {
          "text": "Подарить внимание и помощь",
          "effects": {
            "social": 2
          }
        }
      ]
    },
    {
      "id": "kin_parent_story",
      "title": "История семьи",
      "when": {
        "age": [
          18,
          110
        ],
        "parentAlive": true
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "Родитель рассказывает о родственниках, которых ты почти не помнишь.",
      "choices": [
        {
          "text": "Записать рассказ с разрешения",
          "effects": {
            "skills": 1,
            "happiness": 2
          }
        },
        {
          "text": "Послушать за чаем",
          "effects": {
            "happiness": 2
          }
        }
      ]
    },
    {
      "id": "kin_parent_visit",
      "title": "Запланированный визит",
      "when": {
        "age": [
          18,
          110
        ],
        "parentAlive": true
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "Дела снова вытесняют обещанную встречу с родителем.",
      "choices": [
        {
          "text": "Перенести другие планы",
          "effects": {
            "mental": 1,
            "happiness": 2
          }
        },
        {
          "text": "Честно согласовать новую дату",
          "effects": {
            "social": 1
          }
        }
      ]
    },
    {
      "id": "kin_parent_disagreement",
      "title": "Разные взгляды",
      "when": {
        "age": [
          18,
          110
        ],
        "parentAlive": true
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "С родителем расходятся взгляды на важный вопрос. Спор идёт по кругу.",
      "choices": [
        {
          "text": "Обозначить разногласие без оскорблений",
          "effects": {
            "social": 2,
            "mental": 1
          }
        },
        {
          "text": "Продолжать спор до ночи",
          "effects": {
            "mental": -3
          }
        }
      ]
    },
    {
      "id": "kin_sib_birthday",
      "title": "День рождения в семье",
      "when": {
        "age": [
          10,
          110
        ],
        "siblings": {
          ">=": 1
        }
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "Брат или сестра зовёт на день рождения. Можно обойтись без дорогого подарка.",
      "choices": [
        {
          "text": "Прийти с небольшим сюрпризом",
          "effects": {
            "happiness": 2,
            "cash": -1000
          }
        },
        {
          "text": "Поздравить лично по телефону",
          "effects": {
            "social": 1
          }
        }
      ]
    },
    {
      "id": "kin_sib_old_spat",
      "title": "Старая обида",
      "when": {
        "age": [
          10,
          110
        ],
        "siblings": {
          ">=": 1
        }
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "В разговоре с братом или сестрой всплывает детская ссора.",
      "choices": [
        {
          "text": "Выслушать другую сторону",
          "effects": {
            "mental": 1,
            "social": 2
          }
        },
        {
          "text": "Перевести всё в шутку",
          "effects": {
            "mental": -1
          }
        }
      ]
    },
    {
      "id": "kin_sib_project",
      "title": "Общее дело",
      "when": {
        "age": [
          10,
          110
        ],
        "siblings": {
          ">=": 1
        }
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "Брат или сестра предлагает вместе сделать небольшой семейный проект.",
      "choices": [
        {
          "text": "Разделить задачи заранее",
          "effects": {
            "skills": 2,
            "social": 1
          }
        },
        {
          "text": "Отказаться без обещаний",
          "effects": {
            "mental": 1
          }
        }
      ]
    },
    {
      "id": "kin_sib_help",
      "title": "Просьба о поддержке",
      "when": {
        "age": [
          10,
          110
        ],
        "siblings": {
          ">=": 1
        }
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "Брат или сестра просит просто выслушать после тяжёлого дня.",
      "choices": [
        {
          "text": "Выделить время на разговор",
          "effects": {
            "social": 2,
            "mental": -1
          }
        },
        {
          "text": "Предложить поговорить завтра",
          "effects": {
            "social": 1
          }
        }
      ]
    },
    {
      "id": "kin_sib_photo",
      "title": "Фото из детства",
      "when": {
        "age": [
          10,
          110
        ],
        "siblings": {
          ">=": 1
        }
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "Брат или сестра присылает забавную фотографию из детства.",
      "choices": [
        {
          "text": "Обменяться воспоминаниями",
          "effects": {
            "happiness": 2,
            "social": 1
          }
        },
        {
          "text": "Ответить коротко",
          "effects": {
            "happiness": 1
          }
        }
      ]
    },
    {
      "id": "kin_sib_meet",
      "title": "Встреча без повода",
      "when": {
        "age": [
          10,
          110
        ],
        "siblings": {
          ">=": 1
        }
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "С братом или сестрой давно не получалось встретиться без семейного праздника.",
      "choices": [
        {
          "text": "Назначить удобную прогулку",
          "effects": {
            "happiness": 2,
            "health": 1
          }
        },
        {
          "text": "Созвониться на выходных",
          "effects": {
            "social": 1
          }
        }
      ]
    },
    {
      "id": "kin_sib_boundary",
      "title": "Одолженная вещь",
      "when": {
        "age": [
          10,
          110
        ],
        "siblings": {
          ">=": 1
        }
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "Вещь, одолженная брату или сестре, долго не возвращается.",
      "choices": [
        {
          "text": "Спокойно напомнить и назвать срок",
          "effects": {
            "social": 1,
            "mental": 1
          }
        },
        {
          "text": "Молчать и копить раздражение",
          "effects": {
            "mental": -2
          }
        }
      ]
    },
    {
      "id": "kin_sib_reconcile",
      "title": "Мир после спора",
      "when": {
        "age": [
          10,
          110
        ],
        "siblings": {
          ">=": 1
        }
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "После семейного спора брат или сестра первым предлагает поговорить.",
      "choices": [
        {
          "text": "Встретиться и прояснить недоразумение",
          "effects": {
            "mental": 2,
            "social": 1
          }
        },
        {
          "text": "Попросить немного времени",
          "effects": {
            "mental": 1
          }
        }
      ]
    },
    {
      "id": "kin_sib_support",
      "title": "Семейные обязанности",
      "when": {
        "age": [
          18,
          110
        ],
        "siblings": {
          ">=": 1
        },
        "parentAlive": true
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "С братом или сестрой нужно согласовать помощь старшим родственникам.",
      "choices": [
        {
          "text": "Составить посильный график",
          "effects": {
            "skills": 1,
            "social": 2
          }
        },
        {
          "text": "Взять на себя всё без обсуждения",
          "effects": {
            "mental": -3
          }
        }
      ]
    },
    {
      "id": "kin_sib_hobby",
      "title": "Общее увлечение",
      "when": {
        "age": [
          10,
          110
        ],
        "siblings": {
          ">=": 1
        }
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "Оказывается, брат или сестра тоже увлекается твоим новым хобби.",
      "choices": [
        {
          "text": "Попробовать занятие вместе",
          "effects": {
            "happiness": 2,
            "skills": 1
          }
        },
        {
          "text": "Обменяться полезными ссылками",
          "effects": {
            "skills": 1
          }
        }
      ]
    },
    {
      "id": "kin_grandkid_story",
      "title": "Сказка по памяти",
      "when": {
        "age": [
          40,
          110
        ],
        "grandkids": {
          ">=": 1
        }
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "Внук или внучка просит рассказать историю из твоего детства.",
      "choices": [
        {
          "text": "Рассказать с забавными подробностями",
          "effects": {
            "happiness": 3,
            "mental": 1
          }
        },
        {
          "text": "Вместе почитать короткую книгу",
          "effects": {
            "happiness": 2
          }
        }
      ]
    },
    {
      "id": "kin_grandkid_game",
      "title": "Новая игра",
      "when": {
        "age": [
          40,
          110
        ],
        "grandkids": {
          ">=": 1
        }
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "Внук или внучка показывает игру, в которой тебе пока ничего не понятно.",
      "choices": [
        {
          "text": "Попросить научить",
          "effects": {
            "skills": 2,
            "happiness": 2
          }
        },
        {
          "text": "Предложить знакомую настольную игру",
          "effects": {
            "social": 1,
            "happiness": 1
          }
        }
      ]
    },
    {
      "id": "kin_grandkid_walk",
      "title": "Прогулка поколений",
      "when": {
        "age": [
          40,
          110
        ],
        "grandkids": {
          ">=": 1
        }
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "Внуки зовут на прогулку. Маршрут можно выбрать по силам.",
      "choices": [
        {
          "text": "Пойти по короткому маршруту",
          "effects": {
            "health": 1,
            "happiness": 2
          }
        },
        {
          "text": "Поиграть вместе дома",
          "effects": {
            "happiness": 2
          }
        }
      ]
    },
    {
      "id": "kin_grandkid_gift",
      "title": "Подарок без соревнования",
      "when": {
        "age": [
          40,
          110
        ],
        "grandkids": {
          ">=": 1
        }
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "Внук или внучка просит дорогую вещь, которую семье трудно купить.",
      "choices": [
        {
          "text": "Обсудить доступную альтернативу",
          "effects": {
            "social": 2,
            "skills": 1
          }
        },
        {
          "text": "Сделать небольшой подарок",
          "effects": {
            "happiness": 1,
            "cash": -2000
          }
        }
      ]
    },
    {
      "id": "kin_grandkid_parents",
      "title": "Правила родителей",
      "when": {
        "age": [
          40,
          110
        ],
        "grandkids": {
          ">=": 1
        }
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "С родителями внуков расходятся представления о режиме и сладостях.",
      "choices": [
        {
          "text": "Согласовать общие правила",
          "effects": {
            "social": 2,
            "mental": 1
          }
        },
        {
          "text": "Нарушать правила тайком",
          "effects": {
            "mental": -2
          }
        }
      ]
    },
    {
      "id": "kin_grandkid_crafts",
      "title": "Поделка вместе",
      "when": {
        "age": [
          40,
          110
        ],
        "grandkids": {
          ">=": 1
        }
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "Внуки предлагают сделать открытки для всей семьи.",
      "choices": [
        {
          "text": "Мастерить вместе",
          "effects": {
            "skills": 1,
            "happiness": 3,
            "cash": -500
          }
        },
        {
          "text": "Помочь выбрать материалы",
          "effects": {
            "happiness": 1,
            "cash": -800
          }
        }
      ]
    },
    {
      "id": "kin_grandkid_call",
      "title": "Видеозвонок",
      "when": {
        "age": [
          40,
          110
        ],
        "grandkids": {
          ">=": 1
        }
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "Внуки живут далеко и предлагают регулярный короткий видеозвонок.",
      "choices": [
        {
          "text": "Освоить связь и выбрать время",
          "effects": {
            "skills": 1,
            "social": 2
          }
        },
        {
          "text": "Начать с обычных звонков",
          "effects": {
            "social": 1
          }
        }
      ]
    },
    {
      "id": "kin_grandkid_rest",
      "title": "Время на отдых",
      "when": {
        "age": [
          40,
          110
        ],
        "grandkids": {
          ">=": 1
        }
      },
      "p": 0.0025,
      "cooldown": 48,
      "text": "После дня с внуками чувствуется усталость. Нужен посильный режим помощи.",
      "choices": [
        {
          "text": "Договориться о более коротких встречах",
          "effects": {
            "mental": 2,
            "health": 1
          }
        },
        {
          "text": "Соглашаться на всё через силу",
          "effects": {
            "health": -2,
            "mental": -2
          }
        }
      ]
    }
  ]
};
