import { Component, OnInit } from '@angular/core';
import { MatOption,MatInput } from '@angular/material';

@Component({
  selector: 'od-edit-operator',
  templateUrl: './edit-operator.component.pug',
  styleUrls: ['./edit-operator.component.scss']
})
export class EditOperatorComponent implements OnInit {

  inputAttributeTypes = [
    {value: 1, viewValue: 'Weight'},
    {value: 2, viewValue: 'Incentive'},
    {value: 3, viewValue: 'MBG Incentive'}
  ];
  outputAttributeTypes = [
    {value: 1, viewValue: 'Weight'},
    {value: 2, viewValue: 'Incentive'},
    {value: 3, viewValue: 'MBG Incentive'}
  ];
  operatorTypes = [
    {value: 1, viewValue: 'Add'},
    {value: 2, viewValue: 'Subtract'},
    {value: 3, viewValue: 'Multiplier'},
    {value: 4, viewValue: 'Add with weight'}
  ];
  aggregateTypes = [
    {value: 1, viewValue: 'Total'},
    {value: 2, viewValue: 'Per unit'}
  ];

  selectedInputAttribute:MatOption;
  selectedOutputAttribute:MatOption;
  selectedOperator:MatOption;
  selectedAggregate:MatOption;

  constructor() { }

  ngOnInit() {
  }

}
