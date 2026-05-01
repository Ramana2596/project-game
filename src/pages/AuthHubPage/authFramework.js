// D:\Git_OpsMgt\authHub\authFramework.js
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const MicrosoftStrategy = require("passport-azure-ad-oauth2").Strategy;
const userService = require("./userService"); 

// --- Google Strategy ---
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await userService.findOrCreateUser(profile);
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

// --- GitHub Strategy ---
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await userService.findOrCreateUser(profile);
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

// --- Microsoft Strategy ---
passport.use(new MicrosoftStrategy({
    clientID: process.env.MS_CLIENT_ID,
    clientSecret: process.env.MS_CLIENT_SECRET,
    callbackURL: "/auth/microsoft/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await userService.findOrCreateUser(profile);
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

// --- Serialize / Deserialize ---
passport.serializeUser((user, done) => {
  done(null, user.id); // store user ID in session
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userService.findUserById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
