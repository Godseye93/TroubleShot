import { CommonType, EmailCertResponse, EmailCode, SignUpType } from "@/types/CommonType";
import { apiInstance } from ".";

const api = apiInstance();

<<<<<<< HEAD
export const emailCert = async (email: string): Promise<EmailCertResponse | undefined> => {
  const { data } = await api.post("auth/email/send", email);
  return data;
};

export const emailcodeCheck = async (params: EmailCode): Promise<EmailCertResponse | undefined> => {
  const { data } = await api.post("auth/email/confirm", params);
  return data;
};

export const signUpSubmit = async (params: SignUpType): Promise<CommonType | undefined> => {
  const { data } = await api.post("members", params);
  return data;
=======
export const emailCert = async (email: string): Promise<boolean | undefined> => {
  const { data } = await api.post("auth/email/send", email);
  return data;
>>>>>>> 78cd6b69c35e46d44f8d27742d58c42488349462
};
