const TestimonialRoutes = require('express').Router();

//----------- Controller Specific Stuff ------------------
const TestimonialController = require('../controllers/TestimonialController');
const CheckRole = require('../middlewares/CheckRole');
const FetchUser = require('../middlewares/FetchUser');

//--------------------- Routes Specific Stuff -----------------
TestimonialRoutes.get('/allTestimonial',TestimonialController().fetchAllTestimonial); //Fetch all Testimonial
TestimonialRoutes.post('/addTestimonial',FetchUser,CheckRole,TestimonialController().addTestimonial); //Add a Testimonial
TestimonialRoutes.delete('/deleteTestimonial/:testimonial_id',FetchUser,CheckRole,TestimonialController().deleteTestimonial); //Delete a Testimonial post

module.exports = TestimonialRoutes;