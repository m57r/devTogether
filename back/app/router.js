const {Router} = require('express'); 
const router = Router(); 

const userController = require('./controllers/userController'); 

//user
router.get('/users', userController.getAllUsers); 

module.exports = router;
