import { Component, Input, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { i18n } from '../localization';

import * as Chartist from 'chartist';

import { BudgetService } from '../services/budget.service';
import { EntryService } from '../services/entry.service';
import { Budget } from '../classes/budget';
import { Entry } from '../classes/entry';

@Component({
  selector: 'balance',
  template: `<div class="card text-xs-center">
              <div class="card-header">{{local.CURRENT_BUDGET}}</div>
              <div class="card-block">
                <div class="ct-chart-balance"></div>
              </div>
              <div class="card-footer">
                {{local.BALANCE}} : <span [ngClass]="{'text-success' : balanceIsPositive(), 'text-danger' : balanceIsNegative()}">{{getCurrentBudgetBalance()}} {{local.CURRENCY}}</span>
              </div>
            </div>`
})
export class BalanceComponent implements OnInit {
  @Input() budget : Budget;
  public local : any;

  private entries : Entry[] = [];
  private chart : any = null;
  private data : any = null;

  constructor(private budgetService : BudgetService, private entryService : EntryService) {
    let _this = this;
    this.local = i18n;
    this.entryService.updateEntry$.subscribe(
      (update) => {
        _this.loadBudgetData();
      });
  }

  loadBudgetData() : void {
    this.entries = this.entryService.getEntriesBetween(this.budget.startDate, this.budget.endDate);
    this.updateChart();
  }

  ngOnInit() {
    let _this = this;
    this.loadBudgetData();
    this.chart = new Chartist.Pie('.ct-chart-balance', this.generateBudgetChart(), {
      donut: true,
      donutWidth: 60,
      labelInterpolationFnc: function(value, index) {
        return _this.data.series[index] + i18n.CURRENCY;
      }
    });
  }

  private generateBudgetChart() : any {
    this.data = {labels: ['income', 'expenses'], series:[
      this.budgetService.getIncome(this.entries),
      this.budgetService.getExpenses(this.entries)
    ]};
    return this.data;
  }

  updateChart() : void {
    if(this.chart !== null) {
      this.chart.update(this.generateBudgetChart());
    }
  }

  getCurrentBudgetBalance() : number {
    return (this.budget !== null) ? this.budgetService.getBalance(this.entries) : 0;
  }

  balanceIsPositive() : boolean {
    return (this.budget !== null) ? this.budgetService.getBalance(this.entries) >= 0 : true;
  }

  balanceIsNegative() : boolean {
    return (this.budget !== null) ? this.budgetService.getBalance(this.entries) <= 0 : false;
  }
}
