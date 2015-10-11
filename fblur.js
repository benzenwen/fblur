if (Meteor.isClient) {
  // scene = new THREE.Scene();
  // camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.25, 1000 );
  // renderer = new THREE.WebGLRenderer();
  // renderer.setSize( window.innerWidth, window.innerHeight );

  // // Set camera distance
  // camera.position.z = 5;

  // cubes = [];

  Meteor.startup(function () {
    // document.body.appendChild( renderer.domElement );

    // Tracker.autorun(function () {
    //   cubes = [];
    //   Cubes.find().forEach(function (cubeDoc) {
    //     var geo = new THREE.BoxGeometry(cubeDoc.geometry[0], cubeDoc.geometry[1], cubeDoc.geometry[2]);
    //     var material = new THREE.MeshBasicMaterial(cubeDoc.meshOptions);
    //     var cube = new THREE.Mesh(geo, material);
    //     // Add to scene
    //     scene.add(cube);
    //     // Save to cubes
    //     cubes.push(cube);
    //   });
    // });

    // render();
  });

  // render = function () {
  //     requestAnimationFrame( render );
  //     cubes.forEach(function (cube) {
  //       cube.rotation.x += Math.random()*0.1;
  //       cube.rotation.y += Math.random()*0.1;
  //     });

  //     renderer.render(scene, camera);
  // };


  // goCube = function () {
  //     geometry = new THREE.BoxGeometry( 1, 1, 1 );
  //     material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
  //     cube = new THREE.Mesh( geometry, material );
  //     scene.add( cube );
  // };
}

// Add seed data
Meteor.startup(function () {
  // if (Cubes.find().count() < 3) {
  //   Cubes.insert({
  //     geometry: [1,1,1],
  //     meshOptions: { color: 0xffffff }
  //   });
  //   Cubes.insert({
  //     geometry: [1,1,1],
  //     meshOptions: { color: 0xcccccc }
  //   });
  //   Cubes.insert({
  //     geometry: [1,1,1],
  //     meshOptions: { color: 0xfc0000 }
  //   });
  // }
});

Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.map(function () {
  this.route('cubes', {
    path: '/cubes'
  });

  this.route('editor', {
    path: '/'
  });
});