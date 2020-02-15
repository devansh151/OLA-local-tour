
var express = require('express');
var path = require('path');

var app = express();

app.use('/status', function (req, res) {
	res.json({
		status: "alive and kicking"
	});
});

app.get("/getMessage", function(req, response) {
    console.log('********');
    response.status(200);
    response.send({message:'hello there! welcome....'});
});

app.listen(4203);

module.exports = app;