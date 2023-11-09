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
