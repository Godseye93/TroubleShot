package com.orientalSalad.troubleShot.troubleShooting.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.orientalSalad.troubleShot.global.dto.RequestDTO;
import com.orientalSalad.troubleShot.global.dto.ResultDTO;
import com.orientalSalad.troubleShot.global.utill.Authentication;
import com.orientalSalad.troubleShot.troubleShooting.service.TroubleShootingAnswerService;
import com.orientalSalad.troubleShot.troubleShooting.service.TroubleShootingService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Tag(name = "좋아요/즐겨찾기 API")
@Controller
@RequestMapping("/members/{userSeq}/trouble-shootings")
@RequiredArgsConstructor
@Log4j2
public class UserTroubleShootingController {
	private final TroubleShootingService troubleShootingService;
	private final TroubleShootingAnswerService troubleShootingAnswerService;
	private final Authentication authentication;

	@Operation(summary = "트러블 슈팅 솔루션 좋아요",description = "입력 DTO :RequestDTO")
	@PostMapping("/{troubleSeq}/answers/{answerSeq}/like")
	public ResponseEntity<?> likeAnswer(
		@PathVariable(name = "userSeq") long userSeq,
		@PathVariable(name = "troubleSeq") long troubleSeq,
		@PathVariable(name = "answerSeq") long answerSeq,
		@RequestBody RequestDTO requestDTO,
		HttpServletRequest httpServletRequest) throws Exception {
		log.info("====== 트러블 슈팅 문서 솔루션 좋아요 시작 =====");
		log.info(requestDTO.toString());

		//로그인 확인
		authentication.checkLogin(httpServletRequest,requestDTO);

		troubleShootingAnswerService.updateTroubleShootingAnswerLike(userSeq,answerSeq);

		ResultDTO resultDTO = ResultDTO.builder()
			.success(true)
			.message(answerSeq+"번 솔루션 좋아요 변경이 성공했습니다.")
			.build();

		log.info("====== 트러블 슈팅 문서 솔루션 좋아요 끝 =====");
		return new ResponseEntity<ResultDTO>(resultDTO, HttpStatus.OK);
	}
	@Operation(summary = "트러블 슈팅 솔루션 덧글 좋아요",description = "입력 DTO :RequestDTO")
	@PostMapping("/{troubleSeq}/answers/{answerSeq}/replies/{replySeq}/like")
	public ResponseEntity<?> likeAnswer(
		@PathVariable(name = "userSeq") long userSeq,
		@PathVariable(name = "troubleSeq") long troubleSeq,
		@PathVariable(name = "answerSeq") long answerSeq,
		@PathVariable(name = "replySeq") long replySeq,
		@RequestBody RequestDTO requestDTO,
		HttpServletRequest httpServletRequest
		) throws Exception {
		log.info("====== 트러블 슈팅 문서 솔루션 덧글 좋아요 시작 =====");

		//로그인 확인
		authentication.checkLogin(httpServletRequest,requestDTO);

		troubleShootingAnswerService.updateTroubleShootingAnswerReplyLike(userSeq,replySeq);

		ResultDTO resultDTO = ResultDTO.builder()
			.success(true)
			.message(answerSeq+"번 솔루션 덧글 좋아요 변경이 성공했습니다.")
			.build();

		log.info("====== 트러블 슈팅 문서 솔루션 덧글 좋아요 끝 =====");
		return new ResponseEntity<ResultDTO>(resultDTO, HttpStatus.OK);
	}
	@Operation(summary = "트러블 슈팅 덧글 좋아요",description = "입력 DTO :RequestDTO")
	@PostMapping("/{troubleSeq}/reply/{replySeq}/like")
	public ResponseEntity<?> likeReply(
		@PathVariable(name = "userSeq") long userSeq,
		@PathVariable(name = "troubleSeq") long troubleSeq,
		@PathVariable(name = "replySeq") long replySeq,
		@RequestBody RequestDTO requestDTO,
		HttpServletRequest httpServletRequest) throws Exception {
		log.info("====== 트러블 슈팅 문서 덧글 좋아요 시작 =====");
		//로그인 확인
		authentication.checkLogin(httpServletRequest,requestDTO);

		troubleShootingService.updateReplyLike(userSeq,troubleSeq,replySeq);

		ResultDTO resultDTO = ResultDTO.builder()
			.success(true)
			.message(replySeq+"번 댓글 좋아요 변경이 성공했습니다.")
			.build();

		log.info("====== 트러블 슈팅 문서 덧글 좋아요 끝 =====");
		return new ResponseEntity<ResultDTO>(resultDTO, HttpStatus.OK);
	}

	@Operation(summary = "트러블 슈팅 좋아요",description = "입력 DTO :RequestDTO")
	@PostMapping("/{troubleSeq}/like")
	public ResponseEntity<?> likeTroubleShooting(
		@PathVariable(name = "userSeq") long userSeq,
		@PathVariable(name = "troubleSeq") long troubleSeq,
		@RequestBody RequestDTO requestDTO,
		HttpServletRequest httpServletRequest) throws Exception {
		log.info("====== 트러블 슈팅 문서 좋아요 시작 =====");

		//로그인 확인
		authentication.checkLogin(httpServletRequest,requestDTO);

		troubleShootingService.updateTroubleShootingLike(userSeq,troubleSeq);

		ResultDTO resultDTO = ResultDTO.builder()
			.success(true)
			.message(troubleSeq+"번 좋아요 변경이 성공했습니다.")
			.build();

		log.info("====== 트러블 슈팅 문서 좋아요 끝 =====");
		return new ResponseEntity<ResultDTO>(resultDTO, HttpStatus.OK);
	}
	@Operation(summary = "트러블 슈팅 즐겨찾기",description = "입력 DTO :RequestDTO")
	@PostMapping("/{troubleSeq}/favorite")
	public ResponseEntity<?> favoriteTroubleShooting(
		@PathVariable(name = "userSeq") long userSeq,
		@PathVariable(name = "troubleSeq") long troubleSeq,
		@RequestBody RequestDTO requestDTO,
		HttpServletRequest httpServletRequest) throws Exception {
		log.info("====== 트러블 슈팅 문서 즐겨찾기 시작 =====");

		//로그인 확인
		authentication.checkLogin(httpServletRequest,requestDTO);

		troubleShootingService.updateTroubleShootingFavorite(userSeq,troubleSeq);

		ResultDTO resultDTO = ResultDTO.builder()
			.success(true)
			.message(troubleSeq+"번 즐겨찾기 변경이 성공했습니다.")
			.build();

		log.info("====== 트러블 슈팅 문서 즐겨찾기 끝 =====");
		return new ResponseEntity<ResultDTO>(resultDTO, HttpStatus.OK);
	}


}