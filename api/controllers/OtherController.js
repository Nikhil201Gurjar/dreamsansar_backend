const SendMail = require("../../utils/SendMail");


//-------------- Other Controller Specific Stuff ----------------
function OtherController() {
    return {
       
      

        //-----------Send the mail for contact us
        async contactUs(req,res){
            try {
                const {user_name,user_concern,contact_address,email} = req.body;
                console.log('req.body',req.body);

                if(!user_name || !user_concern || !contact_address || !email) return res.status(401).json({success:false,msg:'All fields are required'});

                  const to = process.env.SMTP_AUTH_USER;
    const subject = "Contact Us Inquiry";
    const msg = `
      New Contact Inquiry:
      ----------------------------
      Name: ${user_name}
      Concern: ${user_concern}
      Email: ${email}
      Contact Address: ${contact_address}
    `;

                await SendMail(to,subject,msg);
                
                return res.status(201).json({success:true,msg:"Successfully sent the contact details, we'll reach out to you in 24 hours"});
            } 
            catch (error) {return res.status(500).json({success:false,msg:error.message}) }
        },

       
    }
}

module.exports = OtherController;