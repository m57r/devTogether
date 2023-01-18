const { Model, DataTypes } = require('sequelize'); 
const sequelize= require('../database'); 

class Project extends Model{}

Project.init({
	name : {
		type : DataTypes.TEXT, 
		allowNull: false
	}, 
	description : {
		type : DataTypes.TEXT, 
		allowNull: false
	}, 
	team_description : {
		type : DataTypes.TEXT, 
		allowNull: false
	}, 
	repo_github : {
		type : DataTypes.TEXT, 
		allowNull: false
	},
	recruiting : {
		type : DataTypes.BOOLEAN, 
		allowNull: false, 
		defaultValue : true
	},
	createdAt : {
		type : DataTypes.DATE, 
		allowNull: false, 
	},
},{
	sequelize, 
	tableName: 'project'
});

module.exports = Project;