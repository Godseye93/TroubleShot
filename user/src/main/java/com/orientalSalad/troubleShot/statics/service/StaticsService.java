package com.orientalSalad.troubleShot.statics.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.orientalSalad.troubleShot.statics.dto.RequestMostUsedTagDTO;
import com.orientalSalad.troubleShot.statics.dto.UserRankDTO;
import com.orientalSalad.troubleShot.statics.mapper.StaticsMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class StaticsService {
	private final StaticsMapper staticsMapper;

	public double getTroubleRank(Long userSeq){
		UserRankDTO userRankDTO = staticsMapper.selectTroubleRankBySeq(userSeq);
		if(userRankDTO == null){
			userRankDTO = UserRankDTO.builder()
				.totalCount(100)
				.upperCount(100)
				.build();
		}
		double rank = (double)userRankDTO.getUpperCount() / userRankDTO.getTotalCount();

		return rank;
	}
	public double getAnswerRank(Long userSeq){
		UserRankDTO userRankDTO = staticsMapper.selectAnswerRankBySeq(userSeq);
		if(userRankDTO == null){
			userRankDTO = UserRankDTO.builder()
				.totalCount(100)
				.upperCount(100)
				.build();
		}
		double rank = (double)userRankDTO.getUpperCount() / userRankDTO.getTotalCount();

		return rank;
	}
	public double getReplyRank(Long userSeq){
		UserRankDTO userRankDTO = staticsMapper.selectReplyRankBySeq(userSeq);
		if(userRankDTO == null){
			userRankDTO = UserRankDTO.builder()
				.totalCount(100)
				.upperCount(100)
				.build();
		}
		double rank = (double)userRankDTO.getUpperCount() / userRankDTO.getTotalCount();

		return rank;
	}
	public double getTagRank(Long userSeq){
		UserRankDTO userRankDTO = staticsMapper.selectTagRankBySeq(userSeq);
		if(userRankDTO == null){
			userRankDTO = UserRankDTO.builder()
				.totalCount(100)
				.upperCount(100)
				.build();
		}
		double rank = (double)userRankDTO.getUpperCount() / userRankDTO.getTotalCount();

		return rank;
	}
	public double getDailyTroubleRank(Long userSeq){
		UserRankDTO userRankDTO = staticsMapper.selectDailyPostRankBySeq(userSeq);
		if(userRankDTO == null){
			userRankDTO = UserRankDTO.builder()
				.totalCount(100)
				.upperCount(100)
				.build();
		}
		double rank = (double)userRankDTO.getUpperCount() / userRankDTO.getTotalCount();

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
}
