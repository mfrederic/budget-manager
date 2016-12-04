import { Component, Input } from '@angular/core';
import { i18n } from '../localization';
import { EntryService } from '../services/entry.service';
import { BudgetService } from '../services/budget.service';

import * as Moment from 'moment';
import * as _ from 'lodash';

import { Budget } from '../classes/budget';
import { Entry } from '../classes/entry';

@Component({
  selector: 'last-entries',
  templateUrl: './views/last-entry.component.html',
  providers: [EntryService, BudgetService]
})
export class LastEntryComponent {
  @Input() public budget : Budget;
  public local : any;
  public moment : any;

  constructor() {
    this.moment = Moment;
    this.local = i18n;
  }
}
