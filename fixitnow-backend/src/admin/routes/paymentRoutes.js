const express = require("express");

const router = express.Router();

const verifyAdminToken = require("../../middleware/adminAuthMiddleware");

const {
    createPayment,
    getAllPayments,
    updatePaymentStatus,
    getRevenue
} = require("../controllers/paymentController");

router.post(
    "/",
    verifyAdminToken,
    createPayment
);

router.get(
    "/",
    verifyAdminToken,
    getAllPayments
);

router.put(
    "/:id/status",
    verifyAdminToken,
    updatePaymentStatus
);

router.get(
    "/revenue",
    verifyAdminToken,
    getRevenue
);

module.exports = router;