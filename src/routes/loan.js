const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');
const validateApplication = require('../middleware/validateApplication');

// POST /api/loan/check-eligibility
router.post('/check-eligibility', validateApplication, loanController.checkEligibility);

module.exports = router;
