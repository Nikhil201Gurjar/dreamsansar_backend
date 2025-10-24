const OtherController = require('../controllers/OtherController');

const OtherRoutes = require('express').Router();


OtherRoutes.post('/contact_us',OtherController().contactUs);

module.exports = OtherRoutes;