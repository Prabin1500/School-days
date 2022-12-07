'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const userRoute = require('./route/userRoute');
const announcementRoute = require('./route/announcementRoute');
const authRoute = require("./route/authRoute");
const passport = require('./utils/passport')
const port = 3000; 

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(passport.initialize());

app.use('', userRoute);
app.use('',announcementRoute);
app.use("/auth", authRoute);


app.listen(port, () => console.log(`Example app listening on port ${port}!`));  