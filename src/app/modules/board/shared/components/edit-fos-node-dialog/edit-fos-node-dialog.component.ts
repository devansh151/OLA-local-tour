import { Component, OnInit,Input,Output,EventEmitter,Inject } from '@angular/core';
import { MatDialog,MatDialogRef,MatButton,MatFormField,MatInput,MatCardModule,MAT_DIALOG_DATA,MatChip } from "@angular/material";


@Component({
  selector: 'od-edit-fos-node-dialog',
  templateUrl: './edit-fos-node-dialog.component.pug',
  styleUrls: ['./edit-fos-node-dialog.component.scss']
})
export class EditFosNodeDialogComponent implements OnInit {
  @Output() output: EventEmitter<any> = new EventEmitter();
  constructor(public dialogRef: MatDialogRef<EditFosNodeDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close('Pizza!');
    this.output.emit({
      action:'CANCEL',
      data:null
    })
    
  }

  save(){
    this.dialogRef.close('Pizza!');
    this.output.emit({
      action:'SAVE',
      data:null
    })
  }

}
