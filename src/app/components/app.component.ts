import { Component } from '@angular/core';
import { EntryService } from '../services/entry.service';

import { LocalStorage, SessionStorage } from "../../../node_modules/angular2-localstorage/WebStorage";

import { Budget } from '../classes/budget';
import { Entry } from '../classes/entry';

@Component({
  selector: 'app-root',
  templateUrl: './views/app.component.html',
  providers: [EntryService]
})
export class AppComponent {
  public title = 'app works!';
  public newEntry : Entry = new Entry();
  @LocalStorage('budgetList') public budgets : Budget[] = [];

  constructor(private entryService : EntryService) {}

  createEntry() : Entry {
    this.entryService.createExpense(this.newEntry);
    return this.newEntry;
  }
}
