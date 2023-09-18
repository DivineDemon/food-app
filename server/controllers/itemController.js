const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllItems = async (_, res) => {
  try {
    const response = await prisma.item.findMany();
    if (response.length <= 0) {
      res.status(404).json({
        success: false,
        message: "Items Not Found!",
      });
    } else {
      res.status(200).json({
        status: true,
        message: "Retrieved All Items!",
        response,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Please Try Again!",
      error: error.message,
    });
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
      res.status(404).json({
        success: false,
        message: "Items Not Found!",
      });
    } else {
      res.status(200).json({
        status: true,
        message: "Retrieved All Items!",
        response,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Please Try Again!",
      error: error.message,
    });
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
      res.status(404).json({
        success: false,
        message: "Item Not Found!",
      });
    } else {
      res.status(200).json({
        status: true,
        message: "Retrieved Item!",
        response,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Please Try Again!",
      error: error.message,
    });
  }
};

const addItem = async (req, res) => {
  try {
    const { name, description, price, image } = req.body;
    if (req.user.type === "admin") {
      const response = await prisma.item.create({
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

      res.status(200).json({
        status: true,
        message: "Item Added Successfully!",
        response,
      });
    } else {
      res.status(403).json({
        success: false,
        message: "User Forbidden!",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Please Try Again!",
      error: error.message,
    });
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

      res.status(200).json({
        status: true,
        message: "Item Deleted Successfully!",
        response,
      });
    } else {
      res.status(403).json({
        success: false,
        message: "User Forbidden!",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Please Try Again!",
      error: error.message,
    });
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

      res.status(200).json({
        status: true,
        message: "Item Updated Successfully!",
        response,
      });
    } else {
      res.status(403).json({
        success: false,
        message: "User Forbidden!",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Please Try Again!",
      error: error.message,
    });
  }
};

module.exports = {
  addItem,
  getItem,
  deleteItem,
  updateItem,
  getAllItems,
  getCategoryItems,
};
