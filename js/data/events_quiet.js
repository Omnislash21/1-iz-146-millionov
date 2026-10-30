// Тихие разрушения (счётчики — js/sim/hardship.js quiet): годы выгорания → срыв; остывший брак; одиночество.
// Здесь — развилки, которыми они заканчиваются. Частоты [~].
RL.DATA.events.push(
  {"id":"q_burnout_break","title":"Срыв","trigger":true,"major":true,
   "text":"Три года на износ — без отпусков, с тревогой по ночам. Утром в понедельник ты сидишь в машине у офиса и не можешь выйти.",
   "choices":[
     {"text":"Уволиться в никуда","traits":{"courage":2,"selfControl":-1},"effects":{"jobLoss":true,"mental":8,"cash":-30000}},
     {"text":"Больничный и психотерапевт","if":{"year":[2005,2120]},"traits":{"selfControl":2},"effects":{"cash":-40000,"mental":10}},
     {"text":"Взять себя в руки","traits":{"conformity":2},"outcomes":[
       {"w":2,"text":"Протянул[|а] ещё год. Сердце начало сдавать.","effects":{"mental":-6,"health":-5}},
       {"w":1,"text":"Начал[|а] выпивать по вечерам — «чтобы уснуть».","effects":{"mental":-3,"habitUp":{"alcohol":1}}}]}]},
  {"id":"q_cold_marriage","title":"Тихо","major":true,"when":{"married":true,"partnerRelation":{"<":45},"age":[30,75]},"p":0.006,"cooldown":48,
   "text":"Вы живёте как соседи: разные комнаты, разные телефоны, общий холодильник. Никто не уходит — и никто не возвращается.",
   "choices":[
     {"text":"Попробовать заново: отпуск вдвоём","traits":{"empathy":2,"courage":1},"outcomes":[
       {"w":1,"text":"Как в первый год. Ненадолго — но было.","effects":{"spouseRelation":15,"cash":-80000}},
       {"w":1,"text":"Две недели молчания на море.","effects":{"spouseRelation":-3,"cash":-80000}}]},
     {"text":"Оставить как есть","traits":{"conformity":2},"effects":{"mental":-2}},
     {"text":"Развестись","traits":{"courage":2},"effects":{"relationship":"breakup","reason":"остыли","mental":-4}}]},
  {"id":"q_lonely_call","title":"Позвонить","when":{"social":{"<":30},"hasPartner":false,"age":[30,90]},"p":0.006,"cooldown":36,
   "text":"Перебираешь контакты в телефоне. Кому позвонить просто так — не находится.",
   "choices":[
     {"text":"Позвонить старому другу","traits":{"sociability":2,"courage":1},"outcomes":[
       {"w":2,"text":"Проговорили два часа. Договорились встретиться.","effects":{"social":6,"mental":3}},
       {"w":1,"text":"«Ой, давай потом, я занят». Потом не было.","effects":{"mental":-2}}]},
     {"text":"Не звонить","effects":{"mental":-1}}]}
);
