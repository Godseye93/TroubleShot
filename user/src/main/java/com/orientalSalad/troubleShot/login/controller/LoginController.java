package com.orientalSalad.troubleShot.login.controller;

import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.orientalSalad.troubleShot.login.DTO.LoginDTO;
import com.orientalSalad.troubleShot.login.service.LoginService;
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

		if(memberDTO == null){
			return new ResponseEntity<String>("fail", HttpStatus.ACCEPTED);
		}

		log.info("로그인 유저 : "+memberDTO);

		httpSession.setAttribute(String.valueOf(memberDTO.getSeq()),memberDTO);

		log.info("=== 로그인 끝 ===");
		return new ResponseEntity<String>("success", HttpStatus.ACCEPTED);
	}

	@PostMapping("/logout")
	public ResponseEntity<?> logout(@RequestBody Long seq, HttpSession httpSession){
		log.info("=== 로그아웃 시작 ===");
		log.info("유저 seq : "+seq);

		MemberDTO memberDTO = (MemberDTO)httpSession.getAttribute(String.valueOf(seq));

		log.info(memberDTO);
		
		log.info("=== 로그아웃 끝 ===");
		return new ResponseEntity<String>("success", HttpStatus.ACCEPTED);
	}
}
