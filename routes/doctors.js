const router = require("express").Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/unverified", async (req, res) => {
  try {
    const doctors = await prisma.doctor.findMany({
      where: {
        isVerified: false,
      },
    });
    res.status(200).json(doctors);
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
    const doctor = await prisma.doctor.create({
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
    res.status(200).json(doctor);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/verified", async (req, res) => {
  try {
    const doctors = await prisma.doctor.findMany({
      where: {
        isVerified: true,
      },
    });
    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/verify/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const doctor = await prisma.doctor.update({
      where: {
        email,
      },
      data: { isVerified: true },
    });
    const doctors = await prisma.doctor.findMany({
      where: {
        isVerified: false,
      },
    });
    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
