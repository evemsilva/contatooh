var http = require('http');
var app = require('./config/express')();
var config = require('./config/config')();

require('./config/passport')();
require('./config/database.js')(config.db);

http.createServer(app).listen(config.port, config.address,
	function () {
		console.log('Express Https Server ' +config.address +' (' + config.env + ') escutando na porta ' + config.port);
	});

// CLIENT ID: 71ae4c088dee5fe148a2
// CLIENT SECRET: e554c6f2352a181cc2ff78b76f3f4dafae209425