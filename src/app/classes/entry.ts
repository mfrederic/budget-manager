import { Budget } from './budget';

export class Entry {
  public id : number;
  public description : string;
  public value : number;
  public date : Date;
  public monthly : boolean;
  public endDate : Date;
  public income : boolean;
  public budget : Budget;

  constructor(pId? : number, pDescription? : string, pValue? : number, pDate? : Date, pMonthly? : boolean, pEndDate? : Date, pIncome? : boolean, pBudget? : Budget) {
    this.id = pId || Math.random();
    this.description = pDescription || null;
    this.value = pValue || null;
    this.date = pDate || new Date();
    this.monthly = pMonthly || null;
    this.endDate = pEndDate || null;
    this.income = pIncome || null;
    this.budget = pBudget || null;
  }
}
