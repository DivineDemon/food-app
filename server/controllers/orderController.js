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

module.exports = {
  addOrder,
};
