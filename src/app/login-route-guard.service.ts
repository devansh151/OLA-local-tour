import { CanActivate, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { UserService } from "./core/services/user.service";
import { ApiBridgeService } from './core/services/api-bridge.service';

@Injectable()
export class LoginRouteGuardService implements CanActivate {
	constructor(private userService: UserService, private router: Router, private apiBridgeService: ApiBridgeService) {

	}

	navigateToLoginPage(redirect = true) {
		let replaceUrl = redirect ? `${window.location.origin}/sso/login?redirect_uri=${window.location.href}` : `${window.location.origin}/sso/login`;
		window.location.replace(replaceUrl);
	}

	canActivate() {
		return true;
		// let validated = this.userService.validateBearerToken();

		// /* If boolean is returned, means no token is found in LocalStorage hence simply return false */
		// if (!validated) {
		// 	this.navigateToLoginPage();
		// 	return false;
		// }
		// if (!this.userService.validateProductIdFromToken(this.userService.result.accessList)) {
		// 	this.navigateToLoginPage(false);
		// 	return false;
		// }

		// /* Else exectue the observable and return valid boolean values from it since either boolean or Observable<boolean>
		// is to be returned form this method */
		// return this.apiBridgeService.validateLoginToken()
		// 	.map(text => {
		// 		return true;
		// 	})
		// 	.catch(err => {
		// 		this.navigateToLoginPage();
		// 		return Observable.of(false);
		// 	});
	}
}
