import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { NavigationComponent } from '../components/navigation.component';
import { DashboardComponent } from '../components/dashboard.component';
import { BalanceComponent } from '../components/balance.component';
import { LastEntryComponent } from '../components/last-entry.component';

import { LocalStorageService } from '../../../node_modules/angular2-localstorage/LocalStorageEmitter';
import { SettingsService } from '../services/settings.service';

const appRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'budgets', component: DashboardComponent },
  { path: 'projects', component: DashboardComponent }
];

@NgModule({
  declarations: [
    NavigationComponent,
    DashboardComponent,
    BalanceComponent,
    LastEntryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    LocalStorageService,
    SettingsService
  ],
  bootstrap: [
    NavigationComponent
  ]
})
export class AppModule {
  constructor(public storageService : LocalStorageService, public settingsService : SettingsService) {}
}
