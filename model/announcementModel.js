"use strict";
const pool = require("../database/db");
const promisePool = pool.promise();

//get all announcement from database
const getAnnouncement = async(res) => {
    try{
        const [rows]= await promisePool.query("select announcement.announcementid,announcement.text,announcement.media_filename, announcement.dateandtime, users.first_name, users.last_name from announcement,users where announcement.userssn = users.userssn;");
        return rows;
    }catch (e){
        res.status(500).send(e.message);
    }
};

// add all announcement into database
const addAnnouncement = async(announcement,res) => {
    try{
        // https://stackoverflow.com/questions/10211145/getting-current-date-and-time-in-javascript
        var currentdate = new Date(); 
        var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear()+" "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
        announcement.dateandtime = datetime;
        const values = [announcement.text,announcement.media_filename,announcement.dateandtime,announcement.userssn];
        const sql = "INSERT INTO announcement VALUES (null,?,?,?,?)";
        const [result] = await promisePool.query(sql, values);
        return result.insertId;

    }catch(e){
        res.status(500).send(e.message);
    }
};
const deleteAnnouncement = async(res,announcementID) =>{
    try{
        const [result] = await promisePool.query("DELETE FROM announcement where announcementid=?",[announcementID]);
        return result.insertId;
    }catch(e){
        res.status(501).send(e.message)
    }
};




module.exports = { 
    getAnnouncement,
    addAnnouncement,
    deleteAnnouncement,
};