const { Model, DataTypes } = require('sequelize'); 
const sequelize= require('../database'); 

class Language extends Model{}

Language.init({
	name : {
		type : DataTypes.TEXT, 
		allowNull: false
	}
},{
	sequelize, 
	tableName: 'language'
});

module.exports = Language; 