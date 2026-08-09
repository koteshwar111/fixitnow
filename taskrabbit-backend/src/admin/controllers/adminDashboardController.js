const Category =
require("../models/Category");

const Tasker =
require("../models/Tasker");

const Booking =
require("../models/Booking");

const Payment =
require("../models/Payment");

const getDashboardStats =
async (req,res)=>{

try{

const totalCategories =
await Category.count();

const totalTaskers =
await Tasker.count();

const totalBookings =
await Booking.count();

const totalRevenue =
await Payment.sum("amount") || 0;

res.status(200).json({

success:true,

dashboard:{

total_categories:
totalCategories,

total_taskers:
totalTaskers,

total_bookings:
totalBookings,

revenue:
totalRevenue

}

});

}

catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};

module.exports = {
getDashboardStats
};