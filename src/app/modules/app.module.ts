import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NavigationComponent } from '../components/navigation.component';
import { DashboardComponent } from '../components/dashboard.component';
import { BudgetsComponent } from '../components/budgets.component';
import { BudgetComponent } from '../components/budget.component';
import { BalanceComponent } from '../components/balance.component';
import { TrendComponent } from '../components/trend.component';
import { LastEntryComponent } from '../components/last-entry.component';
import { NgbdModalNewEntry } from '../components/ngbd-modal-new-entry.component';
import { NgbdModalSettings } from '../components/ngbd-modal-settings.component';
import { NgbdModalBudget } from '../components/ngbd-modal-budget.component';

import { LocalStorageService } from '../../../node_modules/angular2-localstorage/LocalStorageEmitter';
import { SettingsService } from '../services/settings.service';

const appRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'budgets', component: BudgetsComponent },
  { path: 'budgets/:id', component: BudgetComponent },
  { path: 'projects', component: DashboardComponent }
];

@NgModule({
  declarations: [
    NavigationComponent,
    DashboardComponent,
    BalanceComponent,
    TrendComponent,
    LastEntryComponent,
    NgbdModalNewEntry,
    NgbdModalSettings,
    NgbdModalBudget,
    BudgetsComponent,
    BudgetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot()
  ],
  providers: [
    LocalStorageService
  ],
  bootstrap: [
    NavigationComponent
  ]
})
export class AppModule {
  constructor(public storageService : LocalStorageService) {}
}
