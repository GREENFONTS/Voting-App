const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  couponAuthenticated: function (req, res, next) {
    let token = req.session.coupon;
    if (!token) {
      res.redirect("/");
    } else {
      jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
        if (err) {
          res.redirect("/voting");
        }
        req.user = user;
        return next();
      });
    }
  },
};
