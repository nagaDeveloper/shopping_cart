const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
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
  User.findById("65f7fa0e4fa34232ffd1266e")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

// localhost:3000/admin/"paths"
app.use("/admin", adminRoutes);
// localhost:3000/"paths"
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://naga_dev:shivanaga@naga.dzqyhk1.mongodb.net/shop?retryWrites=true"
  )
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Naga",
          email: "naga@test.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
