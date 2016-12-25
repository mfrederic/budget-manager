import { Component, Input, OnInit } from '@angular/core';
import { i18n } from '../localization';
import { NgbModal, ModalDismissReasons, NgbDateStruct, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { BudgetService } from '../services/budget.service';

import * as moment from 'moment';
import * as _ from 'lodash';

import { Budget } from '../classes/budget';
import { DatePickerI18nService } from '../services/date-picker-i18n.service';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'ngbd-modal-budget',
  providers: [BudgetService, SettingsService, {provide: NgbDatepickerI18n, useClass: DatePickerI18nService}],
  templateUrl: './views/ngbd-modal-budget.component.html'
})
export class NgbdModalBudget implements OnInit {
  @Input() public budget : Budget;
  public settings : any;
  public local : any;
  public _ : any;
  public notification : any;
  public budgetDate : any;

  constructor(private modalService: NgbModal, private _i18n: SettingsService, private budgetService : BudgetService) {
    this.local = i18n;
    this._ = _;
    this.budgetDate = null;
    this.notification = {
      type: false,
      message: null
    };
  }

  ngOnInit() {
    let startDate = new Date(this.budget.startDate);
    this.budgetDate = {
      year: startDate.getFullYear(),
      month: startDate.getMonth()+1,
      day: startDate.getDate()
    };
  }

  set language(language: string) {
    this._i18n.language = language;
  }

  get language() {
    return this._i18n.language;
  }

  open(content) {
    this.modalService.open(content).result.then(
      (result) => this.updateBudget(),
      (reason) => false);
  }

  updateBudget() {
    this.budget.startDate = moment(this.budgetDate.year + '-' + this.budgetDate.month + '-' + this.budgetDate.day, this.local.DATE_FORMAT_ENG).toDate();
    this.budgetService.updateBudget(this.budget);
  }
}
