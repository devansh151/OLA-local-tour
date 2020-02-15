import { Router, NavigationEnd } from '@angular/router';
import { AppActions } from './../app/shared/app.actions';
import { Component, OnInit } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { Subject } from 'rxjs/Subject';
import { ToastRecordClass } from '../../shared/models';

@Component({
	selector: 'home',
	templateUrl: './home.component.pug',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	currentRoute: String;
	@select(['app', 'toast']) toast$: Subject<ToastRecordClass>;
	@select(['app', 'confirmDialog']) label$: Subject<any>;

	constructor(private redux: NgRedux<any>, private appActions: AppActions, private router: Router) { }

	ngOnInit() {
		console.log(this.router);
	}

	getHeadingFromUrlSegment(segment) {
		return segment.split('#')[0].substr(1).split('?')[0];
	}
}
