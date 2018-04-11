const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LeadSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'Please provide your email.'],
        unique: [true, 'Email already in DB.'],
    },
    phone: {
        type: String,
        unique: [true, 'Phone already in DB.'],
    },
});

module.exports = mongoose.model('Leads', LeadSchema);
