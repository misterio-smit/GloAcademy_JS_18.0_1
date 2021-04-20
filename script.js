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
    
let appData = {

    income: {}, 
    expenses: {},
    addIncome: [],
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
            
            appData.expenses[name] = money;
        }
        
    },

    //Функция возвращает сумму обязательных расходов 
      getExpensesMonth: function(){
      for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
    return appData.expensesMonth;
    },

    //Функция возвращает  накопления за месяц. Доход минус расходы
    getBudget: function(){
      
      appData.budgetMonth = appData.butget - appData.expensesMonth;
    return appData.budgetMonth;
    },

    //Функция возвращает количество месяцев для достижения цели
    getTargetMonth: function(){ 
      let periodMission = Math.ceil(appData.mission / appData.getBudget());
        if (periodMission > 0){
          console.log('Цель будет достигнута за ' +  periodMission + ' месяцев(-а)');
        }else{
          console.log('Цель не будет достигнута');
        }
      return periodMission;
    },

    getStatusIncome:function(){
        appData.budgetDay = Math.floor(appData.getBudget() / 30);
      

        if (appData.budgetDay >= 1200) {
          return('У вас высокий уровень дохода');
        }else if(appData.budgetDay >= 600 && appData.budgetDay < 1200){
            return('У вас средний уровень дохода');
        }else if  (appData.budgetDay < 600 && appData.budgetDay > 0){
            return('К сожалению у вас уровень дохода ниже среднего');
        }else if (appData.budgetDay <= 0){
            return('Что то пошло не так');
        }
    },

};

appData.asking();

appData.getExpensesMonth();

appData.getBudget();

appData.getTargetMonth();

appData.getStatusIncome();

console.log('Сумма обязательных расходов ' + appData.expensesMonth);

console.log(appData.getStatusIncome());



for (let key in appData) {
  
  console.log('"Наша программа включает в себя данные: " ' + key + ' ' + appData[key]);
}