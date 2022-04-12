const apiAdapter = require("../../apiAdapter");
const { URL_SERVICE_COURSE } = process.env;

const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = {

  getAll: async (req, res) => {
    try {
      const myCourses = await api.get("/api/my-courses", {
        params:{
          ...req.query
        }
      });

      return res.status(200).json({
        data: myCourses.data,
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
      const myCourses = await api.post("/api/my-courses", req.body);

      return res.status(200).json({
        data: myCourses.data,
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
