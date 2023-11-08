import { GetTroubleList, SearchParams } from "@/types/TroubleType";
import { apiInstance } from ".";

const api = apiInstance();

export const getTrouble = async (params: SearchParams = {}): Promise<GetTroubleList> => {
  const { data } = await api.get("trouble-shootings", { params });
  return data;
};
