const router = require("express").Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const found = await prisma.doctor.findUnique({
      where: {
        email,
        password,
      },
    });
    res.status(200).json(found);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
