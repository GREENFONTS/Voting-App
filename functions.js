const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require("uuid");
const upload = require("./config/multer");
const cloudinary = require('./config/cloudinary');
const { nanoid } = require("nanoid");

module.exports = {

  //user register
  userRegister : async (req, res, email, password, password2) => {
    let error = []
    let options = {
      action: "SignUp",
      route: "/register",
      register: true,
      error,
      email, password
    }
    let user = await prisma.admin.findFirst({
      where: {
        email: email      },
    });


    if (user != null) {
      error.push({
        msg: "Admin already exists found",
      })  
      res.render('Admin', options);
      error = []
    }
    else if(password.length < 8 ){
      error.push({
        msg: "Password must be greater than 8 characters",
      }) 
      res.render('Admin',options);
      error = []
    }
    else if (password != password2){
      error.push({
        msg: "Passwords don't match",
      }) 
      res.render('Admin', options);
      error = []
    }
    else {
      await prisma.admin.create({
        data: {
          email: email,
          password: password,
          id: uuidv4()
        }
      })
    }
  },

//user login
  userLogin : async (req, res, email , password) => {   
    let error = []    
    let options = {
      action: "SignIn",
      route: "/",
      register: false,
      error,
      email, password
    }
      let user = await prisma.admin.findUnique({
        where: {
          email: email
        }
      });
      if (user == null) {
        error.push({
          msg: "User not found"
        });
        res.render('Admin', options);
        error = []
      }
      else if (user.password != password) {
        error.push({
          msg: "password is Incorrect"
        });
        res.render('Admin', options);
        error = []
      }
      
      else {
        const token = jwt.sign(
          { user_id: user.id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h"
          }
        )
        let session = req.session;
        session.token = token;
        session.user = user.email
        res.redirect('/dashboard')
      }
    },

    //admin Dashboard
    dashBoard : async (req, res) => {
        let posts = []
        let Nominees = await prisma.nominee.findMany({
          where: {
            user: req.session.user
          }
        });
        let positions = await prisma.position.findMany({
          where: {
            user: req.session.user
          }
        });
        positions.forEach((position) => {
          posts.push(position.name);
        });
        res.render("dashboard", {
          Nominees,
          posts,
        });
    },

    //add office positions
    addPositions : async (req, res, Name) => {
      const position = await prisma.position.findFirst({
        where: {
          name: Name,
          user: req.session.user       
        }
      })
      if (position != null) {
        console.log({ msg: "Nominee already exists" });
        res.redirect('/dashboard')
      }
      
      if (req.session.user == undefined) {
        req.session.destroy(() => {
          res.redirect('/')
        })
      }
      else {
        await prisma.position.create({
          data: {
            name: Name,
            user: req.session.user
          }
        })
      }
      res.redirect('/dashboard')
    },

    //add nominees
    addNominee : async (req, res, Name, Post ) => {
      let posts = [];
      let positions = await prisma.position.findMany();
      positions.forEach((position) => {
        posts.push(position.name);
      });
      const result = await cloudinary.uploader.upload(req.file.path)
   
      let checkNominee = await prisma.nominee.findFirst({
        where: {
        name: Name,
        post: Post,
        user: req.session.user
      }
    });
    if (checkNominee) {
      console.log("nominee exists")
      res.redirect('/dashboard')
    }
    else {
      await prisma.nominee.create({
        data: {
          name: Name,
          post: Post,
          user: req.session.user,
          image: result.secure_url,
          id: uuidv4(),
          votes: 0,
          postNo: posts.indexOf(Post) + 1,
        },
      });
      res.redirect("/dashboard");
         }
 
    },

    //update nominee
    updateNominee : async (req, res, currentName, newName, currentPost, newPost ) => {      
       await prisma.nominee.updateMany({
          where: {
          name: currentName,
          post: currentPost,
          user: req.session.user
        },
        data: {
          name: newName,
          post: newPost
        }
      });
      res.redirect("/dashboard");
    },

    //delete nominee
    deleteNominee : async (req, res, Name, Post) => {       
      await prisma.nominee.deleteMany({
        where: {
          name: Name,
          post: Post,
          user: req.session.user
        }
      })
      res.redirect('/dashboard')
    },
  
    //delete all nominees
    deleteAllNominees : async (req, res, password) => {
      let admin = await prisma.admin.findFirst({
        where:
        {
          email: req.session.user,
        }
      });
      if (admin.password == password) {
        await prisma.nominee.deleteMany({})
        res.redirect('/dashboard')
      }
      else{
        res.send({msg : "password Incorrect"})
      }      
    },

  
    //generate coupons
    generateCoupons : async (req, res, number) => {
      for (i = 1; i <= parseInt(number); i++) {
        let code = nanoid(10);
        await prisma.coupons.create({
          data: {
            codes: code,
            used: false,
            user: req.session.user
          },
        });
      }
      res.redirect("/dashboard")
    },


    //get coupons
    getCoupons : async (req, res) => {
      let coupons = await prisma.coupons.findMany({
        where: {
          used: false,
          user: req.session.user
        }
      });
      res.render('dashboard', {
        coupons
      })
    },


    //get Results
    getResults : async (req, res) => {
    let posts = []
    let Results = [];
    let positions = await prisma.position.findMany({
      where: {
        user: req.session.user
      }
    });
    if (positions != null){
      positions.forEach((position) => {
        posts.push(position.name);
      });
    }   
    
    let Nominees = await prisma.nominee.findMany({
      where: {
        user: req.session.user
      }
    })
    for (let i = 0; i < posts.length; i++) {
      Results[i] = {}
      Results[i].Category = posts[i]
      Results[i].Nominees = []
      if(Nominees != null){
      Nominees.forEach(nominee => {
        if (nominee.post == posts[i]) {
          Results[i]["Nominees"].push(nominee)
        }
      })
    }
    }
    res.render('dashboard', {
      Results
    });
  },


  //reset election votes
  resetVotes : async (req, res, password) => {
    let admin = await prisma.admin.findUnique({
      where: {
        email: req.session.user
      }
    });
    let Nominees = await prisma.nominee.findMany({
      where: {
        user: admin.email
      }
    });
    if (admin.password != password) {
      res.send({msg : "password Incorrect"})
    }
    else {
      for (i = 0; i < Nominees.length; i++) {
        await prisma.nominee.update({
          where: {
            id: Nominees[i].id,
          },
          data: {
            votes: 0,
          },
        });
      }
      res.redirect("/dashboard");
    }
  }
}