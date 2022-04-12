const apiAdapter = require("../../apiAdapter");
const { URL_SERVICE_COURSE } = process.env;

const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = {
  getAll: async (req, res) => {
    try {
      const chapters = await api.get(`/api/chapter`,{
        params:{
          ...req.query
        }
      });

      return res.status(200).json({
        data: chapters.data,
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
      const {id} = req.params;
      const chapters = await api.get(`/api/chapter/${id}`);

      return res.status(200).json({
        data: chapters.data,
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
      const chapters = await api.post("/api/chapter", req.body);

      return res.status(200).json({
        data: chapters.data,
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
      const chapters = await api.put(`/api/chapter/${id}`, req.body);

      return res.status(200).json({
        data: chapters.data,
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
      const chapters = await api.delete(`/api/chapter/${id}`);

      return res.status(200).json({
        data: chapters.data,
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
