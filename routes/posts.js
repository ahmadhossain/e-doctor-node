const router = require("express").Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await prisma.post.findUnique({
      where: {
        slug,
      },
      include: { user: true },
    });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  const { title, desc, slug, userEmail } = req.body;
  try {
    const post = await prisma.post.create({
      data: {
        title,
        desc,
        slug,
        userEmail: userEmail,
      },
    });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// const { title, content, authorEmail } = req.body;
// const result = await prisma.post.create({
//   data: {
//     title: title,
//     content: content,
//     author: { connect: { email: authorEmail } },
//   },
// });
// return res.status(201).json(result);

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
