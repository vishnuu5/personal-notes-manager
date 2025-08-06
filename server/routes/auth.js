const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL}/login`,
  }),
  (req, res) => {
    const payload = {
      user: {
        id: req.user.id,
        displayName: req.user.displayName,
        email: req.user.email,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.redirect(
          `${
            process.env.CLIENT_URL
          }/dashboard?token=${token}&name=${encodeURIComponent(
            req.user.displayName
          )}&email=${encodeURIComponent(req.user.email || "")}`
        );
      }
    );
  }
);

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return next(err);
      }
      res.clearCookie("connect.sid");
      res.redirect(process.env.CLIENT_URL);
    });
  });
});

router.get("/current_user", async (req, res) => {
  if (req.user) {
    return res.json({
      isAuthenticated: true,
      user: {
        id: req.user.id,
        displayName: req.user.displayName,
        email: req.user.email,
      },
    });
  }

  const token =
    req.headers.authorization && req.headers.authorization.startsWith("Bearer")
      ? req.headers.authorization.split(" ")[1]
      : null;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.user.id).select("-googleId"); // Exclude sensitive info
      if (user) {
        return res.json({
          isAuthenticated: true,
          user: {
            id: user._id,
            displayName: user.displayName,
            email: user.email,
          },
        });
      }
    } catch (error) {
      console.error("JWT verification failed for current_user:", error.message);
    }
  }

  res.json({ isAuthenticated: false, user: null });
});

module.exports = router;
