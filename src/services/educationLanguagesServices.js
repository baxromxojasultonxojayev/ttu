import request from "../utils/request";

const educationLanguagesService = {
  getList: (params) => request.get(`/faculty-languages`, { params }),
  getById: (id, params) => request.get(`/faculty-languages/${id}`, { params }),
  create: (data) => request.post(`/faculty-languages`, data),
  update: (id, data) => request.put(`/faculty-languages/${id}`, data),
  delete: (id) => request.delete(`/faculty-languages/${id}`),
};

export default educationLanguagesService;
