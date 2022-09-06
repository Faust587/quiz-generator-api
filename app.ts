const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
require("./database/connector").connect();

const authRouter = require("./routes/authRoutes");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}));

app.use("/auth", authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on https://localhost:${PORT}`);
});
