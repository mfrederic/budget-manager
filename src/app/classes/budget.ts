import { Entry } from './entry';

export class Budget {
  public id : number;
  public description : string;
  public startDate : Date;
  public endDate : Date;

  constructor(pId? : number, pDescription? : string, pStartDate? : Date, pEndDate? : Date) {
    this.id = pId || 1;
    this.description = pDescription || null;
    this.startDate = pStartDate || new Date();
    this.endDate = pEndDate || null;
  }
}
