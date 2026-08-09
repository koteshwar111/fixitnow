const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./src/database/db");
const Admin = require("./src/admin/models/Admin");
const adminAuthRoutes = require("./src/admin/routes/adminAuthRoutes");
const adminProtectedRoutes = require("./src/admin/routes/adminProtectedRoutes");
const adminDashboardRoutes = require("./src/admin/routes/adminDashboardRoutes");
const Category = require("./src/admin/models/Category");
const categoryRoutes = require("./src/admin/routes/categoryRoutes");
const SubCategory = require("./src/admin/models/SubCategory");
const subCategoryRoutes = require("./src/admin/routes/subCategoryRoutes");
const Tasker = require("./src/admin/models/Tasker");
const taskerRoutes = require("./src/admin/routes/taskerRoutes");
const Booking = require("./src/admin/models/Booking");
const bookingRoutes = require("./src/admin/routes/bookingRoutes");
const Payment = require("./src/admin/models/Payment");
const paymentRoutes = require("./src/admin/routes/paymentRoutes");
const Coupon = require("./src/admin/models/Coupon");
const couponRoutes = require("./src/admin/routes/couponRoutes");
const Banner = require("./src/admin/models/Banner");
const bannerRoutes = require("./src/admin/routes/bannerRoutes");


const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/admin", adminProtectedRoutes);
app.use("/api/admin/dashboard", adminDashboardRoutes);
app.use("/api/admin/categories", categoryRoutes);
app.use("/api/admin/subcategories", subCategoryRoutes);
app.use("/api/admin/taskers", taskerRoutes);
app.use("/api/admin/bookings", bookingRoutes);
app.use("/api/admin/payments", paymentRoutes);
app.use("/api/admin/coupons", couponRoutes);
app.use("/api/admin/banners", bannerRoutes);


app.get("/", (req, res) => {
    res.send("TaskRabbit Admin Backend Running");
});

sequelize.authenticate()
.then(() => {
    console.log("Database Connected Successfully");
})
.catch((err) => {
    console.log("Database Connection Failed", err);
});
sequelize.sync()
.then(() => {
    console.log("All Tables Created Successfully");
});

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});