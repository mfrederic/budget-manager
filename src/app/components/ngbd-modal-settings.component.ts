import { Component, OnInit } from '@angular/core';
import { i18n } from '../localization';
import { NgbModal, ModalDismissReasons, NgbDateStruct, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { SettingsService } from '../services/settings.service';

import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'ngbd-modal-settings',
  providers: [SettingsService],
  templateUrl: './views/ngbd-modal-settings.component.html'
})
export class NgbdModalSettings implements OnInit {
  public settings : any = [];
  public local : any;
  public _ : any;

  constructor(private modalService: NgbModal, private settingsService : SettingsService) {
    this.local = i18n;
    this._ = _;
  }

  ngOnInit() {
    this.settingsService.getSettings().then((result) => {
      this.settings = result;
    });
  }

  open(content) {
    this.modalService.open(content).result.then(
      (result) => this.updateSettings(),
      (reason) => true);
  }

  updateSettings() {
    this.settingsService.setSettings(this.settings);
  }

  getInputType(pSetting : any) {
    let type : string = 'text';
    if(_.isNumber(pSetting.value)) {
      type = 'number';
    } else if(_.isDate(pSetting.value)) {
      type = 'date';
    }
    return type;
  }
}
