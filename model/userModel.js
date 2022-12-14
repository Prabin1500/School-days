"use strict";
const pool = require("../database/db");
const promisePool = pool.promise();


//get all users required information from database excluding password.
const getAllUsers = async(req,res) =>{
    try{
        const [rows] = await promisePool.query("select users.first_name,users.last_name,users.email,users.phone_number, users.class, users.role, users.userssn,users.username from users");
        return rows;
    }catch(e){
        console.log("error", e.message);
        res.status(500).send(e.message);
    }
};

//get all users info from database where their role is teacher
const getTeacherList = async(req,res) =>{
    try{
        const [rows] = await promisePool.query("select users.first_name,users.last_name,users.email,users.phone_number, users.class,users.username from users where role = ?","teacher");
        return rows;
    }catch(e){
        res.status(500).send(e.message);
    }
};

//get all students info from the database
const getStudentList = async(req,res) =>{
    try{
        const [rows] = await promisePool.query("select students.first_name, students.last_name, students.class, students.userssn from students");
        return rows;
    }catch(e){
        res.status(500).send(e.message);
    }
};

//add users into database (performed using admin)
const addUser = async(user, res) => {
    
    try{
        if(user.class === 'Null'){
            const [rows] = await promisePool.query('INSERT INTO users(USERSSN, FIRST_NAME, LAST_NAME, EMAIL, PHONE_NUMBER, ROLE, USERNAME, PASSWORD) VALUES (?,?,?,?,?,?,?,?)', 
                            [user.userssn, user.firstName, user.lastName, user.email, user.phoneNumber, user.role, user.username, user.password, null]);
                            return rows.insertId;

        }else{
            const [rows] = await promisePool.query('INSERT INTO users(USERSSN, FIRST_NAME, LAST_NAME, EMAIL, PHONE_NUMBER, ROLE, USERNAME, PASSWORD, CLASS) VALUES (?,?,?,?,?,?,?,?,?)', 
                            [user.userssn, user.firstName, user.lastName, user.email, user.phoneNumber, user.role, user.username, user.password, user.class]);
                            return rows.insertId;
        }
        
    }catch(e){
        console.error('user model, add user error', e.message);
        res.status(500).json({ message: 'something went wrong'});
    }
};

//add student into database (performed using admin)
const addStudent = async(user, res) => {
    
    try{
        const [rows] = await promisePool.query('INSERT INTO students(CHILDSSN, FIRST_NAME, LAST_NAME, CLASS, USERSSN) VALUES (?,?,?,?,?)', [user.childssn, user.firstname, user.lastname, user.class, user.parentssn]);
            return rows.insertId;
    }catch(e){
        console.error('user model, add student error', e.message);
        res.status(500).json({ message: 'something went wrong'});
    }
};

//for login
const getUserLogin = async (user) => {
    try{
        const[rows] = await promisePool.query("SELECT * FROM users WHERE users.email = ? or users.username =?",
        [user,user]);
        
        return rows;
    }catch(e){
        console.log("error : ", e.message);
        res.status(500).send(e.message);
    }
};

//getting parent list for teacher
const getParentList = async() =>{
    const [rows] = await promisePool.query("select users.first_name,users.last_name,users.username,students.first_name as student_fname,students.last_name as student_lname from users,students where users.userssn = students.userssn;");
    return rows;
}



module.exports = {
    getAllUsers,
    getTeacherList,
    getStudentList,
    addUser,
    addStudent,
    getUserLogin,
    getParentList,
};