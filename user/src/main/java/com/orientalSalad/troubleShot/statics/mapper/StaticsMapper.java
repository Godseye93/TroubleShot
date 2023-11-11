package com.orientalSalad.troubleShot.statics.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.orientalSalad.troubleShot.statics.dto.RequestMostUsedTagDTO;
import com.orientalSalad.troubleShot.statics.dto.MemberRankDTO;
import com.orientalSalad.troubleShot.statics.dto.RequestTagHistoryDTO;
import com.orientalSalad.troubleShot.statics.dto.RequestTroubleHistoryDTO;
import com.orientalSalad.troubleShot.statics.dto.TagHistoryDTO;
import com.orientalSalad.troubleShot.statics.dto.TroubleShootingHistoryDTO;
import com.orientalSalad.troubleShot.statics.dto.TroubleShootingTypeGroupDTO;

@Mapper
public interface StaticsMapper {
	public MemberRankDTO selectTroubleRankBySeq(@Param("userSeq") long userSeq);
	public MemberRankDTO selectAnswerRankBySeq(@Param("userSeq") long userSeq);
	public MemberRankDTO selectReplyRankBySeq(@Param("userSeq") long userSeq);
	public MemberRankDTO selectTagRankBySeq(@Param("userSeq") long userSeq);
	public MemberRankDTO selectDailyPostRankBySeq(@Param("userSeq") long userSeq);
	public List<String> selectMostUsedTag(@Param("searchParam") RequestMostUsedTagDTO requestMostUsedTagDTO);
	public List<String> selectAllTagsByUserSeq(@Param("userSeq")long userSeq);
	public List<TagHistoryDTO> selectTopTagHistoryByUserSeq(@Param("searchParam")RequestTagHistoryDTO requestTagHistoryDTO);
	public Long countSolvedTroubleByUserSeq(@Param("userSeq")long userSeq);
	public Long countNotSolvedTroubleByUserSeq(@Param("userSeq")long userSeq);
	public List<TroubleShootingHistoryDTO> countAllTroubleByUserSeqAndCreateDate(@Param("searchParam") RequestTroubleHistoryDTO requestTroubleHistoryDTO);
	public Long countAllTroubleByUserSeq(@Param("userSeq")long userSeq);
	public List<TroubleShootingTypeGroupDTO> countAllTroubleByPostType(@Param("userSeq") long userSeq);
}
