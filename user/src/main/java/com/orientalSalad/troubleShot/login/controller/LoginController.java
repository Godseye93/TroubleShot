package com.orientalSalad.troubleShot.login.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.orientalSalad.troubleShot.global.dto.ResultDTO;
import com.orientalSalad.troubleShot.login.dto.LoginDTO;
import com.orientalSalad.troubleShot.login.service.LoginService;
import com.orientalSalad.troubleShot.member.dto.MemberDTO;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping(path = "/login")
@RequiredArgsConstructor
@Log4j2
public class LoginController {
	private final LoginService loginService;

	@Operation(summary = "로그인 API")
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO,HttpSession session) throws Exception{
		log.info("=== 로그인 시작 ===");
		log.info(loginDTO);

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
		log.info(session.getId());

		session.setAttribute(String.valueOf(memberDTO.getSeq()),memberDTO);

		ResultDTO resultDTO = ResultDTO.builder()
			.success(true)
			.message(memberDTO.getEmail()+" 유저의 로그인이 성공했습니다.")
			.build();

		log.info("=== 로그인 끝 ===");
		return new ResponseEntity<ResultDTO>(resultDTO, HttpStatus.ACCEPTED);
	}

	@Operation(summary = "로그아웃 API")
	@PostMapping("/logout")
	public ResponseEntity<?> logout(@RequestBody Long seq, HttpSession session) throws Exception {
		log.info("=== 로그아웃 시작 ===");
		log.info("유저 seq : "+seq);
		
		//로그아웃 진행
		MemberDTO loginMember = (MemberDTO)session.getAttribute(String.valueOf(seq));

		if(loginMember == null){
			throw new Exception(seq+"번 유저는 해당 브라우저에서 로그인 하지 않았습니다.");
		}
		//세션 만료
		session.invalidate();

		String msg = seq+"번 유저의 로그아웃이 성공했습니다.";

		ResultDTO resultDTO = ResultDTO.builder()
			.success(true)
			.message(msg)
			.build();

		log.info("=== 로그아웃 끝 ===");
		return new ResponseEntity<ResultDTO>(resultDTO, HttpStatus.ACCEPTED);
	}
}
