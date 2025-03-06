const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  connectedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Astrologer", default: null },
}, { timestamps: true });
module.exports = mongoose.model("User", UserSchema);