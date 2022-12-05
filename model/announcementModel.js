"use strict";
const pool = require("../database/db");
const promisePool = pool.promise();

const getAnnouncement = async(res) => {
    try{
        const [rows]= await promisePool.query("select announcement.text, announcement.dateandtime, users.first_name, users.last_name from announcement,users where announcement.userssn = users.userssn;");
        return rows;
    }catch (e){
        res.status(500).send(e.message);
    }
};

const addAnnouncement = async(announcement,res) => {
    try{
        const values = [announcement.text,announcement.media_filename,announcement.dateandtime,announcement.userssn];
        const sql = "INSERT INTO announcement VALUES (null,?,?,?,?)";
        const [result] = await promisePool.query(sql, values);
        return result.insertId;

    }catch(e){
        res.status(500).send(e.message);
    }
};




module.exports = { 
    getAnnouncement,
    addAnnouncement,
};