import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { MatSlideToggle } from '@angular/material';

@Component({
  selector: 'od-scheme-list-item',
  templateUrl: './scheme-list-item.component.pug',
  styleUrls: ['./scheme-list-item.component.scss']
})
export class SchemeListItemComponent implements OnInit {

  @Input() item;
  @Output() schemeListItemoutput: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  emitOutput(data){
    this.schemeListItemoutput.emit(data);
  }

}
