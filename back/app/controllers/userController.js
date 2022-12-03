const {User} = require('../models');

const userController = {

	async getAllUsers(_req,res){
		try {
			const userList = await User.findAll({
				include : [
					{association : 'user_technologies'}, 
					{association: 'languages'},  
				]
			}); 

			res.status(200).json(userList); 

		} catch (error) {
			console.error(error); 
			res.status(500).json({message : error.message}); 
		}
	}, 

	async getOneUserById(req,res){
		try{
			const userId = req.params.id; 
			const user = await User.findByPk(userId, {
				include : [
					{ association : 'projects_proposed'	},
					{ association : 'favorite_projects' }, 
					{ 
						association : 'projects_working_on', 
						include : 'roles_on_projects'
					},
					{ association : 'wanted_projects'},
					{ association : 'user_technologies' },
					{ association : 'languages' }, 
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