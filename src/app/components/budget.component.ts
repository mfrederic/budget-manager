import { Component, OnInit } from '@angular/core';
import { i18n } from '../localization';
import { NgbModal, ModalDismissReasons, NgbDateStruct, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ConfirmOptions, Position } from 'angular2-bootstrap-confirm';
import { Positioning } from 'angular2-bootstrap-confirm/position';
import 'rxjs/add/operator/switchMap';

import * as moment from 'moment';
import * as _ from 'lodash';

import { EntryService } from '../services/entry.service';
import { BudgetService } from '../services/budget.service';
import { SettingsService } from '../services/settings.service';
import { DatePickerI18nService } from '../services/date-picker-i18n.service';

import { Budget } from '../classes/budget';
import { Entry } from '../classes/entry';

@Component({
  templateUrl: './views/budget.component.html',
  providers: [EntryService, BudgetService, ConfirmOptions, {provide: Position, useClass: Positioning},
    SettingsService, {provide: NgbDatepickerI18n, useClass: DatePickerI18nService}]
})
export class BudgetComponent implements OnInit{
  public local : any;
  public moment : any;
  public budget : Budget;
  public entries : Entry[];
  public allSelected : boolean = false;
  public notification = {
    type: 'success',
    message: null
  };

  public entryToUpdate : Entry;
  public entryToUpdateDate : NgbDateStruct;

  constructor(private route : ActivatedRoute, private budgetService : BudgetService,
      private entryService : EntryService, private modalService: NgbModal,
      private _i18n : SettingsService) {
    let _this = this;
    this.local = i18n;
    this.moment = moment;
    this.budget = null;
    this.entries = [];
    this.entryService.updateEntry$.subscribe(
      (update) => {
        _this.entries = _this.entryService.getEntriesBetween(_this.budget.startDate, _this.budget.endDate);
      });
    this.entryToUpdate = null;
    this.entryToUpdateDate = null;
  }

  private getSelectedEntries() : Entry[] {
    return _.filter(this.entries, (entry) => entry['selected'] === true);
  }

  ngOnInit() {
    let _this = this;
    let id = +this.route.snapshot.params['id'];
    this.budgetService.getBudget(id).then(function(data) {
      _this.budget = data;
      _this.entries = _this.entryService.getEntriesBetween(data.startDate, data.endDate);
    });
  }

  openDeletionModal(content, pEntries : Entry[]) {
    this.modalService
      .open(content)
      .result.then((result) => this.confirmDelete(pEntries), (reason) => console.log('lol'));
  }

  openUpdate(pEntry : Entry) {
    this.entryToUpdate = pEntry;
    let startDate = new Date(pEntry.date);
    this.entryToUpdateDate = {
      year: startDate.getFullYear(),
      month: startDate.getMonth()+1,
      day: startDate.getDate()
    };
  }

  closeUpdate() {
    this.entryToUpdate = null;
    this.entryToUpdateDate = null;
  }

  updateEntry() {
    console.log(this);
  }

  updatedEntry(pEntry : Entry) : boolean {
    return (this.entryToUpdate !== null) ? pEntry.id === this.entryToUpdate.id : false;
  }

  thereIsSelectedEntry() {
    return (this.getSelectedEntries().length > 0) ? true : false;
  }

  toggleChecked() : void {
    this.entries.forEach((entry) => entry['selected'] = !this.allSelected);
  }

  confirmDelete(pEntries : Entry[]) : void {
    let notDeleted : Entry[] = [];
    pEntries.forEach((entry, index) => {
      if(!this.entryService.deleteEntry(entry.id)) {
        notDeleted.push(entry);
      }
    });
    if(notDeleted.length === 0) {
      this.notification = {
        type: 'success',
        message: this.local.DELETE_SUCCESS
      };
    } else {
      this.notification = {
        type: 'error',
        message: this.local.DELETE_ERROR
      };
    }
  }
}
