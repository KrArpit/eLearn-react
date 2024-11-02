const User = require("../../models/User");

async function checkUsernameAvailability(req, res) {
    try {
        const { userName } = req.query;
        const userExists = await User.findOne({userName});
        if(userExists){
            return res.status(200).json({ available: false });
        } else{
            return res.status(200).json({ available: true });
        }
    } catch (error) {
        return res.status(500).json({message:'Server Error'})
    }
};

module.exports = {checkUsernameAvailability}