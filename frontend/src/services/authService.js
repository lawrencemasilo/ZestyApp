import axiosInstance from '../api/axios';

export const login = async (credentials) => {
  try {
    const response = await axiosInstance.post('/auth/login', credentials);
    const token = response.data.token;
    localStorage.setItem('jwtToken', token); // Store the token
    return response.data;
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('jwtToken'); // Remove the token
};