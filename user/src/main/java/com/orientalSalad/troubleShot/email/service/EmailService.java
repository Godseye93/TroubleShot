package com.orientalSalad.troubleShot.email.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.orientalSalad.troubleShot.email.dto.AuthCodeDTO;
import com.orientalSalad.troubleShot.global.utill.CodeMaker;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {
	private final JavaMailSender javaMailSender;
	private final CodeMaker codeMaker;

	@Value("${spring.mail.auth-code-length}")
	private Integer authCodeLength;

	@Value("${service.title}")
	private String title;

	public AuthCodeDTO sendAuthEmail(String email) throws MessagingException {
		log.info("발송 대상 이메일 : "+email);
		MimeMessage message = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

		//인증 코드
		String code = codeMaker.getRandomWordOrNum(authCodeLength);

		helper.setFrom("khnemu@naver.com");
		helper.setTo(email);
		helper.setSubject(String.format("[%s] 인증 코드 메일",title));

		//이메일 내용 생성
		String emailContext = makeAuthEmail(code);

		helper.setText(emailContext, true);
		// 이메일 발신
		javaMailSender.send(message);

		AuthCodeDTO authCodeDTO = AuthCodeDTO.builder()
			.code(code)
			.email(email)
			.build();

		return authCodeDTO;
	}
	public String makeAuthEmail(String code){
		StringBuilder sb = new StringBuilder();
		sb.append("<div>");
		// sb.append("<img src=\""+imgPrefix+"/logo.png\" height=\"24\">");
		sb.append("<br>");
		sb.append("<br>");
		sb.append("<span style='white-space:nowrap'>안녕하세요.&nbsp;</span>");
		sb.append(String.format("<span style='font-weight:bold;white-space:nowrap'>%s</span><span> 입니다.</span>",title));
		sb.append("<br>");
		sb.append("<br>");
		sb.append("<span>아래 인증코드를 회원가입 창으로 돌아가 입력해주세요</span>");
		sb.append("<br>");
		sb.append("<br>");
		sb.append("<span style='color:#39CCCC;font-size:24px;font-weight:bold'>"+code + "</span><br>"); // 메일에 인증번호 넣기
		sb.append("<br>");
		sb.append("<br>");
		sb.append("<span style='font-weight:bold'>※주의 : </span><span>인증번호는 "
			+ "</span><span style='font-weight:bold'>30분 이후에 만료&nbsp;</span>"
			+ "<span>되므로 꼭 30분 이내에 입력해주시길 바랍니다.</span>");
		sb.append("<br>");
		sb.append("<br>");
		sb.append("<p>감사합니다.<p>");

		return sb.toString();
	}
}
