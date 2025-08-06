const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.serializeUser((user, done) => {
  done(null, user.id); // Store user ID in session
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user); // Attach user object to req.user
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const currentUser = await User.findOne({ googleId: profile.id });

        if (currentUser) {
          done(null, currentUser);
        } else {
          const newUser = await new User({
            googleId: profile.id,
            displayName: profile.displayName,
            email:
              profile.emails && profile.emails.length > 0
                ? profile.emails[0].value
                : null,
            profilePicture:
              profile.photos && profile.photos.length > 0
                ? profile.photos[0].value
                : null,
          }).save();
          done(null, newUser);
        }
      } catch (err) {
        done(err, null);
      }
    }
  )
);
