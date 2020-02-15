import { Injectable } from '@angular/core';
import { UserService } from "./user.service";
import { Map } from 'immutable';
import { ROLE_TYPE } from './../../shared/globals.constants';

@Injectable()
export class RoleMatrixService {
	roleMatrix: any = Map();
	constructor(private userService: UserService) { }

	setRoleMatrix(data: Map<string, any>) {
		this.roleMatrix = data;
	}

	/* Determine a general role of the logged in user from the deciphered token in user service */
	determineRoleType() {
		let roleId = this.userService.roleId;
		let role = ROLE_TYPE[roleId];

		/* Determine if the role id stored in the user service after parsing the access token is Admin */
		// if (role === 'ADMIN') {
		// 	return role;
		// } else {
		// 	/* If the role has been matched as Content Manager or Editor return it or else return Content Manager */
		// 	if (role) {
		// 		return role
		// 	} else {
		// 		return ROLE_TYPE[10];
		// 	}
    // }
    return role;
	}

	getAccessLevel(featureName: Array<string>) {
		return this.roleMatrix.getIn(featureName);
	}

}
