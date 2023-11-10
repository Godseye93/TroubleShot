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
import com.orientalSalad.troubleShot.statics.dto.ResponsePolygonDTO;
import com.orientalSalad.troubleShot.statics.dto.ResponseTagDTO;
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
		return new ResponseEntity<>(resultDTO, HttpStatus.ACCEPTED);
	}
}
