const { Schema } = require("mongoose");

const actorSchema = new Schema({
  actorId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  image: {
    type: String,
  }
  
});

module.exports = actorSchema;
