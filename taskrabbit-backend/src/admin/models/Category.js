const { DataTypes } = require("sequelize");

const sequelize = require("../../database/db");

const Category = sequelize.define("Category", {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    description: {
        type: DataTypes.TEXT
    },
    image:{
type:DataTypes.STRING,
allowNull:true
},

status:{
type:DataTypes.ENUM(
"active",
"inactive"
),
defaultValue:"active"
},

display_order:{
type:DataTypes.INTEGER,
allowNull:true
},

is_featured:{
type:DataTypes.BOOLEAN,
defaultValue:false
},

    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
    

}, 
{
    tableName: "categories",
    timestamps: true
});
Category.associate=(models)=>{

Category.hasMany(
models.Tasker,
{
foreignKey:"category_id"
}
);

};
module.exports = Category;