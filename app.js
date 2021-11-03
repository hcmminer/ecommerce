const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//import router
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const categoryRouter = require("./routes/category");
const productRouter = require("./routes/product");
const braintreeRouter = require("./routes/braintree");
const orderRouter = require("./routes/order");

//app
const app = express();

// db
(async () => {
  try {
    await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (error) {
    console.log(error);
  }
})();

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(cors());

// routes middleware
app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", categoryRouter);
app.use("/api", productRouter);
app.use("/api", braintreeRouter);
app.use("/api", orderRouter);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Back End running at - http://localhost:${port}`);
});
