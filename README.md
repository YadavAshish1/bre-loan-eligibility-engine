# BRE — Loan Eligibility Engine

A Business Rule Engine that checks a customer's loan application against bank eligibility rules and returns matching banks.

Built with **Node.js + Express + PostgreSQL**.

---

## Project Structure

```
bre-loan-eligibility/
├── server.js
├── .env
├── migrations/
│   └── 001_bank_rules.sql
└── src/
    ├── migrate.js
    ├── config/
    │   └── database.js
    ├── controllers/
    │   ├── loanController.js
    │   └── bankController.js
    ├── services/
    │   └── eligibilityEngine.js
    ├── routes/
    │   ├── loan.js
    │   └── banks.js
    └── middleware/
        ├── errorHandler.js
        └── validateApplication.js
```

---

## Database

### bank_rules table

| Bank  | Min Age | Max Age | Min Salary (₹) | Min CIBIL |
|-------|---------|---------|----------------|-----------|
| HDFC  | 21      | 60      | 30,000         | 700       |
| ICICI | 23      | 58      | 50,000         | 750       |
| AXIS  | 21      | 65      | 40,000         | 720       |
| IDFC  | 25      | 60      | 60,000         | 780       |

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Set your `DATABASE_URL` in `.env`:

```
DATABASE_URL=postgresql://user:password@host:port/dbname?sslmode=require
```

### 3. Run migrations

```bash
npm run migrate
```

### 4. Start the server

```bash
npm start       # production
npm run dev     # development (with nodemon)
```

---

## API

### POST /api/loan/check-eligibility

**Request:**
```json
{
  "name": "Rahul Sharma",
  "age": 28,
  "monthly_salary": 55000,
  "cibil_score": 760
}
```

**Response:**
```json
{
  "success": true,
  "message": "3 bank(s) found eligible for your loan application",
  "applicant": {
    "name": "Rahul Sharma",
    "age": 28,
    "monthly_salary": 55000,
    "cibil_score": 760
  },
  "result": {
    "eligible_banks": [
      { "bank": "AXIS" },
      { "bank": "HDFC" },
      { "bank": "ICICI" }
    ],
    "total_checked": 4,
    "total_eligible": 3
  }
}
```

### GET /api/banks/rules

Returns all bank eligibility criteria from the database.

### GET /api/health

Health check endpoint.
