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
    let response = await authService.login(email, password);
    return res.status(response.status).json({
      user: response.user,
      token: response.token,
      message: response.message,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Login failed",
    });
  }
};

let handleRegister = async (req, res) => {
  try {
    let data = req.body;
    if (
      !data.email ||
      !data.password ||
      !data.username ||
      !data.address ||
      !data.phoneNumber
    ) {
      return res.status(500).json({
        message: "Missing input parameter",
      });
    } else {
      let message = await authService.register(data);
      return res.status(200).json({
        message: message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

let getUser = async (req, res) => {
  try {
    //get authentication token from client header
    let token = req.headers["authorization"];
    let user = await authService.getUserByToken(token);
    return res.status(200).json({
      message: "Authentication success",
      user: user,
    });
  } catch (error) {
    return res.status(401).json({
      message: error.message,
      error: error,
    });
  }
};

module.exports = {
  handleLogin: handleLogin,
  handleRegister: handleRegister,
  getUser: getUser,
};
