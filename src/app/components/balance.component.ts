import { Component, Input, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { i18n } from '../localization';

import * as Chartist from 'chartist';

import { BudgetService } from '../services/budget.service';

@Component({
  selector: 'balance',
  template: `<div class="card text-xs-center">
              <div class="card-header">{{local.CURRENT_BUDGET}}</div>
              <div class="card-block">
                <div class="ct-chart"></div>
              </div>
              <div class="card-footer">
                {{local.BALANCE}} : <span [ngClass]="{'text-success' : balanceIsPositive(), 'text-danger' : balanceIsNegative()}">{{getCurrentBudgetBalance()}} {{local.CURRENCY}}</span>
              </div>
            </div>`
})
export class BalanceComponent implements OnInit, OnChanges {
  @Input() budget : any;
  public local : any;

  private chart : any = null;
  private data : any = null;

  constructor(private budgetService : BudgetService) {
    this.local = i18n;
  }

  ngOnInit() {
    let _this = this;
    this.chart = new Chartist.Pie('.ct-chart', this.generateBudgetChart(), {
      donut: true,
      donutWidth: 60,
      labelInterpolationFnc: function(value, index) {
        return _this.data.series[index] + i18n.CURRENCY;
      }
    });
  }

  private generateBudgetChart() : any {
    this.data = {labels: ['income', 'expenses'], series:[
      this.budgetService.getIncome(this.budget),
      this.budgetService.getExpenses(this.budget)
    ]};
    return this.data;
  }

  updateChart() : void {
    if(this.chart !== null) {
      this.chart.update(this.generateBudgetChart());
    }
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    var _this = this;
    for (let propName in changes) {
      _this[propName] = changes[propName].currentValue;
    }
    this.updateChart();
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
