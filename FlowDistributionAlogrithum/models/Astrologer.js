const mongoose = require("mongoose");
const AstrologerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  priority: { type: Boolean, default: false },
  currentConnections: { type: Number, default: 0 },
  maxConnections: { type: Number, default: 10 },
}, { timestamps: true });
module.exports = mongoose.model("Astrologer", AstrologerSchema);