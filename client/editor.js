Meteor.subscribe("scenes", function () { dataReady() });

Template.Editor.created = function () {
    initEditor();
};


var dataGood = 0;
var initCalled = 0;

// Poor man's join.
function dataReady() {
  dataGood = 1;
  if (initCalled == 1) {
    // go
    initEditorReally();
  }
  return;
};

function initEditor() {
  initCalled = 1;
  if (dataGood == 1) {
    // go
    initEditorReally();
  }
  return;
};
    
  

// from three.js editor.html

function initEditorReally() {
  window.URL = window.URL || window.webkitURL;
  window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;

  Number.prototype.format = function (){
    return this.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  var editor = new Editor();

  var viewport = new Viewport( editor );
  document.body.appendChild( viewport.dom );

  var player = new Player( editor );
  document.body.appendChild( player.dom );

  var script = new Script( editor );
  document.body.appendChild( script.dom );

  var toolbar = new Toolbar( editor );
  document.body.appendChild( toolbar.dom );

  var menubar = new Menubar( editor );
  document.body.appendChild( menubar.dom );

  var sidebar = new Sidebar( editor );
  document.body.appendChild( sidebar.dom );

  /*
    var dialog = new UI.Dialog();
    document.body.appendChild( dialog.dom );
  */

  //

  editor.setTheme( editor.config.getKey( 'theme' ) );

  editor.storage.init( function () {
    Tracker.autorun( function () {
      editor.storage.get( function ( state ) {
        if ( state !== undefined ) {
	      editor.fromJSON( state );
        }
        var selected = editor.config.getKey( 'selected' );
        if ( selected !== undefined ) {
	      editor.selectByUuid( selected );
        }
      })
    });

    //
    var timeout;
    var saveState = function ( scene ) {
      if ( editor.config.getKey( 'autosave' ) === false ) {
	    return;
      }
      clearTimeout( timeout );
      timeout = setTimeout( function () {
	    editor.signals.savingStarted.dispatch();
	    timeout = setTimeout( function () {
	      editor.storage.set( editor.toJSON() );
	      editor.signals.savingFinished.dispatch();
	    }, 100 );
      }, 1000 );
    };

    var signals = editor.signals;

    signals.editorCleared.add( saveState );
    signals.geometryChanged.add( saveState );
    signals.objectAdded.add( saveState );
    signals.objectChanged.add( saveState );
    signals.objectRemoved.add( saveState );
    signals.materialChanged.add( saveState );
    signals.sceneGraphChanged.add( saveState );
    signals.scriptChanged.add( saveState );

    /*
    var showDialog = function ( content ) {
      dialog.clear();
      dialog.add( content );
      dialog.showModal();
    };
    signals.showDialog.add( showDialog );
    */
  });

  //
  document.addEventListener( 'dragover', function ( event ) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  }, false );

  document.addEventListener( 'drop', function ( event ) {
    event.preventDefault();
    if ( event.dataTransfer.files.length > 0 ) {
      editor.loader.loadFile( event.dataTransfer.files[ 0 ] );
    }
  }, false );

  document.addEventListener( 'keydown', function ( event ) {
    switch ( event.keyCode ) {
    case 8:
      event.preventDefault(); // prevent browser back
      var object = editor.selected;
      if ( confirm( 'Delete ' + object.name + '?' ) === false ) return;
      var parent = object.parent;
      editor.removeObject( object );
      editor.select( parent );
      break;
    }
  }, false );

  var onWindowResize = function ( event ) {
    editor.signals.windowResize.dispatch();
  };

  window.addEventListener( 'resize', onWindowResize, false );
  onWindowResize();

  //
  var file = null;
  var hash = window.location.hash;

  if ( hash.substr( 1, 4 ) === 'app=' ) file = hash.substr( 5 );
  if ( hash.substr( 1, 6 ) === 'scene=' ) file = hash.substr( 7 );

  if ( file !== null ) {
    if ( confirm( 'Any unsaved data will be lost. Are you sure?' ) ) {
      var loader = new THREE.XHRLoader();
      loader.crossOrigin = '';
      loader.load( file, function ( text ) {
	    var json = JSON.parse( text );
	    editor.clear();
	    editor.fromJSON( json );
      } );
    }
  }

  window.addEventListener( 'message', function ( event ) {
    editor.clear();
    editor.fromJSON( event.data );
  }, false );
}
