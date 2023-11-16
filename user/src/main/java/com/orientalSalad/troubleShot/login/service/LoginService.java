package com.orientalSalad.troubleShot.login.service;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import com.orientalSalad.troubleShot.login.dto.LogOutDTO;
import com.orientalSalad.troubleShot.login.dto.LoginDTO;
import com.orientalSalad.troubleShot.member.dto.MemberDTO;
import com.orientalSalad.troubleShot.member.service.MemberService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoginService {
	private final MemberService memberService;
	private final RedisTemplate redisTemplate;

	@Transactional
	public MemberDTO login(LoginDTO loginDTO) throws Exception{
		if(loginDTO.getIp() == null || loginDTO.getIp().equals("")){
			throw new Exception("ip주소가 없습니다.");
		}

		if(loginDTO.getType() == null || loginDTO.getType().equals("")){
			throw new Exception("로그인 방식(웹/intellij/vscode)가 없습니다.");
		}

		MemberDTO memberDTO = memberService.findMemberByEmailAndPassword(loginDTO);

		//유저가 없는 경우
		if(memberDTO == null){
			throw new Exception("아이디 혹은 비밀번호가 맞지 않습니다.");
		}

		//로그인 정보를 reids에 저장
		ValueOperations valueOperations = redisTemplate.opsForValue();
		valueOperations.set("login_"+memberDTO.getSeq()+"_"+loginDTO.getType(),loginDTO);

		return memberDTO;
	}
	public boolean logout(LogOutDTO logOutDTO) throws Exception{
		if(logOutDTO.getIp() == null || logOutDTO.getIp().equals("")){
			throw new Exception("ip주소가 없습니다.");
		}

		if(logOutDTO.getType() == null || logOutDTO.getType().equals("")){
			throw new Exception("로그아웃 방식(웹/intellij/vscode)가 없습니다.");
		}
		
		//로그인 한 유저인지 정보를 reids에 저장
		ValueOperations valueOperations = redisTemplate.opsForValue();
		String key = "login_"+logOutDTO.getSeq()+"_"+logOutDTO.getType();

		LoginDTO loginDTO = (LoginDTO)valueOperations.get(key);

		// if(!loginDTO.getIp().equals(logOutDTO.getIp())){
		// 	throw new Exception("로그인한 기기가 다릅니다.");
		// }
		
		//로그인 만료
		redisTemplate.delete(key);

		return true;
	}
}
