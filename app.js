const path = require("path");

const express = require("express");

const errorController = require("./controllers/error");
const db = require("./util/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

db.execute("SELECT * FROM products").then().catch();

app.use(express.json());
// request body has been parsed
app.use(express.urlencoded({extended: false}));
// request body has been url encoded
app.use(express.static(path.join(__dirname, "public"))); // link to css

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use("*", errorController.get404);

app.listen(3000);
