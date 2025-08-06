require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");

const authRoutes = require("./routes/auth");
const notesRoutes = require("./routes/notes");
require("./config/passport-setup");
require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false, // Don't save session if unmodified
    saveUninitialized: false, // Don't create session until something stored
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax", // CSRF protection
    },
  })
);

if (!process.env.SESSION_SECRET) {
  console.error(
    "FATAL ERROR: SESSION_SECRET is not defined. Please set it in your .env file."
  );
  process.exit(1);
}

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/api/notes", notesRoutes);

app.get("/", (req, res) => {
  res.send("Notes Manager Backend API");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
