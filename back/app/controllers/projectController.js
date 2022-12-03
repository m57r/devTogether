const { Project } = require('../models');

const projectController = {

	async getAllProjects(_req, res){
		try{
			const projectsList = await Project.findAll({
				include : [
					{ association : 'author' },
					{ association : 'technologies'}, 
					{ association : 'likers'}
				], 
				order : [
					[ 'created_at', 'ASC']
				]
			});

			res.status(200).json(projectsList); 

		}catch(error){
			console.error(error); 
			res.status(500).json({message : error.message}); 
		}
	}, 

	async getOneProjectById(req, res){
		try {
			const projectId = req.params.id; 
			const project = await Project.findByPk(projectId, {
				include : [
					{ association : 'technologies' }, 
					{ association : 'likers' },
					{ association : 'author'}
				]
			});

			if(!project){
				const error = new Error(`Project with id ${projectId} not found`);
				return  res.status(404).json({message : error.message}); 
			}

			res.status(200).json(project); 

		} catch (error) {
			console.error(error); 
			res.status(500).json({message : error.message}); 
		}
	}, 

    


};

module.exports = projectController; 