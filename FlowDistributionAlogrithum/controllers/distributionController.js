const User = require("../models/user");
const Astrologer = require("../models/Astrologer");
const { assignUserToAstrologer } = require("../services/distributionService");

exports.createUser = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "User name is required" });

    const user = await User.create({ name });
    res.status(201).json({ message: "User created", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.createAstrologer = async (req, res) => {
  try {
    const { name, priority, maxConnections } = req.body;
    if (!name) return res.status(400).json({ error: "Astrologer name is required" });

    const astrologer = await Astrologer.create({
      name,
      priority: priority || false,
      maxConnections: maxConnections || 10,
    });

    res.status(201).json({ message: "Astrologer created", astrologer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.connectUser = async (req, res) => {
  try {
    const { userId } = req.body;

    // Correct way to find user by ID
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const astrologer = await assignUserToAstrologer(userId);
    res.json({ message: "User connected", user, astrologer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





exports.toggleAstrologerPriority = async (req, res) => {
  try {
    const { astrologerId, priority } = req.body;
    const astrologer = await Astrologer.findByIdAndUpdate(
      astrologerId,
      { priority, currentConnections: 0 },
      { new: true }
    );
    if (!astrologer) return res.status(404).json({ error: "Astrologer not found" });
    res.json({ message: "Astrologer priority updated", astrologer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
