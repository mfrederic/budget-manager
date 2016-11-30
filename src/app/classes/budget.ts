import { Entry } from './entry';

export class Budget {
  private id : number;
  private description : string;
  private startDate : Date;
  private endDate : Date;

  constructor(pId : number, pDescription : string, pStartDate : Date, pEndDate : Date, public entries : Entry[]) {
    this.id = pId;
    this.description = pDescription;
    this.startDate = pStartDate || new Date();
    this.endDate = pEndDate;
  }

  getId() : number { return this.id; }
  setId(pId : number) : void {
    if(this.id == null) {
      this.id = pId;
    }
  }

  getDescription() : string { return this.description; }
  setDescription(pDescription : string) : void { this.description = pDescription; }

  getStartDate() : Date { return this.startDate; }
  setStartDate(pStartDate : Date) : void { this.startDate = pStartDate; }

  getEndDate() : Date { return this.endDate; }
  setEndDate(pEndDate : Date) : void { this.endDate = pEndDate; }
}
