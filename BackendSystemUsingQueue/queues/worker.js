const { Worker } = require("bullmq");
const mongoose = require("mongoose"); // Import MongoDB
const redis = require("../config/redis");
const Request = require("../models/Request");

// Connect to MongoDB in Worker Process
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(" Worker MongoDB Connected");
  } catch (error) {
    console.error(" Worker MongoDB Connection Error:", error);
    process.exit(1); // Stop worker if MongoDB fails
  }
};

connectDB(); //  Ensure DB is connected before processing jobs

console.log(" Worker started. Waiting for jobs...");

const worker = new Worker(
  "requestQueue",
  async (job) => {
    console.log(` Processing Job ${job.id} for user ${job.data.userId}`);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    await Request.findByIdAndUpdate(job.data.requestId, { status: "completed" });

    console.log(` Job ${job.id} processed successfully`);
  },
  {
    connection: redis,
  }
);

worker.on("completed", (job) => console.log(` Job ${job.id} completed successfully`));
worker.on("failed", (job, err) => console.log(` Job ${job.id} failed: ${err.message}`));
