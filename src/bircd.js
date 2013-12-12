var net = require('net');

    var BIRCDServer = function(options, connectionListener) {
        var connectionListenerWrapper = function(c) {
            
            // Preamble
            var clientId = c.remoteAddress + ':' + c.remotePort;
              console.log(clientId + ' connected.');
              c.setTimeout(30000, function() {
                 console.log(clientId + ' timed out.');
              });
              c.setKeepAlive(true, 0);
              c.on('end', function() {
                console.log(clientId + ' disconnected.');
              });
              c.on('data', function(buffer) {
                 console.log(buffer);
              });
              
            // IRC Logic
              
              c.write('hello\r\n');
              c.pipe(c);

            // New connection
            if (connectionListener && 'function' == typeof(connectionListener))
            {
                connectionListener(this);
            }
        };
        
        var server = net.createServer(options, connectionListenerWrapper);
        server.on('error', function (e) {
          if (e.code == 'EADDRINUSE') {
            console.log('Address in use, retrying...');
            setTimeout(function () {
              server.close();
              // Do PORT and HOST need setting or are they some clever global variables?
              server.listen(this.port, this.address);
            }, 1000);
          }
        });
        
        this.server = server;
    };
    
    BIRCDServer.prototype.listen = function (port, address) {
        var self = this;
        self.port = port;
        self.address = address;
        self.server.listen(port, address, function() {
            self.port = this.address().port;
            self.address = this.address().address;
            console.log('bIRCd instance successfully bound to ' + self.address + ':' + self.port)
        })
    }

exports.createServer = function(options, connectionListener)
{
    return new BIRCDServer(options, connectionListener);
}