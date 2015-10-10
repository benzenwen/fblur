if (Meteor.isClient) {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );

  // Set camera distance
  camera.position.z = 5;

  Meteor.startup(function () {
    document.body.appendChild( renderer.domElement );
    goCube();
    render();
  });
}
render = function () {
    requestAnimationFrame( render );
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
};


goCube = function () {
    geometry = new THREE.BoxGeometry( 1, 1, 1 );
    material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
    cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
};
