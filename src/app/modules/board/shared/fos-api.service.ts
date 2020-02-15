import { Injectable } from "@angular/core";
import { ApiBridgeService } from "../../../core/services/api-bridge.service";
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class FosApiService {
	constructor(private apiBridge: ApiBridgeService) { }
	getAllProjects() {
		let url = `/getProjects`;
		return this.apiBridge.makeGet(url);
	}
	
	getFlowchart() {
		let url = `/getFOSFlowchart`;
		return this.apiBridge.makeGet(url);
	}

	addNode(id,category){
		let url = `/get?id=${id}&category=${category}`;
		return this.apiBridge.makeGet(url);
	}

	addEdge(edge){
		let url = `/addEdge`;
		return this.apiBridge.makePut(url,edge);
	}

	deleteSelected(data){
		let url = `/deleteSelected`;
		return this.apiBridge.makeDelete(url,data);
	}

	getSuggestions(category,searchKey){
		let url = `/search?category=${category}&searchKey=${searchKey}`;
		return this.apiBridge.makeGet(url);
	}
	
}