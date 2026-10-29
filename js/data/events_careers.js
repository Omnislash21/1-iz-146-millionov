/*
События по профессиям: авторские истории [~], 13 групп, 39 цепочек. Только данные.
Деньги: рубли 2024 года. Составлено 27.10.2026.
hh2024: hh.ru, обзор рынка труда 2024: методика зарплатных предложений — https://hh.ru/article/32527
taxi: Прокуратура Саратовской области: требования к водителям такси по 580-ФЗ — https://epp.genproc.gov.ru/ru/proc_64/activity/legal-education/explain/e685431/
med: Росздравнадзор: допуск к медицинской и фармацевтической деятельности — https://www.roszdravnadzor.gov.ru/medactivities/specialist
teacher: Департамент образования Костромской области: квалификация учителя и воспитателя — https://don.kostroma.gov.ru/kontakty/obrashcheniya-grazhdan/chasto-zadavaemye-voprosy.php
yandex: Яндекс: запуск Такси 26.10.2011, первоначально Москва — https://yandex.ru/company/news/2011-1026
[~] — авторская оценка для симуляции, не измеренная вероятность и не официальная тарифная ставка.
*/
RL.DATA.eventsCareers = {
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
        "id": "taxi",
        "title": "Прокуратура Саратовской области: требования к водителям такси по 580-ФЗ",
        "url": "https://epp.genproc.gov.ru/ru/proc_64/activity/legal-education/explain/e685431/",
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
        "id": "yandex",
        "title": "Яндекс: запуск Такси 26.10.2011, первоначально Москва",
        "url": "https://yandex.ru/company/news/2011-1026",
        "type": "primary_history"
      }
    ],
    "notes": [
      "78 авторских событий: по 6 на каждую из 13 групп. Это точное выполнение нормы 5–6; ориентир ≈100 в задании арифметически выше.",
      "39 пар: 39 событий ставят флаги, которые использует другое последующее событие. Доля таких начал — 50%. Все флаги имеют префикс cc_.",
      "Сюжеты, суммы, p, веса исходов и последствия [~]. Это художественная модель, а не частоты профессиональных нарушений или заболеваний.",
      "p — месячная вероятность при выполнении when. cooldown запрещает повтор, а не назначает задержку между разными событиями. once делает каждую запись однократной в жизни.",
      "Последующий сюжет требует ту же работу/эпоху и один из двух флагов начала. После разрешения ветки флаг снимается. Потеря работы может отложить продолжение.",
      "В условных исходах вес альтернативы обнуляется, если нет её флага. Предполагается, что в паре активен ровно один флаг; при внешнем редактировании сохранения это нужно сохранить.",
      "Учебные сюжеты не выдают права, аккредитацию, удостоверение или допуск. Получение документов проверяется системой профессий отдельно.",
      "Деньги — разовые суммы в RUB2024, не номинальные рубли 1990-х. Платные действия при подключении требуют бюджетной проверки.",
      "Яндекс.Такси назван только с 2012 года: запуск был 26.10.2011 в Москве, последующее региональное наличие нужно проверять отдельно. ЕГЭ — с 2009.",
      "Российские правовые обозначения bribe290/fraud159 используются с 1997 года; они передают дело системе права, а не автоматически устанавливают виновность.",
      "Период 2027–2035 — сценарное продолжение современных условий, не предсказание событий."
    ]
  },
  "groups": [
    {
      "id": "workers",
      "profs": [
        "laborer",
        "worker",
        "builder",
        "welder",
        "electrician",
        "mechanic",
        "rotation"
      ]
    },
    {
      "id": "service",
      "profs": [
        "seller",
        "cook",
        "hairdresser",
        "cleaner",
        "guard",
        "courier"
      ]
    },
    {
      "id": "drivers",
      "profs": [
        "driver"
      ]
    },
    {
      "id": "medicine",
      "profs": [
        "doctor",
        "nurse",
        "pharmacist"
      ]
    },
    {
      "id": "education",
      "profs": [
        "teacher",
        "kgteacher",
        "coach"
      ]
    },
    {
      "id": "uniform",
      "profs": [
        "police",
        "military",
        "firefighter"
      ]
    },
    {
      "id": "office",
      "profs": [
        "office",
        "accountant",
        "economist",
        "lawyer",
        "manager",
        "official"
      ]
    },
    {
      "id": "digital",
      "profs": [
        "it",
        "designer"
      ]
    },
    {
      "id": "research_media",
      "profs": [
        "scientist",
        "journalist",
        "psychologist"
      ]
    },
    {
      "id": "arts",
      "profs": [
        "actor",
        "musician",
        "artist"
      ]
    },
    {
      "id": "transport_agro",
      "profs": [
        "railway",
        "pilot",
        "agro"
      ]
    },
    {
      "id": "sport",
      "profs": [
        "athlete"
      ]
    },
    {
      "id": "politics",
      "profs": [
        "deputy"
      ]
    }
  ],
  "chains": [
    {
      "id": "cc_workers_arrears",
      "first": "cc_workers_arrears_start",
      "later": "cc_workers_arrears_later",
      "flags": [
        "cc_workers_arrears_a",
        "cc_workers_arrears_b"
      ],
      "delay": "Следующий подходящий месяц по p; фиксированный срок не задан."
    },
    {
      "id": "cc_workers_safety",
      "first": "cc_workers_safety_start",
      "later": "cc_workers_safety_later",
      "flags": [
        "cc_workers_safety_a",
        "cc_workers_safety_b"
      ],
      "delay": "Следующий подходящий месяц по p; фиксированный срок не задан."
    },
    {
      "id": "cc_workers_mentor",
      "first": "cc_workers_mentor_start",
      "later": "cc_workers_mentor_later",
      "flags": [
        "cc_workers_mentor_a",
        "cc_workers_mentor_b"
      ],
      "delay": "Следующий подходящий месяц по p; фиксированный срок не задан."
    },
    {
      "id": "cc_service_reviews",
      "first": "cc_service_reviews_start",
      "later": "cc_service_reviews_later",
      "flags": [
        "cc_service_reviews_a",
        "cc_service_reviews_b"
      ],
      "delay": "Следующий подходящий месяц по p; фиксированный срок не задан."
    },
    {
      "id": "cc_service_schedule",
      "first": "cc_service_schedule_start",
      "later": "cc_service_schedule_later",
      "flags": [
        "cc_service_schedule_a",
        "cc_service_schedule_b"
      ],
      "delay": "Следующий подходящий месяц по p; фиксированный срок не задан."
    },
    {
      "id": "cc_service_marketplace",
      "first": "cc_service_marketplace_start",
      "later": "cc_service_marketplace_later",
      "flags": [
        "cc_service_marketplace_a",
        "cc_service_marketplace_b"
      ],
      "delay": "Следующий подходящий месяц по p; фиксированный срок не задан."
    },
    {
      "id": "cc_drivers_taxi",
      "first": "cc_drivers_taxi_start",
      "later": "cc_drivers_taxi_later",
      "flags": [
        "cc_drivers_taxi_a",
        "cc_drivers_taxi_b"
      ],
      "delay": "Следующий подходящий месяц по p; фиксированный срок не задан."
    },
    {
      "id": "cc_drivers_fatigue",
      "first": "cc_drivers_fatigue_start",
      "later": "cc_drivers_fatigue_later",
      "flags": [
        "cc_drivers_fatigue_a",
        "cc_drivers_fatigue_b"
      ],
      "delay": "Следующий подходящий месяц по p; фиксированный срок не задан."
    },
    {
      "id": "cc_drivers_repair",
      "first": "cc_drivers_repair_start",
      "later": "cc_drivers_repair_later",
      "flags": [
        "cc_drivers_repair_a",
        "cc_drivers_repair_b"
      ],
      "delay": "Следующий подходящий месяц по p; фиксированный срок не задан."
    },
    {
      "id": "cc_medicine_audit",
      "first": "cc_medicine_audit_start",
      "later": "cc_medicine_audit_later",
      "flags": [
        "cc_medicine_audit_a",
        "cc_medicine_audit_b"
      ],
      "delay": "Следующий подходящий месяц по p; фиксированный срок не задан."
    },
    {
      "id": "cc_medicine_reorganization",
      "first": "cc_medicine_reorganization_start",
      "later": "cc_medicine_reorganization_later",
      "flags": [
        "cc_medicine_reorganization_a",
        "cc_medicine_reorganization_b"
      ],
      "delay": "Следующий подходящий месяц по p; фиксированный срок не задан."
    },
    {
      "id": "cc_medicine_qualification",
      "first": "cc_medicine_qualification_start",
      "later": "cc_medicine_qualification_later",
      "flags": [
        "cc_medicine_qualification_a",
        "cc_medicine_qualification_b"
      ],
      "delay": "Следующий подходящий месяц по p; фиксированный срок не задан."
    },
    {
      "id": "cc_education_ege",
      "first": "cc_education_ege_start",
      "later": "cc_education_ege_later",
      "flags": [
        "cc_education_ege_a",
        "cc_education_ege_b"
      ],
      "delay": "Следующий подходящий месяц по p; фиксированный срок не задан."
    },
    {
      "id": "cc_education_parents",
      "first": "cc_education_parents_start",
      "later": "cc_education_parents_later",
      "flags": [
        "cc_education_parents_a",
        "cc_education_parents_b"
      ],
      "delay": "Следующий подходящий месяц по p; фиксированный срок не задан."
    },
    {
      "id": "cc_education_project",
      "first": "cc_education_project_start",
      "later": "cc_education_project_later",
      "flags": [
        "cc_education_project_a",
        "cc_education_project_b"
      ],
      "delay": "Следующий подходящий месяц по p; фиксированный срок не задан."
    },
    {
      "id": "cc_uniform_report",
      "first": "cc_uniform_report_start",
      "later": "cc_uniform_report_later",
      "flags": [
        "cc_uniform_report_a",
        "cc_uniform_report_b"
      ],
      "delay": "Следующий подходящий месяц по p; фиксированный срок не задан."
    },
    {
      "id": "cc_uniform_gift",
      "first": "cc_uniform_gift_start",
      "later": "cc_uniform_gift_later",
      "flags": [
        "cc_uniform_gift_a",
        "cc_uniform_gift_b"
      ],
      "delay": "Следующий подходящий месяц по p; фиксированный срок не задан."
    },
    {
      "id": "cc_uniform_recovery",
      "first": "cc_uniform_recovery_start",
      "later": "cc_uniform_recovery_later",
      "flags": [
        "cc_uniform_recovery_a",
        "cc_uniform_recovery_b"
      ],
      "delay": "Следующий подходящий месяц по p; фиксированный срок не задан."
    },
    {
      "id": "cc_office_closing",
      "first": "cc_office_closing_start",
      "later": "cc_office_closing_later",
      "flags": [
        "cc_office_closing_a",
        "cc_office_closing_b"
      ],
      "delay": "Следующий подходящий месяц по p; фиксированный срок не задан."
    },
    {
      "id": "cc_office_expense",
      "first": "cc_office_expense_start",
      "later": "cc_office_expense_later",
      "flags": [
        "cc_office_expense_a",
        "cc_office_expense_b"
      ],
      "delay": "Следующий подходящий месяц по p; фиксированный срок не задан."
    },
    {
      "id": "cc_office_training",
      "first": "cc_office_training_start",
      "later": "cc_office_training_later",
      "flags": [
        "cc_office_training_a",
        "cc_office_training_b"
      ],
      "delay": "Следующий подходящий месяц по p; фиксированный срок не задан."
    },
    {
      "id": "cc_digital_scope",
      "first": "cc_digital_scope_start",
      "later": "cc_digital_scope_later",
      "flags": [
        "cc_digital_scope_a",
        "cc_digital_scope_b"
      ],
      "delay": "Следующий подходящий месяц по p; фиксированный срок не задан."
    },
    {
      "id": "cc_digital_access",
      "first": "cc_digital_access_start",
      "later": "cc_digital_access_later",
      "flags": [
        "cc_digital_access_a",
        "cc_digital_access_b"
      ],
      "delay": "Следующий подходящий месяц по p; фиксированный срок не задан."
    },
    {
      "id": "cc_digital_night_release",
      "first": "cc_digital_night_release_start",
      "later": "cc_digital_night_release_later",
      "flags": [
        "cc_digital_night_release_a",
        "cc_digital_night_release_b"
      ],
      "delay": "Следующий подходящий месяц по p; фиксированный срок не задан."
    },
    {
      "id": "cc_research_media_deadline",
      "first": "cc_research_media_deadline_start",
      "later": "cc_research_media_deadline_later",
      "flags": [
        "cc_research_media_deadline_a",
        "cc_research_media_deadline_b"
      ],
      "delay": "Следующий подходящий месяц по p; фиксированный срок не задан."
    },
    {
      "id": "cc_research_media_consent",
      "first": "cc_research_media_consent_start",
      "later": "cc_research_media_consent_later",
      "flags": [
        "cc_research_media_consent_a",
        "cc_research_media_consent_b"
      ],
      "delay": "Следующий подходящий месяц по p; фиксированный срок не задан."
    },
    {
      "id": "cc_research_media_supervision",
      "first": "cc_research_media_supervision_start",
      "later": "cc_research_media_supervision_later",
      "flags": [
        "cc_research_media_supervision_a",
        "cc_research_media_supervision_b"
      ],
      "delay": "Следующий подходящий месяц по p; фиксированный срок не задан."
    },
    {
      "id": "cc_arts_contract",
      "first": "cc_arts_contract_start",
      "later": "cc_arts_contract_later",
      "flags": [
        "cc_arts_contract_a",
        "cc_arts_contract_b"
      ],
      "delay": "Следующий подходящий месяц по p; фиксированный срок не задан."
    },
    {
      "id": "cc_arts_portfolio",
      "first": "cc_arts_portfolio_start",
      "later": "cc_arts_portfolio_later",
      "flags": [
        "cc_arts_portfolio_a",
        "cc_arts_portfolio_b"
      ],
      "delay": "Следующий подходящий месяц по p; фиксированный срок не задан."
    },
    {
      "id": "cc_arts_tour",
      "first": "cc_arts_tour_start",
      "later": "cc_arts_tour_later",
      "flags": [
        "cc_arts_tour_a",
        "cc_arts_tour_b"
      ],
      "delay": "Следующий подходящий месяц по p; фиксированный срок не задан."
    },
    {
      "id": "cc_transport_agro_inspection",
      "first": "cc_transport_agro_inspection_start",
      "later": "cc_transport_agro_inspection_later",
      "flags": [
        "cc_transport_agro_inspection_a",
        "cc_transport_agro_inspection_b"
      ],
      "delay": "Следующий подходящий месяц по p; фиксированный срок не задан."
    },
    {
      "id": "cc_transport_agro_weather",
      "first": "cc_transport_agro_weather_start",
      "later": "cc_transport_agro_weather_later",
      "flags": [
        "cc_transport_agro_weather_a",
        "cc_transport_agro_weather_b"
      ],
      "delay": "Следующий подходящий месяц по p; фиксированный срок не задан."
    },
    {
      "id": "cc_transport_agro_qualification",
      "first": "cc_transport_agro_qualification_start",
      "later": "cc_transport_agro_qualification_later",
      "flags": [
        "cc_transport_agro_qualification_a",
        "cc_transport_agro_qualification_b"
      ],
      "delay": "Следующий подходящий месяц по p; фиксированный срок не задан."
    },
    {
      "id": "cc_sport_pain",
      "first": "cc_sport_pain_start",
      "later": "cc_sport_pain_later",
      "flags": [
        "cc_sport_pain_a",
        "cc_sport_pain_b"
      ],
      "delay": "Следующий подходящий месяц по p; фиксированный срок не задан."
    },
    {
      "id": "cc_sport_advertising",
      "first": "cc_sport_advertising_start",
      "later": "cc_sport_advertising_later",
      "flags": [
        "cc_sport_advertising_a",
        "cc_sport_advertising_b"
      ],
      "delay": "Следующий подходящий месяц по p; фиксированный срок не задан."
    },
    {
      "id": "cc_sport_future",
      "first": "cc_sport_future_start",
      "later": "cc_sport_future_later",
      "flags": [
        "cc_sport_future_a",
        "cc_sport_future_b"
      ],
      "delay": "Следующий подходящий месяц по p; фиксированный срок не задан."
    },
    {
      "id": "cc_politics_appeal",
      "first": "cc_politics_appeal_start",
      "later": "cc_politics_appeal_later",
      "flags": [
        "cc_politics_appeal_a",
        "cc_politics_appeal_b"
      ],
      "delay": "Следующий подходящий месяц по p; фиксированный срок не задан."
    },
    {
      "id": "cc_politics_declaration",
      "first": "cc_politics_declaration_start",
      "later": "cc_politics_declaration_later",
      "flags": [
        "cc_politics_declaration_a",
        "cc_politics_declaration_b"
      ],
      "delay": "Следующий подходящий месяц по p; фиксированный срок не задан."
    },
    {
      "id": "cc_politics_budget",
      "first": "cc_politics_budget_start",
      "later": "cc_politics_budget_later",
      "flags": [
        "cc_politics_budget_a",
        "cc_politics_budget_b"
      ],
      "delay": "Следующий подходящий месяц по p; фиксированный срок не задан."
    }
  ],
  "events": [
    {
      "id": "cc_workers_arrears_start",
      "group": "workers",
      "title": "Зарплату снова задерживают",
      "text": "Ты [отработал|отработала] месяц, но в кассе снова обещают деньги позже. Коллеги обсуждают, как зафиксировать долг.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1992,
          2000
        ],
        "employed": true,
        "prof": [
          "laborer",
          "worker",
          "builder",
          "welder",
          "electrician",
          "mechanic",
          "rotation"
        ]
      },
      "p": 0.004,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Подать письменное обращение вместе с коллегами",
          "effects": {
            "social": 2,
            "mental": -1,
            "flag": "cc_workers_arrears_a"
          }
        },
        {
          "text": "Переждать и искать временные заказы",
          "effects": {
            "cash": 2500,
            "health": -1,
            "flag": "cc_workers_arrears_b"
          }
        }
      ]
    },
    {
      "id": "cc_workers_arrears_later",
      "group": "workers",
      "title": "Расчёт по долгам",
      "text": "На предприятии возвращаются к вопросу старых долгов. Тебе предлагают сверить начисления и ведомости.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1992,
          2000
        ],
        "employed": true,
        "prof": [
          "laborer",
          "worker",
          "builder",
          "welder",
          "electrician",
          "mechanic",
          "rotation"
        ],
        "any": [
          {
            "flag_cc_workers_arrears_a": true
          },
          {
            "flag_cc_workers_arrears_b": true
          }
        ]
      },
      "p": 0.006,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Проверить расчёт и сохранить документы",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_workers_arrears_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [сверил|сверила] расчёт: часть задолженности удалось получить.",
              "effects": {
                "cash": 7000,
                "skills": 1,
                "unflag": "cc_workers_arrears_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_workers_arrears_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [сверил|сверила] расчёт: часть задолженности удалось получить.",
              "effects": {
                "cash": 4500,
                "skills": 1,
                "unflag": "cc_workers_arrears_b"
              }
            }
          ]
        },
        {
          "text": "Принять выплату без подробной сверки",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_workers_arrears_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [получил|получила] часть денег, но расхождения остались неразобранными.",
              "effects": {
                "cash": 4000,
                "mental": 1,
                "unflag": "cc_workers_arrears_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_workers_arrears_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [получил|получила] часть денег, но расхождения остались неразобранными.",
              "effects": {
                "cash": 2500,
                "mental": 1,
                "unflag": "cc_workers_arrears_b"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "cc_workers_safety_start",
      "group": "workers",
      "title": "Смену торопят",
      "text": "Ты видишь неисправность в инструменте. Мастер просит закончить участок до обеда и обещает не забыть твою помощь.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "laborer",
          "worker",
          "builder",
          "welder",
          "electrician",
          "mechanic",
          "rotation"
        ]
      },
      "p": 0.004,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Остановить работу до замены инструмента",
          "effects": {
            "mental": -1,
            "skills": 1,
            "flag": "cc_workers_safety_a"
          }
        },
        {
          "text": "Потребовать исправный инструмент и взять другой участок",
          "effects": {
            "health": -1,
            "social": 1,
            "flag": "cc_workers_safety_b"
          }
        }
      ]
    },
    {
      "id": "cc_workers_safety_later",
      "group": "workers",
      "title": "Разбор безопасной смены",
      "text": "При внутреннем разборе вспоминают тот неисправный инструмент и то, как ты [поступил|поступила].",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "laborer",
          "worker",
          "builder",
          "welder",
          "electrician",
          "mechanic",
          "rotation"
        ],
        "any": [
          {
            "flag_cc_workers_safety_a": true
          },
          {
            "flag_cc_workers_safety_b": true
          }
        ]
      },
      "p": 0.006,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Объяснить решение и предложить порядок замены",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_workers_safety_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [обсудил|обсудила] проблему без обещаний работать с неисправным оборудованием.",
              "effects": {
                "social": 2,
                "skills": 2,
                "unflag": "cc_workers_safety_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_workers_safety_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [обсудил|обсудила] проблему без обещаний работать с неисправным оборудованием.",
              "effects": {
                "social": 1,
                "skills": 2,
                "unflag": "cc_workers_safety_b"
              }
            }
          ]
        },
        {
          "text": "Ограничиться кратким объяснением",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_workers_safety_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [дал|дала] объяснение; общую процедуру пока не изменили.",
              "effects": {
                "mental": 1,
                "unflag": "cc_workers_safety_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_workers_safety_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [дал|дала] объяснение; общую процедуру пока не изменили.",
              "effects": {
                "mental": 1,
                "unflag": "cc_workers_safety_b"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "cc_workers_mentor_start",
      "group": "workers",
      "title": "Новичок на участке",
      "text": "К тебе прикрепляют новичка. Ему трудно читать задания, а твой собственный объём никто не уменьшил.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "laborer",
          "worker",
          "builder",
          "welder",
          "electrician",
          "mechanic",
          "rotation"
        ]
      },
      "p": 0.004,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Договориться о времени на наставничество",
          "effects": {
            "skills": 2,
            "social": 1,
            "flag": "cc_workers_mentor_a"
          }
        },
        {
          "text": "Помогать только после своей смены",
          "effects": {
            "social": 1,
            "health": -1,
            "flag": "cc_workers_mentor_b"
          }
        }
      ]
    },
    {
      "id": "cc_workers_mentor_later",
      "group": "workers",
      "title": "Новая самостоятельная смена",
      "text": "Новичок уже берётся за работу самостоятельно и просит тебя оценить результат.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "laborer",
          "worker",
          "builder",
          "welder",
          "electrician",
          "mechanic",
          "rotation"
        ],
        "any": [
          {
            "flag_cc_workers_mentor_a": true
          },
          {
            "flag_cc_workers_mentor_b": true
          }
        ]
      },
      "p": 0.006,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Проверить вместе и объяснить ошибки",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_workers_mentor_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [разобрал|разобрала] ошибки до сдачи участка.",
              "effects": {
                "skills": 2,
                "social": 2,
                "unflag": "cc_workers_mentor_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_workers_mentor_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [разобрал|разобрала] ошибки до сдачи участка.",
              "effects": {
                "skills": 1,
                "social": 2,
                "unflag": "cc_workers_mentor_b"
              }
            }
          ]
        },
        {
          "text": "Попросить мастера провести итоговую проверку",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_workers_mentor_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [передал|передала] итоговую проверку ответственному мастеру.",
              "effects": {
                "mental": 1,
                "social": 1,
                "unflag": "cc_workers_mentor_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_workers_mentor_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [передал|передала] итоговую проверку ответственному мастеру.",
              "effects": {
                "mental": 2,
                "unflag": "cc_workers_mentor_b"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "cc_service_reviews_start",
      "group": "service",
      "title": "Претензия клиента",
      "text": "Клиент недоволен результатом и требует вернуть деньги. Ты ещё не [успел|успела] разобраться, что произошло.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "seller",
          "cook",
          "hairdresser",
          "cleaner",
          "guard",
          "courier"
        ]
      },
      "p": 0.004,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Зафиксировать претензию и проверить работу",
          "effects": {
            "mental": -1,
            "skills": 1,
            "flag": "cc_service_reviews_a"
          }
        },
        {
          "text": "Вернуть небольшую сумму ради мира",
          "effects": {
            "cash": -1800,
            "mental": 1,
            "flag": "cc_service_reviews_b"
          }
        }
      ]
    },
    {
      "id": "cc_service_reviews_later",
      "group": "service",
      "title": "Клиент возвращается",
      "text": "Та давняя претензия снова всплывает в разговоре с администратором и клиентом.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "seller",
          "cook",
          "hairdresser",
          "cleaner",
          "guard",
          "courier"
        ],
        "any": [
          {
            "flag_cc_service_reviews_a": true
          },
          {
            "flag_cc_service_reviews_b": true
          }
        ]
      },
      "p": 0.006,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Обсудить решение по документам",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_service_reviews_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [договорился|договорилась] о понятном решении без новых обещаний за чужой счёт.",
              "effects": {
                "skills": 2,
                "social": 2,
                "unflag": "cc_service_reviews_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_service_reviews_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [договорился|договорилась] о понятном решении без новых обещаний за чужой счёт.",
              "effects": {
                "social": 2,
                "unflag": "cc_service_reviews_b"
              }
            }
          ]
        },
        {
          "text": "Предложить ограниченную компенсацию",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_service_reviews_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [согласовал|согласовала] окончательный размер компенсации.",
              "effects": {
                "cash": -1200,
                "social": 1,
                "unflag": "cc_service_reviews_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_service_reviews_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [согласовал|согласовала] окончательный размер компенсации.",
              "effects": {
                "cash": -700,
                "social": 1,
                "unflag": "cc_service_reviews_b"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "cc_service_schedule_start",
      "group": "service",
      "title": "Вторая смена подряд",
      "text": "Коллега не вышел, и тебя просят закрыть ещё одну смену. Дома тоже есть планы.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "seller",
          "cook",
          "hairdresser",
          "cleaner",
          "guard",
          "courier"
        ]
      },
      "p": 0.004,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Согласиться при оформленной доплате",
          "effects": {
            "cash": 2500,
            "health": -2,
            "flag": "cc_service_schedule_a"
          }
        },
        {
          "text": "Отказаться от второй смены",
          "effects": {
            "mental": 2,
            "social": -1,
            "flag": "cc_service_schedule_b"
          }
        }
      ]
    },
    {
      "id": "cc_service_schedule_later",
      "group": "service",
      "title": "Новый график",
      "text": "При составлении графика руководитель вспоминает твой ответ на просьбу о второй смене.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "seller",
          "cook",
          "hairdresser",
          "cleaner",
          "guard",
          "courier"
        ],
        "any": [
          {
            "flag_cc_service_schedule_a": true
          },
          {
            "flag_cc_service_schedule_b": true
          }
        ]
      },
      "p": 0.006,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Заранее обозначить доступные часы",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_service_schedule_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [зафиксировал|зафиксировала] границы нагрузки и условия подмен.",
              "effects": {
                "mental": 2,
                "skills": 1,
                "unflag": "cc_service_schedule_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_service_schedule_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [зафиксировал|зафиксировала] границы нагрузки и условия подмен.",
              "effects": {
                "mental": 2,
                "social": 1,
                "unflag": "cc_service_schedule_b"
              }
            }
          ]
        },
        {
          "text": "Снова согласиться на подмены",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_service_schedule_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [взял|взяла] дополнительные часы, оставив меньше времени на отдых.",
              "effects": {
                "cash": 2200,
                "health": -2,
                "unflag": "cc_service_schedule_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_service_schedule_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [взял|взяла] дополнительные часы, оставив меньше времени на отдых.",
              "effects": {
                "cash": 1800,
                "health": -1,
                "unflag": "cc_service_schedule_b"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "cc_service_marketplace_start",
      "group": "service",
      "title": "Пиковый день выдачи",
      "text": "Заказов и возвратов слишком много. Электронная система зависает, а очередь растёт.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          2018,
          2035
        ],
        "employed": true,
        "prof": [
          "seller",
          "courier"
        ]
      },
      "p": 0.004,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Вести сверку каждого спорного заказа",
          "effects": {
            "skills": 2,
            "mental": -1,
            "flag": "cc_service_marketplace_a"
          }
        },
        {
          "text": "Попросить напарника принять часть очереди",
          "effects": {
            "social": 2,
            "flag": "cc_service_marketplace_b"
          }
        }
      ]
    },
    {
      "id": "cc_service_marketplace_later",
      "group": "service",
      "title": "Расхождение по заказу",
      "text": "После пикового дня приходит запрос о спорной выдаче. Нужно восстановить последовательность действий.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          2018,
          2035
        ],
        "employed": true,
        "prof": [
          "seller",
          "courier"
        ],
        "any": [
          {
            "flag_cc_service_marketplace_a": true
          },
          {
            "flag_cc_service_marketplace_b": true
          }
        ]
      },
      "p": 0.006,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Сверить доступные записи и дать объяснение",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_service_marketplace_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [восстановил|восстановила] события по имеющимся данным.",
              "effects": {
                "skills": 2,
                "mental": 1,
                "unflag": "cc_service_marketplace_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_service_marketplace_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [восстановил|восстановила] события по имеющимся данным.",
              "effects": {
                "skills": 1,
                "mental": -1,
                "unflag": "cc_service_marketplace_b"
              }
            }
          ]
        },
        {
          "text": "Попросить руководителя разобрать спор вместе",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_service_marketplace_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [подключил|подключила] руководителя к проверке вместо поспешного признания недостачи.",
              "effects": {
                "social": 1,
                "mental": 1,
                "unflag": "cc_service_marketplace_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_service_marketplace_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [подключил|подключила] руководителя к проверке вместо поспешного признания недостачи.",
              "effects": {
                "social": 2,
                "mental": 1,
                "unflag": "cc_service_marketplace_b"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "cc_drivers_taxi_start",
      "group": "drivers",
      "title": "Заказы из приложения",
      "text": "Ты узнаёшь о заказах через Яндекс.Такси. Сначала нужно проверить доступность сервиса и условия работы в твоём городе.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          2012,
          2035
        ],
        "employed": true,
        "prof": [
          "driver"
        ]
      },
      "p": 0.004,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Изучить расходы и требования перед подключением",
          "effects": {
            "skills": 2,
            "flag": "cc_drivers_taxi_a"
          }
        },
        {
          "text": "Остаться на привычных заказах",
          "effects": {
            "mental": 1,
            "flag": "cc_drivers_taxi_b"
          }
        }
      ]
    },
    {
      "id": "cc_drivers_taxi_later",
      "group": "drivers",
      "title": "Месяц поездок и расчётов",
      "text": "Ты возвращаешься к сравнению обычных заказов и работы через приложение.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          2012,
          2035
        ],
        "employed": true,
        "prof": [
          "driver"
        ],
        "any": [
          {
            "flag_cc_drivers_taxi_a": true
          },
          {
            "flag_cc_drivers_taxi_b": true
          }
        ]
      },
      "p": 0.006,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Посчитать доход после топлива и комиссий",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_drivers_taxi_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [сравнил|сравнила] именно остаток после расходов, а не оборот поездок.",
              "effects": {
                "skills": 2,
                "cash": 2500,
                "unflag": "cc_drivers_taxi_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_drivers_taxi_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [сравнил|сравнила] именно остаток после расходов, а не оборот поездок.",
              "effects": {
                "skills": 2,
                "unflag": "cc_drivers_taxi_b"
              }
            }
          ]
        },
        {
          "text": "Ограничить часы за рулём",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_drivers_taxi_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [оставил|оставила] время на отдых, даже если заказов хватает.",
              "effects": {
                "health": 2,
                "cash": -1000,
                "unflag": "cc_drivers_taxi_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_drivers_taxi_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [оставил|оставила] время на отдых, даже если заказов хватает.",
              "effects": {
                "health": 1,
                "unflag": "cc_drivers_taxi_b"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "cc_drivers_fatigue_start",
      "group": "drivers",
      "title": "Рейс после недосыпа",
      "text": "Перед рейсом ты чувствуешь, что не [выспался|выспалась]. Диспетчер торопит: клиент уже ждёт.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "driver"
        ]
      },
      "p": 0.004,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Сообщить о состоянии и перенести выезд",
          "effects": {
            "cash": -1500,
            "health": 1,
            "flag": "cc_drivers_fatigue_a"
          }
        },
        {
          "text": "Попросить подмену на часть маршрута",
          "effects": {
            "cash": -2500,
            "social": 1,
            "flag": "cc_drivers_fatigue_b"
          }
        }
      ]
    },
    {
      "id": "cc_drivers_fatigue_later",
      "group": "drivers",
      "title": "Спор о графике рейсов",
      "text": "После переноса и подмен диспетчер предлагает новый график. Теперь можно обсудить реальное время отдыха.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "driver"
        ],
        "any": [
          {
            "flag_cc_drivers_fatigue_a": true
          },
          {
            "flag_cc_drivers_fatigue_b": true
          }
        ]
      },
      "p": 0.006,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Согласовать посильный график",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_drivers_fatigue_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [согласовал|согласовала] график с перерывами и временем на сон.",
              "effects": {
                "health": 2,
                "mental": 1,
                "unflag": "cc_drivers_fatigue_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_drivers_fatigue_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [согласовал|согласовала] график с перерывами и временем на сон.",
              "effects": {
                "health": 2,
                "social": 1,
                "unflag": "cc_drivers_fatigue_b"
              }
            }
          ]
        },
        {
          "text": "Сократить число дальних рейсов",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_drivers_fatigue_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [снизил|снизила] нагрузку ценой части дохода.",
              "effects": {
                "cash": -2000,
                "health": 3,
                "unflag": "cc_drivers_fatigue_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_drivers_fatigue_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [снизил|снизила] нагрузку ценой части дохода.",
              "effects": {
                "cash": -1500,
                "health": 3,
                "unflag": "cc_drivers_fatigue_b"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "cc_drivers_repair_start",
      "group": "drivers",
      "title": "Машина просится в ремонт",
      "text": "Во время осмотра замечают износ детали. Машина пока едет, но откладывать замену рискованно.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "driver"
        ]
      },
      "p": 0.004,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Оформить простой и ремонт",
          "effects": {
            "cash": -7000,
            "skills": 1,
            "flag": "cc_drivers_repair_a"
          }
        },
        {
          "text": "Согласовать временную исправную замену машины",
          "effects": {
            "cash": -4000,
            "social": 1,
            "flag": "cc_drivers_repair_b"
          }
        }
      ]
    },
    {
      "id": "cc_drivers_repair_later",
      "group": "drivers",
      "title": "Следующий осмотр",
      "text": "На следующем осмотре проверяют, как ты [решил|решила] вопрос с изношенной деталью.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "driver"
        ],
        "any": [
          {
            "flag_cc_drivers_repair_a": true
          },
          {
            "flag_cc_drivers_repair_b": true
          }
        ]
      },
      "p": 0.006,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Сверить выполненные работы и документы",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_drivers_repair_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [проверил|проверила] результат ремонта и допуск машины к работе.",
              "effects": {
                "skills": 2,
                "health": 1,
                "unflag": "cc_drivers_repair_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_drivers_repair_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [проверил|проверила] результат ремонта и допуск машины к работе.",
              "effects": {
                "skills": 2,
                "unflag": "cc_drivers_repair_b"
              }
            }
          ]
        },
        {
          "text": "Заложить резерв на обслуживание",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_drivers_repair_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [отложил|отложила] деньги на обслуживание, чтобы меньше зависеть от внезапного простоя.",
              "effects": {
                "cash": -2500,
                "mental": 2,
                "unflag": "cc_drivers_repair_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_drivers_repair_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [отложил|отложила] деньги на обслуживание, чтобы меньше зависеть от внезапного простоя.",
              "effects": {
                "cash": -2500,
                "mental": 1,
                "unflag": "cc_drivers_repair_b"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "cc_medicine_audit_start",
      "group": "medicine",
      "title": "Ошибка в документах",
      "text": "В документах пациента обнаружено расхождение. Ты можешь уточнить запись по установленному порядку или отложить разбор.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "doctor",
          "nurse",
          "pharmacist"
        ]
      },
      "p": 0.004,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Сразу сообщить и оформить уточнение",
          "effects": {
            "skills": 2,
            "mental": -1,
            "flag": "cc_medicine_audit_a"
          }
        },
        {
          "text": "Отложить сверку до конца смены",
          "effects": {
            "mental": -1,
            "flag": "cc_medicine_audit_b"
          }
        }
      ]
    },
    {
      "id": "cc_medicine_audit_later",
      "group": "medicine",
      "title": "Проверка качества",
      "text": "Во время проверки возвращаются к тому расхождению в документах. Смотрят записи и порядок передачи информации.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "doctor",
          "nurse",
          "pharmacist"
        ],
        "any": [
          {
            "flag_cc_medicine_audit_a": true
          },
          {
            "flag_cc_medicine_audit_b": true
          }
        ]
      },
      "p": 0.006,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Подготовить объяснение и сверить первичные данные",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_medicine_audit_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [разобрал|разобрала] ситуацию с ответственными за качество помощи.",
              "effects": {
                "skills": 2,
                "mental": 1,
                "unflag": "cc_medicine_audit_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_medicine_audit_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [разобрал|разобрала] ситуацию с ответственными за качество помощи.",
              "effects": {
                "skills": 1,
                "mental": -2,
                "unflag": "cc_medicine_audit_b"
              }
            }
          ]
        },
        {
          "text": "Попросить коллегу помочь восстановить записи",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_medicine_audit_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [привлёк|привлекла] коллегу к сверке, сохраняя врачебную тайну.",
              "effects": {
                "social": 2,
                "mental": 1,
                "unflag": "cc_medicine_audit_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_medicine_audit_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [привлёк|привлекла] коллегу к сверке, сохраняя врачебную тайну.",
              "effects": {
                "social": 1,
                "mental": -1,
                "unflag": "cc_medicine_audit_b"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "cc_medicine_reorganization_start",
      "group": "medicine",
      "title": "Отделение укрупняют",
      "text": "После реорганизации часть сотрудников переводят, а у оставшихся растут очереди и число дежурств.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          2010,
          2035
        ],
        "employed": true,
        "prof": [
          "doctor",
          "nurse",
          "pharmacist"
        ]
      },
      "p": 0.004,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Обсудить нагрузку и оформить замечания",
          "effects": {
            "social": 2,
            "mental": -1,
            "flag": "cc_medicine_reorganization_a"
          }
        },
        {
          "text": "Временно согласиться на дополнительные часы",
          "effects": {
            "cash": 4000,
            "health": -2,
            "flag": "cc_medicine_reorganization_b"
          }
        }
      ]
    },
    {
      "id": "cc_medicine_reorganization_later",
      "group": "medicine",
      "title": "Пересмотр дежурств",
      "text": "Руководство снова собирает предложения по дежурствам после укрупнения подразделения.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          2010,
          2035
        ],
        "employed": true,
        "prof": [
          "doctor",
          "nurse",
          "pharmacist"
        ],
        "any": [
          {
            "flag_cc_medicine_reorganization_a": true
          },
          {
            "flag_cc_medicine_reorganization_b": true
          }
        ]
      },
      "p": 0.006,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Предложить конкретный предел нагрузки",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_medicine_reorganization_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [добился|добилась] обсуждения нагрузки в расписании.",
              "effects": {
                "mental": 2,
                "social": 1,
                "unflag": "cc_medicine_reorganization_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_medicine_reorganization_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [добился|добилась] обсуждения нагрузки в расписании.",
              "effects": {
                "mental": 2,
                "health": 1,
                "unflag": "cc_medicine_reorganization_b"
              }
            }
          ]
        },
        {
          "text": "Выбрать меньше часов и больше восстановления",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_medicine_reorganization_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [сократил|сократила] подработки ради восстановления.",
              "effects": {
                "cash": -2500,
                "health": 2,
                "unflag": "cc_medicine_reorganization_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_medicine_reorganization_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [сократил|сократила] подработки ради восстановления.",
              "effects": {
                "cash": -3000,
                "health": 3,
                "unflag": "cc_medicine_reorganization_b"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "cc_medicine_qualification_start",
      "group": "medicine",
      "title": "Подтверждение квалификации",
      "text": "Подходит срок подтверждения профессионального допуска. Учебные модули придётся совместить с обычной работой.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          2000,
          2035
        ],
        "employed": true,
        "prof": [
          "doctor",
          "nurse",
          "pharmacist"
        ]
      },
      "p": 0.004,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Заранее собрать сведения и пройти обучение",
          "effects": {
            "cash": -3000,
            "skills": 2,
            "flag": "cc_medicine_qualification_a"
          }
        },
        {
          "text": "Попросить работодателя выделить учебное время",
          "effects": {
            "social": 1,
            "skills": 1,
            "flag": "cc_medicine_qualification_b"
          }
        }
      ]
    },
    {
      "id": "cc_medicine_qualification_later",
      "group": "medicine",
      "title": "Проверка документов допуска",
      "text": "Кадровая служба проверяет документы, относящиеся к твоему профессиональному допуску.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          2000,
          2035
        ],
        "employed": true,
        "prof": [
          "doctor",
          "nurse",
          "pharmacist"
        ],
        "any": [
          {
            "flag_cc_medicine_qualification_a": true
          },
          {
            "flag_cc_medicine_qualification_b": true
          }
        ]
      },
      "p": 0.006,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Сверить документы и пройти недостающий этап",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_medicine_qualification_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [проверил|проверила] комплектность документов; само событие не выдаёт медицинский допуск.",
              "effects": {
                "skills": 2,
                "cash": -1200,
                "unflag": "cc_medicine_qualification_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_medicine_qualification_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [проверил|проверила] комплектность документов; само событие не выдаёт медицинский допуск.",
              "effects": {
                "skills": 2,
                "cash": -1800,
                "unflag": "cc_medicine_qualification_b"
              }
            }
          ]
        },
        {
          "text": "Согласовать график обязательного обучения",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_medicine_qualification_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [согласовал|согласовала] обучение с рабочим расписанием.",
              "effects": {
                "social": 1,
                "mental": 1,
                "unflag": "cc_medicine_qualification_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_medicine_qualification_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [согласовал|согласовала] обучение с рабочим расписанием.",
              "effects": {
                "social": 2,
                "mental": 1,
                "unflag": "cc_medicine_qualification_b"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "cc_education_ege_start",
      "group": "education",
      "title": "Проверка экзаменационных работ",
      "text": "Тебя приглашают участвовать в работе, связанной с ЕГЭ. Нужны подготовка и время сверх обычных уроков.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          2009,
          2035
        ],
        "employed": true,
        "prof": [
          "teacher"
        ]
      },
      "p": 0.004,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Пройти подготовку и принять участие",
          "effects": {
            "skills": 3,
            "mental": -1,
            "flag": "cc_education_ege_a"
          }
        },
        {
          "text": "Оставить время на обычные классы",
          "effects": {
            "mental": 2,
            "flag": "cc_education_ege_b"
          }
        }
      ]
    },
    {
      "id": "cc_education_ege_later",
      "group": "education",
      "title": "Следующая экзаменационная кампания",
      "text": "Школа снова распределяет экзаменационную нагрузку и учитывает твой прошлый ответ.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          2009,
          2035
        ],
        "employed": true,
        "prof": [
          "teacher"
        ],
        "any": [
          {
            "flag_cc_education_ege_a": true
          },
          {
            "flag_cc_education_ege_b": true
          }
        ]
      },
      "p": 0.006,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Согласовать обязанности и оплату",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_education_ege_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [уточнил|уточнила] обязанности до начала экзаменационной работы.",
              "effects": {
                "skills": 2,
                "cash": 2000,
                "unflag": "cc_education_ege_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_education_ege_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [уточнил|уточнила] обязанности до начала экзаменационной работы.",
              "effects": {
                "skills": 1,
                "social": 1,
                "unflag": "cc_education_ege_b"
              }
            }
          ]
        },
        {
          "text": "Сосредоточиться на подготовке учеников",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_education_ege_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [выбрал|выбрала] работу с учениками, без обещания конкретных результатов экзамена.",
              "effects": {
                "skills": 2,
                "mental": -1,
                "unflag": "cc_education_ege_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_education_ege_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [выбрал|выбрала] работу с учениками, без обещания конкретных результатов экзамена.",
              "effects": {
                "skills": 2,
                "mental": 1,
                "unflag": "cc_education_ege_b"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "cc_education_parents_start",
      "group": "education",
      "title": "Родительская жалоба",
      "text": "Родитель считает твоё решение несправедливым и просит руководство вмешаться. Ребёнок тоже переживает.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "teacher",
          "kgteacher",
          "coach"
        ]
      },
      "p": 0.004,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Предложить встречу с понятными правилами разговора",
          "effects": {
            "social": 2,
            "mental": -1,
            "flag": "cc_education_parents_a"
          }
        },
        {
          "text": "Попросить администрацию вести официальный разбор",
          "effects": {
            "mental": 1,
            "flag": "cc_education_parents_b"
          }
        }
      ]
    },
    {
      "id": "cc_education_parents_later",
      "group": "education",
      "title": "Разговор после жалобы",
      "text": "На следующей встрече обсуждают, что изменилось после жалобы и как поддержать ребёнка.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "teacher",
          "kgteacher",
          "coach"
        ],
        "any": [
          {
            "flag_cc_education_parents_a": true
          },
          {
            "flag_cc_education_parents_b": true
          }
        ]
      },
      "p": 0.006,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Обсудить конкретные наблюдения без ярлыков",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_education_parents_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [объяснил|объяснила] решение и [выслушал|выслушала] другую сторону.",
              "effects": {
                "social": 2,
                "skills": 1,
                "unflag": "cc_education_parents_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_education_parents_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [объяснил|объяснила] решение и [выслушал|выслушала] другую сторону.",
              "effects": {
                "social": 2,
                "mental": 1,
                "unflag": "cc_education_parents_b"
              }
            }
          ]
        },
        {
          "text": "Подключить школьную или организационную службу поддержки",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_education_parents_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [предложил|предложила] помощь в пределах компетенций специалистов.",
              "effects": {
                "social": 1,
                "mental": 2,
                "unflag": "cc_education_parents_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_education_parents_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [предложил|предложила] помощь в пределах компетенций специалистов.",
              "effects": {
                "social": 2,
                "mental": 2,
                "unflag": "cc_education_parents_b"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "cc_education_project_start",
      "group": "education",
      "title": "Кружок после занятий",
      "text": "Тебе предлагают вести дополнительный кружок. Идея интересная, но время на подготовку никто не отменял.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "teacher",
          "kgteacher",
          "coach"
        ]
      },
      "p": 0.004,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Взять небольшую группу с понятным расписанием",
          "effects": {
            "skills": 2,
            "cash": 1500,
            "mental": -1,
            "flag": "cc_education_project_a"
          }
        },
        {
          "text": "Отказаться от дополнительной нагрузки",
          "effects": {
            "health": 1,
            "mental": 2,
            "flag": "cc_education_project_b"
          }
        }
      ]
    },
    {
      "id": "cc_education_project_later",
      "group": "education",
      "title": "Итоги учебного проекта",
      "text": "При подведении итогов руководство обсуждает, кому поручить дальнейшие занятия.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "teacher",
          "kgteacher",
          "coach"
        ],
        "any": [
          {
            "flag_cc_education_project_a": true
          },
          {
            "flag_cc_education_project_b": true
          }
        ]
      },
      "p": 0.006,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Предложить программу посильного объёма",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_education_project_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [представил|представила] программу, которую можно выполнить без постоянных переработок.",
              "effects": {
                "skills": 2,
                "social": 2,
                "unflag": "cc_education_project_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_education_project_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [представил|представила] программу, которую можно выполнить без постоянных переработок.",
              "effects": {
                "skills": 1,
                "social": 1,
                "unflag": "cc_education_project_b"
              }
            }
          ]
        },
        {
          "text": "Оставить только основную нагрузку",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_education_project_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [сохранил|сохранила] время на основные обязанности и отдых.",
              "effects": {
                "mental": 2,
                "cash": -1000,
                "unflag": "cc_education_project_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_education_project_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [сохранил|сохранила] время на основные обязанности и отдых.",
              "effects": {
                "mental": 2,
                "unflag": "cc_education_project_b"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "cc_uniform_report_start",
      "group": "uniform",
      "title": "Неудобный рапорт",
      "text": "Ты замечаешь, что в отчёте не отражён важный эпизод дежурства. Коллега просит не создавать лишних вопросов.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "police",
          "military",
          "firefighter"
        ]
      },
      "p": 0.004,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Добиваться точного отражения обстоятельств",
          "effects": {
            "skills": 1,
            "mental": -1,
            "flag": "cc_uniform_report_a"
          }
        },
        {
          "text": "Передать вопрос непосредственному руководителю письменно",
          "effects": {
            "social": 1,
            "mental": -1,
            "flag": "cc_uniform_report_b"
          }
        }
      ]
    },
    {
      "id": "cc_uniform_report_later",
      "group": "uniform",
      "title": "Служебный разбор",
      "text": "Во время разбора возвращаются к эпизоду из того отчёта и к твоим пояснениям.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "police",
          "military",
          "firefighter"
        ],
        "any": [
          {
            "flag_cc_uniform_report_a": true
          },
          {
            "flag_cc_uniform_report_b": true
          }
        ]
      },
      "p": 0.006,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Дать последовательное объяснение по документам",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_uniform_report_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [изложил|изложила] известные обстоятельства без подмены фактов.",
              "effects": {
                "skills": 2,
                "social": 1,
                "unflag": "cc_uniform_report_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_uniform_report_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [изложил|изложила] известные обстоятельства без подмены фактов.",
              "effects": {
                "skills": 2,
                "mental": 1,
                "unflag": "cc_uniform_report_b"
              }
            }
          ]
        },
        {
          "text": "Попросить консультацию представителя или юриста",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_uniform_report_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [подготовился|подготовилась] к разбору с помощью консультации.",
              "effects": {
                "cash": -2500,
                "mental": 2,
                "unflag": "cc_uniform_report_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_uniform_report_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [подготовился|подготовилась] к разбору с помощью консультации.",
              "effects": {
                "cash": -2500,
                "mental": 2,
                "unflag": "cc_uniform_report_b"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "cc_uniform_gift_start",
      "group": "uniform",
      "title": "Предложение «отблагодарить»",
      "text": "После обращения тебе предлагают деньги за выгодное служебное решение. Это связано с твоими полномочиями, а не с обычной благодарностью.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1997,
          2035
        ],
        "employed": true,
        "prof": [
          "police"
        ]
      },
      "p": 0.004,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Согласиться принять деньги",
          "effects": {
            "cash": 15000,
            "mental": -2,
            "flag": "cc_uniform_gift_a"
          }
        },
        {
          "text": "Отказаться и действовать по служебному порядку",
          "effects": {
            "mental": -1,
            "skills": 1,
            "flag": "cc_uniform_gift_b"
          }
        }
      ]
    },
    {
      "id": "cc_uniform_gift_later",
      "group": "uniform",
      "title": "Проверка служебного решения",
      "text": "Законность того служебного решения стала предметом проверки. Твои прежние действия имеют значение.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1997,
          2035
        ],
        "employed": true,
        "prof": [
          "police"
        ],
        "any": [
          {
            "flag_cc_uniform_gift_a": true
          },
          {
            "flag_cc_uniform_gift_b": true
          }
        ]
      },
      "p": 0.006,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Дать объяснение и воспользоваться защитой",
          "outcomes": [
            {
              "w": 0.92,
              "mods": [
                {
                  "if": {
                    "flag_cc_uniform_gift_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [участвовал|участвовала] в проверке; отказ от вознаграждения и фактические действия учитываются.",
              "effects": {
                "cash": -5000,
                "mental": -2,
                "unflag": "cc_uniform_gift_a"
              }
            },
            {
              "w": 0.08,
              "mods": [
                {
                  "if": {
                    "flag_cc_uniform_gift_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "По результатам проверки дело передано для правовой оценки. Последствия определяет отдельная система разбирательств.",
              "effects": {
                "cash": -5000,
                "mental": -5,
                "unflag": "cc_uniform_gift_a",
                "case": "bribe290"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_uniform_gift_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [участвовал|участвовала] в проверке; отказ от вознаграждения и фактические действия учитываются.",
              "effects": {
                "skills": 1,
                "mental": 1,
                "unflag": "cc_uniform_gift_b"
              }
            }
          ]
        },
        {
          "text": "Ограничиться формальным ответом",
          "outcomes": [
            {
              "w": 0.8,
              "mods": [
                {
                  "if": {
                    "flag_cc_uniform_gift_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [ответил|ответила] на запрос, не устранив все вопросы к документам.",
              "effects": {
                "mental": -4,
                "unflag": "cc_uniform_gift_a"
              }
            },
            {
              "w": 0.2,
              "mods": [
                {
                  "if": {
                    "flag_cc_uniform_gift_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "По результатам проверки дело передано для правовой оценки. Последствия определяет отдельная система разбирательств.",
              "effects": {
                "mental": -7,
                "unflag": "cc_uniform_gift_a",
                "case": "bribe290"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_uniform_gift_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [ответил|ответила] на запрос, не устранив все вопросы к документам.",
              "effects": {
                "mental": -1,
                "unflag": "cc_uniform_gift_b"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "cc_uniform_recovery_start",
      "group": "uniform",
      "title": "После тяжёлого дежурства",
      "text": "После сложного дежурства ты плохо спишь и раздражаешься по мелочам. Коллеги предлагают поговорить со специалистом.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "police",
          "military",
          "firefighter"
        ]
      },
      "p": 0.004,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Обратиться за доступной профессиональной поддержкой",
          "effects": {
            "mental": 2,
            "flag": "cc_uniform_recovery_a"
          }
        },
        {
          "text": "Попробовать восстановиться только отдыхом",
          "effects": {
            "health": 1,
            "flag": "cc_uniform_recovery_b"
          }
        }
      ]
    },
    {
      "id": "cc_uniform_recovery_later",
      "group": "uniform",
      "title": "Нагрузка возвращается",
      "text": "Перед новым циклом дежурств ты оцениваешь своё состояние и доступную поддержку.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "police",
          "military",
          "firefighter"
        ],
        "any": [
          {
            "flag_cc_uniform_recovery_a": true
          },
          {
            "flag_cc_uniform_recovery_b": true
          }
        ]
      },
      "p": 0.006,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Согласовать восстановление и дальнейшую помощь",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_uniform_recovery_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [обсудил|обсудила] посильную нагрузку; результат поддержки не гарантируется одним разговором.",
              "effects": {
                "mental": 3,
                "health": 1,
                "unflag": "cc_uniform_recovery_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_uniform_recovery_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [обсудил|обсудила] посильную нагрузку; результат поддержки не гарантируется одним разговором.",
              "effects": {
                "mental": 2,
                "health": 1,
                "unflag": "cc_uniform_recovery_b"
              }
            }
          ]
        },
        {
          "text": "Оставить график без изменений",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_uniform_recovery_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [вернулся|вернулась] к прежней нагрузке, и усталость снова накапливается.",
              "effects": {
                "mental": -2,
                "health": -1,
                "unflag": "cc_uniform_recovery_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_uniform_recovery_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [вернулся|вернулась] к прежней нагрузке, и усталость снова накапливается.",
              "effects": {
                "mental": -3,
                "health": -1,
                "unflag": "cc_uniform_recovery_b"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "cc_office_closing_start",
      "group": "office",
      "title": "Закрыть отчёт любой ценой",
      "text": "К вечеру в отчёте обнаруживается расхождение. Руководитель просит прислать итог до утра, хотя данные ещё не сверены.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "office",
          "accountant",
          "economist",
          "lawyer",
          "manager",
          "official"
        ]
      },
      "p": 0.004,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Зафиксировать расхождение и согласовать новый срок",
          "effects": {
            "skills": 2,
            "mental": -1,
            "flag": "cc_office_closing_a"
          }
        },
        {
          "text": "Остаться и сверить первичные документы",
          "effects": {
            "skills": 1,
            "health": -1,
            "flag": "cc_office_closing_b"
          }
        }
      ]
    },
    {
      "id": "cc_office_closing_later",
      "group": "office",
      "title": "Возврат к расчётам",
      "text": "На следующей проверке спрашивают, как были получены показатели того отчёта.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "office",
          "accountant",
          "economist",
          "lawyer",
          "manager",
          "official"
        ],
        "any": [
          {
            "flag_cc_office_closing_a": true
          },
          {
            "flag_cc_office_closing_b": true
          }
        ]
      },
      "p": 0.006,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Показать расчёт и исправления",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_office_closing_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [показал|показала] исходные данные и порядок сверки.",
              "effects": {
                "skills": 2,
                "social": 1,
                "unflag": "cc_office_closing_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_office_closing_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [показал|показала] исходные данные и порядок сверки.",
              "effects": {
                "skills": 2,
                "mental": 1,
                "unflag": "cc_office_closing_b"
              }
            }
          ]
        },
        {
          "text": "Попросить дополнительное время на восстановление расчёта",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_office_closing_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [получил|получила] ещё один срок, но часть работы пришлось повторить.",
              "effects": {
                "mental": -1,
                "unflag": "cc_office_closing_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_office_closing_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [получил|получила] ещё один срок, но часть работы пришлось повторить.",
              "effects": {
                "health": -1,
                "mental": -1,
                "unflag": "cc_office_closing_b"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "cc_office_expense_start",
      "group": "office",
      "title": "Личные расходы за счёт фирмы",
      "text": "Тебе предлагают сознательно предъявить заведомо фиктивные расходы и получить возмещение. Бумаги выглядят привычно, но расхода не было.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1997,
          2035
        ],
        "employed": true,
        "prof": [
          "office",
          "accountant",
          "economist",
          "manager"
        ]
      },
      "p": 0.004,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Согласиться на фиктивное возмещение",
          "effects": {
            "cash": 10000,
            "mental": -1,
            "flag": "cc_office_expense_a"
          }
        },
        {
          "text": "Отказаться от вымышленного расхода",
          "effects": {
            "skills": 1,
            "flag": "cc_office_expense_b"
          }
        }
      ]
    },
    {
      "id": "cc_office_expense_later",
      "group": "office",
      "title": "Сверка возмещений",
      "text": "При проверке возмещений запрашивают подтверждения по той операции.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1997,
          2035
        ],
        "employed": true,
        "prof": [
          "office",
          "accountant",
          "economist",
          "manager"
        ],
        "any": [
          {
            "flag_cc_office_expense_a": true
          },
          {
            "flag_cc_office_expense_b": true
          }
        ]
      },
      "p": 0.006,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Раскрыть обстоятельства и получить юридическую консультацию",
          "outcomes": [
            {
              "w": 0.92,
              "mods": [
                {
                  "if": {
                    "flag_cc_office_expense_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [объяснил|объяснила] свою роль; юридическая оценка зависит от фактических обстоятельств.",
              "effects": {
                "cash": -4000,
                "mental": -2,
                "unflag": "cc_office_expense_a"
              }
            },
            {
              "w": 0.08,
              "mods": [
                {
                  "if": {
                    "flag_cc_office_expense_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "По результатам проверки дело передано для правовой оценки. Последствия определяет отдельная система разбирательств.",
              "effects": {
                "cash": -4000,
                "mental": -5,
                "unflag": "cc_office_expense_a",
                "case": "fraud159"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_office_expense_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [объяснил|объяснила] свою роль; юридическая оценка зависит от фактических обстоятельств.",
              "effects": {
                "skills": 1,
                "mental": 1,
                "unflag": "cc_office_expense_b"
              }
            }
          ]
        },
        {
          "text": "Дать краткое объяснение без консультации",
          "outcomes": [
            {
              "w": 0.8,
              "mods": [
                {
                  "if": {
                    "flag_cc_office_expense_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [ответил|ответила] на вопросы проверяющих.",
              "effects": {
                "mental": -3,
                "unflag": "cc_office_expense_a"
              }
            },
            {
              "w": 0.2,
              "mods": [
                {
                  "if": {
                    "flag_cc_office_expense_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "По результатам проверки дело передано для правовой оценки. Последствия определяет отдельная система разбирательств.",
              "effects": {
                "mental": -6,
                "unflag": "cc_office_expense_a",
                "case": "fraud159"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_office_expense_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [ответил|ответила] на вопросы проверяющих.",
              "effects": {
                "mental": 1,
                "unflag": "cc_office_expense_b"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "cc_office_training_start",
      "group": "office",
      "title": "Новая система учёта",
      "text": "Организация меняет рабочую систему. Старые шаблоны больше не подходят, а на обучение дали мало времени.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "office",
          "accountant",
          "economist",
          "lawyer",
          "manager",
          "official"
        ]
      },
      "p": 0.004,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Пройти обучение и составить памятку",
          "effects": {
            "cash": -2000,
            "skills": 3,
            "flag": "cc_office_training_a"
          }
        },
        {
          "text": "Осваивать систему на обычных задачах",
          "effects": {
            "skills": 1,
            "mental": -1,
            "flag": "cc_office_training_b"
          }
        }
      ]
    },
    {
      "id": "cc_office_training_later",
      "group": "office",
      "title": "К тебе идут за помощью",
      "text": "Коллеги сталкиваются с той же системой и просят показать порядок работы.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "office",
          "accountant",
          "economist",
          "lawyer",
          "manager",
          "official"
        ],
        "any": [
          {
            "flag_cc_office_training_a": true
          },
          {
            "flag_cc_office_training_b": true
          }
        ]
      },
      "p": 0.006,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Выделить время на небольшой разбор",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_office_training_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [помог|помогла] коллегам и [проверил|проверила] собственные навыки.",
              "effects": {
                "social": 2,
                "skills": 1,
                "unflag": "cc_office_training_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_office_training_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [помог|помогла] коллегам и [проверил|проверила] собственные навыки.",
              "effects": {
                "social": 1,
                "skills": 2,
                "unflag": "cc_office_training_b"
              }
            }
          ]
        },
        {
          "text": "Помогать только по согласованным задачам",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_office_training_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [ограничил|ограничила] помощь, чтобы не сорвать свои сроки.",
              "effects": {
                "mental": 2,
                "unflag": "cc_office_training_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_office_training_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [ограничил|ограничила] помощь, чтобы не сорвать свои сроки.",
              "effects": {
                "mental": 1,
                "skills": 1,
                "unflag": "cc_office_training_b"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "cc_digital_scope_start",
      "group": "digital",
      "title": "Задание расползается",
      "text": "После согласования макета или функции заказчик добавляет ещё несколько требований без изменения сроков.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "it",
          "designer"
        ]
      },
      "p": 0.004,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Зафиксировать объём и пересогласовать срок",
          "effects": {
            "skills": 2,
            "social": 1,
            "flag": "cc_digital_scope_a"
          }
        },
        {
          "text": "Взять дополнительные задачи на себя",
          "effects": {
            "cash": 3000,
            "health": -1,
            "mental": -1,
            "flag": "cc_digital_scope_b"
          }
        }
      ]
    },
    {
      "id": "cc_digital_scope_later",
      "group": "digital",
      "title": "Поддержка после сдачи",
      "text": "После сдачи проекта заказчик снова обращается с доработками.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "it",
          "designer"
        ],
        "any": [
          {
            "flag_cc_digital_scope_a": true
          },
          {
            "flag_cc_digital_scope_b": true
          }
        ]
      },
      "p": 0.006,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Разделить исправления и новые работы",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_digital_scope_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [уточнил|уточнила] границы поддержки и стоимость нового объёма.",
              "effects": {
                "skills": 2,
                "cash": 2500,
                "unflag": "cc_digital_scope_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_digital_scope_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [уточнил|уточнила] границы поддержки и стоимость нового объёма.",
              "effects": {
                "skills": 2,
                "cash": 1500,
                "unflag": "cc_digital_scope_b"
              }
            }
          ]
        },
        {
          "text": "Сделать часть доработок без доплаты",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_digital_scope_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [потратил|потратила] дополнительное время ради отношений с заказчиком.",
              "effects": {
                "social": 1,
                "mental": -1,
                "unflag": "cc_digital_scope_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_digital_scope_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [потратил|потратила] дополнительное время ради отношений с заказчиком.",
              "effects": {
                "social": 1,
                "mental": -2,
                "unflag": "cc_digital_scope_b"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "cc_digital_access_start",
      "group": "digital",
      "title": "Доступ к рабочим данным",
      "text": "Для удобства тебе предлагают слишком широкий доступ к рабочим данным. Ты можешь потребовать ограничить права или отдельно согласовать выдачу.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1998,
          2035
        ],
        "employed": true,
        "prof": [
          "it",
          "designer"
        ]
      },
      "p": 0.004,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Запросить минимальные права для своей задачи",
          "effects": {
            "skills": 2,
            "flag": "cc_digital_access_a"
          }
        },
        {
          "text": "Оформить расширенный доступ через ответственного",
          "effects": {
            "social": 1,
            "skills": 1,
            "flag": "cc_digital_access_b"
          }
        }
      ]
    },
    {
      "id": "cc_digital_access_later",
      "group": "digital",
      "title": "Пересмотр доступов",
      "text": "При плановой проверке выясняют, кому и зачем выдавали доступ к проекту.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1998,
          2035
        ],
        "employed": true,
        "prof": [
          "it",
          "designer"
        ],
        "any": [
          {
            "flag_cc_digital_access_a": true
          },
          {
            "flag_cc_digital_access_b": true
          }
        ]
      },
      "p": 0.006,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Показать согласование и убрать лишние права",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_digital_access_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [привёл|привела] доступ в соответствие с текущими обязанностями.",
              "effects": {
                "skills": 2,
                "mental": 1,
                "unflag": "cc_digital_access_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_digital_access_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [привёл|привела] доступ в соответствие с текущими обязанностями.",
              "effects": {
                "skills": 2,
                "social": 1,
                "unflag": "cc_digital_access_b"
              }
            }
          ]
        },
        {
          "text": "Попросить администратора провести сверку вместе",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_digital_access_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [проверил|проверила] права вместе с ответственным специалистом.",
              "effects": {
                "social": 2,
                "unflag": "cc_digital_access_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_digital_access_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [проверил|проверила] права вместе с ответственным специалистом.",
              "effects": {
                "social": 2,
                "mental": 1,
                "unflag": "cc_digital_access_b"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "cc_digital_night_release_start",
      "group": "digital",
      "title": "Ночной релиз",
      "text": "Команда планирует выпуск ночью. У тебя уже несколько длинных рабочих дней подряд.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1998,
          2035
        ],
        "employed": true,
        "prof": [
          "it",
          "designer"
        ]
      },
      "p": 0.004,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Попросить сменное дежурство и план отката",
          "effects": {
            "skills": 2,
            "social": 1,
            "flag": "cc_digital_night_release_a"
          }
        },
        {
          "text": "Остаться на весь выпуск",
          "effects": {
            "cash": 2500,
            "health": -2,
            "flag": "cc_digital_night_release_b"
          }
        }
      ]
    },
    {
      "id": "cc_digital_night_release_later",
      "group": "digital",
      "title": "Дежурство после запуска",
      "text": "После запуска выясняется, сколько времени уходит на поддержку и исправления.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1998,
          2035
        ],
        "employed": true,
        "prof": [
          "it",
          "designer"
        ],
        "any": [
          {
            "flag_cc_digital_night_release_a": true
          },
          {
            "flag_cc_digital_night_release_b": true
          }
        ]
      },
      "p": 0.006,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Разделить дежурства и убрать лишние уведомления",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_digital_night_release_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [разграничил|разграничила] рабочее время и восстановление.",
              "effects": {
                "health": 2,
                "mental": 2,
                "unflag": "cc_digital_night_release_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_digital_night_release_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [разграничил|разграничила] рабочее время и восстановление.",
              "effects": {
                "health": 2,
                "mental": 2,
                "unflag": "cc_digital_night_release_b"
              }
            }
          ]
        },
        {
          "text": "Взять дополнительные оплачиваемые часы",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_digital_night_release_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [продолжил|продолжила] работу за доплату, сохранив нагрузку.",
              "effects": {
                "cash": 2200,
                "mental": -1,
                "unflag": "cc_digital_night_release_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_digital_night_release_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [продолжил|продолжила] работу за доплату, сохранив нагрузку.",
              "effects": {
                "cash": 2200,
                "health": -2,
                "unflag": "cc_digital_night_release_b"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "cc_research_media_deadline_start",
      "group": "research_media",
      "title": "Срок сдачи материала",
      "text": "Срок отчёта, публикации или профессионального заключения приближается. Часть фактов ещё требует проверки.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "scientist",
          "journalist",
          "psychologist"
        ]
      },
      "p": 0.004,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Согласовать дополнительную проверку",
          "effects": {
            "skills": 2,
            "mental": -1,
            "flag": "cc_research_media_deadline_a"
          }
        },
        {
          "text": "Сократить объём до проверенного",
          "effects": {
            "social": 1,
            "skills": 1,
            "flag": "cc_research_media_deadline_b"
          }
        }
      ]
    },
    {
      "id": "cc_research_media_deadline_later",
      "group": "research_media",
      "title": "Вопрос к опубликованному выводу",
      "text": "После сдачи материала приходит вопрос о границах твоих выводов.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "scientist",
          "journalist",
          "psychologist"
        ],
        "any": [
          {
            "flag_cc_research_media_deadline_a": true
          },
          {
            "flag_cc_research_media_deadline_b": true
          }
        ]
      },
      "p": 0.006,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Разобрать основания и уточнить формулировку",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_research_media_deadline_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [уточнил|уточнила], что подтверждается данными, а что остаётся предположением.",
              "effects": {
                "skills": 2,
                "social": 1,
                "unflag": "cc_research_media_deadline_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_research_media_deadline_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [уточнил|уточнила], что подтверждается данными, а что остаётся предположением.",
              "effects": {
                "skills": 2,
                "social": 2,
                "unflag": "cc_research_media_deadline_b"
              }
            }
          ]
        },
        {
          "text": "Ответить кратко и предложить отдельную проверку",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_research_media_deadline_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [обозначил|обозначила] пределы уже проделанной работы.",
              "effects": {
                "mental": 1,
                "unflag": "cc_research_media_deadline_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_research_media_deadline_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [обозначил|обозначила] пределы уже проделанной работы.",
              "effects": {
                "mental": 1,
                "skills": 1,
                "unflag": "cc_research_media_deadline_b"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "cc_research_media_consent_start",
      "group": "research_media",
      "title": "История реального человека",
      "text": "Ты собираешься использовать материал, по которому можно узнать конкретного человека. Нужно проверить согласие и условия конфиденциальности.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "scientist",
          "journalist",
          "psychologist"
        ]
      },
      "p": 0.004,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Уточнить согласие и убрать лишние детали",
          "effects": {
            "skills": 2,
            "social": 1,
            "flag": "cc_research_media_consent_a"
          }
        },
        {
          "text": "Отказаться от узнаваемого примера",
          "effects": {
            "mental": 1,
            "flag": "cc_research_media_consent_b"
          }
        }
      ]
    },
    {
      "id": "cc_research_media_consent_later",
      "group": "research_media",
      "title": "Просьба убрать личные сведения",
      "text": "Человек обращается к тебе с вопросом о том, как используется его история.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "scientist",
          "journalist",
          "psychologist"
        ],
        "any": [
          {
            "flag_cc_research_media_consent_a": true
          },
          {
            "flag_cc_research_media_consent_b": true
          }
        ]
      },
      "p": 0.006,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Проверить согласие и согласовать допустимый объём",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_research_media_consent_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [обсудил|обсудила] использование материала без давления на человека.",
              "effects": {
                "social": 2,
                "skills": 1,
                "unflag": "cc_research_media_consent_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_research_media_consent_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [обсудил|обсудила] использование материала без давления на человека.",
              "effects": {
                "social": 2,
                "unflag": "cc_research_media_consent_b"
              }
            }
          ]
        },
        {
          "text": "Исключить спорный фрагмент",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_research_media_consent_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [убрал|убрала] спорный фрагмент из дальнейшего использования.",
              "effects": {
                "skills": 1,
                "mental": 1,
                "unflag": "cc_research_media_consent_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_research_media_consent_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [убрал|убрала] спорный фрагмент из дальнейшего использования.",
              "effects": {
                "mental": 2,
                "unflag": "cc_research_media_consent_b"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "cc_research_media_supervision_start",
      "group": "research_media",
      "title": "Сложный случай для разбора",
      "text": "В работе возникает вопрос, на который у тебя нет уверенного ответа. Коллега предлагает профессиональный разбор с соблюдением конфиденциальности.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "scientist",
          "journalist",
          "psychologist"
        ]
      },
      "p": 0.004,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Подготовить обезличенный разбор",
          "effects": {
            "cash": -2000,
            "skills": 3,
            "flag": "cc_research_media_supervision_a"
          }
        },
        {
          "text": "Запросить узкую консультацию",
          "effects": {
            "cash": -1000,
            "skills": 1,
            "flag": "cc_research_media_supervision_b"
          }
        }
      ]
    },
    {
      "id": "cc_research_media_supervision_later",
      "group": "research_media",
      "title": "Похожая задача снова",
      "text": "Тебе снова попадается задача, похожая на ту, которую ты [разбирал|разбирала] с коллегами.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "scientist",
          "journalist",
          "psychologist"
        ],
        "any": [
          {
            "flag_cc_research_media_supervision_a": true
          },
          {
            "flag_cc_research_media_supervision_b": true
          }
        ]
      },
      "p": 0.006,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Проверить новый случай отдельно и применить подход",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_research_media_supervision_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [использовал|использовала] прежний опыт, не подменяя им новую проверку.",
              "effects": {
                "skills": 2,
                "mental": 1,
                "unflag": "cc_research_media_supervision_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_research_media_supervision_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [использовал|использовала] прежний опыт, не подменяя им новую проверку.",
              "effects": {
                "skills": 2,
                "unflag": "cc_research_media_supervision_b"
              }
            }
          ]
        },
        {
          "text": "Снова обратиться к профильному специалисту",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_research_media_supervision_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [получил|получила] дополнительное профессиональное мнение.",
              "effects": {
                "cash": -1500,
                "skills": 1,
                "unflag": "cc_research_media_supervision_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_research_media_supervision_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [получил|получила] дополнительное профессиональное мнение.",
              "effects": {
                "cash": -1500,
                "mental": 1,
                "unflag": "cc_research_media_supervision_b"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "cc_arts_contract_start",
      "group": "arts",
      "title": "Условия выступления",
      "text": "Организатор обещает гонорар после выступления или сдачи работы. В переписке пока нет ясных сроков и объёма прав.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "actor",
          "musician",
          "artist"
        ]
      },
      "p": 0.004,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Оформить условия письменно",
          "effects": {
            "skills": 2,
            "social": -1,
            "flag": "cc_arts_contract_a"
          }
        },
        {
          "text": "Согласовать небольшой аванс",
          "effects": {
            "cash": 3000,
            "social": 1,
            "flag": "cc_arts_contract_b"
          }
        }
      ]
    },
    {
      "id": "cc_arts_contract_later",
      "group": "arts",
      "title": "Окончательный расчёт",
      "text": "После работы организатор возвращается к вопросу оплаты и разрешённых способов использования результата.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "actor",
          "musician",
          "artist"
        ],
        "any": [
          {
            "flag_cc_arts_contract_a": true
          },
          {
            "flag_cc_arts_contract_b": true
          }
        ]
      },
      "p": 0.006,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Сверить согласованный объём и расчёт",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_arts_contract_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [уточнил|уточнила] остаток оплаты и права на использование работы.",
              "effects": {
                "cash": 6000,
                "skills": 1,
                "unflag": "cc_arts_contract_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_arts_contract_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [уточнил|уточнила] остаток оплаты и права на использование работы.",
              "effects": {
                "cash": 4500,
                "skills": 1,
                "unflag": "cc_arts_contract_b"
              }
            }
          ]
        },
        {
          "text": "Согласиться на меньшую сумму ради быстрого расчёта",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_arts_contract_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [получил|получила] деньги быстрее, уступив часть требований.",
              "effects": {
                "cash": 3500,
                "mental": 1,
                "unflag": "cc_arts_contract_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_arts_contract_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [получил|получила] деньги быстрее, уступив часть требований.",
              "effects": {
                "cash": 2500,
                "mental": 1,
                "unflag": "cc_arts_contract_b"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "cc_arts_portfolio_start",
      "group": "arts",
      "title": "Запись для портфолио",
      "text": "Тебе предлагают недорогую площадку для записи, съёмки или презентации работ. Без подготовки результат может не пригодиться.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "actor",
          "musician",
          "artist"
        ]
      },
      "p": 0.004,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Подготовить небольшой качественный материал",
          "effects": {
            "cash": -5000,
            "skills": 2,
            "flag": "cc_arts_portfolio_a"
          }
        },
        {
          "text": "Собрать портфолио из уже сделанного",
          "effects": {
            "skills": 1,
            "flag": "cc_arts_portfolio_b"
          }
        }
      ]
    },
    {
      "id": "cc_arts_portfolio_later",
      "group": "arts",
      "title": "Запрос от нового заказчика",
      "text": "Новый заказчик посмотрел твои материалы и просит предложить понятный вариант работы.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "actor",
          "musician",
          "artist"
        ],
        "any": [
          {
            "flag_cc_arts_portfolio_a": true
          },
          {
            "flag_cc_arts_portfolio_b": true
          }
        ]
      },
      "p": 0.006,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Оценить объём и предложить договор",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_arts_portfolio_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [согласовал|согласовала] посильный заказ без обещания постоянной занятости.",
              "effects": {
                "cash": 4000,
                "social": 2,
                "unflag": "cc_arts_portfolio_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_arts_portfolio_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [согласовал|согласовала] посильный заказ без обещания постоянной занятости.",
              "effects": {
                "cash": 2200,
                "social": 1,
                "unflag": "cc_arts_portfolio_b"
              }
            }
          ]
        },
        {
          "text": "Отказаться от неподходящего формата",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_arts_portfolio_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [оставил|оставила] место для более подходящих заказов.",
              "effects": {
                "mental": 2,
                "unflag": "cc_arts_portfolio_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_arts_portfolio_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [оставил|оставила] место для более подходящих заказов.",
              "effects": {
                "mental": 1,
                "unflag": "cc_arts_portfolio_b"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "cc_arts_tour_start",
      "group": "arts",
      "title": "Плотный выездной график",
      "text": "На выездные выступления и заказы набралось несколько дат подряд. Дорога и подготовка почти не оставляют свободных вечеров.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "actor",
          "musician",
          "artist"
        ]
      },
      "p": 0.004,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Оставить только посильные даты",
          "effects": {
            "mental": 2,
            "health": 1,
            "flag": "cc_arts_tour_a"
          }
        },
        {
          "text": "Принять весь график с понятными условиями оплаты",
          "effects": {
            "cash": 5000,
            "health": -2,
            "flag": "cc_arts_tour_b"
          }
        }
      ]
    },
    {
      "id": "cc_arts_tour_later",
      "group": "arts",
      "title": "Приглашение на следующий сезон",
      "text": "Организатор предлагает повторить выездной график и спрашивает, что изменить.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "actor",
          "musician",
          "artist"
        ],
        "any": [
          {
            "flag_cc_arts_tour_a": true
          },
          {
            "flag_cc_arts_tour_b": true
          }
        ]
      },
      "p": 0.006,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Заложить свободные дни и бытовые условия",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_arts_tour_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [обсудил|обсудила] отдых и условия поездок до нового соглашения.",
              "effects": {
                "health": 2,
                "social": 1,
                "unflag": "cc_arts_tour_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_arts_tour_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [обсудил|обсудила] отдых и условия поездок до нового соглашения.",
              "effects": {
                "health": 2,
                "mental": 2,
                "unflag": "cc_arts_tour_b"
              }
            }
          ]
        },
        {
          "text": "Предпочесть местные заказы",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_arts_tour_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [сократил|сократила] дорогу и число выездов.",
              "effects": {
                "cash": -1500,
                "mental": 2,
                "unflag": "cc_arts_tour_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_arts_tour_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [сократил|сократила] дорогу и число выездов.",
              "effects": {
                "cash": -2500,
                "health": 2,
                "unflag": "cc_arts_tour_b"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "cc_transport_agro_inspection_start",
      "group": "transport_agro",
      "title": "Сезонная проверка готовности",
      "text": "Перед напряжённым периодом нужно подтвердить готовность оборудования, документов и людей. Проверка занимает время, которого и так мало.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "railway",
          "pilot",
          "agro"
        ]
      },
      "p": 0.004,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Разобрать замечания до начала работы",
          "effects": {
            "skills": 2,
            "mental": -1,
            "flag": "cc_transport_agro_inspection_a"
          }
        },
        {
          "text": "Попросить отдельное время на устранение замечаний",
          "effects": {
            "social": 1,
            "mental": 1,
            "flag": "cc_transport_agro_inspection_b"
          }
        }
      ]
    },
    {
      "id": "cc_transport_agro_inspection_later",
      "group": "transport_agro",
      "title": "Возврат к замечаниям",
      "text": "При повторной проверке смотрят, что стало с замечаниями предыдущего осмотра.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "railway",
          "pilot",
          "agro"
        ],
        "any": [
          {
            "flag_cc_transport_agro_inspection_a": true
          },
          {
            "flag_cc_transport_agro_inspection_b": true
          }
        ]
      },
      "p": 0.006,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Показать устранённые замечания и записи",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_transport_agro_inspection_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [подтвердил|подтвердила] сделанную работу документами.",
              "effects": {
                "skills": 2,
                "mental": 1,
                "unflag": "cc_transport_agro_inspection_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_transport_agro_inspection_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [подтвердил|подтвердила] сделанную работу документами.",
              "effects": {
                "skills": 2,
                "social": 1,
                "unflag": "cc_transport_agro_inspection_b"
              }
            }
          ]
        },
        {
          "text": "Запросить помощь профильного специалиста",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_transport_agro_inspection_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [передал|передала] сложную часть специалисту, сохранив ответственность за свою работу.",
              "effects": {
                "cash": -2000,
                "skills": 1,
                "unflag": "cc_transport_agro_inspection_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_transport_agro_inspection_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [передал|передала] сложную часть специалисту, сохранив ответственность за свою работу.",
              "effects": {
                "cash": -2000,
                "mental": 1,
                "unflag": "cc_transport_agro_inspection_b"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "cc_transport_agro_weather_start",
      "group": "transport_agro",
      "title": "Погода меняет план",
      "text": "Погода вынуждает пересмотреть рабочий план. Начальство ждёт результата, но условия уже отличаются от расчётных.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "railway",
          "pilot",
          "agro"
        ]
      },
      "p": 0.004,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Настаивать на пересмотре плана по условиям",
          "effects": {
            "social": -1,
            "skills": 1,
            "flag": "cc_transport_agro_weather_a"
          }
        },
        {
          "text": "Предложить безопасную замену задачи",
          "effects": {
            "skills": 2,
            "social": 1,
            "flag": "cc_transport_agro_weather_b"
          }
        }
      ]
    },
    {
      "id": "cc_transport_agro_weather_later",
      "group": "transport_agro",
      "title": "План на следующий сложный период",
      "text": "При планировании следующего периода снова обсуждают запас времени и действия при плохих условиях.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "railway",
          "pilot",
          "agro"
        ],
        "any": [
          {
            "flag_cc_transport_agro_weather_a": true
          },
          {
            "flag_cc_transport_agro_weather_b": true
          }
        ]
      },
      "p": 0.006,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Предложить резервный порядок работы",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_transport_agro_weather_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [подготовил|подготовила] вариант на случай изменения условий.",
              "effects": {
                "skills": 2,
                "social": 2,
                "unflag": "cc_transport_agro_weather_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_transport_agro_weather_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [подготовил|подготовила] вариант на случай изменения условий.",
              "effects": {
                "skills": 2,
                "social": 2,
                "unflag": "cc_transport_agro_weather_b"
              }
            }
          ]
        },
        {
          "text": "Сократить личную дополнительную нагрузку",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_transport_agro_weather_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [сохранил|сохранила] силы, взяв меньше дополнительных задач.",
              "effects": {
                "cash": -1500,
                "health": 2,
                "unflag": "cc_transport_agro_weather_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_transport_agro_weather_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [сохранил|сохранила] силы, взяв меньше дополнительных задач.",
              "effects": {
                "cash": -1000,
                "health": 1,
                "unflag": "cc_transport_agro_weather_b"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "cc_transport_agro_qualification_start",
      "group": "transport_agro",
      "title": "Новая техника на участке",
      "text": "Появляется новая техника или рабочая процедура. Старого опыта недостаточно для самостоятельного допуска.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "railway",
          "pilot",
          "agro"
        ]
      },
      "p": 0.004,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Пройти необходимое обучение и проверку",
          "effects": {
            "cash": -2500,
            "skills": 3,
            "flag": "cc_transport_agro_qualification_a"
          }
        },
        {
          "text": "Попросить работу в пределах прежнего допуска",
          "effects": {
            "mental": 1,
            "flag": "cc_transport_agro_qualification_b"
          }
        }
      ]
    },
    {
      "id": "cc_transport_agro_qualification_later",
      "group": "transport_agro",
      "title": "Сложное задание на новой технике",
      "text": "Тебе предлагают задачу с повышенной ответственностью. Твои прежние решения об обучении теперь важны.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "railway",
          "pilot",
          "agro"
        ],
        "any": [
          {
            "flag_cc_transport_agro_qualification_a": true
          },
          {
            "flag_cc_transport_agro_qualification_b": true
          }
        ]
      },
      "p": 0.006,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Сверить действующий допуск и распределить задачи",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_transport_agro_qualification_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [сверил|сверила] полномочия; этот сюжет не выдаёт удостоверения и лётные свидетельства.",
              "effects": {
                "skills": 2,
                "social": 1,
                "unflag": "cc_transport_agro_qualification_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_transport_agro_qualification_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [сверил|сверила] полномочия; этот сюжет не выдаёт удостоверения и лётные свидетельства.",
              "effects": {
                "skills": 1,
                "mental": 1,
                "unflag": "cc_transport_agro_qualification_b"
              }
            }
          ]
        },
        {
          "text": "Попросить наставника или замену исполнителя",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_transport_agro_qualification_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [обеспечил|обеспечила] выполнение задачи в пределах фактических допусков.",
              "effects": {
                "social": 1,
                "mental": 1,
                "unflag": "cc_transport_agro_qualification_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_transport_agro_qualification_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [обеспечил|обеспечила] выполнение задачи в пределах фактических допусков.",
              "effects": {
                "social": 2,
                "mental": 2,
                "unflag": "cc_transport_agro_qualification_b"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "cc_sport_pain_start",
      "group": "sport",
      "title": "Боль после нагрузки",
      "text": "На тренировке снова болит знакомое место. До важного старта немного времени, но симптомы нельзя надёжно оценить самостоятельно.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "athlete"
        ]
      },
      "p": 0.004,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Обратиться к спортивному врачу и обсудить нагрузку",
          "effects": {
            "cash": -2500,
            "health": 1,
            "flag": "cc_sport_pain_a"
          }
        },
        {
          "text": "Сообщить тренеру и временно снизить нагрузку",
          "effects": {
            "health": 1,
            "social": 1,
            "flag": "cc_sport_pain_b"
          }
        }
      ]
    },
    {
      "id": "cc_sport_pain_later",
      "group": "sport",
      "title": "Решение о возвращении",
      "text": "Команда обсуждает твоё возвращение к прежней нагрузке. Одного желания выйти на старт недостаточно.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "athlete"
        ],
        "any": [
          {
            "flag_cc_sport_pain_a": true
          },
          {
            "flag_cc_sport_pain_b": true
          }
        ]
      },
      "p": 0.006,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Следовать индивидуальному плану после оценки специалиста",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_sport_pain_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [выбрал|выбрала] постепенное восстановление; готовность оценивают специалисты.",
              "effects": {
                "health": 3,
                "mental": 1,
                "unflag": "cc_sport_pain_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_sport_pain_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [выбрал|выбрала] постепенное восстановление; готовность оценивают специалисты.",
              "effects": {
                "health": 2,
                "mental": 1,
                "unflag": "cc_sport_pain_b"
              }
            }
          ]
        },
        {
          "text": "Пропустить часть стартов ради восстановления",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_sport_pain_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [снизил|снизила] соревновательную нагрузку.",
              "effects": {
                "cash": -2000,
                "health": 3,
                "unflag": "cc_sport_pain_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_sport_pain_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [снизил|снизила] соревновательную нагрузку.",
              "effects": {
                "cash": -2000,
                "health": 3,
                "unflag": "cc_sport_pain_b"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "cc_sport_advertising_start",
      "group": "sport",
      "title": "Рекламный контракт",
      "text": "Тебе предлагают рекламное сотрудничество. Нужно понять обязательства, сроки и совместимость с клубным контрактом.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "athlete"
        ]
      },
      "p": 0.004,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Проверить договор с представителем",
          "effects": {
            "cash": -3500,
            "skills": 2,
            "flag": "cc_sport_advertising_a"
          }
        },
        {
          "text": "Отказаться от несогласованных обязательств",
          "effects": {
            "mental": 2,
            "flag": "cc_sport_advertising_b"
          }
        }
      ]
    },
    {
      "id": "cc_sport_advertising_later",
      "group": "sport",
      "title": "Запрос от спонсора",
      "text": "Рекламодатель просит согласовать дальнейшее использование твоего изображения.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "athlete"
        ],
        "any": [
          {
            "flag_cc_sport_advertising_a": true
          },
          {
            "flag_cc_sport_advertising_b": true
          }
        ]
      },
      "p": 0.006,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Сверить согласованные права и условия",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_sport_advertising_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [обозначил|обозначила] допустимые условия использования изображения.",
              "effects": {
                "cash": 4500,
                "skills": 1,
                "unflag": "cc_sport_advertising_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_sport_advertising_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [обозначил|обозначила] допустимые условия использования изображения.",
              "effects": {
                "skills": 1,
                "social": 1,
                "unflag": "cc_sport_advertising_b"
              }
            }
          ]
        },
        {
          "text": "Ограничить дальнейшие рекламные обязательства",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_sport_advertising_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [сохранил|сохранила] больше времени для спорта.",
              "effects": {
                "cash": -1000,
                "mental": 2,
                "unflag": "cc_sport_advertising_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_sport_advertising_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [сохранил|сохранила] больше времени для спорта.",
              "effects": {
                "mental": 2,
                "unflag": "cc_sport_advertising_b"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "cc_sport_future_start",
      "group": "sport",
      "title": "Карьера после спорта",
      "text": "Ты задумываешься о работе после завершения выступлений. Опыт соревнований полезен, но новая профессия требует своей подготовки.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "athlete"
        ]
      },
      "p": 0.004,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Начать профильное обучение без обещания допуска",
          "effects": {
            "cash": -4000,
            "skills": 3,
            "flag": "cc_sport_future_a"
          }
        },
        {
          "text": "Сначала изучить вакансии и пути обучения",
          "effects": {
            "skills": 1,
            "mental": 1,
            "flag": "cc_sport_future_b"
          }
        }
      ]
    },
    {
      "id": "cc_sport_future_later",
      "group": "sport",
      "title": "Первая роль вне стартового состава",
      "text": "Тебе предлагают помочь в работе с новичками или организацией занятий.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "athlete"
        ],
        "any": [
          {
            "flag_cc_sport_future_a": true
          },
          {
            "flag_cc_sport_future_b": true
          }
        ]
      },
      "p": 0.006,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Проверить квалификацию и принять подходящую роль",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_sport_future_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [согласовал|согласовала] роль в пределах подготовки; тренерская квалификация не возникает автоматически.",
              "effects": {
                "skills": 2,
                "social": 2,
                "unflag": "cc_sport_future_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_sport_future_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [согласовал|согласовала] роль в пределах подготовки; тренерская квалификация не возникает автоматически.",
              "effects": {
                "skills": 1,
                "social": 1,
                "unflag": "cc_sport_future_b"
              }
            }
          ]
        },
        {
          "text": "Продолжить подготовку и пока отказаться",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_sport_future_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [выделил|выделила] время на необходимую подготовку.",
              "effects": {
                "cash": -2000,
                "skills": 2,
                "unflag": "cc_sport_future_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_sport_future_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [выделил|выделила] время на необходимую подготовку.",
              "effects": {
                "cash": -2500,
                "skills": 2,
                "unflag": "cc_sport_future_b"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "cc_politics_appeal_start",
      "group": "politics",
      "title": "Обращение жителей",
      "text": "На приёме жители рассказывают о многолетней коммунальной проблеме. От тебя ждут решения, которое относится к полномочиям другого органа.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "deputy"
        ]
      },
      "p": 0.004,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Зафиксировать вопрос и направить по компетенции",
          "effects": {
            "social": 2,
            "skills": 1,
            "flag": "cc_politics_appeal_a"
          }
        },
        {
          "text": "Организовать встречу с ответственными",
          "effects": {
            "social": 3,
            "mental": -1,
            "flag": "cc_politics_appeal_b"
          }
        }
      ]
    },
    {
      "id": "cc_politics_appeal_later",
      "group": "politics",
      "title": "Ответ на обращение",
      "text": "Приходит ответ ведомства по тому обращению. Жители хотят понять, что действительно сделано.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "deputy"
        ],
        "any": [
          {
            "flag_cc_politics_appeal_a": true
          },
          {
            "flag_cc_politics_appeal_b": true
          }
        ]
      },
      "p": 0.006,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Проверить исполнение и объяснить пределы полномочий",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_politics_appeal_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [сообщил|сообщила] жителям о подтверждённом результате и оставшихся вопросах.",
              "effects": {
                "social": 3,
                "skills": 1,
                "unflag": "cc_politics_appeal_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_politics_appeal_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [сообщил|сообщила] жителям о подтверждённом результате и оставшихся вопросах.",
              "effects": {
                "social": 3,
                "skills": 1,
                "unflag": "cc_politics_appeal_b"
              }
            }
          ]
        },
        {
          "text": "Передать ответ без дополнительной проверки",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_politics_appeal_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [переслал|переслала] ответ, но часть вопросов жителей осталась открытой.",
              "effects": {
                "social": -1,
                "unflag": "cc_politics_appeal_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_politics_appeal_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [переслал|переслала] ответ, но часть вопросов жителей осталась открытой.",
              "effects": {
                "social": -2,
                "unflag": "cc_politics_appeal_b"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "cc_politics_declaration_start",
      "group": "politics",
      "title": "Непростая декларация",
      "text": "В документах о доходах и интересах обнаруживается неоднозначность. Нужно проверить применимые к твоему мандату правила и сроки.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          2009,
          2035
        ],
        "employed": true,
        "prof": [
          "deputy"
        ]
      },
      "p": 0.004,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Заранее обратиться к ответственному специалисту",
          "effects": {
            "skills": 2,
            "cash": -1500,
            "flag": "cc_politics_declaration_a"
          }
        },
        {
          "text": "Самостоятельно сверить доступные документы",
          "effects": {
            "skills": 1,
            "mental": -1,
            "flag": "cc_politics_declaration_b"
          }
        }
      ]
    },
    {
      "id": "cc_politics_declaration_later",
      "group": "politics",
      "title": "Уточнение сведений",
      "text": "Уполномоченный орган запрашивает уточнение ранее поданных сведений.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          2009,
          2035
        ],
        "employed": true,
        "prof": [
          "deputy"
        ],
        "any": [
          {
            "flag_cc_politics_declaration_a": true
          },
          {
            "flag_cc_politics_declaration_b": true
          }
        ]
      },
      "p": 0.006,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Представить проверенные сведения в установленном порядке",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_politics_declaration_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [подготовил|подготовила] уточнение; оценка соблюдения правил зависит от вида мандата и обстоятельств.",
              "effects": {
                "skills": 2,
                "mental": 1,
                "unflag": "cc_politics_declaration_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_politics_declaration_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [подготовил|подготовила] уточнение; оценка соблюдения правил зависит от вида мандата и обстоятельств.",
              "effects": {
                "skills": 2,
                "mental": -1,
                "unflag": "cc_politics_declaration_b"
              }
            }
          ]
        },
        {
          "text": "Попросить разъяснение порядка исправления",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_politics_declaration_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [уточнил|уточнила] процедуру, не подменяя её устными обещаниями.",
              "effects": {
                "social": 1,
                "mental": 1,
                "unflag": "cc_politics_declaration_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_politics_declaration_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [уточнил|уточнила] процедуру, не подменяя её устными обещаниями.",
              "effects": {
                "social": 1,
                "mental": -1,
                "unflag": "cc_politics_declaration_b"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "cc_politics_budget_start",
      "group": "politics",
      "title": "Спор о местном проекте",
      "text": "При обсуждении проекта бюджета разные группы жителей отстаивают свои приоритеты. Всем средств не хватает.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "deputy"
        ]
      },
      "p": 0.004,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Собрать открытые данные и обсудить критерии",
          "effects": {
            "skills": 2,
            "social": 2,
            "flag": "cc_politics_budget_a"
          }
        },
        {
          "text": "Провести отдельные встречи с жителями",
          "effects": {
            "social": 3,
            "mental": -1,
            "flag": "cc_politics_budget_b"
          }
        }
      ]
    },
    {
      "id": "cc_politics_budget_later",
      "group": "politics",
      "title": "Отчёт по проекту",
      "text": "После принятия решения жители спрашивают о сроках и стоимости выбранного проекта.",
      "when": {
        "age": [
          18,
          100
        ],
        "year": [
          1985,
          2035
        ],
        "employed": true,
        "prof": [
          "deputy"
        ],
        "any": [
          {
            "flag_cc_politics_budget_a": true
          },
          {
            "flag_cc_politics_budget_b": true
          }
        ]
      },
      "p": 0.006,
      "cooldown": 36,
      "once": true,
      "choices": [
        {
          "text": "Сопоставить обещания с опубликованными документами",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_politics_budget_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [показал|показала] проверяемые сведения, не обещая результата за пределами своих полномочий.",
              "effects": {
                "skills": 2,
                "social": 2,
                "unflag": "cc_politics_budget_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_politics_budget_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [показал|показала] проверяемые сведения, не обещая результата за пределами своих полномочий.",
              "effects": {
                "skills": 1,
                "social": 2,
                "unflag": "cc_politics_budget_b"
              }
            }
          ]
        },
        {
          "text": "Признать, что часть сведений ещё нужно запросить",
          "outcomes": [
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_politics_budget_a": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [отделил|отделила] известное от того, что ещё требует ответа.",
              "effects": {
                "social": 1,
                "mental": 1,
                "unflag": "cc_politics_budget_a"
              }
            },
            {
              "w": 1,
              "mods": [
                {
                  "if": {
                    "flag_cc_politics_budget_b": false
                  },
                  "mul": 0
                }
              ],
              "text": "Ты [отделил|отделила] известное от того, что ещё требует ответа.",
              "effects": {
                "social": 1,
                "mental": 1,
                "unflag": "cc_politics_budget_b"
              }
            }
          ]
        }
      ]
    }
  ]
};
