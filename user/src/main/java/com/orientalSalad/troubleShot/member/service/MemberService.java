package com.orientalSalad.troubleShot.member.service;

import org.springframework.stereotype.Service;

import com.orientalSalad.troubleShot.global.encrypt.HashEncrypt;
import com.orientalSalad.troubleShot.login.DTO.LoginDTO;
import com.orientalSalad.troubleShot.member.dto.MemberDTO;
import com.orientalSalad.troubleShot.member.entity.MemberEntity;
import com.orientalSalad.troubleShot.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberService {
	private final MemberRepository memberRepository;
	private final HashEncrypt hashEncrypt;

	public void insertMember(MemberDTO memberDTO){
		//sha-256으로 비밀번호 해싱
		memberDTO.setPassword(hashEncrypt.hashWithSHA256(memberDTO.getPassword()));
		
		MemberEntity memberEntity = memberDTO.toMemberEntity();

		log.info(memberEntity.toString());

		memberRepository.save(memberEntity);
	}

	public MemberDTO findMemberBySeq(Long seq){
		MemberEntity memberEntity = memberRepository.findMemberEntityBySeq(seq);

		MemberDTO memberDTO = memberEntity.toMemberDTO();

		return memberDTO;
	}

	public MemberDTO findMemberByEmailAndPassword(LoginDTO loginDTO){

		loginDTO.setPassword(hashEncrypt.hashWithSHA256(loginDTO.getPassword()));

		MemberEntity memberEntity = memberRepository.findMemberEntityByEmailAndPassword(loginDTO.getEmail(),loginDTO.getPassword());

		//없는 유저인 경우
		if(memberEntity == null){
			return null;
		}

		MemberDTO memberDTO = memberEntity.toMemberDTO();

		return memberDTO;
	}
}
