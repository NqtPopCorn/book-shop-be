import authService from "../services/authService";

let handleLogin = async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        if (!email || !password) {
            return res.status(500).json({
                message: "Missing input parameter",
            });
        }
        let {message} = await authService.login(email, password);
        return res.status(200).json({
            message: message,
            data: {},
        });
    } catch (error) {
        return res.status(500).json({
            message: "Login failed",
            error: error,
        });
    }
}

let handleRegister = async (req, res) => {
    try {
        let data = req.body;
        if (!data.email || !data.password || !data.username || !data.address || !data.phoneNumber) {
            return res.status(500).json({
                message: "Missing input parameter",
            });
        } else {
            let message = await authService.register(data);
            return res.status(200).json({
                message: message,
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
            error: error,
        });
    }
}

module.exports = {
    handleLogin: handleLogin,
    handleRegister: handleRegister,
};