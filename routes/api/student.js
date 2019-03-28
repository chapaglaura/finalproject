const router = require("express").Router();
const controller = require("../../controllers/appController");
const collection = 'Student';


router.route("/")
  .get((req, res) => {
    controller.findAll(req, res, collection);
  })
  .post((req, res) => {
    controller.create(req, res, collection);
  });

router
  .route("/:id")
  .get((req, res) => {
    controller.findById(req, res, collection);
  })
  .put((req, res) => {
    controller.update(req, res, collection);
  })
  .delete((req, res) => {
    controller.remove(req, res, collection);
  });

  router
  .route("/user/:userID")
  .get((req, res) => {
    controller.findByUserID(req, res, collection);
  })

  router.route("/project/:project")
  .get((req, res) => {
    controller.findByProject(req, res, collection);
  })

module.exports = router;