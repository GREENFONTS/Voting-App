const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()
module.exports = {
  ensureAuthenticated: function (req, res, next) {
    let token = localStorage.getItem('Token')

    if (!token) {
      res.redirect('/admin')
    }
    jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
      if (err) {
        res.redirect("/admin");
      }
      req.user = user;
      return next();
    });
}
}

