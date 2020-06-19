const express = require('express');
const server = express();

require('dotenv').config()

server.use(express.json());

const routes = require('./routes');
server.use(routes);

server.listen(3000, () => {
    console.log("Server listening on port 3000");
});
