import { Component, Injectable } from '@angular/core';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';

const I18N_VALUES = {
  en: {
    weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  },
  fr: {
    weekdays: ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'],
    months: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Déc'],
  }
};

// Define custom service providing the months and weekdays translations
@Injectable()
export class DatePickerI18nService extends NgbDatepickerI18n {

  constructor() {
    super();
  }

  getWeekdayName(weekday: number): string {
    return I18N_VALUES['fr'].weekdays[weekday - 1];
  }
  getMonthName(month: number): string {
    return I18N_VALUES['fr'].months[month - 1];
  }
}
