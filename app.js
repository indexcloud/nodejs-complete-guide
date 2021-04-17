require("dotenv").config();
const path = require("path");

const express = require("express");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(express.json());
// request body has been parsed
app.use(express.urlencoded({extended: false}));
// request body has been url encoded
app.use(express.static(path.join(__dirname, "public"))); // link to css

app.use((req, res, next) => {
	User.findById("5fe6d68bd4103a713d02c62e")
		.then(user => {
			req.user = user;
			next();
		})
		.catch(err => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use("*", errorController.get404);

mongoose
	.connect(`mongodb+srv://jas:${process.env.DB_PASS}@cluster0.tpt4t.mongodb.net/shop?retryWrites=true&w=majority`)
	.then(result => {
		User.findOne().then(user => {
			if (!user) {
				const user = new User({
					name: "Max",
					email: "max@test.com",
					cart: {
						items: [],
					},
				});
				user.save();
			}
		});
		app.listen(3000);
	})
	.catch(err => {
		console.log(err);
	});
