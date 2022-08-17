
const express = require('express')
const port = process.env.PORT || 5000;
const { errorHandler } = require('./middleware/errorMiddleware')
const app = express()
const connectDB = require ('./config/db')
const cors = require('cors');
require('dotenv').config();


connectDB()
app.use(express.json())
//middleware:
app.use(express.urlencoded({extended:false}))
app.use(cors());

app.use('/api/movies', require('./routes/routes'))
app.use('/', require('./routes/routes'))
app.use(errorHandler)

app.listen (port, () => console.log('listening on port ' + port))
export {};