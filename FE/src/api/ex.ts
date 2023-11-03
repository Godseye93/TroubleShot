import { apiInstance } from ".";
interface Ex {
  Ex: string;
}
const api = apiInstance("login");

export const login = async (user: Ex): Promise<Ex> => {
  const { data } = await api.post("login", user);
  return data;
};

// import {login} from '@/api/Ex
// const onLongin = async (user: Ex) => {
//   try {
//     const res: LoginResultValue = await login(user);
//     toast.success("로그인 되었습니다.");
//   } catch (err) {
//     if (!(err as AxiosError)?.response) {
//       toast.error("문제가 발생하였습니다. 다시 시도해 주세요.");
//       return;
//     }
//     const { status } = (err as AxiosError).response!;
//     switch (status) {
//       case 401:
//         toast.error("이메일 혹은 비밀번호가 일치하지 않습니다");
//         break;
//       case 409:
//         toast.warning("이미 로그인중인 계정입니다. 기존 계정의 접속이 해제됩니다.");
//         navigate("/");
//         break;
//     }
//     console.log(err);
//   }
// };
