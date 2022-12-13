'use strict;'

const express = require('express');
const router = express.Router();
const multer = require('multer');
const messageController = require('../controller/messageController');
const upload = multer({dest: 'uploads/'});

router.get('/messages/:reciever&:sender',messageController.recievedMessages)
router.post('/sendMessage',upload.single(''),messageController.sendMessage)
router.get('/allMessages/:reciever',messageController.dashboardMessages)

module.exports = router;