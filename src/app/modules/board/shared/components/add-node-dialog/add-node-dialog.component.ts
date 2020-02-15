import { Component, OnInit,Input,Output,EventEmitter,Inject } from '@angular/core';
import { MatDialog,MatDialogRef,MatButton,MatFormField,MatInput,MatCardModule,MAT_DIALOG_DATA,MatChip } from "@angular/material";

@Component({
  selector: 'od-add-node-dialog',
  templateUrl: './add-node-dialog.component.pug',
  styleUrls: ['./add-node-dialog.component.scss']
})
export class AddNodeDialogComponent implements OnInit {

  name="";
  id="";
  graph;

  @Output() output: EventEmitter<any> = new EventEmitter();
  constructor(public dialogRef: MatDialogRef<AddNodeDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.graph=JSON.stringify(data.graph);
    console.log(this.graph);
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


}
