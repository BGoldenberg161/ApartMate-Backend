const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VenmoSchema = new Schema({
  taskName: {
    type: String,
    required: true,
  },
  taskDetail: {
    type: String,
    default: "",
  },
  user_id: {
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

module.exports = mongoose.model("Chore", ChoreSchema);
