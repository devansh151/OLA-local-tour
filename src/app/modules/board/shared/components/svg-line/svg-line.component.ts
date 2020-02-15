import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'od-svg-line',
  templateUrl: './svg-line.component.pug',
  styleUrls: ['./svg-line.component.scss']
})
export class SvgLineComponent implements OnInit {

  @Input() x1;
  @Input() x2;
  @Input() y1;
  @Input() y2;
  
  constructor() { }

  ngOnInit() {
  }

}
