import { IReducer, IAction } from "../../../shared/models";
import { fromJS, Record, List } from "immutable";
import { FosConstants } from "./fos.constants";

const initialState = fromJS({
    projects:[],
    flowchart:{
        nodes:[],
        edges:[]
    },
    isLoading:false,
    suggestions:[],
    currentNodeDetails:{}
});

export const FosReducer: IReducer<any> = (state: any = initialState, action: IAction) => {
	switch (action.type) {
		case FosConstants.SET_ALL_PROJECTS:
            return state.setIn(['projects'], action.payload);
        case FosConstants.SET_FOS_FLOWCHART:
            return state.setIn(['flowchart'], action.payload);
        case FosConstants.SET_FOS_LOADING:
            return state.setIn(['isLoading'], action.payload);
        case FosConstants.ADD_FOS_NODE:
            let nodeListSize=state.getIn(['flowchart','nodes']).size;
            return state.setIn(['flowchart','nodes',nodeListSize], action.payload);
        case FosConstants.ADD_FOS_EDGE:
            let edgeListSize=state.getIn(['flowchart','edges']).size;
            return state.setIn(['flowchart','edges',edgeListSize], action.payload);
        case FosConstants.DELETE_FOS_SELECTED:
            return state.setIn(['flowchart'], action.payload);
        case FosConstants.SET_FOS_SUGGESTIONS:
            return state.setIn(['suggestions'], action.payload);
        case FosConstants.SET_FOS_CURRENT_NODE_DETAILS:
            return state.setIn(['currentNodeDetails'], action.payload);
        default:
            return state;
    }
}