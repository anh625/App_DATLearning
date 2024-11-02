import axios from 'axios';

// Khởi tạo instance của axios
const apiClient = axios.create({
  baseURL: 'http://192.168.1.2:8080', // Đổi thành URL API của bạn
  headers: {
    'Content-Type': 'application/json',
  },
});

// Hàm để thiết lập token
export const setAuthToken = (token:any) => {
  if (token) {
    apiClient.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.Authorization;
  }
};

export default apiClient;
