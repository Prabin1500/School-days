"use strict";
const pool = require("../database/db");
const promisePool = pool.promise();

//getAllMessages

const recievedMessages = async(data) =>{
    try{    
        const [rows] = await promisePool.query(" select message.description,message.sender,message.dateandtime from message where (reciever=? or sender=?) and (reciever=? or sender=?);",data);
        return rows;
    }catch(e){
        console.log(e);
    }
}

const dashboardMessages = async(data) =>{
    try{    
        const [rows] = await promisePool.query(" select message.description,message.sender,message.dateandtime from message where reciever=? order by id asc;",data);
        return rows;
    }catch(e){
        console.log(e);
    }
}

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