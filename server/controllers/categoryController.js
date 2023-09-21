const { PrismaClient } = require("@prisma/client");
const { sendResponse } = require("../utils/responseHandler");

const prisma = new PrismaClient();

const getAllCategories = async (_, res) => {
  try {
    const response = await prisma.category.findMany();
    if (response.length <= 0) {
      sendResponse(res, 404);
    } else {
      sendResponse(res, 200, response);
    }
  } catch (error) {
    sendResponse(res, 500, error);
  }
};

const getCategory = async (req, res) => {
  try {
    const response = await prisma.category.findUnique({
      where: {
        ID: Number(req.query.category_id),
      },
    });

    if (response.length <= 0) {
      sendResponse(res, 404);
    } else {
      sendResponse(res, 200, response);
    }
  } catch (error) {
    sendResponse(res, 500, error);
  }
};

const addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (req.user.type === "admin") {
      await prisma.category.create({
        data: {
          name,
          user: {
            connect: { ID: req.user.id },
          },
        },
      });

      sendResponse(res, 201);
    } else {
      sendResponse(res, 403);
    }
  } catch (error) {
    sendResponse(res, 500, error);
  }
};

const deleteCategory = async (req, res) => {
  try {
    if (req.user.type === "admin") {
      const response = await prisma.category.delete({
        where: {
          ID: Number(req.query.category_id),
        },
      });

      sendResponse(res, 200, response);
    } else {
      sendResponse(res, 403);
    }
  } catch (error) {
    sendResponse(res, 500, error);
  }
};

const updateCategory = async (req, res) => {
  try {
    if (req.user.type === "admin") {
      const response = await prisma.category.update({
        where: {
          ID: Number(req.query.category_id),
        },
        data: req.body,
      });

      sendResponse(res, 200, response);
    } else {
      sendResponse(res, 403);
    }
  } catch (error) {
    sendResponse(res, 500, error);
  }
};

module.exports = {
  addCategory,
  getCategory,
  deleteCategory,
  updateCategory,
  getAllCategories,
};
