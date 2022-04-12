const apiAdapter = require("../../apiAdapter");
const { URL_SERVICE_COURSE } = process.env;

const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = {
  getAll: async (req, res) => {
    try {
      const lessons = await api.get("/api/lesson", {
        params:{
          ...req.query
        }
      });

      return res.status(200).json({
        data: lessons.data,
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

  getDetail: async (req, res) => {
    try {
      const {id}=req.params;
      const lessons = await api.get(`/api/lesson/${id}`);

      return res.status(200).json({
        data: lessons.data,
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
  create: async (req, res) => {
    try {
      const lessons = await api.post("/api/lesson", req.body);

      return res.status(200).json({
        data: lessons.data,
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
      const {id} = req.params;
      const lessons = await api.put(`/api/lesson/${id}`, req.body);

      return res.status(200).json({
        data: lessons.data,
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
  destroy: async (req, res) => {
    try {
      const {id} = req.params;
      const lessons = await api.delete(`/api/lesson/${id}`);

      return res.status(200).json({
        data: lessons.data,
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
  }

};
