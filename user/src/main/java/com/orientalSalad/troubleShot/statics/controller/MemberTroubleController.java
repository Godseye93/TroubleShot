package com.orientalSalad.troubleShot.statics.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.orientalSalad.troubleShot.statics.dto.ResponseCountTroubleDTO;
import com.orientalSalad.troubleShot.statics.dto.ResponsePolygonDTO;
import com.orientalSalad.troubleShot.statics.service.StaticsService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping(path = "/members/{userSeq}/trouble-shootings")
@RequiredArgsConstructor
@Log4j2
public class MemberTroubleController {
	private final StaticsService staticsService;

	@Operation(summary = "해결/미해결 트러블 슈팅 문서 개수 가져오기")
	@GetMapping("/solve-and-not-solve")
	public ResponseEntity<?> get (
		@PathVariable(name = "userSeq") Long userSeq){
		log.info("==== 해결/미해결 트러블 슈팅 문서 개수 가져오기 시작 ====");

		long solvedCount = staticsService.getSolvedTroubleCount(userSeq);
		long notSolvedCount = staticsService.getNotSolvedTroubleCount(userSeq);

		ResponseCountTroubleDTO resultDTO = ResponseCountTroubleDTO.builder()
			.success(true)
			.message("해결/미해결 트러블 슈팅 문서 개수 가져오기를 성공했습니다.")
			.solvedCount(solvedCount)
			.notSolvedCount(notSolvedCount)
			.totalCount(solvedCount+notSolvedCount)
			.build();

		log.info("==== 해결/미해결 트러블 슈팅 문서 개수 가져오기 끝 ====");
		return new ResponseEntity<>(resultDTO, HttpStatus.ACCEPTED);
	}
}
