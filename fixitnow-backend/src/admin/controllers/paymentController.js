const Payment = require("../models/Payment");

const createPayment = async (req, res) => {

    try {

        // const payment = await Payment.create(req.body);
        const payment =
await Payment.create({

booking_id:
req.body.booking_id,

customer_name:
req.body.customer_name,
customer_id:
req.body.customer_id || null,
service_name:
req.body.service_name,
service_id:
req.body.service_id || null,

amount:
req.body.amount,

payment_method:
req.body.payment_method,

payment_status:
req.body.payment_status,
transaction_id:
req.body.transaction_id || null,

payment_date:
req.body.payment_date || null,

refund_amount:
req.body.refund_amount || null,

refund_reason:
req.body.refund_reason || null,

processed_by:
req.body.processed_by || null

});

        res.status(201).json({
            success: true,
            message: "Payment created successfully",
            data: payment
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getAllPayments = async (req, res) => {

    try {

        const payments = await Payment.findAll();

        res.status(200).json({
            success: true,
            data: payments
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const updatePaymentStatus = async (req, res) => {

    try {

        const { id } = req.params;

        const { payment_status } = req.body;

        const payment = await Payment.findByPk(id);

        if (!payment) {
            return res.status(404).json({
                success: false,
                message: "Payment not found"
            });
        }

        await payment.update({
            payment_status
        });

        res.status(200).json({
            success: true,
            message: "Payment status updated",
            data: payment
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getRevenue = async (req, res) => {

    try {

        const payments = await Payment.findAll({
            where: {
                payment_status: "paid"
            }
        });

        let totalRevenue = 0;

        payments.forEach((payment) => {
            totalRevenue += payment.amount;
        });

        res.status(200).json({
            success: true,
            total_revenue: totalRevenue
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    createPayment,
    getAllPayments,
    updatePaymentStatus,
    getRevenue
};