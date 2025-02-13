const express = require('express');
const myController = require('../Controller/myController');
// const {getAllUser, getUserByUserName, addUser} = require('../Controller/myController');
const router = express.Router();

// get all user
router.get('/user', myController.getAllUser);

// get user by userName
router.get('/user/:user', myController.getUserByUserName);

// add user into user.json Model
router.post('/user', myController.addUser);

module.exports = router;