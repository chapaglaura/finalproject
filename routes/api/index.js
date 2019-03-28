const router = require("express").Router();
const studentRoutes = require("./student");
const eventRoutes = require("./event");
const projectRoutes = require("./project");
const supervisorRoutes = require("./supervisor");
const userRoutes = require("./user");

router.use("/users", userRoutes);
router.use("/students", studentRoutes);
router.use("/events", eventRoutes);
router.use("/projects", projectRoutes);
router.use("/supervisors", supervisorRoutes);

module.exports = router;
