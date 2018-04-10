const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const server = express();
const db = require('./db');
const leadRoutes = require('./api/routes/leadRoutes');
const userRoutes = require('./api/routes/userRoutes');

const port = process.env.PORT || 8080;

server.use(helmet());
server.use(express.json());

// Adding Headers for requests.
server.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

server.use(cookieParser());

server.use('/api/lead', leadRoutes);
server.use('/api/user', userRoutes);

db.connectTo()
    .then(() => console.log('\n... API Connected to Database ...\n'))
    .catch(err => console.log('\n*** ERROR Connecting to Database ***\n', err));


server.listen(port, () => {
    console.log(`Server listening on ${port}`);
});



