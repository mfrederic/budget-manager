import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NavigationComponent } from '../components/navigation.component';
import { AppComponent } from '../components/app.component';
import { BalanceComponent } from '../components/balance.component';
import { LastEntryComponent } from '../components/last-entry.component';

import { LocalStorageService } from '../../../node_modules/angular2-localstorage/LocalStorageEmitter';
import { SettingsService } from '../services/settings.service';

@NgModule({
  declarations: [
    NavigationComponent,
    AppComponent,
    BalanceComponent,
    LastEntryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    LocalStorageService,
    SettingsService
  ],
  bootstrap: [
    NavigationComponent,
    AppComponent
  ]
})
export class AppModule {
  constructor(public storageService : LocalStorageService, public settingsService : SettingsService) {}
}
