const { PrismaClient } = require("@prisma/client");
const { sendResponse } = require("../utils/responseHandler");

const prisma = new PrismaClient();

const addOrder = async (req, res) => {
  try {
    const { user_id, total, order_items } = req.body;

    const orderItemsData = order_items.map((item) => {
      return {
        quantity: item.quantity,
        item: {
          connect: {
            ID: item.ID,
          },
        },
      };
    });

    await prisma.order.create({
      data: {
        user_id,
        total,
        order_items: {
          create: orderItemsData,
        },
      },
      include: {
        order_items: {
          include: {
            item: true,
          },
        },
      },
    });

    sendResponse(res, 200);
  } catch (error) {
    sendResponse(res, 500, error);
  }
};

const getUserOrders = async (req, res) => {
  try {
    const userWithOrders = await prisma.user.findUnique({
      where: {
        ID: parseInt(req.query.user_id),
      },
      include: {
        order: {
          include: {
            order_items: {
              include: {
                item: true,
              },
            },
          },
        },
      },
    });

    if (!userWithOrders) {
      sendResponse(res, 404);
    }

    sendResponse(res, 200, userWithOrders.order);
  } catch (error) {
    sendResponse(res, 500, error);
  }
};

const getOrder = async (req, res) => {
  try {
    const order = await prisma.order.findUnique({
      where: {
        ID: parseInt(req.query.order_id),
      },
      include: {
        order_items: {
          include: {
            item: true,
          },
        },
      },
    });

    if (!order) {
      sendResponse(res, 404);
    }

    sendResponse(res, 200, order);
  } catch (error) {
    sendResponse(res, 500, error);
  }
};

module.exports = {
  addOrder,
  getOrder,
  getUserOrders,
};
