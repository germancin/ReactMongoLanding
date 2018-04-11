const mongoose = require('mongoose');

const LeadSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    phone: {
        type: String,
    },
});

module.exports = mongoose.model('Leads', LeadSchema);