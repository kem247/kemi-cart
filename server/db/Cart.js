const Sequelize = require("sequelize");
const db = require("../db/database");

const Cart = db.define("cart", {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  total: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  }
});

module.exports = Cart;
