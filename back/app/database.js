const { Sequelize } = require('sequelize'); 

const sequelize = new Sequelize(process.env.PG_URL, {
	define: {
		underscored: true,
		// logging : false,
		createdAt: 'created_at',
		updatedAt: 'updated_at',
		timestamps : false, 
	},
});

module.exports = sequelize;