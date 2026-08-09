const { DataTypes } = require("sequelize");

const sequelize = require("../../database/db");

const Category = require("./Category");

const SubCategory = sequelize.define("SubCategory", {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    description: {
        type: DataTypes.TEXT
    },

    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }

}, {
    tableName: "subcategories",
    timestamps: true
});

Category.hasMany(SubCategory, {
    foreignKey: "category_id"
});

SubCategory.belongsTo(Category, {
    foreignKey: "category_id"
});

module.exports = SubCategory;