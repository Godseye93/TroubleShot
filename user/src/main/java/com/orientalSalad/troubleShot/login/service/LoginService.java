package com.orientalSalad.troubleShot.login.service;

import org.springframework.stereotype.Service;

import com.orientalSalad.troubleShot.member.dto.MemberDTO;
import com.orientalSalad.troubleShot.member.repository.MemberRepository;

import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoginService {
	private MemberRepository memberRepository;

}
