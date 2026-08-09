const express = require("express");

const router = express.Router();

const verifyAdminToken = require("../../middleware/adminAuthMiddleware");

const {
    createBooking,
    getAllBookings,
    updateBookingStatus,
    deleteBooking
} = require("../controllers/bookingController");

router.post(
    "/",
    verifyAdminToken,
    createBooking
);

router.get(
    "/",
    verifyAdminToken,
    getAllBookings
);

router.put(
    "/:id/status",
    verifyAdminToken,
    updateBookingStatus
);
router.delete(

"/:id",

verifyAdminToken,

deleteBooking

);

module.exports = router;