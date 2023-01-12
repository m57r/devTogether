const { Project, User, WorkOn, Role, UserRole, TakeStand, Technology } = require('../models');
const { escape } = require('sanitizer');

const projectManagerController = {

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
			const { name, description, team_description, repo_github, recruiting } = req.body; 
			const userId = Number(req.token.userId); 

			const project = await Project.findByPk(projectId); 

			if(!userId){
				const error = new Error('"userId" property is missing');
				return res.status(400).json({message: error.message}); 
			}
			
			if(!project){
				const error = new Error(`Project with id ${projectId} does not exist`); 
				return res.status(404).json({message : error.message});
			}
			//Check if the modification is requested by the project manager
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
			const { technologiesIdList } = req.body; 

			const userId = Number(req.token.userId); 

			let project = await Project.findByPk(projectId, {
				include : 'technologies'
			}); 
			if(!project){
				const error = new Error(`Project with id ${projectId} doesn't exist`); 
				return res.status(404).json({message : error.message}); 
			}
			//Check if the modification is requested by the project manager
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
			
			const projectManagerId= Number(req.token.userId); 
			const { userId, projectId } = escape(req.params);
		
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
			//Check if the modification is requested by the project manager
			if(projectManagerId != project.user_id){
				const error = new Error(`User with id ${projectManagerId} can't modify this project`); 
				return res.status(404).json({message : error.message});
			}

			if(!project.recruiting){
				const error = new Error(`Project team with id ${projectId} is complete`);
				return  res.status(404).json({message : error.message}); 
			}
            
			const user = await User.findByPk(userId); 
			if (!user) {
				const error = new Error(`User with id ${userId} does not exist.`);
				return res.status(404).json({message: error.message});
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
			
			const projectManagerId= Number(req.token.userId); 
			const { userId, projectId } = escape(req.params);

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

			//Check if the modification is requested by the project manager
			if(projectManagerId != project.user_id){
				const error = new Error(`User with id ${ projectManagerId } can't modify this project`); 
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
			const roleId = Number(req.body.roleId);
			const projectManagerId= Number(req.token.userId); 
			const { userId, projectId } = escape(req.params);

			if(!roleId){
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
			
			//Check if the modification is requested by the project manager
			const project = await Project.findByPk(projectId); 
			if(!project){
				const error = new Error(`Project with id ${projectId} not found`);
				return  res.status(404).json({message : error.message}); 
			}
			if(projectManagerId != project.user_id){
				const error = new Error(`User with id ${ projectManagerId } can't modify this project`); 
				return res.status(404).json({message : error.message});
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

	//Refuser un utilisateur
	/** @function 
   * Change status of take stand table - product manager denied user on project
   * @param { Number } projectId- project's id
   * @param { Number } pendingUserId- pending user's id
   * @param { Number } userId- project manager's id
   */
	async deniedUserOnProject(req,res){
		try {
			const { projectId, pendingUserId } = req.params; 
			const userId = Number(req.token.userId); 

			if(!userId){
				const error = new Error('"userId" property is missing');
				return res.status(400).json({message: error.message}); 
			}

			if(!Number(pendingUserId)){
				const error = new Error('"pendingUserId" property is missing');
				return res.status(400).json({message: error.message}); 
			}

			if(!Number(projectId)){
				const error = new Error('"projectId" property is missing');
				return res.status(400).json({message: error.message}); 
			}

			let pendingUserOneProject = await TakeStand.findOne({
				where : {
					user_id : pendingUserId, 
					project_id : projectId
				}
			}); 
			if(!pendingUserOneProject){
				const error = new Error(`user with  id ${userId} positioned on project with id ${projectId} does not exist`); 
				return res.status(404).json({ message: error.message });
			}
			
			const project = await Project.findByPk(projectId); 
			if(!project){
				const error = new Error(`project with  id ${projectId} does not exist`); 
				return res.status(404).json({ message: error.message });
			}
			//Check if the modification is requested by the project manager
			if(userId != project.user_id){
				const error = new Error(`User with id ${ userId } can't modify this project`); 
				return res.status(404).json({message : error.message});
			}

			pendingUserOneProject.status = 'denied'; 
			await pendingUserOneProject.save(); 

			res.status(201).json(pendingUserOneProject); 

		} catch (error) {
			console.error(error); 
			res.status(500).json({message : error.message}); 
		}
	}
};

module.exports = projectManagerController; 