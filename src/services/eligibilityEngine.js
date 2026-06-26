// Core BRE logic
// Checks each bank rule against the applicant's details

function checkAgainstBank(applicant, rule) {
  if (applicant.age < rule.min_age) return false;
  if (applicant.age > rule.max_age) return false;
  if (applicant.monthly_salary < parseFloat(rule.min_salary)) return false;
  if (applicant.cibil_score < rule.min_cibil) return false;
  return true;
}

// Run applicant through all bank rules, return only eligible banks
function evaluateEligibility(applicant, bankRules) {
  const eligible_banks = bankRules
    .filter((rule) => checkAgainstBank(applicant, rule))
    .map((rule) => ({ bank: rule.bank_name }));

  return {
    eligible_banks,
    total_checked: bankRules.length,
    total_eligible: eligible_banks.length,
  };
}

module.exports = { evaluateEligibility };

