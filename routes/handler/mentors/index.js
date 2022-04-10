const apiAdapter = require("../../apiAdapter");
const { URL_SERVICE_COURSE } = process.env;

const api = apiAdapter(URL_SERVICE_COURSE);

module.exports={
    getAll: async(req, res)=>{
        try {
            const mentors = await api.get("/api/mentors");
            return res.status(200).json({
                data: mentors.data,
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
    getDetail: async(req, res)=>{
        try {
            const {id} = req.params;
            const mentors = await api.get(`/api/mentors/${id}`);
            return res.status(200).json({
                data: mentors.data,
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
    create: async(req, res)=>{
        try {
            const mentors = await api.post(`/api/mentors/`,req.body);
            return res.status(200).json({
                data: mentors.data,
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
    update: async(req, res)=>{
        try {
            const {id} = req.params;
            const mentors = await api.put(`/api/mentors/${id}`,req.body);
            return res.status(200).json({
                data: mentors.data,
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
    destroy: async(req, res)=>{
        try {
            const {id} = req.params;
            const mentors = await api.delete(`/api/mentors/${id}`);
            return res.status(200).json({
                data: mentors.data,
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
}