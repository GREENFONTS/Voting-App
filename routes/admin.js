const {PrismaClient} = require("@prisma/client")
const express = require("express");
const prisma = new PrismaClient();
const router = express.Router();
const upload = require("../config/multer");
const cloudinary = require('../config/cloudinary')
const { v4: uuidv4 } = require("uuid");
const jwt = require('jsonwebtoken');
const { ensureAuthenticated } = require('../config/auth');
const { nanoid } = require("nanoid");

let Results = []

let error = []

//GET routes

//admin login page
router.get("/", (req, res) => {
  res.render("Admin", {
    action: "SignIn",
    route: "/admin/"
    })
})

//admin register page
router.get("/register", (req, res) => {
  res.render("Admin", {
    action: "SignUp",
    route: "/admin/register"
  });
});

//admin dashboard
router.get('/dashboard', ensureAuthenticated, async (req, res) => {
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
});


//election results
router.get('/Results', ensureAuthenticated, async (req, res) => {
  let posts = [];
  let positions = await prisma.position.findMany({
    where: {
      user: req.session.user
    }
  });
  positions.forEach((position) => {
    posts.push(position.name);
  });
  Results = []
  let Nominees = await prisma.nominee.findMany({
    where: {
      user: req.session.user
    }
  })
  for (let i = 0; i < posts.length; i++) {
    Results[i] = {}
    Results[i].Category = posts[i]
    Results[i].Nominees = []
    Nominees.forEach(nominee => {
      if (nominee.post == posts[i]) {
        Results[i]["Nominees"].push(nominee)
      }
    })
  }
  res.render('results', {
    Results
  });
});

//create coupons
router.get("/createCoupons", ensureAuthenticated, async (req, res) => {
  for (i = 1; i <= 5; i++) {
    let code = nanoid(10);
    await prisma.coupons.create({
      data: {
        codes: code,
        used: false,
        user: req.session.user
      },
    });
  }
  res.redirect("/admin/dashboard")
});

// get coupons
router.get("/coupons", ensureAuthenticated, async (req, res) => {
  let coupons = await prisma.coupons.findMany({
    where: {
      used: false,
      user: req.session.user
    }
  });
  res.render('coupon', {
    coupons
  })
})

//reset votes data
router.get("/resetVotes", ensureAuthenticated, async (req, res) => {
  try {
    let admin = await prisma.admin.findUnique({
      where: {
        email: req.session.user
      }
    })
    if (admin == null | undefined) {
      res.redirect('/')
    }
    let Nominees = await prisma.nominee.findMany({});
    if (admin.password == req.body.password) {
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
    }
  } catch (err) {
    console.log(err);
  }
  res.redirect("/Results");
});

//admin logout
router.get("/Logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/admin");
  })
});



//POST routes

//admin login
router.post('/', (req, res) => {
  try {
    async function adminPost() {
   
      const { Email, password } = req.body;
    
      let user = await prisma.admin.findUnique({
        where: {
          email: Email
        }
      });
      if (user == null) {
        error.push({
          msg: "Admin not found"
        });
        res.render('Admin', {
          error,
          Email, password
        });
        error = []
      }
      else if (user.password != password) {
        error.push({
          msg: "password is Incorrect"
        });
        res.render('Admin', {
          error,
          Email, password
        });
        error = []
      }
      
      else {
        const token = jwt.sign(
          { user_id: user.id, Email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h"
          }
        )
        let session = req.session;
        session.token = token;
        session.user = user.email
        res.redirect('/admin/dashboard')
      }
    }
    adminPost(req, res)
      .catch(err => { throw err })
      .finally(async () => {
        await prisma.$disconnect()
      })
  }
  catch (err) {
    console.log(err)
  }
})

//register admin
router.post("/register", (req, res) => {
  try {
    async function addAdminPost() {
      const { Email, password} = req.body;

      let user = await prisma.admin.findFirst({
        where: {
          email: Email,
          password: password
        },
      });

      if (user != null) {
        error.push({
          msg: "Admin already exists found",
        })
        
      }
      else {
        await prisma.admin.create({
          data: {
            email: Email,
            password: password,
            id: uuidv4()
          }
        })
      }
    }
    addAdminPost(req, res)
      .catch((err) => {
        throw err;
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
  } catch (err) {
    console.log(err);
  }
  res.redirect('/admin/')
});

//add office positions
router.post("/position", async (req, res) => {
   const position = await prisma.position.findFirst({
    where: {
      name: req.body.Name,
      user: req.session.user       
    }
  })
  if (position != null) {
    error.push({ msg: "Nominee already exists" });
  }
  
  if (req.session.user == undefined) {
    req.session.destroy(() => {
      res.redirect('/admin')
    })
  }
  else {
    await prisma.position.create({
      data: {
        name: req.body.Name,
        user: req.session.user
      }
    })
  }
  res.redirect('/admin/dashboard')
})

//add  nominee
router.post("/add", upload.single('avatar'), async (req, res) => {
  let posts = [];
  let positions = await prisma.position.findMany();
  positions.forEach((position) => {
    posts.push(position.name);
  });
    const result = await cloudinary.uploader.upload(req.file.path)
    const { Name, Post } = req.body;
    let checkNominee = await prisma.nominee.findFirst({
      where: {
        name: Name,
        post: Post,
        user: req.session.user
      }
    });
    if (checkNominee) {
      console.log("nominee exists")
      error.push({ msg: "Nominee already exists" })
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
         }
  res.redirect("/admin/dashboard");

 
});

//update nominee
router.post('/update', ensureAuthenticated, (req, res) => {
  async function updatePost() {
    const { currentName, newName, currentPost, newPost } = req.body;
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
  }
   updatePost(req, res)
    .catch((err) => {
    throw err
    })
  .finally( async () => await prisma.$disconnect())
  res.redirect("/admin/dashboard");
});

//delete nominee
router.post('/delete', ensureAuthenticated, (req, res) => {
  async function deletePost() {
    const { Name, Post } = req.body;
   
    await prisma.nominee.deleteMany({
      where: {
        name: Name,
        post: Post,
        user: req.session.user
      }
    })
  }

  deletePost(req, res)
    .catch((err) => {
      throw err;
    })
    .finally(async () => await prisma.$disconnect());

  res.redirect('/admin/dashboard')
});

//delete all nominees
router.post("/deleteAll", ensureAuthenticated,  (req, res) => {
  async function deleteAll() {
    const { Password } = req.body;
    let admin = await prisma.admin.findFirst({
      where:
      {
        email: req.session.user,
        password: Password
      }
    });
    if (admin) {
      await prisma.nominee.deleteMany({})
    }
  }

  deleteAll(req, res)
    .catch((err) => {
      throw err;
    })
    .finally(async () => await prisma.$disconnect());

    res.render("dashboard");    
});


module.exports = router;