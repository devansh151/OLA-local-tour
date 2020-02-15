import { Injectable } from "@angular/core";
import { fromJS, List, Map } from "immutable";
import { NgRedux, select } from '@angular-redux/store';
import { Router } from '@angular/router';
import { AppActions } from "../../../app/shared/app.actions";
import { IActionCreator } from "../../../../shared/models";
import { HeaderConstants } from './header.constants';

@Injectable()
export class HeaderActions {

	constructor(private appActions: AppActions, private router: Router) { }

	setSearchTerm: IActionCreator = (data: string) => {
		return {
			type: HeaderConstants.SET_SEARCH_TERM,
			payload: data
		}
	}

	setInboxSearchTerm: IActionCreator = (data: any) => {
		return {
			type: HeaderConstants.SET_SEARCH_TERM,
			payload: data
		}
	}
}