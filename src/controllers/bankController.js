const { query } = require('../config/database');

// GET /api/banks/rules
const getAllRules = async (req, res, next) => {
  try {
    const { rows } = await query(
      'SELECT bank_name, min_age, max_age, min_salary, min_cibil FROM bank_rules ORDER BY bank_name'
    );

    return res.status(200).json({
      success: true,
      count: rows.length,
      data: rows,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllRules };
