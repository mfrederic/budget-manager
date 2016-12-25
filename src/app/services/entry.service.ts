import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Entry } from '../classes/entry';
import { Budget } from '../classes/budget';

import * as moment from 'moment';
import * as _ from 'lodash';

import { LocalStorage, SessionStorage } from "../../../node_modules/angular2-localstorage/WebStorage";
import { i18n } from '../localization';

@Injectable()
export class EntryService {
  @LocalStorage('budgetEntry') private entries : Entry[] = [];
  private updateEntrySource = new Subject<boolean>();

  public updateEntry$ = this.updateEntrySource.asObservable();

  constructor() {}

  public annonceUpdate() {
    this.updateEntrySource.next(true);
  }

  getResponseInformations(pCode : number) : any {
    let response = {
      error: true,
      message: null,
      code: pCode
    }
    switch(pCode) {
      case 200: response.message = i18n.HTTP_OK; response.error = false;
        break;
      case 400: response.message = i18n.HTTP_BAD_REQUEST;
        break;
      case 409: response.message = i18n.HTTP_CONFLICT;
        break;
      default: response.message = i18n.HTTP_SERVER_ERROR;
        break;
    }
    return response;
  }

  resetEntries() : void {
    this.entries = [];
    this.annonceUpdate();
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
  createEntry(entry : Entry) : number {
    let _this = this;
    let result = 500;
    if(!_.isEmpty(_.find(this.entries, function(e) { return _this.equals(e, entry) }))) {
      result = 409;
    } else if(_.lte(entry.value, 0) || _.isNull(entry.value) || !moment(entry.date).isValid()) {
      result = 400;
    } else {
      entry.id = this.entries.length+1;
      this.entries.push(entry);
      this.annonceUpdate();
      result = 200;
    }
    return result;
  }

  /** Delete an entry from Entry instance */
  deleteEntry(pEntryId : number) : boolean {
    let before : number = this.entries.length;
    let index = _.findIndex(this.entries, (entry) => entry.id === pEntryId);
    if(this.entries.splice(index, 1).length === before) {
      return false;
    } else {
      this.annonceUpdate();
      return true;
    }
  }

  updateEntry(pId : number, pEntry : Entry) : Entry {
    let index : number = _.findIndex(this.entries, (entry) => entry.id === pId);
    if(index < 0) {
      return null;
    } else {
      this.entries[index] = pEntry;
      return pEntry;
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
