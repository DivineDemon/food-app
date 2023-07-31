const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();
const SECRET = "food-web-application" || process.env.JWT_SECRET;

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
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

    const response = await prisma.admin.create({
      data: {
        username,
        email,
        password: encryptedPassword,
      },
    });

    res.status(200).json({
      status: true,
      message: "Registered User Successfully!",
      user_id: response.id,
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
    const { email, password } = req.body;
    const user = await prisma.admin.findUnique({
      where: {
        email,
      },
    });

    if (bcrypt.compareSync(password, user.password)) {
      // Generate JWT Token
      const userToken = jwt.sign(
        {
          id: user.id,
          email: user.email,
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
