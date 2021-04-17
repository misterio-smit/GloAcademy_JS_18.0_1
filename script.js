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
    

    asking: function(){
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        
        console.log(appData);

        for(let i = 0; i < 2; i++){
            let name = prompt('Введите обязательную статью расходов?');

            let moneys = +prompt('Во сколько это обойдется?');

            while(!isNumber(moneys)){
                moneys = +prompt('Во сколько это обойдется?');
            }
            
         
            appData.expenses[name] = money;
        }
        console.log('вывод экспенсес' + appData.expenses);

    },
    //Функция возвращает  накопления за месяц. Доход минус расходы
    getBudget: function(){
      let accumulatedMonth = money - appData.getExpensesMonth;
    return accumulatedMonth;
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
    getStatusIncome: function(){
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
    getExpensesMonth: function(){
      for (let keys in appData.expenses) {
  let items = appData.expenses[keys];
        console.log('"данные: " ' + items);
    }

    },

  
};
for (let key in appData) {
    let item = appData[key];
    console.log('"Наша программа включает в себя данные: " ' + item);
  }

appData.asking();



// let expensesAmount = getExpensesMonth();

// console.log('Сумма обязательных расходов ' + expensesAmount);

appData.getTargetMonth();


appData.budgetDay = Math.floor(appData.getBudget() / 30);
console.log('Бюджет на день: ' + appData.budgetDay);




console.log(appData.getStatusIncome());


