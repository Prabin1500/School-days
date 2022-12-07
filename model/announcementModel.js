"use strict";
const pool = require("../database/db");
const promisePool = pool.promise();

//get all announcement from database
const getAnnouncement = async () => {
  try {
    const [rows] = await promisePool.query(
      "select announcement.announcementid,announcement.text,announcement.media_filename, announcement.dateandtime, users.first_name, users.last_name from announcement,users where announcement.userssn = users.userssn;"
    );
    return rows;
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const getAnnouncementById = async(announcementID) => {
  const [rows]= await promisePool.query("SELECT * FROM announcement where announcementid =?",announcementID); 
  return rows[0];
}

// add all announcement into database
const addAnnouncement = async (announcement, res) => {
  try {
    // https://stackoverflow.com/questions/10211145/getting-current-date-and-time-in-javascript
    var currentdate = new Date();
    var datetime =
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      " " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();
    announcement.dateandtime = datetime;
    const values = [
      announcement.text,
      announcement.media_filename,
      announcement.dateandtime,
      announcement.userssn,
    ];
    const sql = "INSERT INTO announcement VALUES (null,?,?,?,?)";
    const [result] = await promisePool.query(sql, values);
    return result.insertId;
  } catch (e) {
    res.status(500).send(e.message);
  }
  
};

const addAnnouncementNoImage = async(data,res) => {
  try{
    const {text,userssn} = data;
    // https://stackoverflow.com/questions/10211145/getting-current-date-and-time-in-javascript
    var currentdate = new Date(); 
    var datetime = currentdate.getDate() + "/"
      + (currentdate.getMonth()+1)  + "/" 
      + currentdate.getFullYear()+" "  
      + currentdate.getHours() + ":"  
      + currentdate.getMinutes() + ":" 
      + currentdate.getSeconds();
    const sql =
  "INSERT INTO announcement(text,dateandtime,userssn) VALUES (?,?,?)";
  const[rows]=  await promisePool.query(sql, [text, datetime, userssn]);
  return res.redirect("http://127.0.0.1:5501/UI/announcement.html");
  }catch(e){
    res.status(500).send(e.message);
  }
};

const deleteAnnouncement = async(announcementID, res) => {
  try{
    const [result] = await promisePool.query("DELETE FROM announcement where announcementid = ? ", [announcementID]);
    return result;
  }catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

const updateAnnouncement = async (announcement,res) => {
  try{
  var currentdate = new Date();
  var datetime =
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();
    const{text,announcementid} = announcement;
    const [rows] =  await promisePool.query("UPDATE announcement SET text =?, dateandtime=? where announcementid = ?",[text,datetime,announcementid]); 
    return res.redirect("http://127.0.0.1:5501/UI/announcement.html");
  }catch(e){
    console.error("error", e.message);
    res.status(500).json({'error': e.message});
  } 
};

module.exports = {
  getAnnouncement,
  getAnnouncementById,
  addAnnouncement,
  addAnnouncementNoImage,
  deleteAnnouncement,
  updateAnnouncement,
};
