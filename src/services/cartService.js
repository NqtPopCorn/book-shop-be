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

const insertOrderService = async () => {
    try {
        const currentDate = new Date();
        // Insert an order
        const newOrder = await Order.create({
            customer_id: 123,
            order_date: new Date(),
            total_amount: 200.00,
            status_id: 1,
            address: "123 Main St, Cityville",
            billPromotion_id: null
        });

        // Insert order details for the created order
        const orderDetails = [
            {
                order_id: newOrder.order_id, // Foreign key reference to order
                book_id: 456,
                quantity: 2,
                price: 50.00,
                discount_id: 1
            },
            {
                order_id: newOrder.order_id,
                book_id: 789,
                quantity: 1,
                price: 100.00,
                discount_id: null
            }
        ];

        await OrderDetail.bulkCreate(orderDetails);

        console.log("Sample order and order details inserted successfully!");
    } catch (error) {
        console.error(">>> Service insertOrderService ", error.message, error.stack);
        return { error: 3, message: "Connect data is not successful", promotions: [] };
    }
}

module.exports = {
    getAllBillPromotionService
}