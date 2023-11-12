export type CommonType = string;

export type EmailCertResponse = {
  success: boolean;
};

export interface EmailCode {
  email: string;
  code: string;
}

export interface SignUpType {
  email: string;
  password: string;
  nickname: string;
  locale: string;
}

export interface ReqLogin {
  email: string;
  password: string;
  type: number;
}

export interface ResLogin {
  success: boolean;
  message: string;
  member: Member;
}

export interface Member {
  seq: number;
  email: string;
  profileImg: string;
  nickname: string;
  locale: string;
}

export interface ReqLogout {
  seq: number;
  type: number;
}

export interface ResLogout {
  success: boolean;
  message: string;
}

export type LoginStore = {
  user: ResLogin | null;
  userLogin: (res: ResLogin) => void;
  userLogout: () => void;
};

export interface RadarGraphInfo {
  troubleRank: number;
  answerRank: number;
  tagTypeRank: number;
  replyRank: number;
  dailyTroubleRank: number;
}

export interface RadarToUseInfo {
  질문력: number;
  답변력: number;
  태그다양성: number;
  댓글력: number;
  열정도: number;
}

export interface RadarGraphInfoAddNick {
  nickname: string;
  질문력: number;
  답변력: number;
  태그다양성: number;
  댓글력: number;
  열정도: number;
}

export interface BarChartInfo {
  solvedCount: number;
  notSolvedCount: number;
  totalCount: number;
}

export interface PieGraphInfo {
  solvedCount: number;
  notSolvedCount: number;
  // totalCount: number;
}

export type ReqTags = {
  userSeq: number;
  count: number;
};
