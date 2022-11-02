


import request from "../utils/request";

const positionsService = {
  getList: (params) => request.get(`/position`, { params } ),
  getById: (id, params) => request.get(`/position/${id}`, { params }),
  create: (data) => request.post('/position', data),
  update: (data) => request.put('/position', data),
  delete: (id) => request.delete(`/position/${id}`)
}

export default positionsService


