import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule, PathLocationStrategy } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { HomeComponent } from './home.component';
import { BoardModule } from "../board/board.module";
import { SchemeListModule } from "../scheme-list/scheme-list.module";
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeRouteGuardService } from './home-route-guard.service';
import { HeaderActions } from "./header/shared/header.actions";
@NgModule({
	imports: [
		CommonModule,
		HomeRoutingModule,
		FlexLayoutModule,
		FormsModule,
		ReactiveFormsModule,
		BoardModule,
		SchemeListModule
	],
	declarations: [
		HomeComponent,
		SidebarComponent,
		HeaderComponent
	],
	providers: [
		HomeRouteGuardService,
		HeaderActions,
		PathLocationStrategy
	]
})
export class HomeModule { }
