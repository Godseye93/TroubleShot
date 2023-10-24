package com.orientalSalad.troubleShot.login.service;

import org.springframework.stereotype.Service;

import com.orientalSalad.troubleShot.login.dto.LoginDTO;
import com.orientalSalad.troubleShot.member.dto.MemberDTO;
import com.orientalSalad.troubleShot.member.service.MemberService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoginService {
	private final MemberService memberService;

	public MemberDTO login(LoginDTO loginDTO) throws Exception{
		MemberDTO memberDTO = memberService.findMemberByEmailAndPassword(loginDTO);

		//유저가 없는 경우
		if(memberDTO == null){
			throw new Exception("아이디 혹은 비밀번호가 맞지 않습니다.");
		}

		return memberDTO;
	}
}
