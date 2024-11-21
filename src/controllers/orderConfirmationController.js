const { getOrdersService } = require("../services/orderConfirmationService");

const getOrdersController = async (req, res) => {
    try {
        // Giả sử tìm thấy productID và trả về trong JSON
        const orders = await getOrdersService();
        if (orders.error === 3)
            return res.status(503).json(orders);
        if (orders.error === 4)
            return res.status(404).json(orders);
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({ error: 1, message: "Request is refused!", orders: [] });
    }
}

module.exports = {
    getOrdersController,
}