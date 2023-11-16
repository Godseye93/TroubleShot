import axios from "axios";

function apiInstance(path?: string) {
  const baseURL = path ? `http://orientalsalad.kro.kr:8101${path}` : "http://orientalsalad.kro.kr:8101";
  const instance = axios.create({
    withCredentials: true,
    baseURL: baseURL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return instance;
}

export { apiInstance };
