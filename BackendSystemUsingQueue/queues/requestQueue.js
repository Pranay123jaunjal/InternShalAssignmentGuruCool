const { Queue } = require("bullmq");
const redis = require("../config/redis");

const requestQueue = new Queue("requestQueue", { connection: redis });

module.exports = requestQueue;
