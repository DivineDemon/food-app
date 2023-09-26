const { PrismaClient } = require("@prisma/client");
const { sendResponse } = require("../utils/responseHandler");

const prisma = new PrismaClient();

const uploadProfile = async (req, res) => {
  const formData = new FormData();
  formData.append("image", req.body.image);

  try {
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.IMG_BB}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (data.data.url) {
      return res.status(200).json({
        success: true,
        message: "Successfully Stored Image!",
        url: data.data.url,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Failed to Stored Image!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Please Try Again!",
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        ID: Number(req.query.user_id),
      },
    });

    if (existingUser) {
      const response = await prisma.user.update({
        where: {
          ID: Number(req.query.user_id),
        },
        data: req.body,
      });

      sendResponse(res, 200, response);
    } else {
      sendResponse(res, 404);
    }
  } catch (error) {
    sendResponse(res, 500, error);
  }
};

const getUsers = async (_, res) => {
  try {
    let response = await prisma.user.findMany();

    if (response.length !== 0) {
      sendResponse(res, 200, response);
    } else {
      sendResponse(res, 404);
    }
  } catch (error) {
    sendResponse(res, 500, error);
  }
};

const getUser = async (req, res) => {
  try {
    let response = await prisma.user.findUnique({
      where: {
        ID: parseInt(req.query.user_id),
      },
    });

    if (response) {
      sendResponse(res, 200, response);
    } else {
      sendResponse(res, 404);
    }
  } catch (error) {
    sendResponse(res, 500, error);
  }
};

const deleteUser = async (req, res) => {
  try {
    let response = await prisma.user.delete({
      where: {
        ID: parseInt(req.query.user_id),
      },
    });

    if (response) {
      sendResponse(res, 200, response);
    } else {
      sendResponse(res, 404);
    }
  } catch (error) {
    sendResponse(res, 500, error);
  }
};

module.exports = {
  getUser,
  getUsers,
  deleteUser,
  updateUser,
  uploadProfile,
};
