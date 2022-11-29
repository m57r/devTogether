const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Tag extends Model {}

Tag.init({
	name: {
		type: DataTypes.TEXT,
		allowNull: false,
		unique: true,
	},
	color: {
		type: DataTypes.TEXT,
		allowNull: false,
		defaultValue: '#FFFFFF',
	},
}, {
	sequelize,
	tableName: 'tag',
});

module.exports = Tag;