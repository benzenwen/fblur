Template.Cubes.created = function () {
  App.cubes = {};

  App.cubes.render = function () {
    requestAnimationFrame( App.cubes.render );

    App.cubes.collection.forEach(function (cube) {
      cube.rotation.x += Math.random()*0.1;
      cube.rotation.y += Math.random()*0.1;
    });

    App.cubes.renderer.render(App.cubes.scene, App.cubes.camera);
  };
};

Template.Cubes.rendered = function () {
  this.autorun(function (c) {
    if (c.firstRun) {
      App.cubes.scene = new THREE.Scene();
      App.cubes.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.25, 1000 );
      App.cubes.renderer = new THREE.WebGLRenderer();
      App.cubes.renderer.setSize( window.innerWidth, window.innerHeight );

      // Set camera distance
      App.cubes.camera.position.z = 5;

      $('#canvas-container').append(App.cubes.renderer.domElement);
    }

    App.cubes.collection = [];

    Cubes.find().forEach(function (cubeDoc) {
      var geo = new THREE.BoxGeometry(cubeDoc.geometry[0], cubeDoc.geometry[1], cubeDoc.geometry[2]);
      var material = new THREE.MeshBasicMaterial(cubeDoc.meshOptions);
      var cube = new THREE.Mesh(geo, material);
      // Add to scene
      App.cubes.scene.add(cube);
      // Save to cubes
      App.cubes.collection.push(cube);
    });

    if (c.firstRun) {
      App.cubes.render();
    }
  });
};

Template.Cubes.destroyed = function () {
};
