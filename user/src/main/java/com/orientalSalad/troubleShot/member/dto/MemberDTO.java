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


@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MemberDTO extends BaseDTO {
	private String email;
	private String password;
	private String profileImg;
	private String nickname;

	@Builder
	public MemberDTO(String email, String password, String profileImg, Long seq, String nickname,
		 LocalDateTime createTime, LocalDateTime updateTime, LocalDateTime deleteTime){
		this.email = email;
		this.password = password;
		this.nickname = nickname;
		this.profileImg = profileImg;
		this.seq = seq;
		this.createTime = createTime;
		this.updateTime = updateTime;
		this.deleteTime = deleteTime;
	}


	public MemberEntity toMemberEntity(){
		return MemberEntity.builder()
			.email(email)
			.password(password)
			.nickname(nickname)
			.profileImg(profileImg)
			.createTime(createTime)
			.updateTime(updateTime)
			.deleteTime(deleteTime)
			.build();
	}
}
