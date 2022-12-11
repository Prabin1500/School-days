"use strict";
const pool = require("../database/db");
const promisePool = pool.promise();

//get all announcement from database
const getAnnouncement = async () => {
  try {
    const [rows] = await promisePool.query(
      "select announcement.announcementid,announcement.text,announcement.media_filename, announcement.dateandtime, users.first_name, users.last_name from announcement,users where announcement.class = 0 and announcement.userssn = users.userssn  order by announcementid desc;"
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

const announcementFiltered = async(classId) =>{
  const [rows] = await promisePool.query("SELECT announcement.announcementid,announcement.text,announcement.media_filename, announcement.dateandtime, users.first_name, users.last_name from announcement,users where announcement.userssn=users.userssn and announcement.class = ? order by announcementid desc; ",[classId]);
  console.log(rows);
  return rows;
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
      announcement.class,
    ];
    const sql = "INSERT INTO announcement VALUES (null,?,?,?,?,?)";
    const [result] = await promisePool.query(sql, values);
    return res.redirect("http://127.0.0.1:5501/UI/teacher_pages/teacher_announcement/teacher_announcement.html");
    
  } catch (e) {
    res.status(500).send(e.message);
  }
  
};

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
  return res.redirect("http://127.0.0.1:5501/UI/teacher_pages/teacher_announcement/teacher_announcement.html");
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
    return res.redirect("http://127.0.0.1:5501/UI/teacher_pages/teacher_announcement/teacher_announcement.html");
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
  announcementFiltered,
};
