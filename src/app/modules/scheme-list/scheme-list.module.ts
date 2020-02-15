import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SchemeListComponent } from './scheme-list.component';
import { SchemeListActions } from './shared/scheme-list.actions';
import { SchemeListApiService } from './shared/scheme-list-api.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSelectModule,MatTableModule,MatIconModule,MatTooltipModule,MatButtonModule,MatPaginatorModule,MatSlideToggleModule,MatRadioModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { SchemeListItemComponent } from './shared/components/scheme-list-item/scheme-list-item.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatRadioModule,
    FormsModule,
    CdkTableModule,
    ReactiveFormsModule
  ],
  declarations: [SchemeListComponent, SchemeListItemComponent],
  providers: [
    SchemeListActions,
    SchemeListApiService
  ]
})
export class SchemeListModule { }
