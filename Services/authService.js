const User = require('../Models/userSchema');
const asyncHandler = require('express-async-handler');
const createToken = require('../Utils/createToken');
const ApiError = require('../Utils/ApiError');
const bcrypt = require('bcryptjs')

/**
 * 
 * @desc     signup
 * @route    Post/api/v1/auth/signup
 * @access   Pubic
 */
exports.signUp = asyncHandler(async (req, res, next) => {
    const { name, email, password, phoneNumber, avatar } = req.body
    const user = await User.create({
        name,
        email,
        phoneNumber,
        avatar,
        password,
    })

    const token = await createToken(user._id);

    res.status(200).json({ data: user, token });
});
/**
 * 
 * @desc     login
 * @route    Post/api/v1/auth/login
 * @access   Pubic
 */
exports.loginUser = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user || await bcrypt.compare(req.body.password , user.password)) {
        return next(new ApiError(`Incorrect email or password`,401))
    }
    const token = await createToken(user._id);
    res.status(200).json({data: user , token})
})