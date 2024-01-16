const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// const Conversation = require("../models/Conversation");

//new conv

router.get("/", async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conv of a user

// router.get("/:userId", async (req, res) => {
//   try {
//     const conversation = await Conversation.find({
//       members: { $in: [req.params.userId] },
//     });
//     res.status(200).json(conversation);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // get conv includes two userId

// router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
//   try {
//     const conversation = await Conversation.findOne({
//       members: { $all: [req.params.firstUserId, req.params.secondUserId] },
//     });
//     res.status(200).json(conversation);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get("/", async (req, res) => {
//   try {
//     const conversation = await Conversation.findAll();
//     res.status(200).json(conversation);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
