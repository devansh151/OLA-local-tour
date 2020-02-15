import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule, Http } from "@angular/http";
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { store } from './services/build-redux-store.service';
import { ApiBridgeService } from './services/api-bridge.service';
import { UserService } from './services/user.service';
import { UtilsService } from './services/utils.service';
import { RoleMatrixService } from './services/role-matrix.service';
import { DOMEvents } from "./services/dom-events.service";
import { ConstantsService } from './services/constants.service';

export function apiBridgeServiceFactory(http, userService) {
	return new ApiBridgeService(http, userService);
}

@NgModule({
	imports: [
		CommonModule,
		NgReduxModule,
		FormsModule,
		ReactiveFormsModule,
		FlexLayoutModule,
		RouterModule,
		HttpModule,
	],
	exports: [
		NgReduxModule,
		FormsModule,
		ReactiveFormsModule,
		FlexLayoutModule,
		RouterModule,
	],
	declarations: []
})
export class CoreModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: CoreModule,
			providers: [
				{
					provide: ApiBridgeService,
					useFactory: apiBridgeServiceFactory,
					deps: [Http, UserService]
				},
				{ provide: UserService, useClass: UserService },
				UtilsService,
				RoleMatrixService,
				DOMEvents,
				ConstantsService
			]
		};
	}

	constructor( @Optional() @SkipSelf() parentModule: CoreModule, ngRedux: NgRedux<any>) {
		if (parentModule) {
			throw new Error(
				'CoreModule is already loaded. Import it in the AppModule only');
		}
		ngRedux.provideStore(store);
	}
}
