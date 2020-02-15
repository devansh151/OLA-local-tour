import { IReducer, IAction } from "../../../shared/models";
import { fromJS, Record, List } from "immutable";
import { BoardConstants } from "./board.constants";

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

export const BoardReducer: IReducer<any> = (state: any = initialState, action: IAction) => {
	switch (action.type) {
		case BoardConstants.SET_ALL_PROJECTS:
            return state.setIn(['projects'], action.payload);
        case BoardConstants.SET_FLOWCHART:
            return state.setIn(['flowchart'], action.payload);
        case BoardConstants.SET_LOADING:
            return state.setIn(['isLoading'], action.payload);
        case BoardConstants.ADD_NODE:
            let nodeListSize=state.getIn(['flowchart','nodes']).size;
            return state.setIn(['flowchart','nodes',nodeListSize], action.payload);
        case BoardConstants.ADD_EDGE:
            let edgeListSize=state.getIn(['flowchart','edges']).size;
            return state.setIn(['flowchart','edges',edgeListSize], action.payload);
        case BoardConstants.DELETE_SELECTED:
            return state.setIn(['flowchart'], action.payload);
        case BoardConstants.SET_SUGGESTIONS:
            return state.setIn(['suggestions'], action.payload);
        case BoardConstants.SET_CURRENT_NODE_DETAILS:
            return state.setIn(['currentNodeDetails'], action.payload);
        default:
            return state;
    }
}