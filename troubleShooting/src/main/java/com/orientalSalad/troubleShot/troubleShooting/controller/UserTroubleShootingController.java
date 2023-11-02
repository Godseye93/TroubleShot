package com.orientalSalad.troubleShot.troubleShooting.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.orientalSalad.troubleShot.global.dto.ResultDTO;
import com.orientalSalad.troubleShot.troubleShooting.dto.ResponseTroubleShootingDTO;
import com.orientalSalad.troubleShot.troubleShooting.dto.SearchTroubleShootingDTO;
import com.orientalSalad.troubleShot.troubleShooting.dto.TroubleShootingDTO;
import com.orientalSalad.troubleShot.troubleShooting.service.TroubleShootingService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Controller
@RequestMapping("users/{userSeq}/trouble-shooting")
@RequiredArgsConstructor
@Log4j2
public class UserTroubleShootingController {
	private final TroubleShootingService troubleShootingService;

	@GetMapping("")
	public ResponseEntity<?> findTroubleShootingList(
		@PathVariable(name = "userSeq") Long userSeq,
		@ModelAttribute SearchTroubleShootingDTO searchParam) throws
		Exception {
		log.info(String.format("====== %d 유저 트러블 슈팅 문서 목록 검색 시작 =====",userSeq));
		log.info(searchParam);

		List<TroubleShootingDTO> troubleShootingDTOList = troubleShootingService.findTroubleShootingListByUserSeq(searchParam,userSeq);
		long totalCount = troubleShootingService.countTroubleShootingListByUserSeq(searchParam,userSeq);

		ResponseTroubleShootingDTO resultDTO = ResponseTroubleShootingDTO.builder()
			.success(true)
			.message(userSeq+"번 유저의 트러블 슈팅 문서 목록 검색을 성공했습니다.")
			.totalCount(totalCount)
			.troubleShootingDTOList(troubleShootingDTOList)
			.build();

		log.info(String.format("====== %d 유저 트러블 슈팅 문서 목록 검색 끝 =====",userSeq));
		return new ResponseEntity<ResponseTroubleShootingDTO>(resultDTO, HttpStatus.ACCEPTED);
	}
}
