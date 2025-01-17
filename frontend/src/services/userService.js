import axiosInstance from '../api/axios';

export const fetchUserData = async () => {
  try {
    const response = await axiosInstance.get('/profile');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user data:', error.response?.data || error.message);
    throw error;
  }
};