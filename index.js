console.log('Welcome in DreamSansar, grow your career globally');

require('dotenv').config() //When you install first column dependies
require('./db') //When configure your connection with database

const express = require('express')
const app = express();

const cors = require('cors'); //When your app's api connect with the forntend applications
app.use(cors())

//------------------ Configuring the Cloudinary to upload poster and videos
const cloudinary = require('cloudinary');

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

//When use your app any json object or form fill up
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//------------ Configure that our app is running at the brower
app.get('/', (req, res) => {
    res.send('Welcome In DreamSansar, grow your career globally');
})

//-------------- Routes Specific Stuff ------------------
const CareerRoutes = require('./api/routes/CareerRoutes'); 
app.use('/api/career',CareerRoutes);

const TestimonialRoutes = require('./api/routes/TestimonialRoutes'); 
app.use('/api/testimonial',TestimonialRoutes);

const BookingRoutes = require('./api/routes/BookingRoutes'); 
app.use('/api/booking',BookingRoutes);

const ApplicantRoutes = require('./api/routes/ApplicantRoutes'); 
app.use('/api/applicant',ApplicantRoutes);

const AuthRoutes = require('./api/routes/AuthRoutes'); 
app.use('/api/auth',AuthRoutes);




const Server = process.env.SERVER || 'localhost';
const Port = process.env.PORT || 80;

app.listen(Port, () => console.info(`Application listen at http://${Server}:${Port}`))