import { DefaultRespense, GetTroubleList, RequestTroubleShooting, SearchParams } from "@/types/TroubleType";
import { apiInstance } from ".";

const api = apiInstance();

export const getTrouble = async (params: SearchParams = {}): Promise<GetTroubleList> => {
  const { data } = await api.get("trouble-shootings", { params });
  return data;
};
export const postTrouble = async (req: RequestTroubleShooting): Promise<DefaultRespense> => {
  const { data } = await api.post("trouble-shootings", req);
  return data;
};
export const postTroubleLike = async (
  userSeq: number,
  troubleSeq: number,
  loginSeq?: number
): Promise<DefaultRespense> => {
  let body: {
    type: 0;
    loginSeq?: number;
  } = {
    type: 0,
  };
  if (loginSeq) body = { ...body, loginSeq };
  const { data } = await api.post(`/users/${userSeq}/trouble-shootings/${troubleSeq}/like`, body);
  return data;
};
