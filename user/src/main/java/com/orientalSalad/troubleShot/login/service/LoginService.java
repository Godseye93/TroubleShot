package com.orientalSalad.troubleShot.login.service;

import org.springframework.stereotype.Service;

import com.orientalSalad.troubleShot.global.encrypt.HashEncrypt;
import com.orientalSalad.troubleShot.login.DTO.LoginDTO;
import com.orientalSalad.troubleShot.member.dto.MemberDTO;
import com.orientalSalad.troubleShot.member.entity.MemberEntity;
import com.orientalSalad.troubleShot.member.repository.MemberRepository;

import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoginService {
	private final MemberRepository memberRepository;
	private final HashEncrypt hashEncrypt;

}
