import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BoardMainContainerComponent } from './board-main-container/board-main-container.component';
import { BoardActions } from './shared/board.actions';
import { BoardApiService } from './shared/board-api.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SvgLineComponent } from './shared/components/svg-line/svg-line.component';
import { MatDialogModule, MatButtonModule,MatInputModule,MatFormFieldModule,MatIconModule,MatTooltipModule,MatSelectModule,MatAutocompleteModule,MatChipsModule,MatCardModule,MatStepperModule,MatGridListModule,MatDatepickerModule,MatNativeDateModule,MatSlideToggleModule, MatDialogRef} from '@angular/material';
import { AddNodeDialogComponent } from './shared/components/add-node-dialog/add-node-dialog.component';
import { FosMainContainerComponent } from './fos-main-container/fos-main-container.component';
import { FosActions } from './shared/fos.actions';
import { FosApiService } from './shared/fos-api.service';
import { EditFosNodeDialogComponent } from './shared/components/edit-fos-node-dialog/edit-fos-node-dialog.component';
import { EditFilterComponent } from './shared/components/edit-filter/edit-filter.component';
import { EditOperatorComponent } from './shared/components/edit-operator/edit-operator.component';
import { EditSwitchComponent } from './shared/components/edit-switch/edit-switch.component';
import { EditConditionComponent } from './shared/components/edit-condition/edit-condition.component';
import { EditMergerComponent } from './shared/components/edit-merger/edit-merger.component';
import { EditLatchComponent } from './shared/components/edit-latch/edit-latch.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatChipsModule,
    MatCardModule,
    MatStepperModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [BoardMainContainerComponent, SvgLineComponent, AddNodeDialogComponent, FosMainContainerComponent, EditFosNodeDialogComponent, EditFilterComponent, EditOperatorComponent, EditSwitchComponent, EditConditionComponent, EditMergerComponent, EditLatchComponent],
  providers: [
    BoardActions,
    BoardApiService,
    FosActions,
    FosApiService,
    { provide: MatDialogRef, useValue: {} }
  ]
})
export class BoardModule { }
