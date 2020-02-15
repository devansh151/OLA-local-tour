import { Component, ViewContainerRef } from '@angular/core';

import { AppActions } from './shared/app.actions';

@Component({
  selector: 'ola-root',
  templateUrl: './app.component.pug',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'od';

  constructor(private vcr: ViewContainerRef, private appActions: AppActions) {}

  ngOnInit() {
    this.appActions.setToastrViewContainerRef(this.vcr);
  }
}
