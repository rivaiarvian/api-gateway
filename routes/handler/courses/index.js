const apiAdapter = require("../../apiAdapter");
const { URL_SERVICE_COURSE,HOSTNAME } = process.env;

const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = {
  getAll: async (req, res) => {
    try {
      const course = await api.get("/api/courses", {
        params:{
          ...req.query,
          status:'published'
        }
      });
      const coursesData = course.data;
      const firstPage = coursesData.data.first_page_url.split('?').pop();
      const lastPage = coursesData.data.last_page_url.split('?').pop();

      coursesData.data.first_page_url = `${HOSTNAME}/courses?${firstPage}`;
      coursesData.data.last_page_url = `${HOSTNAME}/courses?${lastPage}`;

      if(coursesData.data.next_page_url){
        const nextPage = coursesData.data.next_page_url.split('?').pop();
        coursesData.data.next_page_url = `${HOSTNAME}/courses?${nextPage}`;
      }

      if(coursesData.data.prev_page_url){
        const prefPage = coursesData.data.prev_page_url.split('?').pop();
        coursesData.data.prev_page_url = `${HOSTNAME}/courses?${prefPage}`;
      }

      coursesData.data.path = `${HOSTNAME}/courses`;

      return res.status(200).json({
        data: coursesData,
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
      const course = await api.get(`/api/courses/${id}`);

      return res.status(200).json({
        data: course.data,
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
      const course = await api.post("/api/courses", req.body);

      return res.status(200).json({
        data: course.data,
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
      const course = await api.put(`/api/courses/${id}`, req.body);

      return res.status(200).json({
        data: course.data,
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
      const course = await api.delete(`/api/courses/${id}`, req.body);

      return res.status(200).json({
        data: course.data,
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
