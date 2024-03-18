const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const mongoConnect = require("./util/database").mongoConnect;
const User = require("./models/user");

const app = express();

//  to set the folder for serving the html dynamic files
app.set("view engine", "ejs");
app.set("views", "views");

// imported routes from the routes folder
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// to parse the request data for server side logic
app.use(bodyParser.urlencoded({ extended: false }));

// to serve static files like html, css, js
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  // User.findById("65f6b21642697a0ffb868674")
  //   .then((user) => {
  //     req.user = new User(user.name, user.email, user.cart, user._id);
  //     next();
  //   })
  //   .catch((err) => console.log(err));
  next();
});

// localhost:3000/admin/"paths"
app.use("/admin", adminRoutes);
// localhost:3000/"paths"
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000);
});
