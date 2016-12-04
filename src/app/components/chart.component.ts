import { Component, Input, OnInit } from '@angular/core';
import { i18n } from '../localization';

import * as Chartist from 'chartist';

@Component({
  selector: 'chartist',
  template: `<div class="ct-chart"></div>`
})
export class ChartComponent implements OnInit {
  @Input() data : any;

  constructor() {}

  ngOnInit() {
    let _this = this;
    new Chartist.Pie('.ct-chart', this.data, {
      donut: true,
      donutWidth: 60,
      startAngle: 270,
      labelInterpolationFnc: function(value, index) {
        return _this.data.series[index] + i18n.CURRENCY;
      }
    });
  }

}
