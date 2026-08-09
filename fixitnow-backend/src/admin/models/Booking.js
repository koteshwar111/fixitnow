const { DataTypes } = require("sequelize");

const sequelize = require("../../database/db");

const Booking = sequelize.define("Booking", {

id: {
type: DataTypes.INTEGER,
autoIncrement: true,
primaryKey: true
},

customer_name: {
type: DataTypes.STRING,
allowNull: false
},

service_name: {
type: DataTypes.STRING,
allowNull: false
},

booking_date: {
type: DataTypes.DATE,
allowNull: false
},

booking_status: {
type: DataTypes.ENUM(
"pending",
"assigned",
"in_progress",
"completed",
"cancelled"
),
defaultValue: "pending"
},

total_amount: {
type: DataTypes.FLOAT,
allowNull: false
},

customer_id:{
type:DataTypes.INTEGER,
allowNull:true
},

service_id:{
type:DataTypes.INTEGER,
allowNull:true
},

tasker_id:{
type:DataTypes.INTEGER,
allowNull:true
},

address_id:{
type:DataTypes.INTEGER,
allowNull:true
},

notes:{
type:DataTypes.TEXT,
allowNull:true
},

cancel_reason:{
type:DataTypes.TEXT,
allowNull:true
},

service_date: {
type: DataTypes.DATEONLY,
allowNull: false
},

service_time: {
type: DataTypes.STRING,
allowNull: false
}

},{

tableName:"bookings",

timestamps:true

});
Booking.associate=(models)=>{

Booking.belongsTo(
models.Tasker,
{
foreignKey:"tasker_id"
}
);

Booking.hasMany(
models.Payment,
{
foreignKey:"booking_id"
}
);

};

module.exports = Booking;