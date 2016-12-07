import { Injectable } from '@angular/core';
import { Budget } from '../classes/budget';
import { Entry } from '../classes/entry';

import * as moment from 'moment';
import * as _ from 'lodash';

import { LocalStorage, SessionStorage } from "../../../node_modules/angular2-localstorage/WebStorage";
import { i18n } from '../localization';

@Injectable()
export class BudgetService {
  @LocalStorage('budgets') private budgets : Budget[] = [];

  constructor() {}

  resetBudgets() : void {
    this.budgets = [];
  }

  getBudgets() : Budget[] {
    return this.budgets;
  }

  getBudget(pId : number) : Budget {
    return _.find(this.budgets, function(budget) {
      return budget.id === pId;
    });
  }

  addEntry(pBudgetId : number, pEntry : Entry) : boolean {
    let response = false;
    let index : number = _.findIndex(this.budgets, (budget) => {
      return budget.id === pBudgetId;
    });
    if(index !== -1) {
      this.budgets[index].entries.push(pEntry);
      response = true;
    }
    return response;
  }

  createCurrentBudget(pDescription? : string, pStartDate? : Date, pEndDate? : Date) : Budget {
    pDescription = (_.isEmpty(pDescription)) ? i18n.BUDGET_DEFAULT_DESCRIPTION : pDescription;
    pStartDate = (_.isEmpty(pStartDate)) ? moment().startOf('month').toDate() : pStartDate;
    pEndDate = (_.isEmpty(pEndDate)) ? moment().endOf('month').toDate() : pEndDate;
    let newCurrentBudget = new Budget(this.budgets.length+1, pDescription, pStartDate, pEndDate, []);
    this.budgets.push(newCurrentBudget);
    return newCurrentBudget;
  }

  getCurrentBudget() : Promise<Budget> {
    let _this = this;
    let today = moment();
    return new Promise((resolve, reject) => {
      let currentBudget = _.find(_this.budgets, function(budget) {
        return moment(budget.startDate).isSameOrBefore(today)
            && moment(budget.endDate).isSameOrAfter(today);
      });
      currentBudget = (_.isEmpty(currentBudget)) ? _this.createCurrentBudget() : currentBudget;
      resolve(currentBudget);
    });
  }

  getIncome(pBudget : Budget) : number {
    let income : number = 0;
    if(!_.isEmpty(pBudget)) {
      pBudget.entries.forEach(function(entry, index) {
        if(entry.income) {
          let value = parseFloat(entry.value.toString());
          income += value;
        }
      });
    }
    return income;
  }

  getExpenses(pBudget : Budget) : number {
    let expense : number = 0;
    if(!_.isEmpty(pBudget)) {
      pBudget.entries.forEach(function(entry, index) {
        if(!entry.income) {
          let value = parseFloat(entry.value.toString());
          expense += value;
        }
      });
    }
    return expense;
  }

  getBalance(pBudget : Budget) : number {
    let balance : number = 0;
    if(!_.isEmpty(pBudget)) {
      pBudget.entries.forEach(function(entry, index) {
        let value = parseFloat(entry.value.toString());
        if(entry.income) {
          balance += value;
        } else {
          balance -= value;
        }
      });
    }
    return balance;
  }

  entryIsInTheBudget(date : Date, budget : Budget) {
    let momentDate = moment(date);
    let startDate = moment(budget.startDate);
    let endDate = moment(budget.endDate);
    return (momentDate.isSameOrAfter(startDate) && momentDate.isSameOrBefore(endDate));
  }
}
