// users controllers

// connect to the database
import db from '../db/db.js';
// for id
import crypto from 'crypto';
// to encrypt user password
import bcrypt from 'bcrypt';
// jwt token
import jwt from 'jsonwebtoken';

// create a new user account

const createNewUserAccount = async (req, res, next) => {
  const encryptedPassword = await bcrypt.hash(req.body.password, 10);
  const data = {
    id: crypto.randomBytes(20).toString('hex'),
    username: req.body.username.toLowerCase(), // sanitize: convert email to lowercase
    fullname: req.body.fullname,
    email: req.body.email.toLowerCase(), // sanitize: convert email to lowercase
    password: encryptedPassword,
  };

  // named placeholders
  const insert = 'INSERT INTO users (id, username, fullname, email, password) VALUES (?,?,?,?,?)';
  const params = [data.id, data.username, data.fullname, data.email, data.password];

  db.run(insert, params, function (err, _) {
    if (err) {
      res.status(400).json({ error: err.message });
      console.error(err.message);
      return next(err.message);
    }
    // create token
    const token = jwt.sign(
      {
        username: data.username,
        email: data.email,
      },
      process.env.JWT_TOKEN_KEY,
      {
        expiresIn: '12h',
      },
    );

    res.status(201).json({ token: token });
    return next({ token: token });
  });
};

// check if user exist in db

const logInToUserAccount = (req, res, next) => {
  const data = {
    username: req.body.username,
    password: req.body.password,
  };
  // named placeholders
  const select = 'SELECT * FROM users WHERE username = :username';
  const params = [data.username];

  db.get(select, params, async (err, row) => {
    if (err) {
      res.status(400).json({ error: err });
      console.error(err.message);
      return next(err.message);
    } else if (!row) {
      res.status(400).json({ error: 'No such user!' });
      console.error('No such user!');
      return next('No such user!');
    } else {
      if (await bcrypt.compare(data.password, row.password)) {
        // create token
        const token = jwt.sign(
          {
            username: data.username,
            email: data.email,
          },
          process.env.JWT_TOKEN_KEY,
          {
            expiresIn: '12h',
          },
        );

        res.status(201).json({ token: token });
        return next({ token: token });
      } else {
        res.status(400).json({ error: 'Wrong password!' });
        console.error('Wrong password!');
        return next('Wrong password!');
      }
    }
  });
};

// get user from db

const getUserAccountInfo = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    res.status(401).json('A token is required!');
    console.error('A token is required!');
    return next('A token is required!');
  } else {
    let decoded = '';
    try {
      decoded = jwt.verify(token, process.env.JWT_TOKEN_KEY);
    } catch (err) {
      res.status(401).json('Invalid Token!');
      console.error('Invalid Token!');
      return next('A token is required!');
    }

    // named placeholders
    const select = 'SELECT * FROM users WHERE username = :username';
    const params = [decoded.username];

    db.get(select, params, async (err, row) => {
      if (err) {
        res.status(400).json({ error: err });
        console.error(err.message);
        return next(err.message);
      } else if (!row) {
        res.status(400).json({ error: 'No such user!' });
        console.error('No such user!');
        return next('No such user!');
      } else {
        res.status(200).json(row);
        return next(row);
      }
    });
  }
};

export default {
  createNewUserAccount,
  logInToUserAccount,
  getUserAccountInfo,
};
