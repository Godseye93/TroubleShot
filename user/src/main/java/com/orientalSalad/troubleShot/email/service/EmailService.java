package com.orientalSalad.troubleShot.email.service;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.orientalSalad.troubleShot.global.utill.CodeMaker;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {
	private final CodeMaker codeMaker;

	public String getAuthEmail(){
		String code = codeMaker.getRandomWordOrNum(6);

		StringBuilder sb = new StringBuilder();
		sb.append("<div>");
		// sb.append("<img src=\""+imgPrefix+"/logo.png\" height=\"24\">");
		sb.append("<br>");
		sb.append("<br>");
		sb.append("<span style='white-space:nowrap'>안녕하세요.&nbsp;</span>");
		sb.append("<span style='font-weight:bold;white-space:nowrap'>TroubleShot</span><span> 입니다.</span>");
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
		sb.append("<p>감사합니다<p>");

		return sb.toString();
	}
}
