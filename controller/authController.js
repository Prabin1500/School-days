"use strict";

const jwt = require("jsonwebtoken");
const passport = require("passport");
const {addUser, addStudent} = require('../model/userModel');
require("dotenv").config();

const login = (req, res) => {
    passport.authenticate("local", {session:false}, (err, user, info) => {
        if(err || !user){
            return res.status(400).json({
                message : "Something went wrong",
                user : user,
            });
        }

        req.login(user,{session : false}, (err) => {
            if(err){
                res.send(err);
            }
            const token = jwt.sign(user, process.env.JWT_SECRET);
            return res.json({user, token});
            console.log("Welcome");
        });
    })(req, res);
};

const registerUser = async (req, res) => {
    console.log('Creating a new user:', req.body);
    const newUser = req.body;      
    
    const result = await addUser(newUser, res);
    //res.status(201).json({ message: 'user created', userId: result });
    
};

const registerStudent = async (req, res) => {
    console.log('Creating a new user:', req.body);
    const newUStudent = req.body;      
    
    const result = await addStudent(newUStudent, res);
    //res.status(201).json({ message: 'user created', userId: result });
    
};

const logout = (req, res) => {
    console.log('some user logged out');
    res.json({message: 'logged out'});
  };

module.exports = {
    login,
    logout,
    registerUser,
    registerStudent,
}