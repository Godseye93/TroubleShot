package com.orientalSalad.troubleShot.member.validation;

import org.springframework.stereotype.Component;

import com.orientalSalad.troubleShot.global.pattern.Pattern;
import com.orientalSalad.troubleShot.global.utill.Validation;
import com.orientalSalad.troubleShot.member.dto.MemberDTO;

@Component
public class MemberValidation implements Validation<MemberDTO> {
	@Override
	public boolean validate(MemberDTO memberDTO) {
		if(memberDTO.getEmail() == null){
			return false;
		}
		else if(!memberDTO.getEmail().matches(Pattern.EMAIL)){
			return false;
		}

		if(memberDTO.getNickname() == null){
			return false;
		}

		if(memberDTO.getPassword() == null){
			return false;
		}

		if(memberDTO.getLocale() == null){
			return false;
		}
		return true;
	}
}

