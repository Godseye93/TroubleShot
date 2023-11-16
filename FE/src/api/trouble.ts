import {
  DefaultRespense,
  GetMostTags,
  GetTroubleDetail,
  GetTroubleList,
  RequestTroubleShooting,
  RequestTroubleShootingAnswer,
  RequestTroubleShootingAnswerReply,
  RequestTroubleShootingReply,
  ResponseCategory,
  SearchParams,
} from "@/types/TroubleType";
import qs from "qs";
import axios from "axios";
import { troubleApiInstance } from "./troubleApi";
axios.defaults.paramsSerializer = (params) => {
  return qs.stringify(params);
};
const api = troubleApiInstance();

export const getTrouble = async (params: SearchParams = {}): Promise<GetTroubleList> => {
  const { data } = await api.get("/trouble-shootings", { params });
  return data;
};
export const getBookmark = async (params: SearchParams = {}): Promise<GetTroubleList> => {
  const req: SearchParams = {
    ...params,
    favorite: true,
  };
  const { data } = await api.get("/trouble-shootings", { params: req });
  return data;
};
export const getUserTrouble = async (params: SearchParams = {}): Promise<GetTroubleList> => {
  const req: SearchParams = {
    ...params,
  };
  const { data } = await api.get("/trouble-shootings", { params: req });
  return data;
};
export const getUserCategoryTrouble = async (params: SearchParams = {}): Promise<GetTroubleList> => {
  const req: SearchParams = {
    ...params,
    favorite: true,
  };
  const { data } = await api.get("/trouble-shootings", { params: req });
  return data;
};

export const postTrouble = async (req: RequestTroubleShooting): Promise<DefaultRespense> => {
  const { data } = await api.post("/trouble-shootings", req);
  console.log(req);
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
export const putAnswer = async (
  userSeq: number,
  troubleSeq: number,
  context: string,
  title: string,
  answerSeq: number
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
  const { data } = await api.put(`/trouble-shootings/${troubleSeq}/answers/${answerSeq}`, body);
  return data;
};
export const deleteAnswer = async (
  userSeq: number,
  troubleSeq: number,
  answerSeq: number
): Promise<DefaultRespense> => {
  const params = {
    loginSeq: userSeq,
    type: 0,
  };
  const { data } = await api.delete(`/trouble-shootings/${troubleSeq}/answers/${answerSeq}`, { params });
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

export const putComment = async (
  userSeq: number,
  troubleSeq: number,
  content: string,
  commentSeq: number
): Promise<DefaultRespense> => {
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
  const { data } = await api.put(`/trouble-shootings/${troubleSeq}/reply/${commentSeq}`, body);
  return data;
};

export const postLikeComment = async (
  userSeq: number,
  troubleSeq: number,
  commentSeq: number
): Promise<DefaultRespense> => {
  const body = {
    loginSeq: userSeq,
    type: 0,
  };
  const { data } = await api.post(`/members/${userSeq}/trouble-shootings/${troubleSeq}/reply/${commentSeq}/like`, body);
  return data;
};
export const postAnswerComment = async (
  userSeq: number,
  troubleSeq: number,
  answerSeq: number,
  comment: string
): Promise<DefaultRespense> => {
  const body: RequestTroubleShootingAnswerReply = {
    loginSeq: userSeq,
    type: 0,
    troubleShootingAnswerReply: {
      context: comment,
      writer: {
        seq: userSeq,
      },
      answerSeq: answerSeq,
    },
  };
  const { data } = await api.post(`/trouble-shootings/${troubleSeq}/answers/${answerSeq}/replies`, body);
  return data;
};
export const postLikeAnswerComment = async (
  userSeq: number,
  troubleSeq: number,
  answerSeq: number,
  commentSeq: number
): Promise<DefaultRespense> => {
  const body = {
    loginSeq: userSeq,
    type: 0,
  };
  const { data } = await api.post(
    `/members/${userSeq}/trouble-shootings/${troubleSeq}/answers/${answerSeq}/replies/${commentSeq}/like`,
    body
  );
  return data;
};

export const putAnswerComment = async (
  userSeq: number,
  troubleSeq: number,
  answerSeq: number,
  comment: string,
  commentSeq: number
): Promise<DefaultRespense> => {
  const body: RequestTroubleShootingAnswerReply = {
    loginSeq: userSeq,
    type: 0,
    troubleShootingAnswerReply: {
      context: comment,
      writer: {
        seq: userSeq,
      },
      answerSeq: answerSeq,
    },
  };
  const { data } = await api.put(`/trouble-shootings/${troubleSeq}/answers/${answerSeq}/replies/${commentSeq}`, body);
  return data;
};

export const deleteAnswerComment = async (
  userSeq: number,
  troubleSeq: number,
  answerSeq: number,
  commentSeq: number
): Promise<DefaultRespense> => {
  const params = {
    loginSeq: userSeq,
    type: 0,
  };
  const { data } = await api.delete(`/trouble-shootings/${troubleSeq}/answers/${answerSeq}/replies/${commentSeq}`, {
    params,
  });
  return data;
};
export const getCategories = async (userSeq: number): Promise<ResponseCategory> => {
  const { data } = await api.get(`/users/${userSeq}/categories`);
  return data;
};
export const putTrouble = async (troubleSeq: number, req: RequestTroubleShooting): Promise<DefaultRespense> => {
  const { data } = await api.put(`/trouble-shootings/${troubleSeq}`, req);
  return data;
};
export const deleteTrouble = async (userSeq: number, troubleSeq: number): Promise<DefaultRespense> => {
  const params = {
    loginSeq: userSeq,
    type: 0,
  };
  const { data } = await api.delete(`/trouble-shootings/${troubleSeq}`, { params });
  return data;
};

export const postCategory = async (userSeq: number, category: string) => {
  const body = {
    loginSeq: userSeq,
    type: 0,
    category: {
      name: category,
      userSeq,
    },
  };
  const { data } = await api.post(`/users/${userSeq}/categories`, body);
  return data;
};
export const putCategory = async (userSeq: number, category: string, categorySeq: number) => {
  const body = {
    loginSeq: userSeq,
    type: 0,
    category: {
      name: category,
      userSeq,
    },
  };
  const { data } = await api.put(`/users/${userSeq}/categories/${categorySeq}`, body);
  return data;
};
export const deleteCategory = async (userSeq: number, categorySeq: number) => {
  const params = {
    loginSeq: userSeq,
    type: 0,
  };
  const { data } = await api.delete(`/users/${userSeq}/categories/${categorySeq}`, { params });
  return data;
};
export const putSelectAnswer = async (userSeq: number, troubleSeq: number, answerSeq: number) => {
  const body = {
    loginSeq: userSeq,
    type: 0,
  };
  const { data } = await api.put(`/trouble-shootings/${troubleSeq}/answers/${answerSeq}/select`, body);
  return data;
};
