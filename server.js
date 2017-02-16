var http = require('http');
var app = require('./config/express')();
var config = require('./config/config')();

require('./config/passport')();
require('./config/database.js')(config.db);

http.createServer(app).listen(app.get('port'), function () {
	console.log('Express Server escutando na porta ' +
		app.get('port'));
});

// CLIENT ID: 71ae4c088dee5fe148a2
// CLIENT SECRET: e554c6f2352a181cc2ff78b76f3f4dafae209425
