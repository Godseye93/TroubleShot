package com.orientalSalad.troubleShot.member.dto;

import com.orientalSalad.troubleShot.global.dto.BaseDTO;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@ToString
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
}
