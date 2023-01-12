const { Project } = require('../models');
const { escape } = require('sanitizer');

const projectController = {

	/** @function 
   * Retrieve all project with author, technologies, users
   * @returns {[]} array containing all projects.
   */
	async getAllProjects(req, res){
		try{
			const pageNumber = Number(req.query.pageNumber); 
			const limit = 6; 

			if(isNaN(pageNumber)|| pageNumber <0 ){
				const error = new Error('This page doesn\'t exist');
				return  res.status(404).json({message : error.message}); 
			}

			const projectsList = await Project.findAndCountAll({
				include : [
					{ association : 'author'},
					{ association : 'technologies'}, 
					{ association : 'team_users'}
				], 
				order : [
					[ 'created_at', 'DESC']
				], 
				subQuery: false,
				offset : pageNumber * limit, 
				limit : limit
			});

			if(projectsList.rows.length <= 0){
				const error = new Error('This page doesn\'t exist');
				return  res.status(404).json({message : error.message}); 
			}

			const totalProjectCount = await Project.count(); 

			res.status(200).json({
				content : projectsList.rows, 
				totalPages : Math.ceil(totalProjectCount/ limit),
			});

		}catch(error){
			console.error(error); 
			res.status(500).json({message : error.message}); 
		}
	}, 

	/** @function 
   * Retrieves project corresponding to the id with technologies, author and users with role on the project
   * @param {number} id 
   * @returns {(Object)} project
   */
	async getOneProjectById(req, res){
		try {
			const projectId = Number(req.params.projectId); 
			const project = await Project.findByPk(projectId, {
				include : [
					{ association : 'technologies' }, 
					{ association : 'author' }, 
					{ association : 'likers'},
					{ association : 'team_users', 
						include : 
							{ 
								association : 'workon_user', 
								where : {
									project_id : projectId
								}, 
								include : {
									association : 'user_roles',	
								}
							}, 
					},
					{ association : 'positioned_users' }
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

	/** @function 
   * Create project in database
   * @param {String} name- project's name
   * @param {String} description -project's description
   * @param {String} team_description - team's appellation
   * @param {String} repo_github- project's repo_github
   * @param {Number} userId - author's id
   */
	async createProject(req,res){
		try{

			const { name, description, team_description, repo_github } = req.body; 
			const userId = Number(req.token.userId); 
			
			if(!name){
				const error = new Error('"name" property is missing');
				return res.status(400).json({message: error.message}); 
			}
			if (!description) {
				const error = new Error('"description" property is missing');
				return res.status(400).json({ message: error.message });
			}
			if (!team_description) {
				const error = new Error('"team_description" property is missing');
				return res.status(400).json({ message: error.message });
			}
			if (!repo_github) {
				const error = new Error('"repo_github" property is missing');
				return res.status(400).json({ message: error.message });
			}
			if(!Number(userId)){
				const error = new Error('"userId" property is missing');
				return res.status(400).json({ message: error.message });
			}

			const newProject = Project.build({
				name : escape(name), 
				description : escape(description),
				team_description : escape(team_description),
				repo_github : escape(repo_github),
				user_id: escape(userId)
			});
            
			await newProject.save(); 
			res.status(201).json(newProject);

            
		}catch(error){
			console.error(error); 
			res.status(500).json({message : error.message});     
		}
	}, 

};

module.exports = projectController; 