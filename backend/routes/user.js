const express = require("express");
const router = express.Router();
const passport = require("passport");
const { wrapAsync } = require("../utils/wrapAsync");
const usercontroller = require("../controllers/user");


router.get("/me", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  res.json({
    id: req.user.id,
    username: req.user.username,
  });
});

// SIGNUP
router.post("/signup", wrapAsync(usercontroller.SignUp));

// LOGIN (no redirects, no flash)
router.post(
  "/login",
  passport.authenticate("local", { session: true }),
  usercontroller.login
);

// LOGOUT (POST, not GET)
router.post("/logout", usercontroller.logout);

module.exports = router;
