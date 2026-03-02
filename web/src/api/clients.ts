import axios from "axios";

export const apiClient = axios.create({ baseURL: "http://localhost:8081/api" });

apiClient.interceptors.request.use((config) => {
  const authStore = JSON.parse(localStorage.getItem("auth-store")!);

  if (!authStore) {
    return config;
  }

  const accessToken = authStore.state.accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
