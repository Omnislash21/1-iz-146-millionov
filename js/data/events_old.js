// События взрослого здоровья и старости (этап 5). Эффекты RL.Old: retire, cancerCare (oms | paid | abroad | refuse), nursingHome.
RL.DATA.events.push(
  {"id":"retirement","title":"Пенсия","trigger":true,"when":{"retired":true},
   "text":"Пенсионный возраст. Пенсию назначили — можно уйти с работы, а можно работать дальше и получать и то и другое.",
   "choices":[
     {"text":"Уйти на пенсию","traits":{"selfControl":1},"effects":{"retire":true,"mental":4}},
     {"text":"Работать, пока берут","traits":{"diligence":3},"effects":{"money":3}}]},
  {"id":"cancer_treatment","title":"Лечение","trigger":true,"when":{"hasCancer":true},
   "text":"Онколог объясняет варианты: по ОМС бесплатно, но квоту ждать; можно платно в частной клинике или за границей.",
   "choices":[
     {"text":"Лечиться по ОМС","traits":{"conformity":2},"effects":{"cancerCare":"oms"}},
     {"text":"Платная клиника","effects":{"cancerCare":"paid","cash":-1200000}},
     {"text":"Лечение за границей (Израиль, Германия, Турция)","if":{"wealthAvg":{">":20}},"effects":{"cancerCare":"abroad","cash":-4000000}},
     {"text":"Народная медицина и «чистка организма»","traits":{"curiosity":-3},"effects":{"cancerCare":"refuse"}}]},
  {"id":"specialist_queue","title":"Очередь к врачу","when":{"age":[35,110],"chronic":true},"p":0.02,"cooldown":12,
   "text":"Запись к кардиологу по ОМС — через полтора месяца. Платно — завтра.",
   "choices":[
     {"text":"Ждать по ОМС","traits":{"selfControl":2},"effects":{"health":-2}},
     {"text":"Пойти платно","effects":{"cash":-4500,"health":1}},
     {"text":"«Отблагодарить» завотделением","traits":{"honesty":-3},"effects":{"cash":-10000,"health":1}}]},
  {"id":"checkup","title":"Диспансеризация","when":{"age":[40,110],"year":[2013,2120]},"p":0.03,"cooldown":30,
   "text":"Приглашают на бесплатную диспансеризацию: анализы, ЭКГ, флюорография.",
   "choices":[
     {"text":"Сходить","traits":{"selfControl":2},"effects":{"health":2,"flag":"checkupDone"}},
     {"text":"Некогда","effects":{}}]},
  {"id":"pension_scam","title":"Звонок","when":{"age":[58,110],"year":[2015,2120]},"p":0.008,"cooldown":24,
   "mods":[{"if":{"dementia":true},"mul":3}],
   "text":"«Это служба безопасности Центробанка. Ваши сбережения под угрозой — переведите их на безопасный счёт».",
   "choices":[
     {"text":"Перевести","traits":{"conformity":3},"effects":{"wealthLoss":0.6,"mental":-15}},
     {"text":"Позвонить детям","traits":{"selfControl":3},"effects":{"mental":1}},
     {"text":"Бросить трубку","traits":{"selfControl":2},"effects":{}}]},
  {"id":"grandkids_summer","title":"Внуки","when":{"grandkids":{">=":1},"summer":true},"p":0.15,"cooldown":10,
   "mods":[{"if":{"focus_dacha":true},"mul":3}],
   "text":"Внуков привезли на лето.",
   "choices":[
     {"text":"Возиться с внуками","traits":{"empathy":2},"effects":{"happiness":6,"mental":4,"health":-1}},
     {"text":"Отправить с ними на дачу","effects":{"happiness":3}}]},
  {"id":"loneliness","title":"Одиночество","when":{"age":[60,110],"hasPartner":false,"kidsN":0},"p":0.02,"cooldown":12,
   "text":"Неделями никто не звонит. Телевизор говорит громче, чем соседи.",
   "choices":[
     {"text":"Записаться в клуб «Активное долголетие»","traits":{"sociability":3},"effects":{"social":6,"mental":5}},
     {"text":"Завести кота","traits":{"empathy":2},"effects":{"mental":4,"happiness":3}},
     {"text":"Привыкнуть","effects":{"mental":-4}}]},
  {"id":"nursing_home","title":"Уход","trigger":true,"when":{"age":[65,110]},
   "text":"[Самому|Самой] жить уже трудно: забываешь лекарства, однажды не [выключил|выключила] газ.",
   "choices":[
     {"text":"Переехать в пансионат","effects":{"nursingHome":true,"social":-5}},
     {"text":"Попросить детей забрать к себе","if":{"kidsN":{">=":0}},"traits":{"conformity":2},"effects":{"mental":2}},
     {"text":"Жить [одному|одной], пока можется","traits":{"courage":2},"effects":{"health":-4}}]},
  {"id":"golden_years","title":"Годовщина","when":{"married":true,"age":[50,110]},"p":0.004,"once":true,
   "text":"Тридцать лет вместе. Дети собирают всех за большим столом.",
   "choices":[{"text":"Праздновать","effects":{"happiness":8,"spouseRelation":8}}]},
  {"id":"heart_warning","title":"Сердце","when":{"age":[40,110],"any":[{"hypertension":true},{"smoker":true}]},"p":0.01,"cooldown":18,
   "text":"Давит в груди после лестницы. Врач: «Бросайте курить, меньше соли, больше ходить».",
   "choices":[
     {"text":"Взяться за здоровье","traits":{"selfControl":4},"effects":{"health":3,"habitDown":{"smoking":1}}},
     {"text":"Как-нибудь потом","traits":{"selfControl":-2},"effects":{"health":-2}}]},
  {"id":"will","title":"Завещание","when":{"age":[60,110],"any":[{"ownsFlat":true},{"wealthAvg":{">":10}}]},"p":0.006,"once":true,
   "text":"Нотариус советует написать завещание, чтобы дети потом не судились.",
   "choices":[
     {"text":"Написать","traits":{"selfControl":2},"effects":{"flag":"will"}},
     {"text":"Рано ещё","effects":{}}]}
);
