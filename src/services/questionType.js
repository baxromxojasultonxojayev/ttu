import request from "../utils/request";

const questionType = {
  getList: (params) => request.get(`/question`, { params }),
  getById: (id, params) => request.get(`/question/${id}`, { params }),
  create: (data) => request.post(`/question`, data),
  update: (id, data) => request.put(`/question/${id}`, data),
  delete: (id) => request.delete(`/question/${id}`),
};

export default questionType;
