const asyncHandler = require('express-async-handler');
const ApiError = require('../Utils/ApiError');
const User = require('../Models/userSchema');
const crypto = require('node:crypto');

/**
 * @desc  Create specific user
 * @route  Post /api/v1/user
 * @access Public
 */
exports.createUser = asyncHandler(async (req, res, next) => {
    const user = await User.create(req.body);
    res.status(200).json({ data: user });
});
/**
 * @desc  Get All user
 * @route  Get /api/v1/users
 * @access Public
 */
exports.getUser = asyncHandler(async (req, res, next) => {
    const users = await User.find();
    if (!users) {
        return next(new ApiError('Not found user', 404));
    }
    res.status(200).json({ data: users })
});
/**
 * @desc  update specific user
 * @route  Put /api/v1/user
 * @access Privet
 */
exports.updateUser = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        avatar: req.body.avatar,
        password: req.body.password,
    }, {new: true});
    if (!user) {
        return next(new ApiError(`Not found user By Id`, 404));
    }
    user.save();

    res.status(200).json({ data: user });

})
/**
 * @desc  delete specific user
 * @route  Delete /api/v1/user
 * @access Privet
 */
exports.deleteUser = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
        return next(new ApiError(`Not fount User By Id`, 404));
    }
    user.deleteOne()
    res.status(204).send()
})