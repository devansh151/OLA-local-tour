import { IReducer, IAction } from "../../../shared/models";
import { fromJS, Record, List } from "immutable";
import { SchemeListConstants } from "./scheme-list.constants";

const initialState = fromJS({
    isLoading:false,
    schemeList:[]
});

export const SchemeListReducer: IReducer<any> = (state: any = initialState, action: IAction) => {
	switch (action.type) {
        case SchemeListConstants.SET_CITY_SCHEMES:
            return state.setIn(['schemeList'], action.payload);
        case SchemeListConstants.SET_SCHEME_LOADING:
            return state.setIn(['isLoading'], action.payload);
        default:
            return state;
    }
}