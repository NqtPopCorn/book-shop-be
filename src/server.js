import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./routes";
require("dotenv").config();

let app = express();
//config parser body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//cors config
const cors = require("cors");
const corsOptions = {
    origin: process.env.FE_PORT,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

viewEngine(app);
initWebRoutes(app);

let port = process.env.PORT || 6969;

app.listen(port, () => {
    console.log(`App is running at the port ${port}`);
});
