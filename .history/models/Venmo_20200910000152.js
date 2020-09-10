const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Float = require('mongoose-float').loadType(mongoose, 2)

const VenmoSchema = new Schema({
  primaryVenmo: {
    type: String,
    required: true,
  },
  item: {
    type: String,
    default: "",
  },
  inputPrice: {
    type: Float
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId
  }],
  group_id: {
    type: String,
    default: ""
  },
  splitPrice: {
    type: Float,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Venmo", VenmoSchema);
