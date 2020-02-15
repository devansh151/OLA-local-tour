import { Record, List, Map } from 'immutable';
import * as moment from 'moment';

interface ISchemeListItem {
	id: string,
	name: string,
	validFrom: String,
	validTo: String,
	enabled: Boolean
}

const SchemeListItemRecord = Record({
	id: null,
	name: null,
	validFrom: null,
	validTo: null,
	enabled: false
});

export class SchemeListItem extends SchemeListItemRecord implements ISchemeListItem {
	id: string;
	name: string;
	validFrom: String;
	validTo: String;
    enabled: Boolean;
    
	static createSchemeListItem(response: any) {
		return new SchemeListItem({
			id: response.id,
            name: response.name,
            validFrom: moment.utc(response.validFrom).format('MMM Do, YYYY'),
            validTo: moment.utc(response.validTo).format('MMM Do, YYYY'),
            enabled: response.enabled
		});
	}
	
	constructor(props) {
		super(props);
	}

}