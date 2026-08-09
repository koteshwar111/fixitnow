const { DataTypes } = require("sequelize");

const sequelize = require("../../database/db");

const Coupon = sequelize.define("Coupon", {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    coupon_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    discount_percentage: {
        type: DataTypes.FLOAT,
        allowNull: false
    },

    expiry_date: {
        type: DataTypes.DATE,
        allowNull: false
    },

    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }

}, {
    tableName: "coupons",
    timestamps: true
});

module.exports = Coupon;