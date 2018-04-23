const mongoose = require('mongoose');
const config = require('./config');
mongoose.Promise = global.Promise;

const options = {
    autoReconnect: true
};

module.exports = {
    connectTo: function (database = config.db_name, host = config.host) {
        return mongoose.connect(`mongodb://${host}/${database}`, options)
            .then(conn => console.log(`Connected to MongoDB - Server:159.65.170.21 DB:${database}`))
            .catch(err => {
                return err;
            });
    },
};
