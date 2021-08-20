const express = require("express");
const router = express.Router();
const { hello, signup, signin, signout } = require("../controllers/user");
const {
  validateRequestSchema,
} = require("../middleware/validate-request-schema");
const { schema } = require("../schema/register-schema");
router.get("/hello", hello);
router.post("/signup", schema, validateRequestSchema, signup);
router.post("/signin", signin);
router.get("/signout", signout);

module.exports = router;
