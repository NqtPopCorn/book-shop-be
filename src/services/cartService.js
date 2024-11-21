const db = require("../models");
const { Op } = require('sequelize');

const getAllBillPromotionService = async () => {
    try {
        const currentDate = new Date();
        const promotions = await db.billpromotions.findAll({
            attributes: { exclude: ["createdAt", "updatedAt"], },
            where: {
                start_at: { [Op.lte]: currentDate }, // start_at should be less than or equal to now
                end_at: { [Op.gte]: currentDate }    // end_at should be greater than or equal to now
            }
        });
        if (!promotions) {
            return { error: 4, message: "Promotions is not found", promotions: [] };
        }
        return { error: 0, message: "Get data promotions succeed", promotions: promotions };
    } catch (error) {
        console.error(">>> Service getAllBillPromotionService ", error.message, error.stack);
        return { error: 3, message: "Connect data is not successful", promotions: [] };
    }
}

const insertOrderService = async (orders) => {
    const transaction = await db.sequelize.transaction();  // Bắt đầu một transaction
    try {
        const { order, orderDetails } = orders;

        // Thực hiện tạo đơn hàng trong transaction
        const orderCreate = await db.orders.create(order, { transaction });

        // Gán order_id cho từng chi tiết đơn hàng
        orderDetails.forEach((item) => {
            item.order_id = orderCreate.order_id;
        });

        // Thực hiện bulkCreate cho các chi tiết đơn hàng trong transaction
        await db.orderdetails.bulkCreate(orderDetails, { transaction });

        // Commit transaction để xác nhận thay đổi
        await transaction.commit();
        return { error: 0, message: "Sample order and order details inserted successfully!" };
    } catch (error) {
        // Rollback transaction nếu có lỗi
        await transaction.rollback();
        console.error(">>> Service insertOrderService ", error.message, error.stack);
        return { error: 3, message: "Connect data is not successful" };
    }
}



module.exports = {
    getAllBillPromotionService,
    insertOrderService
}