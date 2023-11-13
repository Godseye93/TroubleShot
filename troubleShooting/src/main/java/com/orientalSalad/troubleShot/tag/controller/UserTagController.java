package com.orientalSalad.troubleShot.tag.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import com.orientalSalad.troubleShot.tag.dto.RequestMostUsedTagDTO;
import com.orientalSalad.troubleShot.tag.dto.ResponseTagListDTO;
import com.orientalSalad.troubleShot.tag.serivice.UserTagService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Tag(name = "유저의 태그 데이터 API")
@Controller
@RequestMapping("/members/{userSeq}")
@RequiredArgsConstructor
@Log4j2
public class UserTagController {
	private final UserTagService userTagService;

	@Operation(summary = "유저가 검색에 많이 사용한 태그 검색")
	@GetMapping("/most-used")
	public ResponseEntity<?> MostUsedTagList(
		@ModelAttribute RequestMostUsedTagDTO requestMostUsedTagDTO) {
		log.info("====== 유저가 검색에 많이 사용한 태그 검색 시작 =====");
		log.info("[PARAM] : "+requestMostUsedTagDTO	);

		List<String> tagList = userTagService.findMostUsedTagByUserSeq(requestMostUsedTagDTO);

		ResponseTagListDTO resultDTO = ResponseTagListDTO.builder()
			.success(true)
			.message("유저가 검색에 많이 사용한 태그 검색을 성공했습니다.")
			.tagList(tagList)
			.build();

		log.info("====== 유저가 많이 사용한 태그 검색 끝 =====");
		return new ResponseEntity<>(resultDTO,HttpStatus.OK);
	}
}
