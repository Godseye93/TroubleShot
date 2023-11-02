export type CommonType = string;

export type EmailCertResponse = {
    success: boolean;
  };

export interface EmailCode {
    email: string;
    code: string;
};

export interface SignUpType {
    email: string;
    password: string;
    nickname: string;
    locale: string;
};