package com.orientalSalad.troubleShot.troubleShooting.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.orientalSalad.troubleShot.global.dto.ResultDTO;
import com.orientalSalad.troubleShot.troubleShooting.service.TroubleShootingService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Tag(name = "좋아요 API")
@Controller
@RequestMapping("/users/{userSeq}/trouble-shootings")
@RequiredArgsConstructor
@Log4j2
public class UserTroubleShootingController {
	private final TroubleShootingService troubleShootingService;

	@Operation(summary = "트러블 슈팅 덧글 좋아요")
	@PostMapping("/{troubleSeq}/reply/{replySeq}/like")
	public ResponseEntity<?> likeReply(
		@PathVariable(name = "userSeq") long userSeq,
		@PathVariable(name = "troubleSeq") long troubleSeq,
		@PathVariable(name = "replySeq") long replySeq) throws Exception {
		log.info("====== 트러블 슈팅 문서 덧글 좋아요 시작 =====");

		troubleShootingService.updateReplyLike(userSeq,troubleSeq,replySeq);

		ResultDTO resultDTO = ResultDTO.builder()
			.success(true)
			.message(replySeq+"번 댓글 좋아요 변경이 성공했습니다.")
			.build();

		log.info("====== 트러블 슈팅 문서 덧글 좋아요 끝 =====");
		return new ResponseEntity<ResultDTO>(resultDTO, HttpStatus.OK);
	}

	@Operation(summary = "트러블 슈팅 좋아요")
	@PostMapping("/{troubleSeq}/like")
	public ResponseEntity<?> likeTroubleShooting(
		@PathVariable(name = "userSeq") long userSeq,
		@PathVariable(name = "troubleSeq") long troubleSeq) throws Exception {
		log.info("====== 트러블 슈팅 문서 좋아요 시작 =====");

		troubleShootingService.updateTroubleShootingLike(userSeq,troubleSeq);

		ResultDTO resultDTO = ResultDTO.builder()
			.success(true)
			.message(troubleSeq+"번 좋아요 변경이 성공했습니다.")
			.build();

		log.info("====== 트러블 슈팅 문서 좋아요 끝 =====");
		return new ResponseEntity<ResultDTO>(resultDTO, HttpStatus.OK);
	}
}