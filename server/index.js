import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import compression from 'compression';
import path from 'path';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';

// routes
import usersRoutes from './routes/users.js';

// server port
const port = 5000 || process.env.PORT;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const buildPath = path.join(__dirname, '../twitter-clone/build');

// view engine setup
dotenv.config();
const app = express();

app.use(cors());
app.use(express.static(buildPath));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compression()); // compress all routes

app.use(
  cors({
    origin: process.env.VERCEL_URL,
  }),
);

// add routes
app.use(usersRoutes);

app.get('*', (req, res) => {
  res.sendFile(`${buildPath}/index.html`);
});

app.listen(port, () => {
  console.log(`Your app is listening at http://localhost:${port}`);
});

export default app;
