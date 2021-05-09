const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path');
const connectDB = require ('./server/database/connection');

const app = express();

dotenv.config({path:'config.env'})
const PORT = process.env.PORT || 8080

//log requests
app.use(morgan('tiny'));

//Mongodb
connectDB();

//Req Parse para o Body Parser
app.use(bodyParser.urlencoded({extended:true}))

//Set View
app.set("view engine", "ejs")
app.set("views", path.resolve(__dirname, "view"))

//load assembleStyles
app.use ('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use ('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use ('/js', express.static(path.resolve(__dirname, "assets/js")))


//Carregando Routes
app.use('/', require('./server/routes/router'))


app.listen(PORT, ()=> {console.log(`Servidor ON -  http://localhost:${PORT}`)});