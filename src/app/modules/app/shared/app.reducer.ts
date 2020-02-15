import { fromJS, Map, List } from "immutable";
import { AppConstants } from "./app.constants";
import { IReducer, IAction } from "../../../shared/models";

const initialState = fromJS({
	isLoading: false,
	confirmDialog: {
		acceptLabel: 'Ok',
		rejectLabel: 'Cancel',
	},
	breadcrumb: {
		pageHeader: '',
		breadcrumbData: []
	}
});

export const AppReducer: IReducer<Map<string, any>> = (state: Map<string, any> = initialState, action: IAction) => {
	switch (action.type) {
		case AppConstants.SHOW_LOADER:
			return state.merge({
				isLoading: action.payload
			});
		case AppConstants.SET_CONFIRM_DIALOG_LABEL:
			return state.merge({
				confirmDialog: action.payload
			});
		case AppConstants.SET_BREAD_CRUMB:
			return state.setIn(['breadcrumb'], action.payload);
		default:
			return state;
	}
};
