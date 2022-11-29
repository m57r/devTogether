const { Model, DataTypes } = require('sequelize'); 
const sequelize= require('../database'); 

class User extends Model{}

User.init({
	firstname : {
		type : DataTypes.TEXT, 
		allowNull: false
	}, 
	lastname : {
		type : DataTypes.TEXT, 
		allowNull: false
	}, 
	email : {
		type : DataTypes.TEXT, 
		allowNull: false
	}, 
	password : {
		type : DataTypes.TEXT, 
		allowNull: false
	},
	avatar : {
		type : DataTypes.TEXT, 
		allowNull: true
	},
	active : {
		type : DataTypes.BOOLEAN, 
		allowNull: false, 
		defaultValue : true
	},
	speciality : {
		type : DataTypes.TEXT, 
		allowNull: false, 
	},
	linkedin_link : {
		type : DataTypes.TEXT, 
		allowNull: true, 
	},
	github_link : {
		type : DataTypes.TEXT, 
		allowNull: true, 
	},
},{
	sequelize, 
	tableName: 'user'
});

module.exports = User;