const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class UserRole extends Model {}

UserRole.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	}
}, {
	sequelize, 
	tableName : 'user_has_role'
});

module.exports = UserRole;