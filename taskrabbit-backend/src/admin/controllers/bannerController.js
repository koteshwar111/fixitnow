const Banner = require("../models/Banner");

const createBanner = async (req, res) => {

    try {

        const banner = await Banner.create(req.body);

        res.status(201).json({
            success: true,
            message: "Banner created successfully",
            data: banner
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getAllBanners = async (req, res) => {

    try {

        const banners = await Banner.findAll();

        res.status(200).json({
            success: true,
            data: banners
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const updateBannerStatus = async (req, res) => {

    try {

        const { id } = req.params;

        const { is_active } = req.body;

        const banner = await Banner.findByPk(id);

        if (!banner) {
            return res.status(404).json({
                success: false,
                message: "Banner not found"
            });
        }

        await banner.update({
            is_active
        });

        res.status(200).json({
            success: true,
            message: "Banner status updated",
            data: banner
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const deleteBanner = async (req, res) => {

    try {

        const { id } = req.params;

        const banner = await Banner.findByPk(id);

        if (!banner) {
            return res.status(404).json({
                success: false,
                message: "Banner not found"
            });
        }

        await banner.destroy();

        res.status(200).json({
            success: true,
            message: "Banner deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    createBanner,
    getAllBanners,
    updateBannerStatus,
    deleteBanner
};