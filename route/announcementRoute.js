'use strict;'

const express = require('express');
const router = express.Router();
const multer = require('multer');
const announcementController = require('../controller/announceController');

const upload = multer({dest: 'uploads/'});

router.get('/announcement',announcementController.getAnnouncement)
router.post('/announcement',upload.single('media_filename'),announcementController.addAnnouncement)

module.exports = router;