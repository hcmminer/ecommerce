const express = require("express");
const router = express.Router();

const { requireSignin, isAuth } = require("../controllers/auth");
const { userById, addOerderToUserHistory } = require("../controllers/user");
const { create } = require("../controllers/order");

router.post(
  "/order/create/:userId",
  requireSignin,
  isAuth,
  addOerderToUserHistory,
  create
);

router.param("userId", userById);
router.param("orderId", orderById);

module.exports = router;
