import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChildren,
  ContentChildren,
  ViewChild,
  QueryList,
  ElementRef,
  Input,
  Output,
  AfterViewInit,
  EventEmitter,
  ChangeDetectorRef
} from '@angular/core';

@Component({
  selector: 'ola-tab-item',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './ola-tab-item.component.scss'
  ],
  template: `
        <div class="tab-item" #tabItem>
            <div class="tab-item-label" #tabLabel (click)="selectTab()">
                {{labelName}}
				<span *ngIf="badge">{{badge}}</span>
            </div>
            <div class="tab-item-content" #tabContent [style.display]="isActive ? 'block': 'none'">
                <ng-content></ng-content>
            </div>
        </div>
    `
})
export class OlaTabItemComponent {
  @Input() public labelName: string;
  @Input() public badge: number;
  @Input() public isActive: boolean = false;
  @ViewChild('tabLabel') public tabLabel: ElementRef;
  @ViewChild('tabContent') public tabContent: ElementRef;
  @Output() public tabSelected: EventEmitter<any> = new EventEmitter();
  constructor(public cdref: ChangeDetectorRef) {

  }

  selectTab() {
    // this.isActive = true;
    this.tabSelected.emit();
  }
}
