import express from "express";
import morgan from "morgan";
import helmet from "helmet";

import pkg from "../package.json";

import personRoutes from "./routes/person.routes";
const exphbs = require("express-handlebars");
const path = require("path");

const app = express();

// Settings
app.set("pkg", pkg);
app.set("port", process.env.PORT || 3000);
app.set("json spaces", 4);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs.engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

// Middlewares
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", personRoutes);

export default app;
