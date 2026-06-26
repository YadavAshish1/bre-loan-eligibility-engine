
-- Database Migration Script

-- ============================================================
-- TABLE: bank_rules
-- ============================================================
CREATE TABLE IF NOT EXISTS bank_rules (
  id          SERIAL PRIMARY KEY,
  bank_name   VARCHAR(100)  NOT NULL UNIQUE,
  min_age     INT           NOT NULL CHECK (min_age > 0),
  max_age     INT           NOT NULL CHECK (max_age > min_age),
  min_salary  NUMERIC(12,2) NOT NULL CHECK (min_salary >= 0),
  min_cibil   INT           NOT NULL CHECK (min_cibil BETWEEN 300 AND 900),
  created_at  TIMESTAMP     DEFAULT NOW(),
  updated_at  TIMESTAMP     DEFAULT NOW()
);

-- ============================================================
-- SEED DATA
-- ============================================================
-- INSERT INTO bank_rules (bank_name, min_age, max_age, min_salary, min_cibil) VALUES
--   ('SBI',                21, 65, 20000, 650),
--   ('PNB',                21, 60, 18000, 650),
--   ('Bank of Baroda',     21, 58, 22000, 660),
--   ('HDFC',               21, 60, 30000, 700),
--   ('ICICI',              23, 58, 50000, 750),
--   ('AXIS',               21, 65, 40000, 720),
--   ('Kotak Mahindra',     22, 58, 35000, 700),
--   ('Yes Bank',           23, 55, 30000, 710),
--   ('IndusInd',           23, 60, 45000, 730),
--   ('Federal Bank',       21, 60, 25000, 680),
--   ('IDFC First',         25, 60, 60000, 780),
--   ('Bajaj Finance',      24, 55, 35000, 700),
--   ('Tata Capital',       23, 58, 40000, 720),
--   ('L&T Finance',        24, 60, 45000, 740),
--   ('HSBC',               23, 58, 75000, 750),
--   ('Standard Chartered', 23, 58, 80000, 760)
-- ON CONFLICT (bank_name) DO UPDATE SET
--   min_age    = EXCLUDED.min_age,
--   max_age    = EXCLUDED.max_age,
--   min_salary = EXCLUDED.min_salary,
--   min_cibil  = EXCLUDED.min_cibil,
--   updated_at = NOW();
