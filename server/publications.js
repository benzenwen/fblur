Meteor.publish('scenedb', function() {
  return SceneDB.find();
});
