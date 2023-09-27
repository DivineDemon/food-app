const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const { sendResponse } = require("../utils/responseHandler");

const prisma = new PrismaClient();

const register = async (req, res) => {
  try {
    const { username, password, phone, email, type, image } = req.body;
    const encryptedPassword = bcrypt.hashSync(password, 10, (err, hash) => {
      if (!err) {
        return hash;
      } else {
        sendResponse(res, 400, err);
      }
    });

    await prisma.user.create({
      data: {
        username,
        password: encryptedPassword,
        phone,
        email,
        type,
        image,
      },
    });

    sendResponse(res, 201);
  } catch (error) {
    sendResponse(res, 500, error);
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

    if (user === null) {
      sendResponse(res, 404);
    } else {
      if (bcrypt.compareSync(password, user.password)) {
        // Generate JWT Token
        const userToken = jwt.sign(
          {
            id: user.ID,
            email: user.email,
            type: user.type,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "30d",
          }
        );

        // Send User Data
        sendResponse(res, 200, {
          user,
          token: userToken,
        });
      } else {
        sendResponse(res, 401);
      }
    }
  } catch (error) {
    sendResponse(res, 500, error);
  }
};

module.exports = {
  register,
  login,
};
