import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { OlaTabGroupComponent } from './components/ola-tab-group/ola-tab-group.component';
import { OlaTabItemComponent } from './components/ola-tab-group/ola-tab-item/ola-tab-item.component';
import { DismissableComponent } from './components/dismissable/dismissable.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';
import { ImgFallbackDirective } from './directives/img-fallback.directive';
import { RoleMatrixDirective } from './directives/role-matrix.directive';
import { ChipsComponent } from './components/chips/chips.component';
import { SortableDirective } from './directives/sortable.directive';

@NgModule({
	imports: [
		CommonModule,
		FlexLayoutModule,
		FormsModule,
		ReactiveFormsModule
	],
	exports: [
		CommonModule,
		FlexLayoutModule,
		FormsModule,
		DatepickerComponent,
		OlaTabGroupComponent,
		OlaTabItemComponent,
		DismissableComponent,
		ReactiveFormsModule,
		CarouselComponent,
		InfiniteScrollDirective,
		RoleMatrixDirective,
		ChipsComponent,
		SortableDirective,
		SafeHtmlPipe,
	],
	declarations: [
		DatepickerComponent,
		OlaTabGroupComponent,
		OlaTabItemComponent,
		DismissableComponent,
		CarouselComponent,
		InfiniteScrollDirective,
		RoleMatrixDirective,
		ChipsComponent,
		ImgFallbackDirective,
		SortableDirective,
		SafeHtmlPipe
	],

})
export class SharedModule { }
