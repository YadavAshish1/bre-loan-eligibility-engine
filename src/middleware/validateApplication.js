const validateApplication = (req, res, next) => {
  const { name, age, monthly_salary, cibil_score } = req.body;
  const errors = [];

  // name check
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push('name is required and should be at least 2 characters');
  }

  // age check
  if (age === undefined || age === null) {
    errors.push('age is required');
  } else if (!Number.isInteger(Number(age)) || Number(age) < 18 || Number(age) > 80) {
    errors.push('age must be a whole number between 18 and 80');
  }

  // salary check
  if (monthly_salary === undefined || monthly_salary === null) {
    errors.push('monthly_salary is required');
  } else if (isNaN(Number(monthly_salary)) || Number(monthly_salary) <= 0) {
    errors.push('monthly_salary must be a positive number');
  }

  // cibil check
  if (cibil_score === undefined || cibil_score === null) {
    errors.push('cibil_score is required');
  } else if (Number(cibil_score) < 300 || Number(cibil_score) > 900) {
    errors.push('cibil_score must be between 300 and 900');
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  // passing ahead with sanitization
  req.body.name = name.trim();
  req.body.age = Number(age);
  req.body.monthly_salary = Number(monthly_salary);
  req.body.cibil_score = Number(cibil_score);

  next();
};

module.exports = validateApplication;
