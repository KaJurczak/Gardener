const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  id: { type: String, required: true },
  polishName: { type: String, required: true},
  latinName: { type: String},
  type: { type: String},
  content: { type: String, required: true},
  source: { type: String, required: true},
  height: { type: String},
  colors: { type: Array },
  choosenColor: { type: String},
  floweringDate: { type: String},
  conditions: { type: String},
  cutting: { type: String},
  fertilizing: { type: String},
  photo: { type: Array },
  price: { type: Number, required: true  },
});

module.exports = mongoose.model('Plant', plantSchema);
