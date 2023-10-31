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
@RequestMapping("/trouble-shooting")
@RequiredArgsConstructor
@Log4j2
public class TroubleShootingController {
	private final TroubleShootingService troubleShootingService;

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
	@GetMapping("/{seq}")
	public ResponseEntity<?> findTroubleShooting(@PathVariable(name = "seq") long seq) throws Exception {
		log.info("====== 트러블 슈팅 문서 pk 탐색 시작 =====");
		TroubleShootingDTO troubleShootingDTO = troubleShootingService.findTroubleShootingBySeq(seq);

		log.info(troubleShootingDTO);

		ResponseTroubleShootingDTO resultDTO = ResponseTroubleShootingDTO.builder()
			.success(true)
			.message(seq+"번 트러블 슈팅 문서 검색을 성공했습니다.")
			.troubleShootingDTOList(new ArrayList<>())
			.build();

		resultDTO.getTroubleShootingDTOList().add(troubleShootingDTO);
		
		log.info("====== 트러블 슈팅 문서 pk 탐색 끝 =====");
		return new ResponseEntity<ResponseTroubleShootingDTO>(resultDTO, HttpStatus.ACCEPTED);
	}
	@GetMapping("")
	public ResponseEntity<?> findTroubleShootingList(@ModelAttribute SearchTroubleShootingDTO searchParam) throws
		Exception {
		log.info("====== 트러블 슈팅 문서 목록 검색 시작 =====");
		log.info(searchParam);

		List<TroubleShootingDTO> troubleShootingDTOList = troubleShootingService.findTroubleShootingList(searchParam);

		ResponseTroubleShootingDTO resultDTO = ResponseTroubleShootingDTO.builder()
			.success(true)
			.message("트러블 슈팅 문서 목록 검색을 성공했습니다.")
			.troubleShootingDTOList(troubleShootingDTOList)
			.build();

		log.info("====== 트러블 슈팅 문서 목록 검색 끝 =====");
		return new ResponseEntity<ResponseTroubleShootingDTO>(resultDTO, HttpStatus.ACCEPTED);
	}
}
