const { Model, DataTypes } = require('sequelize'); 
const sequelize= require('../database'); 

class Technology extends Model{}

Technology.init({
	name : {
		type : DataTypes.TEXT, 
		allowNull: false
	}, 
	color: {
		type : DataTypes.TEXT, 
		allowNull: false
	}, 
},{
	sequelize, 
	tableName: 'technology'
});

module.exports = Technology; 