const http = require('http');
const { fork } = require('child_process');

const server = http.createServer();
const compute = fork( 'child.js' );


server.on('request', (req, res) => {
  if (req.url === '/start') {

    compute.send('start');
    res.end( 'started' );
  } 
  else if( req.url === '/stop' ) {
    compute.kill();
    res.end( 'stopped' );
  }
  else {
    res.end('Ok')
  }
});

server.listen(3000);
