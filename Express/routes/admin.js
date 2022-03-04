const express = require("express");
const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();
const upload = require("../Express/config/multer");
const { ensureAuthenticated } = require('../Express/config/auth');
const { dashBoard, userLogin, userRegister, addPositions, addNominee, updateNominee, deleteNominee, deleteAllNominees, generateCoupons, getCoupons, getResults, resetVotes } = require('../functions');


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


//update nominee
router.post('/update', ensureAuthenticated, (req, res) => {
  const { currentName, newName, currentPost, newPost } = req.body;
  try{
   updateNominee(req, res, currentName, newName, currentPost, newPost)
    .catch((err) => {
    throw err
    })
  .finally( async () => await prisma.$disconnect())
  }
  catch (err) {
    throw err
  }
});


//delete nominee
router.post('/delete', ensureAuthenticated, (req, res) => {
  const { Name, Post } = req.body;
  try{
  deleteNominee(req, res, Name, Post)
    .catch((err) => {
      throw err;
    })
    .finally(async () => await prisma.$disconnect());
  }
  catch (err){
    throw err
  } 
});


//delete all nominees
router.post("/deleteAll", ensureAuthenticated,  (req, res) => {
  const { password } = req.body;
  try{
    deleteAllNominees(req, res, password)
    .catch((err) => {
      throw err;
    })
    .finally(async () => await prisma.$disconnect());
  }
  catch(err) {
    throw err
  }
});


//create coupons
router.post("/generateCoupons", ensureAuthenticated, async (req, res) => {
  const { number} = req.body;
  try{
    generateCoupons(req, res, number)
    .catch((err) => {throw err
    })
    .finally(() => {
      prisma.$disconnect()
    })
  }
  catch(err){
    throw err
  }
});

//election results
router.get('/Results', ensureAuthenticated, async (req, res) => {
  try{
    getResults(req, res)
    .catch((err) => {throw err
    })
    .finally(() => {
      prisma.$disconnect()
    })
  }
  catch(err){
    throw err
  }
  
});



// get coupons
router.get("/coupons", ensureAuthenticated, async (req, res) => {
  try{
    getCoupons(req, res)
      .catch((err) => {
        throw err;
      })
      .finally(async () => await prisma.$disconnect());
    }
    catch (err){
      throw err
    } 
})

//reset votes data
router.post("/resetVotes", ensureAuthenticated, async (req, res) => {
  const { password } = req.body;
  try {
    resetVotes(req, res, password)
    .catch((err) => {
      throw err;
    })
    .finally(async () => await prisma.$disconnect());
  } catch (err) {
    console.log(err);
  }  
});

//admin logout
router.get("/Logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  })
});

module.exports = router;