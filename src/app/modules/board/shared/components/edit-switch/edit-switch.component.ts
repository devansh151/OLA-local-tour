import { Component, OnInit } from '@angular/core';
import { MatOption,MatInput } from '@angular/material';

@Component({
  selector: 'od-edit-switch',
  templateUrl: './edit-switch.component.pug',
  styleUrls: ['./edit-switch.component.scss']
})
export class EditSwitchComponent implements OnInit {

  switchTypes = [
    {value: 1, viewValue: '=='},
    {value: 2, viewValue: '>='},
    {value: 3, viewValue: '<='},
    {value: 4, viewValue: '>'},
    {value: 5, viewValue: '='},
    {value: 6, viewValue: 'Range'},
    {value: 7, viewValue: 'Multiple Range'},
    {value: 8, viewValue: 'Open Range'}
  ];

  attributeTypes = [
    {value: 1, viewValue: 'priority_tagging'},
    {value: 2, viewValue: 'Weight'},
    {value: 3, viewValue: 'Other'},
  ];

  selectedSwitch:MatOption;
  selectedAttribute:MatOption;

  constructor() { }

  ngOnInit() {
  }

}
