require("dotenv").config();
const Redis = require("ioredis");

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379", {
  maxRetriesPerRequest: null, //  Fix for BullMQ
  enableReadyCheck: false,    //  Ensures connection stability
});

redis.on("connect", () => console.log(" Redis Connected:", process.env.REDIS_URL));
redis.on("error", (err) => console.error(" Redis Error:", err));

module.exports = redis;
