const { PrismaClient } = require("@prisma/client");
const { sendResponse } = require("../utils/responseHandler");

const prisma = new PrismaClient();

const getAllItems = async (_, res) => {
  try {
    const response = await prisma.item.findMany();
    if (response.length <= 0) {
      sendResponse(res, 404);
    } else {
      sendResponse(res, 200, response);
    }
  } catch (error) {
    sendResponse(res, 500, error);
  }
};

const getCategoryItems = async (req, res) => {
  try {
    const response = await prisma.item.findMany({
      where: {
        category: {
          ID: Number(req.query.category_id),
        },
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

const getItem = async (req, res) => {
  try {
    const response = await prisma.item.findUnique({
      where: {
        ID: Number(req.query.item_id),
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

const addItem = async (req, res) => {
  try {
    const { name, description, price, image } = req.body;
    if (req.user.type === "admin") {
      await prisma.item.create({
        data: {
          name,
          description,
          price,
          image,
          category: {
            connect: { ID: Number(req.query.category_id) },
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

const deleteItem = async (req, res) => {
  try {
    if (req.user.type === "admin") {
      const response = await prisma.item.delete({
        where: {
          ID: Number(req.query.item_id),
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

const updateItem = async (req, res) => {
  try {
    if (req.user.type === "admin") {
      const response = await prisma.item.update({
        where: {
          ID: Number(req.query.item_id),
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

const searchItems = async (req, res) => {
  try {
    const response = await prisma.item.findMany({
      where: {
        name: {
          contains: req.query.key,
        },
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

module.exports = {
  addItem,
  getItem,
  deleteItem,
  updateItem,
  getAllItems,
  searchItems,
  getCategoryItems,
};
