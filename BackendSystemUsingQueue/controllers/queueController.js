const requestQueue = require("../queues/requestQueue");
const Request = require("../models/Request");

exports.enqueueRequest = async (req, res) => {
  try {
    const { requestData } = req.body;
    const userId = req.user.userId;

    const newRequest = await Request.create({ userId, requestData });

    await requestQueue.add("processRequest", { userId, requestId: newRequest._id });

    res.status(200).json({ message: "Request added to queue", requestId: newRequest._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
