import User from '../models/UserModel';
import bcrypt from 'bcrypt-nodejs';
import jwt from 'jwt-simple';
import Booked from '../models/BookedModel';

export function signIn(req, res) {
  console.log(req.body);
  console.log('logged in now');
  const { username } = req.user;
  getBookings(req.user._id.toString()).then(result => {
    const { bookings, waitTime } = result;
    res.json({ token: tokenForUser(req.user), username, bookings, waitTime});
  });
}


export function signUp(req, res, next) {
  const { credentials, type } = req.body;
  const u = type === 'REST_REGISTER' ?
    credentials.remail : credentials.email;
  const p = type === 'REST_REGISTER' ?
    credentials.rpwd : credentials.pwd;
  // If no username or password was supplied return an error
  if (!u || !p) {
    return res.status(422)
      .json({ error: 'You must provide an username and password' });
  }
  console.log('Look for a user with the username');
  User.findOne({ username: u }).exec()
  .then((existingUser) => {
    // If the user exist return an error on sign up
    if (existingUser) {
      console.log('This username is already being used');
      return res.status(422).json({ error: 'Username is in use' });
    }
    console.log('This username is free to use');
    saveUser(u, p, type, res,next);
  })
  .catch(err => next(err));
}
function saveUser(username, password, type, res, next) {
  // User bcrypt to has their password, remember, we never save plain text passwords!
  bcrypt.genSalt(10, function (salt) {
    console.log('the salt',salt);
    bcrypt.hash(password, salt, null, function (err, hashedPassword) {
      if (err) {
        return next(err);
      }
      // Create a new user with the supplied username, and the hashed password
      const user = new User({ username, password: hashedPassword, type });
      console.log('Saving the user');
      user.save()
         .then(u => {
           console.log('User has been saved to database');
           res.json({ token: tokenForUser(u) });
         });
    });
  });
}

function getBookings(userId) {
  const bookings = new Promise(function (resolve) {
    Booked.findOne({userID: userId}).exec()
      .then((result) => {
        console.log(result);
        resolve(result);
      });
  });
  return bookings;
}

export function loginFromToken(req, res) {
  const token = req.body.token;
  const credentials = jwt.decode(token, process.env.SECRET);
  User.findOne({ _id: credentials.userId}).exec()
    .then((user) => {
      const { username } = user;
      getBookings(credentials.userId.toString()).then(result => {
        const { bookings, waitTime } = result;
        res.json({ token: tokenForUser(user), username, bookings, waitTime});
      });
    });
}
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ userId: user.id, iat: timestamp }, process.env.SECRET);
}
