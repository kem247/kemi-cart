const Sequelize = require("sequelize");
const db = require("../db/database");

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING
  },
  description: Sequelize.STRING,
  unitPrice: Sequelize.FLOAT,
  //may not have
  // volumeDiscounts: Sequelize.ARRAY
  volumeDiscounts: {
    type: Sequelize.STRING,
    get: function() {
      return JSON.parse(this.getDataValue("volumeDiscounts"));
    },
    set: function(val) {
      return this.setDataValue("volumeDiscounts", JSON.stringify(val));
    }
  }
});

module.exports = Product;
