const db = require("./database");
const Cart = require("./Cart");
const Product = require("./Products");

Product.belongsTo(Cart);
Cart.hasMany(Product);

module.exports = {
  db,
  Cart,
  Product
};
