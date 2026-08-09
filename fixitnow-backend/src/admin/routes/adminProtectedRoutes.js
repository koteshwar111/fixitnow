const express = require("express");

const router = express.Router();

const verifyAdminToken = require("../../middleware/adminAuthMiddleware");

router.get(
    "/dashboard",
    verifyAdminToken,
    (req, res) => {

        res.status(200).json({
            success: true,
            message: "Welcome Admin Dashboard",
            admin: req.admin
        });

    }
);

module.exports = router;