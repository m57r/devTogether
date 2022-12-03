//we define the model ourselves to add the content column to the "recommendation" association table

const { Model, DataTypes} = require('sequelize'); 
const sequelize = require('../database'); 

class Recommendation extends Model {}

Recommendation.init({
	content : {
		type : DataTypes.TEXT, 
		allowNull : false
	}
},{
	sequelize, 
	tableName: 'recommendation', 
	timestamps: false,
});

module.exports = Recommendation; 