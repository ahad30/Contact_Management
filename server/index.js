const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const dotenv = require('dotenv');
const UserModel = require("./models/User");
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');




dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: [
    "http://localhost:3000",
    ""
  ],
  credentials: true,
  optionSuccessStatus: 200,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(passport.initialize());
app.use(cookieParser());
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((error) => {
  console.error("MongoDB connection error:", error);
});


// Google Authentication
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
},
async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await UserModel.findOne({ email: profile.emails[0].value });
    if (!user) {
      user = new UserModel({
        name: profile.displayName,
        email: profile.emails[0].value,
        // photo: profile.photos[0].value,
      });
      await user.save();
    }
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

// Facebook Authentication
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: "/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'photos', 'email']
},
async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await UserModel.findOne({ email: profile.emails[0].value });
    if (!user) {
      user = new UserModel({
        name: profile.displayName,
        email: profile.emails[0].value,
        photo: profile.photos[0].value,
      });
      await user.save();
    }
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

// Serialize and Deserialize User
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  const user = await UserModel.findById(id);
  done(null, user);
});

// Google Auth Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id, email: req.user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1d' }
    );

    // Set token in HTTP-only cookie
    res.cookie('authToken', token, {
      httpOnly: true,  // Prevents JavaScript access for security
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'Strict', // Prevent CSRF attacks
      maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
    });

    // Redirect to Admin Dashboard (no token in URL)
    res.redirect('http://localhost:3000/Dashboard/AdminHome');
  }
);

// Facebook Auth Routes
app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { session: false }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id, email: req.user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
    res.redirect(`http://localhost:3000?token=${token}`);
  });



// Default route
app.get('/', (req, res) => {
  res.send('Auth server');
});




app.use("/auth", require("./routes/auth"));
app.use('/contacts', require('./routes/contact'));



// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
