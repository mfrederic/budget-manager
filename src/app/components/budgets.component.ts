import { Component, OnInit } from '@angular/core';
import { i18n } from '../localization';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import * as Moment from 'moment';
import * as _ from 'lodash';

import { EntryService } from '../services/entry.service';
import { BudgetService } from '../services/budget.service';
import { Budget } from '../classes/budget';
import { Entry } from '../classes/entry';

@Component({
  templateUrl: './views/budgets.component.html',
  providers: [EntryService, BudgetService]
})
export class BudgetsComponent implements OnInit{
  public local : any;
  public moment : any;
  public budgets : Budget[];

  constructor(private route : ActivatedRoute, private budgetService : BudgetService, private entryService : EntryService) {
    this.local = i18n;
    this.moment = Moment;
    this.budgets = [];
  }

  ngOnInit() {
    let _this = this;
    let id = +this.route.snapshot.params['id'];
    this.budgets = this.budgetService.getBudgets();
  }

  getBudgetBalance(pId : number) : number {
    let budget : Budget = _.find(this.budgets, (budget) => budget.id == pId);
    let entries : Entry[] = this.entryService.getEntriesBetween(budget.startDate, budget.endDate);
    return this.budgetService.getBalance(entries);
  }
}
