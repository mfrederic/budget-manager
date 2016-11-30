export class Entry {
  private id : number;
  public description : string;
  public value : number;
  public date : Date;
  public monthly : boolean;
  public endDate : Date;
  public income : boolean;

  constructor(pId? : number, pDescription? : string, pValue? : number, pDate? : Date, pMonthly? : boolean, pEndDate? : Date, pIncome? : boolean) {
    this.id = pId || null;
    this.description = pDescription || null;
    this.value = pValue || null;
    this.date = pDate || new Date();
    this.monthly = pMonthly || null;
    this.endDate = pEndDate || null;
    this.income = pIncome || null;
  }

  getId() : number { return this.id; }
  setId(pId : number) : void {
    if(this.id == null) {
      this.id = pId;
    }
  }
}
