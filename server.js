import express from 'express';
import bodyParser from "body-parser";
import viewEngine from "./src/config/viewEngine";
import initWebRoutes from "./src/route/web";
import connectDB from './src/config/connectDB'
import cors from 'cors'
const path = require('path');

const hbs = require('express-handlebars');
const session = require('express-session');

require('dotenv').config

let app = express();

app.use(cors({ origin: true }))

app.engine(
    'hbs',
    hbs.engine({
        extname: '.hbs',
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/src/Resource/views'));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
    
  }))

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 6969;

app.listen(port, () => {
    console.log("RUNNING ON " + port + " PORT");
})