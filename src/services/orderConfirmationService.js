const db = require("../models");

const getOrdersService = async () => {
    try {
        const orders = await db.orders.findAll();
        if (!orders) {
            return { error: 4, message: "Orders is not found", orders: [] };
        }
        return { error: 0, message: "Get data orders succeed", orders: orders }; // Trả về orders
    } catch (error) {
        console.error(">>> Service getOrdersService ", error.message, error.stack);
        return { error: 3, message: "Connect data is not successful", orders: [] };
    }
}

module.exports = {
    getOrdersService,
}