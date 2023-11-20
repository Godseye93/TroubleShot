export const checkWriterImg = (writer: { profileImg: string } | null) => {
  return writer
    ? writer.profileImg
    : "https://k9d205-troubleshot.s3.ap-northeast-2.amazonaws.com/trouble/DefaultImg.png";
};

export const checkWriterName = (writer: { nickname: string } | null) => {
  return writer ? writer.nickname : "(알수없음)";
};
