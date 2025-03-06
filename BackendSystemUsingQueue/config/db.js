const mongoose = require("mongoose");

exports. connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, //  Prevent long waits
      socketTimeoutMS: 45000, //  Close inactive connections
    });
    console.log(" MongoDB Connected");
  } catch (err) {
    console.error(" MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};

