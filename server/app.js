/* eslint-disable node/no-unsupported-features/es-syntax */
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import routes from './v1/routes/routes';

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(routes);
app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to Broadcaster'
  });
});
app.get('*', (req, res) => {
  res.status(404).json({
    status: 404,
    error: 'Route not found'
  });
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Broadcaster server is running on port ${port}`);
});
export default app;
