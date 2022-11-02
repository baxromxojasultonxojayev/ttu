import request from "../utils/request";

const enrolledStudentsService = {
  getList: (params) => request.get(`/enrolled-students`, { params }),
  getById: (id, params) => request.get(`/enrolled-students/${id}`, { params }),
  create: (data) => request.post(`/enrolled-students`, data),
  update: (id, data) => request.put(`/enrolled-students/${id}`, data),
  delete: (id) => request.delete(`/enrolled-students/${id}`),
  postTouContract: (data) => request.post(`/v1/tou-contract`, data),
  enrolledStudentExcel: (params) =>
    request.get(`/excel/enrolled-students`, { params }),
};

export default enrolledStudentsService;
