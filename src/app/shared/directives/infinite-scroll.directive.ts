import { Directive, Output, EventEmitter, Input, ElementRef, NgZone, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import "rxjs/add/operator/debounceTime";

const DEBOUNCE_INTERVAL = 20;

@Directive({
	selector: '[odInfiniteScroll]'
})
export class InfiniteScrollDirective implements AfterViewInit {
	lastTriggeredHeight: number;
	@Output() reachedBottom: EventEmitter<any> = new EventEmitter();
	@Output() reachedTop: EventEmitter<any> = new EventEmitter();
	@Input() checkForTop: Boolean = false;

	constructor(private el: ElementRef, private zone: NgZone) { }

	onScroll(e) {
		let el = e.target;
		if (el.scrollHeight === (el.scrollTop + el.offsetHeight)) {
			this.reachedBottom.emit();
		}

		if (this.checkForTop && el.scrollTop >= 0 && el.scrollTop <= 30) {
			this.reachedTop.emit();
		}
	}

	ngAfterViewInit() {
		this.zone.runOutsideAngular(() => {
			Observable.fromEvent(this.el.nativeElement, 'scroll')
				.debounceTime(DEBOUNCE_INTERVAL)
				.subscribe(res => {
					this.onScroll(res);
				});
		});
	}


}
