import { ACCESS_LEVELS } from './../../../shared/globals.constants';
import { RoleMatrixService } from './../../../core/services/role-matrix.service';
import { List, fromJS, Map } from 'immutable';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppActions } from '../../app/shared/app.actions';

const LIST = [
  // { className: "sprite home", title: "Home", url: "/campaigns/nps", isActive: false, subnav: [] },
  { className: "sprite nps", title: "NPS", isActive: false, subnav: [
      { className: "sprite home", label: "Campaigns", url: "/campaigns/nps", isActive: false},
      { className: "sprite overview", label: "Overview", url: "/overview/nps", isActive: false},
      { className: "sprite inbox", label: "Inbox", url: "/inbox/nps", isActive: false },
      { className: "sprite insights", label: "Insights", url: "/insights/nps", isActive: false},
  ] },
  { className: "sprite csat", title: "CSAT", isActive: false, subnav: [
    { className: "sprite home", label: "Campaigns", url: "/campaigns/csat", isActive: false},
    // { className: "sprite inbox", label: "Inbox", url: "/inbox/csat", isActive: false },
    // { className: "sprite insights", label: "Insights", url: "/insights/csat", isActive: false},
    // { className: "sprite overview", label: "Overview", url: "/overview/csat", isActive: false},
] },
//   { className: "sprite ces", title: "CES", url: "", isActive: false, subnav: [
//     { className: "sprite home", label: "Home", url: "/campaigns/ces", isActive: false},
//     { className: "sprite inbox", label: "Inbox", url: "/inbox/ces", isActive: false },
//     { className: "sprite insights", label: "Insights", url: "/insights/ces", isActive: false},
//     { className: "sprite overview", label: "Overview", url: "/overview/ces", isActive: false},
// ] },
  { className: "sprite settings", title: "Settings", url: "/settings", isActive: false, subnav: [] }]
@Component({
  selector: 'ola-sidebar',
  templateUrl: './sidebar.component.pug',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements AfterViewInit {
 
  constructor(private redux: NgRedux<any>,private appActions: AppActions, private roleMatrixService: RoleMatrixService) { }
  ngAfterViewInit() {
    
  }

}
