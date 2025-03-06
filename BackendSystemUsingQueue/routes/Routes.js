const express = require("express");
const { register, login } = require("../controllers/authController");
const { authenticateUser } = require("../middlewares/authmiddleware");
const { enqueueRequest } = require("../controllers/queueController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/enqueue", authenticateUser, enqueueRequest);
module.exports = {router};
