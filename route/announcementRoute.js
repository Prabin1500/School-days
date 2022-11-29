'use strict;'

const express = require('express');
const router = express.Router();
const announcementController = require('../controller/announceController');

router.get('/announcement',announcementController.getAnnouncement)

module.exports = router;