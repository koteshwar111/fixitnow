const { DataTypes } = require("sequelize");

const sequelize = require("../../database/db");

const Banner = sequelize.define("Banner", {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    image_url: {
        type: DataTypes.STRING,
        allowNull: false
    },

    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }

}, {
    tableName: "banners",
    timestamps: true
});

module.exports = Banner;
