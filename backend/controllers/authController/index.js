const User = require("../../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const registerUser = async(req,res) => {
    const { userName, userEmail, password, role } = req.body;

    const checkExistingUser = await User.findOne({userEmail});
    if(checkExistingUser){
        return res.status(400).json({
            success: false,
            message: "User already exists"
        })
    }
    const hashPassword = await bcrypt.hash(password, 5);
    await User.create({userName, userEmail, role, password: hashPassword});

    return res.status(201).json({
        success: true,
        message: "User register successfully"
    });
};

const loginUser = async (req, res) => {
    const { userEmail, password } = req.body;
    const checkExistingUser = await User.findOne({userEmail});
    
    if( !checkExistingUser || !(await bcrypt.compare( password, checkExistingUser.password))){
        return res.status(401).json({
            success: false,
            message: "Invalid User Credentials"
        })
    }

    const accessToken = jwt.sign({
        _id: checkExistingUser._id,
        userName: checkExistingUser.userName,
        userEmail: checkExistingUser.userEmail,
        role: checkExistingUser.role
    },process.env.JWT_SECRET)

    res.status(200).json({
        success: true ,
        message: "Logged in successfully",
        data: {
            accessToken,
            user:{
                _id: checkExistingUser._id,
            userName: checkExistingUser.userName,
            userEmail: checkExistingUser.userEmail,
            role: checkExistingUser.role
            }
        }
    })
}

module.exports = {registerUser, loginUser}