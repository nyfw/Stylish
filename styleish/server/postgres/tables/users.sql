BEGIN TRANSACTION;
CREATE TABLE users (
  id serial PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  password text NOT NULL,
  "createdAt" DATE,
  "updatedAt" DATE,
  city text,
  cohort text 
);

COMMIT;
