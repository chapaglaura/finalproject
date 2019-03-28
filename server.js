require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require('connect-mongodb-session')(session);
const db = require("./models");


const PORT = process.env.PORT || 3000;
const app = express();

const store = new MongoDBStore({
  uri: 'mongodb://localhost/finalclassproject',
  collection: 'sessions'
});

const routes = require("./routes");

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);


if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  db.User.findById(req.session.user._id)
    .then(user => {
      if (user) {
        req.user = user;
        return next();
      }
    })
    .catch(err => console.log(err));
});

app.get("/api", function(req, res) {
  res.json(req.session.user);
})

app.use(routes);

mongoose.connect('mongodb://localhost/finalclassproject', {
  useNewUrlParser: true
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});