const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class WorkOn extends Model {}

WorkOn.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	}

}, {
	sequelize, 
	tableName : 'work_on'
});

module.exports = WorkOn;