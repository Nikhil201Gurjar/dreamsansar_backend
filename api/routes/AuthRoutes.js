const AuthRoutes = require('express').Router();

//--------------------------- Middlewares Specific Stuff ---------------------------------X
const FetchUser = require('../middlewares/FetchUser'); //fetch user by the token

//------------------ Controllers Specific Stuff-------------------------X
const AuthController = require('../controllers/AuthController');

//----------------------- INitizlalzing auth apis's routes here -------------------X
AuthRoutes.post('/register', AuthController().Register); //Register the users ,using POST '/api/user/register'
AuthRoutes.post('/login', AuthController().Login); //login the users ,using POST '/api/user/login'
AuthRoutes.get('/getUser', FetchUser, AuthController().getUser); //get info of login users ,using GET '/api/user/getUser'

module.exports = AuthRoutes