const SubCategory = require("../models/SubCategory");

const createSubCategory = async (req, res) => {

    try {

        const { category_id, name, description } = req.body;

        const subcategory = await SubCategory.create({
            category_id,
            name,
            description
        });

        res.status(201).json({
            success: true,
            message: "Subcategory created successfully",
            data: subcategory
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getAllSubCategories = async (req, res) => {

    try {

        const subcategories = await SubCategory.findAll();

        res.status(200).json({
            success: true,
            data: subcategories
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    createSubCategory,
    getAllSubCategories
};