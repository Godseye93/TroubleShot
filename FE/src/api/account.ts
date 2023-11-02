import { EmailCertResponse, EmailCode, SignUpType } from "@/types/CommonType";
import { apiInstance } from ".";


const api = apiInstance()

export const emailCert = async (email:string):Promise<EmailCertResponse | undefined> => {
    const {data} = await api.post("auth/email/send", email);
    return data
};

export const emailcodeCheck = async (params:EmailCode):Promise<EmailCertResponse | undefined> => {
    const {data} = await api.post("auth/email/confirm", params);
    return data
};

export const signUpSubmit = async (params:SignUpType):Promise<EmailCertResponse | undefined> => {
    const {data} = await api.post("members", params);
    return data
}