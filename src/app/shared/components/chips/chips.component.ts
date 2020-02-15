import {
	AfterViewInit,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild,
	ViewEncapsulation,
	ChangeDetectorRef
} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { List, Map, is, fromJS } from 'immutable';

let noResultRow = Map({
	id: -1,
	tagName: 'No Results Found'
});

interface IDataConfig {
	text: string;
	value?: string;
}

@Component({
	selector: 'ola-chips',
	templateUrl: './chips.component.pug',
	styleUrls: ['./chips.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ChipsComponent implements OnInit, AfterViewInit {

	@ViewChild('inputBox') inputBox: ElementRef;

	@Input() public showNoResult = true;
	@Input() public labelText: string;
	@Input() public config: IDataConfig;
	@Input() public chipConfig: IDataConfig;
	@Input() public isDisabled: any;
	@Input() public closeOnSelect = false;
	@Input() public allowCustom = false;
	@Input() public handleSelectionInternally = false;
	@Input() public placeholderText = '';
	@Input() public hideLabel = false;
	@Input() public openOnFocus = true;
	@Input() public allowChipDrag = false;
	@Input() public validChipRegex: RegExp;
	@Input() public supportDeprecated: Boolean;
	@Input() public allowEdit = false;
	focusInput: any;
	@Input('focusInputBox') set focusInputBoxOb(input: Subject<any>) {
		this.setFocus(input);
	}

	@Input('suggestions') set suggestionsInput(suggestions: List<any>) {
		this.setSuggestions(suggestions);
	};

	@Input('chips') set chipsInput(value) {
		this.chips = value;
		this.setSuggestions(this.suggestionsPristine);
	};

	@Output() selectedChips: EventEmitter<any> = new EventEmitter<any>();
	@Output() removedChip: EventEmitter<any> = new EventEmitter<any>();
	@Output() editChip: EventEmitter<any> = new EventEmitter<any>();
	@Output() onFocusInput: EventEmitter<any> = new EventEmitter<any>();
	@Output() onBlurInput: EventEmitter<any> = new EventEmitter<any>();
	selectedChipIndex: number;
	selectedSuggestionIndex = 0;
	backpress = 0;
	showSuggestions = false;
	textBoxVal = '';
	suggestionsOriginal: List<any> = List();
	suggestionsPristine: List<any> = List();
	suggestions: List<any> = List();
	chips: List<any> = List();
	suggestionsLeftOffset = 0;

	constructor(private cdRef: ChangeDetectorRef) {

	}
	ngOnInit() { }

	ngAfterViewInit() {
	}

	setFocus(input) {
		this.focusInput = input;
		if (this.focusInput) {
			this.focusInputBox();
		}
		else {
			this.blurInputBox();
			this.onBlurInput.emit();
		}
	}

	onChipDoubleClick(e, i) {
		if (this.allowEdit) {
			this.chips = this.chips.set(i, this.chips.get(i).set('editable', true));
		}
	}

	setSuggestions(suggestions: List<any>) {
		if (!suggestions) { // null check
			suggestions = List<any>();
		}
		this.suggestionsPristine = suggestions;
		let excludedChipsSuggestions = suggestions.filter(suggestion => {
			if (suggestion.get(this.config.value) === 1 || suggestion.get(this.config.value) === 2) {
				return false;
			}
			return !this.chips.some(chip => chip.get(this.chipConfig.value) === suggestion.get(this.config.value));
		});

		this.suggestions = <List<any>>excludedChipsSuggestions;
		// this.suggestions = this.suggestions.filter(suggestion=> suggestion.get(this.config.value) == 1 || suggestion.get(this.config.value) == 2);
		this.suggestionsOriginal = this.suggestions;
	}

	focusInputBox() {
		setTimeout(() => {
			this.inputBox.nativeElement.focus();
		});
	}

	blurInputBox() {
		setTimeout(() => {
			this.inputBox.nativeElement.blur();
		});
	}

	chipDragStarted($event: DragEvent, chip: Map<string, any>) {
		let transferData = Map({
			chip: chip,
			type: 'CHIP_DROPPED'
		});
		$event.dataTransfer.setData('text/plain', JSON.stringify(transferData));
	}

	chipDragged($event: DragEvent, chipIndex) {
		this.removeChip(chipIndex);
	}

	onChipDrop($event: DragEvent) {
		$event.preventDefault();
		let data = $event.dataTransfer.getData('text/plain');
		if (data) {
			try {
				let res = JSON.parse(data);
				if (res.type && res.type === 'CHIP_DROPPED') {
					this.emitChosenSuggestion(fromJS(res.chip));
				}
			}
			catch (e) {
				console.error(`Error parsing the dropped chip`);
			}
		}
	}

	textTyped(e) {

		this.onFocusInput.emit({ value: e.target.value, length: e.target.value.length });

		if (e.keyCode === 8) {
			if (e.target.value.length === 0) {
				if (this.backpress === 0) {
					this.suggestions = this.suggestionsOriginal;
					this.selectedChipIndex = this.chips.size - 1;
					this.backpress++;
				}
				else {
					this.removeChip(this.chips.size - 1);
					this.backpress = 0;
				}
			} else {
				this.filterSuggestions(e.target.value);
				this.backpress = 0;
			}
		} else if (e.keyCode === 40) {
			if ((this.selectedSuggestionIndex + 1) > this.suggestions.size - 1) {
				this.selectedSuggestionIndex = 0;
			}
			else {
				this.selectedSuggestionIndex++;
			}
		} else if (e.keyCode === 38) {
			if ((this.selectedSuggestionIndex - 1) < 0) {
				this.selectedSuggestionIndex = this.suggestions.size - 1;
			}
			else {
				this.selectedSuggestionIndex--;
			}
		} else if (e.keyCode === 13 || e.keyCode === 32) {
			if (this.allowCustom && (is(this.suggestions.first(), noResultRow) || this.suggestions.size === 0)) {
				this.emitChosenSuggestion(e.target.value.trim());
				return;
			}
			if (e.keyCode === 13) {
				this.chooseSuggestion(this.selectedSuggestionIndex);
			}
		}
		else {
			this.backpress = 0;
			this.filterSuggestions(e.target.value);
		}
	}

	filterSuggestions(value) {
		let val = value;
		this.selectedChipIndex = -1;
		let regex = new RegExp(`.*${val}.*`, 'i');
		let filteredSuggestions = <List<any>>this.suggestionsOriginal
			.filter(s => {
				let sProp = this.config ? s.get(this.config.text) : s;
				return regex.test(sProp);
			});

		if (filteredSuggestions.size > 0) {
			this.suggestions = filteredSuggestions;
			this.expandSuggestions();
		} else if (this.showNoResult) {
			this.suggestions = List([noResultRow]);
		} else {
			this.suggestions = List();
		}

	}

	inputBoxFocused() {
		if (this.openOnFocus) {
			this.displaySuggestions();
		}
	}

	inputBoxBlurred(e) {
		if (this.allowCustom && (is(this.suggestions.first(), noResultRow) || this.suggestions.size === 0)) {
			if (e.target.value.length > 0) {
				this.emitChosenSuggestion(e.target.value.trim());
			}
		}
		this.hideSuggestions();
		this.setFocus(false);
	}

	inputBoxEditBlurred(e, i) {
		if (e.target.value.length > 0) {
			this.chips = this.chips
				.setIn([i, 'editable'], false)
				.setIn([i, this.chipConfig.text], e.target.value.trim());
			this.editChip.emit({ value: this.chips.get(i), i });
		}
	}

	inputBoxEditKeyup(e, i) {
		if (e.keyCode === 13) {
			if (e.target.value.length > 0) {
				this.chips = this.chips
					.setIn([i, 'editable'], false)
					.setIn([i, this.chipConfig.text ? this.chipConfig.text : 'email'], e.target.value.trim());
				this.editChip.emit({ value: this.chips.get(i), i });
			}
		}
	}

	displaySuggestions(event?: any) {
		this.suggestions = this.suggestionsOriginal;
		this.expandSuggestions();
	}

	expandSuggestions() {
		this.suggestionsLeftOffset = this.inputBox.nativeElement.offsetLeft;
		this.showSuggestions = true;
	}

	hideSuggestions() {
		setTimeout(function () {
			this.showSuggestions = false;
			this.selectedChipIndex = -1;
			this.backpress = 0;
			this.cdRef.markForCheck();
		}.bind(this), 200);
	}

	removeChip(idx: number) {
		this.removedChip.emit({ chip: this.chips.get(idx), index: idx });
		if (this.supportDeprecated) {
			this.selectedChips.emit(this.chips.splice(idx, 1));
		}
	}

	chooseSuggestion(i: number, e?: any) {
		if (e) {
			e.preventDefault();
		}
		this.backpress = 0;
		if (!this.allowCustom && is(this.suggestions.first(), noResultRow)) {
			return;
		}
		let chipItem;
		if (this.config.value) {
			if (this.chipConfig.value) {
				chipItem = this.chips.find(c => is(c.get(this.chipConfig.value), this.suggestions.getIn([i, this.config.value])));
			}
			else {
				chipItem = this.chips.find(c => is(c.get(this.config.value), this.suggestions.getIn([i, this.config.value])));
			}
		}
		else {
			chipItem = this.chips.find(c => is(c, this.suggestions.get(i)));
		}

		if (!chipItem) {
			this.emitChosenSuggestion(this.suggestions.get(i));
			this.suggestions = this.suggestionsOriginal.delete(i);
		}
	}

	emitChosenSuggestion(suggestion) {
		if (this.config && typeof (suggestion) === "string") {
			let obj = {};
			obj[this.config.value] = 0;
			obj[this.config.text] = suggestion;
			suggestion = fromJS(obj);
		}
		this.textBoxVal = '';
		if (this.handleSelectionInternally) {
			this.chips = this.chips.push(suggestion);
		}

		if (this.supportDeprecated) {
			this.selectedChips.emit(this.chips.push(suggestion));
		} else {
			this.selectedChips.emit(List([suggestion]));
		}

		if (this.closeOnSelect) {
			this.hideSuggestions();
		}
	}

	getChipValue(chip) {
		return this.chipConfig ? chip.get(this.chipConfig.text) ? chip.get(this.chipConfig.text) : (this.allowCustom ? chip : null) : chip;
	}

	checkIfValid(chip) {
		if (!this.validChipRegex)
			return;
		return !this.validChipRegex.test(this.getChipValue(chip));

	}
}
