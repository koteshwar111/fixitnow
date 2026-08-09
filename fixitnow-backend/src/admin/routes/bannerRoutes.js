const express = require("express");

const router = express.Router();

const verifyAdminToken = require("../../middleware/adminAuthMiddleware");

const {
    createBanner,
    getAllBanners,
    updateBannerStatus,
    deleteBanner
} = require("../controllers/bannerController");

router.post(
    "/",
    verifyAdminToken,
    createBanner
);

router.get(
    "/",
    verifyAdminToken,
    getAllBanners
);

router.put(
    "/:id/status",
    verifyAdminToken,
    updateBannerStatus
);

router.delete(
    "/:id",
    verifyAdminToken,
    deleteBanner
);

module.exports = router;