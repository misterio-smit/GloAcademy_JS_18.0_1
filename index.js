'use strict';

  let incomeItems = document.querySelectorAll('.income-items'),
      expensesItems = document.querySelectorAll('.expenses-items');
      
const buttonStart = document.getElementById('start'),
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
      expensesTitle = document.querySelectorAll('.expenses-title'),
      additionalExpenses = document.querySelectorAll('.additional_expenses'),
      periodSelect = document.querySelector('.period-select'),
      periodAmount = document.querySelector('.period-amount'),
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      targetAmount = document.querySelector('.target-amount'),
      buttonCancel = document.getElementById('cancel'),
      checkBox = document.querySelector('#deposit-check');

const isNumber = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

class AppData {
    constructor(income = {}, expenses = {}, addIncome = [], butget = 0, incomeMonth = 0,
                budgetDay = 0, budgetMonth = 0, expensesMonth = 0, addExpenses = [], deposit = false){
        this.income = income;
        this.expenses = expenses;
        this.addIncome = addIncome;
        this.butget = butget;
        this.incomeMonth = incomeMonth;
        this.budgetDay = budgetDay;
        this.budgetMonth = budgetMonth;
        this.expensesMonth = expensesMonth;
        this.addExpenses = addExpenses;
        this.deposit = deposit;
        }
 
check() {

  if (salaryAmount.value !== '') {
    buttonStart.removeAttribute('disabled');
  }
}

start() {

  if (salaryAmount.value === '') {
    buttonStart.setAttribute('disabled', 'true');
    return;
  }

  let allInputs = document.querySelectorAll('.data input[type = text]');
      allInputs.forEach((item) => {
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
  // this.getStatusIncome();
  this.showResult();
  
}

showResult() {
  const _this = this;

  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = this.budgetDay;
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(', ');
  additionalIncomeValue.value = this.addIncome.join(', ');
  targetMonthValue.value = this.getTargetMonth();
  incomePeriodValue.value = this.calcPeriod();

  periodSelect.addEventListener('input', () => {
    incomePeriodValue.value = _this.calcPeriod();
  });
}

addExpensesBlock() {

  let cloneExpensesItem = expensesItems[0].cloneNode(true);
  cloneExpensesItem.querySelector('.expenses-title').value = '';
  cloneExpensesItem.querySelector('.expenses-amount').value = '';
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonExpensesPlus);
  expensesItems = document.querySelectorAll('.expenses-items');
  if (expensesItems.length === 3) {
    buttonExpensesPlus.style.display = 'none';
  }
}

addIncomeBlock() {

  let cloneIncomeItem = incomeItems[0].cloneNode(true);
  cloneIncomeItem.querySelector('.income-title').value = '';
  cloneIncomeItem.querySelector('.income-amount').value = '';
  incomeItems[0].parentNode.insertBefore(cloneIncomeItem, buttonIncomePlus);
  incomeItems = document.querySelectorAll('.income-items');
  if (incomeItems.length === 3) {
    buttonIncomePlus.style.display = 'none';
  }
}

getExpenses() {
  const _this = this;

  expensesItems.forEach((item) => {
    let itemExpenses = item.querySelector('.expenses-title').value;
    let cashExpenses = item.querySelector('.expenses-amount').value;
    if (itemExpenses !== '' && cashExpenses !== '') {
      _this.expenses[itemExpenses] = cashExpenses;
    }
  });
}


getIncome() {
  const _this = this;
  incomeItems.forEach((item) => {
    let itemIncome = item.querySelector('.income-title').value;
    let cashIncome = item.querySelector('.income-amount').value;
    if (itemIncome !== '' && cashIncome !== '') {
      _this.income[itemIncome] = cashIncome;
    }
  });

  for (let key in this.income) {
    this.incomeMonth += +this.income[key];

  }
}

getAddExpenses() {
  const _this = this;
  let addExpenses = additionalExpensesItem.value.split(',');
  addExpenses.forEach((item) => {
    item = item.trim();
    if (item !== '') {
      _this.addExpenses.push(item);
    }
  });
}

getAddIncome() {
  const _this = this;
  additionalIncomeItem.forEach((item) => {
    let itemValue = item.value.trim();
    if (itemValue !== '') {
      _this.addIncome.push(itemValue);
    }
  });
}

getExpensesMonth() {
  for (let key in this.expenses) {
    this.expensesMonth += +this.expenses[key];
  }
}


getBudget() {
  this.budgetMonth = this.butget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = Math.floor(this.budgetMonth / 30);

}

//Функция возвращает количество месяцев для достижения цели
getTargetMonth() {
  return Math.ceil(targetAmount.value / this.budgetMonth);

}

// getStatusIncome() {
//   if (this.budgetDay >= 1200) {
//     return ('У вас высокий уровень дохода');
//   } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
//     return ('У вас средний уровень дохода');
//   } else if (this.budgetDay < 600 && this.budgetDay > 0) {
//     return ('К сожалению у вас уровень дохода ниже среднего');
//   } else if (this.budgetDay <= 0) {
//     return ('Что то пошло не так');
//   }
// }

calcPeriod() {
  return this.budgetMonth * periodSelect.value;
}

reset() {

  let resultInputAll = document.querySelectorAll('.result input[type = text]'),
    allInputs = document.querySelectorAll('.data input[type = text]');

  allInputs.forEach((elem) => {
    elem.value = '';
    elem.removeAttribute('disabled');
    periodSelect.value = '0';
    periodAmount.innerHTML = periodSelect.value;
  });

  resultInputAll.forEach((elem) => {
    elem.value = '';
  });

  for (let i = 1; i < incomeItems.length; i++) {
    incomeItems[i].parentNode.removeChild(incomeItems[i]);
    buttonExpensesPlus.style.display = 'block';
  }

  for (let i = 1; i < expensesItems.length; i++) {
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

}

eventListeners() {
  const _this = this;
  buttonStart.addEventListener('click', _this.start.bind(_this));
  buttonExpensesPlus.addEventListener('click', _this.addExpensesBlock);
  buttonIncomePlus.addEventListener('click', _this.addIncomeBlock);
  salaryAmount.addEventListener('keyup', _this.check);
  buttonCancel.addEventListener('click', _this.reset.bind(_this));

  periodSelect.addEventListener('input', () => {
    periodAmount.innerText = periodSelect.value;
  });
}

}
const appData = new AppData();
appData.eventListeners();








