const jwt = require('jsonwebtoken')

module.exports = {
  ensureAuthenticated: function (token) {
    if (!token) {
      return false
    }
    else {
      console.log(process.env.TOKEN_KEY)
      jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
        if (err) {
          console.log(err)
          return false
        }
        console.log(user, process.env.TOKEN_KEY)
        return user
        
      });
    }
  }
};

