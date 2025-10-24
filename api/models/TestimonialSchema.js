const mongoose = require('mongoose');

//------------------ Testimonial schema to store the testimonials ---------
const TestimonialSchema = new mongoose.Schema({
    
    user_name: { type: String, required: true, minlength: [5, "Name must be 5 char long"], maxlength: [120, "Name mustn't 120 char long"] },

    user_concern: { type: String, required: true, minlength: [12, "Concern must be 12 char long"], maxlength: [300, "Concern mustn't 300 char long"] },

    rating: {type:Number,required:true,default:5,min: [1, "Minimum rating must be 1"], max: [5, "Maximum rating mustn't more than 5"],validate:{
        validator:function(value){
            if(value<1 || value > 5) throw new Error(`{value} is not valid rating`)
        }
    }}

}, { timestamps: true })


//Modal to which collection form we save the data
const TestimonialModel = mongoose.model('Testimonial', TestimonialSchema)

module.exports = TestimonialModel;