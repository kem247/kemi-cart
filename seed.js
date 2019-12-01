const { db, Cart, Product } = require("./server/db");

const cart = [
  {
    quantity: 5,
    total: 6.0
  },
  {
    quantity: 3,
    total: 6.0
  },
  {
    quantity: 2,
    total: 10.0
  }
];

const products = [
  {
    name: "Jo",
    description: "Ann",
    unitPrice: 2.0,
    volumeDiscounts: 7
  },
  {
    name: "bo",
    description: "mdfdsf",
    unitPrice: 2.0,
    volumeDiscounts: 7
  },
  {
    name: "dsfdf",
    description: "sdfdsf",
    unitPrice: 5.0,
    volumeDiscounts: 4
  },

  {
    name: "sdfdsf",
    description: "Adsfdnn",
    unitPrice: 7.0,
    volumeDiscounts: 2
  },
  {
    name: "Jodsf",
    description: "Ansdfn",
    unitPrice: 8.0,
    volumeDiscounts: 9
  }
];

const seed = () =>
  Promise.all(cart.map(cart => Cart.create(cart))).then(() =>
    Promise.all(products.map(product => Product.create(product)))
  );

const main = () => {
  console.log("Syncing db...");
  db.sync({ force: true })
    .then(() => {
      console.log("Seeding database...");
      return seed();
    })
    .catch(err => {
      console.log("Error while seeding");
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();
