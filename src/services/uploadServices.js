import request from "../utils/request";

const uploadService = {
  uploadImage: (data) => request.post(`/upload`, data),
};

export default uploadService;
