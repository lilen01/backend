const express = require('express');
const myController = require('../Controller/myController');
// const {getAllUser, getUserByUserName, addUser} = require('../Controller/myController');
const router = express.Router();

// get all user
router.get('/user', myController.getAllUser);

// get user by userName
router.get('/user/:userName', myController.getUserByUserName);

// add user into user.json Model
router.post('/user', myController.addUser);

//update existing data from user.json
router.put('/user/:userName', myController.updateUser);

// delete specific user from user.json (by username)
router.delete('/user/:userName', myController.deleteUser);

module.exports = router;