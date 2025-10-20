//----------------- Model Specific Stuff ----------------------
const BookingModel = require('../models/BookingSchema');

//------------- Utils Specific Stuff -----------
const SendWhatsAppNotification = require('../../utils/SendWhatsappNotification');

//-------------- Booking Controller Specific Stuff ----------------
function BookingController() {
    return {
       
        //-------- Fetch all Booking posts
        async showBookings(req,res){
            try {
                const bookings = await BookingModel.find();
                return res.status(201).json({success:true,msg:'Successfully fetch all the bookings',Lenght:bookings.length,bookings});
            } 
            catch (error) {return res.status(500).json({succeess:false,msg:error.message}) }
        },

        //-----------Delete a Booking post
        async deleteBooking(req,res){
            try {
                const {_id} = req.params;

                if(!_id) return res.status(401).json({success:false,msg:'Booking ID is not found'});

                console.log('_Id',_id);

                const booking = await BookingModel.deleteOne({_id});

                if(!booking) return res.status(404).json({success:false,msg:'Invalid booking id, no booking is deleted'});

                return res.status(200).json({success:true,msg:'Remove the booking successfully'});
            } 
            catch (error) {return res.status(500).json({succeess:false,msg:error.message}) }
        },

        //-----------Delete a Booking post
        async addBooking(req,res){
            try {
                const {full_name,country_code,contact_address,email,message,time_slot} = req.body


                if(!contact_address || !full_name || !email || !message || !time_slot) return res.status(404).json({success:false,msg:'All fields are required'});

                //Store the content into db
                await BookingModel.create({
                    full_name,contact_address
                    ,email,message,time_slot
                });

                const message_body =  `📢 New Booking Alert!\nUser: ${full_name}\nSession: ${time_slot}\nContact Address:${contact_address}\nUser Concern: ${message}`;

                const to =   process.env.OWNER_PHONE;

                //Now end the Whatsapp message to the Owner
                await SendWhatsAppNotification(to,message_body)

                return res.status(200).json({success:true,msg:`Great news! Your session is booked for ${time_slot}. One of our team members will reach out to you soon.`})

            } 
            catch (error) {return res.status(500).json({succeess:false,msg:error.message}) }
        }
    }
}

module.exports = BookingController;