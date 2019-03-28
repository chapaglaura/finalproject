const router = require("express").Router();
const controller = require("../../controllers/appController");
const collection = 'User';


router.route("/signup")
  .post((req, res) => {
    controller.checkSignup(req, res, collection);
  });

router.route("/login")
  .post((req, res) => {
    controller.checkLogin(req, res, collection);
  })

  router.route("/logout")
  .post((req, res) => {
    controller.logout(req, res);
  })

module.exports = router;