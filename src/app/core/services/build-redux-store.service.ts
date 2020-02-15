import { applyMiddleware, Store, compose, createStore } from "redux";
import { environment } from "../../../environments/environment";
import thunk from "redux-thunk";
import rootReducer from "./combine-reducers.service";
import { Map } from 'immutable';

const applyReduxDevTools = (<any>window).devToolsExtension;
const composeArgs = [
	applyMiddleware(thunk)
];

applyReduxDevTools ? composeArgs.push((<any>window).devToolsExtension()) : function noop() { };

const enhancer = compose.apply(compose, composeArgs);
export const store: Store<any> = createStore(rootReducer, Map({}), enhancer); 
