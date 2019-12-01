const express = require("express");
const path = require("path");
const volleyball = require("volleyball");
const app = express();

const debug = process.env.NODE_ENV === "test";
app.use(volleyball.custom({ debug }));

//Bodyparser Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../public")));
// app.use(express.static(path.join(__dirname, "../src/webpack.config.js")));
app.use("/api", require("./api"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error");
});

module.exports = app;
