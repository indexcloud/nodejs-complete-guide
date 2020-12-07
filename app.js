const path = require("path");

const express = require("express");

const errorController = require("./controllers/error");
const mongoConnect = require("./util/database").mongoConnect;
const User = require("./models/user");

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
	User.findById("5fcd15e939e6eb577863bcf1")
		.then(user => {
			req.user = new User(user.name, user.email, user.cart, user._id);
			next();
		})
		.catch(err => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use("*", errorController.get404);

mongoConnect(() => {
	app.listen(3000);
});
