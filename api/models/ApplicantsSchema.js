const mongoose = require("mongoose");

//------------------ Applicant schema to store the applications ---------
const ApplicantSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
      minlength: [5, "Full name must be 5 char long"],
      maxlength: [80, "Full name mustn't 150 char long"],
    },

    contact_address : {type: String, required:true,minlength: [10, "Phone number must be 10 char long"],
      maxlength: [13, "Phone number mustn't 13 char long"]
    },

    role_id:{
             type: mongoose.Schema.Types.ObjectId,
        ref: "Career"
    },

    role: {
      type: String,
      required: true,
      minlength: [5, "Role must be 5 char long"],
      maxlength: [80, "Role mustn't 150 char long"],
    },


    qualifications: {
      type: String,
      required: true,
      minlength: [5, "Qualifications details must be 5 char long"],
      maxlength: [100, "Qualifications details mustn't 100 char long"],
    },

     email: {
        type: String, required: true, minlength: [5, "Email must be 5 char long "], maxlength: [120, "Email mustn't 120 char long"], unique: true, trim: true, lowercase: true, validate: {
            validator: function (value) {
                if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)))
                    throw new Error(`{VALUE} is not valid email`)
            }
        }
    },

    address:{
        address1: {
      type: String,
      required: true,
      minlength: [7, "Address details must be 7 char long"],
      maxlength: [100, "Address details mustn't 100 char long"],
    },
        district:String,
        state:String,
        country:String
    }

  },
  { timestamps: true }
);

//Modal to which collection form we save the data
const ApplicantModel = mongoose.model("Applicant", ApplicantSchema);

module.exports = ApplicantModel;
