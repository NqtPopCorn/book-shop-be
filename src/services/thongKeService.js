import db from "../models/index";

const getReceipts = (fromDate, toDate) => {
  return new Promise(async (resolve, reject) => {
    try {
      const receipts = await db.goodsreceipt.findAll({
        include: [
          {
            model: db.books,
            as: "details",
            attributes: ["book_id", "title"],
            through: { attributes: ["quantity", "price"], as: "detail" },
          },
          {
            model: db.providers,
            as: "provider",
            attributes: ["name"],
          },
        ],
        where: {
          createdAt: {
            $gte: fromDate,
            $lte: toDate,
          },
        },
      });
      resolve(receipts);
    } catch (error) {
      reject(error);
    }
  });
};

export default {
  getReceipts,
};
