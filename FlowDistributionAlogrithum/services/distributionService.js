const User = require("../models/user");
const Astrologer = require("../models/Astrologer");

exports.assignUserToAstrologer = async (userId) => {
  const astrologers = await Astrologer.find().sort({ priority: -1, currentConnections: 1 });
  if (!astrologers.length) throw new Error("No astrologers available");

  for (const astrologer of astrologers) {
    if (astrologer.currentConnections < astrologer.maxConnections) {
      astrologer.currentConnections++;
      await astrologer.save();
      await User.findByIdAndUpdate(userId, { connectedTo: astrologer._id });
      return astrologer;
    }
  }
  throw new Error("All astrologers reached max connections");
};
exports.toggleAstrologerPriority = async (astrologerId, priority) => {
    return await Astrologer.findByIdAndUpdate(astrologerId, { priority }, { new: true });
  };
  