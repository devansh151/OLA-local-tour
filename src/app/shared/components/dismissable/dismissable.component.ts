import { Component, OnInit, ViewChild, ElementRef, Input, ChangeDetectorRef } from '@angular/core';

@Component({
	selector: 'ola-dismissable',
	templateUrl: './dismissable.component.pug',
	styleUrls: ['./dismissable.component.scss']
})
export class DismissableComponent implements OnInit {

	public suggestionsExpanded = false;
	docHandler: Function;

	@Input() disabled = false;
	@Input() postOpenCallback: Function;
	@ViewChild('suggestionsHolder') suggestionsHolder: ElementRef;
	@ViewChild('boxHolder') boxHolder: ElementRef;

	constructor(private cd: ChangeDetectorRef) { }

	ngOnInit() {

	}

	public openSuggestions(event) {
		if (this.disabled) {
			return;
		}
		this.suggestionsExpanded = !this.suggestionsExpanded;
		if (this.suggestionsExpanded) {
			this.docHandler = (e) => {
				if (!this.suggestionsHolder.nativeElement.contains(e.target)) {
					e.preventDefault();
					if (!this.boxHolder.nativeElement.contains(e.target)) {
						this.suggestionsExpanded = false;
					}
					console.log('doc Clicked');
					this.cd.markForCheck();
					this.removeDocEventListener();
				}
			};
			if (this.postOpenCallback) {
				this.postOpenCallback();
			}
			document.addEventListener('click', <any>this.docHandler, true);
		}
	}

	removeDocEventListener() {
		if (this.docHandler) {
			document.removeEventListener('click', <any>this.docHandler, true);
		}
	}

	public collapseSuggestions() {
		this.suggestionsExpanded = false;
		this.removeDocEventListener();
	}

}