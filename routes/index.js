
const { fork } = require('child_process');
const winston  = require( 'winston' );

const express = require('express');
const router  = express.Router();

var child   = fork( 'child.js' );

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Octobrood' });
});

var isRunning = false;

/* child routes */
router.get( '/child/status', function( req, res, next ) {

	var status = isRunning ? 'running' : 'stopped';
	res.status( 200 ).send( status );

});


router.post( '/child/start', function( req, res, next ) {

	child.send('start');
	isRunning = true;
	res.status( 200 ).send( 'started' );

	winston.loggers.get('main').info( 'Starting child' );
});


router.post( '/child/stop', function( req, res, next ) {

	child.kill( 'SIGTERM' );
	//child.send( 'stop' );
	isRunning = false;
	res.status( 200 ).send( 'stopped' );
	winston.loggers.get('main').info( 'Stopping child' );

	// Tee it up for the next start
	//child   = fork( 'child.js' );
});




module.exports = router;
