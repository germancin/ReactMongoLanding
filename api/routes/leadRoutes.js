const express = require('express');
const leadController = require('../controllers/leadController');
let appRouter = express.Router();
const jwt = require('../service/auth');


// EndPoint: /api/lead/

appRouter.route('/').get(leadController.getLeads);

// appRouter.route('/').post(jwt.validateToken, leadController.createNote);
appRouter.route('/').post(leadController.createLead);

appRouter.route('/').put(leadController.updateLeads);

appRouter.route('/delete').post(leadController.deleteLeads);

module.exports = appRouter;