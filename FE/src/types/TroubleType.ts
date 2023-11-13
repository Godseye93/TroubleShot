export interface DefaultRespense {
  success: boolean;
  message: string;
}
export interface GetMostTags extends DefaultRespense {
  tagList: string[];
}
export interface CreateOptions {
  category: string;
  scope: 0 | 1 | null;
  tags: string[];
  solved: boolean | null;
}
export interface PostTroubleShooting {
  title: string;
  category: string;
  context: string;
  dependency: string;
  scope: 0 | 1;
  writer: {
    seq: number;
  };
  solved: boolean;
  tags: string[];
}
export interface RequestTroubleShooting {
  loginSeq: number;
  type: 0;
  troubleShooting: PostTroubleShooting;
}

export interface SearchParams {
  keyword?: string;
  pageSize?: number;
  pageNo?: number;
  category?: string;
  solved?: boolean;
  tags?: string[];
  writer?: string;
  dependency?: string;
  troubleSeq?: number;
  writerSeq?: number;
  loginSeq?: number;
  startTime?: string;
  endTime?: string;
  favorite?: boolean;
  order?: number;
}
export interface Writer {
  seq: number;
  email: string;
  profileImg: string;
  nickname: string;
}
export interface TroubleShootingBoard {
  seq: number;
  createTime: string;
  updateTime: string;
  title: string;
  category: string;
  context: string;
  dependency: null | string;
  scope: number;
  writer: Writer;
  solved: boolean;
  viewCount: number;
  likeCount: number;
  replyCount: number;
  answerCount: number;
  tags: string[];
  replies: null | Reply[];
  answers: Answer[];
  loginLike: false;
  favorite: false;
}

export interface GetTroubleList {
  success: boolean;
  message: string;
  troubleShootingList: TroubleShootingBoard[];
  totalCount: number;
}

export interface GetTroubleDetail {
  success: boolean;
  message: string;
  troubleShooting: TroubleShootingBoard;
}
export interface Reply {
  seq: number;
  createTime: string;
  updateTime: string;
  context: string;
  writerSeq: number;
  writer: Writer;
  likeCount: number;
  troubleSeq: number;
  loginLike: boolean;
}
export interface Answer {
  seq: 1;
  createTime: string;
  updateTime: string;
  deleteTime: null;
  title: string;
  context: string;
  writer: Writer;
  likeCount: number;
  replyCount: number;
  troubleSeq: number;
  replies: Reply[];
  loginLike: boolean;
  selected: boolean;
}
export interface TroubleShootingAnswer {
  context: string;
  title: string;
  writer: {
    seq: number;
  };
  troubleSeq: number;
}

export interface RequestTroubleShootingAnswer {
  loginSeq: number;
  type: 0;
  troubleShootingAnswer: TroubleShootingAnswer;
}
export interface TroubleShootingReply {
  context: string;
  writer: {
    seq: number;
  };
  troubleSeq: number;
}
export interface RequestTroubleShootingReply {
  loginSeq: number;
  type: 0;
  troubleShootingReply: TroubleShootingReply;
}
