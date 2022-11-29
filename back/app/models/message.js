const { Model, DataTypes } = require('sequelize'); 
const sequelize= require('../database'); 

class Message extends Model{}

Message.init({
	content : {
		type : DataTypes.TEXT, 
		allowNull: false
	}, 
	read : {
		type : DataTypes.BOOLEAN, 
		allowNull: false
	}
},{
	sequelize, 
	tableName: 'message'
});

module.exports = Message; 