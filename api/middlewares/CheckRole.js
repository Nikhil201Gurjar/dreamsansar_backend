//------------- Function to help to use to check the user role is admin
const CheckRole = async (req, res, next) => {

    try {
        if (!req.user) return res.status(409).json({ success: false, msg: 'User not found' });

        if (req.user.role != 'admin')
            return res.status(404).json({ success: true, msg: "Normal user can't processed further" })

        next();
        
    } catch (error) { return res.status(500).json({ success: false, msg: error }); }
}

module.exports = CheckRole;