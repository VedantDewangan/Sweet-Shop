const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./database/connectDB");
const cookieParser = require("cookie-parser");
const { AuthRoute } = require("./routes/AuthRoute");
const { SweetRoute } = require("./routes/SweetRoute");
const cors = require("cors");
dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "API is live",
  });
});

app.use("/api/auth", AuthRoute);
app.use("/api", SweetRoute);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Your backend is live on port ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
