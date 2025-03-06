require("dotenv").config();
const express = require("express");
const {connectDB} = require("./config/db");
const { router } = require("./routes/routes");

connectDB();
const app = express();
app.use(express.json());
app.use("/api/v1",router );

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));