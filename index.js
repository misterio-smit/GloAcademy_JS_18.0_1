'use strict';


let buttonStart = document.getElementById('start'),
    btnPlus = document.getElementsByTagName('button'),
    buttonIncomePlus = btnPlus[0],
    buttonExpensesPlus = btnPlus[1],
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    depositCheckBox = document.querySelector('#deposit-check'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    accumulatedMonthValue = document.getElementsByClassName('accumulated_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeItems = document.querySelectorAll('.income-items'),
    expensesTitle = document.querySelectorAll('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpenses = document.querySelectorAll('.additional_expenses'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    buttonCancel = document.getElementById('cancel'),
    checkBox = document.querySelector('#deposit-check');

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


    check: function(){

    if (salaryAmount.value !== ''){
        buttonStart.removeAttribute('disabled');
    }
  },
    
  
  start: function(){
    
    if(salaryAmount.value === ''){
        buttonStart.setAttribute('disabled', 'true');
        return;
      }

    let allInputs = document.querySelectorAll('.data input[type = text]');
        allInputs.forEach(function(item){
        item.setAttribute('disabled', 'true');
      });
      
      buttonExpensesPlus.setAttribute('disabled', 'true');
      buttonIncomePlus.setAttribute('disabled', 'true');
      buttonStart.style.display = 'none';
      buttonCancel.style.display = 'block';

      this.butget = +salaryAmount.value;
      
      this.getExpenses();
      this.getIncome();
      this.getExpensesMonth();
      this.getAddExpenses();
      this.getAddIncome();
      this.getBudget();
      this.getTargetMonth();
      this.getStatusIncome();   
      this.showResult();               
  },

 

  showResult: function(){
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcPeriod();
      
    periodSelect.addEventListener('input', () => {
    incomePeriodValue.value = appData.calcPeriod();
    });
  },


  addExpensesBlock: function(){
      
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
      let cashIncome = item.querySelector('.income-amount').value;
      if(itemIncome !== '' && cashIncome !== ''){
          appData.income[itemIncome] = cashIncome;
      }
    });


    for(let key in this.income){
      this.incomeMonth += +this.income[key];
      
    }
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

    //Функция возвращает сумму обязательных расходов 
  getExpensesMonth: function(){
      for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
      }
      
  },

    //Функция возвращает  накопления за месяц. Доход минус расходы
  getBudget: function(){
      appData.budgetMonth = this.butget + this.incomeMonth - this.expensesMonth;
      appData.budgetDay = Math.floor(this.budgetMonth / 30);
   
  },

    //Функция возвращает количество месяцев для достижения цели
  getTargetMonth: function(){ 
      return Math.ceil(targetAmount.value / this.budgetMonth);
      
  },

    getStatusIncome:function(){
        if (this.budgetDay >= 1200) {
          return('У вас высокий уровень дохода');
        }else if(this.budgetDay >= 600 && this.budgetDay < 1200){
            return('У вас средний уровень дохода');
        }else if  (this.budgetDay < 600 && this.budgetDay > 0){
            return('К сожалению у вас уровень дохода ниже среднего');
        }else if (this.budgetDay <= 0){
            return('Что то пошло не так');
        }
    },

    calcPeriod: function(){
      return this.budgetMonth * periodSelect.value;
    },   

  reset: function(){
   
   let resultInputAll = document.querySelectorAll('.result input[type = text]'),
       allInputs = document.querySelectorAll('.data input[type = text]');
       
       allInputs.forEach(function(elem){
          elem.value = '';
          elem.removeAttribute('disabled');
          periodSelect.value = '0';
          periodAmount.innerHTML = periodSelect.value;
        });

        resultInputAll.forEach(function(elem){
            elem.value = '';
        });

    for(let i = 1; i < incomeItems.length; i++) {
      incomeItems[i].parentNode.removeChild(incomeItems[i]);
      buttonExpensesPlus.style.display = 'block';     
    }
    
    for(let i = 1; i < expensesItems.length; i++){
      expensesItems[i].parentNode.removeChild(expensesItems[i]);
      buttonIncomePlus.style.display = 'block';
    }

    this.income = {}; 
    this.expenses = {};
    this.addIncome = [];
    this.butget = 0;
    this.incomeMonth = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.addExpenses = [];
    this.deposit = false;
    
    
    buttonCancel.style.display = 'none';
    buttonStart.style.display = 'block';
    buttonExpensesPlus.removeAttribute('disabled');
    buttonIncomePlus.removeAttribute('disabled');
    checkBox.checked = false;
    
  },
};


buttonStart.addEventListener('click', appData.start.bind(appData));     
buttonExpensesPlus.addEventListener('click', appData.addExpensesBlock);
buttonIncomePlus.addEventListener('click', appData.addIncomeBlock);
salaryAmount.addEventListener('keyup', appData.check);
buttonCancel.addEventListener('click', appData.reset.bind(appData));

periodSelect.addEventListener('input', () => { 
    periodAmount.innerText = periodSelect.value;
});
 