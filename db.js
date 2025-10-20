const mongoose = require('mongoose');

//Connect app with database
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/dreamsansar'). 
then( ()=> console.log('Connection to database')). 
catch((e) => console.error('Error occured during connection to database ',e))