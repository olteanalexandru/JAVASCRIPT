"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const port = process.env.PORT || 5000;
const { errorhandler } = require('./middleware/errormiddleware');
const app = express();
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();
connectDB();
app.use(express.json());
//middleware:
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/api/movies', require('../routes/routes'));
app.use('/', require('../routes/routes'));
app.use(errorhandler);
app.listen(port, () => console.log('listening on port ' + port));
