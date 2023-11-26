import axios from "axios";

function troubleApiInstance(path?: string) {
  const baseURL = path
    ? `${process.env.NEXT_PUBLIC_BASE_URL_TROUBLE}${path}`
    : process.env.NEXT_PUBLIC_BASE_URL_TROUBLE;
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
