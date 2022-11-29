const { Model, DataTypes } = require('sequelize'); 
const sequelize= require('../database'); 

class Conversation extends Model{}

Conversation.init({
	title : {
		type : DataTypes.TEXT, 
		allowNull: false,
		defaultValue : 'chat'
	}
},{
	sequelize, 
	tableName: 'conversation'
});

module.exports = Conversation; 