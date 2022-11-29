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
	}

};

module.exports = userController; 