"use strict";

const router = require("express").Router();
const cart = require("./cart");
const products = require("./products");

router.use("/cart", cart);
router.use("/products", products);

router.use((req, res, next) => {
  const err = new Error("API route not found!");
  err.status = 404;
  next(err);
});

module.exports = router;
