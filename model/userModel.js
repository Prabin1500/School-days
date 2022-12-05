"use strict";
const pool = require("../database/db");
const promisePool = pool.promise();

const getAllUsers = async(req,res) =>{
    try{
        const [rows] = await promisePool.query("select users.first_name,users.last_name,users.email,users.phone_number, users.class from users");
        return rows;
    }catch(e){
        console.log("error", e.message);
        res.status(500).send(e.message);
    }
};

const getTeacherList = async(req,res) =>{
    try{
        const [rows] = await promisePool.query("select users.first_name,users.last_name,users.email,users.phone_number, users.class from users where role = ?","teacher");
        return rows;
    }catch(e){
        res.status(500).send(e.message);
    }
};

const addUser = async(user, res) => {
    
    try{
        const [rows] = await promisePool.query('INSERT INTO users(USERSSN, FIRST_NAME, LAST_NAME, EMAIL, PHONE_NUMBER, ROLE, USERNAME, PASSWORD, CLASS) VALUES (?,?,?,?,?,?,?,?,?)', [user.userssn, user.firstName, user.lastName, user.email, user.phoneNumber, user.role, user.username, user.password, user.class]);
            return rows.insertId;
    }catch(e){
        console.error('user model, add user error', e.message);
        res.status(500).json({ message: 'something went wrong'});
    }
};

const addStudent = async(user, res) => {
    
    try{
        const [rows] = await promisePool.query('INSERT INTO students(CHILDSSN, FIRST_NAME, LAST_NAME, CLASS, USERSSN) VALUES (?,?,?,?,?)', [user.childssn, user.firstname, user.lastname, user.class, user.parentssn]);
            return rows.insertId;
    }catch(e){
        console.error('user model, add student error', e.message);
        res.status(500).json({ message: 'something went wrong'});
    }
};

const getUserLogin = async (user) => {
    try{
        console.log('getUserLogin()', user);
        const[rows] = await promisePool.execute(
            "SELECT * FROM users WHERE users.email = ?;",
        user);
        
        return rows;
    }catch(e){
        console.log("error : ", e.message);
        res.status(500).send(e.message);
    }
};



module.exports = {
    getAllUsers,
    getTeacherList,
    addUser,
    addStudent,
    getUserLogin,
};