const User = require("../models/user");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.signup = async (req, res) => {
  console.log("req.body", req.body);
  const user = await new User(req.body); // bat buoc wait
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler(err),
      });
    }
    user.salt = undefined;// khi response tra ve cho client khong de lo salt va hash
    user.hashed_password = undefined;//
    res.json({
      user,
    });
  });
};

exports.hello = (req, res) => {
  res.send("hello");
};
