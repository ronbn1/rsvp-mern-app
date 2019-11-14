const mongoose = require("mongoose");

const guestSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String,
    required: true,
    min: 3,
    max: 255
  },
  phone: {
    type: String,
    required: true,
    min: 9,
    max: 255
  },
  dietary: {
    type: String,
    required: true,
    default: "Non-Veg"
  },
  isconfirmed: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Guest", guestSchema);
