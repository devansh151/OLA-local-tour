import { List, fromJS, Map } from 'immutable';
import { Injectable, ViewContainerRef } from '@angular/core';

import { IAction, ToastRecordClass, IActionCreator } from '../../../shared/models';
import { AppConstants } from './app.constants';
import { ERROR_MSG } from './../../../shared/globals.constants';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ApiBridgeService } from './../../../core/services/api-bridge.service';
import { Router } from '@angular/router';
import { UserService } from './../../../core/services/user.service';


interface ILoginPayload {
	domain: string;
	emailId: string;
	password: string;
	rememberMe: boolean;
}

declare var Notification: any;

@Injectable()
export class AppActions {
	toastTimeout;
	vcr: ViewContainerRef;
	constructor(public toastr: ToastsManager, private apiBridge: ApiBridgeService, private router: Router, private userService: UserService) {
	}
	setToastrViewContainerRef(vcr) {
		this.toastr.setRootViewContainerRef(vcr);
	}
	showDangerToast(message, duration?) {
		return (dispatch) => {
			this.toastr.error(message, null, {
				toastLife: duration ? duration : 4000,
			});
		}
	}

	showSuccessToast(message, duration?: number) {
		return (dispatch) => {
			this.toastr.success(message, null, {
				toastLife: duration ? duration : 4000,
			});
		}
	}

	showWarningToast(message, duration?) {
		return (dispatch) => {
			this.toastr.warning(message, null, {
				toastLife: duration ? duration : 4000,
			});
		}
	}

	confirmDialogLabels: IActionCreator = (payload) => {
		return {
			type: AppConstants.SET_CONFIRM_DIALOG_LABEL,
			payload
		}
	}

	parseAndShowError(error?, duration = 5000, message?: string, errorProp = 'errorDescription') {
		return (dispatch) => {
			let msg = message || ERROR_MSG;
			if (error) {
				try {
					let err = error.json();
					err[errorProp] && (msg = err[errorProp]);
				} catch (e) {
					let err = error[errorProp];
					err && (msg = err);
				}
			}
			dispatch(<any>this.showDangerToast(msg, duration));
		}
	}

	logout() {
		let origin = window.location.origin;
		return (dispatch) => {
			this.apiBridge.logout()
				.map(res => res.text())
				.subscribe(res => {
					if (res === "SIGN OUT SUCCESSFULL") {
						localStorage.clear();
						this.userService.isLogged = false;
						this.userService.token = null;
						this.userService.brandId = null;
						this.userService.brandUserId = null;
						window.location.replace(`${origin}/sso/login`);
					}
				});
		}
	}

	setPageBreadCrumb: IActionCreator = (data: string) => {
		return {
			type: AppConstants.SET_BREAD_CRUMB,
			payload: data
		}
	}

	setToken: IActionCreator = (token) => {
		return {
			type: AppConstants.SET_TOKEN,
			payload: token
		};
	}
}
