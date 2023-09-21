const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const SECRET = "food-web-application" || process.env.JWT_SECRET;

const register = async (req, res) => {
  try {
    const { username, password, phone, email, type, image } = req.body;
    const encryptedPassword = bcrypt.hashSync(password, 10, (err, hash) => {
      if (!err) {
        return hash;
      } else {
        res.status(400).json({
          status: false,
          message: "Password Encryption Failed!",
          err,
        });
      }
    });

    const response = await prisma.user.create({
      data: {
        username,
        password: encryptedPassword,
        phone,
        email,
        type,
        image,
      },
    });

    res.status(200).json({
      status: true,
      message: "Registered User Successfully!",
      user_id: response.ID,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Please Try Again!",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    let user = null;
    const { username, email, password } = req.body;

    // If User Enters Username
    if (username) {
      user = await prisma.user.findFirst({
        where: {
          username,
        },
      });
    }

    // If User Enters Email
    if (email) {
      user = await prisma.user.findFirst({
        where: {
          email,
        },
      });
    }

    if (bcrypt.compareSync(password, user.password)) {
      // Generate JWT Token
      const userToken = jwt.sign(
        {
          id: user.ID,
          email: user.email,
          type: user.type,
        },
        SECRET,
        {
          expiresIn: "30d",
        }
      );

      // Send User Data
      res.status(200).json({
        success: true,
        message: "User Logged In!",
        user,
        token: userToken,
      });
    } else {
      res.status(401).json({
        status: false,
        message: "Username or Password Incorrect!",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Please Try Again!",
      error: error.message,
    });
  }
};

module.exports = {
  register,
  login,
};
