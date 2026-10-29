# Задачи для GPT (параллельно с Claude)

Общие правила — как в прошлый раз:
- Только **новые файлы** из списка ниже. Не трогать `js/sim/*`, `js/ui/*`, `index.html`, `css/*` и существующие `js/data/*.js`.
- Формат файла: `RL.DATA.имя = {...};` — без функций, модулей и `fetch`. В шапке — источники; оценки помечать `[~]`.
- Тексты на «ты», род героя — `[мужской|женский]` (например `[пошёл|пошла]`); род партнёра не подменять полом героя.
- Деньги — рубли 2024 года.

## Что можно использовать в условиях `when` / `if`
`age`, `sex` ("m"/"f"), `year`, `month`, `season`, `region`, `tags` (теги региона: `capital`, `caucasus`, `north`, `siberia`, `fareast`, `arctic`, `oil`, `industrial`), `bigCity`, `village`, `smallTown`,
`employed`, `prof` (id текущей профессии; массив = «одна из»), `jobLevel` (0–4), `hasBiz`, `retired`, `wealthAvg` (накопления в средних зарплатах), `ownsFlat`, `hasMortgage`,
`hasPartner`, `married`, `kidsN`, `kidsAlive`, `adultKids`, `grandkids`, `parentAlive`, `momAlive`, `dadAlive`, `siblings`,
`health`, `mental`, `social`, `skills`, `happiness` (0–100), `drinker`, `smoker`, `gambler`, `criminalRecord`, `higherEdu`, `served`, `isDeputy`,
`flag_ИМЯ` (флаг, поставленный эффектом `"flag":"ИМЯ"`), `focus_ИД` (текущий фокус), `trait_ИМЯ` (`courage`, `honesty`, `diligence`, `empathy`, `selfControl`, `sociability`, `conformity`, `aggression`, `curiosity`: −100…100).
Операторы: `[a,b]` — диапазон, `{">=":x}`, `{"any":[…]}`, `{"not":{…}}`.

## Эффекты
`health`, `mental`, `social`, `skills`, `happiness`, `money` (пункты шкал), `cash` (рубли, минус — расход), `spouseRelation`, `flag` / `unflag`, `trait` {имя: число},
`habit` {alcohol|smoking|gaming: +1}, `quitJob`, `case` (статья: `bribe291`, `bribe290`, `fraud159`, `theft158`, `harm111`, `dtp264`), `condition` (id болезни), `death` (текст причины, вместе с `deathP` — шанс).

---

## Задача 1. События по профессиям — `js/data/events_careers.js` → `RL.DATA.eventsCareers = {meta, events:[…]}`
- По **5–6 событий на каждую группу профессий** (≈100 всего). Группы и id профессий:
  - рабочие: `laborer, worker, builder, welder, electrician, mechanic, rotation`;
  - сервис: `seller, cook, hairdresser, cleaner, guard, courier`;
  - водители: `driver`;
  - медицина: `doctor, nurse, pharmacist`;
  - образование: `teacher, kgteacher, coach`;
  - силовики: `police, military, firefighter`;
  - офис: `office, accountant, economist, lawyer, manager, official`;
  - IT и дизайн: `it, designer`;
  - наука и медиа: `scientist, journalist, psychologist`;
  - творчество: `actor, musician, artist`;
  - транспорт и село: `railway, pilot, agro`;
  - спорт: `athlete`;
  - политика: `deputy`.
- У каждого события есть `when` с `prof`, у выборов — последствия. Минимум треть событий должна ставить `flag`, на который опирается **другое** событие позже (цепочки). Пример: «взял конверт» → через год «проверка ОБЭП», «отказался от переработок» → «не дали премию».
- Частота: `p` 0.002–0.006, `cooldown` ≥ 24. Реализм: российские реалии 1985–2035 (задержки зарплат в 90-е, ЕГЭ для учителей, оптимизация больниц, «Яндекс.Такси» с 2011, маркетплейсы и т.д.).

## Задача 2. Фокусы по профессиям — `js/data/career_focuses.js` → `RL.DATA.careerFocuses = {meta, items:[…]}`
- По **3 фокуса на профессию** из списка выше (~130). Поля:
  `id` (`cf_<проф>_<n>`), `name`, `desc` (1–2 предложения, что делаешь и чем рискуешь), `profs` (массив id), `ages` [от, до], `cost` (руб./мес., можно 0),
  `eff` — изменение шкал в месяц (как у обычных фокусов, ±0.05…0.6),
  `career` — влияние на работу: `raise` (рост зарплаты за год, доля: 0.05 = +5%), `promo` (множитель шанса повышения, 0.5…3), `side` (подработка: доля средней зарплаты в месяц, 0…0.4),
  `burnout` (шанс выгорания в месяц, 0…0.02), `injury` (шанс травмы в месяц, 0…0.01), `fire` (шанс увольнения в месяц), `caseRisk` {"статья": шанс в месяц} — для серых схем.
- Примеры по смыслу: водитель — «Дальнобой», «Таксовать на себя»; врач — «Подработка в частной клинике», «Высшая категория»; учитель — «Репетиторство», «Классное руководство и олимпиады»; полицейский — «Учёба в академии МВД», «Закрывать глаза за „подарки“».

## Задача 3. Требования профессий и новые профессии — `js/data/professions_ext.js` → `RL.DATA.professionsExt = {meta, requirements:{…}, professions:[…]}`
- `requirements`: для **каждой** профессии из списка выше и 25 новых — что реально нужно в России:
  `level` (0 нет, 1 СПО, 2 вуз), `field` (направления: `it, eng, med, econ, law, hum, natsci, ped, agro, mil, arts, gmu`), `license` (`B`, `C`, `D`, `CE` — категории прав), `minDrivingYears`,
  `medical` (медкомиссия), `noRecord`, `minAge`, `maxAge`, `experienceYears`, `exam` (квалификационный экзамен: адвокат, нотариус, судья), `citizenship`, `note` (откуда требование: закон, практика).
- `professions`: 25 новых в формате существующих (`id, m, f, edu, wage, sd, shadow, sector, arrears, sex:{m,f}, alcohol, injury, unempl`), например: таксист, дальнобойщик, тракторист, участковый, следователь, прокурор, судья, нотариус, адвокат, медсестра скорой, фельдшер, провизор, ветеринар, бариста, официант, менеджер маркетплейса, SMM-специалист, тестировщик, сисадмин, крановщик, машинист метро, диспетчер, оператор колл-центра, кассир банка, риелтор.
- Зарплаты `wage` — медиана 2024 по hh.ru/Росстат `[~]`.

Когда закончишь — короткий отчёт: сколько записей, что оценочное, какие проверки пройдены. Подключу сам.
