import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { FosMainContainerComponent } from "../fos-main-container/fos-main-container.component";
import { BoardActions } from "../shared/board.actions";
import { FosActions } from "../shared/fos.actions";
import { AppActions } from "../../app/shared/app.actions";
import { List, Map, fromJS } from 'immutable';
import { NgRedux, select } from '@angular-redux/store';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { AddNodeDialogComponent } from "../shared/components/add-node-dialog/add-node-dialog.component";
import { MatDialog, MatDialogRef,MatOption,MatInput,MatAutocomplete,MatChip,MatHorizontalStepper,MatStepper,MatGridList,MatDatepicker,MatDatepickerToggle,MatSlideToggle } from '@angular/material';
import { CdkStep } from '@angular/cdk/stepper';

declare var vis: any;

@Component({
  selector: 'board-main-container',
  templateUrl: './board-main-container.component.pug',
  styleUrls: ['./board-main-container.component.scss']
})
export class BoardMainContainerComponent implements OnInit {
  @select(['board', 'flowchart']) flowchart$: any;
  @select(['board', 'isLoading']) isLoading$: any;
  @select(['board', 'suggestions']) suggestions$: any;
  @select(['board', 'currentNodeDetails']) currentNodeDetails$: any;
  @ViewChild('stepper') stepper: MatStepper;
  addNodeDialogRef: MatDialogRef<AddNodeDialogComponent>;

  shownAddNodeDialog;
  name:string;
  flowchart;
  suggestions;
  currentNodeDetails;
  data;
  isLoading=false;
  showBlocker=false;
  actionbarHint="";
  FOSContainerVisibility=false;
  actionBtnVisibility={
    node:true,
    edge:true,
    back:false,
    delete:false,
    view:false,
    edit:false
  }
  selectedNodes=[];
  selectedEdges=[];
  network;
  searchCategories = [
    {value: 'all', viewValue: 'All'},
    {value: 'enhancers', viewValue: 'Enhancers'},
    {value: 'constraints', viewValue: 'Constraints'},
    {value: 'incentives', viewValue: 'Incentive'},
    {value: 'mbg', viewValue: 'MBG'}
  ];

  dayOfWeek = [
    {value: 1, viewValue: 'Monday'},
    {value: 2, viewValue: 'Tuesday'},
    {value: 3, viewValue: 'Wednesday'},
    {value: 4, viewValue: 'Thursday'},
    {value: 5, viewValue: 'Friday'},
    {value: 6, viewValue: 'Saturday'},
    {value: 7, viewValue: 'Sunday'}
  ];

  fuelType=[
    {value: 1, viewValue: 'Petrol'},
    {value: 2, viewValue: 'Diesel'},
    {value: 3, viewValue: 'CNG'},
  ]

  frequencyTypes=[
    {value: 1, viewValue: 'Daily'},
    {value: 2, viewValue: 'Weekly'},
    {value: 3, viewValue: 'Monthly'},
  ]

  carCategory=[
    {value: 1, viewValue: 'Micro'},
    {value: 2, viewValue: 'Mini'},
    {value: 3, viewValue: 'Sedan'},
    {value: 4, viewValue: 'Prime'},
    {value: 5, viewValue: 'SUV'}
  ]

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  selectedStep:CdkStep;

  selectedCategory:MatOption;
  selectedDayOfWeek:MatOption;
  selectedFuelType:MatOption;
  selectedCarCategory:MatOption;
  selectedFrequencyType:MatOption;
  routeParamsSub: Subscription;

  constructor(private boardActions:BoardActions,private fosActions:FosActions,private redux:NgRedux<any>,private element: ElementRef,private dialog: MatDialog,private activatedRoute:ActivatedRoute,private router:Router,private appActions:AppActions,private _formBuilder: FormBuilder) {
    this.name = 'Angular2'
    this.routeParamsSub = this.activatedRoute.queryParams.subscribe(res => {
      if (!res.schemeId) {
         this.redux.dispatch(this.boardActions.setFlowchart(fromJS({nodes:[],edges:[]})));
      } else {
        this.redux.dispatch(this.boardActions.getFlowchart(this.initilizeFlowchart.bind(this)));
      }
    });
   }

  ngOnInit() {
    this.flowchart$.subscribe((res:any) => {
      if(res.size){
        this.flowchart=res;
        this.initilizeFlowchart()
      }
    });
    this.suggestions$.subscribe((res:any) => {
      if(res.size){
        this.suggestions=res;
      }
    });
    this.currentNodeDetails$.subscribe((res:any) => {
      if(res.size){
        this.currentNodeDetails=res;
      }
    });

    this.firstFormGroup = this._formBuilder.group({
      schemeName: [''],
      validFrom: [''],
      validTo: [''],
      frequencyTypes: [''],
      dow: [''],
      schemeEnabled: ['']
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['']
    });
    this.thirdFormGroup = this._formBuilder.group({
      file: ['', Validators.required],
      economy: ['', Validators.required],
      fuelType: ['', Validators.required],
      carCategory: ['', Validators.required],
    });
  }

  search(event){
      this.redux.dispatch(this.boardActions.getSuggestions((this.selectedCategory?this.selectedCategory : 'all'),event.target.value));
  }

  initilizeFlowchart(){
    console.log(this.flowchart.size);

    // provide the data in the vis format
    
    let data = {
      nodes: new vis.DataSet(this.flowchart.get('nodes').toJS()),
      edges: new vis.DataSet(this.flowchart.get('edges').toJS())
    };
    
    var options = {
      width:'100%',
      height:'100%',
      physics:{
        enabled:false
      },
      edges:{
        color:{
          color:"#000000",
          hover:"#D6Df22",
          highlight:"#D6Df22",
        },
        smooth: true
      },
      nodes:{
        shape:"box",
        font:{
          color:"#ffffff",
          face:"Roboto"
        },
        color:{
          border:"#ffffff",
          highlight:"#000000"
        },
        shapeProperties:{
          borderRadius:0
        }
      },
      groups: {
        enhancer: {color:{background:'#009688',color:'#ffffff'}, borderWidth:1},
        constraint: {color:{background:'#607D8B',color:'#ffffff'}, borderWidth:1},
        incentive: {color:{background:'#FFC107',color:'#ffffff'}, borderWidth:1},
        mbg: {color:{background:'#00BCD4',color:'#ffffff'}, borderWidth:1}
      },
      manipulation:{
        enabled:false,
        addEdge: (data, onAddingEdge)=> {
          console.log(data);
          data.id=Math.random();
          if (data.from == data.to) {
              var r = confirm("Do you want to connect the node to itself?");
              if (r === true) {
                this.onAddingEdge(data);
              }
          }
          else {
            this.onAddingEdge(data);
          }
        }
      }
    };


    console.log(data);

    // initialize your network!
    setTimeout(()=>{
      let container = document.getElementById('workflow-area');
      this.network = new vis.Network(container, data, options);
      this.network.on("selectNode", (params)=> {
          this.selectedNodes=params.nodes;
          this.redux.dispatch(this.boardActions.getCurrentNodeDetails(this.selectedNodes[0]));
          this.redux.dispatch(this.fosActions.getFlowchart());
          setTimeout(()=>{
            this.actionButtonStates(true,true,false,true,true,true)
          },100);
      });
      this.network.on("selectEdge", (params)=> {
        this.selectedEdges=params.edges;
        this.actionButtonStates(true,true,false,true,false,false)
      });
      this.network.on("deselectNode", (params)=> {
        this.selectedNodes=params.nodes;
        this.actionButtonStates(true,true,false,false,false,false)
      });
      this.network.on("deselectEdge", (params)=> {
        this.selectedEdges=params.edges;
        this.actionButtonStates(true,true,false,false,false,false)
      });
      var moveOption={scale:1.4,animation: {
        duration: 1000,
        easingFunction: "easeInOutQuint"
      } }
      this.network.moveTo(moveOption);
    })
    
  }

  showNodeDetailsDialog() {
    this.addNodeDialogRef = this.dialog.open(AddNodeDialogComponent,{
      width: '400px',
      data: this.currentNodeDetails.toJS()
    });
    const addNodeDialogSubscription = this.addNodeDialogRef.componentInstance.output.subscribe((data) => {
      // switch (data.action) {
      //   case 'CLOSE':
      //   this.actionButtonStates(true,true,false,false);
      //   default:
      //     break;
      // }  
    });
    this.actionButtonStates(false,true,false,false,true,true);
  }

  addNode(id,category){
    this.redux.dispatch(this.boardActions.addNode(id,category));
    this.showBlocker=true;
  }

  deleteSelected(){
    this.redux.dispatch(this.boardActions.deleteSelected({nodes:this.selectedNodes,edges:this.selectedEdges}));
    this.showBlocker=true;
  }

  addEdge(){
    this.network.addEdgeMode();
    this.actionbarHint="Click on a node and drag the edge to another node to connect them."
    this.actionButtonStates(false,false,true,false,false,false);
  }

  onAddingEdge(data){
    this.redux.dispatch(this.boardActions.addEdge(data,this.resetHint.bind(this)));
    this.showBlocker=true;
  }

  resetHint(){
    this.actionbarHint="";
    this.actionButtonStates(true,true,false,false,false,false);
  }

  actionButtonStates(addButton,addEdge,backButton,deleteButton,viewButton,editButton){
    this.actionBtnVisibility.node=addButton;
    this.actionBtnVisibility.edge=addEdge;
    this.actionBtnVisibility.back=backButton;
    this.actionBtnVisibility.delete=deleteButton; 
    this.actionBtnVisibility.view=viewButton; 
    this.actionBtnVisibility.edit=editButton;
  }

  back(){
    this.network.disableEditMode();
    this.actionButtonStates(true,true,false,false,false,false);
    this.resetHint();
  }

  onCategoryChange(event){
    this.redux.dispatch(this.boardActions.setSuggestions(fromJS([])));
  }

  suggestionSelected(option){

    if(this.flowchart && this.flowchart.size && this.flowchart.get('nodes').size){
      let index=this.flowchart.get('nodes').findIndex(m => {
        if(m.get('id')==option.get('id'))
          return true;
      });
      if(index!==-1){
        this.appActions.showDangerToast('Error! Node already exists!!');
        return;
      }

    }
    this.addNode(option.get('id'),option.get('group'));
    
  }
  nextStep(stepper){
    if(stepper.selectedIndex==2){
      this.appActions.showSuccessToast('Scheme saved!! redirecting..');
      setTimeout(()=>{
        this.router.navigate(['/']);
      },2000)
    }
    else{
      stepper.next();
    }
  }
  previousStep(stepper){
    stepper.previous();
  }

  showFOSContainer(){
    this.FOSContainerVisibility=true;
    this.actionButtonStates(false,false,false,false,false,false)
  }

  handleFOSOutput(event){
    if(!event.visible){
      this.FOSContainerVisibility=false;
      this.initilizeFlowchart();
      this.actionButtonStates(true,true,false,false,false,false);
    }
  }

  reloadFrame(){
    this.showBlocker=false;
    let iframe=document.getElementById('schemePreviewFrame');
    iframe.parentNode.replaceChild(iframe.cloneNode(), iframe);
  }


}