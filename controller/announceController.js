"use strict";

const announcementModel = require("../model/announcementModel");

const getAnnouncement = async (req,res) => {
  const announcement = await announcementModel.getAnnouncement();
  res.json(announcement);
};
const announcementFiltered = async (req,res) => {
  const announcement = await announcementModel.announcementFiltered(req.params.userssn);
  res.json(announcement);
};

const getAnnouncementById = async(req,res) =>{
  try{
    const announcement = await announcementModel.getAnnouncementById(req.params.announcementId);
    res.json(announcement);
  }catch(e){
    res.sendStatus(404);
  }
};

const addAnnouncement = async (req, res) => {
  const announcement = req.body;
  announcement.media_filename = req.file.filename;
  const announcementId = await announcementModel.addAnnouncement(announcement,res);
};

const addAnnouncementNoImage = async(req,res) =>{
      const data = req.body; 
      const announcementId=await announcementModel.addAnnouncementNoImage(data,res);
      console.log(data);
}   

const deleteAnnouncement = async (req, res) => {
    const announcement = await announcementModel.deleteAnnouncement(req.params.announcementId, res);
    if (announcement.affectedRows > 0) {
      res.json({message: 'announcement deleted'});
    } else {
      res.status(404).json({message: 'announcement was already deleted'});
    }
};

const updateAnnouncement = async (req,res) =>{
  let data = req.body;
  console.log(data);
  const result = await announcementModel.updateAnnouncement(data,res);
}

module.exports = {
  getAnnouncement,
  getAnnouncementById,
  addAnnouncement,
  addAnnouncementNoImage,
  deleteAnnouncement,
  updateAnnouncement,
  announcementFiltered
};
