package com.orientalSalad.troubleShot.member.dto;

import java.time.LocalDateTime;

import com.orientalSalad.troubleShot.global.dto.BaseDTO;
import com.orientalSalad.troubleShot.member.entity.MemberEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MemberDTO extends BaseDTO {
	private String email;
	private String password;
	private String profileImg;
	private String nickname;
	private String locale;

	@Builder
	public MemberDTO(String email, String password, String nickname, String profileImg, String locale, Long seq,
		 LocalDateTime createTime, LocalDateTime updateTime, LocalDateTime deleteTime){
		this.email = email;
		this.password = password;
		this.profileImg = profileImg;
		this.nickname = nickname;
		this.locale = locale;
		this.seq = seq;
		this.createTime = createTime;
		this.updateTime = updateTime;
		this.deleteTime = deleteTime;
	}


	public MemberEntity toMemberEntity(){
		return MemberEntity.builder()
			.email(email)
			.nickname(nickname)
			.password(password)
			.profileImg(profileImg)
			.locale(locale)
			.build();
	}


}
