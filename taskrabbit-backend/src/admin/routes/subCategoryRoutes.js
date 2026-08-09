const express = require("express");

const router = express.Router();

const verifyAdminToken = require("../../middleware/adminAuthMiddleware");

const {
    createSubCategory,
    getAllSubCategories
} = require("../controllers/subCategoryController");

router.post(
    "/",
    verifyAdminToken,
    createSubCategory
);

router.get(
    "/",
    verifyAdminToken,
    getAllSubCategories
);

module.exports = router;