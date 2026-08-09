const express = require("express");

const router = express.Router();

const verifyAdminToken = require("../../middleware/adminAuthMiddleware");

const {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
} = require("../controllers/categoryController");

router.post(
    "/",
    verifyAdminToken,
    createCategory
);

router.get(
    "/",
    verifyAdminToken,
    getAllCategories
);

router.put(
    "/:id",
    verifyAdminToken,
    updateCategory
);

router.delete(
    "/:id",
    verifyAdminToken,
    deleteCategory
);

module.exports = router;