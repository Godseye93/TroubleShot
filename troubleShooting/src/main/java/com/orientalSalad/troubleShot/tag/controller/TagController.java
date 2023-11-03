package com.orientalSalad.troubleShot.tag.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.orientalSalad.troubleShot.global.dto.ResultDTO;
import com.orientalSalad.troubleShot.troubleShooting.dto.TroubleShootingDTO;
import com.orientalSalad.troubleShot.troubleShooting.service.TroubleShootingService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Controller
@RequestMapping("/tags")
@RequiredArgsConstructor
@Log4j2
public class TagController {
	private final TroubleShootingService troubleShootingService;

	@Operation(summary = "태그 생성")
	@PostMapping("")
	public ResponseEntity<?> insertTroubleShooting(@RequestBody TroubleShootingDTO troubleShootingDTO){
		log.info("====== 트러블 슈팅 문서 등록 시작 =====");
		troubleShootingService.insertTroubleShooting(troubleShootingDTO);

		ResultDTO resultDTO = ResultDTO.builder()
			.success(true)
			.message("트러블 슈팅 문서 등록이 성공했습니다.")
			.build();
		
		log.info("====== 트러블 슈팅 문서 등록 끝 =====");
		return new ResponseEntity<ResultDTO>(resultDTO, HttpStatus.ACCEPTED);
	}
}
