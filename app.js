'use strict';

const express = require('express');
const app = express();
const userRoute = require('./route/userRoute');
const announcementRoute = require('./route/announcementRoute');
const port = 3000; 

app.use(express.json()); // for parsing application/json
app.use('', userRoute);
app.use('',announcementRoute);


app.listen(port, () => console.log(`Example app listening on port ${port}!`));  