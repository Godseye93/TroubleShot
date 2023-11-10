package com.orientalSalad.troubleShot.statics.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.orientalSalad.troubleShot.statics.dto.UserRankDTO;

@Mapper
public interface StaticsMapper {
	public UserRankDTO selectTroubleRankBySeq(@Param("userSeq") long userSeq);
	public UserRankDTO selectAnswerRankBySeq(@Param("userSeq") long userSeq);
	public UserRankDTO selectReplyRankBySeq(@Param("userSeq") long userSeq);
	public UserRankDTO selectTagRankBySeq(@Param("userSeq") long userSeq);
	public UserRankDTO selectDailyPostRankBySeq(@Param("userSeq") long userSeq);
}
