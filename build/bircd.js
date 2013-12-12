var net = require('net');

    var BIRCDServer = function(options, connectionListener) {
        var connectionListenerWrapper = function(c) {
        
              console.log('server connected');
              c.on('end', function() {
                console.log('server disconnected');
              });
              c.write('hello\r\n');
              c.pipe(c);

            // New connection
            if (connectionListener && 'function' == typeof(connectionListener))
            {
                connectionListener(this);
            }
        };
        
        this.server = net.createServer(options, connectionListenerWrapper);
    };
    
    BIRCDServer.prototype.listen = function (port, address) {
        this.server.listen(port, address)
    }

exports.createServer = function(options, connectionListener)
{
    return new BIRCDServer(options, connectionListener);
}