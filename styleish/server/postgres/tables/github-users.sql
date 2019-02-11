BEGIN TRANSACTION;
CREATE TABLE "github-users" (
  id serial PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR UNIQUE,
  city text,
  cohort text 
);

COMMIT;