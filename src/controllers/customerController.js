const { postRegisterCustomerService } = require("../services/customerService");

const registerCustomerController = async (req, res) => {
    try {
        const customerInfo = req.body;
        console.log(">>> customerInfo", customerInfo)
        if (!customerInfo) {
            return res.status(200).json({ error: 2, message: "Missing customerInfo parameter" });
        }
        console.log(">>> start")
        const resRegister = await postRegisterCustomerService(customerInfo);
        console.log(">>> end")
        // Lỗi liên quan đến database
        if (resRegister.error === 3) {
            return res.status(503).json(resRegister);
        }
        // Email đã tồn tại
        if (resRegister.error === 4) {
            return res.status(409).json(resRegister);
        }
        return res.status(200).json(resRegister)
    } catch (error) {
        return res.status(500).json({ error: 1, message: "Request is refused!" });
    }
}

module.exports = {
    registerCustomerController,
}