const express = require('express');
const nunjucks = require('nunjucks');
const server = express();
const path = require('path');

const routes = require('./routes');

nunjucks.configure(__dirname + "/views", {
    express: server,
    noCache: true
});

const directory = path.join(__dirname + "/views/public/");

server.use(express.urlencoded({extended: true}));

server.use(express.static(path.join(directory)));

server.use(routes);

server.listen(3333);