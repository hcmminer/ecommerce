const User = require("../models/user");
const { errorHandler } = require("../helpers/dbErrorHandler");
const expressJwt = require("express-jwt");
var jwt = require("jsonwebtoken");

exports.hello = (req, res) => {
  res.send("hello");
};

exports.signup = async (req, res) => {
  console.log("Cookies: ", req.cookies);
  console.log("req.body", req.body);
  const user = await new User(req.body); // bat buoc wait
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler(err),
      });
    }
    user.salt = undefined; // khi response tra ve cho client khong de lo salt va hash
    user.hashed_password = undefined; //
    res.json({
      user,
    });
  });
};

exports.signin = async (req, res) => {
  // find the user based on email address
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email dose not exist. Please signup",
      });
    }
    //if user is found make sure the email and password are correct
    // create authentication method in user models
    if (!user.authenticate(password)) {
      res.status(401).json({ error: "email and password dont match" });
    }
    // generate a signed token with user id and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    // persist the token as "t" in cookie in expiry date
    res.cookie("t", token, { expire: new Date() + 9999 });
    // return response with user and token to frontend client
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, email, name, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "signout success" });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["sha1", "RS256", "HS256"], // added later
  userProperty: "auth",// *
});

// kiem tra xem nguoi login va nguoi gui yeu cau la mot khong
exports.isAuth = (req, res, next) => {
  // req.profile chinh la document cua id chua trong url gui len "/secret/:userId" GET method
  // req.auth la thuoc tinh duoc tao ra boi * tren 
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  console.log("🚀 ~ file: auth.js ~ line 66 ~ req.auth", req.auth);
  console.log("🚀 ~ file: auth.js ~ line 66 ~ req.profile", req.profile);

  if (!user) {
    return res.status(403).json({ error: "acess denied" });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    console.log("🚀 ~ file: auth.js ~ line 78 ~ req.profile", req.profile);
    return res.status(403).json({ error: "Admin resource, access denied" });
  }
  next();
};
