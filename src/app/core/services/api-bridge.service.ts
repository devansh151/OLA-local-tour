import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { UserService } from "./user.service";
import { Config } from './../../shared/config';

interface IApiCall {
	(...args: any[]): Observable<any>;
}

@Injectable()
export class ApiBridgeService {
	config: any = Config;
	reqHeaders: any = {};
	constructor(private http: Http, private userService: UserService) {
	}

	/**
	 * @description Make this method private since it is supposed to be used internally
	 * @param segment
	 * @param params
	 * @returns {string}
	   */
	private constructUri(segment, params = []) {
		let prefixUrl = this.config['PREFIX_URL'];
		let p = params ? `?${params.join('&')}` : ``;
		let completeUrl = (p !== "?") ? `${segment}${p}` :  `${prefixUrl}${segment}`;
		console.log(completeUrl);
		return completeUrl;
	}

	prepareCall(method, url, params, payload = {}, reqHeaders = {}) {
		if (this.userService.token) {
			if (method !== 'post') {
				reqHeaders['Content-Type'] = reqHeaders.hasOwnProperty('Content-Type') ? reqHeaders['Content-Type'] : 'application/json';
			}
			reqHeaders['Authorization'] = this.userService.token;
			reqHeaders['brandUserId'] = this.userService.brandUserId;
			reqHeaders['brandId'] = this.userService.brandId;
			reqHeaders['productId'] = 3;
		}

		let headers = new Headers(reqHeaders);
		let uri = this.constructUri(url, params);
		console.log(uri);
		return this.http.request.call(this.http, uri, { method, headers, body: payload });
	}

	makeGet(url, params = [], headers = {}) {
		return this.prepareCall('get', url, params, {}, headers);
	}

	makePost(url, payload = {}, headers = {}, params = []) {
		return this.prepareCall('post', url, params, payload, headers);
	}

	makePut(url, payload = {}, headers = {}, params = []) {
		return this.prepareCall('put', url, params, payload, headers);
	}

	makePatch(url, payload = {}, headers = {}, params = []) {
		return this.prepareCall('patch', url, params, payload, headers);
	}

	makeDelete(url, payload = {}, headers = {}, params = []) {
		return this.prepareCall('delete', url, params, payload, headers);
	}

	validateLoginToken(): Observable<boolean> {
		return this.makeGet('brandapi/testJwt');
	}

	logout() {
		return this.makePost('auth/v1/jwt/signout');
	}

}
