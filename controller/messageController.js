'use strict';

const messageModel = require('../model/messageModel');

const recievedMessages = async(req,res) =>{
    const data =  [req.params.reciever,req.params.reciever,req.params.sender,req.params.sender]
    const message = await messageModel.recievedMessages(data);
    res.json(message);
}

const dashboardMessages = async(req,res) =>{
    const data =  [req.params.reciever]
    const message = await messageModel.dashboardMessages(data);
    res.json(message);
}

const sendMessage = async(req,res) =>{
    const data = req.body;
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
    const newData = [data.description,data.sender,data.reciever,datetime];
    const message= await messageModel.sendMessage(newData);
    res.redirect('https://schooldays.northeurope.cloudapp.azure.com/app/UI/admin_pages/admin_message/admin_message.html');
}

module.exports={
    recievedMessages,
    sendMessage,
    dashboardMessages,
}