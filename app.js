
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
const PORT = process.env.PORT || 4203;
app.listen(PORT);
console.log('server is running on port '+ PORT +' ....');

module.exports = app;