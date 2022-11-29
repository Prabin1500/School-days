"use strict";
const pool = require("../database/db");
const promisePool = pool.promise();

const getAllUsers = async(req,res) =>{
    try{
        const [rows] = await promisePool.query("SELECT * FROM users");
        return rows;
    }catch(e){
        console.log("NO SUCCESS");
    }
};

const getTeacherList = async(req,res) =>{
    try{
        const [rows] = await promisePool.query("select users.first_name,users.last_name,users.email,users.phone_number from users where role = ?","teacher");
        return rows;
    }catch(e){
        console.log("NO SUCCESS");
    }
};



module.exports = {
    getAllUsers,
    getTeacherList,
};