import axios from "axios";
import { apiEndPoint, ApiEndpoint } from "./apiEndPoint";

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});
// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    if (response.status === 200 && response.data.redirect_url) {
      const location = response.data.redirect_url;
      if (location) {
        window.location.href = location;
      }
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if(error.response?.status === 401 && originalRequest.url === "auth/refresh_token") {
      alert("Session expired. Please login again.");
    }
    else if (error.response?.status === 401) {
      originalRequest._retry = true;
      try {
        await apiRequestController(apiEndPoint.refreshToken);
        alert("Token refreshed");
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        return Promise.reject(refreshError);
      }
    }
  }
);

export const apiRequestController = async (endpoint: ApiEndpoint) => {
  try {
    const response = await axiosInstance({
      url: endpoint.url,
      method: endpoint.method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: endpoint.body,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
