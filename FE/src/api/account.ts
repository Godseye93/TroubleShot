import { CommonType, EmailCertResponse, EmailCode, ReqLogin, ResLogin, SignUpType } from "@/types/CommonType";
import { apiInstance } from ".";

const api = apiInstance();

// 이메일로 인증번호 요청
export const emailCert = async (email: string): Promise<EmailCertResponse> => {
  const { data } = await api.post("auth/email/send", email);
  return data;
};

// 인증번호 확인 요청
export const emailcodeCheck = async (params: EmailCode): Promise<EmailCertResponse> => {
  const { data } = await api.post("auth/email/confirm", params);
  return data;
};

// 회원가입 요청
export const signUpSubmit = async (params: SignUpType): Promise<CommonType> => {
  const { data } = await api.post("members", params);
  return data;
};

// 로그인 요청
export const loginSubmit = async (params: ReqLogin): Promise<ResLogin> => {
  const { data } = await api.post("login/login", params);
  return data;
};
