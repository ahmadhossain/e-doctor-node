const router = require("express").Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/unverified", async (req, res) => {
  try {
    const posts = await prisma.doctor.findMany({
      where: {
        isVerified: false,
      },
    });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  const {
    fullName,
    gender,
    district,
    nid,
    regNumBMDC,
    doctorType,
    mobile,
    email,
    password,
    role,
  } = req.body;
  try {
    const post = await prisma.doctor.create({
      data: {
        fullName,
        gender,
        district,
        nid,
        regNumBMDC,
        doctorType,
        mobile,
        email,
        password,
        role,
        isVerified: false,
      },
    });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/verified", async (req, res) => {
  try {
    const post = await prisma.doctor.findMany({
      where: {
        isVerified: true,
      },
    });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;