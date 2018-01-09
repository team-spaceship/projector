import express from 'express';
import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';
import User from '../schemas/User';

const middleware = express();

passport.use(new Strategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
  },
  ((accessToken, refreshToken, profile, cb) => {
    console.log(profile);

    // Create or update user.
    User.findOneAndUpdate(
      { google_id: profile.id },
      { 
        google_id: profile.id,
        first_name: profile.name.givenName,
        last_name: profile.name.familyName,
        last_login: new Date(),    
        email: profile.emails[0].value,    
      },
      { upsert: true, new: true },
      cb,
    );
  }),
));

passport.serializeUser((user, done) => {
  console.log("Serialize", user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("deserialize ", id);
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

middleware.use(passport.initialize());
middleware.use(passport.session());

middleware.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

middleware.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  },
);

const authenticated = (req, res, next) => {
  if (!req.user) {
    return res.redirect('/auth/google');
  }
  return next();
};

export default middleware;
export { authenticated };
