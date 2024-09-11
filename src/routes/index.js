const homeRouter = require("./homeRouter");

let initWebRoutes = (app) => {
    return app.use("/", homeRouter);
};

module.exports = initWebRoutes;
