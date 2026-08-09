const express = require("express");

const router = express.Router();

const verifyAdminToken = require("../../middleware/adminAuthMiddleware");

const {
    createTasker,
    getAllTaskers,
    approveTasker,
    deleteTasker,
    updateTasker
} = require("../controllers/taskerController");

router.post(
    "/",
    verifyAdminToken,
    createTasker
);

router.get(
    "/",
    verifyAdminToken,
    getAllTaskers
);

router.put(
    "/:id/approve",
    verifyAdminToken,
    approveTasker
);
router.delete(

"/:id",

verifyAdminToken,

deleteTasker

);
router.put(

"/:id",

verifyAdminToken,

updateTasker

);
module.exports = router;