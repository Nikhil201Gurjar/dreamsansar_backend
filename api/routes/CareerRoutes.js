const CareerRoutes = require('express').Router();

//----------- Controller Specific Stuff ------------------
const CareerController = require('../controllers/CareerController');

//--------------- Middleware Specific Stuff --------------------------
const UploadFile = require('../middlewares/UploadFile');
const CheckRole = require('../middlewares/CheckRole');
const FetchUser = require('../middlewares/FetchUser');

//--------------------- Routes Specific Stuff -----------------
CareerRoutes.get('/allCareerPosts',CareerController().fetchAllCareerPosts); //Fetch all career posts
CareerRoutes.post('/addCareerPost',FetchUser,CheckRole,UploadFile,CareerController().addCareerPost); //Add a career post
CareerRoutes.delete('/deleteCareerPost/:_id',FetchUser,CheckRole,CareerController().deleteCareerPost); //Delete a career post
CareerRoutes.put('/increaseCareerPost/:_id',FetchUser,CheckRole,CareerController().increaseCareerPost); //Increase a career post
CareerRoutes.put('/decreaseCareerPost/:_id',FetchUser,CheckRole,CareerController().decreaseCareerPost); //Decrease a career post


module.exports = CareerRoutes;