import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './db/db.js';

// server port
const port = 5000 || process.env.PORT;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const buildPath = path.join(__dirname, '../twitter-clone/build');

// view engine setup
dotenv.config();
const app = express();

app.use(cors());
app.use(compression()); // compress all routes
app.use(express.static(buildPath));

app.get('*', (req, res) => {
  res.sendFile(`${buildPath}/index.html`);
});

app.listen(port, () => {
  console.log(`Your app is listening at http://localhost:${port}`);
});
