package com.orientalSalad.troubleShot.member.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.orientalSalad.troubleShot.statics.dto.MemberRankDTO;
import com.orientalSalad.troubleShot.statics.dto.RequestMostUsedTagDTO;
import com.orientalSalad.troubleShot.statics.dto.ResponseCountTroubleDTO;
import com.orientalSalad.troubleShot.statics.mapper.StaticsMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberTroubleService {
	private final StaticsMapper staticsMapper;

	public double getTroubleRank(Long userSeq){
		MemberRankDTO memberRankDTO = staticsMapper.selectTroubleRankBySeq(userSeq);
		if(memberRankDTO == null){
			memberRankDTO = MemberRankDTO.builder()
				.totalCount(100)
				.upperCount(100)
				.build();
		}
		double rank = (double)memberRankDTO.getUpperCount() / memberRankDTO.getTotalCount();

		return rank;
	}
	public double getAnswerRank(Long userSeq){
		MemberRankDTO memberRankDTO = staticsMapper.selectAnswerRankBySeq(userSeq);
		if(memberRankDTO == null){
			memberRankDTO = MemberRankDTO.builder()
				.totalCount(100)
				.upperCount(100)
				.build();
		}
		double rank = (double)memberRankDTO.getUpperCount() / memberRankDTO.getTotalCount();

		return rank;
	}
	public double getReplyRank(Long userSeq){
		MemberRankDTO memberRankDTO = staticsMapper.selectReplyRankBySeq(userSeq);
		if(memberRankDTO == null){
			memberRankDTO = MemberRankDTO.builder()
				.totalCount(100)
				.upperCount(100)
				.build();
		}
		double rank = (double)memberRankDTO.getUpperCount() / memberRankDTO.getTotalCount();

		return rank;
	}
	public double getTagRank(Long userSeq){
		MemberRankDTO memberRankDTO = staticsMapper.selectTagRankBySeq(userSeq);
		if(memberRankDTO == null){
			memberRankDTO = MemberRankDTO.builder()
				.totalCount(100)
				.upperCount(100)
				.build();
		}
		double rank = (double)memberRankDTO.getUpperCount() / memberRankDTO.getTotalCount();

		return rank;
	}
	public double getDailyTroubleRank(Long userSeq){
		MemberRankDTO memberRankDTO = staticsMapper.selectDailyPostRankBySeq(userSeq);
		if(memberRankDTO == null){
			memberRankDTO = MemberRankDTO.builder()
				.totalCount(100)
				.upperCount(100)
				.build();
		}
		double rank = (double)memberRankDTO.getUpperCount() / memberRankDTO.getTotalCount();

		return rank;
	}

	public List<String> getMostUsedTagList(RequestMostUsedTagDTO requestMostUsedTagDTO){
		List<String> tagList = staticsMapper.selectMostUsedTag(requestMostUsedTagDTO);

		if(tagList == null){
			tagList= new ArrayList<>();
		}

		return tagList;
	}
	public List<String> getAllTagsByUserSeq(long userSeq){
		List<String> tagList = staticsMapper.selectAllTagsByUserSeq(userSeq);

		if(tagList == null){
			tagList= new ArrayList<>();
		}

		return tagList;
	}
	public ResponseCountTroubleDTO getCountTrouble (long userSeq){
		long solvedCount = staticsMapper.countSolvedTroubleByUserSeq(userSeq);
		long notSolvedCount = staticsMapper.countNotSolvedTroubleByUserSeq(userSeq);

		ResponseCountTroubleDTO countTroubleDTO=  ResponseCountTroubleDTO.builder()
			.solvedCount(solvedCount)
			.notSolvedCount(notSolvedCount)
			.totalCount(solvedCount+notSolvedCount)
			.build();

		return countTroubleDTO;
	}
}
