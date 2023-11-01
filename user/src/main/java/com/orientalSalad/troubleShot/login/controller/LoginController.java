package com.orientalSalad.troubleShot.login.controller;

import java.time.Duration;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.session.FindByIndexNameSessionRepository;
import org.springframework.session.Session;
import org.springframework.session.SessionRepository;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.orientalSalad.troubleShot.global.dto.ResultDTO;
import com.orientalSalad.troubleShot.login.dto.LoginDTO;
import com.orientalSalad.troubleShot.login.service.LoginService;
import com.orientalSalad.troubleShot.member.dto.MemberDTO;
import com.orientalSalad.troubleShot.member.dto.ResponseMemberDTO;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.Cookie;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping(path = "/login")
@RequiredArgsConstructor
@Log4j2
public class LoginController {
	private final LoginService loginService;
	private final SessionRepository sessionRepository;

	@Operation(summary = "로그인 API")
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO,
		@CookieValue(value = "sessionId",required = false) String sessionKey) throws Exception{
		log.info("=== 로그인 시작 ===");
		log.info("쿠키 : "+sessionKey);
		log.info(loginDTO);

		MemberDTO memberDTO = loginService.login(loginDTO);
		memberDTO.setPassword("");
		//유저가 없는 경우
		if(memberDTO == null){
			ResultDTO resultDTO = ResultDTO.builder()
				.success(false)
				.message("아이디 또는 비밀번호가 존재하지 않거나 일치하지 않습니다.")
				.build();

			return new ResponseEntity<ResultDTO>(resultDTO, HttpStatus.ACCEPTED);
		}

		log.info("로그인 유저 : "+memberDTO);
		Session session = sessionRepository.findById(sessionKey);

		if(session == null){
			session = sessionRepository.createSession();
			sessionKey = session.getId();
		}

		session.setAttribute("login",memberDTO);

		sessionRepository.save(session);

		ResponseMemberDTO resultDTO = ResponseMemberDTO.builder()
			.success(true)
			.message(memberDTO.getEmail()+" 유저의 로그인이 성공했습니다.")
			.member(memberDTO)
			.build();

		Cookie cookie = new Cookie("sessionId",sessionKey);

		// HttpHeaders 객체 생성
		HttpHeaders headers = new HttpHeaders();

		// 쿠키를 Set-Cookie 헤더에 추가
		headers.add("Set-Cookie", String.format("%s=%s; Path=/; HttpOnly; SameSite=None;  Secure", cookie.getName(), cookie.getValue()));

		log.info("=== 로그인 끝 ===");
		return new ResponseEntity<ResponseMemberDTO>(resultDTO, headers, HttpStatus.ACCEPTED);
	}

	@Operation(summary = "로그아웃 API",
		description = "로그아웃 할 유저 pk 하나만 보내면 됨")
	@PostMapping("/logout")
	public ResponseEntity<?> logout(@CookieValue(value = "sessionId",required = true) String sessionKey) throws Exception {
		log.info("=== 로그아웃 시작 ===");
		log.info("SESSION key : "+sessionKey);

		Session session = sessionRepository.findById(sessionKey);

		if(session == null){
			throw new Exception("현재 브라우저는 로그인이 되어있지 않습니다.");
		}

		//로그아웃 진행
		MemberDTO loginMember = (MemberDTO)session.getAttribute("login");

		//세션 만료
		session.setMaxInactiveInterval(Duration.ofSeconds(0));

		sessionRepository.save(session);

		String msg = loginMember.getSeq()+"번 유저의 로그아웃이 성공했습니다.";

		ResultDTO resultDTO = ResultDTO.builder()
			.success(true)
			.message(msg)
			.build();
		log.info(session.getId());
		log.info("=== 로그아웃 끝 ===");
		return new ResponseEntity<ResultDTO>(resultDTO, HttpStatus.ACCEPTED);
	}
}
