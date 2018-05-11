// imports
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import RestRoutes from './routes/RestRoutes';
import GuestRoutes from './routes/GuestRoutes';
import AuthenticationRoutes from './routes/AuthenticationRoutes';
// initialize express
const app = express();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/website');
app.use(bodyParser.json());
app.use(RestRoutes);
app.use(GuestRoutes);
app.use(AuthenticationRoutes);

// app.use(function (err, request, response) {
//   console.log(request);
//   console.log(response);
//   return response.status(500).send('something went wrong');
// });

// set port
const PORT = 3001;

app.listen(PORT, (err) => {
  if (err) {
    return console.log('Error!', err);
  }

  return console.log('Listening on: http://localhost:' + PORT);

});
