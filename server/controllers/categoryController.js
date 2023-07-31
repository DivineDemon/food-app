const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllCategories = async (_, res) => {
  try {
    const response = await prisma.category.findMany();
    if (response.length <= 0) {
      res.status(404).json({
        success: false,
        message: "Categories Not Found!",
      });
    } else {
      res.status(200).json({
        status: true,
        message: "Retrieved All Categories!",
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

const getCategory = async (req, res) => {
  try {
    const response = await prisma.category.findUnique({
      where: {
        id: Number(req.query.category_id),
      },
    });

    if (response.length <= 0) {
      res.status(404).json({
        success: false,
        message: "Category Not Found!",
      });
    } else {
      res.status(200).json({
        status: true,
        message: "Retrieved Category!",
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

const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const response = await prisma.category.create({
      data: {
        name,
        admin: {
          connect: { id: req.user.id },
        },
      },
    });

    res.status(200).json({
      status: true,
      message: "Category Added Successfully!",
      response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Please Try Again!",
      error: error.message,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const response = await prisma.category.delete({
      where: {
        id: Number(req.query.category_id),
      },
    });

    res.status(200).json({
      status: true,
      message: "Category Deleted Successfully!",
      response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Please Try Again!",
      error: error.message,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const response = await prisma.category.update({
      where: {
        id: Number(req.query.category_id),
      },
      data: req.body,
    });

    res.status(200).json({
      status: true,
      message: "Category Updated Successfully!",
      response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Please Try Again!",
      error: error.message,
    });
  }
};

module.exports = {
  addCategory,
  getCategory,
  deleteCategory,
  updateCategory,
  getAllCategories,
};
