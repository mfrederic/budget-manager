import { Component } from '@angular/core';
import { i18n } from '../localization';
import { MenuItem } from '../classes/menu-item';

@Component({
  selector: 'app-header',
  templateUrl: './views/navigation.component.html'
})
export class NavigationComponent {
  public local : any;
  public items : MenuItem[] = [];

  constructor() {
    this.items.push(new MenuItem(null, 'HOME', '#/', null));
    this.items.push(new MenuItem(null, 'PROJECTS', '#/project', null));
    this.local = i18n;
  }
}
