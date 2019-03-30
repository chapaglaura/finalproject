const router = require("express").Router();
const controller = require("../../controllers/appController");
const collection = 'CheckIn';


router.route("/")
  .post((req, res) => {
    controller.create(req, res, collection);
  });

  router.route("/project/:project")
  .get((req, res) => {
    controller.findByProject(req, res, collection);
  })

module.exports = router;