"use strict";
const pool = require("../database/db");
const promisePool = pool.promise();


//getAllMessages from database between reciever and sender and viceversa which later can be shown as a chat format conversation
const recievedMessages = async(data) =>{
    try{    
        const [rows] = await promisePool.query("select message.description,message.sender,message.dateandtime from message where (reciever=? or sender=?) and (reciever=? or sender=?);",data);
        return rows;
    }catch(e){
        console.log(e);
    }
}

// dashboard message is the message that is shown as the message recieved by the user when they open their message tab.
const dashboardMessages = async(data) =>{
    try{    
        const [rows] = await promisePool.query("select message.description,message.sender,message.dateandtime from message where reciever=? order by id asc;",data);
        return rows;
    }catch(e){
        console.log(e);
    }
}

//this is for posting message into database.
const sendMessage = async(data)=>{
    try{   
        const [rows] = await promisePool.query("INSERT INTO message VALUES(null,?,?,?,?);",data);
        return rows;
    }catch(e){
        console.log(e);
    }
}

module.exports={
    dashboardMessages,
    recievedMessages,
    sendMessage
}