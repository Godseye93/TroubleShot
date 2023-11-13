package com.orientalSalad.troubleShot.troubleShooting.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.orientalSalad.troubleShot.global.dto.RequestDTO;
import com.orientalSalad.troubleShot.global.dto.ResultDTO;
import com.orientalSalad.troubleShot.global.utill.Authentication;
import com.orientalSalad.troubleShot.troubleShooting.dto.RequestTroubleShootingAnswerDTO;
import com.orientalSalad.troubleShot.troubleShooting.dto.ResponseTroubleShootingAnswerDTO;
import com.orientalSalad.troubleShot.troubleShooting.dto.TroubleShootingAnswerDTO;
import com.orientalSalad.troubleShot.troubleShooting.service.TroubleShootingAnswerService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Tag(name = "솔루션 API")
@Controller
@RequestMapping("/trouble-shootings/{troubleSeq}/answers")
@RequiredArgsConstructor
@Log4j2
public class TroubleShootingAnswerController {
	private final TroubleShootingAnswerService troubleShootingAnswerService;
	private final Authentication authentication;

	@Operation(summary = "트러블 슈팅 솔루션 등록",description = "입력 DTO :RequestTroubleShootingAnswerDTO")
	@PostMapping("")
	public ResponseEntity<?> insertAnswer(
		HttpServletRequest request,
		@PathVariable(name = "troubleSeq") Long troubleSeq,
		@RequestBody RequestTroubleShootingAnswerDTO requestTroubleShootingAnswerDTO) throws Exception {
		log.info("====== 트러블 슈팅 솔루션 등록 시작 =====");
		log.info(requestTroubleShootingAnswerDTO.toString());

		//로그인 확인
		authentication.checkLogin(request, requestTroubleShootingAnswerDTO);
		//트러블슈팅 솔루션 등록
		TroubleShootingAnswerDTO answerDTO = troubleShootingAnswerService.insertTroubleShootingAnswer(requestTroubleShootingAnswerDTO);

		ResponseTroubleShootingAnswerDTO resultDTO = ResponseTroubleShootingAnswerDTO.builder()
			.success(true)
			.message("트러블 슈팅 솔루션 등록이 성공했습니다.")
			.troubleShootingAnswer(answerDTO)
			.build();
		
		log.info("====== 트러블 슈팅 솔루션 등록 끝 =====");
		return new ResponseEntity<ResultDTO>(resultDTO, HttpStatus.OK);
	}
	@Operation(summary = "트러블 슈팅 솔루션 삭제",description = "입력 DTO :RequestDTO")
	@DeleteMapping("/{answerSeq}")
	public ResponseEntity<?> deleteTroubleShooting(
		HttpServletRequest request,
		@ModelAttribute RequestDTO requestDTO,
		@PathVariable(name = "troubleSeq") Long troubleSeq,
		@PathVariable(name = "answerSeq") Long answerSeq) throws
		Exception {
		log.info("====== 트러블 슈팅 솔루션 삭제 시작 =====");
		//로그인 확인
		authentication.checkLogin(request,requestDTO);
		//pk 설정
		RequestTroubleShootingAnswerDTO requestTroubleShootingAnswerDTO
			= RequestTroubleShootingAnswerDTO.builder()
			.loginSeq(requestDTO.getLoginSeq())
			.type(requestDTO.getType())
			.troubleShootingAnswer(TroubleShootingAnswerDTO.builder()
				.seq(answerSeq)
				.troubleSeq(troubleSeq)
				.build())
			.build();
		//트러블슈팅 솔루션 삭제
		troubleShootingAnswerService.deleteTroubleShootingAnswer(requestTroubleShootingAnswerDTO);

		ResultDTO resultDTO = ResultDTO.builder()
			.success(true)
			.message(answerSeq+"번 트러블 슈팅 솔루션 삭제를 성공했습니다.")
			.build();

		log.info("====== 트러블 슈팅 솔루션 삭제 끝 =====");
		return new ResponseEntity<ResultDTO>(resultDTO, HttpStatus.OK);
	}
	@Operation(summary = "트러블 슈팅 문서 수정",description = "입력 DTO :RequestTroubleShootingAnswerDTO")
	@PutMapping("/{answerSeq}")
	public ResponseEntity<?> updateTroubleShooting(
		HttpServletRequest request,
		@PathVariable(name = "troubleSeq") Long troubleSeq,
		@RequestBody RequestTroubleShootingAnswerDTO requestTroubleShootingAnswerDTO,
		@PathVariable(name = "answerSeq") Long answerSeq) throws
		Exception {
		log.info("====== 트러블 슈팅 솔루션 수정 시작 =====");
		log.info(requestTroubleShootingAnswerDTO);
		//로그인 확인
		authentication.checkLogin(request,requestTroubleShootingAnswerDTO);
		//pk 설정
		requestTroubleShootingAnswerDTO.getTroubleShootingAnswer().setSeq(answerSeq);
		requestTroubleShootingAnswerDTO.getTroubleShootingAnswer().setTroubleSeq(troubleSeq);
		//트러블슈팅 문서 수정
		troubleShootingAnswerService.updateTroubleShootingAnswer(requestTroubleShootingAnswerDTO);

		ResultDTO resultDTO = ResultDTO.builder()
			.success(true)
			.message("트러블 슈팅 솔루션 수정이 성공했습니다.")
			.build();

		log.info("====== 트러블 슈팅 솔루션 수정 끝 =====");
		return new ResponseEntity<ResultDTO>(resultDTO, HttpStatus.OK);
	}
}
