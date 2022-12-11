const {Router} = require('express'); 
const filterController = require('./controllers/filterController');
const router = Router(); 

const projectController = require('./controllers/projectController');
const userController = require('./controllers/userController'); 

//user
router.get('/users', userController.getAllUsers); 
router.get('/users/:id', userController.getOneUserById);

//project
router.get('/projects', projectController.getAllProjects); 
router.get('/projects/:projectId', projectController.getOneProjectById); 
router.post('/projects', projectController.createProject);
router.patch('/projects/:projectId', projectController.updateProjectById);
router.patch('/projects/:projectId/technologies', projectController.addTechnologiesOnProject); 
router.patch('/projects/:projectId/workon', projectController.workOnProject);
router.patch('/projects/:projectId/takestand', projectController.takeStandOnProject);
router.patch('/projects/:projectId/giverole', projectController.giveRoleToUser);

//Filter
router.get('/technologies', filterController.getAllTechnologiesByCategory); 


module.exports = router;
