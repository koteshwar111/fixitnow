const Tasker = require("../models/Tasker");

const createTasker = async (req, res) => {

    try {

        const tasker =
await Tasker.create({

full_name:
req.body.full_name,

email:
req.body.email,

phone:
req.body.phone,

service_category:
req.body.service_category,

category_id:
req.body.category_id || null,

experience:
req.body.experience,

approval_status:
req.body.approval_status,

is_active:
req.body.is_active,

availability_status:
req.body.availability_status || null,

address_id:
req.body.address_id || null,

verification_status:
req.body.verification_status || null,

rating:
req.body.rating || null,

total_reviews:
req.body.total_reviews || null

});

        res.status(201).json({
            success: true,
            message: "Tasker created successfully",
            data: tasker
        });

    } catch (error) {
        console.log(
"CREATE TASKER ERROR:",
error
);


        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getAllTaskers = async (req, res) => {

    try {

        const taskers = await Tasker.findAll();

        res.status(200).json({
            success: true,
            data: taskers
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const approveTasker = async (req, res) => {

    try {

        const { id } = req.params;

        const tasker = await Tasker.findByPk(id);

        if (!tasker) {
            return res.status(404).json({
                success: false,
                message: "Tasker not found"
            });
        }

        await tasker.update({
            approval_status: "approved"
        });

        res.status(200).json({
            success: true,
            message: "Tasker approved successfully",
            data: tasker
        });

    } catch (error) {
        

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
const deleteTasker =
async(req,res)=>{

try{

const {id}=req.params;

const tasker =
await Tasker.findByPk(id);

if(!tasker){

return res.status(404).json({

success:false,

message:
"Tasker not found"

});

}

await tasker.destroy();

res.status(200).json({

success:true,

message:
"Tasker Deleted"

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
const updateTasker =
async(req,res)=>{

try{

const {id}=req.params;

const tasker =
await Tasker.findByPk(
id
);

if(
!tasker
){

return res.status(404).json({

success:false,

message:
"Tasker not found"

});

}

await tasker.update(
req.body
);

res.status(200).json({

success:true,

message:
"Tasker Updated",

data:
tasker

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
    createTasker,
    getAllTaskers,
    approveTasker,
    deleteTasker,
    updateTasker 
};