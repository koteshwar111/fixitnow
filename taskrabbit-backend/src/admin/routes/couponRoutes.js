const express = require("express");

const router = express.Router();

const verifyAdminToken = require("../../middleware/adminAuthMiddleware");

const {
    createCoupon,
    getAllCoupons,
    updateCouponStatus
} = require("../controllers/couponController");

router.post(
    "/",
    verifyAdminToken,
    createCoupon
);

router.get(
    "/",
    verifyAdminToken,
    getAllCoupons
);

router.put(
    "/:id/status",
    verifyAdminToken,
    updateCouponStatus
);

module.exports = router;