const express = require('express');
const router = express.Router();
var request = require('request');

var username='devansh151';
var password='123456';

/* GET api listing. */
router.get('/', (req, response) => {
  var options = {
    url: 'http://localhost:8080/rest/api/2/project',
    //url:'http://localhost:8080/rest/api/2/permissions',
    method: 'GET',
    //proxy:'http://stg-proxy-921134802.ap-southeast-1.elb.amazonaws.com:9999',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization':'Basic ' + new Buffer(username + ':' + password).toString("base64")
    },
    params:{
        os_authType:'basic'
    }
  }
  request.get(options, function(error, res, body) {
      if (!error) {
          console.log(body);
          response.setHeader("Content-Type", 'application/json');
          response.status(res.statusCode);
          response.send(body);
      } else {
          console.log(error)
          response.setHeader("Content-Type", 'application/json');
          response.status(500);
          response.send("Something went wrong");
      }
  });
});


module.exports = router;