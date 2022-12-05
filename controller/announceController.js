'use strict';

const announcementModel = require('../model/announcementModel');

const getAnnouncement = async(req,res) =>{
    const announcement = await announcementModel.getAnnouncement();
    res.json(announcement);
};

const addAnnouncement = async(req,res) =>{
    const announcement = req.body;
    const announcementId = await announcementModel.addAnnouncement(announcement,res);
    res.status(201).json({message: 'announcement added', announcementId});
};

module.exports = {
    getAnnouncement,
    addAnnouncement,
};