const express = require("express");
const router = express.Router();
const {
  hello,
  signup,
  signin,
  signout,
  requireSignin,
} = require("../controllers/auth");
const {
  validateRequestSchema,
} = require("../middleware/validate-request-schema");
const { schema } = require("../schema/register-schema");

router.get("/hello", hello);
router.post("/signup", schema, validateRequestSchema, signup);
router.post("/signin", signin);
router.get("/signout", signout);

// mid bat buoc phai dang nhap
router.get("/hi", requireSignin, (req, res) => {
  res.send("hello there");
});

module.exports = router;
