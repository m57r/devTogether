const {Router} = require('express'); 
const router = Router(); 

const projectController = require('./controllers/projectController');
const userController = require('./controllers/userController'); 

//user
router.get('/users', userController.getAllUsers); 
router.get('/users/:id', userController.getOneUserById);

//project
router.get('/projects', projectController.getAllProjects); 
router.get('/projects/:id', projectController.getOneProjectById); 

module.exports = router;
