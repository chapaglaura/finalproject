const db = require("../models");
const bcrypt = require("bcryptjs");

module.exports = {
  findAll: function(req, res, collection) {
    db[collection]
      .find(req.query)
      .sort({
        name: 1
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByProject: function(req, res, collection) {
    db[collection]
      .find({ project: req.params.project })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findByUserID: function(req, res, collection) {
    console.log(req.params);
    db[collection]
      .findOne({
        userID: req.params.userID
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res, collection) {
    const user = req.user;
    db[collection]
      .findById(req.params.id)
      .then(dbModel => res.json({ dbModel, user }))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res, collection) {
    console.log(collection, req.body);
    db[collection]
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => {
        console.log(err);
        res.status(422).json(err);
      });
  },
  update: function(req, res, collection) {
    db[collection]
      .findOneAndUpdate(
        {
          _id: req.params.id
        },
        req.body
      )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res, collection) {
    db[collection]
      .findById({
        _id: req.params.id
      })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  checkLogin: function(req, res, collection) {
    const { username, password, type } = req.body;
    console.log("chekcing login");

    db[collection]
      .findOne({
        username,
        type
      })
      .then(user => {
        console.log("user:", user);
        if (!user) {
          console.log("no user found");
          return res.json(false);
        }
        bcrypt
          .compare(password, user.password)
          .then(doMatch => {
            console.log("domatch:", doMatch);
            if (doMatch) {
              console.log("matching");
              req.session.isLoggedIn = true;
              req.session.user = user;
              return req.session.save(err => {
                console.log(err);
                res.json(user);
              });
            }
            return res.json(false);
          })
          .catch(err => {
            console.log(err);
            res.send("Oops, something went wrong");
          });
      })
      .catch(err => console.log(err));
  },
  checkSignup: function(req, res, collection) {
    const { username, password, type } = req.body;

    db[collection]
      .findOne({
        username: username
      })
      .then(userDoc => {
        if (userDoc) {
          res.send(false);
        }
        return bcrypt
          .hash(password, 12)
          .then(hashedPassword => {
            const user = new db[collection]({
              username,
              password: hashedPassword,
              type
            });
            return user.save();
          })
          .then(result => {
            res.json(result);
          });
      })
      .catch(err => {
        console.log(err);
      });
  },

  logout: function(req, res) {
    req.session.destroy();
    res.json(true);
  }
};
