const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Float = 

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
    type: String,
    default: "",
  },
  group_id: {
    type: String,
    default: "",
  },
  completeDate: {
    type: Date,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
  claim: {
    type: String,
    default: '',
  },
  claimName: {
    type: String,
    default: 'unclaimed'
  },
  isRepeating: {
    type: Boolean,
    default: true
  },
  neverDone: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Venmo", VenmoSchema);
