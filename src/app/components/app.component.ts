import { Component } from '@angular/core';
import { EntryService } from '../services/entry.service';

import * as _ from 'lodash';

import { LocalStorage, SessionStorage } from "../../../node_modules/angular2-localstorage/WebStorage";

import { Budget } from '../classes/budget';
import { Entry } from '../classes/entry';

@Component({
  selector: 'app-root',
  templateUrl: './views/app.component.html',
  providers: [EntryService]
})
export class AppComponent {
  public entries : Entry[] = [];
  public newEntry : Entry = null;

  @LocalStorage('budgetList') public budgets : Budget[] = [];

  constructor(private entryService : EntryService) {
    this.newEntry = new Entry();
    this.entries = this.entryService.getExpenses();
  }

  deleteEntry(index : number) : void {
    if(this.entryService.deleteEntry(index)) {
      this.entries.splice(index, 1);
    }
  }

  createEntry() : void {
    if(this.entryService.createEntry(this.newEntry)) {
      this.entries.push(this.newEntry);
      this.newEntry = new Entry();
    }
  }
}
