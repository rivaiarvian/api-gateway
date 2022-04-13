const apiAdapter = require("../../apiAdapter");
const { URL_SERVICE_COURSE } = process.env;

const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = {
  create: async (req, res) => {
    try {
      const userId = req.user.data.id;
      const review = await api.post("/api/reviews", {
        user_id:userId,
        ...req.body
      });

      return res.status(200).json({
        data: review.data,
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
      const review = await api.put(`/api/reviews/${id}`, req.body);

      return res.status(200).json({
        data: review.data,
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
      const review = await api.delete(`/api/reviews/${id}`);

      return res.status(200).json({
        data: review.data,
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
