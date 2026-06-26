const { query } = require('../config/database');
const { evaluateEligibility } = require('../services/eligibilityEngine');

// POST /api/loan/check-eligibility
const checkEligibility = async (req, res, next) => {
  try {
    const { name, age, monthly_salary, cibil_score } = req.body;

    // fetch all bank rules from db
    const { rows: bankRules } = await query(
      'SELECT bank_name, min_age, max_age, min_salary, min_cibil FROM bank_rules ORDER BY bank_name'
    );

    if (bankRules.length === 0) {
      return res.status(503).json({
        success: false,
        message: 'No bank rules found. Please run migrations first.',
      });
    }

    // run the BRE
    const result = evaluateEligibility({ age, monthly_salary, cibil_score }, bankRules);

    const message = result.total_eligible > 0
      ? `${result.total_eligible} bank(s) found eligible for your loan application`
      : 'Sorry, no banks match your current profile';

    return res.status(200).json({
      success: true,
      message,
      // applicant: { name, age, monthly_salary, cibil_score },
      result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { checkEligibility };
