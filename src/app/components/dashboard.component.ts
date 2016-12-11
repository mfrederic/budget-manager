import { Component } from '@angular/core';
import { i18n } from '../localization';
import { EntryService } from '../services/entry.service';
import { BudgetService } from '../services/budget.service';

import * as moment from 'moment';
import * as _ from 'lodash';

import { LocalStorage, SessionStorage } from "../../../node_modules/angular2-localstorage/WebStorage";

import { Budget } from '../classes/budget';
import { Entry } from '../classes/entry';

@Component({
  templateUrl: './views/dashboard.component.html',
  providers: [EntryService, BudgetService]
})
export class DashboardComponent {
  public local : any = null;
  public budget : Budget = null;
  public newEntry : Entry = null;
  public newEntryDate : string = null;

  public budgetChart : any = [];

  constructor(private entryService : EntryService, private budgetService : BudgetService) {
    let _this = this;
    this.newEntry = new Entry();
    this.budgetService.getCurrentBudget().then(function(data) {
      _this.budget = data;
    });
    this.local = i18n;
  }

  deleteEntry(index : number) : void {
    if(this.entryService.deleteEntry(index)) {
      this.budget.entries.splice(index, 1);
    }
  }

  createEntry() : void {
    this.newEntry.date = moment(this.newEntryDate, this.local.DATE_FORMAT).toDate();
    if(this.entryService.createEntry(this.newEntry)) {
      if(this.budgetService.entryIsInTheBudget(this.newEntry.date, this.budget)) {
        this.budget.entries.push(this.newEntry);
      }
      this.newEntry = new Entry();
      this.newEntryDate = null;
    }
  }
}
