const { Project, User, WorkOn, Role, UserRole, Technology } = require('../models');
const { escape } = require('sanitizer');

const projectController = {

	/** @function 
   * Retrieve all project with author, technologies, users
   * @returns {[]} array containing all projects.
   */
	async getAllProjects(_req, res){
		try{
			const projectsList = await Project.findAll({
				include : [
					{ association : 'author'},
					{ association : 'technologies'}, 
					{ association : 'team_users'}
				], 
				order : [
					[ 'created_at', 'DESC']
				]
			});

			res.status(200).json(projectsList); 

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

			const { name, description, team_description, repo_github, userId } = req.body; 
			
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
    
	/** @function 
   * Update project in database
   * @param {Number} projectId- project's id
   * @param {Number} userId- user's id
   * @param {String} [name] - project's name
   * @param {String} [description] - project's description
   * @param {String} [team_description] - team's appellation
   * @param {String} [repo_github] - project's repo_github
   * @param {Boolean} [recruiting] - project's recruiting state
   */
	async updateProjectById(req, res){
		try{
			const projectId = escape(Number(req.params.projectId));  
			const { name, description, team_description, repo_github, recruiting, userId} = req.body; 
			const project = await Project.findByPk(projectId); 

			if(!Number(userId)){
				const error = new Error('"userId" property is missing');
				return res.status(400).json({message: error.message}); 
			}

			if(!project){
				const error = new Error(`Project with id ${projectId} does not exist`); 
				return res.status(404).json({message : error.message});
			}

			if(userId != project.user_id){
				const error = new Error(`User with id ${ userId } can't modify this project`); 
				return res.status(404).json({message : error.message});
			}

			if(name){
				project.name = escape(name); 
			}

			if(description){
				project.description = escape(description); 
			}

			if(team_description){
				project.name = escape(team_description); 
			}

			if(repo_github){
				project.name = escape(repo_github); 
			}

			if(recruiting){
				project.recruiting = escape(recruiting); 
			}

			await project.save(); 
			res.status(200).json(project); 

		}catch(error){
			console.error(error);
			res.status(500).json({ message: error.message }); 
		}
	}, 

	/** @function 
   * associate technologies to project
   * @param { Array } id- technology's id in array
   * @param { Number } projectManagerId- project manager's id
   * @param { Number } projectId - project's id
   */
	async addTechnologiesOnProject(req,res){
		try {
			const projectId = Number(req.params.projectId); 
			const { technologiesIdList, userId } = req.body; 

			let project = await Project.findByPk(projectId, {
				include : 'technologies'
			}); 
			if(!project){
				const error = new Error(`Project with id ${projectId} doesn't exist`); 
				return res.status(404).json({message : error.message}); 
			}

			if(userId != project.user_id){
				const error = new Error(`User with id ${ userId } can't modify this project`); 
				return res.status(404).json({message : error.message});
			}

			let technologiesList = []; 
			for(const id of technologiesIdList){
				const technology = await Technology.findByPk(id); 
				if(technology){
					const error = new Error(`Technology with id ${id} does not exist.`); 
					return res.status(404).json({message : error.message}); 
				}
				technologiesList.push(technology); 
			}

			await project.addTechnologies(technologiesList); 

			project = await Project.findByPk(projectId, {
				include : 'technologies'
			}); 
			
			res.status(201).json(project); 

		} catch (error) {
			console.error(error);
			res.status(500).json({ message: error.message }); 
		}
	}, 

	/** @function 
   * Associate user on project (workon table) and remove project on takeStand table 
   * @param { Number } projectId- project's id
   * @param { Number } projectManagerId- project manager's id
   * @param { Number } userId- project's id
   */
	async acceptUserOnProject(req,res){
		try {
			
			const userId= Number(req.body.userId);
			const projectManagerId = Number(req.body.productManagerId);
			const projectId = escape(Number(req.params.projectId)); 

			if(!Number(userId)){
				const error = new Error('"userId" property is missing');
				return res.status(400).json({message: error.message}); 
			}

			if(!Number(projectId)){
				const error = new Error('"projectId" property is missing');
				return res.status(400).json({message: error.message}); 
			}

			let project = await Project.findByPk(projectId); 

			if(!project){
				const error = new Error(`Project with id ${projectId} not found`);
				return  res.status(404).json({message : error.message}); 
			}

			if(projectManagerId != project.user_id){
				const error = new Error(`User with id ${ userId } can't modify this project`); 
				return res.status(404).json({message : error.message});
			}

			if(!project.recruiting){
				const error = new Error(`Project team with id ${projectId} is complete`);
				return  res.status(404).json({message : error.message}); 
			}
            
			const user = await User.findByPk(userId); 
			if (!user) {
				const error = new Error(`User with id ${userId} does not exist.`);
				return res.status(404).json({ message: error.message });
			}

			await project.addTeam_users(user); 
			await project.removePositioned_users(user); 

			project = await Project.findByPk(projectId, {
				include : 
				[
					{ association : 'team_users' }, 
					{ association : 'positioned_users' }
				]
			});

			res.status(201).json(project); 

		} catch (error) {
			console.error(error); 
			res.status(500).json({message : error.message}); 
		}
	}, 

	/** @function 
   * Remove user on project (workon table)
   * @param { Number } projectId- project's id
   * @param { Number } projectManagerId- project manager's id
   * @param { Number } userId- project's id
   */
	async removeUserOnProject(req,res){
		try {
			
			const userId= Number(req.body.userId);
			const projectManagerId = Number(req.body.productManagerId);
			const projectId = escape(Number(req.params.projectId)); 

			if(!Number(userId)){
				const error = new Error('"userId" property is missing');
				return res.status(400).json({message: error.message}); 
			}

			if(!Number(projectId)){
				const error = new Error('"projectId" property is missing');
				return res.status(400).json({message: error.message}); 
			}

			let project = await Project.findByPk(projectId); 

			if(!project){
				const error = new Error(`Project with id ${projectId} not found`);
				return  res.status(404).json({message : error.message}); 
			}

			if(projectManagerId != project.user_id){
				const error = new Error(`User with id ${ userId } can't modify this project`); 
				return res.status(404).json({message : error.message});
			}
            
			const user = await User.findByPk(userId); 
			if (!user) {
				const error = new Error(`User with id ${userId} does not exist.`);
				return res.status(404).json({ message: error.message });
			}

			await project.removeTeam_users(user); 

			project = await Project.findByPk(projectId, {
				include : 
				[
					{ association : 'team_users' }
				]
			});

			res.status(201).json(project); 

		} catch (error) {
			console.error(error); 
			res.status(500).json({message : error.message}); 
		}
	}, 

	/** @function 
   * Associate role to user on project (condition : product Manager, lead Dev Front and lead Dev Back unique) 
   * @param { Number } projectId- project's id
   * @param { Number } roleId- role's id
   * @param { Number } userId- project's id
   */
	async giveRoleToUser(req,res){
		try {
			const { userId, roleId } = req.body;
			const projectId = escape(Number(req.params.projectId)); 

			if(!Number(roleId)){
				const error = new Error('"roleId" property is missing');
				return res.status(400).json({message: error.message}); 
			}

			if(!Number(userId)){
				const error = new Error('"userId" property is missing');
				return res.status(400).json({message: error.message}); 
			}

			if(!Number(projectId)){
				const error = new Error('"projectId" property is missing');
				return res.status(400).json({message: error.message}); 
			}
			
			//Check if the user work on the project
			let userWithProject = await WorkOn.findOne({
				where : {
					user_id : userId, 
					project_id : projectId
				}
			});
			if(!userWithProject){
				const error = new Error(`user with id ${userId} on project with id ${projectId} does not exist`); 
				return res.status(404).json({ message: error.message });
			}

			//Check if the role exists
			const role = await Role.findByPk(roleId); 
			if(!role){
				const error = new Error(`'role' with id ${roleId} does not exist`); 
				return res.status(404).json({ message: error.message });
			}
			//if the role exists and matches product Manager, lead Dev Front or Lead Dev Back role, I check if the
			// role is not already assigned
			if(role.name === 'product Manager' || role.name === 'lead Dev Front' || role.name === 'lead Dev Back'){
				const rolesOnProject = await UserRole.findOne({
					where : {
						work_on_id : userWithProject.id,
						role_id : roleId
					}
				});
				if(rolesOnProject){
					const error = new Error(`user with role with id ${roleId} already exist on project`); 
					return res.status(404).json({ message: error.message });
				}
			}

			await userWithProject.addUser_roles(role); 

			userWithProject = await WorkOn.findOne({
				where : {
					user_id : userId, 
					project_id : projectId
				}, 
				include : {
					association : 'user_roles'
				}
			});

			res.status(201).json(userWithProject); 


		} catch (error) {
			console.error(error); 
			res.status(500).json({message : error.message}); 
		}
	}, 

	/** @function 
   * Associate user on project ( takeStand table ) - user take stand on a project
   * @param { Number } projectId- project's id
   * @param { Number } userId- project's id
   */
	async takeStandOnProject(req,res){
		try {
			const userId= Number(req.body.userId);
			const projectId = escape(Number(req.params.projectId)); 

			if(!Number(userId)){
				const error = new Error('"userId" property is missing');
				return res.status(400).json({message: error.message}); 
			}

			if(!Number(projectId)){
				const error = new Error('"projectId" property is missing');
				return res.status(400).json({message: error.message}); 
			}

			let project = await Project.findByPk(projectId); 

			if(!project){
				const error = new Error(`Project with id ${projectId} not found`);
				return  res.status(404).json({message : error.message}); 
			}
            
			const user = await User.findByPk(userId); 
			if (!user) {
				const error = new Error(`User with id ${userId} does not exist.`);
				return res.status(404).json({ message: error.message });
			}

			await project.addPositioned_users(user); 

			project = await Project.findByPk(projectId, {
				include : 'positioned_users'
			});

			res.status(201).json(project); 

			
		} catch (error) {
			console.error(error); 
			res.status(500).json({message : error.message}); 
		}
	}, 

	// TO DO : RECUPERER L'USER DE L'ID DANS UN TOKEN : SEUL L'UTILISATEUR PEUT SE RETIRER D'UN PROJET
	/** @function 
   * remove user on project ( takeStand table ) - user withdraw from a project
   * @param { Number } projectId- project's id
   * @param { Number } userId- project's id
   */
	async withdrawFromProject(req,res){
		try {
			const userId= Number(req.body.userId);
			const projectId = escape(Number(req.params.projectId)); 

			if(!Number(userId)){
				const error = new Error('"userId" property is missing');
				return res.status(400).json({message: error.message}); 
			}

			if(!Number(projectId)){
				const error = new Error('"projectId" property is missing');
				return res.status(400).json({message: error.message}); 
			}

			let project = await Project.findByPk(projectId); 

			if(!project){
				const error = new Error(`Project with id ${projectId} not found`);
				return  res.status(404).json({message : error.message}); 
			}
            
			const user = await User.findByPk(userId); 
			if (!user) {
				const error = new Error(`User with id ${userId} does not exist.`);
				return res.status(404).json({ message: error.message });
			}

			await project.removePositioned_users(user); 

			project = await Project.findByPk(projectId, {
				include : 'positioned_users'
			});

			res.status(201).json(project); 

			
		} catch (error) {
			console.error(error); 
			res.status(500).json({message : error.message}); 
		}
	}, 







};

module.exports = projectController; 