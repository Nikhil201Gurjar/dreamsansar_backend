//--------------------- Modules Specific Stuff ------------------
const cloudinary = require("cloudinary");

//------------------ Schema Specific Stuff ---------------------
const CareerModel = require("../models/CareerSchema");

//------------ Utils Specific Stuffs ----------------------
const getDataUri = require("../../utils/DataUri");
const ApplicantModel = require("../models/ApplicantsSchema");

//-------------- Career Controller Specific Stuff ----------------
function CareerController() {
  return {
    //-------- Fetch all career posts
    async fetchAllCareerPosts(req, res) {
      try {
        const careers_posts = await CareerModel.find();
        await res
          .status(201)
          .json({
            success: true,
            msg: "Successfully fetch all career posts",
            Length: careers_posts.length,
            careers_posts,
          });
      } catch (error) {
        return res.status(500).json({ succeess: false, msg: error.message });
      }
    },

    //-----------Add a career post
    async addCareerPost(req, res) {
      try {
        const { role, role_details, number_of_posts, address, qualifications } =
          req.body;

        if (
          !role ||
          !role_details ||
          !number_of_posts ||
          !address ||
          !qualifications
        )
          return res
            .status(401)
            .json({ succeess: false, msg: "All fields are required" });

        const file = req.file;
        if (!file)
          return res
            .status(401)
            .json({ succeess: false, msg: "File is not found" });

        const fileUri = await getDataUri(file);

        //Cloudinary to send the data on server
        const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

        const career_post = await CareerModel.create({
          role,
          role_details,
          number_of_posts,
          address,
          qualifications,
          avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          },
        });

        await res
          .status(201)
          .json({
            success: true,
            msg: "Successfully added a new career post",
            career_post,
          });
      } catch (error) {
        return res.status(500).json({ succeess: false, msg: error.message });
      }
    },

    //-----------Delete a career post
    async deleteCareerPost(req, res) {
      try {
        const { _id } = req.params;

        if (!_id)
          return res
            .status(401)
            .json({ success: false, msg: "Career post id is not found" });

        const career_post = await CareerModel.findOne({ _id });

        if (!career_post)
          return res
            .status(404)
            .json({ success: false, msg: "Career Post not found" });

        //Delete the image from the career posts
        await cloudinary.v2.uploader.destroy(career_post.avatar.public_id);

        await CareerModel.deleteOne({ _id });

        await ApplicantModel.deleteMany({role_id:_id});

        return res
          .status(200)
          .json({ success: true, msg: "Remove the career post successfully" });
      } catch (error) {
        return res.status(500).json({ succeess: false, msg: error.message });
      }
    },

    //-----------Increase a career post,by req.params.role_id
    async increaseCareerPost(req, res) {
      try {
        const { _id } = req.params;
        if (!_id)
          return res
            .status(401)
            .json({ success: false, msg: "Career post id is not found" });

        const career_post = await CareerModel.updateOne(
          { _id },
          { $inc: { number_of_posts: 1 } }
        );

        if (career_post.matchedCount === 0) {
          return res
            .status(404)
            .json({ success: false, msg: "Career Post not found" });
        }

        return res
          .status(200)
          .json({ success: true, msg: "Career post increased by 1" });
      } catch (error) {
        return res.status(500).json({ succeess: false, msg: error.message });
      }
    },
    //-----------decrease a career post,by req.params.role_id
    async decreaseCareerPost(req, res) {
      try {
        const { _id } = req.params;
        if (!_id)
          return res
            .status(401)
            .json({ success: false, msg: "Career post id is not found" });

        const career_post = await CareerModel.updateOne(
          { _id },
          { $inc: { number_of_posts: -1 } }
        );

        if (career_post.matchedCount === 0) {
          return res
            .status(404)
            .json({ success: false, msg: "Career Post not found" });
        }

        return res
          .status(200)
          .json({ success: true, msg: "Career post decreased by 1" });
      } catch (error) {
        return res.status(500).json({ succeess: false, msg: error.message });
      }
    },
  };
}

module.exports = CareerController;
