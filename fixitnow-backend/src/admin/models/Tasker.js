const { DataTypes } = require("sequelize");

const sequelize = require("../../database/db");

const Tasker = sequelize.define("Tasker", {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    full_name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },

    service_category: {
        type: DataTypes.STRING,
        allowNull: false
    },

    experience: {
        type: DataTypes.INTEGER
    },

    approval_status: {
        type: DataTypes.ENUM(
            "pending",
            "approved",
            "rejected"
        ),
        defaultValue: "pending"
    },

    is_active: {
type: DataTypes.BOOLEAN,
defaultValue: true
},

category_id:{
type:DataTypes.INTEGER,
allowNull:true
},

availability_status:{
type:DataTypes.ENUM(
"available",
"busy",
"offline"
),

defaultValue:
"available"

},
address_id:{
type:DataTypes.INTEGER,
allowNull:true
},

verification_status:{
type:DataTypes.ENUM(
"pending",
"verified",
"rejected"
),
allowNull:true
},

rating:{
type:DataTypes.FLOAT,
allowNull:true
},

total_reviews:{
type:DataTypes.INTEGER,
allowNull:true
}

}, {
    tableName: "taskers",
    timestamps: true
});
Tasker.associate=(models)=>{

Tasker.hasMany(
models.Booking,
{
foreignKey:"tasker_id"
}
);

Tasker.belongsTo(
models.Category,
{
foreignKey:"category_id"
}
);

};

module.exports = Tasker;