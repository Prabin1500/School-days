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




module.exports = { 
    getAnnouncement
};