import axios from "axios";
import { ApiEndpoint } from "./apiEndPoint";

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, 
});
// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(response);
    if (response.status === 200 && response.data.redirect_url) {
      const location = response.data.redirect_url;
      if (location) {
        window.location.href = location;
      }
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
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
