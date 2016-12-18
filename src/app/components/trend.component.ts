import { Component, Input, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { i18n } from '../localization';

import * as Chartist from 'chartist';
import * as _ from 'lodash';
import * as Moment from 'moment';

import { BudgetService } from '../services/budget.service';
import { EntryService } from '../services/entry.service';
import { Budget } from '../classes/budget';
import { Entry } from '../classes/entry';

@Component({
  selector: 'trend',
  template: `<div class="card text-xs-center">
              <div class="card-header">{{local.TREND}}</div>
              <div class="card-block">
                <div class="ct-chart-trend"></div>
              </div>
              <div class="card-footer"></div>
            </div>`
})
export class TrendComponent implements OnInit {
  @Input() budget : Budget;
  public local : any;
  public moment : any;

  private entries : Entry[] = [];
  private chart : any = null;
  private data : any = null;

  constructor(private budgetService : BudgetService, private entryService : EntryService) {
    let _this = this;
    this.moment = Moment;
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
    this.chart = new Chartist.Line('.ct-chart-trend',
      this.generateBudgetChart(), {
        fullWidth: true,
        series: { 'serie': { lineSmooth: Chartist.Interpolation.step() } }
      });
  }

  private generateBudgetChart() : any {
    let grouped = _.groupBy(this.entries, (entry) => entry.date);
    let data = {labels: [], series: []};
    let serie = { name: 'serie', data: []};
    let currentValue = 0;
    _.forEach(grouped, (value, key) => {
      data.labels.push(Moment(key).format('DD/MM'));
      _.forEach(value, (v, k) => {
        currentValue = (v.income) ? currentValue + v.value : currentValue - v.value;
      });
      serie.data.push(currentValue);
    });
    data.series.push(serie);
    this.data = data;
    return this.data;
  }

  updateChart() : void {
    if(this.chart !== null) {
      this.chart.update(this.generateBudgetChart());
    }
  }
}
