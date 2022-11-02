import request from "../utils/request";

const specialityService = {
  getList: (params) => request.get(`/speciality`, { params }),
  getById: (id, params) => request.get(`/speciality/${id}`, { params }),
  create: (data) => request.post("/speciality", data),
  update: (id, data) => request.put(`/speciality/${id}`, data),
  delete: (id) => request.delete(`/speciality/${id}`),
};

export default specialityService;
