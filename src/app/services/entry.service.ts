import { Injectable } from '@angular/core';
import { Entry } from '../classes/entry';
import { Budget } from '../classes/budget';

import * as moment from 'moment';
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

  getEntries() : Entry[] {
    return this.entries;
  }

  getEntriesBetween(pStartDate : Date, pEndDate : Date) : Entry[] {
    let sortEntries = _.sortBy(this.entries, (entry) => { return entry.date; });
    let begin : boolean = false;
    let response : Entry[] = [];
    sortEntries.forEach((entry, index) => {
      let entryDate = moment(entry.date);
      begin = entryDate.isSameOrAfter(moment(pStartDate));
      if(begin) {
        begin = entryDate.isSameOrBefore(moment(pEndDate))
        response.push(entry);
      } else if(entry.monthly) {
        response.push(entry);
      }
    });
    return response;
  }

  /** Create an entry form an Entry instance */
  createEntry(entry : Entry) : boolean {
    let _this = this;
    let result = false;
    if(!_.isEmpty(_.find(this.entries, function(e) { return _this.equals(e, entry) }))) {
      console.error("Already existing entry");
    } else if(_.isEmpty(entry.value) || !moment(entry.date).isValid()) {
      console.log(_.isEmpty(entry.value), _.isEmpty(entry.date));
      console.error("Some informations are missing");
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
