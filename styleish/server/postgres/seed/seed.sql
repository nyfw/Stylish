BEGIN TRANSACTION;

INSERT into users (name, email, password, city, cohort) values (
  'Andy', 'andy@gmail.com',1234,'NY', 9
) ,('Hubert','hubert@gmail.com',1234,'NY',9);

COMMIT;