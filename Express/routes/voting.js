const { PrismaClient } = require("@prisma/client");
const express = require("express");
const prisma = new PrismaClient();
const router = express.Router();
const { couponAuthenticated } = require("../Express/config/coupon");
const { checkCoupon, firstVote, otherVote, lastVote } = require("../functions");

//voting entry page
router.get("/", (req, res) => {
  res.render("voting");
});


//check coupon 
router.post("/checkCoupon", async (req, res) => {
  const { code } = req.body;
  try {
    checkCoupon(req, res, code)
    .catch((err) => {
      throw err;
    })
    .finally(async () => await prisma.$disconnect());
  } catch (err) {
    console.log(err);
  }  
});

//voting routes
router.get("/votingPosts", couponAuthenticated, async (req, res) => {
  try {
    firstVote(req, res)
    .catch((err) => {
      throw err;
    })
    .finally(async () => await prisma.$disconnect());
  } catch (err) {
    console.log(err);
  }  
});

router.get("/votingPosts/:nextPost/:id", couponAuthenticated, async (req, res) => {
  try {
    otherVote(req, res)
    .catch((err) => {
      throw err;
    })
    .finally(async () => await prisma.$disconnect());
  } catch (err) {
    console.log(err);
  }  
 });

router.get("/votingPosts/:id", couponAuthenticated, async (req, res) => {
  try {
    lastVote(req, res)
    .catch((err) => {
      throw err;
    })
    .finally(async () => await prisma.$disconnect());
  } catch (err) {
    console.log(err);
  }  
});

module.exports = router;
