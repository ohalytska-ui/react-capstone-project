// users controllers

// connect to the database
import db from '../db/db.js';
// for id
import crypto from 'crypto';

// create a new user account

const createNewUserAccount = (req, res, next) => {
  const data = {
    id: crypto.randomBytes(20).toString('hex'),
    username: req.body.username,
    fullname: req.body.fullname,
    email: req.body.email,
    password: req.body.password,
  };

  const insert = 'INSERT INTO users (id, username, fullname, email, password) VALUES (?,?,?,?,?)';
  const params = [data.id, data.username, data.fullname, data.email, data.password];

  db.run(insert, params, function (err, _) {
    if (err) {
      res.status(400).json({ error: err.message });
      console.error(err.message);
      return next(err.message);
    }
    res.json(data);
    return next(data);
  });
};

// check if user exist in db

const logInToUserAccount = (req, res, next) => {
  const select = 'SELECT * FROM users WHERE username = :username AND password = :password';
  const params = [req.params.username, req.params.password];

  db.get(select, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err });
      console.error(err.message);
      return next(err.message);
    } else if (!row) {
      res.status(400).json({ error: 'No such user!' });
      console.error('No such user!');
      return next('No such user!');
    } else {
      res.json(row);
      return next(row);
    }
  });
};

export default {
  createNewUserAccount,
  logInToUserAccount,
};
