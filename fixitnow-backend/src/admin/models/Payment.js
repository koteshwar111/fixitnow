const { DataTypes } = require("sequelize");

const sequelize = require("../../database/db");

const Payment = sequelize.define("Payment", {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    booking_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

   customer_name: {
type: DataTypes.STRING,
allowNull: false
},

service_name: {
type: DataTypes.STRING,
allowNull: false
},

    amount: {
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

transaction_id:{
type:DataTypes.STRING,
allowNull:true
},

payment_date:{
type:DataTypes.DATE,
allowNull:true
},

refund_amount:{
type:DataTypes.FLOAT,
allowNull:true
},

refund_reason:{
type:DataTypes.TEXT,
allowNull:true
},

processed_by:{
type:DataTypes.INTEGER,
allowNull:true
},

    payment_method: {
        type: DataTypes.ENUM(
            "UPI",
            "CARD",
            "NETBANKING",
            "CASH"
        ),
        allowNull: false
    },

    payment_status: {
        type: DataTypes.ENUM(
            "pending",
            "paid",
            "failed",
            "refunded"
        ),
        defaultValue: "pending"
    }

}, {
    tableName: "payments",
    timestamps: true
});
Payment.associate=(models)=>{

Payment.belongsTo(
models.Booking,
{
foreignKey:"booking_id"
}
);

};

module.exports = Payment;