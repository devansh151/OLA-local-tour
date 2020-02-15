import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class UserService {

	private _isLogged = false;
	private _token: string = null;
	private _brandUserId: string = null;
	private _brandUserEmail: string = null;
	private _brandId: string = null;
	private _roleId: string = null;
	private _brandUserName: string = null;
	private _result: any = {};
	private _accessList: any = [];

	constructor() { }

	/*
	To decode the base-64 encoded auth token
	*/
	parseBearerToken(token: string) {

		let base64Url = token.split(' ')[1].split('.')[1];
		let base64 = base64Url.replace('-', '+').replace('_', '/');

		let res = JSON.parse(window.atob(base64));
		this.result = res;
		if (res.accessList) {
			this.accessList = res.accessList;
		}
		return res;
	}


	/* getter, setter for isLogged Property */
	get isLogged(): boolean {
		return this._isLogged;
	}

	set isLogged(status: boolean) {
		this._isLogged = status;
	}

	get token(): string {
		return this._token;
	}

	set token(t: string) {
		this._token = t;
	}

	get brandId(): string {
		return this._brandId;
	}

	get roleId(): string {
		return this._roleId;
	}

	set roleId(t: string) {
		this._roleId = t;
	}

	set brandId(t: string) {
		this._brandId = t;
	}

	get brandUserId(): string {
		return this._brandUserId;
	}

	set brandUserId(t: string) {
		this._brandUserId = t;
	}

	get brandUserEmail(): string {
		return this._brandUserEmail;
	}

	set brandUserEmail(t: string) {
		this._brandUserEmail = t;
	}

	get brandUserName(): string {
		return this._brandUserName;
	}

	set brandUserName(t: string) {
		this._brandUserName = t;
	}

	get result(): any {
		return this._result;
	}

	set result(t: any) {
		this._result = t;
	}
	get accessList() {
		return this._accessList;
	}
	set accessList(data) {
		this._accessList = data;
	}
	setBearerToken(val) {
		this.token = val;
		if (val) {
			let result = this.parseBearerToken(val);
			this.brandUserId = result.brandUserId;
			this.brandUserEmail = result.email;
			this.brandId = result.brandId;
			this.roleId = result.roleId;
			this.brandUserName = result.brandUserName;
			this.accessList = result.accessList;
			localStorage.setItem('Bearer_token', val); // backward compatiblity
			localStorage.setItem('brandInfo', JSON.stringify(result)); // backward compatiblity
		}
	}

	validateProductIdFromToken(accessList = []) {
		let result = accessList.filter(al => (al.productId === 3) && al.hasAccess);
		return result.length > 0;
	}

	/*
	Check if the localStorage has an entry of ola-token stored earlier.
	If not, return false and redirect to login page
	Otherwise, set the token prop of this LoginService and make an API call to validate the token.
	*/
	validateBearerToken(): any {
		let token: string = localStorage.getItem('Bearer_token');
		if (!token) {
			return;
		}

		this.token = token;
		let { brandId, brandUserId, roleId } = this.parseBearerToken(token);

		this.brandId = brandId;
		this.brandUserId = brandUserId;
		this.roleId = roleId;
		return true;
	}

	getUserImgUrl(brandId?, userId?) {
		if (!brandId) {
			brandId = this.brandId;
		}
		if (!userId) {
			userId = this.brandUserId;
		}
		let env = environment.production === true ? 'production' : 'staging';
		return `https://dtv8nooz7r2hh.cloudfront.net/brandUser_image/${env}/brand/${brandId}/${userId}/profile_${userId}.jpg`;
	}

}
