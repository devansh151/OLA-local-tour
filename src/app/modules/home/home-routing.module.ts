
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { HomeComponent } from './home.component';

import { HomeRouteGuardService } from './home-route-guard.service';
import { LoginRouteGuardService } from './../../login-route-guard.service';
import { AppComponent } from "../app/app.component";
import { BoardMainContainerComponent } from "../board/board-main-container/board-main-container.component";
import { SchemeListComponent } from "../scheme-list/scheme-list.component";


const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		canActivate: [LoginRouteGuardService, HomeRouteGuardService],

		// canActivate: [LoginRouteGuardService],
		children: [
			{ path: 'board', component: BoardMainContainerComponent },
			{ path: 'board/:schemeId', component: BoardMainContainerComponent },
			{ path: '', component: SchemeListComponent },
			{ path: '**', redirectTo:'' }
		]
	}
];

@NgModule({

	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class HomeRoutingModule { }
