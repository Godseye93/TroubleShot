package com.orientalSalad.troubleShot.statics.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.orientalSalad.troubleShot.statics.dto.RequestMostUsedTagDTO;
import com.orientalSalad.troubleShot.statics.dto.RequestTagHistoryDTO;
import com.orientalSalad.troubleShot.statics.dto.ResponseTagDTO;
import com.orientalSalad.troubleShot.statics.dto.ResponseTagHistoryDTO;
import com.orientalSalad.troubleShot.statics.dto.TagHistoryDTO;
import com.orientalSalad.troubleShot.statics.service.StaticsService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping(path = "/members/{userSeq}/tags")
@RequiredArgsConstructor
@Log4j2
public class MemberTagController {
	private final StaticsService staticsService;

	@Operation(summary = "많이 사용한 태그 API")
	@GetMapping("/most-used")
	public ResponseEntity<?> findMostUsedTag (
		@ModelAttribute RequestMostUsedTagDTO requestMostUsedTagDTO){
		log.info("==== 유저의 많이 사용한 태그 가져오기 시작 ====");

		List<String> tagList = staticsService.getMostUsedTagList(requestMostUsedTagDTO);

		ResponseTagDTO resultDTO = ResponseTagDTO.builder()
			.success(true)
			.message("유저의 많이 사용한 태그 가져오기를 성공했습니다.")
			.tagList(tagList)
			.build();

		log.info("==== 유저의 많이 사용한 태그 가져오기 끝 ====");
		return new ResponseEntity<>(resultDTO, HttpStatus.OK);
	}
	@Operation(summary = "내가 사용한 태그 목록 API")
	@GetMapping("")
	public ResponseEntity<?> findAllTagsByUserSeq (
		@PathVariable(name = "userSeq") long userSeq){
		log.info("==== 유저가 사용한 모든 태그 가져오기 시작 ====");

		List<String> tagList = staticsService.getAllTagsByUserSeq(userSeq);

		ResponseTagDTO resultDTO = ResponseTagDTO.builder()
			.success(true)
			.message("유저가 사용한 태그 가져오기를 성공했습니다.")
			.tagList(tagList)
			.build();

		log.info("==== 유저가 사용한 모든 태그 가져오기 끝 ====");
		return new ResponseEntity<>(resultDTO, HttpStatus.OK);
	}
	@Operation(summary = "기간별 많이 사용한 태그 히스토리 API")
	@GetMapping("/most-used-history")
	public ResponseEntity<?> findMostUsedTagHistory (
		@ModelAttribute RequestTagHistoryDTO requestTagHistoryDTO){
		log.info("==== 기간별 많이 사용한 태그 히스토리 가져오기 시작 ====");

		List<TagHistoryDTO> tagHistoryList = staticsService.getAllTagHistory(requestTagHistoryDTO);

		ResponseTagHistoryDTO resultDTO = ResponseTagHistoryDTO.builder()
			.success(true)
			.message("기간별 많이 사용한 태그 히스토리 가져오기를 성공했습니다.")
			.tagHistoryList(tagHistoryList)
			.build();

		log.info("==== 기간별 많이 사용한 태그 히스토리 가져오기 끝 ====");
		return new ResponseEntity<>(resultDTO, HttpStatus.OK);
	}
}
