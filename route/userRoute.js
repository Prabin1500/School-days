'use strict;'

const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')

router.get('/', userController.getAllUsers);
router.get('/teacher', userController.getTeacherList);
router.get('/student', userController.getStudentList);
router.post('/',userController.createUser);
router.get('/token', userController.checkToken);

module.exports = router;