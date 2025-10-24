//--------------- Schema Specific Stuffs ---------------
const TestimonialModel = require('../models/TestimonialSchema')

//-------------- Testimonial Controller Specific Stuff ----------------
function TestimonialController() {
    return {
       
        //-------- Fetch all Testimonial posts
        async fetchAllTestimonial(req,res){
            try {
                const testimonials = await TestimonialModel.find();
                return res.status(201).json({success:true,length:testimonials.length,msg:'Successfully fetch all testimonials',testimonials})
            } 
            catch (error) {return res.status(500).json({succeess:false,msg:error.message}) }
        },

        //-----------Add a Testimonial post
        async addTestimonial(req,res){
            try {
                const {user_name,user_concern,rating} = req.body;

                if((!user_name || !user_concern)) return res.status(401).json({success:false,msg:'All fields are required'});

                const testimonial = await TestimonialModel.create({
                    user_name,user_concern,rating:rating?rating:5
                })

                return res.status(201).json({success:true,msg:'Successfully added a testimonial',testimonial});
            } 
            catch (error) {return res.status(500).json({success:false,msg:error.message}) }
        },

        //-----------Delete a Testimonial
        async deleteTestimonial(req,res){
            try {
              const {testimonial_id} = req.params;
              if(!testimonial_id) return res.status(404).json({success:false,msg:'Testimonail id is not found'});
              
              await TestimonialModel.deleteOne({_id:testimonial_id});
              return res.status(201).json({success:true,msg:'Successfully remove the testimonail'});
            } 
            catch (error) {return res.status(500).json({success:false,msg:error.message}) }
        }
    }
}

module.exports = TestimonialController;