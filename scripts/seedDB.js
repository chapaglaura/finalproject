const mongoose = require("mongoose");
const faker = require('faker');
const db = require("../models");
const bcrypt = require("bcryptjs");
// This file empties the Example collection and inserts some test documents below
mongoose.connect(
  process.env.MONGODB_URI || 
  "mongodb://localhost/finalclassproject"
);

const SEED_AMOUNT = 1;
let exampleSeed = [];

for(let i = 0; i < SEED_AMOUNT; i++) {
  exampleSeed.push({
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraphs(3),
    data: new Date(Date.now())
  });
}

(function () {
    const username = "admin";
    password = "admin";
    type = "admin";

    db['User']
      .findOne({
        username: username
      })
      .then(userDoc => {
        return bcrypt
          .hash(password, 12)
          .then(hashedPassword => {
            const user = new db['User']({
              username,
              password: hashedPassword,
              type
            });
            return user.save();
          })
          .then(result => {
            process.exit(0);
          });
      })
      .catch(err => {
        console.log(err);
      });
    })()

