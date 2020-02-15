import { UserService } from './../../../core/services/user.service';
import { Injectable } from "@angular/core";
import { fromJS, List, Map, Set } from "immutable";
import { IActionCreator, IAction } from "../../../shared/models";
import { AppActions } from "../../app/shared/app.actions";
import { BoardConstants } from "./board.constants";
import { BoardApiService } from "./board-api.service";
import { Router } from '@angular/router';
@Injectable()
export class BoardActions {

  constructor(private router: Router,private appActions:AppActions,private boardApiService:BoardApiService ) { }

  setProjects: IActionCreator = (data:any) => {
    return {
      type: BoardConstants.SET_ALL_PROJECTS,
      payload: data
    }
  }

  setFlowchart: IActionCreator = (data:any) => {
    return {
      type: BoardConstants.SET_FLOWCHART,
      payload: data
    }
  }

  setLoading: IActionCreator = (data:any) => {
    return {
      type: BoardConstants.SET_LOADING,
      payload: data
    }
  }

  pushNode: IActionCreator = (data:any) => {
    return {
      type: BoardConstants.ADD_NODE,
      payload: data
    }
  }

  pushEdge: IActionCreator = (data:any) => {
    return {
      type: BoardConstants.ADD_EDGE,
      payload: data
    }
  }

  deleteSlelectedData: IActionCreator = (data:any) => {
    return {
      type: BoardConstants.DELETE_SELECTED,
      payload: data
    }
  }

  setSuggestions: IActionCreator = (data:any) => {
    return {
      type: BoardConstants.SET_SUGGESTIONS,
      payload: data
    }
  }

  setCurrentNodeDetails: IActionCreator = (data:any) => {
    return {
      type: BoardConstants.SET_CURRENT_NODE_DETAILS,
      payload: data
    }
  }

  

  getProjects() {
    return (dispatch) => {
      this.boardApiService.getAllProjects()
        .map(res => res.json())
        .subscribe(res => {
          dispatch(this.setProjects(fromJS(res)));
        }, err => {
          dispatch(this.appActions.parseAndShowError(err));
        })
    }
  }

  getFlowchart(callbackFn?: Function) {
    return (dispatch) => {
      dispatch(this.setLoading(true));
      this.boardApiService.getFlowchart()
        .map(res => res.json())
        .subscribe(res => {
          dispatch(this.setLoading(false));
          dispatch(this.setFlowchart(fromJS(res)));
          callbackFn && callbackFn();
        }, err => {
          dispatch(this.appActions.parseAndShowError(err));
        })
    }
  }

  addNode(id,category) {
    return (dispatch) => {
      this.boardApiService.addNode(id,category)
      .map(res => res.json())
      .subscribe(res => {
        dispatch(this.pushNode(fromJS(res)));
        dispatch(this.appActions.showSuccessToast('Node added successfully!'));     
      }, err => {
        dispatch(this.appActions.parseAndShowError(err));
      })
    }  
  }

  addEdge(edge,callbackFn?: Function) {
    return (dispatch) => {
      this.boardApiService.addEdge(edge)
      .map(res => res.json())
      .subscribe(res => {
        if(res.status)
        {
          dispatch(this.pushEdge(fromJS(edge)));
          dispatch(this.appActions.showSuccessToast('Edge added successfully!'));
        }
        else{
          dispatch(this.appActions.parseAndShowError('Cannot add egde please try again!'));
        }
        callbackFn && callbackFn();
      }, err => {
        dispatch(this.appActions.parseAndShowError(err));
      })
    }
  }

  deleteSelected(data){
    return (dispatch,getState) => {
      this.boardApiService.deleteSelected(data)
      .map(res => res.json())
      .subscribe(res => {
        if(res.status){
          let nodes = getState().getIn(['board','flowchart','nodes']).toJS().filter((obj)=> {
            return !data.nodes.some((id)=> {
                return obj.id == id
            });
          });
          let edges = getState().getIn(['board','flowchart','edges']).toJS().filter((obj)=> {
            return !data.edges.some((id)=> {
              return obj.id == id;
            });
          });
          console.log(edges);
          dispatch(this.deleteSlelectedData(fromJS({nodes,edges})));
          dispatch(this.appActions.showSuccessToast('Deletion successfull!'));
        }
        else{
          dispatch(this.appActions.parseAndShowError('Cannot delete please try again!!'));
        } 
      }, err => {
        dispatch(this.appActions.parseAndShowError(err));
      });
    }
  }

  getSuggestions(category,searchKey){
    return (dispatch,getState) => {
      this.boardApiService.getSuggestions(category,searchKey)
      .map(res => res.json())
      .subscribe(res => {
          dispatch(this.setSuggestions(fromJS(res)));
      }, err => {
        console.log(err);
        dispatch(this.appActions.parseAndShowError(err));
      });
    }
  }

  getCurrentNodeDetails(id){
    return (dispatch,getState) => {
      let selectedtNodeIndex=getState().getIn(['board','flowchart','nodes']).findIndex(m => {
        if(m.get('id')===id)
          return true;
      });
      if(selectedtNodeIndex==-1){
        dispatch(this.appActions.parseAndShowError('Error selecting node ID does not exist! '));
      }
      else{
        let currentNode=getState().getIn(['board','flowchart','nodes',selectedtNodeIndex]);
        dispatch(this.setCurrentNodeDetails(fromJS(currentNode)));
      }
    }
  }


}
