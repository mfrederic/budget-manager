import { Entry } from './entry';

export class Budget {
  public id : number;
  public description : string;
  public startDate : Date;
  public endDate : Date;

  constructor(pId? : number, pDescription? : string, pStartDate? : Date, pEndDate? : Date, public entries? : Entry[]) {
    this.id = pId || 1;
    this.description = pDescription || null;
    this.startDate = pStartDate || new Date();
    this.endDate = pEndDate || null;
    this.entries = entries || [];
  }
}
