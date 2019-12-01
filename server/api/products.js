const router = require("express").Router();
const { Product, Cart } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll({ include: [Cart] });
    if (products) {
      res.json(products);
    } else {
      res.sendStatus(500);
    }
  } catch (err) {
    next(err);
  }
});
router.get("/:productId", async (req, res, next) => {
  try {
    let product = await Product.findByPk(req.params.productId, {
      include: [Cart]
    });
    res.json(product);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    let product = await Product.create(req.body, { returning: true });

    res.json(product);
  } catch (err) {
    next(err);
  }
});

router.delete("/:productId", (req, res, next) => {
  try {
    product.destroy({
      where: {
        id: req.params.productId
      }
    });
  } catch (err) {
    next(err);
  }
});

router.put("/:productId", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    if (!product) {
      return res.sendStatus(404);
    }
    const updateProduct = await product.update(req.body);
    return res.json(updateProduct);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
