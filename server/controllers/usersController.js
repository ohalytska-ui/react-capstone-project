// users controllers

// connect to the database
import db from '../db/db.js';
// to id
import crypto from 'crypto';

// create a new user account

const createUserAccount = (req, res, next) => {
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

export default {
  createUserAccount,
};
