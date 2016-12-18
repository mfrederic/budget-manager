import { Component, Input, OnInit } from '@angular/core';
import { i18n } from '../localization';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as Moment from 'moment';
import * as _ from 'lodash';

import { EntryService } from '../services/entry.service';
import { Budget } from '../classes/budget';
import { Entry } from '../classes/entry';

@Component({
  selector: 'last-entries',
  templateUrl: './views/last-entry.component.html'
})
export class LastEntryComponent implements OnInit {
  @Input() public budget : Budget;
  public local : any;
  public moment : any;
  public entries : Entry[] = [];
  public closeResult: string;

  constructor(private modalService : NgbModal, private entryService : EntryService) {
    let _this = this;
    this.moment = Moment;
    this.local = i18n;
    this.entryService.updateEntry$.subscribe(
      (update) => {
        _this.loadBudgetData();
      });
  }

  ngOnInit() {
    this.loadBudgetData();
  }

  private loadBudgetData() : void {
    this.setLastEntries();
  }

  setLastEntries() : void {
    let notSorted = this.entryService.getEntriesBetween(this.budget.startDate, this.budget.endDate);
    let sortedEntries = _.reverse(_.sortBy(notSorted, [(entry) => {
      return entry.date;
    }]));
    this.entries = _.slice(sortedEntries, 0, 5);
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
