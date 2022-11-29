const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class List extends Model {}

List.init({
	name: {
		type: DataTypes.TEXT,
		allowNull: false,
		unique: true,
	},
	position: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 0,
	},
}, {
	sequelize,
	tableName: 'list',
});

module.exports = List;