const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()
module.exports = {
  ensureAuthenticated: function (req, res, next) {
    let token = req.session.token;
    if (!token) {
      res.redirect('/')
    }
    else {
      jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
        if (err) {
          res.redirect('/')
        }
        req.user = user;
        return next();
      });
    }
  }
};

