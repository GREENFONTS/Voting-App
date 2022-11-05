const jwt = require("jsonwebtoken");

const ensureAuthenticated = async (token: any) => {
  if (!token) {
    return null;
  } else {
    let userData;
    jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
      if (err) {
        return null;
      }

      userData = user;
    });
    return userData;
  }
};
export default ensureAuthenticated;
