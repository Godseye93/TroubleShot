package com.orientalSalad.troubleShot.statics.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.orientalSalad.troubleShot.statics.dto.MemberRankDTO;
import com.orientalSalad.troubleShot.statics.dto.RequestMostUsedTagDTO;
import com.orientalSalad.troubleShot.statics.dto.RequestTagHistoryDTO;
import com.orientalSalad.troubleShot.statics.dto.RequestTroubleHistoryDTO;
import com.orientalSalad.troubleShot.statics.dto.TagHistoryDTO;
import com.orientalSalad.troubleShot.statics.dto.TroubleShootingHistoryDTO;
import com.orientalSalad.troubleShot.statics.mapper.StaticsMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class StaticsService {
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
	public Long getAllTroubleCount(long userSeq){
		Long solvedCount = staticsMapper.countAllTroubleByUserSeq(userSeq);

		if(solvedCount == null){
			solvedCount = 0L;
		}

		return solvedCount;
	}
	public Long getSolvedTroubleCount (long userSeq){
		Long solvedCount = staticsMapper.countSolvedTroubleByUserSeq(userSeq);

		if(solvedCount == null){
			solvedCount = 0L;
		}

		return solvedCount;
	}
	public Long getNotSolvedTroubleCount (long userSeq){
		Long notSolvedCount = staticsMapper.countNotSolvedTroubleByUserSeq(userSeq);

		if(notSolvedCount == null){
			notSolvedCount = 0L;
		}

		return notSolvedCount;
	}
	public List<TagHistoryDTO> getAllTagHistory (RequestTagHistoryDTO requestTagHistoryDTO){
		List<TagHistoryDTO> tagHistoryDTO = staticsMapper.selectTopTagHistoryByUserSeq(requestTagHistoryDTO);

		if(tagHistoryDTO == null){
			tagHistoryDTO = new ArrayList<>();
		}
		return tagHistoryDTO;
	}
	public List<TroubleShootingHistoryDTO> getAllTroubleShootingHistory (RequestTroubleHistoryDTO requestTroubleHistoryDTO){
		List<TroubleShootingHistoryDTO> troubleShootingHistoryDTOList = staticsMapper.countAllTroubleByUserSeqAndCreateDate(requestTroubleHistoryDTO);

		if(troubleShootingHistoryDTOList == null){
			troubleShootingHistoryDTOList = new ArrayList<>();
		}
		return troubleShootingHistoryDTOList;
	}
}
