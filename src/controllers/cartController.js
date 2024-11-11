const { getAllBillPromotionService } = require("../services/cartService");

const getAllBillPromotionsController = async (req, res) => {
    try {
        // Giả sử tìm thấy productID và trả về trong JSON
        const promotions = await getAllBillPromotionService();
        if (promotions.error === 3)
            return res.status(503).json(promotions);
        if (promotions.error === 4)
            return res.status(404).json(promotions);
        return res.status(200).json(promotions);
    } catch (error) {
        return res.status(500).json({ error: 1, message: "Request is refused!", promotions: [] });
    }
}

const insertOrderController = async (req, res) => {
    try {
        const orders = req.body; // Extract the order data from the request body

        // Process the order here (e.g., save to database, handle logic, etc.)
        console.log("Received order:", orders);

        // Send a response back to the client
        res.status(201).json({ message: 'Order received successfully', orders });
    } catch (error) {
        return res.status(500).json({ error: 1, message: "Request is refused!" });
    }
}

module.exports = {
    getAllBillPromotionsController,
    insertOrderController
}