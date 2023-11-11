import {
  CommonType,
  EmailCertResponse,
  EmailCode,
  PieGraphInfo,
  ReqLogin,
  ReqLogout,
  ResLogin,
  ResLogout,
  SignUpType,
} from "@/types/CommonType";
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

// 로그아웃 요청
export const logoutSubmit = async (params: ReqLogout): Promise<ResLogout> => {
  const { data } = await api.post("login/logout", params);
  return data;
};

// 마이페이지 파이 그래프 정보 요청
export const getPieGraphInfo = async (params:number): Promise<PieGraphInfo> => {
  const { data } = await api.get(`/members/${params}/statics/polygon`);
  // data에서 필요한 필드만 추출하여 새로운 객체를 생성
  const { troubleRank, answerRank, tagTypeRank, replyRank, dailyTroubleRank } = data;

  // 새로운 객체를 반환
  return { troubleRank, answerRank, tagTypeRank, replyRank, dailyTroubleRank };
};
