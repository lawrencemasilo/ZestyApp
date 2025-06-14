import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', //For Local
  //baseURL: 'https://zesty2024.azurewebsites.net/api', //Production
});

// Add a request interceptor to include the token in headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken'); // Retrieve token from localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Attach token
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
