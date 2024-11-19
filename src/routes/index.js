const homeRouter = require("./home");
const authRouter = require("./auth");
const bookRouter = require("./book");
const purchaseRouter = require("./purchase");
const providerRouter = require("./provider");
const accountRouter = require("./account");
const thongKeRouter = require("./thongke");
const express = require("express");
const path = require("path");

let initWebRoutes = (app) => {
  app.use("/api/auth", authRouter);
  app.use("/", express.static(path.resolve(__dirname, "../../public")));
  app.use("/api/book", bookRouter);
  app.use("/api/purchase", purchaseRouter);
  app.use("/api/provider", providerRouter);
  app.use("/api/account", accountRouter);
  app.use("/api/thongke", thongKeRouter);

  return app.use("/", homeRouter);
};

module.exports = initWebRoutes;
