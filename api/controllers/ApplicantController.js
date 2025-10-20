//--------------- MOdel Specific Stuff -------------------
const ApplicantModel = require("../models/ApplicantsSchema");
const CareerModel = require("../models/CareerSchema");

//-------------- Applicant Controller Specific Stuff ----------------
function ApplicantController() {
    return {
       
        //-------- Apply for the career post
        async Apply(req,res){
            try {
                const {full_name,contact_address,qualifications,email,address1,district,state,country} = req.body;

                const {role_id} = req.params;
                const {role} = req.query;

                if(!role_id) return res.status(401).json({success:false,msg:'Career Role ID is not found'})

 if(!role) return res.status(401).json({success:false,msg:'Career Role is not found'})


                if(!full_name || !contact_address || !qualifications || !email || !address1 || !district || !state || !country) return res.status(401).json({success:false,msg:'All fields are required'});

                const career_post = await CareerModel.updateOne({_id:role_id},{$inc:{number_of_applicants:1}});      
                
                if(career_post.matchedCount === 0) return res.status(404).json({success:false,msg:'Career post is not found, not an valid career role id'});

                //Store the applicant data into database:
                await ApplicantModel.create({
                    full_name,contact_address,role_id,role,qualifications,email,address:{address1,district,state,country}
                });

                return res.status(200).json({success:true,msg:`Your application for ${role} is filled`})
            } 
            catch (error) {return res.status(500).json({succeess:false,msg:error.message}) }
        },

        //-----------Fetch the applicant from the career post
                async showCareerRoleApplicants(req,res){
                    try {
                        const {_id} = req.params;
                        if(!_id) return res.status(404).json({succeess:false,msg:'_Id is not found'});

                        const applicants = await ApplicantModel.find({role_id:_id});
                        return res.status(201).json({success:true,msg:'Successfully fetch all the applicants',Length:applicants.length,applicants});
                    } 
                    catch (error) {return res.status(500).json({succeess:false,msg:error.message}) }
                },

                 //-----------Delete a applicant details
                        async deleteApplicant(req,res){
                            try {
                                const {_id} = req.params;
                                const {role} = req.query;
                
                                if(!_id) return res.status(401).json({success:false,msg:'Applicant ID is not found'});
                
                                const applicant = await ApplicantModel.deleteOne({_id});
                
                                if(!applicant) return res.status(404).json({success:false,msg:'Invalid Applicant id, no applicant is deleted'});

                                  const career_post = await CareerModel.updateOne(
                                          { _id:role },
                                          { $inc: { number_of_applicants: -1 } }
                                        );
                                if(!career_post) return res.status(404).json({success:false,msg:"Career post is not found"})
                
                                return res.status(200).json({success:true,msg:'Remove the applicant successfully'});
                            } 
                            catch (error) {return res.status(500).json({succeess:false,msg:error.message}) }
                        },
                
    }
}

module.exports = ApplicantController;