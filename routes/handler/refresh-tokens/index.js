const jwt = require("jsonwebtoken");
const apiAdapter = require("../../apiAdapter");
const {
  URL_SERVICE_USER,
  JWT_SECRET,
  JWT_SECRET_REFRESH_TOKEN,
  JWT_ACCESS_TOKEN_EXPIRED,
  JWT_REFRESH_TOKEN_EXPIRED,
} = process.env;
const api = apiAdapter(URL_SERVICE_USER);

module.exports = {
  refreshTokens: async (req, res) => {
    try {
      const { refreshToken, email } = req.body;

      if (!refreshToken || !email) {
        return res.status(400).json({
          status: "error",
          message: "Invalid token",
        });
      }

      await api.get("/refresh_token", {
        params: { refresh_token: refreshToken },
      });

      jwt.verify(refreshToken, JWT_SECRET_REFRESH_TOKEN, (err, decode) => {
        if (err) {
          return res.status(403).json({
            status: "error",
            message: err.message,
          });
        }

        if (email !== decode.data.email) {
          return res.status(400).json({
            status: "error",
            message: "email is not valid",
          });
        }

        const token = jwt.sign({ data: decode.data }, JWT_SECRET, {
          expiresIn: JWT_ACCESS_TOKEN_EXPIRED,
        });
        return res.status(200).json({
          status: "success",
          data: {
            token,
          },
        });
      });
    } catch (error) {
      if (error.code === "ECONNREFUSED") {
        return res
          .status(500)
          .json({ status: "error", message: "Service unavailable" });
      }
      const { status, data } = error.response;
      return res.status(status).json({
        data,
      });
    }
  },
};
