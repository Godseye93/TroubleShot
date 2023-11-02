export const isLogin = (a: number, b: number, c: number, d: number, e: number) => {
  const token = localStorage.getItem("token");
  if (token) {
    return true;
  } else {
    return false;
  }
};
