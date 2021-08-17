const express = require("express");
const router = express.Router();
const { signup } = require("../controllers/user");
const { hello } = require("../controllers/user");
const {validateRequestSchema} = require("../middleware/validate-request-schema");
const {schema} = require("../schema/register-schema");
router.post("/signup", schema, validateRequestSchema, signup);
router.get("/signup", hello);

module.exports = router;
