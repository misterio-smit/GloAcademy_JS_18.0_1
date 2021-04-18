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

let expenses = {};
let appData = {
    butget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 6,

    
    asking: function(){
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        
        for(let i = 0; i < 2; i++){
            let name = prompt('Введите обязательную статью расходов?');

            let money = +prompt('Во сколько это обойдется?');

            while(!isNumber(money)){
                money = +prompt('Во сколько это обойдется?');
            }
            
            expenses[name] = money;
        }
        console.log(expenses);
    },

    //Функция возвращает сумму обязательных расходов 
    //   getExpensesMonth: function(){
    //   let sum = 0;
    //   let expenses = [];

    //   for(let i = 0; i < 2; i++){
    //     expenses[i] = prompt('Введите обязательную статью расходов?');
        
    //     sum += +prompt('Во сколько это обойдется?');
        
    //     while(!isNumber(sum)){
    //       sum = +prompt('Во сколько это обойдется?');
    //     }
    //   }
    //   console.log(expenses);
    //   return sum;
    // },

    //Функция возвращает  накопления за месяц. Доход минус расходы
    getAccumulatedMonth: function(){
      
      let accumulatedMonth = money - appData.butget;
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

 appData.asking();

appData.expensesAmount = appData.butget;

console.log('Сумма обязательных расходов ' + appData.expensesAmount);

appData.getTargetMonth();

appData.getStatusIncome();

console.log(appData.getAccumulatedMonth());

console.log(appData.addExpenses);
console.log(appData.accumulatedMonth);