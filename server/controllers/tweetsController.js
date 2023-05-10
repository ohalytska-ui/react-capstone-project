// tweets controllers

// connect to the database
import db from '../db/db.js';
// for id
import crypto from 'crypto';

// create a new user tweet

const createNewUserTweet = async (req, res, next) => {
  const data = {
    id: req.body.id ?? crypto.randomBytes(20).toString('hex'),
    userId: req.body.userId,
    fullname: req.body.fullname,
    tweetText: req.body.tweetText,
  };

  // named placeholders
  const insert = 'INSERT INTO tweets (id, userId, fullname, tweetText) VALUES (?,?,?,?)';
  const params = [data.id, data.userId, data.fullname, data.tweetText];

  if (!data.userId) {
    res.status(400).json('No userId!');
    console.error('No userId!');
    return next('No userId!');
  } else if (!data.fullname) {
    res.status(400).json('No fullname!');
    console.error('No fullname!');
    return next('No fullname!');
  } else if (!data.tweetText) {
    res.status(400).json('No tweetText!');
    console.error('No tweetText!');
    return next('No tweetText!');
  } else {
    db.run(insert, params, function (err, row) {
      if (err) {
        res.status(400).json({ error: err.message });
        console.error(err.message);
        return next(err.message);
      }
      res.status(201).json(row);
      return next(row);
    });
  }
};

// get all user tweets

const getAllUserTweets = (req, res, next) => {
  const select = 'SELECT * FROM tweets where userId = :userId';
  const params = [req.params.userId];

  db.all(select, params, (err, rows) => {
    if (err !== null && err) {
      res.status(400).json({ error: err.message });
      console.error(err.message);
      return next(err.message);
    }
    if (!rows) {
      res.status(400).json('Something went wrong!');
      console.error('Something went wrong!');
      return next('Something went wrong!');
    } else {
      res.json(rows);
    }
  });
};

const deleteUserTweet = (req, res, next) => {
  const deleteSelect = 'DELETE FROM tweets WHERE id = :tweetId';
  const params = [req.params.tweetId];

  db.run(deleteSelect, params, (err, row) => {
    if (err !== null && err) {
      res.status(400).json({ error: err.message });
      console.error(err.message);
      return next(err.message);
    } else if (!row) {
      res.status(400).json('No tweet!');
      console.error('No tweet!');
      return next('No tweet!');
    } else {
      res.status(200).json(row);
    }
  });
};

export default {
  createNewUserTweet,
  getAllUserTweets,
  deleteUserTweet,
};
