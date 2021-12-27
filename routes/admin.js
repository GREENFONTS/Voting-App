const express = require("express");
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();
const upload = require("../config/multer");
const { ensureAuthenticated } = require('../config/auth');
const { nanoid } = require("nanoid");
const { dashBoard, userLogin, userRegister, addPositions, addNominee } = require('../functions');

let Results = []



//GET routes
//admin login page
router.get("/", (req, res) => {
  res.render("Admin", {
    action: "SignIn",
    route: "/",
    register : null
    })
})

router.post('/', (req, res) => {
  const { email, password } = req.body;
  try {    
    userLogin(req, res, email, password)
      .catch(err => { throw err })
      .finally(async () => {
        await prisma.$disconnect()
      })
  }
  catch (err) {
    console.log(err)
  }
});


//admin register page
router.get("/register", (req, res) => {
  res.render("Admin", {
    action: "SignUp",
    route: "/register",
    register: true
  });
});

router.post("/register", (req, res) => {
  const { email, password, password2} = req.body;
  try {   
    userRegister(req, res, email, password, password2)
      .catch((err) => {
        throw err;
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
  } catch (err) {
    console.log(err);
  }  
});


//admin dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
  try{
    dashBoard(req, res)
    .catch((err) => {
      throw err
    })
    .finally(async () => {
     await prisma.$disconnect()
    })
  }
  catch (err) {
    throw err
  }  
});


//add office positions
router.post("/position", ensureAuthenticated, async (req, res) => {
  const { Name } = req.body
  try{
    addPositions(req, res, Name)
    .catch((err) => {
      throw err
    })
    .finally(async () => {
     await prisma.$disconnect()
    })
  }
  catch (err) {
    throw err
  }  
})


//add  nominee
router.post("/add", upload.single('avatar'), async (req, res) => {
  const { Name, Post } = req.body;
  try{
    addNominee(req, res, Name, Post)
    .catch((err) => {
      throw err
    })
    .finally(() => 
    prisma.$disconnect())
  }
  catch(err) {
    throw err
  } 
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
  res.redirect("/dashboard")
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
    res.redirect("/");
  })
});



//POST routes









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
  res.redirect("/dashboard");
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

  res.redirect('/dashboard')
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