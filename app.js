var bircd = require('./src/bircd.js');
var ircServer = bircd.createServer();
ircServer.listen(6667);