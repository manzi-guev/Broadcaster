/* eslint-disable node/no-unsupported-features/es-syntax */
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import routes from './routes/routes';

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

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Broadcaster server is running on port ${port}`);
});
export default app;
