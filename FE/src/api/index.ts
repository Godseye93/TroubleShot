import axios from "axios";

function apiInstance(path?: string) {
  const baseURL = path ? `${process.env.NEXT_PUBLIC_BASE_URL}${path}` : process.env.NEXT_PUBLIC_BASE_URL;
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
