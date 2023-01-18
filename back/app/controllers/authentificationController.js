const { User } = require('../models');
const emailValidator = require('email-validator'); 
const jsonwebtoken = require('jsonwebtoken'); 
const jwtSecret = process.env.JWT_SECRET;
const bcrypt = require('bcrypt'); 
const { escape } = require('sanitizer');

const authentificationController = {

	/** @function 
   * Create new user in database if user doesn't exist 
   * @param {String} firstname - user's firstname
   * @param {String} lastname- user's lastname
   * @param {String} email- user's email
   * @param {String} password - user's password
   * @param {String} confirmPassword - user's confirmPassword
   * @param {String} speciality -user's speciality
   * @param {String} description -user's description
   * @param {Array} technologies -user's technologies (id)
  
   */
	async signupAction(req, res){
		try {
			const { firstname, lastname, email, password, confirmPassword, speciality, description, technologies } = req.body; 
			
			//1. Check the user doesn't exist in the DB. 
			const searchedUser = await User.findOne({
				where : {
					email : escape(email)
				}
			}); 

			if(searchedUser){
				const error = new Error('Signup does not work, invalid email or password'); 
				return  res.status(404).json({message : error.message}); 
			}
            
			//2. Check that the email format is valid with email-validator
			if(!emailValidator.validate(escape(email))){
				const error = new Error('Signup does not work, invalid email or password'); 
				return  res.status(404).json({message : error.message}); 
			}

			//3. Check that the password and confirmation are identical
			if(escape(password) !== escape(confirmPassword)){
				const error = new Error('Signup does not work, invalid email or password'); 
				return  res.status(404).json({message : error.message}); 
			}

			//4. Encrypting the password with bcrypt
			const hashedPassword = bcrypt.hashSync(escape(password), 10); 

			//5. Check that firstname, lastname, description, speciality and technologies exist
			if(!firstname || !lastname || !description || description.trim() === '' || !technologies || speciality.trim() === ''){
				const error = new Error('ICISignup does not work, invalid email or password'); 
				return  res.status(404).json({message : error.message}); 
			}

			//6. Create an instance, save it in the database
			let newUser = User.build({
				email : escape(email), 
				password : hashedPassword, 
				firstname : escape(firstname.toLowerCase()), 
				lastname : escape(lastname.toLowerCase()), 
				speciality : escape(speciality), 
				description : escape(description.trim()),
			});
		
			await newUser.save(); 
			await newUser.addUser_technologies(technologies);

			newUser = await User.findOne({
				where : {
					email : escape(email)
				}, 
				include : {association : 'user_technologies'}
			}); 

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
				const error = new Error('Login does not work, invalid email or password'); 
				return  res.status(404).json({message : error.message}); 
			}
			//2. Check the password is valid (vs bdd) with compareSync of bcrypt
			const validPassword = bcrypt.compareSync(req.body.password, searchedUser.password); 
			if(!validPassword){
				const error = new Error('Login does not work, invalid email or password'); 
				return  res.status(404).json({message : error.message}); 
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
				const error = new Error('Token doesn\'t exist'); 
				return  res.status(404).json({message : error.message}); 
			}

			let user = await User.findByPk(req.token.userId);
			if(!user){
				const error = new Error(`user with id ${req.token.userId} doesnt exists`); 
				return  res.status(404).json({message : error.message}); 
			}
 
			return res.status(200).json({ 
				logged: true,
				pseudo : user.firstname, 
				role : user.role,
			}); 
			
		} catch (error) {
			res.status(401).json({ message : 'Invalid authentification token'});
		}
	}, 

	async deleteAccount(req, res){
		try {
			
			const password = req.body.password; 

			//1. Search user in the database 
			const userId = Number(req.token.userId); 
			const userToDelete = await User.findByPk(userId); 
			if(!userToDelete){
				const error = new Error(`user with id ${userId} doesnt exists`); 
				return  res.status(404).json({message : error.message}); 
			}

			//2. Check the password is valid (vs bdd) with compareSync of bcrypt
			const validPassword = bcrypt.compareSync(password, userToDelete.password); 
			if(!validPassword){
				const error = new Error('Delete doesn\'t work, Invalid password'); 
				return  res.status(404).json({message : error.message}); 
			}

			await userToDelete.destroy(); 
			res.status(200).json(userToDelete); 

		} catch (error) {
			console.log(error); 
			res.status(500).json({message : error.message});
		}
	}
	
};

module.exports = authentificationController; 