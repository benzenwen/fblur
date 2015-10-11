Template.NewCube.events({
  'submit #new-cube': function (e, t) {
    e.preventDefault();

    var width = t.$('input[name="cube-geometry-width"]').val().trim() || 1;
    var height = t.$('input[name="cube-geometry-height"]').val().trim() || 1;
    var depth = t.$('input[name="cube-geometry-depth"]').val().trim() || 1;
    var cubeObj = {
      geometry: [parseInt(width), parseInt(height), parseInt(depth)],
      meshOptions: {
        color: t.$('input[name="cube-material-color"]').val().trim() || 0xffffff
      }
    };

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

Template.NewCube.helpers({
});

Template.NewCube.created = function () {
};

Template.NewCube.rendered = function () {
};

Template.NewCube.destroyed = function () {
};
