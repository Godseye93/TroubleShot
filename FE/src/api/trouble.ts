import {
  DefaultRespense,
  GetMostTags,
  GetTroubleDetail,
  GetTroubleList,
  RequestTroubleShooting,
  RequestTroubleShootingAnswer,
  RequestTroubleShootingReply,
  SearchParams,
} from "@/types/TroubleType";
import { apiInstance } from ".";
import { apiInstance as tmpApi } from "./tempApi";
import qs from "qs";
import axios from "axios";
axios.defaults.paramsSerializer = (params) => {
  return qs.stringify(params);
};
const api = apiInstance();
export const getTrouble = async (params: SearchParams = {}): Promise<GetTroubleList> => {
  const { data } = await api.get("/trouble-shootings", { params });
  return data;
};

export const postTrouble = async (req: RequestTroubleShooting): Promise<DefaultRespense> => {
  const { data } = await api.post("/trouble-shootings", req);
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
export const getMostTags = async (userSeq: number): Promise<GetMostTags> => {
  const params = {
    count: 2,
    userSeq,
  };
  const { data } = await api.get(`/members/${userSeq}/most-used`, { params });
  return data;
};
export const getTroubleDetail = async (userSeq: number | null, troubleSeq: number): Promise<GetTroubleDetail> => {
  const params = {
    ...(userSeq && { loginSeq: userSeq }),
    type: 0,
  };
  const { data } = await api.get(`/trouble-shootings/${troubleSeq}`, { params });
  return data;
};

export const postAnswer = async (
  userSeq: number,
  troubleSeq: number,
  context: string,
  title: string
): Promise<DefaultRespense> => {
  const body: RequestTroubleShootingAnswer = {
    loginSeq: userSeq,
    type: 0,
    troubleShootingAnswer: {
      title: title,
      context: context,
      writer: {
        seq: userSeq,
      },
      troubleSeq: troubleSeq,
    },
  };
  const { data } = await api.post(`/trouble-shootings/${troubleSeq}/answers`, body);
  return data;
};

export const postAnswerLike = async (
  userSeq: number,
  troubleSeq: number,
  answerSeq: number
): Promise<DefaultRespense> => {
  const body = {
    loginSeq: userSeq,
    type: 0,
  };
  const { data } = await api.post(
    `/members/${userSeq}/trouble-shootings/${troubleSeq}/answers/${answerSeq}/like`,
    body
  );
  return data;
};
export const postComment = async (userSeq: number, troubleSeq: number, content: string): Promise<DefaultRespense> => {
  const body: RequestTroubleShootingReply = {
    loginSeq: userSeq,
    type: 0,
    troubleShootingReply: {
      context: content,
      writer: {
        seq: userSeq,
      },
      troubleSeq: troubleSeq,
    },
  };
  const { data } = await api.post(`/trouble-shootings/${troubleSeq}/reply`, body);
  return data;
};
export const deleteComment = async (
  userSeq: number,
  troubleSeq: number,
  commentSeq: number
): Promise<DefaultRespense> => {
  const params = {
    loginSeq: userSeq,
    type: 0,
  };
  const { data } = await api.delete(`/trouble-shootings/${troubleSeq}/reply/${commentSeq}`, { params });
  return data;
};
