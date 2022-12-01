'use strict';

const announcementModel = require('../model/announcementModel');

const getAnnouncement = async(req,res) =>{
    const announcement = await announcementModel.getAnnouncement();
    res.json(announcement);
};

const addAnnouncement = async(req,res) =>{
    const announcement = req.body;
    announcement.media_filename = req.file.filename;
    const announcementId = await announcementModel.addAnnouncement(announcement,res);
    res.status(201);
};

module.exports = {
    getAnnouncement,
    addAnnouncement,
};