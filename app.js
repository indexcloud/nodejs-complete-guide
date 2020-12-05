const path = require("path");

const express = require("express");

const errorController = require("./controllers/error");
const mongoConnect = require("./util/database").mongoConnect;

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(express.json());
// request body has been parsed
app.use(express.urlencoded({extended: false}));
// request body has been url encoded
app.use(express.static(path.join(__dirname, "public"))); // link to css

app.use((req, res, next) => {
	// User.findByPk(1)
	// 	.then(user => {
	// 		req.user = user; // This is sequelize object, not JavasScript object
	// 		next();
	// 	})
	// 	.catch(err => console.log(err));
	next();
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use("*", errorController.get404);

mongoConnect(() => {
	app.listen(3000);
});
