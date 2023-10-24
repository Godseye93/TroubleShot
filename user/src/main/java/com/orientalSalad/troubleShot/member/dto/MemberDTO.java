package com.orientalSalad.troubleShot.member.dto;

import java.time.LocalDateTime;

import com.orientalSalad.troubleShot.global.dto.BaseDTO;
import com.orientalSalad.troubleShot.global.pattern.Pattern;
import com.orientalSalad.troubleShot.member.entity.MemberEntity;

import io.swagger.v3.oas.annotations.media.Schema;
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
	@Schema(description = "이메일")
	private String email;
	@Schema(description = "비밀번호")
	private String password;
	@Schema(description = "프로필 사진")
	private String profileImg;
	@Schema(description = "닉네임")
	private String nickname;
	@Schema(description = "국적(로케일 규칙에 따름) ex) 한국 : ko_KR")
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

	@Override
	public String toString() {
		return "MemberDTO{" +
			"seq=" + seq +
			", createTime=" + createTime +
			", updateTime=" + updateTime +
			", deleteTime=" + deleteTime +
			", locale='" + locale + '\'' +
			'}';
	}

	public boolean validate(){
		if(this.email == null){
			return false;
		}else if(!email.matches(Pattern.EMAIL)){
			return false;
		}

		if(this.nickname == null){
			return false;
		}

		if(this.password == null){
			return false;
		}

		if(this.locale == null){
			return false;
		}

		return true;
	}
}
