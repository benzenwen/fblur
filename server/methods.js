Meteor.methods({
  'cubes.removeAll': function () {
    Cubes.find().forEach(function (c) {
      Cubes.remove(c);
    });
  }
});
