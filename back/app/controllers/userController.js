const { Project, User, Technology, Language } = require('../models');
const { escape } = require('sanitizer');
const { Op } = require('sequelize');


const userController = {
	/** @function 
   * Retrieve all users with technologies, languages and followers
   * @param {number} pageNumber
   * @param {string} [searchText]
   * @param { Array } [technologies] technology's id in array
   * @returns {[]} array containing all users.
   */
	async getAllUsers(req,res){
		try {
			let { pageNumber, technologies, searchText } = req.query; 
			const limit = 6; 	

			if(isNaN(Number(pageNumber))|| Number(pageNumber) <0 ){
				const error = new Error('This page doesn\'t exist');
				return  res.status(404).json({message : error.message}); 
			}

			let paramsQuery = {
				include : [
					{ association : 'user_technologies'}, 
					{ association: 'languages' }, 
					{ association : 'follower_user'}
				], 
				order: [ 
					[ 'lastname', 'ASC' ]
				], 
				offset : Number(pageNumber) * limit, 
				limit : limit
			}; 

			if(searchText && searchText.trim() !== ' '){
				paramsQuery.where = {
					lastname : { [Op.like]: `${searchText}%` }
				};
			} 

			let userList = await User.findAndCountAll(paramsQuery); 
			console.log('ICI', userList); 
			let count = {}; 
			let userIdList = []; 

			if(technologies){
				technologies = technologies.split(',').map(item => Number(item));
				
				userList.rows.forEach(oneUser => { 
					if(!count[oneUser.id]){
						count[oneUser.id] = oneUser.user_technologies.map(item => item.id); 
					} 
				}); 

				for( let item in count){
					count[item]= count[item].filter(item => technologies.includes(item)); 
					
					if(count[item].length !== 0){
						userIdList.push(Number(item)); 
					}
				}

				userList.rows = userList.rows.filter(item => userIdList.includes(item.id)); 

			}
			
			if(userList.rows.length <= 0){
				const error = new Error('This page doesn\'t exist');
				return  res.status(404).json({message : error.message}); 
			}

			const totalUserCount = await User.count(); 
			

			res.status(200).json({
				content : userList.rows, 
				totalPages : Math.ceil(totalUserCount/limit),
				
			}); 

		} catch (error) {
			console.error(error); 
			res.status(500).json({message : error.message}); 
		}
	}, 

	/** @function 
   * Retrieves user corresponding to the id with proposed project, wanted project, working on project, 
   * role on projects, technologies, languages, recommandations, favorites projects, users followed, followers
   * @param {number} id 
   * @returns {(Object)} user
   */
	async getOneUserById(req,res){
		try{
			const userId = req.params.id; 
			const user = await User.findByPk(userId, {
			
				include : [
					{ association : 'user_technologies' },
					{ association : 'languages' }, 
					{ association : 'projects_proposed'	}, 
					{ association : 'wanted_projects'},  
					{ association : 'projects_working_on', 
						include : [

							{ association : 'workon_projects', 
								where : {
									user_id : userId
								}, 
								include : [
									{ association : 'user_roles' }
								]
							}
						]
					},
					{ association : 'favorite_projects'}, 
					{ association : 'recommended_user' }, 
					{ association : 'recommending_user'}, 
					{ association : 'followed_user'}, 
					{ association : 'follower_user'},
				]
			}); 

			if(!user){
				const error = new Error(`User with id ${userId} not found`);
				return  res.status(404).json({message : error.message}); 
			}

			res.status(200).json(user); 

		}catch(error){
			console.error(error); 
			res.status(500).json({message : error.message}); 
		}
	}, 

	/** @function 
   * Update user in database  
   * @param {String} firstname - user's firstname
   * @param {String} lastname- user's lastname
   * @param {Boolean} active - true if user's profil is active, false if not 
   * @param {String} description - user's description
   * @param {String} speciality -user's speciality
   * @param {String} [linkedin_link] - user's linkedin link
   * @param {String} [github_link] - user's github link
   * @param {String} [avatar] - user's avatar
   */
	async updateProfile(req,res){
		try {
			const userId = Number(req.token.userId); 
			const {firstname, lastname, active, description, speciality, linkedin_link, github_link, avatar, technologies, languages } = req.body; 

			let user = await User.findByPk(userId, {
				include : [
					{association : 'user_technologies'},
					{association : 'languages'},
				]
			}); 
			if(!user){
				const error = new Error(`user with id ${userId} doesnt exists`); 
				return  res.status(404).json({message : error.message}); 
			}

			if(firstname && firstname.trim() != ''){
				user.firstname = escape(firstname);
			}
			if(lastname && lastname.trim() != ''){
				user.lastname = escape(lastname);
			}
			if(active){
				user.active = escape(active);
			}
			if(description && description.trim() != ''){
				user.description = escape(description);
			}
			if(speciality){
				user.speciality = escape(speciality);
			}
			if(linkedin_link && linkedin_link.trim() != ''){
				user.linkedin_link = escape(linkedin_link);
			}else{
				user.linkedin_link = null; 
			}
			if(github_link && github_link.trim() != ''){
				user.github_link = escape(github_link);
			}else{
				user.github_link = null ;
			}
			if(avatar){
				user.avatar = escape(avatar);
			}

			await user.save();

			if(languages){
				//1. Retrieve language's ids already present on wine and store it in array
				const initialLangagesIdList = user.languages.map(item=>item.id); 

				//2. Retrieve language's ids common to user and language
				const commonlanguagesIdList = languages.filter(item => initialLangagesIdList.includes(item)); //id en commun

				//3. For the ids of langauges that are not in commonlanguagesIdList, (= to add in database)
				// we look for the corresponding language in the database and we add them in an array
				let languagesToAdd = []; 
				for(let item of languages){
					if(!commonlanguagesIdList.includes(item)){
						const language = await Language.findByPk(item);
						if(!language){
							const error = new Error(`Language with id ${item} does not exist.`); 
							return res.status(404).json({message : error.message}); 
						}
						languagesToAdd.push(language); 
					}
				}

				//4. For the ids of initialLangagesIdList that are not in commonlanguagesIdList (=to remove from database)
				// we look for the corresponding language in the database and add them to an array
				let languagesToRemove = []; 
				for(let item of initialLangagesIdList){
					if(!commonlanguagesIdList.includes(item)){
						const language = await Language.findByPk(item);
						if(!language){
							const error = new Error(`Language with id ${item} does not exist.`); 
							return res.status(404).json({message : error.message}); 
						}
						languagesToRemove.push(language); 
					}
				}

				await user.addLanguages(languagesToAdd); 
				await user.removeLanguages(languagesToRemove);

				user = await User.findByPk(userId, {
					include : [
						{association : 'user_technologies'},
						{association : 'languages'},
					]
				}); 
			}

			if(technologies){
				//1. Retrieve technologies's ids already present on user and store it in array
				let initialTechnologyIdList = user.user_technologies.map(item=>item.id); 

				//2. Retrieve technologies's ids common to user and technologies
				let commonTechnologiesIdList = technologies.filter(item => initialTechnologyIdList.includes(item)); //id en commun

				//3. For the ids of technologiesIdList that are not in commonTechnologiesIdList, (= to add in database)
				// we look for the corresponding technology in the database and we add them in an array
				let technologiesToAdd = []; 
				for(let item of technologies){
					if(!commonTechnologiesIdList.includes(item)){
						const technology = await Technology.findByPk(item);
						if(!technology){
							const error = new Error(`Technology with id ${item} does not exist.`); 
							return res.status(404).json({message : error.message}); 
						}
						technologiesToAdd.push(technology); 
					}
				}

				//4. For the ids of initialTechnologiesIdList that are not in commonTechnologiesIdList (=to remove from database)
				// we look for the corresponding technology in the database and add them to an array
				let technologiesToRemove = []; 
				for(let item of initialTechnologyIdList){
					if(!commonTechnologiesIdList.includes(item)){
						const technology = await Technology.findByPk(item);
						if(!technology){
							const error = new Error(`Technology with id ${item} does not exist.`); 
							return res.status(404).json({message : error.message}); 
						}
						technologiesToRemove.push(technology); 
					}
				}

				await user.addUser_technologies(technologiesToAdd); 
				await user.removeUser_technologies(technologiesToRemove);

				user = await User.findByPk(userId, {
					include : [
						{association : 'user_technologies'},
						{association : 'languages'},
					]
				});

			}

			res.status(200).json(user);

		}catch (error) {
			console.error(error); 
			res.status(500).json({message : error.message}); 
		}
	},

	async associateTechnologiesToUser(req,res){
		try {
			const userId = req.params.id; 
			const { technologies } = req.body; 

			let user = await User.findByPk(userId, {
				include : 'user_technologies'
			}); 

			if(!user){
				const error = new ErrorEvent(`User with id ${userId} does not exist`); 
				return res.status(404).json({message : error.message}); 
			}
			
			let technologyList = []; 
			for (const id of technologies){
				const technology = await Technology.findByPk(id); 
				if(!technology){
					const error = new Error(`Technology with ${id} does not exist`); 
					return res.status(404).json({message : error.message});
				}
				technologyList.push(technology); 
			}

			await user.addUser_technologies(technologyList); 

			user = await User.findByPk(userId, {
				include : 'user_technologies'
			}); 

			res.status(201).json(user); 

		} catch (error) {
			console.error(error); 
			res.status(500).json({message : error.message}); 
		}
	}, 

	async updateTechnologiesUser(req,res){
		try {
			const userId = req.params.id; 
			const technologiesIdList = req.body.technologies; 

			let user = await User.findByPk(userId, {
				include : 'user_technologies'
			}); 

			if(!user){
				const error = new ErrorEvent(`User with id ${userId} does not exist`); 
				return res.status(404).json({message : error.message}); 
			}

			//1. Retrieve technologies's ids already present on wine and store it in array
			let initialTechnologyIdList = user.user_technologies.map(item=>item.id); 

			//2. Retrieve technologies's ids common to wine and grapeVarietyIdList
			let commonTechnologiesIdList = technologiesIdList.filter(item => initialTechnologyIdList.includes(item)); //id en commun

			//3. For the ids of technologiesIdList that are not in commonTechnologiesIdList, (= to add in database)
			// we look for the corresponding grape variety in the database and we add them in an array
			let technologiesToAdd = []; 
			for(let item of technologiesIdList){
				if(!commonTechnologiesIdList.includes(item)){
					const technology = await Technology.findByPk(item);
					if(!technology){
						const error = new Error(`Technology with id ${item} does not exist.`); 
						return res.status(404).json({message : error.message}); 
					}
					technologiesToAdd.push(technology); 
				}
			}

			let technologiesToRemove = []; 
			for(let item of initialTechnologyIdList){
				if(!commonTechnologiesIdList.includes(item)){
					const technology = await Technology.findByPk(item);
					if(!technology){
						const error = new Error(`Technology with id ${item} does not exist.`); 
						return res.status(404).json({message : error.message}); 
					}
					technologiesToRemove.push(technology); 
				}
			}

			await user.addUser_technologies(technologiesToAdd); 
			await user.removeUser_technologies(technologiesToRemove);

			user = await User.findByPk(userId, {
				include: 'user_technologies',
			});

			res.status(200).json(user); 

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
			const userId = Number(req.token.userId); 
			const projectId = escape(Number(req.params.projectId)); 
	
			if(!userId){
				const error = new Error('"userId" property is missing');
				return res.status(400).json({message: error.message}); 
			}
	
			if(!projectId){
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
	
			project.status = 'waiting';
	
			project = await Project.findByPk(projectId, {
				include : 'positioned_users'
			});
	
			res.status(201).json(project); 
	
				
		} catch (error) {
			console.error(error); 
			res.status(500).json({message : error.message}); 
		}
	}, 

	/** @function 
   * remove user on project ( takeStand table ) - user withdraw from a project
   * @param { Number } projectId- project's id
   * @param { Number } userId- project's id
   */
	async withdrawFromProject(req,res){
		try {
			const userId = Number(req.token.userId); 
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

module.exports = userController; 