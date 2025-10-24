//----------- Import the packages from packages, use to make strong apis -------X
const bcrypt = require('bcryptjs'); //Convert password into hash
const jwt = require('jsonwebtoken'); // Tokenized our users

const cloudinary = require('cloudinary'); //To upload files--

//-------------- Model Specific Stuff
const UserSchema = require('../models/UserSchema'); //User modal

//------------ Config Variables -----------X

//------------ Utils Specific Stuff
const getDataUri = require('../../utils/DataUri');
const UserModel = require('../models/UserSchema');


//------------------ Creating the AuthControllers to authenticate the users -----------X
function AuthController() {

    return {

        // Register the users, using POST '/api/user/register'
        async Register(req, res) {

            try {
                //--------- Req.body content
                const { name, email, password, cpassword,role } = req.body;

                //Requring all the specific fields
                if (!name || !email || !password || !cpassword) { return res.status(404).json({ success: false, msg: "All fields are required" }) };

                if (password.length < 8 || cpassword.length < 8)
                    return res.status(404).json({ success: false, msg: "Password & Confirm password must be 8 char long" })

                //check password and confirm password match
                if (password !== cpassword) { return res.status(404).json({ success: false, msg: "Password and ConfrimPassword did not match" }) };

                // Check the user is already register
                let users = await UserSchema.findOne({ email })
                if (users) { return res.status(401).json({ success: false, msg: "this crenditentals's user is already exist" }) };

                //Converting the password into hash
                let hashPassword = await bcrypt.hash(password, 10);

                //Register the users
                users = await UserSchema({
                    name,
                    email,
                    password: hashPassword,
                    role
                })
                await users.save();

                return res.status(200).json({ success: true, msg: 'You are successfully register', users });

            } catch (error) { return res.status(500).json({ success: false, msg: error.message }); }
        },

        // Login the users, using POST '/api/user/login'
        async Login(req, res) {
            try {
                //--------- Req.body content
                const { email, password } = req.body;

                //Requring all the specific fields
                if (!email || !password) { return res.status(404).json({ success: false, msg: "All fields are required" }) };

                // Check the user is not already register
                let users = await UserSchema.findOne({ email })
                if (!users) { return res.status(401).json({ success: false, msg: "Your crenditentals is not correct" }) };

                //Comparing the password of register and login user
                let hashPassword = await bcrypt.compare(password, users.password)
                if (!hashPassword) { return res.status(404).json({ success: false, msg: "Your credentials not correct" }) }

                // Now create the token to authorizing the users
                const payloads = {
                    user: { id: users._id }
                }
                const Secret_Key = process.env.JWT_SECRET_KEY || JWT_SECRET_KEY;

                const token = await jwt.sign(payloads, Secret_Key, { expiresIn: '10d' })

                return res.status(200).json({ success: true, msg: 'You are successfully login', token });

            } catch (error) { return res.status(500).json({ success: false, msg: error.message }); }
        },

        // Get the info of login user, using GET '/api/user/getUser'
        async getUser(req, res) {
            try {
                const user = req.user;

                return res.status(200).json({ success: true, msg: `Welcome back ${req.user.name}`, user });

            } catch (error) { return res.status(500).json({ success: true, msg: error.message }); }
        },

        // Change Password ,if user write old password is right!, using PUT '/api/user/changePassword'
        async changePassword(req, res) {
            try {
                //1. Get constraint from req.body
                const { password, npassword } = req.body;


                if (!password || !npassword) return res.status(404).json({ success: false, msg: 'All fields are required' })

                const user = await UserSchema.findOne({email:process.env.ADMIN});

                user.password = await bcrypt.hash(password, 10);

                await user.save();

                return res.status(200).json({ success: true, msg: 'Your password is change successfully' });

            } catch (error) { return res.status(500).json({ success: false, msg: error }); }
        },
       
    }
}


module.exports = AuthController;