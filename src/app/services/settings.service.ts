import { Injectable } from '@angular/core';
import { LocalStorage, SessionStorage } from "../../../node_modules/angular2-localstorage/WebStorage";

@Injectable()
export class SettingsService {
  @LocalStorage('budgetSettings') private startBudgetDate : Date = new Date();
  @LocalStorage('budgetSettings') public language : string = 'fr';

  constructor() {}

  getStartBudgetDate() : Date { return this.startBudgetDate; }
  setStartBudgetDate(pStartBudgetDate : Date) : void { this.startBudgetDate = pStartBudgetDate; }

  getLanguage() : string { return this.language; }
  setLanguage(pLanguage : string) : void { this.language = pLanguage; }
}
