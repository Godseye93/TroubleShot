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
  const body = {
    type: 0,
    ...(loginSeq && { loginSeq: userSeq }),
  };
  const { data } = await api.post(`/members/${userSeq}/trouble-shootings/${troubleSeq}/like`, body);
  return data;
};

export const postTroubleFavorite = async (userSeq: number, troubleSeq: number): Promise<DefaultRespense> => {
  const body = {
    type: 0,
    loginSeq: userSeq,
  };
  const { data } = await api.post(`/members/${userSeq}/trouble-shootings/${troubleSeq}/favorite`, body);
  return data;
};
