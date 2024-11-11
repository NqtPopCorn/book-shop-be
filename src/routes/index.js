const homeRouter = require("./home");
const authRouter = require("./auth");
const bookRouter = require("./book");
const detailProductRouter = require("./detailProduct");
const purchaseRouter = require("./purchase");
const providerRouter = require("./provider");
const accountRouter = require("./account");
const cartRouter = require("./cart");
const express = require("express");
const path = require("path");

let initWebRoutes = (app) => {
  app.use("/", express.static(path.resolve(__dirname, "../../public")));
  app.use("/api/detail-product", detailProductRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/book", bookRouter);
  app.use("/api/purchase", purchaseRouter);
  app.use("/api/provider", providerRouter);
  app.use("/api/account", accountRouter);
  app.use("/api/cart", cartRouter);

  return app.use("/", homeRouter);
};

module.exports = initWebRoutes;
