//npm packages
const express = require('express');
const knex = require('knex');

//app imports
const user = require('../handlers/user');
//global
const router = new express.Router();

const options = {
  client: 'pg',
  connection: {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB
  }
};

const db = knex(options);

router.route('/all').get((req, res) => {
  res.json('hi all users');
});

router.route('/register').post((req, res) => {
  user.createUser(req, res, db);
});

module.exports = router;
