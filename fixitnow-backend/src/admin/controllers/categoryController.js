const Category = require("../models/Category");

const createCategory = async (req, res) => {

    try {

        const { name, description } = req.body;

        const existingCategory = await Category.findOne({
            where: { name }
        });

        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: "Category already exists"
            });
        }

        const category =
await Category.create({

name:
req.body.name,

description:
req.body.description,

image:
req.body.image || null,

status:
req.body.status || "active",

display_order:
req.body.display_order || null,

is_featured:
req.body.is_featured || false,

is_active:
req.body.is_active

});

        res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: category
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getAllCategories = async (req, res) => {

    try {

        const categories = await Category.findAll();

        res.status(200).json({
            success: true,
            data: categories
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// update

const updateCategory = async (req, res) => {

    try {

        const { id } = req.params;

        const { name, description, is_active } = req.body;

        const category = await Category.findByPk(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        await category.update({
            name,
            description,
            is_active
        });

        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: category
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

//delete 

const deleteCategory = async (req, res) => {

    try {

        const { id } = req.params;

        const category = await Category.findByPk(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        await category.destroy();

        res.status(200).json({
            success: true,
            message: "Category deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
};