var bircd = require('./build/bircd.js');
var ircServer = bircd.createServer();

var port = process.env.PORT;
console.log(process.env.IP);
console.log(port);
ircServer.listen(16555);