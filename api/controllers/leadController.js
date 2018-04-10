const NoteModel = require('../models/leadModel');

const createLead = (req, res) => {
    const note = new NoteModel(req.body);
    note.save()
        .then(newNote => res.status(201).send(newNote))
        .catch(err => {
            res.status(500).send({error: "Something went wrong saving your lead information", info: err});
        });
};

const getLeads = (req, res) => {
    NoteModel.find({})
        .populate()
        .exec((err, resp) => res.status(200).send(resp));
};

module.exports = {createLead, getLeads};