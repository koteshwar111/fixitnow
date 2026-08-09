const express = require("express");

const router = express.Router();

const verifyAdminToken = require("../../middleware/adminAuthMiddleware");

const {
    getDashboardStats
} = require("../controllers/adminDashboardController");

router.get(
    "/stats",
    verifyAdminToken,
    getDashboardStats
);

module.exports = router;