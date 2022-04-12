const apiAdapter = require("../../apiAdapter");
const { URL_SERVICE_COURSE } = process.env;

const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = {

  create: async (req, res) => {
    try {
      const lessons = await api.post("/api/image-courses", req.body);

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
      const lessons = await api.delete(`/api/image-courses/${id}`);

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
