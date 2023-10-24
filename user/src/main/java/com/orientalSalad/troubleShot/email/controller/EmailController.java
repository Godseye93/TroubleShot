package com.orientalSalad.troubleShot.email.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.orientalSalad.troubleShot.email.service.EmailService;
import com.orientalSalad.troubleShot.global.dto.ResultDTO;
import com.orientalSalad.troubleShot.global.utill.CodeMaker;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping(path = "/email")
@RequiredArgsConstructor
@Log4j2
public class EmailController {
	private final JavaMailSender javaMailSender;
	private final EmailService emailService;

	@PostMapping("/auth/send")
	public ResponseEntity<?> login(@RequestBody String email, HttpSession httpSession) throws MessagingException {
		// 이메일 발신될 데이터 적재
		MimeMessage message = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
		helper.setFrom("khnemu@naver.com");
		helper.setTo(email);
		helper.setSubject("[TroubleShot] 인증 코드 메일");

		String emailContext = emailService.getAuthEmail();
		helper.setText(emailContext, true);

		// 이메일 발신
		javaMailSender.send(message);

		ResultDTO resultDTO = ResultDTO.builder()
			.success(true)
			.message(email+"로 이메일 발송이 성공했습니다.")
			.build();

		return new ResponseEntity<ResultDTO>(resultDTO, HttpStatus.ACCEPTED);
	}
}
