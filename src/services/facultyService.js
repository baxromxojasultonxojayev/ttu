import request from "../utils/request";

const facultyService = {
  getList: (params) => request.get(`/faculty`, { params }),
  getById: (id, params) => request.get(`/faculty/${id}`, { params }),
  create: (data) => request.post(`/faculty`, data),
  update: (id, data) => request.put(`/faculty/${id}`, data),
  delete: (id) => request.delete(`/faculty/${id}`),
};

export default facultyService;
