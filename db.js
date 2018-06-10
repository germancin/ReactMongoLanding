const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const config = require('./config');

const options = {
    autoReconnect: true
};

module.exports = {
    connectTo: () => {
        return mongoose.connect(config.db_credentials, options)
            .then(conn => console.log(`Connected to MongoDB DB:${config.db_name}`))
            .catch(err => {
                return err;
            });
    },
};