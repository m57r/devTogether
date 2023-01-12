const jsonwebtoken = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET; 

/** @function 
* Middleware authorization verify token
*/
const authorizationMiddleware = (req,res,next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		req.token = jsonwebtoken.verify(token, jwtSecret);
		next();
	} catch (error) {
		res.status(401).json({ message : 'Invalid authentification token'});
	}
};

module.exports = authorizationMiddleware;
