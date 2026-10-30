// Контракт с плаката (js/sim/svo.js, кнопка под паспортом). Пока идёт СВО — в любой момент жизни мужчины 18–65.
// Риски службы — js/sim/young.js serviceMonthly (гибель, ранение, ПТСР, инвалидность); выплата при подписании — svoBonus.
RL.DATA.events.push(
  {"id":"svo_contract_poster","title":"Служба по контракту","trigger":true,"major":true,
   "text":"Плакат на остановке: «{sum} за первый год. Стань героем — присоединяйся к своим». Телефон 117. Подписать можно хоть завтра — военкомат работает без выходных.",
   "choices":[
     {"text":"Позвонить и подписать контракт","traits":{"courage":3,"conformity":2},"effects":{"army":"contract","svoBonus":true,"relation":{"all":-4}}},
     {"text":"Пройти мимо","traits":{"selfControl":1},"effects":{}}]}
);
