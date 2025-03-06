
const express = require("express");
const { connectUser, createUser, createAstrologer,toggleAstrologerPriority } = require("../controllers/distributionController");

const router = express.Router();
router.post("/CreateUser", createUser);
router.post("/CreateAstrologer", createAstrologer);
router.post("/connect", connectUser);
router.put("/toggle-priority", toggleAstrologerPriority);
module.exports = {router};
