const jwt = require('jsonwebtoken')
module.exports = {
  ensureAuthenticated: async function (token) {
    if (!token) {
      return null
    }
    else {
      let isTrue = false
      let userData;
      jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
        if (err) {
          return null
        }
        
       userData = user
      });
      // if(userData != undefined){
      //   let authorizedUser = await prisma.admin.findUnique({
      //     where:{
      //       email: userData.email
      //     }
      //   })
      //   await prisma.$disconnect();
      //   return authorizedUser
      return userData
      // }
      
      
    }
    
  }
};

