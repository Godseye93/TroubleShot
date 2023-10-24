package com.orientalSalad.troubleShot.email.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.orientalSalad.troubleShot.email.dto.AuthCodeDTO;
import com.orientalSalad.troubleShot.email.service.EmailService;
import com.orientalSalad.troubleShot.global.dto.ResultDTO;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping(path = "/auth")
@RequiredArgsConstructor
@Log4j2
public class EmailController {
	private final EmailService emailService;
	@Operation(summary = "이메일 인증 번호 전송 API")
	@PostMapping("/email/send")
	public ResponseEntity<?> sendAuthCodeEmail(@RequestBody String email,HttpSession session) throws MessagingException {
		// 이메일 발신될 데이터 적재
		log.info("====인증 이메일 발송 시작====");
		log.info(email);

		AuthCodeDTO authCodeDTO = emailService.sendAuthEmail(email);

		session.setAttribute("auth-"+email,authCodeDTO);

		ResultDTO resultDTO = ResultDTO.builder()
			.success(true)
			.message(email+"로 이메일 발송이 성공했습니다.")
			.build();

		log.info("====인증 이메일 발송 끝====");
		return new ResponseEntity<ResultDTO>(resultDTO, HttpStatus.ACCEPTED);
	}
	@Operation(summary = "이메일 인증 번호 확인 API")
	@PostMapping("/email/confirm")
	public ResponseEntity<?> confirmAuthCodeEmail(@RequestBody AuthCodeDTO authCodeDTO, HttpSession session) throws
		Exception {
		log.info("====인증 코드 확인 시작====");
		log.info(authCodeDTO);

		AuthCodeDTO sessionAuthCode = (AuthCodeDTO)session.getAttribute("auth-"+authCodeDTO.getEmail());

		log.info(sessionAuthCode.toString());

		ResultDTO resultDTO = null;

		if(authCodeDTO.getCode().equals(sessionAuthCode.getCode())){
			session.removeAttribute("auth-"+authCodeDTO.getEmail());
			resultDTO = ResultDTO.builder()
				.message("인증을 성공했습니다.")
				.success(true)
				.build();
		}else{
			resultDTO = ResultDTO.builder()
				.message("인증을 실패했습니다.")
				.success(false)
				.build();
		}

		log.info("====인증 코드 확인 끝====");
		return new ResponseEntity<ResultDTO>(resultDTO, HttpStatus.ACCEPTED);
	}
}
