import { Component, OnInit,Output,EventEmitter, Input } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { AppActions } from "../../app/shared/app.actions";
import { FosActions } from "../shared/fos.actions";
import { MatOption} from '@angular/material';
import { List, Map, fromJS } from 'immutable';
import { MatButton,MatCard,MatChip,MatDialog, MatDialogRef,MatIcon } from "@angular/material";
import { EditFosNodeDialogComponent } from "../shared/components/edit-fos-node-dialog/edit-fos-node-dialog.component";

declare var vis: any;

@Component({
  selector: 'od-fos-main-container',
  templateUrl: './fos-main-container.component.pug',
  styleUrls: ['./fos-main-container.component.scss']
})
export class FosMainContainerComponent implements OnInit {
  @select(['fos', 'flowchart']) flowchart$: any;
  @select(['fos', 'isLoading']) isLoading$: any;
  @select(['fos', 'suggestions']) suggestions$: any;
  @select(['fos', 'currentNodeDetails']) currentNodeDetails$: any;

  @Input('node') set setNode(data){
    if(data && data.size){
      this.node=data;
    }
  }

  @Output() output: EventEmitter<any> = new EventEmitter();
  editFosNodeDialogRef: MatDialogRef<EditFosNodeDialogComponent>;


  flowchart;
  suggestions;
  currentNodeDetails;
  isLoading=false;
  actionbarHint="";
  node;
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
    {value: 'filters', viewValue: 'Filters'},
    {value: 'operators', viewValue: 'Operators'},
    {value: 'switch', viewValue: 'Switch'},
    {value: 'conditions', viewValue: 'Conditions'},
    {value: 'mergers', viewValue: 'Mergers'},
    {value: 'latch', viewValue: 'Latch'},
  ];

  selectedCategory:MatOption;
  constructor(private fosActions:FosActions,private redux:NgRedux<any>,private appActions:AppActions,private dialog: MatDialog) { }

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
  }

  search(event){
    this.redux.dispatch(this.fosActions.getSuggestions((this.selectedCategory?this.selectedCategory : 'all'),event.target.value));
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
      }
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
    let container = document.getElementById('fos-workflow-area');
    this.network = new vis.Network(container, data, options);
    this.network.on("selectNode", (params)=> {
        this.selectedNodes=params.nodes;
        this.redux.dispatch(this.fosActions.getCurrentNodeDetails(this.selectedNodes[0]));
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
    var moveOption={scale:2,animation: {
      duration: 1000,
      easingFunction: "easeInOutQuint"
    } }
    this.network.moveTo(moveOption);
  })
  
}

showFosNodeEditDialog() {
  this.editFosNodeDialogRef = this.dialog.open(EditFosNodeDialogComponent,{
    width:'400px',
    data:{type:this.currentNodeDetails.get('group'),name:this.currentNodeDetails.get('name')}
  });
  const editFosNodeDialogSubscription = this.editFosNodeDialogRef.componentInstance.output.subscribe((data) => {
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
  this.redux.dispatch(this.fosActions.addNode(id,category));
}

deleteSelected(){
  this.redux.dispatch(this.fosActions.deleteSelected({nodes:this.selectedNodes,edges:this.selectedEdges}));
}

addEdge(){
  this.network.addEdgeMode();
  this.actionbarHint="Click on a node and drag the edge to another node to connect them."
  this.actionButtonStates(false,false,true,false,false,false);
}

onAddingEdge(data){
  this.redux.dispatch(this.fosActions.addEdge(data,this.resetHint.bind(this)));
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
  this.redux.dispatch(this.fosActions.setSuggestions(fromJS([])));
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

gotoBoard(){
  this.output.emit({
    visible:false
  })
}

}
