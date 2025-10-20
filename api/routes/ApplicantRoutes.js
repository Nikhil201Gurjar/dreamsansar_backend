const ApplicantRoutes = require('express').Router();

//----------- Controller Specific Stuff ------------------
const ApplicantController = require('../controllers/ApplicantController');
const CheckRole = require('../middlewares/CheckRole');
const FetchUser = require('../middlewares/FetchUser');

//--------------------- Routes Specific Stuff -----------------
ApplicantRoutes.post('/apply/:role_id',ApplicantController().Apply); //Apply by the applicant for the application
ApplicantRoutes.get('/fetchApplicant/:_id',FetchUser,CheckRole,ApplicantController().showCareerRoleApplicants); //Fetch the applicant from the careerpost
ApplicantRoutes.delete('/deleteApplicant/:_id',FetchUser,CheckRole,ApplicantController().deleteApplicant); //Fetch the applicant from the careerpost


module.exports = ApplicantRoutes;