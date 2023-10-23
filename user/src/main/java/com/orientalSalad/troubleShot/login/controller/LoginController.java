package com.orientalSalad.troubleShot.login.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.orientalSalad.troubleShot.global.dto.ResultDTO;
import com.orientalSalad.troubleShot.login.DTO.LoginDTO;
import com.orientalSalad.troubleShot.member.dto.MemberDTO;
import com.orientalSalad.troubleShot.member.service.MemberService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping(path = "/login")
@RequiredArgsConstructor
@Log4j2
public class LoginController {
	private final MemberService memberService;

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO, HttpSession httpSession){
		log.info("=== 로그인 시작 ===");
		MemberDTO memberDTO = memberService.findMemberByEmailAndPassword(loginDTO);
		
		//유저가 없는 경우
		if(memberDTO == null){
			ResultDTO resultDTO = ResultDTO.builder()
				.success(false)
				.message("아이디 또는 비밀번호가 존재하지 않거나 일치하지 않습니다.")
				.build();

			return new ResponseEntity<ResultDTO>(resultDTO, HttpStatus.ACCEPTED);
		}
		//탈퇴한 유저인 경우
		else if(memberDTO.getDeleteTime() != null){
			ResultDTO resultDTO = ResultDTO.builder()
				.success(false)
				.message("이미 탈퇴한 회원입니다.")
				.build();

			return new ResponseEntity<ResultDTO>(resultDTO, HttpStatus.ACCEPTED);
		}

		log.info("로그인 유저 : "+memberDTO);

		ResultDTO resultDTO = ResultDTO.builder()
			.success(true)
			.message(memberDTO.getEmail()+" 유저의 로그인이 성공했습니다.")
			.build();
		
		//세션에 로그인 정보 저장
		httpSession.setAttribute(String.valueOf(memberDTO.getSeq()),memberDTO);

		log.info("=== 로그인 끝 ===");
		return new ResponseEntity<ResultDTO>(resultDTO, HttpStatus.ACCEPTED);
	}

	@PostMapping("/logout")
	public ResponseEntity<?> logout(@RequestBody Long seq, HttpSession httpSession){
		log.info("=== 로그아웃 시작 ===");
		log.info("유저 seq : "+seq);

		MemberDTO memberDTO = (MemberDTO)httpSession.getAttribute(String.valueOf(seq));
		
		//로그아웃 실패
		if(memberDTO == null){
			String msg = seq+"번 유저는 로그인한 유저가 아닙니다.";

			ResultDTO resultDTO = ResultDTO.builder()
				.success(false)
				.message(msg)
				.build();

			return new ResponseEntity<ResultDTO>(resultDTO, HttpStatus.ACCEPTED);
		}

		log.info(memberDTO);

		//로그아웃 성공

		//세션 삭제
		httpSession.invalidate();;

		String msg = seq+"번 유저의 로그아웃이 성공했습니다.";

		ResultDTO resultDTO = ResultDTO.builder()
			.success(true)
			.message(msg)
			.build();

		log.info("=== 로그아웃 끝 ===");
		return new ResponseEntity<ResultDTO>(resultDTO, HttpStatus.ACCEPTED);
	}
}
