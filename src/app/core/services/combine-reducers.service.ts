
import { combineReducers } from "redux-immutable";

import { AppReducer } from "../../modules/app/shared/app.reducer";
import { BoardReducer } from "../../modules/board/shared/board.reducer";
import { SchemeListReducer } from "../../modules/scheme-list/shared/scheme-list.reducer";
import { FosReducer } from "../../modules/board/shared/fos.reducer";

export default combineReducers({
	app: AppReducer,
	board:BoardReducer,
	schemes:SchemeListReducer,
	fos:FosReducer
});





