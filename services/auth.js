const jwt = require('jsonwebtoken')
module.exports = {
  ensureAuthenticated: async function (token) {
    if (!token) {
      return null
    }
    else {
      let userData;
      jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
        if (err) {
          return null
        }
        
       userData = user
      });
      return userData

      
    }
    
  }
};

