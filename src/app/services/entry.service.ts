import { Injectable } from '@angular/core';
import { Entry } from '../classes/entry';
import { Budget } from '../classes/budget';

import * as _ from 'lodash';

import { LocalStorage, SessionStorage } from "../../../node_modules/angular2-localstorage/WebStorage";
import { i18n } from '../localization';

@Injectable()
export class EntryService {
  @LocalStorage('budgetEntry') private entries : Entry[] = [];

  constructor() {}

  resetEntries() : void {
    this.entries = [];
  }

  getExpenses() : Entry[] {
    return this.entries;
  }

  /** Create an entry form an Entry instance */
  createEntry(entry : Entry) : boolean {
    let result = false;
    if(_.find(this.entries, function(e) { return this.equals(e, entry) }) !== null) {
      result = false;
    } else {
      this.entries.push(entry);
      result = true;
    }
    return result;
  }

  /** Delete an entry from Entry instance */
  deleteEntry(index : number) : boolean {
    let before : number = this.entries.length;
    if(this.entries.splice(index, 1).length === before) {
      return false;
    } else {
      return true;
    }
  }

  addToBudget(pEntry : Entry, pBudget : Budget) : void {
    let index : number = _.findIndex(this.entries, (entry) => {
      return entry.id === pEntry.id;
    });
    if(index !== -1) {
      this.entries[index].budget = pBudget;
    }
  }

  equals(pEntry1 : Entry, pEntry2 : Entry) : boolean {
    let isEquals = false;
    if(pEntry2.description === pEntry1.description
      && pEntry2.value === pEntry1.value
      && pEntry2.date.toString() === pEntry1.date.toString()
      && pEntry2.monthly === pEntry1.monthly
      && pEntry2.endDate.toString() === pEntry1.endDate.toString()
      && pEntry2.income === pEntry1.income)
      isEquals = true;
    return isEquals;
  }
}
