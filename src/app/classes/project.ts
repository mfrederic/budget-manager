export class Project {
  private id : number;
  private name : string;
  private description : string;
  private cost : number;
  private creationDate : Date;
  private paymentDate : Date;

  constructor(pId : number, pName : string, pDescription : string, pCost : number, pCreationDate : Date, pPaymentDate : Date) {
    this.id = pId;
    this.name = pName;
    this.description = pDescription;
    this.cost = pCost;
    this.creationDate = pCreationDate || new Date();
    this.paymentDate = pPaymentDate;
  }

  getId() : number { return this.id; }
  setId(pId : number) : void {
    if(this.id == null) {
      this.id = pId;
    }
  }

  getName() : string { return this.name; }
  setName(pName : string) : void { this.name = pName; }

  getDescription() : string { return this.description; }
  setDescription(pDescription : string) : void { this.description = pDescription; }

  getCost() : number { return this.cost; }
  setCost(pCost : number) : void { this.cost = pCost; }

  getStartDate() : Date { return this.creationDate; }
  setStartDate(pCreationDate : Date) : void { this.creationDate = pCreationDate; }

  getEndDate() : Date { return this.paymentDate; }
  setEndDate(pPaymentDate : Date) : void { this.paymentDate = pPaymentDate; }
}
