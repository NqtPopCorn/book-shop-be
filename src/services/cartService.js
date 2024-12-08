const db = require("../models");
const { Op, where } = require("sequelize");
const { getMinBatch, getBook } = require("./orderService");
const e = require("express");

const getAllBillPromotionService = async () => {
  try {
    const currentDate = new Date();
    const promotions = await db.billpromotions.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: {
        start_at: { [Op.lte]: currentDate }, // start_at should be less than or equal to now
        end_at: { [Op.gte]: currentDate }, // end_at should be greater than or equal to now
      },
    });
    if (!promotions) {
      return { error: 4, message: "Promotions is not found", promotions: [] };
    }
    return {
      error: 0,
      message: "Get data promotions succeed",
      promotions: promotions,
    };
  } catch (error) {
    console.error(
      ">>> Service getAllBillPromotionService ",
      error.message,
      error.stack
    );
    return {
      error: 3,
      message: "Connect data is not successful",
      promotions: [],
    };
  }
};

const insertOrderService = async (orders) => {
  console.log(orders);
  const transaction = await db.sequelize.transaction(); // Bắt đầu một transaction
  try {
    const { email, order, orderDetails } = orders;
    const customer = await db.customers.findOne({
      where: { email: email },
    });
    if (customer) {
      order.customer_id = customer.customer_id;
      // Thực hiện tạo đơn hàng trong transaction
      const orderCreate = await db.orders.create(order, { transaction });
      // let total_amount = 0;
      // Gán order_id cho từng chi tiết đơn hàng
      orderDetails.forEach((item) => {
        item.order_id = orderCreate.order_id;
      });

      // Thực hiện trừ số lượng trong batches
      for (let i = 0; i < orderDetails.length; i++) {
        let item = orderDetails[i];
        let discount = await db.discounts.findOne({
          where: { discount_id: item.discount_id },
        });
        if (!discount) {
          throw new Error("Discount not found");
        }
        while (item.quantity > 0) {
          let minBatch = await getMinBatch(parseInt(item.book_id), transaction);
          if (!minBatch) {
            throw new Error("Not found batches for this product");
          }
          let quantity = Math.min(item.quantity, minBatch.stock_quantity);
          if (quantity === 0) {
            throw new Error("Not enough stock");
          }
          let detail = await db.orderdetails.create(
            {
              order_id: item.order_id,
              batch_id: minBatch.batch_id,
              quantity: quantity,
              final_price: item.price,
              discount_id: item.discount_id,
            },
            { transaction: transaction }
          );
          // Tính tổng tiền
          // total_amount += detail.final_price * detail.quantity;
          // //save
          // orderCreate.total_amount = total_amount;
          // await orderCreate.save({ transaction: transaction });
          //update batch
          minBatch.stock_quantity -= quantity;
          await minBatch.save({ transaction: transaction });
          item.quantity -= quantity;
        }
      }
      // Commit transaction để xác nhận thay đổi
      await transaction.commit();
      return {
        error: 0,
        message: "Sample order and order details inserted successfully!",
      };
    } else {
      return { error: 4, message: "Customer not found to insert order!" };
    }
  } catch (error) {
    // Rollback transaction nếu có lỗi
    await transaction.rollback();
    console.log("call rollback");
    console.error(
      ">>> Service insertOrderService ",
      error.message,
      error.stack
    );
    return { error: 3, message: "Connect data is not successful" };
  }
};

const updateQuantityOfOderDetailsInBatchesTableService = async (
  orderDetails,
  transaction
) => {
  try {
    const bookIds = orderDetails.map((item) => item.book_id);
    // Truy vấn các lô nhập (batches) theo book_id và sắp xếp theo thứ tự nhập
    const batches = await db.batches.findAll({
      where: {
        book_id: { [Op.in]: bookIds },
      },
      order: [["receipt_id", "ASC"]], // Sắp xếp theo thứ tự nhập sớm nhất
      transaction, // Đảm bảo dùng trong giao dịch
    });

    // Tạo một map để nhóm số lượng cần bán theo book_id
    const soldQuantities = orderDetails.reduce((acc, item) => {
      acc[item.book_id] = (acc[item.book_id] || 0) + item.quantity;
      return acc;
    }, {});

    // Lặp qua từng book_id để cập nhật số lượng trong batches
    for (const book_id of Object.keys(soldQuantities)) {
      let remainingToSell = soldQuantities[book_id];

      // Lặp qua các batches tương ứng với book_id
      for (const batch of batches.filter(
        (b) => b.book_id === parseInt(book_id)
      )) {
        if (remainingToSell <= 0) break;

        // Tính số lượng có thể trừ ở lô hiện tại
        const quantityToDeduct = Math.min(batch.quantity, remainingToSell);

        // Cập nhật số lượng của lô hiện tại
        batch.quantity -= quantityToDeduct;
        remainingToSell -= quantityToDeduct;

        // Lưu thay đổi
        await batch.save({ transaction });
      }

      // Nếu vẫn còn số lượng cần bán mà không có lô nhập, báo lỗi
      if (remainingToSell > 0) {
        throw new Error(`Not enough stock for book_id ${book_id}`);
      }
    }
  } catch (error) {}
};

const getBooksService = async () => {
  try {
    const resBooks = await db.books.findAll({
      attributes: ["book_id", "title", "sale_price", "status_id"],
      include: [
        {
          model: db.bookstatus,
          as: "status",
          attributes: ["status_name"],
        },
        {
          model: db.discounts,
          as: "discounts",
        },
      ],
    });
    // Kiểm tra nếu resDiscount không tồn tại
    if (!resBooks) {
      return { error: 4, message: "resBooks is not found" };
    }

    return {
      error: 0,
      message: "Get resBooks is succeed",
      resBooks: resBooks,
    };
  } catch (error) {
    console.error(
      ">>> Service getBooksService",
      "\nError:",
      error.message,
      "\nStack:",
      error.stack
    );
    return { error: 3, message: "Data connection failed" };
  }
};

module.exports = {
  getAllBillPromotionService,
  insertOrderService,
  getBooksService,
};
