const express = require("express");
const router = express.Router();

const {
  create,
  categoryById,
  read,
  update,
  remove,
  list,
} = require("../controllers/category");
const { requireSignin, isAdmin, isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.get("/category/:categoryById", read);

router.post(
  "/category/create/:userById",
  requireSignin,
  isAdmin,
  isAuth,
  create
);

router.put(
  "/category/:categoryById/:userById",
  requireSignin,
  isAdmin,
  isAuth,
  update
);

router.delete(
  "/category/:categoryById/:userById",
  requireSignin,
  isAdmin,
  isAuth,
  remove
);

router.get("/categories", list);

router.param("categoryById", categoryById);
router.param("userById", userById);

module.exports = router;
