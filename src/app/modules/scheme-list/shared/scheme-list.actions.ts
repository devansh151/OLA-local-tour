import { UserService } from './../../../core/services/user.service';
import { Injectable } from "@angular/core";
import { fromJS, List, Map, Set } from "immutable";
import { IActionCreator, IAction } from "../../../shared/models";
import { AppActions } from "../../app/shared/app.actions";
import { SchemeListConstants } from "./scheme-list.constants";
import { SchemeListApiService } from "./scheme-list-api.service";
import { SchemeListItem } from "./models/scheme-list-item.model";
import { Router } from '@angular/router';
@Injectable()
export class SchemeListActions {

  constructor(private router: Router,private appActions:AppActions,private schemeListApiService:SchemeListApiService ) { }

  setCitySchemes: IActionCreator = (data:any) => {
    return {
      type: SchemeListConstants.SET_CITY_SCHEMES,
      payload: data
    }
  }

  setLoading: IActionCreator = (data:any) => {
    return {
      type: SchemeListConstants.SET_SCHEME_LOADING,
      payload: data
    }
  }

  getCitySchemes(city) {
    return (dispatch) => {
      dispatch(this.setLoading(true));
      this.schemeListApiService.getCitySchemes(city)
        .map(res => res.json())
        .map(res => {
            return List(res
                .map(r => {
                    return SchemeListItem.createSchemeListItem(r);
                })
            )
        })
        .subscribe(res => {
          dispatch(this.setLoading(false));
          dispatch(this.setCitySchemes(fromJS(res)));
        }, err => {
          dispatch(this.appActions.parseAndShowError(err));
        })
    }
  }

}
