import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
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
export class LastEntryComponent implements OnChanges {
  @Input() public budget : Budget;
  public local : any;
  public moment : any;
  public entries : Entry[] = [];

  constructor() {
    this.moment = Moment;
    this.local = i18n;
  }

  setLastEntries() : void {
    let sortedEntries = _.reverse(_.sortBy(this.budget.entries, [(entry) => {
      return entry.date;
    }]));
    this.entries = _.slice(sortedEntries, 0, 5);
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    var _this = this;
    for (let propName in changes) {
      _this[propName] = changes[propName].currentValue;
    }
    this.setLastEntries();
  }
}
