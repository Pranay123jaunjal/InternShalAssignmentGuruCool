require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const {connectDB} = require("./config/db");
const { router } = require("./routes/Routes");

connectDB();
const app = express();
app.use(express.json());
app.use(cookieParser()); // Enable cookie parsing

app.use("/api/v1",router)

app.listen(5000, () => console.log("Server running on port 5000"));
