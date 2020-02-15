import { Injectable } from '@angular/core';
import { ApiBridgeService } from './api-bridge.service';

@Injectable()
export class UtilsService {

	static capitalize(str: string) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	static snakeCaseToCamelCase(str) {
		return str.toLowerCase().split('_').map((s, i) => (i > 0) ? UtilsService.capitalize(s) : s).join('');
	}

	static snakeCaseToCaptializeCase(str) {
		return str.toLowerCase().split('_').map((s, i) => UtilsService.capitalize(s)).join(' ');
	}

	static captializeToUpperSnakeCase(str) {
		return str.toLowerCase().split(' ').map((s, i) => s.toUpperCase()).join('_');
	}

	static removeUnderscore(str) {
		return str.split("_").join(" ");
	}

	static zeroPad(num: Number) {
		return ("0" + num).slice(-2);
	}

	static generateConstantsMap(arr) {
		let data = {};
		arr.forEach(c => data[c] = c);
		return data;
	}

	constructor(private apiBridgeService: ApiBridgeService) {
	}

	shrinkUrl(url) {
		return this.apiBridgeService.makeGet(`firebirdapi/v1/posts/shortenurl`, [`url=${url}`]);
	}

}
