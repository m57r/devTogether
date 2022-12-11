const { User } = require('../models');
const emailValidator = require('email-validator'); 
const jsonwebtoken = require('jsonwebtoken'); 
const jwtSecret = process.env.JWT_SECRET;
const bcrypt = require('bcrypt'); 
const { escape } = require('sanitizer');

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
   * Create new user in database if user doesn't exist 
   * @param {String} firstname - user's firstname
   * @param {String} lastname- user's lastname
   * @param {String} email- user's email
   * @param {String} password - user's password
   * @param {String} confirmPassword - user's confirmPassword
   * @param {String} description - user's description
   * @param {String} speciality -user's speciality
   * @param {String} [linkedin_link] - user's linkedin link
   * @param {String} [github_link] - user's github link
   * @param {String} [avatar] - user's avatar
   */
	async signUpAction(req, res){
		try {
			const { firstname, lastname, email, password, confirmPassword, description, speciality, linkedin_link, github_link, avatar } = req.body; 
			
			//1. Check the user doesn't exist in the DB. 
			const searchedUser = await User.findOne({
				where : {
					email : escape(email)
				}
			}); 

			if(searchedUser){
				throw new Error('Signup does not work, invalid email or password'); 
			}
            
			//2. Check that the email format is valid with email-validator
			if(!emailValidator.validate(escape(email))){
				throw new Error('Signup does not work, invalid email or password');
			}

			//3. Check that the password and confirmation are identical
			if(escape(password) !== escape(confirmPassword)){
				throw new Error('Signup does not work, invalid email or password');
			}

			//4. Encrypting the password with bcrypt
			const hashedPassword = bcrypt.hashSync(escape(password), 10); 

			//5. Check that firstname and lastname exist
			if(!firstname){
				throw new Error('Signup does not work, invalid email or password');
			}

			if(!lastname){
				throw new Error('Signup does not work, invalid email or password');
			}

			//6. Create an instance, save it in the database
			const newUser = User.build({
				email : escape(email), 
				password : hashedPassword, 
				firstname : escape(firstname), 
				lastname : escape(lastname), 
				description : escape(description), 
				speciality : escape(speciality)
			});
		
			if(linkedin_link){
				newUser.linkedin_link = escape(linkedin_link); 
			}

			if(github_link){
				newUser.github_link = escape(github_link); 
			}

			if(avatar){
				newUser.avatar = escape(avatar); 
			}

			await newUser.save(); 
			res.status(200).json(newUser);

		} catch (error) {
			console.log(error); 
			res.status(401).json({ message: error.message }); 
		}

	}, 

	/** @function 
   * Connect user and create token
   * @param {String} email- user's email
   * @param {String} password - user's password
   */
	async loginAction(req, res){
		try {

			//1. Check the user exist in the DB.
			const searchedUser = await User.findOne({
				where : {
					email : escape(req.body.email)
				}
			});
			if(!searchedUser){
				throw new Error('Login does not work, invalid email or password');
			}
			//2. Check the password is valid (vs bdd) with compareSync of bcrypt
			const validPassword = bcrypt.compareSync(req.body.password, searchedUser.password); 
			if(!validPassword){
				throw new Error('Login does not work, invalid email or password');
			}

			//3. Token JWT
			if(searchedUser){
				const jwtContent = { userId: searchedUser.id, role: searchedUser.role };
				const jwtOptions = { 
					algorithm: 'HS256', 
					expiresIn: '3h' 
				};
				let token = jsonwebtoken.sign(jwtContent, jwtSecret, jwtOptions);
				
				return res.status(200).json({ 
					token: token,
					logged: true,
					pseudo : searchedUser.firstname, 
					role : searchedUser.role,
				}); 
			}
		} catch (error) {
			console.log(error); 
			res.status(401).json({ message: error.message });   
		}
	}, 

	/** @function 
   * Verify Token
   * @returns {Object} objet containing logged, pseudo and role property
   */
	async verifyToken(req,res){
		try {
			const token = req.headers.authorization.split(' ')[1];
			req.token = jsonwebtoken.verify(token, jwtSecret);


			if(!token){
				throw new Error('Token doesn\'t exist');
			}

			let user = await User.findByPk(req.token.userId);
			if(!user){
				throw new Error(`user with id ${req.token.userId} doesn't exist`);
			}
 

			return res.status(200).json({ 
				logged: true,
				pseudo : user.firstname, 
				role : user.role,
			}); 
			
		} catch (error) {
			res.status(401).json({ message : 'Invalid authentification token'});
		}
	}
};

module.exports = userController; 