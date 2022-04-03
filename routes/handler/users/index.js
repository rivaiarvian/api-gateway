const apiAdapter = require("../../apiAdapter");
const jwt = require("jsonwebtoken");
const {
  URL_SERVICE_USER,
  JWT_SECRET,
  JWT_SECRET_REFRESH_TOKEN,
  JWT_ACCESS_TOKEN_EXPIRED,
  JWT_REFRESH_TOKEN_EXPIRED,
} = process.env;

const api = apiAdapter(URL_SERVICE_USER);

module.exports = {
  register: async (req, res) => {
    try {
      const user = await api.post("/users/register", req.body);

      return res.status(200).json({
        data: user.data,
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
  login: async (req, res) => {
    try {
      const user = await api.post("/users/login", req.body);
      const data = user.data.data;
      const token = jwt.sign({ data: data }, JWT_SECRET, {
        expiresIn: JWT_ACCESS_TOKEN_EXPIRED,
      });
      const refreshToken = jwt.sign({ data: data }, JWT_SECRET_REFRESH_TOKEN, {
        expiresIn: JWT_REFRESH_TOKEN_EXPIRED,
      });

      await api.post("/refresh_token", {
        refreshToken: refreshToken,
        userId: data.id,
      });

      return res.status(200).json({
        status: "success",
        data: { token, refreshToken: refreshToken },
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
  update: async (req, res) => {
    try {
      // return res.status(200).json(req.user);
      const id = req.user.data.id;
      const user = await api.put(`/users/${id}`, req.body);
      return res.status(200).json(user.data);
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
  getUser: async (req, res) => {
    try {
      const id = req.user.data.id;
      const user = await api.get(`/users/${id}`, req.body);
      return res.status(200).json(user.data);
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
  logout: async (req, res) => {
    try {
      const id = req.user.data.id;
      await api.post(`/users/logout`, { user_id: id });
      return res
        .status(200)
        .json({ status: "success", message: "Refresh token deleted" });
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
