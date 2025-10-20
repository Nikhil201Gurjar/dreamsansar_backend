const mongoose = require("mongoose");

//------------------ Career schema to store the careers ---------
const CareerSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
      minlength: [5, "Role must be 5 char long"],
      maxlength: [80, "Role mustn't 150 char long"],
    },

    role_details: {
      type: String,
      required: true,
      minlength: [12, "Role details must be 12 char long"],
      maxlength: [100, "Role details mustn't 100 char long"],
    },

    avatar: { public_id: String, url: String },

    number_of_posts: {
      type: Number,
      required: true,
      default: 0,
      validate: {
        validator: function (value) {
          if (value < 0)
            throw new Error(`Number of posts couldn't be negative:${value} `);
        },
      },
    },

    number_of_applicants: {
      type: Number,
      required: true,
      default: 0,
      validate: {
        validator: function (value) {
          if (value < 0)
            throw new Error(
              `Number of applicants couldn't be negative:${value} `
            );
        },
      },
    },

    address: {
      type: String,
      required: true,
      minlength: [12, "Address details must be 12 char long"],
      maxlength: [100, "Address details mustn't 100 char long"],
    },

    qualifications: {
      type: String,
      required: true,
      minlength: [12, "Qualifications details must be 12 char long"],
      maxlength: [100, "Qualifications details mustn't 100 char long"],
    },
  },
  { timestamps: true }
);

//Modal to which collection form we save the data
const CareerModel = mongoose.model("Career", CareerSchema);

module.exports = CareerModel;
