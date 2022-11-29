const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Card extends Model {}

Card.init({
	content: {
		type: DataTypes.TEXT,
		allowNull: false,
		unique: true,
	},
	position: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 0,
	},
	color: {
		type: DataTypes.TEXT,
		allowNull: false,
		defaultValue: '#FFFFFF',
	},
}, {
	sequelize,
	tableName: 'card',
});

module.exports = Card;