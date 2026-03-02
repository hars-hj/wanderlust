const User = require("../models/user");

// module.exports.renderSignUp =  (req, res) => {
//     res.render("users/signup");
// };

module.exports.SignUp = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
         req.login(registeredUser, (err) => {
      if (err) return next(err);

      res.status(201).json({
        success: true,
        message: "User signed up successfully",
        data: {
          id: registeredUser._id,
          username: registeredUser.username,
          email: registeredUser.email
        }
      });
    });
    } catch (e) {
       res.status(400).json({
      success: false,
      message: e.message
    });
    }
};

// module.exports.renderLogIn = (req, res) => {
//     res.render("users/login.ejs");
// };

module.exports.login = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logged in successfully",
    data: {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email
    }
  });
};

module.exports.logout = (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);

    res.status(200).json({
      success: true,
      message: "Logged out successfully"
    });
  });
};