'use strict;'

const express = require('express');
const router = express.Router();
const multer = require('multer');
const announcementController = require('../controller/announceController');

const upload = multer({dest: 'uploads/'});

router.get('/announcement',announcementController.getAnnouncement)
router.get('/announcementById/:announcementId',announcementController.getAnnouncementById)
router.post('/announcement',upload.single('media_filename'),announcementController.addAnnouncement)
router.delete('/announcement/:announcementId',announcementController.deleteAnnouncement)
router.post('/announcementUpdate',upload.single(''),announcementController.updateAnnouncement)
router.post('/noimage',upload.single(''),announcementController.addAnnouncementNoImage)
router.get('/announcementFiltered/:userssn',announcementController.announcementFiltered)
router.get('/announcementFilteredByClass/:class',announcementController.announcementFilteredByClass)
module.exports = router;