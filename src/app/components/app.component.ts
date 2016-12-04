import { Component } from '@angular/core';
import { i18n } from '../localization';
import { EntryService } from '../services/entry.service';
import { BudgetService } from '../services/budget.service';

import * as _ from 'lodash';

import { LocalStorage, SessionStorage } from "../../../node_modules/angular2-localstorage/WebStorage";

import { Budget } from '../classes/budget';
import { Entry } from '../classes/entry';

@Component({
  selector: 'app-root',
  templateUrl: './views/app.component.html',
  providers: [EntryService, BudgetService]
})
export class AppComponent {
  public local : any = null;
  public budget : Budget = null;
  public newEntry : Entry = null;

  public budgetChart : any = [];

  constructor(private entryService : EntryService, private budgetService : BudgetService) {
    let _this = this;
    this.newEntry = new Entry();
    this.budgetService.getCurrentBudget().then(function(data) {
      _this.budget = data;
      _this.budgetChart = {labels: ['income', 'expenses'], series:[
        _this.budgetService.getIncome(data),
        _this.budgetService.getExpenses(data)
      ]};
    });
    this.local = i18n;
  }

  deleteEntry(index : number) : void {
    if(this.entryService.deleteEntry(index)) {
      this.budget.entries.splice(index, 1);
    }
  }

  createEntry() : void {
    if(this.entryService.createEntry(this.newEntry)) {
      this.budget.entries.push(this.newEntry);
      this.newEntry = new Entry();
    }
  }

  getCurrentBudgetBalance() : number {
    return (this.budget !== null) ? this.budgetService.getBalance(this.budget) : 0;
  }

  balanceIsPositive() : boolean {
    return (this.budget !== null) ? this.budgetService.getBalance(this.budget) >= 0 : true;
  }

  balanceIsNegative() : boolean {
    return (this.budget !== null) ? this.budgetService.getBalance(this.budget) <= 0 : false;
  }
}
