const homeRouter = require("./home");
const authRouter = require("./auth");
const bookRouter = require("./book");
const express = require("express");
const path = require("path");

let initWebRoutes = (app) => {
    app.use("/api/auth", authRouter);
    app.use("/", express.static(path.resolve(__dirname, "../../public")));
    app.use("/api/book", bookRouter);

    return app.use("/", homeRouter);
};

module.exports = initWebRoutes;
