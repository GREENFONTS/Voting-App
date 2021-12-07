const { PrismaClient } = require("@prisma/client");
const express = require("express");
const prisma = new PrismaClient();
const router = express.Router();
const jwt = require("jsonwebtoken");
const { couponAuthenticated } = require("../config/coupon");

let error = [];

//GET routes

//voting entry page
router.get("/", (req, res) => {
  res.render("voting");
});

//
router.get("/votingPosts", couponAuthenticated, async (req, res) => {
    let posts = [];
    let positions = await prisma.position.findMany({
      where: {
        user: req.session.user,
      },
    });
    positions.forEach((position) => {
      posts.push(position.name);
    });
  let nominees = await prisma.nominee.findMany({
    where: {
      post: posts[0],
      user: req.session.user,
    },
  });
  res.render('firstPost', {
    Nominees: nominees,
    post: posts[0],
    nextPost: posts[1],
  });
});

router.get(
  "/votingPosts/:nextPost/:id",
  couponAuthenticated,
  async (req, res) => {
    let posts = [];
    let positions = await prisma.position.findMany({
      where: {
        user: req.session.user,
      },
    });
    positions.forEach((position) => {
      posts.push(position.name);
    });
    const nominee = await prisma.nominee.findUnique({
      where: {
        id: req.params.id,
      },
    });

    let vote = nominee.votes + 1;
    await prisma.nominee.update({
      where: {
        id: req.params.id,
      },
      data: {
        votes: vote,
      },
    });
    let nominees = await prisma.nominee.findMany({
      where: {
        user: req.session.user,
        postNo: parseInt(nominee.postNo + 1),
      },
    });

    if (nominee.postNo + 1 < posts.length) {
      res.render("posts", {
        Nominees: nominees,
        post: posts[nominee.postNo],
        nextPost: posts[nominee.postNo + 1],
      });
    } else {
      res.render("lastVote", {
        Nominees: nominees,
        post: posts[nominee.postNo],
      });
    }
  }
);

router.get("/votingPosts/:id", couponAuthenticated, async (req, res) => {
  let nominee = await prisma.nominee.findUnique({
    where: {
      id: req.params.id,
    },
  });
  let vote = nominee.votes + 1;
  await prisma.nominee.update({
    where: {
      id: req.params.id,
    },
    data: {
      votes: vote,
    },
  });

  res.redirect("/voting");
});

router.post("/checkCoupon", async (req, res) => {
  let error = [];
  const { code } = req.body;
  let recievedCode = await prisma.coupons.findFirst({
    where: {
      user: req.session.user,
      codes: code,
    },
  });

  if (!recievedCode) {
    error.push({ msg: "Invalid Code" });

    res.render("voting", {
      error,
    });
  } else if (recievedCode.used == true) {
    error.push({ msg: "Code has been used" });

    res.render("voting", {
      error,
    });
  } else if (recievedCode.used == false) {
    await prisma.coupons.update({
      where: {
        codes: code,
      },
      data: {
        used: true,
      },
    });
    const token = jwt.sign({ user_id: code }, process.env.TOKEN_KEY, {
      expiresIn: "2h",
    });
    let session = req.session;
    session.coupon = token;
    res.redirect("/voting/votingPosts");
  }
});


module.exports = router;
