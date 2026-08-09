const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerAdmin = async (req, res) => {

    try {

        const { full_name, email, phone, password } = req.body;

        // Check existing admin
        const existingAdmin = await Admin.findOne({
            where: { email }
        });

        if (existingAdmin) {
            return res.status(400).json({
                success: false,
                message: "Admin already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create admin
        const admin = await Admin.create({
            full_name,
            email,
            phone,
            password: hashedPassword
        });

        res.status(201).json({
            success: true,
            message: "Admin registered successfully",
            data: admin
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
const loginAdmin = async (req, res) => {

    try {

        const { email, password } = req.body;

        // Check admin exists
        const admin = await Admin.findOne({
            where: { email }
        });

        if (!admin) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Generate JWT Token
        const token = jwt.sign(
            {
                id: admin.id,
                email: admin.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.status(200).json({
            success: true,
            message: "Admin login successful",
            token
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    registerAdmin,
    loginAdmin
};