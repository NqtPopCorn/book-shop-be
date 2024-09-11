const homeRouter = require("./home");

let initWebRoutes = (app) => {
    return app.use("/", homeRouter);
};

module.exports = initWebRoutes;
