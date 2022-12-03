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
const deleteAnnouncement = async(req,res) => {
    console.log(req.params.announcementId);
    const announcement = await announcementModel.deleteAnnouncement(res,req.params.announcementId);
    if(!announcement){
        res.json(announcement);
    }else{
        res.sendStatus(404);
    }
};

module.exports = {
    getAnnouncement,
    addAnnouncement,
    deleteAnnouncement,
};