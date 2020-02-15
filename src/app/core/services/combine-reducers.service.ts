
import { combineReducers } from "redux-immutable";

import { AppReducer } from "../../modules/app/shared/app.reducer";
import { SchemeListReducer } from "../../modules/scheme-list/shared/scheme-list.reducer";

export default combineReducers({
	app: AppReducer,
	schemes:SchemeListReducer
});





