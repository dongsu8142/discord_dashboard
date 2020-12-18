require('dotenv').config();
require('./strategies/discord');
const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const Store = require('connect-mongo')(session);
const app = express();
const https = require('https');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 2053;
const routes = require('./routes');

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({
    origin: ["http://127.0.0.1", "https://jjab6.ml", "http://127.0.0.1:3000"],
    credentials: true
}))

app.use(session({
    secret: 'secret',
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    resave: false,
    saveUninitialized: false,
    store: new Store({ mongooseConnection: mongoose.connection })
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', routes);

const sslServer = https.createServer(
    {
        key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
        cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
    },
    app
)

sslServer.listen(PORT, () => console.log(`Running on Port ${PORT}`));