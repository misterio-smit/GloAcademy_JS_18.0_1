"use strict";

let isNumber = function(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
  start = function(){
   do{
      money = prompt('Ваш месячный доход?');
    }
    while(!isNumber(money));
  };

  start();

let expenses = [];
let appData = {
    butget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 6,
    ascing: function(){
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
    },

    //Функция возвращает сумму обязательных расходов 
  getExpensesMonth: function(){
  let sum = 0;

  for(let i = 0; i < 2; i++){
    expenses[i] = prompt('Введите обязательную статью расходов?');
    
     sum += +prompt('Во сколько это обойдется?');
     
     while(!isNumber(sum)){
       sum = +prompt('Во сколько это обойдется?');
    }
  }
  console.log('экспенсес ' + expenses);
  return sum;
},

//Функция возвращает  накопления за месяц. Доход минус расходы
getAccumulatedMonth: function(){
  
  let accumulatedMonth = money - appData.expensesAmount;
return accumulatedMonth;
},

//Функция возвращает количество месяцев для достижения цели
getTargetMonth: function(){ 
  let periodMission = Math.ceil(appData.mission / appData.getAccumulatedMonth());
    if (periodMission > 0){
      console.log('Цель будет достигнута за ' +  periodMission + ' месяцев(-а)');
    }else{
      console.log('Цель не будет достигнута');
    }
  return periodMission;
},

getStatusIncome:function(){
    let budgetDay = Math.floor(appData.getAccumulatedMonth() / 30);
    console.log('Бюджет на день: ' + budgetDay);

    if (budgetDay >= 1200) {
      return('У вас высокий уровень дохода');
    }else if(budgetDay >= 600 && budgetDay < 1200){
        return('У вас средний уровень дохода');
    }else if  (budgetDay < 600 && budgetDay > 0){
        return('К сожалению у вас уровень дохода ниже среднего');
    }else if (budgetDay <= 0){
        return('Что то пошло не так');
    }
},


};

appData.expensesAmount = appData.getExpensesMonth();

console.log('Сумма обязательных расходов ' + appData.expensesAmount);

appData.getTargetMonth();

appData.getStatusIncome();