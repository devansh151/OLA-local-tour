import { Component, OnInit,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { SchemeListActions } from "./shared/scheme-list.actions";
import { List, Map, fromJS } from 'immutable';
import { NgRedux, select } from '@angular-redux/store';
import { Subject } from 'rxjs/Subject';
import { MatSelect, MatOption,MatChip, MatTable,MatPaginator,MatCard,MatIcon,MatRadioGroup } from '@angular/material';
import { trigger,style,transition,animate,keyframes,query,stagger,state } from '@angular/animations';
import { CdkTable } from '@angular/cdk/table';
import { DataSource } from '@angular/cdk/collections';
import { GMap } from './map';


declare var google: any;
declare var directionDisplay:any;
@Component({
  selector: 'scheme-list',
  templateUrl: './scheme-list.component.pug',
  styleUrls: ['./scheme-list.component.scss'],
  animations: [
    trigger('toggleState', [
      // What happens when toggleState is true
        state('true' , style({ height: '200px' })),
        // What happens when toggleState is false
        state('false', style({ height: '500px' })),
        // transition
        transition('void => *', animate('400ms ease-in-out')),
      ])

    // Animations here...

  ]
})
export class SchemeListComponent implements OnInit {

  cities = [
    {value: 0, viewValue: 'Mumbai',route:{
      science:{
        origin:[18.9268717,72.8304927],
        destination:[19.0466621,72.8756213],
        stops:[[18.978994,72.8326266],[18.9338816,72.8339075],[18.9907959,72.8166848]],
        iterinary:[{
          place:'CSV Museum',
          departure:'01:00 AM'
        },{
          place:'Dr.Bhau Museum',
          departure:'02:00 AM'
        },{
          place:'RBI Monetary Museum',
          departure:'03:00 AM'
        },{
          place:'Nehru Science Centre',
          departure:'04:00 AM'
        },{
          place:'B.E.S.T.Bus Museum',
          departure:'05:00 AM'
        }],
        meta:[
          {
            name:'Total Time',
            value:'10 Hrs'
          }
        ],
        rules:[
          "Please reach the first pickup point before time.",
          "Waiting time will be decided by the tour guide.",
          "Please follow the rules handed over by guide.",
          "Respect the cultural and environment of the place."
        ]
      },
      wildlife:{
        origin:[18.9787086,72.8330586],
        destination:[19.227261,72.8695601],
        stops:[[18.9766601,72.8353197],[18.9788319,72.835129]],
        iterinary:[{
          place:'Veermata Jijabai Bhosale Zoo',
          departure:'12:00 AM'
        },{
          place:'Humbolt Penguins',
          departure:'01:00 AM'
        },{
          place:'Penguin Center',
          departure:'02:00 AM'
        },{
          place:'Animal Cages',
          departure:'03:00 AM'
        }],
        meta:[
          {
            name:'Total Time',
            value:'10 Hrs'
          }
        ],
        rules:[
          "Please reach the first pickup point before time.",
          "Waiting time will be decided by the tour guide.",
          "Please follow the rules handed over by guide.",
          "Respect the cultural and environment of the place."
        ]
      },
      shopping:{
        origin:[19.0862817,72.8866136],
        destination:[19.1739448,72.8258623],
        stops:[[18.9948301,72.8233949],[19.099483,72.9145689],[19.173862,72.8586933]],
        iterinary:[{
          place:'Phoenix Marketcity',
          departure:'12:00 AM'
        },{
          place:'High Street Phoenix',
          departure:'01:00 AM'
        },{
          place:'R City Mall',
          departure:'02:00 AM'
        },{
          place:'Oberoi Mall',
          departure:'03:00 AM'
        },{
          place:'Infiniti Mall',
          departure:'04:00 AM'
        }],
        meta:[
          {
            name:'Total Time',
            value:'10 Hrs'
          }
        ],
        rules:[
          "Please reach the first pickup point before time.",
          "Waiting time will be decided by the tour guide.",
          "Please follow the rules handed over by guide.",
          "Respect the cultural and environment of the place."
        ]
      },
      mix:{
        origin:[18.9219892,72.8324656],
        destination:[19.2059387,72.871830],
        stops:[[19.1309747,72.8701276],[19.205856,72.9046617]],
        iterinary:[{
          place:'Gateway of India',
          departure:'12:00 AM'
        },{
          place:'Mahakali Caves',
          departure:'01:00 AM'
        },{
          place:'Kanheri Caves',
          departure:'02:00 AM'
        },{
          place:'Mumbai Filmcity',
          departure:'03:00 AM'
        }],
        meta:[
          {
            name:'Total Time',
            value:'10 Hrs'
          }
        ],
        rules:[
          "Please reach the first pickup point before time.",
          "Waiting time will be decided by the tour guide.",
          "Please follow the rules handed over by guide.",
          "Respect the cultural and environment of the place."
        ]
      }
    }},
    {value: 1, viewValue: 'Pune',route:{
      science:{
        origin:[13.010042, 77.551096],
        destination:[12.9090508,77.5297296],
        stops:[[12.9831165,77.5680701],[12.9729803,77.6295003],[12.9659222,77.5914794]],
        iterinary:[{
          place:'Bnaglore Palace',
          departure:'12:00 AM'
        },{
          place:'ISCKON Temple',
          departure:'01:00 AM'
        },{
          place:'Sankey Tank',
          departure:'02:00 AM'
        },{
          place:'Orion Mall',
          departure:'03:00 AM'
        },{
          place:'APJ Abdul Kalam Meuseum',
          departure:'04:00 AM'
        },{
          place:'HAL Meuseum',
          departure:'05:00 AM'
        }],
        meta:[
          {
            name:'Total Time',
            value:'10 Hrs'
          }
        ],
        rules:[
          "Please reach the first pickup point before time.",
          "Waiting time will be decided by the tour guide.",
          "Please follow the rules handed over by guide.",
          "Respect the cultural and environment of the place."
        ]
      },
      wildlife:{
        origin:[13.010042, 77.551096],
        destination:[12.9090508,77.5297296],
        stops:[[12.9831165,77.5680701],[12.9729803,77.6295003],[12.9659222,77.5914794]],
        iterinary:[{
          place:'Bnaglore Palace',
          departure:'12:00 AM'
        },{
          place:'ISCKON Temple',
          departure:'01:00 AM'
        },{
          place:'Sankey Tank',
          departure:'02:00 AM'
        },{
          place:'Orion Mall',
          departure:'03:00 AM'
        },{
          place:'APJ Abdul Kalam Meuseum',
          departure:'04:00 AM'
        },{
          place:'HAL Meuseum',
          departure:'05:00 AM'
        }],
        meta:[
          {
            name:'Total Time',
            value:'10 Hrs'
          }
        ],
        rules:[
          "Please reach the first pickup point before time.",
          "Waiting time will be decided by the tour guide.",
          "Please follow the rules handed over by guide.",
          "Respect the cultural and environment of the place."
        ]
      },
      shopping:{
        origin:[13.010042, 77.551096],
        destination:[12.9090508,77.5297296],
        stops:[[12.9831165,77.5680701],[12.9729803,77.6295003],[12.9659222,77.5914794]],
        iterinary:[{
          place:'Bnaglore Palace',
          departure:'12:00 AM'
        },{
          place:'ISCKON Temple',
          departure:'01:00 AM'
        },{
          place:'Sankey Tank',
          departure:'02:00 AM'
        },{
          place:'Orion Mall',
          departure:'03:00 AM'
        },{
          place:'APJ Abdul Kalam Meuseum',
          departure:'04:00 AM'
        },{
          place:'HAL Meuseum',
          departure:'05:00 AM'
        }],
        meta:[
          {
            name:'Total Time',
            value:'10 Hrs'
          }
        ],
        rules:[
          "Please reach the first pickup point before time.",
          "Waiting time will be decided by the tour guide.",
          "Please follow the rules handed over by guide.",
          "Respect the cultural and environment of the place."
        ]
      },
      mix:{
        origin:[13.010042, 77.551096],
        destination:[12.9090508,77.5297296],
        stops:[[12.9831165,77.5680701],[12.9729803,77.6295003],[12.9659222,77.5914794]],
        iterinary:[{
          place:'Bnaglore Palace',
          departure:'12:00 AM'
        },{
          place:'ISCKON Temple',
          departure:'01:00 AM'
        },{
          place:'Sankey Tank',
          departure:'02:00 AM'
        },{
          place:'Orion Mall',
          departure:'03:00 AM'
        },{
          place:'APJ Abdul Kalam Meuseum',
          departure:'04:00 AM'
        },{
          place:'HAL Meuseum',
          departure:'05:00 AM'
        }],
        meta:[
          {
            name:'Total Time',
            value:'10 Hrs'
          }
        ],
        rules:[
          "Please reach the first pickup point before time.",
          "Waiting time will be decided by the tour guide.",
          "Please follow the rules handed over by guide.",
          "Respect the cultural and environment of the place."
        ]
      }
    }},
    {value: 2, viewValue: 'Indore',route:{
      science:{
        origin:[13.010042, 77.551096],
        destination:[12.9090508,77.5297296],
        stops:[[12.9831165,77.5680701],[12.9729803,77.6295003],[12.9659222,77.5914794]],
        iterinary:[{
          place:'Bnaglore Palace',
          departure:'12:00 AM'
        },{
          place:'ISCKON Temple',
          departure:'01:00 AM'
        },{
          place:'Sankey Tank',
          departure:'02:00 AM'
        },{
          place:'Orion Mall',
          departure:'03:00 AM'
        },{
          place:'APJ Abdul Kalam Meuseum',
          departure:'04:00 AM'
        },{
          place:'HAL Meuseum',
          departure:'05:00 AM'
        }],
        meta:[
          {
            name:'Total Time',
            value:'10 Hrs'
          }
        ],
        rules:[
          "Please reach the first pickup point before time.",
          "Waiting time will be decided by the tour guide.",
          "Please follow the rules handed over by guide.",
          "Respect the cultural and environment of the place."
        ]
      },
      wildlife:{
        origin:[13.010042, 77.551096],
        destination:[12.9090508,77.5297296],
        stops:[[12.9831165,77.5680701],[12.9729803,77.6295003],[12.9659222,77.5914794]],
        iterinary:[{
          place:'Bnaglore Palace',
          departure:'12:00 AM'
        },{
          place:'ISCKON Temple',
          departure:'01:00 AM'
        },{
          place:'Sankey Tank',
          departure:'02:00 AM'
        },{
          place:'Orion Mall',
          departure:'03:00 AM'
        },{
          place:'APJ Abdul Kalam Meuseum',
          departure:'04:00 AM'
        },{
          place:'HAL Meuseum',
          departure:'05:00 AM'
        }],
        meta:[
          {
            name:'Total Time',
            value:'10 Hrs'
          }
        ],
        rules:[
          "Please reach the first pickup point before time.",
          "Waiting time will be decided by the tour guide.",
          "Please follow the rules handed over by guide.",
          "Respect the cultural and environment of the place."
        ]
      },
      shopping:{
        origin:[13.010042, 77.551096],
        destination:[12.9090508,77.5297296],
        stops:[[12.9831165,77.5680701],[12.9729803,77.6295003],[12.9659222,77.5914794]],
        iterinary:[{
          place:'Bnaglore Palace',
          departure:'12:00 AM'
        },{
          place:'ISCKON Temple',
          departure:'01:00 AM'
        },{
          place:'Sankey Tank',
          departure:'02:00 AM'
        },{
          place:'Orion Mall',
          departure:'03:00 AM'
        },{
          place:'APJ Abdul Kalam Meuseum',
          departure:'04:00 AM'
        },{
          place:'HAL Meuseum',
          departure:'05:00 AM'
        }],
        meta:[
          {
            name:'Total Time',
            value:'10 Hrs'
          }
        ],
        rules:[
          "Please reach the first pickup point before time.",
          "Waiting time will be decided by the tour guide.",
          "Please follow the rules handed over by guide.",
          "Respect the cultural and environment of the place."
        ]
      },
      mix:{
        origin:[13.010042, 77.551096],
        destination:[12.9090508,77.5297296],
        stops:[[12.9831165,77.5680701],[12.9729803,77.6295003],[12.9659222,77.5914794]],
        iterinary:[{
          place:'Bnaglore Palace',
          departure:'12:00 AM'
        },{
          place:'ISCKON Temple',
          departure:'01:00 AM'
        },{
          place:'Sankey Tank',
          departure:'02:00 AM'
        },{
          place:'Orion Mall',
          departure:'03:00 AM'
        },{
          place:'APJ Abdul Kalam Meuseum',
          departure:'04:00 AM'
        },{
          place:'HAL Meuseum',
          departure:'05:00 AM'
        }],
        meta:[
          {
            name:'Total Time',
            value:'10 Hrs'
          }
        ],
        rules:[
          "Please reach the first pickup point before time.",
          "Waiting time will be decided by the tour guide.",
          "Please follow the rules handed over by guide.",
          "Respect the cultural and environment of the place."
        ]
      }
    }}
  ];

  selectedCity;
  schemeList=List([]);

  map;
  polyline;
  directionDisplay;
  showCategory=false;
  currentCategory="science";
  reviewBooking=false;
  currentIterinary;
  currentRules;
  currentMeta;
  currentCarCat;
  @select(['schemes', 'schemeList']) schemeList$: any;
  @select(['schemes', 'isLoading']) isLoading$: any;

  displayedColumns = ['id', 'name', 'segment', 'validFrom','validTo','cars'];

  constructor(private schemeListActions:SchemeListActions,private redux:NgRedux<any>,private router:Router) {
   }

  ngOnInit() {
    this.schemeList$.subscribe((res:any) => {
      if(res.size){
        this.schemeList=res;
      }
    });
  }

  ngAfterViewInit(){
    this.initMap();
  }

  cityChanged(event){
    this.showCategory=true;
    this.animatePath(this.cities[this.selectedCity].route[this.currentCategory])
    //this.redux.dispatch(this.schemeListActions.getCitySchemes(event.value));
  }

  selectCategory(cat){
    let index=this.selectedCity;
    this.currentCategory=cat;
    this.currentIterinary=this.cities[this.selectedCity].route[this.currentCategory].iterinary;
    this.currentRules=this.cities[this.selectedCity].route[this.currentCategory].rules;
    this.currentMeta=this.cities[this.selectedCity].route[this.currentCategory].meta;
    this.animatePath(this.cities[index].route[cat]);
  }

  navigateToBoard(schemeId?){
    if(schemeId){
      this.router.navigate(['board'],{ queryParams: { schemeId: schemeId } });
    }
    else
      this.router.navigate(['board']);
  }

  handleSchemeListOutput(event){
    switch (event.action) {
      case 'edit':
        this.navigateToBoard(event.data.id);
        break;
    
      default:
        break;
    }
  }

  initMap(){
    let mapElement = document.getElementById('map');
    GMap.loadGoogleMapsApi().then((googleMaps) => {
    this.map=GMap.createMap(googleMaps, mapElement);
    // this.map.setOptions({styles:[
    //   {elementType: 'geometry', stylers: [{color: '#efeef4'}]},
    //   {elementType: 'labels.text.stroke', stylers: [{color: '#ffffff'}]},
    //   {elementType: 'labels.text.fill', stylers: [{color: '#9d9bac'}]},
    //   {
    //     featureType: 'administrative.locality',
    //     elementType: 'labels.text.fill',
    //     stylers: [{color: '#9d9bac'}]
    //   },
    //   {
    //     featureType: 'poi',
    //     elementType: 'labels.text.fill',
    //     stylers: [{color: '#9d9bac'}]
    //   },
    //   {
    //     featureType: 'poi.park',
    //     elementType: 'geometry',
    //     stylers: [{color: '#beebe0'}]
    //   },
    //   {
    //     featureType: 'poi.park',
    //     elementType: 'labels.text.fill',
    //     stylers: [{color: '#9d9bac'}]
    //   },
    //   {
    //     featureType: 'road',
    //     elementType: 'geometry',
    //     stylers: [{color: '#fbfbfb'}]
    //   },
    //   {
    //     featureType: 'road',
    //     elementType: 'geometry.stroke',
    //     stylers: [{color: '#ffffff'}]
    //   },
    //   {
    //     featureType: 'road',
    //     elementType: 'labels.text.fill',
    //     stylers: [{color: '#9d9bac'}]
    //   },
    //   {
    //     featureType: 'road.highway',
    //     elementType: 'geometry',
    //     stylers: [{color: '#adb3c7'}]
    //   },
    //   {
    //     featureType: 'road.highway',
    //     elementType: 'geometry.stroke',
    //     stylers: [{color: '#ffffff'}]
    //   },
    //   {
    //     featureType: 'road.highway',
    //     elementType: 'labels.text.fill',
    //     stylers: [{color: '#9d9bac'}]
    //   },
    //   {
    //     featureType: 'transit',
    //     elementType: 'geometry',
    //     stylers: [{color: '#fbfbfb'}]
    //   },
    //   {
    //     featureType: 'transit.station',
    //     elementType: 'labels.text.fill',
    //     stylers: [{color: '#9d9bac'}]
    //   },
    //   {
    //     featureType: 'water',
    //     elementType: 'geometry',
    //     stylers: [{color: '#b0d4f2'}]
    //   },
    //   {
    //     featureType: 'water',
    //     elementType: 'labels.text.fill',
    //     stylers: [{color: '#b0d4f2'}]
    //   },
    //   {
    //     featureType: 'water',
    //     elementType: 'labels.text.stroke',
    //     stylers: [{color: '#b0d4f2'}]
    //   }
    // ]});

    this.cities.forEach((city) => {
      Object.keys(city.route).forEach((key)=>{
        let stops=[];
        city.route[key].stops.forEach((element) => {
          stops.push(new google.maps.LatLng(element[0],element[1]));
        });
        let route={
          origin:new google.maps.LatLng(city.route[key].origin[0],city.route[key].origin[1]),
          destination:new google.maps.LatLng(city.route[key].destination[0],city.route[key].destination[1]),
          stops:stops,
          iterinary:city.route[key].iterinary,
          meta:city.route[key].meta,
          rules:city.route[key].rules
        }
        city.route[key]=route;
      })
    });
    });
  }

  animatePath(route){
    let directionsService = new google.maps.DirectionsService();

    let renderOptions = { draggable: true,polylineOptions: {
      strokeColor: "black"
    }};

    //set the directions display service to the map
    if(this.directionDisplay != null) {
      this.directionDisplay.setMap(null);
      this.directionDisplay=null;
  }
    let items = route.stops;
    let waypoints = [];
    for (let i = 0; i < items.length; i++) {
        let address = items[i];
        if (address !== "") {
            waypoints.push({
                location: address,
                stopover: true
            });
        }
    }

    //set the starting address and destination address
    let originAddress = route.origin;
    let destinationAddress = route.destination;

    //build directions request
    let request = {
                origin: originAddress,
                destination: destinationAddress,
                waypoints: waypoints, //an array of waypoints
                optimizeWaypoints: true, //set to true if you want google to determine the shortest route or false to use the order specified.
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            };

    //get the route from the directions service
    directionsService.route(request,(response, status)=> {
        if (status == google.maps.DirectionsStatus.OK) {
            setTimeout(() => {
              this.directionDisplay = new google.maps.DirectionsRenderer(renderOptions);
              this.directionDisplay.setDirections(response);
              this.directionDisplay.setMap(this.map);
            },400);
        }
        else {
            //handle error
        }
    });
  }

  back(){
    this.showCategory=false;
    this.selectedCity=null;
    if(this.directionDisplay != null) {
      this.directionDisplay.setMap(null);
      this.directionDisplay=null;
    }
  }

  reviewTour(){
    this.reviewBooking=true;
  }

  backToCat(){
    this.reviewBooking=false;
    setTimeout(() => {
      this.initMap();
      this.animatePath(this.cities[this.selectedCity].route[this.currentCategory])
    },100);
  }
}