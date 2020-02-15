import { Component, OnInit } from '@angular/core';
import { MatOption,MatInput } from '@angular/material';


@Component({
  selector: 'od-edit-condition',
  templateUrl: './edit-condition.component.pug',
  styleUrls: ['./edit-condition.component.scss']
})
export class EditConditionComponent implements OnInit {

  conditionTypes = [
    {value: 1, viewValue: 'AND'},
    {value: 2, viewValue: 'OR'},
    {value: 3, viewValue: 'NOT'}
  ];
  selectedCondition:MatOption;

  constructor() { }

  ngOnInit() {
  }

}
