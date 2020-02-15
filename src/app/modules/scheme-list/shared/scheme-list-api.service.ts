import { Injectable } from "@angular/core";
import { ApiBridgeService } from "../../../core/services/api-bridge.service";
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SchemeListApiService {

	constructor(private apiBridge: ApiBridgeService) { }
    
    getCitySchemes(city) {
		let url = `/getCitySchemes?city=${city}`;
		return this.apiBridge.makeGet(url);
	}
}