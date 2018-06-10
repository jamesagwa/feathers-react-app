// recipes-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const recipes = new Schema({
    title: { type: String, required: true },
    subtitle: { type: String },
    description: {
      type: String,
      required: true
    },
    imgURI: { type: String },
    ownerId: { type: String }
  }, {
    timestamps: true
  });

  return mongooseClient.model('recipes', recipes);
};
