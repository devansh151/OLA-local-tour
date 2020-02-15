import { RoleMatrixService } from './../../core/services/role-matrix.service';
import { AppActions } from './../app/shared/app.actions';
import { NgRedux } from '@angular-redux/store';
import { ApiBridgeService } from './../../core/services/api-bridge.service';
import { UserService } from './../../core/services/user.service';
import { CanActivate, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { fromJS } from 'immutable';

import { ConstantsService } from './../../core/services/constants.service';

@Injectable()
export class HomeRouteGuardService implements CanActivate {
  constructor(private constantsService: ConstantsService, private userService: UserService, private apiBridge: ApiBridgeService, private redux: NgRedux<any>, private appActions: AppActions, private roleMatrixService:RoleMatrixService) {

	}

	canActivate() {
    	return true;
	}
}
