'use strict';

const announcementModel = require('../model/announcementModel');

const getAnnouncement = async(req,res) =>{
    const announcement = await announcementModel.getAnnouncement();
    res.json(announcement);
};

module.exports = {
    getAnnouncement
};