const express = require("express");
const router = express.Router();

const {
  create,
  productById,
  read,
  remove,
  update,
  list,
  listRelated,
  listCategories,
  listBySearch,
  photo
} = require("../controllers/product");
const { requireSignin, isAdmin, isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.post(
  "/product/create/:userById",
  requireSignin,
  isAdmin,
  isAuth,
  create
);

router.delete(
  "/product/:productById/:userById",
  requireSignin,
  isAdmin,
  isAuth,
  remove
);

router.put(
  "/product/:productById/:userById",
  requireSignin,
  isAdmin,
  isAuth,
  update
);

router.get("/product/:productById", read);
router.get("/products", list);
router.get("/products/related/:productById", listRelated);
router.get("/products/categories", listCategories);
router.post("/products/by/search", listBySearch);
router.get("/product/photo/:productById", photo);


router.param("userById", userById);
router.param("productById", productById);

module.exports = router;
