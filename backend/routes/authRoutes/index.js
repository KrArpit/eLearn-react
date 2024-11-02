const express = require('express');
const { registerUser, loginUser} = require('../../controllers/authController');
const { checkUsernameAvailability } = require('../../controllers/authController/checkUsername');
const authenticateMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser); 
router.post('/login', loginUser);
router.get('/check-auth', authenticateMiddleware, (req, res)=>{
    const user = req.user;
    res.status(200).json({
        success: true,
        message: 'Authenticated User',
        data: {
            user
        }
    })
});

router.get('/check-username', checkUsernameAvailability);

module.exports = router;