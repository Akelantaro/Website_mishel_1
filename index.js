const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const port = 4000;

const config = require('./config/db');

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser(config.secret));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

mongoose.connect(config.db);

mongoose.connection.on('connected', () => {
    console.log("Мы успешно подключились к бд");
});

mongoose.connection.on('error', (err) => {
    console.log("Мы не подключились к бд: " + err);
});

app.listen(port, () => {
    console.log("Сервер был запущен по порту: " + port);
});
