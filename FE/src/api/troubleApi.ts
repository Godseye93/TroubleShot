import axios from "axios";

function troubleApiInstance(path?: string) {
  const baseURL = path ? `http://orientalsalad.kro.kr:8102${path}` : "http://orientalsalad.kro.kr:8102";
  const instance = axios.create({
    withCredentials: true,
    baseURL: baseURL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return instance;
}

export { troubleApiInstance };
