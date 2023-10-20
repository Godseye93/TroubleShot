package com.orientalSalad.troubleShot.member.service;

import org.springframework.stereotype.Service;

import com.orientalSalad.troubleShot.global.encrypt.HashEncrypt;
import com.orientalSalad.troubleShot.member.dto.MemberDTO;
import com.orientalSalad.troubleShot.member.entity.MemberEntity;
import com.orientalSalad.troubleShot.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService {
	private final MemberRepository memberRepository;
	private final HashEncrypt hashEncrypt;

	public void insertMember(MemberDTO memberDTO){
		//sha-256으로 비밀번호 해싱
		memberDTO.setPassword(hashEncrypt.hashWithSHA256(memberDTO.getPassword()));
		
		MemberEntity memberEntity = memberDTO.toMemberEntity();
		memberRepository.save(memberEntity);
	}
}
