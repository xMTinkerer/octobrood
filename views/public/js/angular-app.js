var octobrood = angular.module( 'octobrood', [ "ngMessages" ] );


octobrood.controller( 'octoController', function( $scope, $http, $timeout, $interval ){

	
    checkChild = () => {
    	$http.get( '/child/status' ).then( resp => {
    		// Set state of child-toggle
    		//console.log( 'Child: ' + resp.data );

    		//console.log( 'Toggle: ' + JSON.stringify( $scope.child.childToggle ) );

    		//toggleSwitch( resp.data == 'stopped' ? 'off' : 'on' );

    		$('#childToggle').bootstrapToggle( resp.data == 'stopped' ? 'off' : 'on' )

    	},
    	err => {
    		console.log( "Error getting child status: " + err );
    	});
    };



    $scope.doToggleChild = () => {
    	//console.log( 'Checked? ' + $('#childToggle').prop('checked');

    	if( !$('#childToggle').prop('checked') ) {
    		console.log( 'Starting! ' );
    		$http.post( '/child/start', {} ).then( resp => { });
    	}
    	else {
    		console.log( 'Stopping!' );
    		$http.post( '/child/stop', {} ).then( resp => {	});
    	}
    };

	$interval( () => { 
       checkChild();
	}, 3000 )

});
