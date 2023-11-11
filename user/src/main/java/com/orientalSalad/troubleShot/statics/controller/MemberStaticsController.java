package com.orientalSalad.troubleShot.statics.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.orientalSalad.troubleShot.statics.dto.ResponsePolygonDTO;
import com.orientalSalad.troubleShot.statics.service.StaticsService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping(path = "/members/{userSeq}/statics")
@RequiredArgsConstructor
@Log4j2
public class MemberStaticsController {
	private final StaticsService staticsService;

	@Operation(summary = "오각형 통계 가져오기")
	@GetMapping("/polygon")
	public ResponseEntity<?> findPloygonByUserSeq (
		@PathVariable(name = "userSeq") Long userSeq){
		log.info("==== 유저 오각형 데이터 가져오기 시작 ====");

		double troubleRank = staticsService.getTroubleRank(userSeq)*100;
		double answerRank = staticsService.getAnswerRank(userSeq)*100;
		double replyRank = staticsService.getReplyRank(userSeq)*100;
		double tagTypeRank = staticsService.getTagRank(userSeq)*100;
		double dailyTroubleRank = staticsService.getDailyTroubleRank(userSeq)*100;

		ResponsePolygonDTO resultDTO = ResponsePolygonDTO.builder()
			.success(true)
			.message("유저 오각형 데이터 가져오기를 성공했습니다.")
			.troubleRank(troubleRank)
			.answerRank(answerRank)
			.replyRank(replyRank)
			.userSeq(userSeq)
			.tagTypeRank(tagTypeRank)
			.dailyTroubleRank(dailyTroubleRank)
			.build();

		log.info("==== 유저 오각형 데이터 가져오기 끝 ====");
		return new ResponseEntity<>(resultDTO, HttpStatus.ACCEPTED);
	}

}
