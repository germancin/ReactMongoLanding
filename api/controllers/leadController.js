const LeadModel = require('../models/leadModel');
const path = require('path');

const createLead = (req, res) => {
    const note = new LeadModel(req.body);
    note.save()
        .then(newLead => res.status(201).send(newLead))
        .catch(err => {
            res.status(500).send({error: "Something went wrong saving your lead information", info: err});
        });
};

const getLeads = (req, res) => {
    LeadModel.find({})
        .populate()
        .exec((err, resp) => {

            res.sendFile(path.join(__dirname, '/landing/build/index.html'));
            res.status(200).send(resp);

        });


};

module.exports = {createLead, getLeads};
