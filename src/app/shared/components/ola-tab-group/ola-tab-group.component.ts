import { Subscription } from 'rxjs/Subscription';
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
	AfterContentInit,
	EventEmitter,
	ChangeDetectorRef
} from '@angular/core';
import { OlaTabItemComponent } from './ola-tab-item/ola-tab-item.component';

@Component({
	selector: 'ola-tab-group',
	templateUrl: './ola-tab-group.component.pug',
	styleUrls: ['./ola-tab-group.component.scss']
})

export class OlaTabGroupComponent implements OnInit, AfterContentInit {
	@ContentChildren(OlaTabItemComponent) tabItems: QueryList<OlaTabItemComponent>;

	tabItemSubscription: Subscription;
	tabSubscription: Subscription;
	selectedIndex: number = 0;

	inkbarLeft: number = 0;
	inkbarWidth: number = 160;

	tabItemsArr: Array<OlaTabItemComponent> = [];

	@Input('selectedTab') set selectedTabInput(index: number) {
		if (index) {
			this.selectedIndex = index;
			this.selectTabByIndex(index);
		}
	};
	@Output() tabChanged: EventEmitter<any> = new EventEmitter();

	constructor(private cdref: ChangeDetectorRef) { }

	ngOnInit() {

	}

	ngAfterContentInit() {
		setTimeout(() => {
			this.performInitChores();
		});
		this.tabItemSubscription = this.tabItems.changes.subscribe(res => {
			this.performInitChores();
		});

	}

	performInitChores() {
		this.tabItemsArr = this.tabItems.toArray();
		this.selectTabByIndex(this.selectedIndex);
		if (!this.cdref['destroyed']) {
			this.cdref.detectChanges();
		}
		// this.cdref.detectChanges();
		this.tabItemsArr.forEach((tabItem: OlaTabItemComponent, index: number) => {
			this.tabSubscription = tabItem.tabSelected.subscribe(() => {
				this.tabChanged.emit({
					previousTab: this.selectedIndex,
					newTab: index
				});
				this.selectTab(tabItem, index);
			});
		});
	}

	selectTab(tabItem: OlaTabItemComponent, index) {
		let labelTarget = tabItem.tabLabel.nativeElement;
		this.tabItemsArr[this.selectedIndex].isActive = false;
		tabItem.isActive = true;
		this.selectedIndex = index;
		this.inkbarLeft = labelTarget.offsetLeft;
		this.inkbarWidth = labelTarget.offsetWidth;
		if (!tabItem.cdref['destroyed']) {
			tabItem.cdref.detectChanges();
		}
		// tabItem.cdref.detectChanges();
	}

	selectTabByIndex(index: number) {
		if (this.tabItemsArr[index]) {
			let targetEl = this.tabItemsArr[index];
			this.selectTab(targetEl, index);
		}
	}

	ngOnDestroy() {
		this.cdref.detach();
		if (this.tabItemSubscription) {
			this.tabItemSubscription.unsubscribe();
		}
		if (this.tabSubscription) {
			this.tabSubscription.unsubscribe();
		}
	}
}
