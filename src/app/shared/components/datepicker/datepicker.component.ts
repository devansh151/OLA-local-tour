import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Record, Map, List } from 'immutable';
import * as moment from 'moment';

const CalendarItemRecord = Record({
	date: null,
	isInActive: false,
	selected: false
})

@Component({
	selector: 'ola-datepicker',
	templateUrl: './datepicker.component.pug',
	styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {

	weekDays: List<String> = List(["S", "M", "T", "W", "T", "F", "S"]);
	calendarMatrix: List<List<typeof CalendarItemRecord>> = List([]);

	month: number;
	year: number;
	day: number;
	disableUntil;
	date: Date;
	@Input('options') options: any;
	@Input('date') set dateInput(date: Date) {
		this.date = date;
		let now = this.date ? new Date(this.date) : new Date();
		this.month = now.getMonth();
		this.year = now.getFullYear();
		this.day = now.getDate();
		this.disableUntil = this.options && this.options.disableUntil ? this.options.disableUntil : 0;
		this.generateCalendarMatrix(this.day, this.month, this.year);
	}
	@Output() dateChanged: EventEmitter<any> = new EventEmitter();

	constructor() { }

	ngOnInit() {
		let now = this.date ? new Date(this.date) : new Date();
		this.month = now.getMonth();
		this.year = now.getFullYear();
		this.day = now.getDate();
		this.disableUntil = this.options && this.options.disableUntil ? this.options.disableUntil : 0;
		this.generateCalendarMatrix(this.day, this.month, this.year);
	}


	prevMonthDisabled() {
		let nowDate = new Date();
		let nowMomentDate = moment(`${nowDate.getMonth() + 1}/${nowDate.getFullYear()}`, 'MM/YYYY');
		let currentMomentDate = moment(`${this.month}/${this.year}`, 'MM/YYYY');
		return currentMomentDate.isBefore(nowMomentDate);
	}

	nextMonthDisabled() {
		/* Compute 11 month next Date  */
		let nowDate = new Date();
		let nowMomentDate = moment(`${nowDate.getMonth()}/${nowDate.getFullYear()}`, 'MM/YYYY').add(11, 'M');
		let currentMomentDate = moment(`${this.month + 1}/${this.year}`, 'MM/YYYY');

		return currentMomentDate.isAfter(nowMomentDate);
	}

	nextMonth() {
		let { nextMonth, nextYear } = this.getNextMonth(this.month, this.year);
		this.month = nextMonth;
		this.year = nextYear;
		this.generateCalendarMatrix(this.day, this.month, this.year);

	}

	prevMonth() {
		let { prevMonth, prevYear } = this.getPreviousMonth(this.month, this.year);
		this.month = prevMonth;
		this.year = prevYear;
		this.generateCalendarMatrix(this.day, this.month, this.year);

	}

	getPreviousMonth(month, year) {
		let prevMonth, prevYear = year;
		if (month - 1 < 0) {
			prevMonth = 11;
			prevYear = year - 1;
		} else
			prevMonth = month - 1;
		return {
			prevMonth,
			prevYear
		}
	}

	getNextMonth(month, year) {
		let nextMonth, nextYear = year;
		if (month + 1 >= 12) {
			nextMonth = 0;
			nextYear = year + 1;
		} else
			nextMonth = month + 1;
		return {
			nextMonth,
			nextYear
		}
	}

	selectDate(data: Record<string, any>, rowIndex: Number, colIndex: Number) {
		let date = new Date(this.year, this.month, data.get('date'));
		this.calendarMatrix = <List<List<typeof CalendarItemRecord>>>this.calendarMatrix.map(row => {
			return row.map((r: Record<string, any>) => {
				return r.set('selected', false);
			})
		});
		this.calendarMatrix = this.calendarMatrix.updateIn([rowIndex, colIndex], m => m.set('selected', true));
		this.dateChanged.emit({ date: date, action: '' });
	}

	trackByIndex(index, item) {
		return index;
	}

	generateCalendarMatrix(selectedDay, month, year) {

		let { prevMonth, prevYear } = this.getPreviousMonth(this.month, this.year);
		let prevMonthDays = this.getDays(prevMonth, prevYear);

		let lastDay = this.getDays(this.month, this.year);
		let firstDay = new Date(this.year, this.month, 1).getDay();
		let now = moment();
		let digit = 1;
		let startCell = 0;
		this.calendarMatrix = List([]);
		for (let row = 1; row <= Math.ceil((firstDay + lastDay - 1) / 7); ++row) {
			this.calendarMatrix = this.calendarMatrix.push(List([]));
			for (let day = 0; day < 7; day++) {
				let currentRow = this.calendarMatrix.last();
				if (startCell < firstDay) {
					let date = (prevMonthDays - (firstDay - startCell - 1));
					let data = new CalendarItemRecord({
						date,
						isInActive: true
					});

					this.calendarMatrix = this.calendarMatrix.update(this.calendarMatrix.size - 1, (cm: List<Record<string, any>>) => {
						return <List<typeof CalendarItemRecord>>cm.push(data);
					});

					startCell++;
				} else if (digit > lastDay) {
					let date = (digit - lastDay);
					let data = new CalendarItemRecord({
						date,
						isInActive: true
					});

					this.calendarMatrix = this.calendarMatrix.update(this.calendarMatrix.size - 1, (cm: List<Record<string, any>>) => {
						return <List<typeof CalendarItemRecord>>cm.push(data);
					});
					digit++;
				}
				else if (this.disableUntil.isAfter(moment(new Date(year, month, digit)), 'day')) {
					// console.log(moment(new Date(year, month, digit)));
					let data = new CalendarItemRecord({
						date: digit,
						isInActive: true
					});

					this.calendarMatrix = this.calendarMatrix.update(this.calendarMatrix.size - 1, (cm: List<Record<string, any>>) => {
						return <List<typeof CalendarItemRecord>>cm.push(data);
					});
					digit++;
				}
				else {
					let data = new CalendarItemRecord({
						date: digit,
						selected: digit === selectedDay
					});

					this.calendarMatrix = this.calendarMatrix.update(this.calendarMatrix.size - 1, (cm: List<Record<string, any>>) => {
						return <List<typeof CalendarItemRecord>>cm.push(data);
					});
					digit++;
				}
			}
		}
		let date = new Date(this.year, this.month, this.day);
		this.dateChanged.emit({ date: date, action: 'monthChanged' });
	}

	leapYear(year) {
		if (
			year % 4 === 0 // basic rule
		)
			return true; // is leap year // else not needed when statement is "return"
		return false; // is not leap year
	}

	getDays(month, year) {
		// create array to hold number of days in each month
		let ar = new Array(12);
		ar[0] = 31; // January
		ar[1] = this.leapYear(year) ? 29 : 28; // February
		ar[2] = 31; // March
		ar[3] = 30; // April
		ar[4] = 31; // May
		ar[5] = 30; // June
		ar[6] = 31; // July
		ar[7] = 31; // August
		ar[8] = 30; // September
		ar[9] = 31; // October
		ar[10] = 30; // November
		ar[11] = 31; // December

		// return number of days in the specified month (parameter)
		return ar[month];
	}

	getMonthName(month) {
		// create array to hold name of each month
		let ar = new Array(12);
		ar[0] = "January";
		ar[1] = "February";
		ar[2] = "March";
		ar[3] = "April";
		ar[4] = "May";
		ar[5] = "June";
		ar[6] = "July";
		ar[7] = "August";
		ar[8] = "September";
		ar[9] = "October";
		ar[10] = "November";
		ar[11] = "December";

		// return name of specified month (parameter)
		return ar[month];
	}


}
