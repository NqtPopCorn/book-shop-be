const {
  getAllBillPromotionService,
  insertOrderService,
  getBooksService
} = require("../services/cartService");

const getAllBillPromotionsController = async (req, res) => {
  try {
    // Giả sử tìm thấy productID và trả về trong JSON
    const promotions = await getAllBillPromotionService();
    if (promotions.error === 3) return res.status(503).json(promotions);
    if (promotions.error === 4) return res.status(404).json(promotions);
    return res.status(200).json(promotions);
  } catch (error) {
    return res
      .status(500)
      .json({ error: 1, message: "Request is refused!", promotions: [] });
  }
};

const insertOrderController = async (req, res) => {
  try {
    const orders = req.body; // Extract the order data from the request body
    let { order, orderDetails } = orders;
    //tinh tong tien
    const respone = await insertOrderService(orders);
    // Send a response back to the client
    if (respone.error === 3) return res.status(503).json(respone);
    if (respone.error === 4) return res.status(401).json(respone);
    res.status(201).json(respone);
  } catch (error) {
    console.error(">>> insertOrderController ", error);
    return res.status(500).json({ error: 1, message: "Request is refused!" });
  }
};

const getBooksController = async (req, res) => {
  try {
    const respone = await getBooksService();
    if (respone.error === 4)
      return res.status(404).json(respone);
    if (respone.error === 3)
      return res.status(503).json(respone);
    return res.status(200).json(respone);
  } catch (error) {
    console.error(
      ">>> Service getBooksController", "\nError:",
      error.message,
      "\nStack:",
      error.stack
    );
    return { error: 3, message: "Data connection failed" };
  }
}


module.exports = {
  getAllBillPromotionsController,
  insertOrderController,
  getBooksController
};
