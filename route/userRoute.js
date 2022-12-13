'use strict;'

const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')

router.get('/', userController.getAllUsers);
router.get('/teacher', userController.getTeacherList);
router.get('/student', userController.getStudentList);
router.get('/token', userController.checkToken);
router.get('/parent', userController.getParentList);

module.exports = router;