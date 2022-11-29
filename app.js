'use strict';

const express = require('express');
const app = express();
const userRoute = require('./route/userRoute');
const port = 3000; 

app.use(express.json()); // for parsing application/json
app.use('', userRoute);


app.listen(port, () => console.log(`Example app listening on port ${port}!`));  