import { Budget } from './budget';
import { i18n } from '../localization';

export class Entry {
  public id : number;
  public description : string;
  public value : number;
  public date : Date;
  public monthly : boolean;
  public endDate : Date;
  public income : boolean;

  constructor(pId? : number, pDescription? : string, pValue? : number, pDate? : Date, pMonthly? : boolean, pEndDate? : Date, pIncome? : boolean, pBudget? : Budget) {
    this.id = pId || 1;
    this.description = pDescription || null;
    this.value = pValue || null;
    this.date = pDate || new Date();
    this.monthly = pMonthly || false;
    this.endDate = pEndDate || null;
    this.income = pIncome || false;
  }
}
