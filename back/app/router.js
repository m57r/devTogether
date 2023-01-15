const {Router} = require('express'); 
const router = Router(); 


const authentificationController = require('./controllers/authentificationController'); 
const filterController = require('./controllers/filterController');
const projectController = require('./controllers/projectController');
const projectManagerController = require('./controllers/projectManagerController'); 
const userController = require('./controllers/userController'); 

const authorizationMiddleware = require('./middlewares/authorizationMiddleware');

//authentification
router.post('/signup', authentificationController.signupAction); 
router.post('/login', authentificationController.loginAction); 
router.delete('/users', authorizationMiddleware, authentificationController.deleteAccount); 

//user
router.patch('/projects/:projectId/takestand', authorizationMiddleware, userController.takeStandOnProject);
router.patch('/projects/:projectId/withdraw', authorizationMiddleware, userController.withdrawFromProject);
router.patch('/users', authorizationMiddleware, userController.updateProfile);
router.get('/users', userController.getAllUsers); 
router.get('/users/:id', authorizationMiddleware, userController.getOneUserById);

router.post('/users/:id/technologies', userController.associateTechnologiesToUser); 

//project
router.get('/projects', authorizationMiddleware, projectController.getAllProjects); 
router.get('/projects/:projectId', authorizationMiddleware, projectController.getOneProjectById); 
router.post('/projects', authorizationMiddleware, projectController.createProject);

//product manager
router.patch('/projects/:projectId', authorizationMiddleware, projectManagerController.updateProjectById);
router.patch('/projects/:projectId/technologies', authorizationMiddleware, projectManagerController.addTechnologiesOnProject); 
router.patch('/projects/:projectId/workon/:userId', authorizationMiddleware, projectManagerController.acceptUserOnProject);
router.delete('/projects/:projectId/workout/:userId', authorizationMiddleware, projectManagerController.removeUserOnProject);
router.patch('/projects/:projectId/giverole/:userId', authorizationMiddleware, projectManagerController.giveRoleToUser);
router.patch('/projects/:projectId/denied/:pendingUserId', authorizationMiddleware, projectManagerController.deniedUserOnProject);

//Filter
router.get('/technologies', filterController.getAllTechnologies);

module.exports = router;
