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
  templateUrl: './views/budget.component.html',
  providers: [EntryService, BudgetService]
})
export class BudgetComponent implements OnInit{
  public local : any;
  public moment : any;
  public budget : Budget;
  public entries : Entry[];

  constructor(private route : ActivatedRoute, private budgetService : BudgetService, private entryService : EntryService) {
    this.local = i18n;
    this.moment = Moment;
    this.budget = null;
    this.entries = [];
  }

  ngOnInit() {
    let _this = this;
    let id = +this.route.snapshot.params['id'];
    this.budgetService.getBudget(id).then(function(data) {
      _this.budget = data;
      _this.entries = _this.entryService.getEntriesBetween(data.startDate, data.endDate);
    });
  }
}
