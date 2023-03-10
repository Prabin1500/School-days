"use strict";
const pool = require("../database/db");
const promisePool = pool.promise();

//get all announcement from database
const getAnnouncement = async () => {
  try {
    const [rows] = await promisePool.query(
      "select announcement.announcementid,announcement.text,announcement.media_filename, announcement.dateandtime, users.first_name, users.last_name from announcement,users where announcement.userssn = users.userssn and users.role = ? order by announcementid desc;","admin"
    );
    return rows;
  } catch (e) {
    console.log(e);
  }
};

//get Announcement from database according to Announcement ID (used for updating announcement.)
const getAnnouncementById = async(announcementID) => {
  const [rows]= await promisePool.query("SELECT * FROM announcement where announcementid =?",announcementID); 
  return rows[0];
};

//get Announcement from database based on UserSSN
const announcementFiltered = async(userssn) =>{
  const [rows] = await promisePool.query("SELECT announcement.announcementid,announcement.text,announcement.media_filename, announcement.dateandtime, users.first_name, users.last_name from announcement,users where announcement.userssn=users.userssn and announcement.userssn = ? order by announcementid desc; ",[userssn]);
  console.log(rows);
  return rows;
};

//get Announcement from database based on class
const announcementFilteredByClass = async(Class) =>{
  const [rows] = await promisePool.query("SELECT announcement.announcementid,announcement.text,announcement.media_filename, announcement.dateandtime, users.first_name, users.last_name from announcement,users where announcement.class=? and announcement.userssn = users.userssn  order by announcementid desc;", [Class]);
  console.log(rows);
  return rows;
};

//get all announcement from database
const getAllAnnouncement=async() =>{
  try{const [rows] = await promisePool.query("select announcement.announcementid,announcement.text,announcement.media_filename, announcement.dateandtime, users.first_name, users.last_name from announcement,users where announcement.userssn = users.userssn  order by announcementid desc;");
    return rows;
  }catch(e){
    console.log(e)
  }
};

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
      announcement.class,
    ];
    const sql = "INSERT INTO announcement VALUES (null,?,?,?,?,?)";
    const [result] = await promisePool.query(sql, values);
    if(announcement.class == null){
      return res.redirect('http://127.0.0.1:5501/UI/admin_announcement.html');
    }else{
      return res.redirect('http://127.0.0.1:5501/UI/teacher_announcement.html');
    }
    
  } catch (e) {
    res.status(500).send(e.message);
  }
  
};

//adding announcement into database without image(just text, poster ssn, data and time and class)
const addAnnouncementNoImage = async(data,res) => {
  try{
    // https://stackoverflow.com/questions/10211145/getting-current-date-and-time-in-javascript
    var currentdate = new Date(); 
    var datetime = currentdate.getDate() + "/"
      + (currentdate.getMonth()+1)  + "/" 
      + currentdate.getFullYear()+" "  
      + currentdate.getHours() + ":"  
      + currentdate.getMinutes() + ":" 
      + currentdate.getSeconds();
    const sql =
  "INSERT INTO announcement(text,dateandtime,userssn,class) VALUES (?,?,?,?)";
  const[rows]=  await promisePool.query(sql, [data.text, datetime,data.userssn, data.class]);
  
  if(data.class == null){
    return res.redirect('http://127.0.0.1:5501/UI/admin_announcement.html');
  }else{
    return res.redirect('http://127.0.0.1:5501/UI/teacher_announcement.html');
  }
  
  }catch(e){
    res.status(500).send(e.message);
  }
};

//delete announcement from database
const deleteAnnouncement = async(announcementID, res) => {
  try{
    const [result] = await promisePool.query("DELETE FROM announcement where announcementid = ? ", [announcementID]);
    return result;
  }catch (e) {
    console.error("error", e.message);
    res.status(500).send(e.message);
  }
};

//update announcement already on database (only text and time, no image)
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
    console.log(announcement);
    
  }catch(e){
    console.error("error", e.message);
    res.status(500).json({'error': e.message});
  } 
};

module.exports = {
  getAnnouncement,
  getAnnouncementById,
  getAllAnnouncement,
  addAnnouncement,
  addAnnouncementNoImage,
  deleteAnnouncement,
  updateAnnouncement,
  announcementFiltered,
  announcementFilteredByClass
};
