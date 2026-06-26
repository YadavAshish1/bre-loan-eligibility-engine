const express = require('express');
const router = express.Router();
const bankController = require('../controllers/bankController');

// GET /api/banks/rules
router.get('/rules', bankController.getAllRules);

module.exports = router;
