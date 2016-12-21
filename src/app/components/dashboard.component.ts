import { Component } from '@angular/core';
import { i18n } from '../localization';

import * as moment from 'moment';

import { EntryService } from '../services/entry.service';
import { BudgetService } from '../services/budget.service';
import { SettingsService } from '../services/settings.service';
import { Budget } from '../classes/budget';

@Component({
  templateUrl: './views/dashboard.component.html',
  providers: [SettingsService, EntryService, BudgetService]
})
export class DashboardComponent {
  public local : any = null;
  public budget : Budget = null;
  public budgetStartDay : string = null;

  constructor(private settingsService : SettingsService, private entryService : EntryService, private budgetService : BudgetService) {
    this.local = i18n;
    this.loadBudgetData();

    this.entryService.updateEntry$.subscribe(
      (update) => {
        this.loadBudgetData();
      });
  }

  private loadBudgetData() : void {
    let context = this;
    this.budgetService.getCurrentBudget().then(function(data) {
      context.budget = data;
    });
    this.budgetStartDay = this.settingsService.getSetting('S_START_BUDGET_DATE');
  }

  buildDate(pDate : string) : Date {
    let formatDate = moment(pDate, this.local.DATE_FORMAT);
    if(!formatDate.isValid()) {
      formatDate = moment(pDate, this.local.DATE_FORMAT_ENG);
    }
    return formatDate.toDate();
  }
}
