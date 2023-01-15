const { Category, Technology } = require('../models');

const filterController = {

	async getAllTechnologiesByCategory(_req, res){
		try {
			const categoryList = await Category.findAll({
				include : [
					{ association : 'technologies' }
				]
			});
			res.status(200).json(categoryList); 
		} catch (error) {
			console.error(error); 
			res.status(500).json({message : error.message}); 
		}
	}, 

	async getAllTechnologies(_req, res){
		try {
			const technologyList = await Technology.findAll();
			res.status(200).json(technologyList); 
		} catch (error) {
			console.error(error); 
			res.status(500).json({message : error.message}); 
		}
	} 

};

module.exports = filterController; 