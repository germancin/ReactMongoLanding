const LeadModel = require('../models/leadModel');

const createLead = (req, res) => {
    const lead = new LeadModel(req.body);
    lead.save(function (err) {
        console.log('this is the error', err)
    })
        .then(newLead => res.status(201).send(newLead))
        .catch(error => {

            console.log('this is the error', error);
            res.status(404).send({error});
        });
};

const getLeads = (req, res) => {
    LeadModel.find({})
        .populate()
        .exec((err, resp) => {
            res.status(200).send(resp);

        });


};

module.exports = {createLead, getLeads};
