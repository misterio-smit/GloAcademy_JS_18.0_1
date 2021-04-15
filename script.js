"use strict";

let money;
let isNumber = function(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
};
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
            appData.getExpensesMonth = function(){
  let sum = 0;
  
   
  console.log(appData);

  for(let i = 0; i < 2; i++){
    appData.expenses[i] = prompt('Введите обязательную статью расходов?');
    
     sum += +prompt('Во сколько это обойдется?');
     
     while(!isNumber(sum)){
       sum = +prompt('Во сколько это обойдется?');
    }
  }
  console.log(appData.expenses);
  return sum;
  };
   
}
  

};
appData.asking();

appData.getExpensesMonth = function(){
console.log('Сумма обязательных расходов ' + appData.getExpensesMonth);
};
appData.getExpensesMonth();


appData.getAccumulatedMonth = function(){
  let accumulatedMonth = appData.getAccumulatedMonth - appData.getExpensesMonth;
return accumulatedMonth;
};

appData.getTargetMonth = function(){ 
  let periodMission = Math.ceil(appData.mission / appData.getAccumulatedMonth());
    if (periodMission > 0){
      console.log('Цель будет достигнута за ' +  periodMission + ' месяцев(-а)');
    }else{
      console.log('Цель не будет достигнута');
    }
  return periodMission;
};


appData.getTargetMonth();
//let expenses = [];




let budgetDay = Math.floor(appData.getAccumulatedMonth() / 30);
console.log('Бюджет на день: ' + budgetDay);


appData.getStatusIncome = function(){
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

console.log(appData.getStatusIncome());