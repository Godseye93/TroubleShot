package com.orientalSalad.troubleShot.login.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.session.SessionRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.orientalSalad.troubleShot.global.dto.ResultDTO;
import com.orientalSalad.troubleShot.global.utill.IPGetter;
import com.orientalSalad.troubleShot.login.dto.LogOutDTO;
import com.orientalSalad.troubleShot.login.dto.LoginDTO;
import com.orientalSalad.troubleShot.login.service.LoginService;
import com.orientalSalad.troubleShot.member.dto.MemberDTO;
import com.orientalSalad.troubleShot.member.dto.ResponseMemberDTO;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping(path = "/login")
@RequiredArgsConstructor
@Log4j2
public class LoginController {
	private final LoginService loginService;
	private final IPGetter ipGetter;

	@Operation(summary = "로그인 API")
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO,
		HttpServletRequest request) throws Exception{
		log.info("=== 로그인 시작 ===");
		log.info(loginDTO);

		loginDTO.setIp(ipGetter.getClientIp(request));
		MemberDTO memberDTO = loginService.login(loginDTO);

		//유저가 없는 경우
		if(memberDTO == null){
			ResultDTO resultDTO = ResultDTO.builder()
				.success(false)
				.message("아이디 또는 비밀번호가 존재하지 않거나 일치하지 않습니다.")
				.build();

			return new ResponseEntity<ResultDTO>(resultDTO, HttpStatus.ACCEPTED);
		}

		log.info("로그인 유저 : "+memberDTO);

		ResponseMemberDTO resultDTO = ResponseMemberDTO.builder()
			.success(true)
			.message(memberDTO.getEmail()+" 유저의 로그인이 성공했습니다.")
			.member(memberDTO)
			.build();

		log.info("=== 로그인 끝 ===");
		return new ResponseEntity<ResponseMemberDTO>(resultDTO, HttpStatus.ACCEPTED);
	}

	@Operation(summary = "로그아웃 API",
		description = "로그아웃 할 유저 pk 하나만 보내면 됨")
	@PostMapping("/logout")
	public ResponseEntity<?> logout(HttpServletRequest request, @RequestBody LogOutDTO logOutDTO) throws Exception {
		log.info("=== 로그아웃 시작 ===");
		log.info(logOutDTO);

		//ip 추출
		logOutDTO.setIp(ipGetter.getClientIp(request));

		//로그아웃 진행
		loginService.logout(logOutDTO);

		String msg = logOutDTO.getSeq()+"번 유저의 로그아웃이 성공했습니다.";

		ResultDTO resultDTO = ResultDTO.builder()
			.success(true)
			.message(msg)
			.build();
		log.info("=== 로그아웃 끝 ===");
		return new ResponseEntity<ResultDTO>(resultDTO, HttpStatus.ACCEPTED);
	}
}
