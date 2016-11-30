import { Injectable } from '@angular/core';
import { Entry } from '../classes/entry';

import * as _ from 'lodash';

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

  /** Create an entry form an Entry instance */
  createEntry(entry : Entry) : boolean {
    let result = false;
    if(_.find(this.entries, function(e) { return e.equals(entry) }) !== null) {
      result = false;
    } else {
      this.entries.push(entry);
      result = true;
    }
    console.log(this.entries);
    return result;
  }

  deleteEntry(index : number) : boolean {
    let before : number = this.entries.length;
    if(this.entries.splice(index, 1).length === before) {
      return false;
    } else {
      return true;
    }
  }
}
