import { Directive, ElementRef, Input, EventEmitter, Output, ViewChild, ViewChildren, QueryList, ContentChildren } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Directive({
	selector: '[odSortable]'
})
export class SortableDirective {

	@Output() public itemDragged: EventEmitter<any> = new EventEmitter();
	@ContentChildren('sortableItem') sortableItems: QueryList<ElementRef>;

	items: Array<HTMLElement> = [];
	sub: Subscription;
	dragEl: HTMLElement;
	dropEl: HTMLElement;
	dragStartPosition: number;

	public constructor(private el: ElementRef) { }

	ngAfterContentInit() {

		this.items = this.sortableItems.map((r: ElementRef) => r.nativeElement);
		this.init();

		this.sortableItems.changes.subscribe((res: QueryList<ElementRef>) => {
			this.items = res.map((r: ElementRef) => r.nativeElement);
			this.init();
		});

	}

	init() {
		let thisRef = this;
		this.items.forEach((item) => {
			if (item.hasAttribute('data-event-handler-attached'))
				return;
			item.setAttribute("draggable", "true");
			item.addEventListener("dragstart", function (e) {
				e.stopPropagation();
				thisRef.dragEl = this;
				e.dataTransfer.effectAllowed = 'move';
				this.classList.add("ola-dragging");
				thisRef.dragStartPosition = thisRef.getNodeIndex(this);
			});
			item.addEventListener("dragover", function (e) {
				e.preventDefault();
				e.stopPropagation();
			}, true);
			item.addEventListener("dragenter", function (e) {
				e.preventDefault();
				e.stopPropagation();
				if (thisRef.dragEl === this || this.classList.contains('ola-dragenter')) return;

				this.classList.add("ola-dragenter");
				let self = this;
				thisRef.dropEl = this;
				if (thisRef.isBefore(self, thisRef.dragEl)) {
					// console.log('before', self, thisRef.dragEl);
					thisRef.moveElements(self, thisRef.dragEl);
				} else {
					thisRef.moveElements(self, thisRef.dragEl, true);
				}
			}, true);
			item.addEventListener("dragend", function (e) {
				e.stopPropagation();
				this.classList.remove("ola-dragging");
				thisRef.dropEl && thisRef.dropEl.classList.remove("ola-dragenter");
			});
			item.setAttribute('data-event-handler-attached', 'true');
		});
	}

	getNodeIndex(childNode: any) {
		return Array.prototype.indexOf.call(this.items, childNode);
	}

	moveElements(dropEl, draggedEl, after = false) {
		let dropElDim = dropEl.getBoundingClientRect();
		let draggedElDim = draggedEl.getBoundingClientRect();

		let distance = !after ? -draggedElDim.height : draggedElDim.height;

		dropEl.style.transition = '0.3s';
		dropEl.style.transform = "translateY(" + distance + "px)";

		const transitionEndEventHandler = () => {
			dropEl.style.transition = 'none';
			!after ? dropEl.parentNode.insertBefore(dropEl, draggedEl) : dropEl.parentNode.insertBefore(draggedEl, dropEl);
			dropEl.style.transform = "translateY(0px)";
			let finalIndex = this.getNodeIndex(dropEl);
			this.itemDragged.emit({
				previousIndex: this.dragStartPosition,
				finalIndex
			})
			dropEl.removeEventListener('transitionend', transitionEndEventHandler);
		}
		dropEl.addEventListener('transitionend', transitionEndEventHandler);
	}

	isBefore(a: any, b: any) {
		if (a.parentNode === b.parentNode) {
			for (let cur = a; cur; cur = cur.previousSibling) {
				if (cur === b) {
					return true;
				}
			}
		}
		return false;
	}

}