package com.orientalSalad.troubleShot.global.utill;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;

import com.orientalSalad.troubleShot.global.dto.RequestDTO;
import com.orientalSalad.troubleShot.login.dto.LoginDTO;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class Authentication {
	private final RedisTemplate redisTemplate;
	private final IPGetter ipGetter;

	public boolean checkLogin(HttpServletRequest request, RequestDTO requestDTO) throws Exception {
		String ip = ipGetter.getClientIp(request);

		if(ip == null || ip.equals("")){
			throw new Exception("ip가 없습니다.");
		}

		ValueOperations valueOperations = redisTemplate.opsForValue();
		String key = "login_"+requestDTO.getLoginSeq()+"_"+requestDTO.getType();

		LoginDTO loginDTO = (LoginDTO)valueOperations.get(key);
		if(loginDTO == null){
			throw new Exception("로그인하지 않은 유저입니다");
		}
		// if(!loginDTO.getIp().equals(loginDTO.getIp())){
		// 	throw new Exception("로그인한 기기가 다릅니다.");
		// }
		return true;

	}
}



