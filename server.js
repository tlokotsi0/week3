const cors = require('cors');
const express = require ('express');
const app = express();
const session = require ('express-session');
const MongoStore = require('connect-mongo').default;
const errorHandler = require('./middleware/errorHandler');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const passport = require('passport');
const GitHubStrategy = require ('passport-github2').Strategy;
const port = 3000;

app.use(express.json());

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
}));

app.set('trust proxy', 1);
app.use(session({
  name: 'my-app-session', 
  secret: process.env.SESSION_SECRET,
  resave: true,          
  saveUninitialized: true, 
  proxy: true,
  store: MongoStore.create({ 
    mongoUrl: process.env.MONGODB_URI,
    collectionName: 'sessions' 
  }),
  cookie: {
    secure: true, 
    sameSite: 'none', 
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true
  }
}));
app.use(passport.initialize());
app.use(passport.session());

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
  res.send(req.isAuthenticated() ? `Logged in as ${req.user.displayName}` : "LOGGED OUT");
});

app.get('/github/callback', 
  passport.authenticate('github', { 
    failureRedirect: '/api-docs',
  }), 
  (req, res) => {
    req.session.user = req.user; 
    req.session.save((err) => {
      if (err) {
        console.error("Session save error:", err);
      }
      res.redirect('/');
    });
  }
);

//test code
app.get('/debug', (req, res) => {
  res.json({
    authenticated: req.isAuthenticated(),
    user: req.user,
    sessionID: req.sessionID
  });
});
//test

app.use(bodyParser.json());
app.use('/', require('./routes/index'));
app.use(errorHandler);


// Connect to DB then start the server
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(process.env.PORT || port);
    console.log('Web Server is listening at port '+(process.env.port || port));
  }
});