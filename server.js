const cors = require('cors');
const express = require ('express');
const app = express();
const session = require ('express-session');
const errorHandler = require('./middleware/errorHandler');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const passport = require('passport');
const GitHubStrategy = require ('passport-github2').Strategy;
const port = 3000;

app.use(cors());
app.use(express.json());

app.use(bodyParser.json());
app.use('/', require('./routes/index'));
app.use(errorHandler);
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialied: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({ methods:["POST, GET, PUT, PATCH, OPTIONS, DELETE"]}));
app.use(cors({ origin: "*"}));

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done){
  return done(null, profile)
}
));

passport.serializeUser((user, done) => {
  done(null, user)
});

passport.deserializeUser((user, done) => {
  done(null, user)
});

app.get('/', (req, res) => {
  const message = req.session.user !== undefined 
    ? `Logged in as ${req.session.user.displayName}` 
    : "LOGGED OUT";
    
  res.send(message);
});

app.get('/github/callback', passport.authenticate('github', {
failureRedirect: '/api-docs',
session: false
}), (req, res) => {
req.session.user = req.user;
res.redirect('/');
});



// Connect to DB then start the server
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(process.env.PORT || port);
    console.log('Web Server is listening at port '+(process.env.port || port));
  }
});