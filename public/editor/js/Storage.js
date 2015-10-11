/**
 * @author mrdoob / http://mrdoob.com/
 */

var Storage = function () {

	var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

	if ( indexedDB === undefined  ) {
		console.warn( 'Storage: IndexedDB not available.' );
		return { init: function () {}, get: function () {}, set: function () {}, clear: function () {} };
	}

	var name = 'threejs-editor';
	var version = 1;

	var database;

	return {

		init: function ( callback ) {

			var request = indexedDB.open( name, version );
			request.onupgradeneeded = function ( event ) {

				var db = event.target.result;

				if ( db.objectStoreNames.contains( 'states' ) === false ) {

					db.createObjectStore( 'states' );

				}

			};
			request.onsuccess = function ( event ) {

				database = event.target.result;

				callback();

			};
			request.onerror = function ( event ) {

				console.error( 'IndexedDB', event );

			};


		},

		get: function ( callback ) {

            // Meteor
            var compositeResult;
            var sceneResult = Scenes.findOne(); // TODO Fixme for more than one.

            if (sceneResult) {
                console.log( '[' + /\d\d\:\d\d\:\d\d/.exec( new Date() )[ 0 ] + ']', 'Got state from minimongo. ' + sceneResult.data);
	            compositeResult = JSON.parse(sceneResult.data);    
            } 

            // IndexDB
			var transaction = database.transaction( [ 'states' ], 'readwrite' );
			var objectStore = transaction.objectStore( 'states' );
			var request = objectStore.get( 0 );
			request.onsuccess = function ( event ) {
                compositeResult.camera = event.target.result;
				callback( compositeResult );
			};
			request.onerror = function ( event ) {
                if (compositeResult) {
				  callback( compositeResult );
                }               // Hmm, I guess we rely on the timeout b/c no callback if starting from scratch.
			};

		},

		set: function ( data, callback ) {

			var start = performance.now();

            var cameraData = data.camera;
            delete data.camera;

            // Meteor
            var result = Scenes.upsert({"_id": "MASTER"}, {"data": JSON.stringify(data)});

            if (result.numberAffected == 1) {
		        console.log( '[' + /\d\d\:\d\d\:\d\d/.exec( new Date() )[ 0 ] + ']', 'Saved state to minimongo. ' + ( performance.now() - start ).toFixed( 2 ) + 'ms' );
            } else {
                console.log( '[' + /\d\d\:\d\d\:\d\d/.exec( new Date() )[ 0 ] + ']', 'Failed to save to minimongo. ' + ( performance.now() - start ).toFixed( 2 ) + 'ms' );
	        }
            
            data.camera = cameraData; // Put it back just in case. TODO check this.

            // IndexDB
			var transaction = database.transaction( [ 'states' ], 'readwrite' );
			var objectStore = transaction.objectStore( 'states' );
			var request = objectStore.put( cameraData, 0 );
			request.onsuccess = function ( event ) {

				console.log( '[' + /\d\d\:\d\d\:\d\d/.exec( new Date() )[ 0 ] + ']', 'Saved camera to IndexedDB. ' + ( performance.now() - start ).toFixed( 2 ) + 'ms' );

			};

		},

		clear: function ( callback ) {

            // Meteor
            var result = Scenes.remove ({"_id": "MASTER"});

            if (result == 1) {
                console.log( 'Deleted MASTER' );
            }

			var transaction = database.transaction( [ 'states' ], 'readwrite' );
			var objectStore = transaction.objectStore( 'states' );
			var request = objectStore.clear();
			request.onsuccess = function ( event ) {

				callback();

			};

		}

	}

};
