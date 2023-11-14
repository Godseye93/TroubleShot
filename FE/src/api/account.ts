import {
  BarChartInfo,
  CommonType,
  EmailCertResponse,
  EmailCode,
  Member,
  PieGraphInfo,
  RadarGraphInfo,
  ReqLogin,
  ReqLogout,
  ReqTags,
  ResLogin,
  ResLogout,
  SignUpType,
} from "@/types/CommonType";
import { apiInstance } from ".";
import { AxiosRequestConfig } from "axios";
import { GetTroubleList, SearchParams } from "@/types/TroubleType";

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
  console.log(process.env.NEXT_PUBLIC_BASE_URL);
  return data;
};

// 로그아웃 요청
export const logoutSubmit = async (params: ReqLogout): Promise<ResLogout> => {
  const { data } = await api.post("login/logout", params);
  return data;
};

// 마이페이지 레이더 그래프 정보 요청
export const getRadarGraphInfo = async (params: number): Promise<RadarGraphInfo> => {
  const { data } = await api.get(`/members/${params}/statics/polygon`);
  // data에서 필요한 필드만 추출하여 새로운 객체를 생성
  const { troubleRank, answerRank, tagTypeRank, replyRank, dailyTroubleRank } = data;

  // 새로운 객체를 반환
  return { troubleRank, answerRank, tagTypeRank, replyRank, dailyTroubleRank };
};

// 마이페이지 바 차트 정보 요청
export const getBarChartInfo = async (params: number): Promise<BarChartInfo> => {
  const { data } = await api.get(`/members/${params}/trouble-shootings/by-solve`);
  const { solvedCount, notSolvedCount, totalCount } = data;
  return { solvedCount, notSolvedCount, totalCount };
};

// 마이페이지 파이 그래프 정보 요청
export const getPieGraphInfo = async (params: number): Promise<PieGraphInfo> => {
  const { data } = await api.get(`/members/${params}/trouble-shootings/by-solve`);
  const { solvedCount, notSolvedCount } = data;
  return { solvedCount, notSolvedCount };
};

// 유저가 많이 사용한 태그 요청
export const getUsedLotTags = async (params: ReqTags): Promise<[]> => {
  const userSeq = params.userSeq;
  const config: AxiosRequestConfig = {
    params: params, // 여기서 나머지 파라미터를 설정
  };
  const { data } = await api.get(`/members/${userSeq}/tags/most-used`, config);
  const { tagList } = data;
  const filterTagList = tagList.filter((item: string) => item !== "이있어 답할 단어 없습니다");
  return filterTagList;
};

// 유저가 추가한 북마크 목록
// 게이트웨이 되면 코드 수정하기
export const getBookmarkList = async (params: SearchParams): Promise<GetTroubleList> => {
  const Url = "https://orientalsalad.kro.kr:8102/trouble-shootings";
  const { data } = await api.get(Url, { params });
  return data;
};

// 유저 pk로 유저의 정보 가져오기
export const getUserInfo = async (params: number) => {
  const { data } = await api.get(`/members/${params}`);
  const { member } = data;
  return member;
};
