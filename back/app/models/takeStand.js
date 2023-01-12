const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class TakeStand extends Model {}

TakeStand.init({
	status: {
		type: DataTypes.STRING,
		allowNull: false, 
		defaultValue: 'waiting',
	}
}, {
	sequelize, 
	tableName : 'take_stand'
});

module.exports = TakeStand;