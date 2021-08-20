const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
//import router
const userRouter = require("./routes/user");

//app
const app = express();
//db

// mongoose
//   .connect(process.env.DATABASE, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//   })
//   .then(console.log("connected db"));
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


// routes middleware
app.use("/api", userRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
