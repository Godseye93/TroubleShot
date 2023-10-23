package com.orientalSalad.troubleShot.login.service;

import org.springframework.stereotype.Service;

import com.orientalSalad.troubleShot.global.encrypt.HashEncrypt;
import com.orientalSalad.troubleShot.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoginService {
	private final MemberRepository memberRepository;
	private final HashEncrypt hashEncrypt;
}
