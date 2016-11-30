import { Injectable } from '@angular/core';
import { Entry } from '../classes/entry';

import * as lodash from 'lodash';

import { LocalStorage, SessionStorage } from "../../../node_modules/angular2-localstorage/WebStorage";
import { i18n } from '../localization';

@Injectable()
export class EntryService {
  @LocalStorage('budgetEntry') private entries : Entry[] = [];

  constructor() {
    this.entries = [
      new Entry(1, 'Test', 50, null, false, null, false)
    ];
  }

  getExpenses() : Entry[] {
    return this.entries;
  }

  /** Create an expense form an Entry instance */
  createExpense(entry : Entry) : boolean {
    let result = false;
    if(entry.income) {
      throw new TypeError(i18n.WRONG_ENTRY_TYPE_EXCEPTION);
    } else if(lodash.includes(this.entries, entry)) {
      throw new TypeError(i18n.ENTRY_ALREADY_EXISTS_EXCEPTION);
    } else {
      this.entries.push(entry);
      result = true;
    }
    return result;
  }
}
