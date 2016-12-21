import { Injectable } from '@angular/core';
import { LocalStorage, SessionStorage } from "../../../node_modules/angular2-localstorage/WebStorage";
import { i18n } from '../localization';

import * as Moment from 'moment';
import * as _ from 'lodash';

@Injectable()
export class SettingsService {
  @LocalStorage('budgetSettings') private settings = [
    {name: 'S_START_BUDGET_DATE', value: 1},
    {name: 'S_LANGUAGE', value: 'fr'},
    {name: 'S_CURRENCY', value: '€'}
  ];
  @LocalStorage('budgetSettings') public language : string = 'fr';

  constructor() {}

  getSettings() : Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(this.settings);
    });
  }

  setSettings(pSettings : any) : void { this.settings = pSettings; }

  getSetting(pSettingName : string) : any { return _.find(this.settings, (setting) => setting.name === pSettingName); }
  setSetting(pSettingName : string, pSettingValue : any) : void {
    let index = _.findIndex(this.settings, (setting) => setting.name === pSettingName);
    this.settings[index].value = pSettingValue;
  }
}
