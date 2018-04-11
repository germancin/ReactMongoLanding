const LeadModel = require('../models/leadModel');

const createLead = (req, res) => {
    const lead = new LeadModel(req.body);

    console.log('sdfsdfsf');
    lead.save()
        .then(newLead => {
            console.log(newLead);
            res.status(200).send(newLead)
        })
        .catch(error => res.status(500).send({error}));
};

const getLeads = (req, res) => {
    LeadModel.find({})
        .populate()
        .exec((err, resp) => {
            res.status(200).send(resp);
        });
};

module.exports = {createLead, getLeads};
