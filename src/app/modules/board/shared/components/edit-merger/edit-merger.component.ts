import { Component, OnInit } from '@angular/core';
import { MatOption,MatInput } from '@angular/material';

@Component({
  selector: 'od-edit-merger',
  templateUrl: './edit-merger.component.pug',
  styleUrls: ['./edit-merger.component.scss']
})
export class EditMergerComponent implements OnInit {

  mergerTypes = [
    {value: 1, viewValue: 'Union'},
    {value: 2, viewValue: 'Intersection'},
    {value: 3, viewValue: 'Override'},
  ];

  selectedMerger:MatOption;

  constructor() { }

  ngOnInit() {
  }

}
