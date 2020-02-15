// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const graphNodes=require('./templates/graph-nodes');
const fs = require('fs');

// Get our API routes
const api = require('./routes/api');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, '../dist')));

// Set our api routes
//app.use('/api/*', api);

app.get('/api/getFlowchart', (req, response) => {
  let body={
    schemeId:100,
    nodes:[
      {id: "1", group:'enhancers',name:'Devansh',"graph" : {
                "nodes": [
                  { "id": "f1", "label": "Filter1" },
                  { "id": "f2", "label": "Filter2" },
                  { "id": "o1", "label": "operator1" }                                    
                ],
                "edges": [
                  { "id": "e1", "from": "f1", "to": "o1" },
                  { "id": "e2", "from": "f2", "to": "o1" }                
                ]
              }},
      {id: "2", group:'enhancers',name:'Outstation',"graph" : {
                "nodes": [
                  { "id": "f1", "label": "Filter1" },
                  { "id": "f2", "label": "Filter2" },
                  { "id": "o1", "label": "operator1" }                                    
                ],
                "edges": [
                  { "id": "e1", "from": "f1", "to": "o1" },
                  { "id": "e2", "from": "f2", "to": "o1" }                
                ]
              }},
      {id: "3", group:'constraints',name:'Daily rides',"graph" : {
                "nodes": [
                  { "id": "f1", "label": "Filter1" },
                  { "id": "f2", "label": "Filter2" },
                  { "id": "o1", "label": "operator1" }                                    
                ],
                "edges": [
                  { "id": "e1", "from": "f1", "to": "o1" },
                  { "id": "e2", "from": "f2", "to": "o1" }                
                ]
              }},
      {id: "4", group:'constraints',name:'Super automobile',"graph" : {
                "nodes": [
                  { "id": "f1", "label": "Filter1" },
                  { "id": "f2", "label": "Filter2" },
                  { "id": "o1", "label": "operator1" }                                    
                ],
                "edges": [
                  { "id": "e1", "from": "f1", "to": "o1" },
                  { "id": "e2", "from": "f2", "to": "o1" }                
                ]
              }},
      {id: "5", group:'incentives',name:'Too good incentive',"graph" : {
                "nodes": [
                  { "id": "f1", "label": "Filter1" },
                  { "id": "f2", "label": "Filter2" },
                  { "id": "o1", "label": "operator1" }                                    
                ],
                "edges": [
                  { "id": "e1", "from": "f1", "to": "o1" },
                  { "id": "e2", "from": "f2", "to": "o1" }                
                ]
              }},
      {id: "6", group:'mbg',name:'Minumum guarantee scheme',"graph" : {
                "nodes": [
                  { "id": "f1", "label": "Filter1" },
                  { "id": "f2", "label": "Filter2" },
                  { "id": "o1", "label": "operator1" }                                    
                ],
                "edges": [
                  { "id": "e1", "from": "f1", "to": "o1" },
                  { "id": "e2", "from": "f2", "to": "o1" }                
                ]
              }}
    ],
    edges:[
      {id:"45",from: 1, to: 3},
      {id:"8987",from: 1, to: 2},
      {id:"7998",from: 1, to: 4},
      {id:"890",from: 1, to: 5},
      {id:"34",from: 2, to: 6}
    ]
  }

  body.nodes.forEach((node,index)=>{
    let obj=new graphNodes(node);
    body.nodes[index].image=obj.nodeBody.html;
    body.nodes[index].shape='image';
  });

  setTimeout(()=>{
    response.setHeader("Content-Type", 'application/json');
    response.status(200);
    response.send(body);
  }, 4000)
  
});

app.get('/api/getFOSFlowchart', (req, response) => {
  let body={
    nodes:[
      {id: "filter1", group:"filters",name:"Devansh",type:"ADD",attribute:"priority_tagging",defaultValue:"to_bodhgaya_1",graph : {
                nodes: [
                  { id: "fx1", label: "Filter1" },
                  { id: "fx2", label: "Filter2" },
                  { id: "ox1", label: "operator1" }                                    
                ],
                edges: [
                  { id: "ex1", from: "fx1", to: "ox1" },
                  { id: "ex2", from: "fx2", to: "ox1" }                
                ]
              }
      },
      {id: "operator2", group:"operators",name:"Outstation",type:"Add",attribute:"Incentive",aggregation:"Per unit",graph : {
                nodes: [
                  { id: "fx1", label: "Filter1" },
                  { id: "fx2", label: "Filter2" },
                  { id: "ox1", label: "operator1" }                                    
                ],
                edges: [
                  { id: "ex1", from: "fx1", to: "ox1" },
                  { id: "ex2", from: "fx2", to: "ox1" }                
                ]
              }},
      {id: "switch3", group:"switch",name:"Daily rides",type:"==",attribute:"operator_turnover",aggregation:"Sum",graph : {
                nodes: [
                  { id: "fx1", label: "Filter1" },
                  { id: "fx2", label: "Filter2" },
                  { id: "ox1", label: "operator1" }                                    
                ],
                edges: [
                  { id: "ex1", from: "fx1", to: "ox1" },
                  { id: "ex2", from: "fx2", to: "ox1" }                
                ]
              }},
      {id: "condition4", group:"conditions",name:"Super automobile",type:"OR",graph : {
                nodes: [
                  { id: "fx1", label: "Filter1" },
                  { id: "fx2", label: "Filter2" },
                  { id: "ox1", label: "operator1" }                                    
                ],
                edges: [
                  { id: "ex1", from: "fx1", to: "ox1" },
                  { id: "ex2", from: "fx2", to: "ox1" }                
                ]
              }},
      {id: "merger5", group:"mergers",name:"Too good incentive",type:"override",graph : {
                nodes: [
                  { id: "fx1", label: "Filter1" },
                  { id: "fx2", label: "Filter2" },
                  { id: "ox1", label: "operator1" }                                    
                ],
                edges: [
                  { id: "ex1", from: "fx1", to: "ox1" },
                  { id: "ex2", from: "fx2", to: "ox1" }                
                ]
              }},
      {id: "latch6", group:'latch',name:'Minumum guarantee scheme',defaultValue:"4",graph : {
                nodes: [
                  { id: "fx1", label: "Filter1" },
                  { id: "fx2", label: "Filter2" },
                  { id: "ox1", label: "operator1" }                                    
                ],
                edges: [
                  { id: "ex1", from: "fx1", to: "ox1" },
                  { id: "ex2", from: "fx2", to: "ox1" }                
                ]
              }}
    ],
    edges:[
      {id:"8987",from:"operator2" , to: "latch6"},
      {id:"7998",from: "operator2", to: "merger5"},
      {id:"890",from: "operator2", to: "condition4"},
      {id:"34",from: "operator2", to: "switch3"}
    ]
  }

  body.nodes.forEach((node,index)=>{
    let obj=new graphNodes(node);
    body.nodes[index].image=obj.nodeBody.html;
    body.nodes[index].shape='image';
  });

  setTimeout(()=>{
    response.setHeader("Content-Type", 'application/json');
    response.status(200);
    response.send(body);
  }, 4000)
  
});


app.get('/api/search', (req, response) => {
  let category = req.query.category;
  let searchKey = req.query.searchKey;
  let body = [];
  var contents = fs.readFileSync('./data/data.json');
  var jsonContent = JSON.parse(contents);
  if(category=='all'){
    let categories = Object.keys(jsonContent);
    let result = categories.map(cat => findInCategory(jsonContent,cat,searchKey));
    body = [].concat.apply([], result);
  } else {
    body = findInCategory(jsonContent,category,searchKey)
  }
  console.log(body);
  response.setHeader("Content-Type", 'application/json');
  response.status(200);
  response.send(body);

})

app.get('/api/get', (req, response) => {

  let id = req.query.id;
  let category = req.query.category;

  var contents = fs.readFileSync('./data/data.json');
  var jsonContent = JSON.parse(contents);

  jsonContent[category].forEach(element => {
    if (element.id == id) {
      let nodes = [];
      let edges = [];
      let obj=new graphNodes(element);
      element.image=obj.nodeBody.html;
      element.shape='image';

      // let body = {
      //   nodes: nodes,
      //   edges: edges
      // }

      response.setHeader("Content-Type", 'application/json');
      response.status(200);
      response.send(element);
    }
  })


})

app.get('/api/getCitySchemes', (req, response) => {

  let body = [
    { id: 100, name: 'Scheme 1', validFrom: new Date(), ValidTo: new Date(), enabled: true },
    { id: 2783, name: 'Scheme 2', validFrom: new Date(), ValidTo: new Date(), enabled: false },
    { id: 3237, name: 'Scheme 3', validFrom: new Date(), ValidTo: new Date(), enabled: true},
    { id: 467, name: 'Scheme 4', validFrom: new Date(), ValidTo: new Date(), enabled: false },
    { id: 598796, name: 'Scheme 5', validFrom: new Date(), ValidTo: new Date(), enabled: false},
    { id: 6876, name: 'Scheme 6', validFrom: new Date(), ValidTo: new Date(), enabled: true },
    { id: 7312, name: 'Scheme 7', validFrom: new Date(), ValidTo: new Date(), enabled: true },
    { id: 80816, name: 'Scheme 8', validFrom: new Date(), ValidTo: new Date(), enabled: true },
    { id: 957, name: 'Scheme 9', validFrom: new Date(), ValidTo: new Date(), enabled: false },
    { id: 1087235, name: 'Scheme 10', validFrom: new Date(), ValidTo: new Date(), enabled: true }
  ];
  setTimeout(() => {
    response.setHeader("Content-Type", 'application/json');
    response.status(200);
    response.send(body);
  }, 4000)


});

app.put('/api/addEdge',(req,response) => {
  let body={status:true};
  response.setHeader("Content-Type", 'application/json');
  response.status(200);
  response.send(body);
});

app.delete('/api/deleteSelected',(req,response) => {
  let body={status:true};
  response.setHeader("Content-Type", 'application/json');
  response.status(200);
  response.send(body);
});


// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '4203';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

function findKey(body, label) {
  let index = body.findIndex((item) => {
    if (item.name === label)
      return true;
    return false;
  });
  return body[index].id;
}

function findInCategory(jsonContent,category,searchKey) {
  console.log(category);
  let body = [];
  jsonContent[category].forEach(element => {
    if(element.name.indexOf(searchKey)>=0 || element.description.indexOf(searchKey)>=0){
      let e = {
        id : element.id,
        name : element.name,
        group : category
      }
      body.push(e)
    }
  })
  return body;
}
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));