/**
 * @author benwen / http://benwen.com/
 * Meteor.js version
 */

var Storage = function () {

  return {

	init: function ( callback ) {
      // nothing to init with Meteor

      callback();

	},

	get: function ( callback ) {

      var result = Scenes.findOne(); // TODO Fixme for more than one.

      if (result) {
        console.log( '[' + /\d\d\:\d\d\:\d\d/.exec( new Date() )[ 0 ] + ']', 'Got state from minimongo. ' + result.data);
	    callback( JSON.parse(result.data) );    
      } else {
        callback ();
      }
	},

	set: function ( data, callback ) {

	  var start = performance.now();

      var result = Scenes.upsert({"_id": "MASTER"}, {"data": JSON.stringify(data)});

      if (result.numberAffected == 1) {
		console.log( '[' + /\d\d\:\d\d\:\d\d/.exec( new Date() )[ 0 ] + ']', 'Saved state to minimongo. ' + ( Performance.now() - start ).toFixed( 2 ) + 'ms' );
      } else {
        console.log( '[' + /\d\d\:\d\d\:\d\d/.exec( new Date() )[ 0 ] + ']', 'Failes to save to minimongo. ' + ( performance.now() - start ).toFixed( 2 ) + 'ms' );
	  }
	},

	clear: function ( callback ) {

      var result = Scenes.remove ({"_id": "MASTER"});

      if (result == 1) {
        console.log( 'Deleted MASTER' );
       }

	  callback();

	}

  }

};
