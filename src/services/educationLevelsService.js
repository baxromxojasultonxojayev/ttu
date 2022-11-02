import request from "../utils/request";

const educationLevelsService = {
  getList: (params) => request.get(`/education-level`, { params }),
  getById: (id, params) => request.get(`/education-level/${id}`, { params }),
  create: (data) => request.post(`/education-level`, data),
  update: (id, data) => request.put(`/education-level/${id}`, data),
  delete: (id) => request.delete(`/education-level/${id}`),
};

export default educationLevelsService;
