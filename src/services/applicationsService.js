import request from "../utils/request";

const applicationService = {
  getList: (params) => request.get(`/application`, { params }),
  getById: (id, params) => request.get(`/application/${id}`, { params }),
  create: (data) => request.post(`/application`, data),
  update: (id, data) => request.put(`/application/${id}`, data),
  delete: (id) => request.delete(`/application/${id}`),
  applicationStudentExcel: (params) =>
    request.get(`/excel/applications`, params),
};

export default applicationService;
