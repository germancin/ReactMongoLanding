const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const options = {
    autoReconnect: true
};

module.exports = {
    // TODO: move this configurations to config.js for security reasons
    connectTo: function (database = 'db_landing', host = 'germancin:secure123@159.65.170.21') {
        return mongoose.connect(`mongodb://${host}/${database}`, options)
            .then(conn => console.log(`Connected to MongoDB - Server:159.65.170.21 DB:${database}`))
            .catch(err => {
                console.log('error ::::' + err);
                return err;
            });
    },
};
