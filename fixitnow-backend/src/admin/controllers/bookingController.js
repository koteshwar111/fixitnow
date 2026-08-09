const Booking = require("../models/Booking");
const Tasker =
require("../models/Tasker");

const createBooking = async (req, res) => {

    try {

        const booking =
await Booking.create({

customer_name:
req.body.customer_name,

service_name:
req.body.service_name,

customer_id:
req.body.customer_id || null,

service_id:
req.body.service_id || null,

tasker_id:
req.body.tasker_id || null,

address_id:
req.body.address_id || null,

booking_date:
req.body.booking_date,

service_date:
req.body.service_date,

service_time:
req.body.service_time,

booking_status:
req.body.booking_status,

total_amount:
req.body.total_amount,

notes:
req.body.notes || null,

cancel_reason:
req.body.cancel_reason || null

});
if(
req.body.tasker_id
){

await Tasker.update(

{

availability_status:
"busy"

},

{

where:{

id:
req.body.tasker_id

}

}

);

}

        
res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: booking
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getAllBookings = async (req, res) => {

    try {

        const bookings = await Booking.findAll({

order: [
["createdAt","DESC"]
]

});

        res.status(200).json({
            success: true,
            data: bookings
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const updateBookingStatus = async (req, res) => {

    try {

        const { id } = req.params;

        const { booking_status } = req.body;

        const booking = await Booking.findByPk(id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

       await booking.update({
booking_status
});

if(

(

booking_status
===

"completed"

||

booking_status
===

"cancelled"

)

&&

booking.tasker_id

){

await Tasker.update(

{

availability_status:
"available"

},

{

where:{
id:
booking.tasker_id
}

}

);

}
        res.status(200).json({
            success: true,
            message: "Booking status updated",
            data: booking
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
const deleteBooking =
async(req,res)=>{

try{

const {id}=req.params;

const booking =
await Booking.findByPk(
id
);

if(
!booking
){

return res.status(404).json({

success:false,

message:
"Booking not found"

});

}

await booking.destroy();

res.status(200).json({

success:true,

message:
"Booking Deleted"

});

}

catch(error){

res.status(500).json({

success:false,

message:
error.message

});

}

};
module.exports = {
    createBooking,
    getAllBookings,
    updateBookingStatus,
    deleteBooking

};