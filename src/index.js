const express = require("express");
require("dotenv").config();
const connectDB = require("./db/connect");
const app = express();
var cors = require("cors");
const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");
const contactRouter = require("./routes/contact.routes");
app.use(cors());
app.use(express.json());
app.use("/api", authRouter, productRouter, contactRouter);
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.DATABASEURL);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log("error =>", error);
  }
};
start();
