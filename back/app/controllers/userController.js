const { User } = require('../models');

const userController = {

	
	/** @function 
   * Retrieve all users with technologies, languages and followers
   * @returns {[]} array containing all users.
   */
	async getAllUsers(_req,res){
		try {
			const userList = await User.findAll({
				include : [
					{ association : 'user_technologies' }, 
					{ association: 'languages' }, 
					{ association : 'follower_user'}
				]
			}); 

			res.status(200).json(userList); 

		} catch (error) {
			console.error(error); 
			res.status(500).json({message : error.message}); 
		}
	}, 

	/** @function 
   * Retrieves user corresponding to the id with propodes project, wanted project, working on project, 
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

	



};

module.exports = userController; 