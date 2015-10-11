Template.NewCubeForm.events({
  'submit #new-cube': function (e, t) {
    e.preventDefault();

    var width = t.$('input[name="cube-geometry-width"]').val().trim() || 1;
    var height = t.$('input[name="cube-geometry-height"]').val().trim() || 1;
    var depth = t.$('input[name="cube-geometry-depth"]').val().trim() || 1;
    var color = t.$('input[name="cube-material-color"]').val().trim();
    var cubeObj = {
      geometry: [parseInt(width), parseInt(height), parseInt(depth)],
      meshOptions: {}
    };

    if (color) {
      if (color.length <= 7) {
        // ensure proper syntax
        if (color[0] === '#') {
          cubeObj.meshOptions.color = color;
        } else {
          cubeObj.meshOptions.color = '#' + color;
        }
      } else {
        // unknown input
        cubeObj.meshOptions.color = color;
      }
    } else {
      // default to example
      cubeObj.meshOptions.color = 0xff0000;
    }

    Cubes.insert(cubeObj, function (err, res) {
      if (err) {
        alert(err.reason);
      } else {
        console.log('Inserted cube: ' + res);

        $('input').each(function () {
          $(this).val('');
        });
      }
    });
  }
});

Template.NewCubeForm.helpers({
});

Template.NewCubeForm.created = function () {
};

Template.NewCubeForm.rendered = function () {
  var form = $('form#new-cube');

  // App.cubes.renderer.setSize(window.innerWidth, window.innerHeight - $(form).outerHeight());
};

Template.NewCubeForm.destroyed = function () {
};
