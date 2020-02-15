import { Component, OnInit } from '@angular/core';
import { MatOption,MatInput } from '@angular/material';

@Component({
  selector: 'od-edit-filter',
  templateUrl: './edit-filter.component.pug',
  styleUrls: ['./edit-filter.component.scss']
})
export class EditFilterComponent implements OnInit {

  filterTypes = [
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

  selectedFilter:MatOption;
  selectedAttribute:MatOption;

  constructor() { }

  ngOnInit() {
  }

}
