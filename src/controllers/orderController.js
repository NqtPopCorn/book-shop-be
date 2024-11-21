import orderService from "../services/orderService";

const handleGetPage = async (req, res) => {
  res.send("Get page");
};

const handleCreate = async (req, res) => {
  //   POST http://localhost:8080/api/order HTTP/1.1
  // Content-Type: application/json

  // {
  //   "customer_id": 1,
  //   "orderDetails": [
  //     {
  //       "book_id": 1,
  //       "quantity": 10
  //     },
  //     {
  //       "book_id": 2,
  //       "quantity": 10
  //     }
  //   ]
  // }
  try {
    let { customer_id, orderDetails, address } = req.body;
    if (!customer_id || !orderDetails || !address) {
      return res.status(500).json({
        message: "Missing input parameter",
      });
    }

    let order = await orderService.createOrder(
      customer_id,
      orderDetails,
      address
    );
    return res.status(200).json({
      message: "Success",
      order: order || {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Create order failed",
      error: error.message,
    });
  }
};

module.exports = {
  handleGetPage: handleGetPage,
  handleCreate: handleCreate,
};
