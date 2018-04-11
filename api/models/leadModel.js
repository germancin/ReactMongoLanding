const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LeadSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        unique: true,
    },
});

module.exports = mongoose.model('Leads', LeadSchema);
