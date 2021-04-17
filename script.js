"use strict";
let isNumber = function(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
};
let money;
let start = function(){
    do{
        money = prompt('Ваш месячный доход?');
    }
    while(!isNumber(money));
};

start();


let appData = {
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 6,
    expenses: {},

    asking: function(){
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        console.log(appData);

        for(let i = 0; i < 2; i++){
            let name = prompt('Введите обязательную статью расходов?');

            let money = +prompt('Во сколько это обойдется?');

            while(!isNumber(money)){
                money = +prompt('Во сколько это обойдется?');

            }
            let expenses = [];
            let sum = 0;
            for (i in expenses){
                sum += i;
            }

            console.log('сумма обьектов' + sum);
            appData.expenses[name] = money;
        }
        console.log('вывод экспенсес' + appData.expenses);

    }

};

for (let key in appData) {
  let item = appData[key];
  console.log('"Наша программа включает в себя данные: " ' + item);
}

appData.asking();

let expenses = {};

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
function getBudget(){
  let accumulatedMonth = money - expensesAmount;
return accumulatedMonth;
}


//console.log(appData.asking.addExpenses.toLowerCase().split(', '));

//Функция возвращает количество месяцев для достижения цели
appData.getTargetMonth = function(){ 
  let periodMission = Math.ceil(appData.mission / getBudget());
    if (periodMission > 0){
      console.log('Цель будет достигнута за ' +  periodMission + ' месяцев(-а)');
    }else{
      console.log('Цель не будет достигнута');
    }
  return periodMission;
};

appData.getTargetMonth();


appData.budgetDay = Math.floor(getBudget() / 30);
console.log('Бюджет на день: ' + appData.budgetDay);


let getStatusIncome = function(){
    if (appData.budgetDay >= 1200) {
      return('У вас высокий уровень дохода');
    }else if(appData.budgetDay >= 600 && appData.budgetDay < 1200){
        return('У вас средний уровень дохода');
    }else if  (appData.budgetDay < 600 && appData.budgetDay > 0){
        return('К сожалению у вас уровень дохода ниже среднего');
    }else if (appData.budgetDay <= 0){
        return('Что то пошло не так');
    }
};

console.log(getStatusIncome());


