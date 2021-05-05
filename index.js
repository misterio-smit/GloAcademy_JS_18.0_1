'use strict';


let buttonStart = document.getElementById('start'),
    btnPlus = document.getElementsByTagName('button'),
    buttonIncomePlus = btnPlus[0],
    buttonExpensesPlus = btnPlus[1],
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    depositCheckBox = document.querySelector('#deposit-check'),
    budgetDayValie = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    accumulatedMonthValue = document.getElementsByClassName('accumulated_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeItems = document.querySelectorAll('.income-items'),
    expensesTitle = document.querySelectorAll('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpenses = document.querySelectorAll('.additional_expenses'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.title period-amount'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount');


let isNumber = function(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
};

      
let appData = {

    income: {}, 
    expenses: {},
    addIncome: [],
    butget:0,
    incomeMonth: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    addExpenses: [],
    deposit: false,
  

    start:function(){
  
    appData.butget = +salaryAmount.value;
    
    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.rangeSlider();
    appData.getBudget();
    appData.showResult();
    
    appData.getTargetMonth();
    appData.getStatusIncome();
      
  },

  showResult: function(){
      budgetMonthValue.value = appData.budgetMonth;
      budgetDayValie.value = appData.budgetDay;
      expensesMonthValue.value = appData.expensesMonth;
      additionalExpensesValue.value = appData.addExpenses.join(', ');
      additionalIncomeValue.value = appData.addIncome.join(', ');
      targetMonthValue.value = appData.getTargetMonth();
      incomePeriodValue.value = appData.calcPeriod();
      
  },


  addExpensesBlock: function(){
      //console.log(expensesItems.parentNode);
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelector('.expenses-title').value = '';
    cloneExpensesItem.querySelector('.expenses-amount').value = '';
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonExpensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3){
            buttonExpensesPlus.style.display = 'none';
        }
  },

  addIncomeBlock: function(){
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.querySelector('.income-title').value = '';
    cloneIncomeItem.querySelector('.income-amount').value = '';
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, buttonIncomePlus);
    incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3){
            buttonIncomePlus.style.display = 'none';
        }
  },


  getExpenses: function(){
    expensesItems.forEach(function(item){
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
        if(itemExpenses !== '' && cashExpenses !== ''){
            appData.expenses[itemExpenses] = cashExpenses;

      }
    });
  },

  getIncome: function(){
    incomeItems.forEach(function(item){
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').vlaue;
      if(itemIncome !== '' && cashIncome !== ''){
          appData.income[itemIncome] = cashIncome;
      }
    });
  },


  getAddExpenses: function(){
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
      item = item.trim();
      if(item !== ''){
        appData.addExpenses.push(item);
      }
    });
  },

  getAddIncome: function(){
      additionalIncomeItem.forEach(function(item){
        let itemValue = item.value.trim();
        if(itemValue !== ''){
          appData.addIncome.push(itemValue);
        }
      });
  },

  rangeSlider: function(){
      periodSelect = document.querySelector('.period-select'); 
      //   periodAmount = document.querySelector('.title period-amount');
       periodAmount = +periodSelect.value;
      console.log(periodAmount);
    
    
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
      appData.budgetMonth = appData.butget + appData.incomeMonth - appData.expensesMonth;
      appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },

    //Функция возвращает количество месяцев для достижения цели
  getTargetMonth: function(){ 
      let periodMission = Math.ceil(targetAmount.value / appData.budgetMonth);
        if (periodMission > 0){
          console.log('Цель будет достигнута за ' +  periodMission + ' месяцев(-а)');
        }else{
          console.log('Цель не будет достигнута');
        }
      return periodMission;
    },

    getStatusIncome:function(){
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

    calcPeriod: function(){
      return appData.budgetMonth * periodSelect.value;
    },   
};


buttonStart.addEventListener('click',  () => {
  if (salaryAmount.value === ''){
    buttonStart.style.disabled = true;
  }else{
    appData.start();
  }
});

      
buttonExpensesPlus.addEventListener('click', appData.addExpensesBlock);

buttonIncomePlus.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('input', appData.rangeSlider);

