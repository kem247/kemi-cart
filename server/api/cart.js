const express = require("express");
const router = express.Router();
const { Cart, Product } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const cart = await Cart.findAll();
    if (cart) {
      res.json(cart);
    } else {
      res.sendStatus(500);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/:cartId", async (req, res, next) => {
  try {
    let cart = await Cart.findByPk(req.params.cartId);

    res.json(cart);
  } catch (err) {
    next(err);
  }
});
router.get("/:cartId/products", async (req, res, next) => {
  try {
    const product = await Product.findAll({
      where: {
        cartId: req.params.cartId
      },
      include: [Cart]
    });
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    let cart = await Cart.create(req.body, { returning: true });

    res.json(cart);
  } catch (err) {
    next(err);
  }
});

router.delete("/:cartId", (req, res, next) => {
  try {
    Cart.destroy({
      where: {
        id: req.params.cartId
      }
    });
  } catch (err) {
    next(err);
  }
});

router.delete("/:productId", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    product.destroy({
      where: {
        id: req.params.cartId
      }
    });
  } catch (err) {
    next(err);
  }
});

// router.put("/:campusId", async (req, res, next) => {
//   try {
//     const campus = await Campus.findByPk(req.params.campusId);
//     if (!campus) {
//       res.sendStatus(404);
//     } else {
//       const updateCampus = await campus.update(req.body);
//       res.json(updateCampus);
//     }
//   } catch (err) {
//     next(err);
//   }
// });

// router.put("/:campusId/students", async (req, res, next) => {
//   try {
//     const student = await Student.findAll({
//       where: {
//         campusId: req.params.campusId
//       },
//       include: [Campus]
//     });
//     const updateCampus = await student.update(req.body);
//     res.json(updateCampus);
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = router;
