import { apiInstance } from ".";

const api = apiInstance();

export const emailCert = async (email: string): Promise<boolean | undefined> => {
  const { data } = await api.post("auth/email/send", email);
  return data;
};
