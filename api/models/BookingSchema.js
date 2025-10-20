const mongoose = require('mongoose');

//------------------ Booking schema to store the bookings ---------
const BookingSchema = new mongoose.Schema({
    
    full_name: { type: String, required: true, minlength: [5, "full_name must be 5 char long "], maxlength: [80, "full_name mustn't 150 char long"] },

    contact_address : {type: String, required:true,minlength:[10,'Phone must be 10 char log'],maxlength:[13,"Phone mustn't 13 char long"]
    },

     email: {
        type: String, required: true, minlength: [5, "Email must be 5 char long "], maxlength: [120, "Email mustn't 120 char long"], unique: true, trim: true, lowercase: true, validate: {
            validator: function (value) {
                if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)))
                    throw new Error(`{VALUE} is not valid email`)
            }
        }
    },

    message: { type: String, required: true, minlength: [12, "message must be 12 char long "], maxlength: [300, "message mustn't 300 char long"] },

    time_slot: {type:String,required:true}

}, { timestamps: true })


//Modal to which collection form we save the data
const BookingModel = mongoose.model('Booking', BookingSchema)

module.exports = BookingModel;