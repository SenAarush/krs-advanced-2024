const express = require('express');
const app = express.Router();
const controller = require('../controllers/user.controller');


app.get('/health',controller.healthCheck );


module.exports = app;