import { Component } from '@angular/core';
import { i18n } from '../localization';
import { NgbModal, ModalDismissReasons, NgbDateStruct, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';

import { Entry } from '../classes/entry';
import { DatePickerI18nService } from '../services/date-picker-i18n.service';
import { SettingsService } from '../services/settings.service';
import { EntryService } from '../services/entry.service';

import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'ngbd-modal-new-entry',
  templateUrl: './views/ngbd-modal-new-entry.component.html',
  providers: [SettingsService, {provide: NgbDatepickerI18n, useClass: DatePickerI18nService}]
})
export class NgbdModalNewEntry {
  public closeResult: string;
  public local : any;
  public notification : any;

  public entryDate : NgbDateStruct;
  public entry : Entry;

  constructor(private modalService: NgbModal, private _i18n: SettingsService, private entryService: EntryService) {
    this.local = i18n;
    this.entry = new Entry();
    this.entryDate = null;
    this.notification = {
      type: false,
      message: null
    };
  }

  set language(language: string) {
    this._i18n.language = language;
  }

  get language() {
    return this._i18n.language;
  }

  open(content) {
    this.modalService.open(content).result.then((result) => true, (reason) => console.error(reason));
  }

  createEntry() : void {
    let _this = this;
    if(_.isEmpty(this.entryDate) || _.lte(this.entry.value, 0) || _.isNull(this.entry.value)) {
        this.notification = {
          type: 'danger',
          message: _this.local.MISSING_INFORMATIONS
        }
        return;
    } else {
      if(_.isEmpty(this.entry.description)) {
        this.entry.description = this.local.ENTRY_DEFAULT_DESCRIPTION;
      }
      this.entry.date = moment(this.entryDate.year + '-' + this.entryDate.month + '-' + this.entryDate.day, this.local.DATE_FORMAT_ENG).toDate();
      let response : any = this.entryService.getResponseInformations(this.entryService.createEntry(this.entry));
      if(response.error) {
        this.notification = {
          type: 'danger',
          message: response.message
        }
        return;
      } else {
        this.notification = {
          type: 'success',
          message: _this.local.ENTRY_CREATED
        }
        this.entry = new Entry();
        this.entryDate = null;
        return;
      }
    }
  }
}
