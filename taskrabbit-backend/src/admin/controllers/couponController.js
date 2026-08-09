const Coupon = require("../models/Coupon");

const createCoupon = async (req, res) => {

    try {

        const coupon = await Coupon.create(req.body);

        res.status(201).json({
            success: true,
            message: "Coupon created successfully",
            data: coupon
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getAllCoupons = async (req, res) => {

    try {

        const coupons = await Coupon.findAll();

        res.status(200).json({
            success: true,
            data: coupons
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const updateCouponStatus = async (req, res) => {

    try {

        const { id } = req.params;

        const { is_active } = req.body;

        const coupon = await Coupon.findByPk(id);

        if (!coupon) {
            return res.status(404).json({
                success: false,
                message: "Coupon not found"
            });
        }

        await coupon.update({
            is_active
        });

        res.status(200).json({
            success: true,
            message: "Coupon status updated",
            data: coupon
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    createCoupon,
    getAllCoupons,
    updateCouponStatus
};