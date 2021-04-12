"use strict";

let isNumber = function(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
};




let money;
let mission = 250000;
let income = 'калым на работе'; 
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'); 
let deposit = confirm('Есть ли у вас депозит в банке?');
let period = 6;


 let start = function(){
   do{
      money = prompt('Ваш месячный доход?');
   }
  while(!isNumber(money));
     money = prompt('Ваш месячный доход?');
  
};
start();



let showTypeOf = function(data){
  console.log(data, typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

// let expenses1 = prompt('Введите обязательную статью расходов?'),
//     expenses1Amount = +prompt('Во сколько это обойдется?', 1700),
//     expenses2 = prompt ('Введите обязательную статью расходов?'),
//     expenses2Amount = +prompt ('Во сколько это обойдется?', 2230);
   
let expenses = [];

//Функция возвращает сумму обязательных расходов 
let getExpensesMonth = function(){
  let sum = 0;

  for(let i = 0; i < 2; i++){
    expenses[i] = prompt('Введите обязательную статью расходов?');
    
     sum += +prompt('Во сколько это обойдется?');
     
     while(!isNumber(sum)){
       sum = +prompt('Во сколько это обойдется?');
    }
  }
  console.log(expenses);
  return sum;
};

let expensesAmount = getExpensesMonth();

console.log('Сумма обязательных расходов ' + expensesAmount);


//Функция возвращает  накопления за месяц. Доход минус расходы
function getAccumulatedMonth(){
  let accumulatedMonth = money - expensesAmount;
return accumulatedMonth;
}




console.log(addExpenses.toLowerCase().split(', '));

//Функция возвращает количество месяцев для достижения цели
function getTargetMonth(){ 
  let periodMission = Math.ceil(mission / getAccumulatedMonth());
    if (periodMission > 0){
      console.log('Цель будет достигнута за ' +  periodMission + ' месяцев(-а)');
    }else{
      console.log('Цель не будет достигнута');
    }
  return periodMission;
}

getTargetMonth();


let budgetDay = Math.floor(getAccumulatedMonth() / 30);
console.log('Бюджет на день: ' + budgetDay);


let getStatusIncome = function(){
    if (budgetDay >= 1200) {
      return('У вас высокий уровень дохода');
    }else if(budgetDay >= 600 && budgetDay < 1200){
        return('У вас средний уровень дохода');
    }else if  (budgetDay < 600 && budgetDay > 0){
        return('К сожалению у вас уровень дохода ниже среднего');
    }else if (budgetDay <= 0){
        return('Что то пошло не так');
    }
};

console.log(getStatusIncome());