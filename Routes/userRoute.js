const express = require('express');

const { createUser,getUser,updateUser,deleteUser } = require('../Services/userService');

const router = express.Router();
router.route('/').post( createUser).get(getUser);
router.route('/:id').put( updateUser).delete(deleteUser);
module.exports = router