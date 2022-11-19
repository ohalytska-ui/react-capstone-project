import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import compression from 'compression';
// import path from 'path';
import db from './db/db.js';

// server port
const port = 5000 || process.env.PORT;

// view engine setup
dotenv.config();
const app = express();

app.use(cors());
app.use(express.static('public'));
app.use(compression()); // compress all routes

app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, '../my-app/build', 'index.html'));
  res.json({ message: 'alive' });
});

app.listen(port, () => {
  console.log(`Your app is listening at http://localhost:${port}`);
});
