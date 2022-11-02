import request from "../utils/request";

const educationType = {
  getList: (params) => request.get(`/education-type`, { params }),
  getById: (id, params) => request.get(`/education-type/${id}`, { params }),
  create: (data) => request.post(`/education-type`, data),
  update: (id, data) => request.put(`/education-type/${id}`, data),
  delete: (id) => request.delete(`/education-type/${id}`),
};

export default educationType;
