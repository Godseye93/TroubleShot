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
  // message: string;
  member: Member;
}

export interface Member {
  seq: number;
  email: string;
  profileImg: string | null;
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

export type LoginState = {
  isLogged: boolean;
  toggleLoginStatus: (userData?: ResLogin) => void;
  // login: (params: ResLogin) => void;
  // logout: () => void;
};
