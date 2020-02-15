import { Injectable } from '@angular/core';

import { ApiBridgeService } from './api-bridge.service';

Object.defineProperty(Object.prototype, 'getKeyFromValue', {
	value: function (val) {
		let k;
		let obj = this;
		for (let key in obj) {
			if (obj[key] == val) {
				k = key;
				break;
			}
		}
		return k;
	},
	enumerable: false,
	writable: false,
	configurable: true
});

@Injectable()
export class ConstantsService {
	data: any = {};

	constructor(private apiBridgeService: ApiBridgeService) { }

	setData(data) {
		this.data = data;
	}

	getConstants() {
		return this.apiBridgeService.makeGet(`survey/v1/constants`);
	}

	getEnum(enumKey) {
		return this.data[enumKey];
	}

	getArrayFromEnum(enumKey) {
		let arr = [];
		let d = this.getEnum(enumKey);
		Object.keys(d).forEach(key => {
			arr.push(d[key]);
		})
		return arr;
	}
		
}