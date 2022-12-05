'use strict;'

const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')

router.get('/', userController.getAllUsers);
router.get('/teacher', userController.getTeacherList);


module.exports = router;