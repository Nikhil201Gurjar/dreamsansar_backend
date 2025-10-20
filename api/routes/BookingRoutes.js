const BookingRoutes = require('express').Router();

//----------- Controller Specific Stuff ------------------
const BookingController = require('../controllers/BookingController');

//------------------ Middlewares Specific Stuff --------------------
const CheckRole = require('../middlewares/CheckRole');
const FetchUser = require('../middlewares/FetchUser');

//--------------------- Routes Specific Stuff -----------------
BookingRoutes.get('/showBookings',FetchUser,CheckRole,BookingController().showBookings); //show all Booking
BookingRoutes.delete('/deleteBooking/:_id',FetchUser,CheckRole,BookingController().deleteBooking); //Delete a Booking
BookingRoutes.post('/addBooking',BookingController().addBooking); //add a Booking

module.exports = BookingRoutes;